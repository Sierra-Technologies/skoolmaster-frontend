#!/bin/bash

# SkoolMaster Backend - Quick Setup Script for Mac
# This script will help you push the backend code to GitHub

echo "🚀 SkoolMaster Backend Setup"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "manage.py" ]; then
    echo "❌ Error: Please run this script from the skoolmaster-backend directory"
    exit 1
fi

echo "📋 Checking prerequisites..."

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install it first."
    exit 1
fi
echo "✅ Python 3 found"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found. Install with: brew install postgresql@14"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ PostgreSQL found"
fi

# Check Redis
if ! command -v redis-cli &> /dev/null; then
    echo "⚠️  Redis not found. Install with: brew install redis"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ Redis found"
fi

echo ""
echo "📦 Setting up virtual environment..."
python3 -m venv venv
source venv/bin/activate

echo ""
echo "📥 Installing dependencies..."
pip install -q -r requirements.txt

echo ""
echo "🔧 Setting up environment file..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo "⚠️  Please update .env with your database password"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🗄️  Database setup..."
read -p "Create database 'skoolmaster_db'? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    createdb skoolmaster_db 2>/dev/null && echo "✅ Database created" || echo "⚠️  Database might already exist"
fi

echo ""
echo "🔄 Running migrations..."
python manage.py makemigrations
python manage.py migrate

echo ""
echo "👤 Create superuser..."
read -p "Create superuser now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    python manage.py createsuperuser
fi

echo ""
echo "🌐 Git setup..."
read -p "Push to GitHub? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git remote get-url origin &> /dev/null
    if [ $? -ne 0 ]; then
        git remote add origin https://github.com/Sierra-Technologies/skoolmaster-backend.git
    fi

    echo "Pushing to GitHub..."
    git push -u origin main

    if [ $? -eq 0 ]; then
        echo "✅ Successfully pushed to GitHub!"
    else
        echo "⚠️  Push failed. You may need to authenticate with GitHub."
        echo "Run: gh auth login (if you have GitHub CLI)"
        echo "Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh"
    fi
fi

echo ""
echo "================================"
echo "✨ Setup Complete!"
echo ""
echo "To start the development server:"
echo "  source venv/bin/activate"
echo "  python manage.py runserver"
echo ""
echo "To start Celery worker:"
echo "  celery -A config worker -l info"
echo ""
echo "To start Celery beat:"
echo "  celery -A config beat -l info"
echo ""
echo "API Documentation:"
echo "  http://localhost:8000/swagger/"
echo "  http://localhost:8000/redoc/"
echo ""
