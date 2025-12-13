import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import {
  FiUsers,
  FiBook,
  FiAward,
  FiShield,
  FiTrendingUp,
  FiGlobe,
  FiHeart,
  FiTarget,
  FiCheckCircle,
  FiStar
} from 'react-icons/fi';

const About = () => {
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
            About SkoolMaster
          </h1>
          <p className="text-xl md:text-2xl text-public-light max-w-3xl mx-auto">
            Transforming education management with innovative technology
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-purple-50 to-transparent opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded in 2020, SkoolMaster was born from a simple observation: educational
                institutions were struggling with outdated, fragmented systems that made
                administration more complex than it needed to be.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our founders, a team of educators and technologists, set out to create a
                comprehensive solution that would streamline operations, enhance communication,
                and empower educators to focus on what matters most - teaching.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, SkoolMaster serves over 500 schools across 25+ countries, helping
                100,000+ students and 10,000+ teachers succeed in their educational journey.
              </p>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '500+', label: 'Active Schools', icon: <FiUsers className="w-6 h-6" /> },
                { value: '100K+', label: 'Students', icon: <FiBook className="w-6 h-6" /> },
                { value: '10K+', label: 'Teachers', icon: <FiAward className="w-6 h-6" /> },
                { value: '99.9%', label: 'Uptime', icon: <FiShield className="w-6 h-6" /> }
              ].map((stat, index) => (
                <div key={index} className="group p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-public-medium to-public-deep rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-public-medium to-public-deep bg-clip-text text-transparent mb-2 text-center">
                    {stat.value}
                  </div>
                  <div className="text-gray-700 text-center font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="relative p-10 bg-gradient-to-br from-public-medium to-public-deep rounded-3xl text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                  <FiTarget className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-public-light text-lg leading-relaxed">
                  To empower educational institutions with innovative technology that simplifies
                  administration, enhances communication, and improves learning outcomes for
                  students worldwide.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="relative p-10 bg-gradient-to-br from-public-navy to-public-darkest rounded-3xl text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                  <FiGlobe className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-public-light text-lg leading-relaxed">
                  To become the world's most trusted school management platform, transforming
                  education management and creating seamless experiences for schools, teachers,
                  students, and parents globally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiHeart className="w-8 h-8" />,
                title: 'Customer First',
                description: 'We put our customers at the heart of everything we do, constantly listening to feedback and improving our platform.',
                color: 'from-red-500 to-pink-500'
              },
              {
                icon: <FiShield className="w-8 h-8" />,
                title: 'Security & Privacy',
                description: 'We prioritize the security and privacy of your data with enterprise-grade encryption and compliance.',
                color: 'from-blue-500 to-indigo-500'
              },
              {
                icon: <FiTrendingUp className="w-8 h-8" />,
                title: 'Innovation',
                description: 'We continuously innovate to provide cutting-edge solutions that meet evolving educational needs.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: <FiUsers className="w-8 h-8" />,
                title: 'Collaboration',
                description: 'We believe in the power of collaboration between schools, teachers, students, and parents.',
                color: 'from-purple-500 to-violet-500'
              },
              {
                icon: <FiAward className="w-8 h-8" />,
                title: 'Excellence',
                description: 'We strive for excellence in every aspect of our platform, from design to functionality to support.',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: <FiGlobe className="w-8 h-8" />,
                title: 'Accessibility',
                description: 'We make education management accessible to institutions of all sizes, anywhere in the world.',
                color: 'from-cyan-500 to-teal-500'
              }
            ].map((value, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our growth
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                year: '2020',
                title: 'Company Founded',
                description: 'SkoolMaster was founded with a vision to transform education management',
                color: 'from-blue-500 to-blue-600'
              },
              {
                year: '2021',
                title: 'First 50 Schools',
                description: 'Reached 50 schools across 5 countries, proving product-market fit',
                color: 'from-purple-500 to-purple-600'
              },
              {
                year: '2022',
                title: 'Major Platform Upgrade',
                description: 'Launched comprehensive parent portal and mobile apps',
                color: 'from-pink-500 to-pink-600'
              },
              {
                year: '2023',
                title: 'Global Expansion',
                description: 'Expanded to 25+ countries with multi-language support',
                color: 'from-orange-500 to-orange-600'
              },
              {
                year: '2024',
                title: 'Award Winning',
                description: 'Named Best EdTech Platform and reached 500+ schools milestone',
                color: 'from-green-500 to-green-600'
              }
            ].map((milestone, index) => (
              <div key={index} className="relative flex gap-8 items-start group">
                {/* Timeline Line */}
                {index !== 4 && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-gray-300 to-transparent"></div>
                )}

                {/* Year Badge */}
                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${milestone.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                  {milestone.year.slice(-2)}
                </div>

                {/* Content */}
                <div className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 group-hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-sm font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                      {milestone.year}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built by Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team combines decades of experience in education and technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: 'Dr. Sarah Mitchell',
                role: 'CEO & Co-Founder',
                image: 'https://i.pravatar.cc/300?img=1',
                background: 'Former Principal with 20+ years in education'
              },
              {
                name: 'James Chen',
                role: 'CTO & Co-Founder',
                image: 'https://i.pravatar.cc/300?img=33',
                background: 'Ex-Google engineer, EdTech specialist'
              },
              {
                name: 'Maria Rodriguez',
                role: 'Head of Product',
                image: 'https://i.pravatar.cc/300?img=5',
                background: 'Product leader from Microsoft Education'
              }
            ].map((member, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center">
                <div className="mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-blue-100 group-hover:border-purple-200 transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-public-deep font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.background}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-700 mb-6">
              We're a team of 50+ passionate individuals dedicated to transforming education
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-public-medium to-public-deep text-white rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Join Our Team
            </Link>
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
            Join 500+ Schools Worldwide
          </h2>
          <p className="text-xl text-public-light mb-8">
            Start your journey with SkoolMaster today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-public-deep rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              to="/features"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-public-deep transition-all"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default About;
