import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import { mockSchools } from '../../data/mockOtherData';
import { FiDollarSign, FiCalendar, FiCreditCard, FiCheckCircle } from 'react-icons/fi';

const Subscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const subscriptionPlans = [
    {
      id: 1,
      name: 'Free',
      price: 0,
      billingCycle: 'monthly',
      features: [
        'Up to 50 students',
        'Basic attendance tracking',
        'Grade management',
        'Email support',
        '1 GB storage'
      ],
      color: 'gray'
    },
    {
      id: 2,
      name: 'Basic',
      price: 49,
      billingCycle: 'monthly',
      features: [
        'Up to 500 students',
        'Advanced attendance & grades',
        'Fee management',
        'Parent portal',
        'Priority email support',
        '10 GB storage'
      ],
      color: 'blue',
      popular: false
    },
    {
      id: 3,
      name: 'Premium',
      price: 99,
      billingCycle: 'monthly',
      features: [
        'Up to 2000 students',
        'All Basic features',
        'SMS notifications',
        'Custom reports',
        'API access',
        'Phone support',
        '50 GB storage'
      ],
      color: 'purple',
      popular: true
    },
    {
      id: 4,
      name: 'Enterprise',
      price: 299,
      billingCycle: 'monthly',
      features: [
        'Unlimited students',
        'All Premium features',
        'Multi-school management',
        'White labeling',
        'Dedicated account manager',
        'Custom integrations',
        'Unlimited storage'
      ],
      color: 'orange',
      popular: false
    }
  ];

  const activeSubscriptions = mockSchools.map(school => ({
    id: school.id,
    schoolName: school.name,
    plan: school.subscriptionPlan,
    status: school.subscriptionStatus,
    startDate: '2024-01-01',
    expiryDate: school.subscriptionExpiry,
    amount: school.subscriptionPlan === 'free' ? 0 :
            school.subscriptionPlan === 'basic' ? 49 :
            school.subscriptionPlan === 'premium' ? 99 : 299,
    autoRenew: school.subscriptionStatus === 'active'
  }));

  const columns = [
    {
      key: 'schoolName',
      label: 'School',
      sortable: true
    },
    {
      key: 'plan',
      label: 'Plan',
      render: (row) => (
        <Badge variant="primary" className="capitalize">
          {row.plan}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'success' : 'error'} className="capitalize">
          {row.status}
        </Badge>
      )
    },
    {
      key: 'expiryDate',
      label: 'Expires On',
      sortable: true
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (row) => <span className="font-semibold">${row.amount}/mo</span>
    },
    {
      key: 'autoRenew',
      label: 'Auto Renew',
      render: (row) => (
        <span className={row.autoRenew ? 'text-green-600' : 'text-gray-400'}>
          {row.autoRenew ? 'Yes' : 'No'}
        </span>
      )
    }
  ];

  const stats = {
    totalRevenue: activeSubscriptions.reduce((sum, sub) => sum + sub.amount, 0),
    activeSubscriptions: activeSubscriptions.filter(s => s.status === 'active').length,
    expiringThisMonth: activeSubscriptions.filter(s => {
      const expiry = new Date(s.expiryDate);
      const now = new Date();
      return expiry.getMonth() === now.getMonth() && expiry.getFullYear() === now.getFullYear();
    }).length
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
          <p className="text-gray-600 mt-1">Manage subscription plans and billing</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  ${stats.totalRevenue}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiDollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Subscriptions</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {stats.activeSubscriptions}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiCheckCircle className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expiring This Month</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {stats.expiringThisMonth}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FiCalendar className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Subscription Plans */}
        <Card title="Available Plans" subtitle="Choose the right plan for your schools">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-6 border-2 rounded-xl transition-all hover:shadow-lg ${
                  plan.popular ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge variant="error" className="px-3 py-1">Most Popular</Badge>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => setSelectedPlan(plan)}
                >
                  Select Plan
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Subscriptions Table */}
        <Card title="Active Subscriptions" subtitle="Manage school subscriptions">
          <Table
            columns={columns}
            data={activeSubscriptions}
            hoverable
            striped
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Subscriptions;
