"""
Seed script to populate the database with initial data matching mock data from the frontend.
Run with: python3 manage.py shell < seed_data.py
"""
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from schools.models import School
from students.models import Student
from teachers.models import Teacher
from parents.models import Parent
from academics.models import ClassRoom, Subject

User = get_user_model()

print("Seeding database...")

# --- Schools ---
school1, _ = School.objects.get_or_create(
    code='SPR001',
    defaults=dict(
        name='Springfield High School',
        email='admin@springfield.edu',
        phone='+1234567820',
        address='100 School St, Springfield, IL',
        principal='Dr. Emily Johnson',
        established_year=1985,
        total_students=850,
        total_teachers=45,
        subscription_plan='premium',
        subscription_status='active',
        theme='default',
        website='https://springfield.edu',
        status='active',
    )
)
print(f"  School: {school1.name}")

school2, _ = School.objects.get_or_create(
    code='RIV001',
    defaults=dict(
        name='Riverside Academy',
        email='admin@riverside.edu',
        phone='+1234567821',
        address='200 River Rd, Riverside, CA',
        principal='Mr. James Anderson',
        established_year=1992,
        total_students=650,
        total_teachers=38,
        subscription_plan='basic',
        subscription_status='active',
        theme='forest',
        website='https://riverside.edu',
        status='active',
    )
)
print(f"  School: {school2.name}")

# --- Users ---
super_admin, created = User.objects.get_or_create(
    email='superadmin@skoolmaster.com',
    defaults=dict(
        first_name='Super',
        last_name='Administrator',
        role='super_admin',
        is_staff=True,
        is_superuser=True,
        is_active=True,
    )
)
if created:
    super_admin.set_password('Admin@123')
    super_admin.save()
    print(f"  User created: {super_admin.email}")
else:
    print(f"  User exists: {super_admin.email}")

admin_user, created = User.objects.get_or_create(
    email='admin@springfield.edu',
    defaults=dict(
        first_name='School',
        last_name='Administrator',
        role='admin',
        is_active=True,
    )
)
if created:
    admin_user.set_password('Admin@123')
    admin_user.save()
    print(f"  User created: {admin_user.email}")
else:
    print(f"  User exists: {admin_user.email}")

teacher_user, created = User.objects.get_or_create(
    email='robert.williams@school.com',
    defaults=dict(
        first_name='Robert',
        last_name='Williams',
        role='teacher',
        is_active=True,
    )
)
if created:
    teacher_user.set_password('Teacher@123')
    teacher_user.save()

student_user, created = User.objects.get_or_create(
    email='john.doe@school.com',
    defaults=dict(
        first_name='John',
        last_name='Doe',
        role='student',
        is_active=True,
    )
)
if created:
    student_user.set_password('Student@123')
    student_user.save()

parent_user, created = User.objects.get_or_create(
    email='robert.doe@email.com',
    defaults=dict(
        first_name='Robert',
        last_name='Doe',
        role='parent',
        is_active=True,
    )
)
if created:
    parent_user.set_password('Parent@123')
    parent_user.save()

print("  All demo users created/verified")

# --- Subjects ---
subjects_data = [
    ('Mathematics', 'MATH', 'core'),
    ('Physics', 'PHY', 'core'),
    ('Chemistry', 'CHEM', 'core'),
    ('Biology', 'BIO', 'core'),
    ('English', 'ENG', 'core'),
    ('History', 'HIST', 'core'),
    ('Computer Science', 'CS', 'core'),
    ('Physical Education', 'PE', 'elective'),
]
created_subjects = {}
for name, code, stype in subjects_data:
    subj, _ = Subject.objects.get_or_create(
        school=school1,
        code=code,
        defaults=dict(name=name, subject_type=stype, status='active')
    )
    created_subjects[name] = subj
print(f"  Subjects: {len(created_subjects)} created/verified")

# --- Classes ---
class_data = [
    ('10', 'A'), ('10', 'B'),
    ('11', 'A'), ('11', 'B'),
    ('12', 'A'), ('12', 'B'),
]
created_classes = {}
for class_name, section in class_data:
    cls, _ = ClassRoom.objects.get_or_create(
        school=school1,
        name=class_name,
        section=section,
        defaults=dict(academic_year='2024-2025', capacity=35, status='active')
    )
    created_classes[f"{class_name}-{section}"] = cls
print(f"  ClassRooms: {len(created_classes)} created/verified")

# --- Teachers ---
teachers_data = [
    {
        'user': teacher_user,
        'teacher_id': 'TCH2024001',
        'first_name': 'Robert', 'last_name': 'Williams',
        'email': 'robert.williams@school.com',
        'phone': '+1234567810',
        'gender': 'male',
        'qualification': 'Ph.D. in Mathematics',
        'experience': 12,
        'joining_date': '2012-08-01',
        'status': 'active',
        'salary': 75000,
        'specialization': 'Advanced Mathematics',
    },
    {
        'user': None,
        'teacher_id': 'TCH2024002',
        'first_name': 'Elizabeth', 'last_name': 'Moore',
        'email': 'elizabeth.moore@school.com',
        'phone': '+1234567811',
        'gender': 'female',
        'qualification': 'M.A. in English Literature',
        'experience': 8,
        'joining_date': '2016-07-15',
        'status': 'active',
        'salary': 62000,
        'specialization': 'Creative Writing',
    },
    {
        'user': None,
        'teacher_id': 'TCH2024003',
        'first_name': 'David', 'last_name': 'Thompson',
        'email': 'david.thompson@school.com',
        'phone': '+1234567812',
        'gender': 'male',
        'qualification': 'M.Sc. in Chemistry',
        'experience': 15,
        'joining_date': '2009-06-01',
        'status': 'active',
        'salary': 68000,
        'specialization': 'Organic Chemistry',
    },
]
created_teachers = []
for td in teachers_data:
    teacher, _ = Teacher.objects.get_or_create(
        teacher_id=td['teacher_id'],
        defaults=dict(
            school=school1,
            user=td.get('user'),
            first_name=td['first_name'],
            last_name=td['last_name'],
            email=td['email'],
            phone=td['phone'],
            gender=td['gender'],
            qualification=td['qualification'],
            experience=td['experience'],
            joining_date=td.get('joining_date', '2020-01-01'),
            status=td['status'],
            salary=td.get('salary', 0),
            specialization=td.get('specialization', ''),
        )
    )
    created_teachers.append(teacher)
