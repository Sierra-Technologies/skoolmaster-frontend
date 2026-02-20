import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/widgets/StatCard';
import Card from '../../components/common/Card';
import { FiUsers, FiUserCheck, FiDollarSign, FiBook } from 'react-icons/fi';
import { mockDashboardStats } from '../../data/mockOtherData';
import { mockAnnouncements } from '../../data/mockOtherData';
import Badge from '../../components/common/Badge';
import { formatDate } from '../../utils/formatters';

const AdminDashboard = () => {
  const stats = mockDashboardStats.admin;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">School Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your school overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<FiUsers className="w-6 h-6" />}
            color="blue"
            trend="up"
            trendValue="+12 this month"
          />
          <StatCard
            title="Total Teachers"
            value={stats.totalTeachers}
            icon={<FiUsers className="w-6 h-6" />}
            color="green"
            trend="up"
            trendValue="+3 this month"
          />
          <StatCard
            title="Total Classes"
            value={stats.totalClasses}
            icon={<FiBook className="w-6 h-6" />}
            color="purple"
          />
          <StatCard
            title="Avg Attendance"
            value={`${stats.averageAttendance}%`}
            icon={<FiUserCheck className="w-6 h-6" />}
            color="orange"
            trend="up"
            trendValue="+2.5%"
          />
        </div>

        {/* Recent Activity and Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Recent Announcements">
            <div className="space-y-4">
              {mockAnnouncements.slice(0, 4).map((announcement) => (
                <div
                  key={announcement.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                    <Badge
                      variant={
                        announcement.priority === 'high' ? 'error' :
                        announcement.priority === 'medium' ? 'warning' : 'info'
                      }
                      size="sm"
                    >
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{announcement.description}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(announcement.publishDate)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Quick Stats">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Fees</span>
                  <span className="text-xl font-bold text-blue-600">
                    ${stats.pendingFees.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Upcoming Exams</span>
                  <span className="text-xl font-bold text-green-600">
                    {stats.upcomingExams}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Recent Admissions</span>
                  <span className="text-xl font-bold text-purple-600">
                    {stats.recentAdmissions}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Class Distribution */}
        <Card title="Class Distribution">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['10-A', '10-B', '11-A', '11-B', '12-A', '12-B'].map((className) => (
              <div
                key={className}
                className="p-4 bg-gray-50 rounded-lg text-center"
              >
                <h4 className="font-semibold text-gray-900 mb-1">Class {className}</h4>
                <p className="text-2xl font-bold text-primary">
                  {Math.floor(Math.random() * 20) + 25}
                </p>
                <p className="text-sm text-gray-600">Students</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
