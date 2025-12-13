import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import { FiCheck, FiArrowRight, FiHelpCircle } from 'react-icons/fi';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'

  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for small schools',
      monthlyPrice: 99,
      annualPrice: 950,
      features: [
        'Up to 100 students',
        'Basic student management',
        'Attendance tracking',
        'Grade management',
        'Email support',
        'Mobile app access',
        'Basic reports',
        '5 GB storage'
      ],
      popular: false,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Professional',
      description: 'Most popular choice',
      monthlyPrice: 299,
      annualPrice: 2870,
      features: [
        'Up to 500 students',
        'Advanced student management',
        'Parent portal',
        'Fee management',
        'Priority support',
        'Custom branding',
        'API access',
        'Data export',
        'Advanced analytics',
        'SMS notifications',
        'Unlimited storage'
      ],
      popular: true,
      color: 'from-purple-500 to-purple-600',
      badge: 'Most Popular'
    },
    {
      name: 'Enterprise',
      description: 'For large institutions',
      monthlyPrice: null,
      annualPrice: null,
      customPrice: true,
      features: [
        'Unlimited students',
        'Multi-campus support',
        'Dedicated account manager',
        'Custom integrations',
        '24/7 phone support',
        'Training & onboarding',
        'SLA guarantee',
        'Custom features',
        'White-labeling',
        'Advanced security',
        'Custom workflows',
        'Dedicated infrastructure'
      ],
      popular: false,
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Absolutely! We offer a 14-day free trial for all plans. No credit card required to get started.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and bank transfers. For Enterprise plans, we also offer invoice-based billing.'
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes! When you choose annual billing, you save approximately 20% compared to monthly billing.'
    },
    {
      question: 'What happens when I exceed my student limit?',
      answer: 'We\'ll notify you when you\'re approaching your limit. You can easily upgrade to a higher plan to accommodate more students.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely! We use bank-level encryption and comply with international data protection regulations including GDPR and FERPA.'
    }
  ];

  const getPrice = (plan) => {
    if (plan.customPrice) return 'Custom';
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    return `$${price}`;
  };

  const getPeriod = (plan) => {
    if (plan.customPrice) return 'Contact us';
    return billingCycle === 'monthly' ? '/ month' : '/ year';
  };

  const getSavings = (plan) => {
    if (plan.customPrice || !plan.annualPrice) return null;
    const monthlyCost = plan.monthlyPrice * 12;
    const savings = monthlyCost - plan.annualPrice;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return `Save ${percentage}%`;
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your school. No hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-sm p-2 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Annual
              <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-50 to-transparent opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white border-2 rounded-3xl p-8 transition-all ${
                  plan.popular
                    ? 'border-transparent shadow-2xl transform scale-105'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-full shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className={`text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {getPrice(plan)}
                    </span>
                    {!plan.customPrice && (
                      <span className="text-gray-600">{getPeriod(plan)}</span>
                    )}
                  </div>

                  {billingCycle === 'annual' && getSavings(plan) && (
                    <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                      {getSavings(plan)}
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center mt-0.5`}>
                        <FiCheck className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  to="/contact"
                  className={`group w-full py-4 bg-gradient-to-r ${plan.color} text-white rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2`}
                >
                  {plan.customPrice ? 'Contact Sales' : 'Get Started'}
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Background Gradient Effect */}
                {plan.popular && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-5 rounded-3xl pointer-events-none`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-8">All plans include:</p>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                '14-day free trial',
                'No credit card required',
                'Cancel anytime',
                '24/7 support'
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center gap-2 text-gray-700">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiCheck className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600">
              Choose the features that matter most to you
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Feature</th>
                    <th className="px-6 py-4 text-center">Basic</th>
                    <th className="px-6 py-4 text-center">Professional</th>
                    <th className="px-6 py-4 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    ['Students', '100', '500', 'Unlimited'],
                    ['Parent Portal', '-', '✓', '✓'],
                    ['Fee Management', '-', '✓', '✓'],
                    ['Custom Branding', '-', '✓', '✓'],
                    ['API Access', '-', '✓', '✓'],
                    ['Multi-campus', '-', '-', '✓'],
                    ['White-labeling', '-', '-', '✓'],
                    ['Dedicated Support', '-', '-', '✓']
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{row[0]}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{row[1]}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{row[2]}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <summary className="flex items-start gap-4 cursor-pointer list-none">
                  <FiHelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                  </div>
                  <FiArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 mt-1" />
                </summary>
                <div className="mt-4 ml-10 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Pricing;
