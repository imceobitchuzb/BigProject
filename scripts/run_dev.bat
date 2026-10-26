@echo off
echo ==================================================
echo  Starting SafeInGame Full-Stack MVP (Windows Batch)
echo ==================================================

cd /d "%~dp0.."

REM Start backend in new command prompt window
start "SafeInGame Backend API (Port 8000)" cmd /k "cd backend && venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000"

REM Start frontend in current window
cd frontend
echo Starting Frontend (Port 4321)...
npm run dev
