import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import { FiCheckCircle, FiUsers, FiBarChart, FiShield, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F2573] via-[#041D56] to-[#01082D] text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#266CA9] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-[#ADE1FB] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-[#266CA9] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Trusted by 500+ Schools Worldwide
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your School
                <span className="block text-[#ADE1FB] mt-2">Management Today</span>
              </h1>

              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                All-in-one platform to manage students, teachers, attendance, grades, fees, and communication. Streamline operations and focus on what matters - education.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0F2573] rounded-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Start Free Trial
                  <FiArrowRight />
                </Link>
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  View Features
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-[#ADE1FB]">500+</div>
                  <div className="text-sm text-blue-200 font-medium">Schools</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-[#ADE1FB]">100K+</div>
                  <div className="text-sm text-blue-200 font-medium">Students</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-[#ADE1FB]">10K+</div>
                  <div className="text-sm text-blue-200 font-medium">Teachers</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:block relative">
              <div className="relative">
                {/* Main Dashboard Preview */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#266CA9] to-[#0F2573] rounded-lg"></div>
                      <span className="font-bold text-gray-900">Dashboard</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  {/* Mini cards */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#266CA9] to-[#0F2573] rounded-lg flex items-center justify-center">
                        <FiUsers className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600 font-medium">Total Students</div>
                        <div className="text-lg font-bold text-gray-900">1,234</div>
                      </div>
                      <div className="text-green-600 text-sm font-semibold">+12%</div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <FiBarChart className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600 font-medium">Attendance Rate</div>
                        <div className="text-lg font-bold text-gray-900">94.5%</div>
                      </div>
                      <div className="text-green-600 text-sm font-semibold">+2%</div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <FiShield className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600 font-medium">System Status</div>
                        <div className="text-lg font-bold text-gray-900">All Good</div>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Card - Top Right */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 animate-pulse">
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500 w-5 h-5" />
                    <div>
                      <div className="text-xs text-gray-600">Quick Setup</div>
                      <div className="text-sm font-bold text-gray-900">5 minutes</div>
                    </div>
                  </div>
                </div>

                {/* Floating Card - Bottom Left */}
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-[#266CA9] to-[#0F2573] text-white rounded-xl shadow-xl p-4">
                  <div className="text-xs font-medium mb-1">Free Trial</div>
                  <div className="text-2xl font-bold">14 Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline your school operations with powerful features designed for modern education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiUsers className="w-8 h-8" />,
                title: 'Student Management',
                description: 'Manage student records, enrollment, and profiles efficiently'
              },
              {
                icon: <FiCheckCircle className="w-8 h-8" />,
                title: 'Attendance Tracking',
                description: 'Real-time attendance monitoring and reporting'
              },
              {
                icon: <FiBarChart className="w-8 h-8" />,
                title: 'Grade Management',
                description: 'Easy grade entry, calculation, and report generation'
              },
              {
                icon: <FiShield className="w-8 h-8" />,
                title: 'Secure & Reliable',
                description: 'Bank-level security with 99.9% uptime guarantee'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-[#266CA9] to-[#0F2573] rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Schools Choose SkoolMaster
              </h2>
              <div className="space-y-4">
                {[
                  'Complete school management in one platform',
                  'Real-time updates and notifications',
                  'Easy to use for teachers, students, and parents',
                  'Comprehensive reporting and analytics',
                  'Mobile-friendly and accessible anywhere',
                  '24/7 customer support'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FiCheckCircle className="w-6 h-6 text-[#266CA9] flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Student Engagement</span>
                  <span className="text-[#266CA9] font-bold">95%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-gradient-to-r from-[#266CA9] to-[#0F2573] rounded-full" style={{width: '95%'}}></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Teacher Satisfaction</span>
                  <span className="text-[#266CA9] font-bold">92%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-gradient-to-r from-[#266CA9] to-[#0F2573] rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Parent Involvement</span>
                  <span className="text-[#266CA9] font-bold">88%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-gradient-to-r from-[#266CA9] to-[#0F2573] rounded-full" style={{width: '88%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of schools using SkoolMaster to streamline their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-[#0F2573] rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              Start Free Trial
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#0F2573] transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;