print(f"  Teachers: {len(created_teachers)} created/verified")

# --- Students ---
students_data = [
    {
        'user': student_user,
        'student_id': 'STU2024001',
        'first_name': 'John', 'last_name': 'Doe',
        'email': 'john.doe@school.com',
        'phone': '+1234567890',
        'gender': 'male',
        'class_name': '10', 'section': 'A', 'roll_number': 1,
        'parent_name': 'Robert Doe',
        'parent_email': 'robert.doe@email.com',
        'parent_phone': '+1234567891',
        'blood_group': 'O+',
        'fee_status': 'paid',
        'attendance_percentage': 94.5,
        'current_gpa': 3.8,
    },
    {
        'user': None,
        'student_id': 'STU2024002',
        'first_name': 'Jane', 'last_name': 'Smith',
        'email': 'jane.smith@school.com',
        'phone': '+1234567892',
        'gender': 'female',
        'class_name': '10', 'section': 'A', 'roll_number': 2,
        'parent_name': 'Sarah Smith',
        'parent_email': 'sarah.smith@email.com',
        'parent_phone': '+1234567893',
        'blood_group': 'A+',
        'fee_status': 'paid',
        'attendance_percentage': 97.2,
        'current_gpa': 3.9,
    },
    {
        'user': None,
        'student_id': 'STU2024003',
        'first_name': 'Michael', 'last_name': 'Johnson',
        'email': 'michael.j@school.com',
        'phone': '+1234567894',
        'gender': 'male',
        'class_name': '10', 'section': 'B', 'roll_number': 1,
        'parent_name': 'David Johnson',
        'parent_email': 'david.j@email.com',
        'parent_phone': '+1234567895',
        'blood_group': 'B+',
        'fee_status': 'pending',
        'attendance_percentage': 89.5,
        'current_gpa': 3.5,
    },
    {
        'user': None,
        'student_id': 'STU2024004',
        'first_name': 'Emily', 'last_name': 'Davis',
        'email': 'emily.d@school.com',
        'phone': '+1234567896',
        'gender': 'female',
        'class_name': '11', 'section': 'A', 'roll_number': 1,
        'parent_name': 'Linda Davis',
        'parent_email': 'linda.d@email.com',
        'parent_phone': '+1234567897',
        'blood_group': 'AB+',
        'fee_status': 'paid',
        'attendance_percentage': 95.1,
        'current_gpa': 3.85,
    },
    {
        'user': None,
        'student_id': 'STU2024005',
        'first_name': 'Daniel', 'last_name': 'Martinez',
        'email': 'daniel.m@school.com',
        'phone': '+1234567898',
        'gender': 'male',
        'class_name': '11', 'section': 'B', 'roll_number': 1,
        'parent_name': 'Carlos Martinez',
        'parent_email': 'carlos.m@email.com',
        'parent_phone': '+1234567899',
        'blood_group': 'O-',
        'fee_status': 'overdue',
        'attendance_percentage': 88.7,
        'current_gpa': 3.4,
    },
]
created_students = []
for sd in students_data:
    student, _ = Student.objects.get_or_create(
        student_id=sd['student_id'],
        defaults=dict(
            school=school1,
            user=sd.get('user'),
            first_name=sd['first_name'],
            last_name=sd['last_name'],
            email=sd['email'],
            phone=sd['phone'],
            gender=sd['gender'],
            class_name=sd['class_name'],
            section=sd['section'],
            roll_number=sd['roll_number'],
            parent_name=sd['parent_name'],
            parent_email=sd['parent_email'],
            parent_phone=sd['parent_phone'],
            blood_group=sd.get('blood_group', ''),
            fee_status=sd['fee_status'],
            attendance_percentage=sd['attendance_percentage'],
            current_gpa=sd['current_gpa'],
            status='active',
        )
    )
    created_students.append(student)
print(f"  Students: {len(created_students)} created/verified")

# --- Parent ---
parent, _ = Parent.objects.get_or_create(
    email='robert.doe@email.com',
    defaults=dict(
        school=school1,
        user=parent_user,
        first_name='Robert',
        last_name='Doe',
        phone='+1234567891',
        occupation='Engineer',
        status='active',
    )
)
print(f"  Parent: {parent.first_name} {parent.last_name}")

print("\nDatabase seeded successfully!")
print("\nDemo credentials:")
print("  Super Admin: superadmin@skoolmaster.com / Admin@123")
print("  School Admin: admin@springfield.edu / Admin@123")
print("  Teacher:      robert.williams@school.com / Teacher@123")
print("  Student:      john.doe@school.com / Student@123")
print("  Parent:       robert.doe@email.com / Parent@123")
