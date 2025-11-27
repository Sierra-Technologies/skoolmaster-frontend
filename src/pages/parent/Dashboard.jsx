import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/widgets/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import { FiUsers, FiDollarSign, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import { mockDashboardStats, mockAnnouncements } from '../../data/mockOtherData';
import { mockStudents } from '../../data/mockStudents';
import { mockGrades } from '../../data/mockGrades';
import { getGradeColor } from '../../utils/helpers';

const ParentDashboard = () => {
  const stats = mockDashboardStats.parent;
  // Assuming parent has children with IDs 1 and 2
  const children = mockStudents.filter(s => s.id === 1 || s.id === 2);
  const recentGrades = mockGrades.filter(g => g.studentId === 1).slice(0, 3);
  const announcements = mockAnnouncements.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor your children's academic progress.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Children"
            value={stats.totalChildren}
            icon={<FiUsers className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Pending Fees"
            value={`$${stats.pendingFees}`}
            icon={<FiDollarSign className="w-6 h-6" />}
            color="orange"
          />
          <StatCard
            title="Upcoming Meetings"
            value={stats.upcomingMeetings}
            icon={<FiCalendar className="w-6 h-6" />}
            color="purple"
          />
          <StatCard
            title="Announcements"
            value={stats.recentAnnouncements}
            icon={<FiMessageSquare className="w-6 h-6" />}
            color="green"
          />
        </div>

        {/* Children Overview */}
        <Card title="Children Overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child) => (
              <div
                key={child.id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <Avatar src={child.photo} name={child.name} size="xl" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{child.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Class {child.class}-{child.section} • {child.studentId}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Attendance:</span>
                        <p className="font-semibold text-green-600">
                          {child.attendancePercentage}%
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">GPA:</span>
                        <p className="font-semibold text-blue-600">{child.currentGPA}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Fee Status:</span>
                        <Badge
                          variant={child.feeStatus === 'paid' ? 'success' : 'warning'}
                          size="sm"
                          className="mt-1"
                        >
                          {child.feeStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Grades and Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Recent Grades">
            <div className="space-y-3">
              {recentGrades.map((grade) => (
                <div
                  key={grade.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{grade.subject}</h4>
                      <p className="text-sm text-gray-600">{grade.studentName}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xl font-bold ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                      <p className="text-sm text-gray-600">{grade.percentage}%</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{grade.examType} - {grade.date}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="School Announcements">
            <div className="space-y-3">
              {announcements.map((announcement) => (
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
                  <p className="text-xs text-gray-500">{announcement.publishDate}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParentDashboard;
