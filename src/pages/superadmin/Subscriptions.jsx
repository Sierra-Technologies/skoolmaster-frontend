import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { mockSchools } from '../../data/mockOtherData';
import { FiDollarSign, FiCalendar, FiCreditCard, FiCheckCircle, FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Subscriptions = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState([
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
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    billingCycle: 'monthly',
    color: 'blue',
    popular: false,
    features: ['']
  });

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

  // Handler functions
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeatureField = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeatureField = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, features: newFeatures }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      billingCycle: 'monthly',
      color: 'blue',
      popular: false,
      features: ['']
    });
  };

  const handleAddPlan = (e) => {
    e.preventDefault();
    const validFeatures = formData.features.filter(f => f.trim() !== '');

    if (!formData.name || !formData.price || validFeatures.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newPlan = {
      id: subscriptionPlans.length + 1,
      name: formData.name,
      price: parseFloat(formData.price),
      billingCycle: formData.billingCycle,
      color: formData.color,
      popular: formData.popular,
      features: validFeatures
    };

    setSubscriptionPlans([...subscriptionPlans, newPlan]);
    toast.success('Plan added successfully!');
    setShowAddModal(false);
    resetForm();
  };

  const handleEditClick = (plan) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      billingCycle: plan.billingCycle,
      color: plan.color,
      popular: plan.popular || false,
      features: [...plan.features]
    });
    setShowEditModal(true);
  };

  const handleEditPlan = (e) => {
    e.preventDefault();
    const validFeatures = formData.features.filter(f => f.trim() !== '');

    if (!formData.name || !formData.price || validFeatures.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubscriptionPlans(subscriptionPlans.map(plan =>
      plan.id === selectedPlan.id
        ? {
            ...plan,
            name: formData.name,
            price: parseFloat(formData.price),
            billingCycle: formData.billingCycle,
            color: formData.color,
            popular: formData.popular,
            features: validFeatures
          }
        : plan
    ));

    toast.success('Plan updated successfully!');
    setShowEditModal(false);
    setSelectedPlan(null);
    resetForm();
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
      setSubscriptionPlans(subscriptionPlans.filter(plan => plan.id !== planId));
      toast.success('Plan deleted successfully!');
    }
  };

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
        <Card
          title="Available Plans"
          subtitle="Manage subscription plans for your schools"
          action={
            <Button
              variant="primary"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Add Plan
            </Button>
          }
        >
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

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEditClick(plan)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Edit plan"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title="Delete plan"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center mb-4 mt-6">
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

      {/* Add Plan Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Add New Plan"
      >
        <form onSubmit={handleAddPlan} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Plan Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Premium"
              required
            />
            <Input
              label="Price (USD)"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g., 99.00"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billing Cycle
              </label>
              <select
                name="billingCycle"
                value={formData.billingCycle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Theme
              </label>
              <select
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="gray">Gray</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
                <option value="green">Green</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="popular"
              checked={formData.popular}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Mark as Popular
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Enter feature"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeatureField(index)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addFeatureField}
                className="w-full flex items-center justify-center gap-2"
              >
                <FiPlus className="w-4 h-4" />
                Add Feature
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                resetForm();
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Add Plan
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Plan Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedPlan(null);
          resetForm();
        }}
        title="Edit Plan"
      >
        <form onSubmit={handleEditPlan} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Plan Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Premium"
              required
            />
            <Input
              label="Price (USD)"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g., 99.00"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billing Cycle
              </label>
              <select
                name="billingCycle"
                value={formData.billingCycle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Theme
              </label>
              <select
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="gray">Gray</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
                <option value="green">Green</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="popular"
              checked={formData.popular}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Mark as Popular
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Enter feature"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeatureField(index)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addFeatureField}
                className="w-full flex items-center justify-center gap-2"
              >
                <FiPlus className="w-4 h-4" />
                Add Feature
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedPlan(null);
                resetForm();
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Update Plan
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Subscriptions;
