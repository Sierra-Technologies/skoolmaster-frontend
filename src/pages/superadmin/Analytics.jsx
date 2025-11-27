import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import StatCard from '../../components/widgets/StatCard';
import { FiUsers, FiTrendingUp, FiDollarSign, FiActivity } from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  // Monthly growth data
  const monthlyData = [
    { month: 'Jan', schools: 3, students: 2500, revenue: 12000 },
    { month: 'Feb', schools: 3, students: 2800, revenue: 14000 },
    { month: 'Mar', schools: 4, students: 3200, revenue: 18000 },
    { month: 'Apr', schools: 4, students: 3400, revenue: 19000 },
    { month: 'May', schools: 4, students: 3600, revenue: 21000 },
    { month: 'Jun', schools: 5, students: 3950, revenue: 24000 },
  ];

  // Subscription distribution
  const subscriptionData = [
    { name: 'Free', value: 1, color: '#9CA3AF' },
    { name: 'Basic', value: 1, color: '#3B82F6' },
    { name: 'Premium', value: 2, color: '#8B5CF6' },
    { name: 'Enterprise', value: 1, color: '#F59E0B' },
  ];

  // School performance data
  const schoolPerformance = [
    { school: 'Springfield', students: 850, avgGrade: 85, attendance: 92 },
    { school: 'Riverside', students: 650, avgGrade: 88, attendance: 94 },
    { school: 'Greenwood', students: 1200, avgGrade: 90, attendance: 95 },
    { school: 'Oakdale', students: 500, avgGrade: 82, attendance: 88 },
    { school: 'Sunset Valley', students: 750, avgGrade: 86, attendance: 91 },
  ];

  // User activity data
  const userActivityData = [
    { day: 'Mon', logins: 1200 },
    { day: 'Tue', logins: 1400 },
    { day: 'Wed', logins: 1600 },
    { day: 'Thu', logins: 1500 },
    { day: 'Fri', logins: 1800 },
    { day: 'Sat', logins: 900 },
    { day: 'Sun', logins: 700 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform-wide insights and performance metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value="$485K"
            icon={<FiDollarSign className="w-6 h-6" />}
            color="green"
            trend="up"
            trendValue="+15.3%"
          />
          <StatCard
            title="Active Users"
            value="4,173"
            icon={<FiUsers className="w-6 h-6" />}
            color="blue"
            trend="up"
            trendValue="+8.2%"
          />
          <StatCard
            title="Avg Engagement"
            value="87.5%"
            icon={<FiActivity className="w-6 h-6" />}
            color="purple"
            trend="up"
            trendValue="+3.1%"
          />
          <StatCard
            title="Growth Rate"
            value="12.4%"
            icon={<FiTrendingUp className="w-6 h-6" />}
            color="orange"
            trend="up"
            trendValue="+2.5%"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Growth */}
          <Card title="Monthly Growth Trends" subtitle="Students and revenue over time">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="students"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Students"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Subscription Distribution */}
          <Card title="Subscription Distribution" subtitle="Plans breakdown">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* More Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* School Performance */}
          <Card title="School Performance" subtitle="Student count and average grades">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={schoolPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="school" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#3B82F6" name="Students" />
                <Bar dataKey="avgGrade" fill="#10B981" name="Avg Grade" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* User Activity */}
          <Card title="Weekly User Activity" subtitle="Daily login trends">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="logins" fill="#8B5CF6" name="Daily Logins" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Performance Table */}
        <Card title="School Performance Summary">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance %</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schoolPerformance.map((school, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {school.school}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {school.students}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-semibold ${
                        school.avgGrade >= 90 ? 'text-green-600' :
                        school.avgGrade >= 85 ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>
                        {school.avgGrade}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-semibold ${
                        school.attendance >= 90 ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {school.attendance}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Excellent
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
