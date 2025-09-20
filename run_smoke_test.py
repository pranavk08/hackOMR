from pathlib import Path
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))
from omr_pipeline import process_image_bytes

p = Path("src/sample_data/Img5.jpeg")
with p.open("rb") as f:
    out = process_image_bytes(f.read(), sheet_id="test_sheet")
print(out)