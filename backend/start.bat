@echo off
echo Starting Ecommerce Backend Server...
echo.
echo Make sure you have:
echo 1. MongoDB running locally or update MONGODB_URI in .env
echo 2. Created .env file from env.example
echo.
echo Starting server...
npm run dev
pause
