import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import { FiCheckCircle, FiUsers, FiBarChart, FiShield, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F2573] to-[#041D56] text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Modern School Management Made Simple
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                Complete solution for managing students, teachers, classes, attendance, grades, and more - all in one powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0F2573] rounded-lg font-semibold hover:shadow-xl transition-all"
                >
                  Get Started Free
                  <FiArrowRight />
                </Link>
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#0F2573] transition-all"
                >
                  View Features
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-blue-200">Schools</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">100K+</div>
                  <div className="text-sm text-blue-200">Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm text-blue-200">Teachers</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#266CA9] to-[#0F2573] rounded-lg flex items-center justify-center">
                      <FiUsers className="text-white text-xl" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Student Management</div>
                      <div className="text-sm text-gray-600">Track everything in real-time</div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-gradient-to-r from-[#266CA9] to-[#0F2573] rounded-full w-3/4"></div>
                  </div>
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
