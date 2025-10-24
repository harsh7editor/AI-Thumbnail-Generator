@echo off
echo ========================================
echo AI Thumbnail Generator - Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

echo NPM version:
npm --version
echo.

echo ========================================
echo Installing Backend Dependencies...
echo ========================================
cd backend
if not exist ".env" (
    echo Creating .env file from template...
    copy .env.example .env
    echo.
    echo IMPORTANT: Edit backend\.env and add your OpenAI API key!
    echo Or set USE_AI_GENERATION=false to run without AI.
    echo.
)
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Installing Frontend Dependencies...
echo ========================================
cd frontend
if not exist ".env" (
    echo Creating .env file from template...
    copy .env.example .env
)
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Edit backend\.env and add your OpenAI API key
echo    (or set USE_AI_GENERATION=false for free mode)
echo.
echo 2. Open TWO terminal windows:
echo    Terminal 1: cd backend ^&^& npm run dev
echo    Terminal 2: cd frontend ^&^& npm start
echo.
echo 3. Open http://localhost:3000 in your browser
echo.
echo For detailed instructions, see QUICKSTART.md
echo.
pause
