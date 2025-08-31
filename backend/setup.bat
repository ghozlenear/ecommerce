@echo off
echo ========================================
echo    Ecommerce Backend Setup Script
echo ========================================
echo.

echo 📦 Installing dependencies...
npm install

echo.
echo 🔧 Creating environment file...
if not exist .env (
    copy env.example .env
    echo ✅ Created .env file from template
    echo ⚠️  Please edit .env with your actual values
) else (
    echo ✅ .env file already exists
)

echo.
echo 🗄️  MongoDB Setup Instructions:
echo    1. Install MongoDB Community Edition
echo    2. Start MongoDB service: mongod
echo    3. Or use MongoDB Atlas (cloud)
echo    4. Update MONGODB_URI in .env file
echo.

echo 🚀 To start the backend server:
echo    npm run dev
echo.

echo 🧪 To test the API:
echo    npm run test-api
echo.

echo 📚 Check README.md for detailed documentation
echo.

pause
