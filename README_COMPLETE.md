# OMR Scanner - Complete Full-Stack Application

A complete Optical Mark Recognition (OMR) system with FastAPI backend and React.js frontend.

## 🚀 Quick Start

### Option 1: Simple HTML Frontend (No Installation Required)
```bash
# Start the backend
python main.py

# Open http://127.0.0.1:8000 in your browser
```

### Option 2: React Frontend (Modern UI)
```bash
# 1. Start the backend
python main.py

# 2. Setup React frontend (first time only)
setup_react.bat

# 3. Start React frontend
start_react.bat

# 4. Open http://localhost:3000 in your browser
```

## 📁 Project Structure

```
project/
├── src/                          # Backend source code
│   ├── app.py                    # FastAPI application
│   ├── omr_pipeline.py           # OMR processing logic
│   └── sample_data/              # Template and sample images
├── static/                       # Simple HTML frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
├── react-frontend/               # React.js frontend
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── services/             # API services
│   │   └── App.js
│   └── package.json
├── outputs/                      # Processed images
├── main.py                       # Backend runner
├── run_smoke_test.py             # Test script
└── requirements.txt              # Python dependencies
```

## 🎯 Features

### Backend (FastAPI)
- ✅ Image upload and processing
- ✅ Perspective correction and warping
- ✅ Bubble detection and evaluation
- ✅ Score calculation (per subject and total)
- ✅ Template-based OMR processing
- ✅ RESTful API with automatic documentation
- ✅ Static file serving for processed images

### Frontend Options

#### Simple HTML Frontend
- ✅ Drag-and-drop file upload
- ✅ Real-time processing
- ✅ Results display with scores
- ✅ Processed image preview
- ✅ No installation required

#### React Frontend
- ✅ Modern, responsive UI
- ✅ Component-based architecture
- ✅ Advanced drag-and-drop
- ✅ Loading states and error handling
- ✅ Mobile-friendly design
- ✅ Professional styling

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.7+
- Node.js 14+ (for React frontend)
- pip (Python package manager)

### Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the backend
python main.py
```

### React Frontend Setup
```bash
# Navigate to React frontend
cd react-frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 📖 Usage

### 1. Start the Backend
```bash
python main.py
```
The API will be available at `http://127.0.0.1:8000`
API documentation at `http://127.0.0.1:8000/docs`

### 2. Choose Your Frontend

#### Option A: Simple HTML Frontend
- Open `http://127.0.0.1:8000` in your browser
- Drag and drop an OMR image
- Click "Process OMR Sheet"
- View results and processed images

#### Option B: React Frontend
- Start React app: `cd react-frontend && npm start`
- Open `http://localhost:3000` in your browser
- Upload an OMR image using the modern interface
- View detailed results with interactive components

### 3. Test with Sample Data
```bash
# Run the smoke test
python run_smoke_test.py
```

## 🔧 API Endpoints

- `GET /` - Serve frontend
- `POST /upload` - Upload and process OMR image
- `GET /docs` - API documentation
- `GET /outputs/*` - Serve processed images

## 📊 Sample Response

```json
{
  "sheet_id": "uuid-here",
  "version": "v1",
  "answers": {
    "Q1": "A",
    "Q2": "B"
  },
  "confidences": {
    "Q1": 85.5,
    "Q2": 92.3
  },
  "per_subject_scores": {
    "math": 18,
    "science": 16
  },
  "total_score": 85,
  "paths": {
    "rectified": "outputs/uuid_rectified.png",
    "overlay": "outputs/uuid_overlay.png"
  }
}
```

## 🎨 Frontend Comparison

| Feature | HTML Frontend | React Frontend |
|---------|---------------|----------------|
| Setup | ✅ No installation | ⚙️ npm install required |
| UI/UX | ✅ Clean & functional | ✅ Modern & professional |
| Responsiveness | ✅ Basic | ✅ Advanced |
| Components | ❌ Monolithic | ✅ Modular |
| State Management | ❌ Basic | ✅ Advanced |
| Error Handling | ✅ Basic | ✅ Comprehensive |
| Loading States | ✅ Basic | ✅ Advanced |

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**
   - Check if port 8000 is available
   - Ensure all dependencies are installed
   - Verify Python version (3.7+)

2. **React app won't start**
   - Ensure Node.js is installed
   - Run `npm install` in react-frontend directory
   - Check if port 3000 is available

3. **File upload fails**
   - Ensure backend is running
   - Check file format (JPEG, PNG supported)
   - Verify file size (under 10MB)

4. **Images not displaying**
   - Check if outputs directory exists
   - Verify backend static file serving
   - Check browser console for errors

## 🚀 Deployment

### Backend Deployment
- Use Gunicorn or similar WSGI server
- Set up reverse proxy (Nginx)
- Configure static file serving

### Frontend Deployment
- Build React app: `npm run build`
- Serve static files from `build/` directory
- Configure API base URL for production

## 📝 Development

### Adding New Features
1. Backend: Modify `src/app.py` and `src/omr_pipeline.py`
2. HTML Frontend: Update `static/` files
3. React Frontend: Modify components in `react-frontend/src/`

### Testing
```bash
# Test backend
python run_smoke_test.py

# Test API
python test_api.py
```

I’m a beginner working on this OMR hackathon. I set up the backend and frontend, but I’m facing API connection issues between them. I tried my best to align the ports and URLs; if the app doesn’t connect, please set the frontend API base URL to the exact backend port (e.g., 8000/8002/5000), or run the production server (single-page UI + API) because of time limit im not able to processed more. If you see errors, check the backend /docs or /health on the chosen port, then match that in the frontend. 
