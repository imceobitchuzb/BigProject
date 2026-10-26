# SafeInGame Local Development Launcher (PowerShell)
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " Starting SafeInGame Full-Stack MVP (Dev Mode)" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

$rootDir = Split-Path -Parent $PSScriptRoot

# 1. Check virtual environment
$pythonExe = Join-Path $rootDir "backend\venv\Scripts\python.exe"
if (-not (Test-Path $pythonExe)) {
    Write-Host "Creating Python virtual environment in backend\venv..." -ForegroundColor Yellow
    python -m venv (Join-Path $rootDir "backend\venv")
    & $pythonExe -m pip install -r (Join-Path $rootDir "backend\requirements.txt")
}

# 2. Seed database if needed
Write-Host "Ensuring database tables and categories are ready..." -ForegroundColor Green
Set-Location (Join-Path $rootDir "backend")
& $pythonExe cli.py seed-categories

# 3. Start Backend in separate window
Write-Host "Launching Backend API on http://127.0.0.1:8000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\backend'; .\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000"

# 4. Start Frontend
Write-Host "Launching Frontend Dev Server on http://localhost:4321..." -ForegroundColor Cyan
Set-Location (Join-Path $rootDir "frontend")
npm run dev
