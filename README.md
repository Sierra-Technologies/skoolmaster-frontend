# SkoolMaster - School Management System

A comprehensive school management system with React frontend and Django REST API backend in a monorepo structure.

## 📁 Project Structure

```
skoolmaster/
├── backend/                 # Django REST API
│   ├── accounts/           # User management & authentication
│   ├── schools/            # School management
│   ├── students/           # Student management
│   ├── teachers/           # Teacher management
│   ├── config/             # Django project settings
│   ├── manage.py           # Django management script
│   ├── requirements.txt    # Python dependencies
│   ├── setup.sh            # Automated setup script
│   └── README.md           # Backend documentation
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── context/            # React context providers
│   ├── routes/             # Routing configuration
│   └── ...
├── public/                 # Static assets
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **PostgreSQL** 14+
- **Redis** 7+

### Installation

#### 1. Clone Repository

```bash
git clone https://github.com/Sierra-Technologies/skoolmaster-frontend.git
cd skoolmaster-frontend
```

#### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

Frontend runs on: **http://localhost:5173**

#### 3. Backend Setup

##### Option A: Automated Setup (Mac)

```bash
cd backend
chmod +x setup.sh
./setup.sh
```

##### Option B: Manual Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your database credentials

# Start services (Mac)
brew services start postgresql@14
brew services start redis

# Create database
createdb skoolmaster_db

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start Django server
python manage.py runserver
```

Backend runs on: **http://localhost:8000**

#### 4. Start Celery Workers (Optional)

```bash
# In backend directory (new terminal)
celery -A config worker -l info

# In another terminal (scheduled tasks)
celery -A config beat -l info
```

## 🎯 Features

### Frontend
- ✅ Modern React 18 UI with Tailwind CSS
- ✅ Professional landing pages (Home, Features, Pricing, About, Contact)
- ✅ School registration for free trials
- ✅ Role-based dashboards
  - Super Admin Dashboard
  - School Admin Dashboard
  - Teacher Dashboard
  - Student Dashboard
  - Parent Dashboard
- ✅ Multi-theme support (Ocean, Forest, Sunset, Royal, Midnight)
- ✅ JWT authentication
- ✅ Fully responsive design
- ✅ Demo accounts for testing

### Backend
- ✅ Django 5.0 + Django REST Framework
- ✅ JWT authentication with SimpleJWT
- ✅ Role-based access control
- ✅ PostgreSQL database
- ✅ Celery + Redis for background tasks
- ✅ CORS configured for React frontend
- ✅ Swagger/ReDoc API documentation
- ✅ Custom User model with 5 roles
- ✅ Multi-school management architecture

## 👥 User Roles

1. **Super Admin** - System-wide management, all schools
2. **School Admin** - Manage their school (students, teachers, classes)
3. **Teacher** - Manage classes, grades, attendance
4. **Student** - View grades, assignments, schedule
5. **Parent** - Monitor children's performance

## 📚 API Documentation

Once backend is running, access:
- **Swagger UI**: http://localhost:8000/swagger/
- **ReDoc**: http://localhost:8000/redoc/

## 🧪 Demo Credentials

### Super Admin
- **Email**: superadmin@skoolmaster.com
- **Password**: Admin@123

### School Admin
- **Email**: admin@springfield.edu
- **Password**: Admin@123

### Teacher
- **Email**: robert.williams@school.com
- **Password**: Teacher@123

### Student
- **Email**: john.doe@school.com
- **Password**: Student@123

### Parent
- **Email**: robert.doe@email.com
- **Password**: Parent@123

## 🛠️ Development

### Frontend Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
```

### Backend Commands

```bash
python manage.py runserver          # Start dev server
python manage.py makemigrations     # Create migrations
python manage.py migrate            # Run migrations
python manage.py createsuperuser    # Create admin user
python manage.py test               # Run tests
python manage.py shell              # Django shell
```

## 📦 Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: React Icons (Feather)
- **Charts**: Recharts

### Backend
- **Framework**: Django 5.0
- **API**: Django REST Framework 3.14
- **Database**: PostgreSQL
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Task Queue**: Celery 5.3
- **Broker/Cache**: Redis 5.0
- **API Docs**: drf-yasg

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

### Backend (backend/.env)
```env
SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=skoolmaster_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

See `backend/.env.example` for all available variables.

## 🏗️ Project Architecture

### Monorepo Structure
This project uses a monorepo structure with both frontend and backend in a single repository:
- **Frontend**: React SPA in the root directory
- **Backend**: Django REST API in the `/backend` directory

### Benefits
- ✅ Single repository for full-stack development
- ✅ Simplified deployment
- ✅ Shared configuration
- ✅ Easy to maintain consistency

## 🚀 Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend
```bash
# Collect static files
python manage.py collectstatic

# Run with gunicorn
gunicorn config.wsgi:application
```

## 📝 License

Proprietary - SkoolMaster

## 🤝 Contributing

This is a private project. Contact maintainers for access.

## 📧 Support

For support, email: support@skoolmaster.com

## 🎓 Documentation

- [Frontend README](./README.md)
- [Backend README](./backend/README.md)
- [API Documentation](http://localhost:8000/swagger/)
