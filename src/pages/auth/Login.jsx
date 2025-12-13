import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { toast, Toaster } from 'react-hot-toast';
import {
  FiMail,
  FiLock,
  FiShield,
  FiUsers,
  FiBook,
  FiUserCheck,
  FiHome,
  FiCheckCircle,
  FiArrowRight
} from 'react-icons/fi';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(true);
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
    {
      role: 'Super Admin',
      email: 'superadmin@skoolmaster.com',
      password: 'Admin@123',
      icon: <FiShield className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600',
      description: 'Manage all schools'
    },
    {
      role: 'Admin',
      email: 'admin@springfield.edu',
      password: 'Admin@123',
      icon: <FiHome className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600',
      description: 'Manage your school'
    },
    {
      role: 'Teacher',
      email: 'robert.williams@school.com',
      password: 'Teacher@123',
      icon: <FiUserCheck className="w-5 h-5" />,
      color: 'from-green-500 to-green-600',
      description: 'Manage classes & students'
    },
    {
      role: 'Student',
      email: 'john.doe@school.com',
      password: 'Student@123',
      icon: <FiBook className="w-5 h-5" />,
      color: 'from-orange-500 to-orange-600',
      description: 'View grades & assignments'
    },
    {
      role: 'Parent',
      email: 'robert.doe@email.com',
      password: 'Parent@123',
      icon: <FiUsers className="w-5 h-5" />,
      color: 'from-pink-500 to-pink-600',
      description: 'Monitor your children'
    },
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
    <div className="min-h-screen flex">
      <Toaster position="top-right" />

      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0F2573] via-[#041D56] to-[#01082D] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#266CA9] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#ADE1FB] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 py-12 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-14 h-14 bg-gradient-to-br from-[#266CA9] to-[#0F2573] rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-3xl font-bold">S</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">SkoolMaster</h1>
              <p className="text-blue-200 text-sm">School Management System</p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Welcome to the Future of<br />School Management
              </h2>
              <p className="text-blue-100 text-lg">
                Streamline your educational institution with our comprehensive management solution.
              </p>
            </div>

            <div className="space-y-4">
              {[
                'Complete student & teacher management',
                'Real-time attendance tracking',
                'Automated grade calculations',
                'Parent communication portal',
                'Financial management & reporting'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiCheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-blue-50">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8">
            {[
              { label: 'Schools', value: '500+' },
              { label: 'Students', value: '100K+' },
              { label: 'Teachers', value: '10K+' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-1 text-[#ADE1FB]">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#266CA9] to-[#0F2573] rounded-2xl mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">SkoolMaster</h1>
            <p className="text-gray-600">School Management System</p>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue to your dashboard</p>
          </div>

          {/* Demo Accounts Toggle */}
          <div className="mb-6">
            <button
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="w-full flex items-center justify-between p-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-blue-700 font-medium hover:bg-blue-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FiUsers className="w-5 h-5" />
                Quick Demo Access
              </span>
              <FiArrowRight className={`w-5 h-5 transition-transform ${showDemoAccounts ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Demo Login Cards */}
          {showDemoAccounts && (
            <div className="space-y-3 mb-8 animate-fadeIn">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.role}
                  onClick={() => handleDemoLogin(cred.email, cred.password)}
                  disabled={loading}
                  className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${cred.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md`}>
                      {cred.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {cred.role}
                      </div>
                      <div className="text-sm text-gray-500">{cred.description}</div>
                    </div>
                    <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-gray-500 font-medium">Or sign in with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#266CA9] to-[#0F2573] hover:from-[#0F2573] hover:to-[#041D56] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-[#266CA9] hover:text-[#0F2573] font-semibold">
                Start Free Trial
              </a>
            </p>
            <p className="mt-4 text-sm text-gray-500">
              © 2024 SkoolMaster. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
