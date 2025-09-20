import requests
import time
from pathlib import Path

def test_api():
    # Wait for server to start
    time.sleep(3)
    
    # Test the upload endpoint
    url = "http://127.0.0.1:8000/upload"
    
    # Use the sample image
    image_path = Path("src/sample_data/Img5.jpeg")
    
    if not image_path.exists():
        print(f"Image file not found: {image_path}")
        return
    
    try:
        with open(image_path, "rb") as f:
            files = {"image": f}
            response = requests.post(url, files=files)
            
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
    except requests.exceptions.ConnectionError:
        print("Could not connect to server. Make sure it's running on port 8000")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_api()
