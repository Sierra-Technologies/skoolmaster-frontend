# SkoolMaster Backend

Django REST Framework backend for SkoolMaster School Management System.

## Features

- 🔐 JWT Authentication
- 👥 Role-based Access Control (Super Admin, Admin, Teacher, Student, Parent)
- 🏫 Multi-school Management
- 📊 RESTful API
- 📧 Celery Background Tasks
- 🗄️ PostgreSQL Database
- 📝 API Documentation with Swagger

## Tech Stack

- **Framework:** Django 5.0 + Django REST Framework
- **Database:** PostgreSQL
- **Authentication:** JWT (Simple JWT)
- **Task Queue:** Celery + Redis
- **API Docs:** drf-yasg (Swagger)

## Prerequisites

- Python 3.11+
- PostgreSQL 14+
- Redis 7+

## Installation

### 1. Install PostgreSQL (Mac)

```bash
# Install PostgreSQL
brew install postgresql@14

# Start PostgreSQL service
brew services start postgresql@14

# Create database
createdb skoolmaster_db
```

### 2. Install Redis (Mac)

```bash
# Install Redis
brew install redis

# Start Redis service
brew services start redis
```

### 3. Setup Python Environment

```bash
# Create virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Environment Configuration

```bash
# Copy environment file
cp .env.example .env

# Update .env with your settings
# Especially: DB_PASSWORD, SECRET_KEY
```

### 5. Database Setup

```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### 6. Run Development Server

```bash
# Start Django server
python manage.py runserver

# In another terminal, start Celery worker
celery -A config worker -l info

# In another terminal, start Celery beat (for scheduled tasks)
celery -A config beat -l info
```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new school/user
- `POST /api/auth/login/` - Login (get JWT tokens)
- `POST /api/auth/refresh/` - Refresh access token
- `POST /api/auth/logout/` - Logout

### Users
- `GET /api/users/` - List users
- `GET /api/users/{id}/` - Get user details
- `PUT /api/users/{id}/` - Update user
- `DELETE /api/users/{id}/` - Delete user

### Schools
- `GET /api/schools/` - List schools
- `POST /api/schools/` - Create school
- `GET /api/schools/{id}/` - Get school details

### Students
- `GET /api/students/` - List students
- `POST /api/students/` - Create student
- `GET /api/students/{id}/` - Get student details

### Teachers
- `GET /api/teachers/` - List teachers
- `POST /api/teachers/` - Create teacher

## Project Structure

```
skoolmaster-backend/
├── config/              # Project settings
│   ├── settings.py     # Django settings
│   ├── urls.py         # Main URL configuration
│   ├── celery.py       # Celery configuration
│   └── wsgi.py         # WSGI application
├── accounts/           # User management
├── schools/            # School management
├── students/           # Student management
├── teachers/           # Teacher management
├── manage.py          # Django management script
├── requirements.txt   # Python dependencies
└── .env               # Environment variables
```

## User Roles

1. **Super Admin** - Manages all schools and system settings
2. **Admin** - Manages their school (students, teachers, classes)
3. **Teacher** - Manages classes, grades, attendance
4. **Student** - Views grades, assignments, schedule
5. **Parent** - Views children's performance and attendance

## API Documentation

Once the server is running, access:
- Swagger UI: `http://localhost:8000/swagger/`
- ReDoc: `http://localhost:8000/redoc/`

## Development

```bash
# Run tests
python manage.py test

# Create new Django app
python manage.py startapp app_name

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `SECRET_KEY` - Django secret key
- `DEBUG` - Debug mode (True/False)
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `CELERY_BROKER_URL` - Redis URL for Celery
- `CORS_ALLOWED_ORIGINS` - Frontend URLs

## License

Proprietary - SkoolMaster
