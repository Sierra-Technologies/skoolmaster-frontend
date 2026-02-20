import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/widgets/StatCard';
import Card from '../../components/common/Card';
import { FiGrid, FiUsers, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { mockDashboardStats, mockSchools } from '../../data/mockOtherData';
import Badge from '../../components/common/Badge';

const SuperAdminDashboard = () => {
  const stats = mockDashboardStats.superadmin;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening across all schools.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Schools"
            value={stats.totalSchools}
            icon={<FiGrid className="w-6 h-6" />}
            color="blue"
            trend="up"
            trendValue="+2 this month"
          />
          <StatCard
            title="Total Students"
            value={stats.totalStudents.toLocaleString()}
            icon={<FiUsers className="w-6 h-6" />}
            color="green"
            trend="up"
            trendValue="+125 this month"
          />
          <StatCard
            title="Total Teachers"
            value={stats.totalTeachers}
            icon={<FiUsers className="w-6 h-6" />}
            color="purple"
            trend="up"
            trendValue="+8 this month"
          />
          <StatCard
            title="Total Revenue"
            value={`$${(stats.totalRevenue / 1000).toFixed(0)}K`}
            icon={<FiDollarSign className="w-6 h-6" />}
            color="orange"
            trend="up"
            trendValue="+12.5%"
          />
        </div>

        {/* Schools List */}
        <Card title="Schools Overview" subtitle="Manage all registered schools">
          <div className="space-y-4">
            {mockSchools.slice(0, 5).map((school) => (
              <div
                key={school.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={school.logo}
                    alt={school.name}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{school.name}</h3>
                    <p className="text-sm text-gray-600">
                      {school.totalStudents} Students • {school.totalTeachers} Teachers
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={school.status === 'active' ? 'success' : 'error'}>
                    {school.status}
                  </Badge>
                  <Badge variant="primary">{school.subscriptionPlan}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Subscription Status">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Subscriptions</span>
                <span className="font-semibold text-green-600">{stats.activeSubscriptions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Expiring Soon</span>
                <span className="font-semibold text-yellow-600">{stats.expiringSubscriptions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Revenue (Monthly)</span>
                <span className="font-semibold text-blue-600">
                  ${(stats.totalRevenue / 12).toFixed(0)}
                </span>
              </div>
            </div>
          </Card>

          <Card title="Quick Stats">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Schools</span>
                <span className="font-semibold text-green-600">{stats.activeSchools}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Students per School</span>
                <span className="font-semibold text-blue-600">
                  {(stats.totalStudents / stats.totalSchools).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Teachers per School</span>
                <span className="font-semibold text-purple-600">
                  {(stats.totalTeachers / stats.totalSchools).toFixed(0)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
