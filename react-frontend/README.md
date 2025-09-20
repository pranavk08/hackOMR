# OMR Scanner - React Frontend

A modern React.js frontend for the OMR Scanner application that connects to the FastAPI backend.

## Features

- 🎨 Modern, responsive UI with drag-and-drop file upload
- 📱 Mobile-friendly design
- ⚡ Real-time image processing
- 📊 Interactive results display with scores and answers
- 🖼️ Processed image preview (rectified and overlay)
- 🔄 Loading states and error handling

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- FastAPI backend running on port 8000

## Installation

1. Navigate to the react-frontend directory:
   ```bash
   cd react-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Header.js          # App header with title
│   ├── UploadArea.js      # File upload with drag-and-drop
│   ├── Results.js         # Results display component
│   ├── Loading.js         # Loading spinner component
│   └── ErrorMessage.js    # Error message component
├── services/
│   └── api.js             # API service for backend communication
├── App.js                 # Main app component
├── index.js               # App entry point
└── index.css              # Global styles
```

## Backend Integration

The frontend communicates with the FastAPI backend running on `http://127.0.0.1:8000`. Make sure the backend is running before using the frontend.

### API Endpoints Used

- `POST /upload` - Upload and process OMR images
- `GET /outputs/*` - Serve processed images
- `GET /docs` - API documentation (for health checks)

## Usage

1. Start the FastAPI backend:
   ```bash
   cd ../
   python main.py
   ```

2. Start the React frontend:
   ```bash
   cd react-frontend
   npm start
   ```

3. Open the app in your browser and upload an OMR sheet image

## Technologies Used

- **React 18** - Frontend framework
- **React Dropzone** - Drag-and-drop file upload
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library
- **CSS3** - Styling with modern features

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

1. **Cannot connect to server**
   - Make sure the FastAPI backend is running on port 8000
   - Check if there are any firewall restrictions

2. **File upload fails**
   - Ensure the image file is a supported format (JPEG, PNG, etc.)
   - Check file size (should be under 10MB)

3. **Images not displaying**
   - Verify that the backend is serving static files correctly
   - Check browser console for CORS errors

## Development

To modify the frontend:

1. Edit components in `src/components/`
2. Update styles in `src/index.css` or component-specific styles
3. Modify API calls in `src/services/api.js`
4. Test changes with `npm start`

## Production Build

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build/` folder that can be served by any static file server.
