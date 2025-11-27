import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { toast, Toaster } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        toast.success('Login successful!');

        // Redirect based on role
        const dashboards = {
          super_admin: '/superadmin/dashboard',
          admin: '/admin/dashboard',
          teacher: '/teacher/dashboard',
          student: '/student/dashboard',
          parent: '/parent/dashboard',
        };

        setTimeout(() => {
          navigate(dashboards[result.user.role] || '/');
        }, 500);
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Super Admin', email: 'superadmin@skoolmaster.com', password: 'Admin@123' },
    { role: 'Admin', email: 'admin@springfield.edu', password: 'Admin@123' },
    { role: 'Teacher', email: 'robert.williams@school.com', password: 'Teacher@123' },
    { role: 'Student', email: 'john.doe@school.com', password: 'Student@123' },
    { role: 'Parent', email: 'robert.doe@email.com', password: 'Parent@123' },
  ];

  const handleDemoLogin = async (email, password) => {
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        toast.success('Login successful!');

        const dashboards = {
          super_admin: '/superadmin/dashboard',
          admin: '/admin/dashboard',
          teacher: '/teacher/dashboard',
          student: '/student/dashboard',
          parent: '/parent/dashboard',
        };

        setTimeout(() => {
          navigate(dashboards[result.user.role] || '/');
        }, 500);
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <Toaster position="top-right" />

      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SkoolMaster</h1>
          <p className="text-gray-600">School Management System</p>
        </div>

        {/* Demo Login Buttons */}
        <div className="space-y-4 mb-8">
          <p className="text-sm font-semibold text-gray-700 text-center mb-3">
            Quick Demo Login - Click to Login as:
          </p>
          <div className="space-y-3">
            {demoCredentials.map((cred) => (
              <button
                key={cred.role}
                onClick={() => handleDemoLogin(cred.email, cred.password)}
                disabled={loading}
                className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                Login as {cred.role}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or login manually</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <Button
            type="submit"
            className="w-full"
            loading={loading}
            disabled={loading}
          >
            Sign In
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-500">
          &copy; 2024 SkoolMaster. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
