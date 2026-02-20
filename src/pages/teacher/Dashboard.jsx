import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/widgets/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { FiBook, FiUsers, FiFileText, FiClock } from 'react-icons/fi';
import { mockDashboardStats, mockAssignments, mockTimetable } from '../../data/mockOtherData';

const TeacherDashboard = () => {
  const stats = mockDashboardStats.teacher;
  const todayClasses = mockTimetable.filter(t => t.day === 'Monday').slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your teaching overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="My Classes"
            value={stats.totalClasses}
            icon={<FiBook className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<FiUsers className="w-6 h-6" />}
            color="green"
          />
          <StatCard
            title="Pending Assignments"
            value={stats.pendingAssignments}
            icon={<FiFileText className="w-6 h-6" />}
            color="orange"
          />
          <StatCard
            title="Today's Classes"
            value={stats.todayClasses}
            icon={<FiClock className="w-6 h-6" />}
            color="purple"
          />
        </div>

        {/* Today's Schedule and Assignments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Today's Schedule">
            <div className="space-y-3">
              {todayClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{classItem.subject}</h4>
                    <Badge variant="info" size="sm">Period {classItem.period}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Class {classItem.class}</span>
                    <span>{classItem.startTime} - {classItem.endTime}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Room: {classItem.room}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Recent Assignments">
            <div className="space-y-3">
              {mockAssignments.slice(0, 4).map((assignment) => (
                <div
                  key={assignment.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                    <Badge
                      variant={assignment.status === 'active' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {assignment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Class: {assignment.class}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Due: {assignment.dueDate}</span>
                    <span className="text-primary font-medium">
                      {assignment.submissions}/{assignment.totalStudents} submitted
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card title="Class Performance Overview">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['10-A', '11-A', '12-A'].map((className) => (
              <div key={className} className="p-4 bg-gray-50 rounded-lg text-center">
                <h4 className="font-semibold text-gray-900 mb-1">Class {className}</h4>
                <p className="text-2xl font-bold text-primary mb-1">
                  {(Math.random() * 10 + 80).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">Avg Score</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
