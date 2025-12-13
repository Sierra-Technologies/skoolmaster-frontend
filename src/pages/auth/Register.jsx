import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import {
  FiMail,
  FiLock,
  FiUser,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiCheckCircle,
  FiBuilding,
  FiUsers
} from 'react-icons/fi';

const Register = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // School Information
    schoolName: '',
    schoolEmail: '',
    schoolPhone: '',
    schoolAddress: '',
    schoolCity: '',
    schoolState: '',
    schoolCountry: '',
    schoolWebsite: '',

    // Admin Information
    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
    adminPhone: '',
    adminPassword: '',
    adminConfirmPassword: '',

    // Additional
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNext = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.schoolName || !formData.schoolEmail || !formData.schoolPhone) {
        toast.error('Please fill in all required school information');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate admin info
    if (!formData.adminFirstName || !formData.adminLastName || !formData.adminEmail || !formData.adminPassword) {
      toast.error('Please fill in all required admin information');
      return;
    }

    if (formData.adminPassword !== formData.adminConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('Registration successful! Please check your email to verify your account.');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-right" />

      {/* Left Side - Progress & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0F2573] via-[#041D56] to-[#01082D] relative overflow-hidden">
        {/* Animated Background */}
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

          {/* Progress Steps */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Registration Steps</h2>
            <div className="space-y-4">
              <div className={`flex items-center gap-3 ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step > 1 ? 'bg-green-500' : step === 1 ? 'bg-white text-[#0F2573]' : 'bg-white/20'}`}>
                  {step > 1 ? <FiCheckCircle className="w-6 h-6" /> : '1'}
                </div>
                <div>
                  <div className="font-semibold">School Information</div>
                  <div className="text-sm text-blue-200">Basic details about your institution</div>
                </div>
              </div>

              <div className={`flex items-center gap-3 ${step >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step > 2 ? 'bg-green-500' : step === 2 ? 'bg-white text-[#0F2573]' : 'bg-white/20'}`}>
                  {step > 2 ? <FiCheckCircle className="w-6 h-6" /> : '2'}
                </div>
                <div>
                  <div className="font-semibold">Admin Account</div>
                  <div className="text-sm text-blue-200">Create your administrator account</div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">What You Get:</h3>
            <div className="space-y-4">
              {[
                '14-day free trial, no credit card required',
                'Complete access to all features',
                'Unlimited students & teachers',
                'Free training & onboarding',
                '24/7 customer support',
                'Cancel anytime, no commitments'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FiCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-blue-100">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#266CA9] to-[#0F2573] rounded-2xl mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">SkoolMaster</h1>
            <p className="text-gray-600">Start Your Free Trial</p>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {step === 1 ? 'School Information' : 'Create Admin Account'}
            </h2>
            <p className="text-gray-600">
              {step === 1
                ? 'Tell us about your institution'
                : 'Set up your administrator account'}
            </p>
          </div>

          {/* Mobile Progress */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {step} of 2</span>
              <span className="text-sm text-gray-500">{step === 1 ? '50%' : '100%'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#266CA9] to-[#0F2573] h-2 rounded-full transition-all duration-300"
                style={{width: `${step * 50}%`}}
              ></div>
            </div>
          </div>

          {/* Step 1: School Information */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiBuilding className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                    placeholder="Springfield High School"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="schoolEmail"
                    value={formData.schoolEmail}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                    placeholder="info@springfield.edu"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Phone *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="schoolPhone"
                    value={formData.schoolPhone}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="schoolAddress"
                    value={formData.schoolAddress}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                    placeholder="123 Main Street"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="schoolCity"
                    value={formData.schoolCity}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                    placeholder="Springfield"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="schoolState"
                    value={formData.schoolState}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                    placeholder="IL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="schoolCountry"
                  value={formData.schoolCountry}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                  placeholder="United States"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiGlobe className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="schoolWebsite"
                    value={formData.schoolWebsite}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                    placeholder="https://www.springfield.edu"
                  />
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3 bg-gradient-to-r from-[#266CA9] to-[#0F2573] hover:from-[#0F2573] hover:to-[#041D56] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Continue to Admin Setup
              </button>
            </div>
          )}

          {/* Step 2: Admin Account */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="adminFirstName"
                      value={formData.adminFirstName}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                      placeholder="John"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="adminLastName"
                    value={formData.adminLastName}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                    placeholder="admin@springfield.edu"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="adminPhone"
                    value={formData.adminPhone}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="adminPassword"
                    value={formData.adminPassword}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="adminConfirmPassword"
                    value={formData.adminConfirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#266CA9] focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#266CA9] border-gray-300 rounded focus:ring-[#266CA9] mt-1"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-[#266CA9] hover:text-[#0F2573] font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-[#266CA9] hover:text-[#0F2573] font-medium">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-1/3 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 py-3 bg-gradient-to-r from-[#266CA9] to-[#0F2573] hover:from-[#0F2573] hover:to-[#041D56] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Start Free Trial'}
                </button>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#266CA9] hover:text-[#0F2573] font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
