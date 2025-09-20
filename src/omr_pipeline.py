import cv2
import numpy as np
import json
import os

OUT_DIR = "outputs"
TEMPLATE_PATH = "src/sample_data/template.json"
ANSWER_KEY_PATH = "src/sample_data/answer_key.json"

os.makedirs(OUT_DIR, exist_ok=True)

def load_template(path=TEMPLATE_PATH):
    with open(path, "r") as f:
        return json.load(f)

def load_answer_key(path=ANSWER_KEY_PATH):
    with open(path, "r") as f:
        return json.load(f)

def find_largest_contour(img_gray):
    blur = cv2.GaussianBlur(img_gray, (5,5), 0)
    _, th = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    if np.sum(th==255) < np.sum(th==0):
        th = cv2.bitwise_not(th)
    contours, _ = cv2.findContours(th, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        return None
    return max(contours, key=cv2.contourArea)

def order_points(pts):
    pts = np.array(pts, dtype="float32")
    s = pts.sum(axis=1)
    diff = np.diff(pts, axis=1)
    tl = pts[np.argmin(s)]
    br = pts[np.argmax(s)]
    tr = pts[np.argmin(diff)]
    bl = pts[np.argmax(diff)]
    return np.array([tl, tr, br, bl], dtype="float32")

def four_point_transform(image, pts):
    rect = order_points(pts)
    (tl, tr, br, bl) = rect
    widthA = np.linalg.norm(br - bl)
    widthB = np.linalg.norm(tr - tl)
    maxWidth = max(int(widthA), int(widthB))
    heightA = np.linalg.norm(tr - br)
    heightB = np.linalg.norm(tl - bl)
    maxHeight = max(int(heightA), int(heightB))
    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]], dtype="float32")
    M = cv2.getPerspectiveTransform(rect, dst)
    warped = cv2.warpPerspective(image, M, (maxWidth, maxHeight))
    return warped, M

def roi_mean_intensity(warp_gray, bbox):
    x,y,w,h = bbox
    x,y,w,h = int(x),int(y),int(w),int(h)
    h_img, w_img = warp_gray.shape[:2]
    x = max(0, min(x, w_img-1))
    y = max(0, min(y, h_img-1))
    if w<=0 or h<=0:
        return 255
    roi = warp_gray[y:y+h, x:x+w]
    if roi.size == 0:
        return 255
    return float(np.mean(roi))

def evaluate_bubbles(warp_gray, template, threshold=150):
    answers = {}
    confidences = {}
    overlay = cv2.cvtColor(warp_gray, cv2.COLOR_GRAY2BGR)
    for qid, meta in template["bubbles"].items():
        bbox = meta["bbox"]
        mean = roi_mean_intensity(warp_gray, bbox)
        filled = mean < threshold
        # simple mapping: if filled, set to answer key choice if known
        answers[qid] = meta.get("marked", "")
        if filled:
            answers[qid] = meta.get("choice", "A")
        confidences[qid] = float(255 - mean)
        x,y,w,h = map(int,bbox)
        color = (0,255,0) if filled else (0,0,255)
        cv2.rectangle(overlay, (x,y), (x+w, y+h), color, 2)
    return answers, confidences, overlay

def compute_scores(answers, answer_key, template):
    per_subject = {}
    total_correct = 0
    total_questions = len(answer_key.get("answers", {}))
    for subj, bounds in template.get("subjects", {}).items():
        qstart,qend = bounds
        correct = 0
        for q in range(qstart, qend+1):
            qid = f"Q{q}"
            if qid in answers and answers[qid] != "" and answer_key["answers"].get(qid,"") == answers[qid]:
                correct += 1
        per_subject[subj] = round((correct / (qend - qstart + 1)) * 20)
        total_correct += correct
    total_score = 0
    if total_questions>0:
        total_score = round((total_correct / total_questions) * 100)
    return per_subject, total_score

def save_image(img, path):
    cv2.imwrite(path, img)

def process_image_bytes(image_bytes: bytes, sheet_id: str = None):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        return {"error": "invalid image"}
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    c = find_largest_contour(gray)
    if c is None:
        return {"error": "no sheet contour found"}
    peri = cv2.arcLength(c, True)
    approx = cv2.approxPolyDP(c, 0.02 * peri, True)
    if len(approx) < 4:
        h,w = gray.shape[:2]
        pts = np.array([[0,0],[w-1,0],[w-1,h-1],[0,h-1]], dtype="float32")
    elif len(approx) == 4:
        pts = approx.reshape(4,2)
    else:
        # If we have more than 4 points, try to find the best 4 corners
        # Use convex hull to get the outer boundary
        hull = cv2.convexHull(approx)
        if len(hull) >= 4:
            # Find the 4 extreme points
            hull = hull.reshape(-1, 2)
            # Get bounding rectangle and use its corners
            rect = cv2.minAreaRect(hull)
            box = cv2.boxPoints(rect)
            pts = np.array(box, dtype="float32")
        else:
            # Fallback to image corners
            h,w = gray.shape[:2]
            pts = np.array([[0,0],[w-1,0],[w-1,h-1],[0,h-1]], dtype="float32")
    warped_color, M = four_point_transform(img, pts)
    warped_gray = cv2.cvtColor(warped_color, cv2.COLOR_BGR2GRAY)
    try:
        template = load_template()
        answer_key = load_answer_key()
    except Exception as e:
        return {"error": f"template/answer key missing or invalid: {e}"}
    if "template_size" in template:
        tw,th = template["template_size"]
        wh,ww = warped_gray.shape[:2]
        sx = ww / tw
        sy = wh / th
        for meta in template["bubbles"].values():
            x,y,w,h = meta["bbox"]
            meta["bbox"] = [int(x*sx), int(y*sy), int(w*sx), int(h*sy)]
    answers, confidences, overlay = evaluate_bubbles(warped_gray, template, threshold=template.get("threshold",150))
    per_subject, total_score = compute_scores(answers, answer_key, template)
    rect_path = os.path.join(OUT_DIR, f"{sheet_id}_rectified.png")
    overlay_path = os.path.join(OUT_DIR, f"{sheet_id}_overlay.png")
    save_image(warped_color, rect_path)
    save_image(overlay, overlay_path)
    result = {
        "sheet_id": sheet_id,
        "version": template.get("version", "v1"),
        "answers": answers,
        "confidences": confidences,
        "per_subject_scores": per_subject,
        "total_score": total_score,
        "paths": {"rectified": rect_path, "overlay": overlay_path}
    }
    return result