import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import { FiCheck } from 'react-icons/fi';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: 'per month',
      description: 'Perfect for small schools',
      features: [
        'Up to 100 students',
        'Student management',
        'Attendance tracking',
        'Grade management',
        'Basic reporting',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$299',
      period: 'per month',
      description: 'Ideal for growing schools',
      features: [
        'Up to 500 students',
        'All Starter features',
        'Fee management',
        'Communication hub',
        'Advanced analytics',
        'Parent portal',
        'Priority support',
        'Custom branding'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large institutions',
      features: [
        'Unlimited students',
        'All Professional features',
        'Multiple campuses',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        '24/7 phone support',
        'SLA guarantee'
      ],
      popular: false
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F2573] to-[#041D56] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Choose the perfect plan for your school
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-[#266CA9] transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white text-center py-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-gray-600">/{plan.period}</span>}
                  </div>
                  <Link
                    to="/contact"
                    className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white hover:shadow-xl'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                  <div className="mt-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-[#266CA9] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: 'Is there a free trial?',
                answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required.'
              },
              {
                question: 'Can I change plans later?',
                answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, debit cards, and bank transfers for enterprise plans.'
              },
              {
                question: 'Is my data secure?',
                answer: 'Yes! We use bank-level encryption and security measures to protect your data. We are fully GDPR compliant.'
              },
              {
                question: 'Do you offer discounts for non-profits?',
                answer: 'Yes, we offer special pricing for non-profit educational institutions. Contact us for details.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your free trial today, no credit card required
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-[#0F2573] rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              Start Free Trial
            </Link>
            <Link
              to="/features"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#0F2573] transition-all"
            >
              View Features
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Pricing;
