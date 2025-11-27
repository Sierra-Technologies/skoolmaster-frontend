import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

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

// Teacher Pages
import TeacherDashboard from '../pages/teacher/Dashboard';

// Student Pages
import StudentDashboard from '../pages/student/Dashboard';

// Parent Pages
import ParentDashboard from '../pages/parent/Dashboard';

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
        <Route path="/" element={user ? <Navigate to={getDefaultRoute()} /> : <Login />} />

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

        {/* Teacher Routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
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

        {/* Parent Routes */}
        <Route
          path="/parent/dashboard"
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard />
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
