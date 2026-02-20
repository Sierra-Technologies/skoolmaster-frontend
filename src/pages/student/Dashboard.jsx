import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/widgets/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { FiBook, FiAward, FiUserCheck, FiFileText } from 'react-icons/fi';
import { mockDashboardStats, mockTimetable } from '../../data/mockOtherData';
import { mockGrades } from '../../data/mockGrades';
import { getGradeColor } from '../../utils/helpers';

const StudentDashboard = () => {
  const stats = mockDashboardStats.student;
  const recentGrades = mockGrades.filter(g => g.studentId === 1).slice(0, 4);
  const todayClasses = mockTimetable.filter(t => t.class === '10-A' && t.day === 'Monday').slice(0, 4);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Track your academic progress.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Subjects"
            value={stats.totalSubjects}
            icon={<FiBook className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Average Grade"
            value={stats.averageGrade.toFixed(1)}
            icon={<FiAward className="w-6 h-6" />}
            color="green"
            trend="up"
            trendValue="+3.2%"
          />
          <StatCard
            title="Attendance"
            value={`${stats.attendancePercentage}%`}
            icon={<FiUserCheck className="w-6 h-6" />}
            color="purple"
            trend="up"
            trendValue="+1.5%"
          />
          <StatCard
            title="Pending Assignments"
            value={stats.pendingAssignments}
            icon={<FiFileText className="w-6 h-6" />}
            color="orange"
          />
        </div>

        {/* Today's Classes and Recent Grades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Today's Classes">
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
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{classItem.teacher}</span>
                    <span className="text-gray-600">
                      {classItem.startTime} - {classItem.endTime}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Room: {classItem.room}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Recent Grades">
            <div className="space-y-3">
              {recentGrades.map((grade) => (
                <div
                  key={grade.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{grade.subject}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                      <Badge variant="primary" size="sm">
                        {grade.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{grade.examType}</span>
                    <span className="text-gray-500">{grade.date}</span>
                  </div>
                  {grade.remarks && (
                    <p className="text-sm text-gray-600 mt-2 italic">{grade.remarks}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Subject Performance */}
        <Card title="Subject Performance">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Mathematics', 'Physics', 'Chemistry', 'English'].map((subject) => (
              <div key={subject} className="p-4 bg-gray-50 rounded-lg text-center">
                <h4 className="font-semibold text-gray-900 mb-1">{subject}</h4>
                <p className="text-2xl font-bold text-primary mb-1">
                  {(Math.random() * 15 + 80).toFixed(0)}%
                </p>
                <p className="text-sm text-gray-600">Score</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
