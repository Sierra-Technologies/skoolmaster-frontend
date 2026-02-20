import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Avatar from '../../components/common/Avatar';
import {
  FiUser,
  FiBook,
  FiAward,
  FiUserCheck,
  FiCalendar,
  FiMail,
  FiPhone,
  FiMapPin,
  FiActivity,
  FiTrendingUp,
  FiAlertCircle
} from 'react-icons/fi';

const ParentChildren = () => {
  const navigate = useNavigate();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  const [children] = useState([
    {
      id: 1,
      name: 'John Doe',
      photo: 'https://i.pravatar.cc/150?img=12',
      rollNo: 'STU-2024-001',
      className: '10-A',
      section: 'A',
      dateOfBirth: '2005-06-15',
      gender: 'Male',
      bloodGroup: 'O+',
      email: 'john.doe@school.com',
      phone: '+232 76 685170',
      address: '123 Main Street, New York, NY 10001',

      // Academic Performance
      overallGPA: 3.85,
      overallPercentage: 88.5,
      attendance: 94.5,
      rank: 5,
      totalStudents: 30,

      // Current Status
      pendingAssignments: 2,
      upcomingExams: 1,
      pendingFees: 2500,

      // Recent Activity
      recentGrades: [
        { subject: 'Mathematics', grade: 'A', score: 86.25 },
        { subject: 'Physics', grade: 'A+', score: 90.0 },
        { subject: 'Chemistry', grade: 'A', score: 88.6 }
      ],

      recentAttendance: {
        thisWeek: 100,
        thisMonth: 95.5,
        trend: 'up'
      },

      teachers: [
        { name: 'Prof. Sarah Johnson', subject: 'Mathematics', email: 'sarah.j@school.com' },
        { name: 'Prof. Michael Brown', subject: 'Physics', email: 'michael.b@school.com' },
        { name: 'Dr. Emily Davis', subject: 'Chemistry', email: 'emily.d@school.com' }
      ]
    },
    {
      id: 2,
      name: 'Jane Doe',
      photo: 'https://i.pravatar.cc/150?img=45',
      rollNo: 'STU-2024-150',
      className: '8-B',
      section: 'B',
      dateOfBirth: '2007-08-22',
      gender: 'Female',
      bloodGroup: 'A+',
      email: 'jane.doe@school.com',
      phone: '+1 (555) 123-4570',
      address: '123 Main Street, New York, NY 10001',

      // Academic Performance
      overallGPA: 4.0,
      overallPercentage: 92.5,
      attendance: 98.2,
      rank: 2,
      totalStudents: 28,

      // Current Status
      pendingAssignments: 1,
      upcomingExams: 2,
      pendingFees: 0,

      // Recent Activity
      recentGrades: [
        { subject: 'English', grade: 'A+', score: 95.0 },
        { subject: 'Science', grade: 'A+', score: 93.5 },
        { subject: 'History', grade: 'A', score: 90.0 }
      ],

      recentAttendance: {
        thisWeek: 100,
        thisMonth: 98.5,
        trend: 'up'
      },

      teachers: [
        { name: 'Ms. Lisa Anderson', subject: 'English', email: 'lisa.a@school.com' },
        { name: 'Dr. Alan Turing', subject: 'Science', email: 'alan.t@school.com' },
        { name: 'Mr. Robert Wilson', subject: 'History', email: 'robert.w@school.com' }
      ]
    }
  ]);

  const handleViewDetails = (child) => {
    setSelectedChild(child);
    setShowDetailsModal(true);
  };

  const handleViewGrades = (child) => {
    navigate('/parent/grades', { state: { childId: child.id } });
  };

  const handleViewAttendance = (child) => {
    navigate('/parent/attendance', { state: { childId: child.id } });
  };

  const handleViewAssignments = (child) => {
    navigate('/parent/assignments', { state: { childId: child.id } });
  };

  const handleViewTimetable = (child) => {
    navigate('/parent/timetable', { state: { childId: child.id } });
  };

  const totalChildren = children.length;
  const avgGPA = (children.reduce((sum, c) => sum + c.overallGPA, 0) / totalChildren).toFixed(2);
  const avgAttendance = (children.reduce((sum, c) => sum + c.attendance, 0) / totalChildren).toFixed(1);
  const totalPendingFees = children.reduce((sum, c) => sum + c.pendingFees, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Children</h1>
          <p className="text-gray-600 mt-1">Monitor your children's academic progress and activities</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <FiUser className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Children</p>
              <p className="text-2xl font-bold text-blue-600">{totalChildren}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiAward className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Avg GPA</p>
              <p className="text-2xl font-bold text-green-600">{avgGPA}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiUserCheck className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Avg Attendance</p>
              <p className="text-2xl font-bold text-purple-600">{avgAttendance}%</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiAlertCircle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Pending Fees</p>
              <p className="text-2xl font-bold text-orange-600">${totalPendingFees}</p>
            </div>
          </Card>
        </div>

        {/* Children Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {children.map((child) => (
            <Card key={child.id} hoverable>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <Avatar
                    src={child.photo}
                    name={child.name}
                    size="xl"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                    <p className="text-gray-600 mt-1">Roll No: {child.rollNo}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="info" size="sm">Class {child.className}</Badge>
                      <Badge variant="success" size="sm">Rank #{child.rank}</Badge>
                    </div>
                  </div>
                </div>

                {/* Performance Overview */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-green-50 rounded-lg text-center">
                    <p className="text-xs text-gray-600">GPA</p>
                    <p className="text-lg font-bold text-green-600">{child.overallGPA}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Score</p>
                    <p className="text-lg font-bold text-blue-600">{child.overallPercentage}%</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Attendance</p>
                    <p className="text-lg font-bold text-purple-600">{child.attendance}%</p>
                  </div>
                </div>

                {/* Alerts */}
                {(child.pendingAssignments > 0 || child.pendingFees > 0) && (
                  <div className="space-y-2">
                    {child.pendingAssignments > 0 && (
                      <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <p className="text-sm text-yellow-900">
                          <FiAlertCircle className="inline w-4 h-4 mr-1" />
                          {child.pendingAssignments} pending assignment{child.pendingAssignments > 1 ? 's' : ''}
                        </p>
                      </div>
                    )}
                    {child.pendingFees > 0 && (
                      <div className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                        <p className="text-sm text-orange-900">
                          <FiAlertCircle className="inline w-4 h-4 mr-1" />
                          Pending fees: ${child.pendingFees}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Recent Activity */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Recent Grades</h4>
                  <div className="space-y-2">
                    {child.recentGrades.slice(0, 3).map((grade, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-900">{grade.subject}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="success" size="sm">{grade.grade}</Badge>
                          <span className="text-sm font-medium text-gray-900">{grade.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attendance Trend */}
                <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">This Week Attendance</p>
                      <p className="text-lg font-bold text-green-600">{child.recentAttendance.thisWeek}%</p>
                    </div>
                    <FiTrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewGrades(child)}
                  >
                    <FiAward className="mr-2 w-4 h-4" />
                    View Grades
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewAttendance(child)}
                  >
                    <FiUserCheck className="mr-2 w-4 h-4" />
                    Attendance
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewAssignments(child)}
                  >
                    <FiBook className="mr-2 w-4 h-4" />
                    Assignments
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewTimetable(child)}
                  >
                    <FiCalendar className="mr-2 w-4 h-4" />
                    Timetable
                  </Button>
                </div>

                {/* View Details Button */}
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => handleViewDetails(child)}
                >
                  View Full Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Child Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedChild(null);
        }}
        title="Child Details"
        size="xl"
      >
        {selectedChild && (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar
                  src={selectedChild.photo}
                  name={selectedChild.name}
                  size="2xl"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedChild.name}</h3>
                  <p className="text-gray-600 mt-1">Roll No: {selectedChild.rollNo}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="info">Class {selectedChild.className}</Badge>
                    <Badge variant="success">Rank #{selectedChild.rank} of {selectedChild.totalStudents}</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Performance */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Academic Performance</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Overall GPA</p>
                  <p className="text-2xl font-bold text-green-600">{selectedChild.overallGPA}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Percentage</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedChild.overallPercentage}%</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Attendance</p>
                  <p className="text-2xl font-bold text-purple-600">{selectedChild.attendance}%</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Class Rank</p>
                  <p className="text-2xl font-bold text-orange-600">#{selectedChild.rank}</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-medium text-gray-900">{selectedChild.dateOfBirth}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-medium text-gray-900">{selectedChild.gender}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Blood Group</p>
                  <p className="font-medium text-gray-900">{selectedChild.bloodGroup}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Section</p>
                  <p className="font-medium text-gray-900">{selectedChild.section}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FiMail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{selectedChild.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FiPhone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{selectedChild.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FiMapPin className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium text-gray-900">{selectedChild.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Teachers */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Teachers</h4>
              <div className="space-y-2">
                {selectedChild.teachers.map((teacher, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{teacher.name}</p>
                      <p className="text-sm text-gray-600">{teacher.subject}</p>
                    </div>
                    <a
                      href={`mailto:${teacher.email}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FiMail className="w-5 h-5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Status */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Current Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">Pending Assignments</p>
                  <p className="text-2xl font-bold text-yellow-600">{selectedChild.pendingAssignments}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Upcoming Exams</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedChild.upcomingExams}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Pending Fees</p>
                  <p className="text-2xl font-bold text-orange-600">${selectedChild.pendingFees}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default ParentChildren;
