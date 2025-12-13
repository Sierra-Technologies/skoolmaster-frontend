import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import {
  FiUsers,
  FiBook,
  FiCalendar,
  FiDollarSign,
  FiBarChart,
  FiShield,
  FiClock,
  FiGlobe,
  FiZap,
  FiUserCheck,
  FiMail,
  FiFileText,
  FiTrendingUp,
  FiCheckCircle,
  FiArrowRight
} from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: 'Student Management',
      description: 'Complete student profiles with academic records, attendance, and performance tracking. Manage admissions, enrollments, and student lifecycle.',
      color: 'from-blue-500 to-blue-600',
      highlights: [
        'Digital student profiles',
        'Admission management',
        'Academic records',
        'Performance analytics'
      ]
    },
    {
      icon: <FiUserCheck className="w-8 h-8" />,
      title: 'Teacher Portal',
      description: 'Dedicated portal for teachers to manage classes, assignments, and grade submissions. Streamline communication with students and parents.',
      color: 'from-green-500 to-green-600',
      highlights: [
        'Class management',
        'Assignment creation',
        'Grade submission',
        'Parent communication'
      ]
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: 'Attendance Tracking',
      description: 'Real-time attendance monitoring with automated alerts and detailed reports. Track patterns and generate comprehensive attendance analytics.',
      color: 'from-purple-500 to-purple-600',
      highlights: [
        'Real-time tracking',
        'Automated notifications',
        'Attendance reports',
        'Pattern analysis'
      ]
    },
    {
      icon: <FiBarChart className="w-8 h-8" />,
      title: 'Grade Management',
      description: 'Automated grade calculations, report cards, and performance analytics. Support for multiple grading systems and custom grade scales.',
      color: 'from-orange-500 to-orange-600',
      highlights: [
        'Auto calculations',
        'Digital report cards',
        'Multiple grading systems',
        'Performance trends'
      ]
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: 'Fee Management',
      description: 'Complete financial management with online payments and receipt generation. Track outstanding fees and send automated reminders.',
      color: 'from-pink-500 to-pink-600',
      highlights: [
        'Online payments',
        'Receipt generation',
        'Payment tracking',
        'Automated reminders'
      ]
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Secure & Reliable',
      description: 'Bank-level security with role-based access control and data encryption. Regular backups and 99.9% uptime guarantee.',
      color: 'from-indigo-500 to-indigo-600',
      highlights: [
        'Data encryption',
        'Role-based access',
        'Regular backups',
        '99.9% uptime'
      ]
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: 'Timetable Management',
      description: 'Create and manage class schedules with conflict detection. Support for multiple shifts and complex timetabling requirements.',
      color: 'from-teal-500 to-teal-600',
      highlights: [
        'Visual schedule builder',
        'Conflict detection',
        'Multiple shifts',
        'Resource allocation'
      ]
    },
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: 'Parent Portal',
      description: 'Keep parents informed with real-time updates on their children\'s progress. Enable parent-teacher communication and access to grades.',
      color: 'from-red-500 to-red-600',
      highlights: [
        'Real-time updates',
        'Grade access',
        'Teacher messaging',
        'Event notifications'
      ]
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: 'Reports & Analytics',
      description: 'Comprehensive reports and data-driven insights for better decision making. Custom report builder and export capabilities.',
      color: 'from-yellow-500 to-yellow-600',
      highlights: [
        'Custom reports',
        'Data analytics',
        'Export options',
        'Visual dashboards'
      ]
    },
    {
      icon: <FiFileText className="w-8 h-8" />,
      title: 'Assignment Management',
      description: 'Create, distribute, and grade assignments digitally. Support for file attachments and plagiarism detection.',
      color: 'from-cyan-500 to-cyan-600',
      highlights: [
        'Digital submissions',
        'File attachments',
        'Plagiarism detection',
        'Auto grading'
      ]
    },
    {
      icon: <FiMail className="w-8 h-8" />,
      title: 'Communication Hub',
      description: 'Centralized communication platform for announcements, messages, and notifications. Email and SMS integration.',
      color: 'from-violet-500 to-violet-600',
      highlights: [
        'Announcements',
        'Direct messaging',
        'Email integration',
        'SMS notifications'
      ]
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: 'Performance Analytics',
      description: 'Track student performance trends and identify areas for improvement. Predictive analytics and early warning systems.',
      color: 'from-emerald-500 to-emerald-600',
      highlights: [
        'Trend analysis',
        'Early warnings',
        'Predictive insights',
        'Custom metrics'
      ]
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-public-deep to-public-navy overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)',
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Powerful Features for
            <span className="block mt-2">Modern Education</span>
          </h1>
          <p className="text-xl md:text-2xl text-public-light max-w-3xl mx-auto mb-8">
            Everything you need to manage your educational institution efficiently
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-public-deep rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Get Started Free
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-50 to-transparent opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-transparent hover:shadow-2xl transition-all transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <FiCheckCircle className={`w-4 h-4 bg-gradient-to-br ${feature.color} text-transparent`} style={{
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text'
                      }} />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Hover Background Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Seamless Integration
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                SkoolMaster integrates with your existing tools and workflows. Connect with
                popular platforms and services to create a unified education ecosystem.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  'Google Workspace',
                  'Microsoft Office 365',
                  'Zoom & Teams',
                  'Payment Gateways',
                  'SMS Providers',
                  'Email Services'
                ].map((integration, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                    <div className="w-10 h-10 bg-gradient-to-br from-public-medium to-public-deep rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiCheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{integration}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
                {/* Animated connecting lines */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <circle cx="200" cy="200" r="60" fill="url(#gradient1)" className="animate-pulse" />
                    <circle cx="100" cy="100" r="30" fill="url(#gradient2)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <circle cx="300" cy="100" r="30" fill="url(#gradient3)" className="animate-pulse" style={{ animationDelay: '1s' }} />
                    <circle cx="100" cy="300" r="30" fill="url(#gradient4)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                    <circle cx="300" cy="300" r="30" fill="url(#gradient5)" className="animate-pulse" style={{ animationDelay: '2s' }} />

                    <line x1="200" y1="200" x2="100" y2="100" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                    <line x1="200" y1="200" x2="300" y2="100" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <line x1="200" y1="200" x2="100" y2="300" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1s' }} />
                    <line x1="200" y1="200" x2="300" y2="300" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1.5s' }} />

                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                      <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                      <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-public-deep to-public-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-public-light mb-8">
            Experience the power of SkoolMaster with a free trial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-public-deep rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-public-deep transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Features;
