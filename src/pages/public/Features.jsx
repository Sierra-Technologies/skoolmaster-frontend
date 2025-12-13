import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import {
  FiUsers, FiCalendar, FiBook, FiDollarSign,
  FiMail, FiFileText, FiBarChart, FiShield,
  FiClock, FiBell, FiSettings, FiSmartphone
} from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: 'Student Management',
      description: 'Comprehensive student profiles, enrollment, and tracking. Manage all student information in one centralized location.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: 'Attendance Tracking',
      description: 'Real-time attendance monitoring with automated notifications to parents. Generate detailed attendance reports.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FiBook className="w-8 h-8" />,
      title: 'Grade Management',
      description: 'Easy grade entry, calculation, and report card generation. Track academic progress over time.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: 'Fee Management',
      description: 'Automated fee collection, payment tracking, and receipt generation. Multiple payment options supported.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: <FiMail className="w-8 h-8" />,
      title: 'Communication Hub',
      description: 'Instant messaging between teachers, students, and parents. Announcements and notifications made easy.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: <FiFileText className="w-8 h-8" />,
      title: 'Document Management',
      description: 'Store and manage all school documents securely. Easy access to transcripts, certificates, and records.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: <FiBarChart className="w-8 h-8" />,
      title: 'Analytics & Reports',
      description: 'Comprehensive analytics and customizable reports. Make data-driven decisions for your institution.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Security & Privacy',
      description: 'Bank-level encryption and security. Role-based access control to protect sensitive information.',
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: 'Timetable Management',
      description: 'Create and manage class schedules effortlessly. Automatic conflict detection and notifications.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: <FiBell className="w-8 h-8" />,
      title: 'Smart Notifications',
      description: 'Automated alerts for important events, deadlines, and updates. Stay informed in real-time.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <FiSettings className="w-8 h-8" />,
      title: 'Customizable Settings',
      description: 'Tailor the system to your school needs. Flexible configuration options for every requirement.',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: <FiSmartphone className="w-8 h-8" />,
      title: 'Mobile Responsive',
      description: 'Access from any device, anywhere. Full functionality on desktop, tablet, and mobile.',
      color: 'from-violet-500 to-violet-600'
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F2573] to-[#041D56] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for Modern Education
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Everything you need to manage your educational institution efficiently
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0F2573] rounded-lg font-semibold hover:shadow-xl transition-all"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your free trial today and see the difference
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

export default Features;
