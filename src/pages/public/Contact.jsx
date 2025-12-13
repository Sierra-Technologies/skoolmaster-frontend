import React, { useState } from 'react';
import PublicLayout from '../../components/layout/PublicLayout';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheckCircle
} from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    students: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        schoolName: '',
        students: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
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
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-purple-50 to-transparent opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Let's Talk About Your School
                </h2>
                <p className="text-xl text-gray-600">
                  Our team is ready to help you transform your school management.
                  Reach out and we'll get back to you within 24 hours.
                </p>
              </div>

              {/* Contact Methods */}
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
                    value: '+1 (555) 123-4567',
                    color: 'from-green-500 to-green-600'
                  },
                  {
                    icon: <FiMapPin className="w-6 h-6" />,
                    title: 'Office',
                    value: '123 Education Street, Tech City, TC 12345',
                    color: 'from-purple-500 to-purple-600'
                  },
                  {
                    icon: <FiClock className="w-6 h-6" />,
                    title: 'Business Hours',
                    value: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
                    color: 'from-pink-500 to-pink-600'
                  }
                ].map((contact, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
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
                  {[
                    { name: 'Twitter', color: 'from-blue-400 to-blue-500' },
                    { name: 'LinkedIn', color: 'from-blue-600 to-blue-700' },
                    { name: 'Facebook', color: 'from-blue-500 to-blue-600' },
                    { name: 'Instagram', color: 'from-pink-500 to-purple-500' }
                  ].map((social) => (
                    <button
                      key={social.name}
                      className={`w-12 h-12 bg-gradient-to-br ${social.color} text-white rounded-xl flex items-center justify-center transition-all transform hover:scale-110 shadow-md hover:shadow-xl`}
                    >
                      <span className="text-sm font-bold">{social.name[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <FiMapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-700 font-medium">Visit Our Office</p>
                    <p className="text-gray-600 text-sm">Interactive map coming soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

              <div className="relative">
                {submitted ? (
                  <div className="text-center py-12 animate-fadeIn">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <FiCheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
                    <p className="text-lg text-gray-600 mb-2">
                      Your message has been received.
                    </p>
                    <p className="text-gray-600">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      {/* School Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          School Name
                        </label>
                        <input
                          type="text"
                          name="schoolName"
                          value={formData.schoolName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Springfield High School"
                        />
                      </div>
                    </div>

                    {/* Number of Students */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Students
                      </label>
                      <select
                        name="students"
                        value={formData.students}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select range</option>
                        <option value="1-100">1-100 students</option>
                        <option value="101-500">101-500 students</option>
                        <option value="501-1000">501-1000 students</option>
                        <option value="1000+">1000+ students</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about your school and how we can help..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="group w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      Send Message
                      <FiSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-sm text-gray-600 text-center">
                      By submitting this form, you agree to our{' '}
                      <button className="text-blue-600 hover:underline">Privacy Policy</button>
                      {' '}and{' '}
                      <button className="text-blue-600 hover:underline">Terms of Service</button>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Quick Answers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions we receive
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: 'What is your response time?',
                answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.',
                icon: <FiClock className="w-6 h-6" />,
                color: 'from-blue-500 to-blue-600'
              },
              {
                question: 'Do you offer demos?',
                answer: 'Yes! We offer personalized demos to show you how SkoolMaster can benefit your school. Schedule one through this contact form.',
                icon: <FiCheckCircle className="w-6 h-6" />,
                color: 'from-green-500 to-green-600'
              },
              {
                question: 'Is implementation support available?',
                answer: 'Absolutely! We provide comprehensive onboarding, training, and ongoing support to ensure your success.',
                icon: <FiCheckCircle className="w-6 h-6" />,
                color: 'from-purple-500 to-purple-600'
              },
              {
                question: 'Can I schedule a call?',
                answer: 'Yes, we\'d love to speak with you! Mention your preferred time in the message, and we\'ll coordinate a call.',
                icon: <FiPhone className="w-6 h-6" />,
                color: 'from-pink-500 to-pink-600'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
                <div className={`w-12 h-12 bg-gradient-to-br ${faq.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  {faq.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Contact;
