import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import { FiTarget, FiEye, FiHeart, FiAward } from 'react-icons/fi';

const About = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F2573] to-[#041D56] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About SkoolMaster
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Transforming education management for schools worldwide
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-[#266CA9] to-[#0F2573] text-white p-10 rounded-2xl">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6">
                <FiTarget className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                To empower educational institutions with innovative technology that simplifies
                administration, enhances communication, and improves learning outcomes for
                students worldwide.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-[#041D56] to-[#01082D] text-white p-10 rounded-2xl">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6">
                <FiEye className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                To become the world's most trusted school management platform, transforming
                education management and creating seamless experiences for schools, teachers,
                students, and parents globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              SkoolMaster was founded with a simple vision: to make school management easier and more efficient.
              We saw how educational institutions were struggling with outdated systems, paper-based processes,
              and disconnected communication channels.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our team of educators and technologists came together to build a comprehensive solution that
              addresses the real challenges faced by schools every day. We've worked closely with hundreds
              of schools to understand their needs and continuously improve our platform.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, SkoolMaster serves over 500 schools, supporting more than 100,000 students and 10,000
              teachers worldwide. We're proud to be making a difference in education management and helping
              schools focus on what matters most: student success.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiHeart className="w-8 h-8" />,
                title: 'Student-Centric',
                description: 'Everything we do is focused on improving student outcomes and educational experiences.'
              },
              {
                icon: <FiAward className="w-8 h-8" />,
                title: 'Excellence',
                description: 'We strive for excellence in every feature, every interaction, and every support request.'
              },
              {
                icon: <FiTarget className="w-8 h-8" />,
                title: 'Innovation',
                description: 'We continuously innovate to provide cutting-edge solutions for modern education.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#266CA9] to-[#0F2573] rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Schools Worldwide' },
              { number: '100K+', label: 'Active Students' },
              { number: '10K+', label: 'Happy Teachers' },
              { number: '99.9%', label: 'Uptime' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#266CA9] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of the education transformation
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-[#0F2573] rounded-lg font-semibold hover:shadow-xl transition-all"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default About;
