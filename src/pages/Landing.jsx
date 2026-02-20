import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUsers,
  FiBook,
  FiCalendar,
  FiDollarSign,
  FiBarChart,
  FiShield,
  FiClock,
  FiGlobe,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheck,
  FiStar,
  FiArrowRight,
  FiMenu,
  FiX,
  FiZap,
  FiAward,
  FiTrendingUp
} from 'react-icons/fi';

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    alert('Thank you for your interest! We will contact you soon.');
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SkoolMaster</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </button>
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Features
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                About
              </button>
              <button onClick={() => scrollToSection('plans')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Plans
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Contact
              </button>
              <Link
                to="/login"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-fadeIn">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Home
              </button>
              <button onClick={() => scrollToSection('features')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Features
              </button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                About
              </button>
              <button onClick={() => scrollToSection('plans')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Plans
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Contact
              </button>
              <Link
                to="/login"
                className="block w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <FiZap className="w-4 h-4" />
                Welcome to the Future of Education Management
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Simplify Your
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  School Management
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Complete school management solution for modern educational institutions.
                Manage students, teachers, classes, attendance, grades, and more - all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Get Started Free
                </button>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  Try Demo
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  { value: '500+', label: 'Schools' },
                  { value: '100K+', label: 'Students' },
                  { value: '10K+', label: 'Teachers' }
                ].map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image/Illustration */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-xl">
                      <FiBook className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">All-in-One Platform</h3>
                    <p className="text-gray-600">Streamline your school operations</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FiTrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">95% Success Rate</div>
                    <div className="text-xs text-gray-500">Student Performance</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 animate-pulse delay-1000">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiAward className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Award Winning</div>
                    <div className="text-xs text-gray-500">Best EdTech 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your educational institution efficiently
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiUsers className="w-8 h-8" />,
                title: 'Student Management',
                description: 'Complete student profiles with academic records, attendance, and performance tracking',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: <FiBook className="w-8 h-8" />,
                title: 'Teacher Portal',
                description: 'Dedicated portal for teachers to manage classes, assignments, and grade submissions',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: <FiCalendar className="w-8 h-8" />,
                title: 'Attendance Tracking',
                description: 'Real-time attendance monitoring with automated alerts and detailed reports',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: <FiBarChart className="w-8 h-8" />,
                title: 'Grade Management',
                description: 'Automated grade calculations, report cards, and performance analytics',
                color: 'from-orange-500 to-orange-600'
              },
              {
                icon: <FiDollarSign className="w-8 h-8" />,
                title: 'Fee Management',
                description: 'Complete financial management with online payments and receipt generation',
                color: 'from-pink-500 to-pink-600'
              },
              {
                icon: <FiShield className="w-8 h-8" />,
                title: 'Secure & Reliable',
                description: 'Bank-level security with role-based access control and data encryption',
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                icon: <FiClock className="w-8 h-8" />,
                title: 'Timetable Management',
                description: 'Create and manage class schedules with conflict detection',
                color: 'from-teal-500 to-teal-600'
              },
              {
                icon: <FiGlobe className="w-8 h-8" />,
                title: 'Parent Portal',
                description: 'Keep parents informed with real-time updates on their children\'s progress',
                color: 'from-red-500 to-red-600'
              },
              {
                icon: <FiZap className="w-8 h-8" />,
                title: 'Reports & Analytics',
                description: 'Comprehensive reports and data-driven insights for better decision making',
                color: 'from-yellow-500 to-yellow-600'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-transparent hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                About SkoolMaster
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                SkoolMaster is a comprehensive school management system designed to streamline
                operations for educational institutions of all sizes. From small schools to
                large multi-campus organizations, we provide the tools you need to succeed.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our platform combines powerful features with an intuitive interface, making it
                easy for administrators, teachers, students, and parents to stay connected and
                informed.
              </p>

              {/* Key Points */}
              <div className="space-y-4 pt-4">
                {[
                  'Founded in 2020 with a mission to transform education management',
                  'Serving 500+ schools across 25+ countries',
                  'Trusted by 100,000+ students and 10,000+ teachers',
                  'Award-winning platform with 99.9% uptime guarantee',
                  '24/7 customer support and dedicated success team'
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '500+', label: 'Active Schools', icon: <FiUsers /> },
                { value: '100K+', label: 'Students', icon: <FiBook /> },
                { value: '10K+', label: 'Teachers', icon: <FiAward /> },
                { value: '99.9%', label: 'Uptime', icon: <FiShield /> }
              ].map((stat, index) => (
                <div key={index} className="p-8 bg-white rounded-2xl shadow-xl text-center transform hover:scale-105 transition-transform">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by educational institutions worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Principal, Springfield High School',
                image: 'https://i.pravatar.cc/150?img=1',
                rating: 5,
                text: 'SkoolMaster has completely transformed how we manage our school. The attendance tracking and grade management features are exceptional!'
              },
              {
                name: 'Michael Chen',
                role: 'Administrator, Global Academy',
                image: 'https://i.pravatar.cc/150?img=33',
                rating: 5,
                text: 'The parent portal keeps our families engaged and informed. The platform is intuitive and the support team is always helpful.'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Teacher, Oakwood Elementary',
                image: 'https://i.pravatar.cc/150?img=5',
                rating: 5,
                text: 'As a teacher, I love how easy it is to track student progress and communicate with parents. Highly recommended!'
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing plans to suit schools of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic',
                price: '$99',
                period: 'per month',
                description: 'Perfect for small schools',
                features: [
                  'Up to 100 students',
                  'Basic student management',
                  'Attendance tracking',
                  'Grade management',
                  'Email support',
                  'Mobile app access'
                ],
                popular: false,
                color: 'from-blue-500 to-blue-600'
              },
              {
                name: 'Professional',
                price: '$299',
                period: 'per month',
                description: 'Most popular choice',
                features: [
                  'Up to 500 students',
                  'Advanced analytics',
                  'Parent portal',
                  'Fee management',
                  'Priority support',
                  'Custom branding',
                  'API access',
                  'Data export'
                ],
                popular: true,
                color: 'from-purple-500 to-purple-600'
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: 'contact us',
                description: 'For large institutions',
                features: [
                  'Unlimited students',
                  'Multi-campus support',
                  'Dedicated account manager',
                  'Custom integrations',
                  '24/7 phone support',
                  'Training & onboarding',
                  'SLA guarantee',
                  'Custom features'
                ],
                popular: false,
                color: 'from-pink-500 to-pink-600'
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 bg-white rounded-2xl shadow-xl ${
                  plan.popular ? 'ring-4 ring-purple-600 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className={`text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-600">/ {plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-6 h-6 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <FiCheck className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollToSection('contact')}
                  className={`w-full py-3 bg-gradient-to-r ${plan.color} text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Get in Touch
                </h2>
                <p className="text-xl text-gray-600">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: <FiMail className="w-6 h-6" />,
                    title: 'Email',
                    value: 'hello@skoolmaster.com',
                    color: 'from-blue-500 to-blue-600'
                  },
                  {
                    icon: <FiPhone className="w-6 h-6" />,
                    title: 'Phone',
                    value: '+232 76 685170',
                    color: 'from-green-500 to-green-600'
                  },
                  {
                    icon: <FiMapPin className="w-6 h-6" />,
                    title: 'Office',
                    value: '6 Sierratell Drive, Hill Station, Freetown',
                    color: 'from-purple-500 to-purple-600'
                  }
                ].map((contact, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                      {contact.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{contact.title}</div>
                      <div className="text-gray-600">{contact.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <div className="font-semibold text-gray-900 mb-4">Follow Us</div>
                <div className="flex gap-4">
                  {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social) => (
                    <button
                      key={social}
                      className="w-12 h-12 bg-gray-100 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 hover:text-white rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                    >
                      <span className="text-xs font-semibold">{social[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+232 76 685170"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your school and how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Send Message
                  <FiArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-xl font-bold">SkoolMaster</span>
              </div>
              <p className="text-gray-400">
                Empowering educational institutions with modern management solutions.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('plans')} className="hover:text-white transition-colors">Pricing</button></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Demo</Link></li>
                <li><button className="hover:text-white transition-colors">Updates</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button></li>
                <li><button className="hover:text-white transition-colors">Careers</button></li>
                <li><button className="hover:text-white transition-colors">Blog</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
                <li><button className="hover:text-white transition-colors">Cookie Policy</button></li>
                <li><button className="hover:text-white transition-colors">GDPR</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 SkoolMaster. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Terms</button>
              <button className="hover:text-white transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
