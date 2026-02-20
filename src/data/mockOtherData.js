// Timetable Data
export const mockTimetable = [
  {
    id: 1,
    class: '10-A',
    day: 'Monday',
    period: 1,
    startTime: '08:00',
    endTime: '08:45',
    subject: 'Mathematics',
    teacher: 'Dr. Robert Williams',
    room: '101'
  },
  {
    id: 2,
    class: '10-A',
    day: 'Monday',
    period: 2,
    startTime: '08:50',
    endTime: '09:35',
    subject: 'Physics',
    teacher: 'Dr. Robert Williams',
    room: '101'
  },
  {
    id: 3,
    class: '10-A',
    day: 'Monday',
    period: 3,
    startTime: '09:40',
    endTime: '10:25',
    subject: 'English',
    teacher: 'Ms. Elizabeth Moore',
    room: '101'
  },
  {
    id: 4,
    class: '10-A',
    day: 'Monday',
    period: 4,
    startTime: '10:30',
    endTime: '11:15',
    subject: 'Chemistry',
    teacher: 'Mr. David Thompson',
    room: '101'
  },
  {
    id: 5,
    class: '10-A',
    day: 'Monday',
    period: 5,
    startTime: '11:45',
    endTime: '12:30',
    subject: 'Computer Science',
    teacher: 'Mr. Christopher Lee',
    room: '101'
  },
  {
    id: 6,
    class: '10-A',
    day: 'Tuesday',
    period: 1,
    startTime: '08:00',
    endTime: '08:45',
    subject: 'History',
    teacher: 'Mrs. Sarah Jackson',
    room: '101'
  },
  {
    id: 7,
    class: '10-A',
    day: 'Tuesday',
    period: 2,
    startTime: '08:50',
    endTime: '09:35',
    subject: 'Mathematics',
    teacher: 'Dr. Robert Williams',
    room: '101'
  }
];

// Assignments Data
export const mockAssignments = [
  {
    id: 1,
    title: 'Quadratic Equations Assignment',
    description: 'Solve problems 1-20 from Chapter 4',
    subject: 'Mathematics',
    class: '10-A',
    teacherId: 1,
    teacherName: 'Dr. Robert Williams',
    dueDate: '2024-12-05',
    totalMarks: 20,
    status: 'active',
    createdDate: '2024-11-20',
    submissions: 18,
    totalStudents: 30
  },
  {
    id: 2,
    title: 'Essay on Climate Change',
    description: 'Write a 500-word essay on the impact of climate change',
    subject: 'English',
    class: '10-A',
    teacherId: 2,
    teacherName: 'Ms. Elizabeth Moore',
    dueDate: '2024-12-08',
    totalMarks: 25,
    status: 'active',
    createdDate: '2024-11-22',
    submissions: 15,
    totalStudents: 30
  },
  {
    id: 3,
    title: 'Chemical Reactions Lab Report',
    description: 'Submit lab report for the chemical reactions experiment',
    subject: 'Chemistry',
    class: '11-A',
    teacherId: 3,
    teacherName: 'Mr. David Thompson',
    dueDate: '2024-12-01',
    totalMarks: 30,
    status: 'active',
    createdDate: '2024-11-18',
    submissions: 28,
    totalStudents: 32
  },
  {
    id: 4,
    title: 'Programming Project - Calculator',
    description: 'Create a calculator application using Python',
    subject: 'Computer Science',
    class: '12-A',
    teacherId: 5,
    teacherName: 'Mr. Christopher Lee',
    dueDate: '2024-12-15',
    totalMarks: 50,
    status: 'active',
    createdDate: '2024-11-15',
    submissions: 10,
    totalStudents: 25
  },
  {
    id: 5,
    title: 'World War II Essay',
    description: 'Write about the major events and impact of WWII',
    subject: 'History',
    class: '11-B',
    teacherId: 4,
    teacherName: 'Mrs. Sarah Jackson',
    dueDate: '2024-11-28',
    totalMarks: 20,
    status: 'overdue',
    createdDate: '2024-11-10',
    submissions: 22,
    totalStudents: 29
  }
];

