@echo off
echo Setting up React frontend for OMR Scanner...
echo.

cd react-frontend

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo Error installing dependencies. Please check if Node.js is installed.
    pause
    exit /b 1
)

echo.
echo Setup complete!
echo.
echo To start the React frontend:
echo 1. Make sure the FastAPI backend is running (python main.py)
echo 2. Run: cd react-frontend && npm start
echo 3. Open http://localhost:3000 in your browser
echo.
pause
