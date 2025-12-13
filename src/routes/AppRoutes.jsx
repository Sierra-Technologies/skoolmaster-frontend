import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Public Pages
import Landing from '../pages/Landing';

// Auth Pages
import Login from '../pages/auth/Login';

// Super Admin Pages
import SuperAdminDashboard from '../pages/superadmin/Dashboard';
import Schools from '../pages/superadmin/Schools';
import Subscriptions from '../pages/superadmin/Subscriptions';
import Analytics from '../pages/superadmin/Analytics';
import Settings from '../pages/superadmin/Settings';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import Students from '../pages/admin/Students';
import Teachers from '../pages/admin/Teachers';
import Classes from '../pages/admin/Classes';
import Subjects from '../pages/admin/Subjects';
import Grades from '../pages/admin/Grades';
import Attendance from '../pages/admin/Attendance';
import Exams from '../pages/admin/Exams';
import Fees from '../pages/admin/Fees';
import Admissions from '../pages/admin/Admissions';
import Timetable from '../pages/admin/Timetable';
import Reports from '../pages/admin/Reports';
import AdminSettings from '../pages/admin/Settings';

// Teacher Pages
import TeacherDashboard from '../pages/teacher/Dashboard';
import TeacherMyClasses from '../pages/teacher/MyClasses';
import TeacherAttendance from '../pages/teacher/Attendance';
import TeacherGrades from '../pages/teacher/Grades';
import TeacherAssignments from '../pages/teacher/Assignments';
import TeacherTimetable from '../pages/teacher/Timetable';
import TeacherStudents from '../pages/teacher/Students';

// Student Pages
import StudentDashboard from '../pages/student/Dashboard';
import StudentMyClasses from '../pages/student/MyClasses';
import StudentGrades from '../pages/student/Grades';
import StudentAttendance from '../pages/student/Attendance';
import StudentAssignments from '../pages/student/Assignments';
import StudentTimetable from '../pages/student/Timetable';
import StudentProfile from '../pages/student/Profile';
import StudentFees from '../pages/student/Fees';

// Parent Pages
import ParentDashboard from '../pages/parent/Dashboard';
import ParentChildren from '../pages/parent/Children';
import ParentGrades from '../pages/parent/Grades';
import ParentAttendance from '../pages/parent/Attendance';
import ParentFees from '../pages/parent/Fees';
import ParentCommunication from '../pages/parent/Communication';
import ParentTimetable from '../pages/parent/Timetable';

// Not Found
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  const { user } = useAuth();

  const getDefaultRoute = () => {
    if (!user) return '/';

    const dashboards = {
      super_admin: '/superadmin/dashboard',
      admin: '/admin/dashboard',
      teacher: '/teacher/dashboard',
      student: '/student/dashboard',
      parent: '/parent/dashboard',
    };

    return dashboards[user.role] || '/';
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={user ? <Navigate to={getDefaultRoute()} /> : <Login />} />

        {/* Super Admin Routes */}
        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/schools"
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <Schools />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/subscriptions"
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <Subscriptions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/analytics"
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/settings"
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/teachers"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Teachers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/classes"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Classes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/subjects"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Subjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/grades"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Grades />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/exams"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Exams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/fees"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Fees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/admissions"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admissions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/timetable"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Timetable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminSettings />
            </ProtectedRoute>
          }
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/my-classes"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherMyClasses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/attendance"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/grades"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherGrades />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/assignments"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/timetable"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherTimetable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/students"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherStudents />
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/my-classes"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentMyClasses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/grades"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentGrades />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/assignments"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/timetable"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentTimetable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/fees"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentFees />
            </ProtectedRoute>
          }
        />

        {/* Parent Routes */}
        <Route
          path="/parent/dashboard"
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/children"
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentChildren />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/grades"
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentGrades />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/attendance"
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/fees"
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentFees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/communication"
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentCommunication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/timetable"
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentTimetable />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