// Announcements Data
export const mockAnnouncements = [
  {
    id: 1,
    title: 'Parent-Teacher Meeting',
    description: 'Parent-teacher meeting scheduled for all classes on December 10, 2024',
    category: 'Event',
    priority: 'high',
    publishDate: '2024-11-20',
    expiryDate: '2024-12-10',
    targetAudience: ['parents', 'teachers'],
    publishedBy: 'Admin',
    status: 'active'
  },
  {
    id: 2,
    title: 'Winter Break Notification',
    description: 'School will be closed for winter break from December 20, 2024 to January 5, 2025',
    category: 'Holiday',
    priority: 'medium',
    publishDate: '2024-11-15',
    expiryDate: '2024-12-19',
    targetAudience: ['students', 'parents', 'teachers'],
    publishedBy: 'Admin',
    status: 'active'
  },
  {
    id: 3,
    title: 'Sports Day 2024',
    description: 'Annual sports day will be held on November 30, 2024. All students are required to participate.',
    category: 'Sports',
    priority: 'high',
    publishDate: '2024-11-10',
    expiryDate: '2024-11-30',
    targetAudience: ['students', 'parents'],
    publishedBy: 'Physical Education Dept',
    status: 'active'
  },
  {
    id: 4,
    title: 'Library New Books Arrival',
    description: 'New collection of science and literature books available in the library',
    category: 'Library',
    priority: 'low',
    publishDate: '2024-11-25',
    expiryDate: '2024-12-25',
    targetAudience: ['students', 'teachers'],
    publishedBy: 'Librarian',
    status: 'active'
  },
  {
    id: 5,
    title: 'Mid-Term Exam Schedule',
    description: 'Mid-term examinations will commence from December 1, 2024. Check the detailed schedule on the portal.',
    category: 'Exam',
    priority: 'high',
    publishDate: '2024-11-18',
    expiryDate: '2024-12-15',
    targetAudience: ['students', 'parents', 'teachers'],
    publishedBy: 'Examination Department',
    status: 'active'
  }
];

// Schools Data (for Super Admin)
export const mockSchools = [
  {
    id: 1,
    name: 'Springfield High School',
    code: 'SPR001',
    email: 'admin@springfield.edu',
    phone: '+1234567820',
    address: '100 School St, Springfield, IL',
    principal: 'Dr. Emily Johnson',
    establishedYear: 1985,
    totalStudents: 850,
    totalTeachers: 45,
    subscriptionPlan: 'premium',
    subscriptionStatus: 'active',
    subscriptionExpiry: '2025-12-31',
    theme: 'default',
    logo: 'https://via.placeholder.com/150',
    website: 'https://springfield.edu',
    status: 'active'
  },
  {
    id: 2,
    name: 'Riverside Academy',
    code: 'RIV001',
    email: 'admin@riverside.edu',
    phone: '+1234567821',
    address: '200 River Rd, Riverside, CA',
    principal: 'Mr. James Anderson',
    establishedYear: 1992,
    totalStudents: 650,
    totalTeachers: 38,
    subscriptionPlan: 'basic',
    subscriptionStatus: 'active',
    subscriptionExpiry: '2025-06-30',
    theme: 'forest',
    logo: 'https://via.placeholder.com/150',
    website: 'https://riverside.edu',
    status: 'active'
  },
  {
    id: 3,
    name: 'Greenwood International',
    code: 'GRN001',
    email: 'admin@greenwood.edu',
    phone: '+1234567822',
    address: '300 Green Ave, Greenwood, TX',
    principal: 'Mrs. Sarah Williams',
    establishedYear: 2005,
    totalStudents: 1200,
    totalTeachers: 68,
    subscriptionPlan: 'enterprise',
    subscriptionStatus: 'active',
    subscriptionExpiry: '2026-12-31',
    theme: 'royal',
    logo: 'https://via.placeholder.com/150',
    website: 'https://greenwood.edu',
    status: 'active'
  },
  {
    id: 4,
    name: 'Oakdale Public School',
    code: 'OAK001',
    email: 'admin@oakdale.edu',
    phone: '+1234567823',
    address: '400 Oak St, Oakdale, NY',
    principal: 'Dr. Michael Brown',
    establishedYear: 1978,
    totalStudents: 500,
    totalTeachers: 30,
    subscriptionPlan: 'basic',
    subscriptionStatus: 'expired',
    subscriptionExpiry: '2024-10-31',
    theme: 'default',
    logo: 'https://via.placeholder.com/150',
    website: 'https://oakdale.edu',
    status: 'inactive'
  },
  {
    id: 5,
    name: 'Sunset Valley School',
    code: 'SUN001',
    email: 'admin@sunsetvalley.edu',
    phone: '+1234567824',
    address: '500 Sunset Blvd, Valley City, AZ',
    principal: 'Ms. Amanda Martinez',
    establishedYear: 2010,
    totalStudents: 750,
    totalTeachers: 42,
    subscriptionPlan: 'premium',
    subscriptionStatus: 'active',
    subscriptionExpiry: '2025-09-30',
    theme: 'sunset',
    logo: 'https://via.placeholder.com/150',
    website: 'https://sunsetvalley.edu',
    status: 'active'
  }
];

