```markdown
# OMR Hackathon PoC

Minimal PoC for Automated OMR evaluation (single-version) suitable for a hackathon demo.

What it does:
- Accepts a mobile photo upload via FastAPI `/upload`
- Performs basic perspective correction (largest contour) and warps to a template
- Evaluates filled bubbles using simple intensity thresholding
- Computes per-subject (0–20) and total (0–100) scores
- Saves rectified + overlay images under `outputs/`

Quick start (local):
1. Create and activate a virtualenv:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
2. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```
3. Add your template & answer key files under `sample_data/` and put some photos in `sample_data/raw_images/`.
4. Run the server:
   ```bash
   uvicorn src.app:app --reload --host 0.0.0.0 --port 8000
   ```
5. Demo an image (example using curl):
   ```bash
   curl -X POST "http://127.0.0.1:8000/upload" -F "image=@sample_data/raw_images/image1.jpg"
   ```

Notes:
- This is an MVP for a hackathon: single-version support and deterministic CV logic (no ML). If you upload a blank template scan and some sample photos I will tune the template coordinates and thresholds for you.
```