// Users/Admins Data
export const mockUsers = [
  {
    id: 1,
    username: 'superadmin',
    email: 'superadmin@skoolmaster.com',
    password: 'Admin@123',
    role: 'super_admin',
    name: 'Super Administrator',
    photo: 'https://i.pravatar.cc/150?img=68',
    status: 'active'
  },
  {
    id: 2,
    username: 'admin',
    email: 'admin@springfield.edu',
    password: 'Admin@123',
    role: 'admin',
    schoolId: 1,
    name: 'School Administrator',
    photo: 'https://i.pravatar.cc/150?img=69',
    status: 'active'
  },
  {
    id: 3,
    username: 'teacher1',
    email: 'robert.williams@school.com',
    password: 'Teacher@123',
    role: 'teacher',
    schoolId: 1,
    teacherId: 1,
    name: 'Dr. Robert Williams',
    photo: 'https://i.pravatar.cc/150?img=60',
    status: 'active'
  },
  {
    id: 4,
    username: 'student1',
    email: 'john.doe@school.com',
    password: 'Student@123',
    role: 'student',
    schoolId: 1,
    studentId: 1,
    name: 'John Doe',
    photo: 'https://i.pravatar.cc/150?img=12',
    status: 'active'
  },
  {
    id: 5,
    username: 'parent1',
    email: 'robert.doe@email.com',
    password: 'Parent@123',
    role: 'parent',
    schoolId: 1,
    children: [1],
    name: 'Robert Doe',
    photo: 'https://i.pravatar.cc/150?img=70',
    status: 'active'
  }
];

// Dashboard Stats
export const mockDashboardStats = {
  superadmin: {
    totalSchools: 5,
    activeSchools: 4,
    totalStudents: 3950,
    totalTeachers: 223,
    totalRevenue: 485000,
    activeSubscriptions: 4,
    expiringSubscriptions: 1
  },
  admin: {
    totalStudents: 850,
    totalTeachers: 45,
    totalClasses: 24,
    averageAttendance: 92.5,
    pendingFees: 125000,
    upcomingExams: 3,
    recentAdmissions: 12
  },
  teacher: {
    totalClasses: 6,
    totalStudents: 180,
    pendingAssignments: 8,
    todayClasses: 4,
    averageGrade: 85.5
  },
  student: {
    totalSubjects: 8,
    averageGrade: 85.2,
    attendancePercentage: 94.5,
    pendingAssignments: 3,
    upcomingExams: 2
  },
  parent: {
    totalChildren: 2,
    pendingFees: 5000,
    upcomingMeetings: 1,
    recentAnnouncements: 3
  }
};
