import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Avatar from '../../components/common/Avatar';
import {
  FiBook,
  FiUser,
  FiClock,
  FiMapPin,
  FiCalendar,
  FiFileText,
  FiUsers,
  FiAward,
  FiCheckCircle
} from 'react-icons/fi';

const StudentMyClasses = () => {
  const navigate = useNavigate();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const [classes] = useState([
    {
      id: 1,
      name: 'Mathematics',
      code: 'MATH-101',
      className: '10-A',
      teacher: {
        name: 'Prof. Sarah Johnson',
        email: 'sarah.j@school.com',
        photo: 'https://i.pravatar.cc/150?img=47'
      },
      schedule: [
        { day: 'Monday', time: '08:00 - 09:00', room: '201' },
        { day: 'Tuesday', time: '10:00 - 11:00', room: '201' },
        { day: 'Wednesday', time: '08:00 - 09:00', room: '201' },
        { day: 'Thursday', time: '11:00 - 12:00', room: '201' },
        { day: 'Friday', time: '09:00 - 10:00', room: '201' },
        { day: 'Saturday', time: '08:00 - 09:00', room: '201' }
      ],
      totalStudents: 30,
      attendance: 94.5,
      currentGrade: 85.3,
      upcomingAssignments: 2,
      pendingSubmissions: 1,
      topics: [
        'Algebra',
        'Geometry',
        'Trigonometry',
        'Calculus Basics'
      ],
      recentAnnouncements: [
        { date: '2024-01-15', message: 'Mid-term exam scheduled for next week' },
        { date: '2024-01-10', message: 'Assignment 3 due on Friday' }
      ],
      materials: [
        { name: 'Chapter 5 Notes.pdf', type: 'PDF', date: '2024-01-12' },
        { name: 'Practice Problems.docx', type: 'DOC', date: '2024-01-08' },
        { name: 'Formula Sheet.pdf', type: 'PDF', date: '2024-01-05' }
      ]
    },
    {
      id: 2,
      name: 'Physics',
      code: 'PHY-101',
      className: '10-A',
      teacher: {
        name: 'Prof. Michael Brown',
        email: 'michael.b@school.com',
        photo: 'https://i.pravatar.cc/150?img=12'
      },
      schedule: [
        { day: 'Monday', time: '09:00 - 10:00', room: '203' },
        { day: 'Wednesday', time: '02:00 - 03:00', room: '203' },
        { day: 'Friday', time: '10:00 - 11:00', room: '203' }
      ],
      totalStudents: 30,
      attendance: 97.2,
      currentGrade: 88.5,
      upcomingAssignments: 1,
      pendingSubmissions: 0,
      topics: [
        'Mechanics',
        'Thermodynamics',
        'Optics',
        'Electricity'
      ],
      recentAnnouncements: [
        { date: '2024-01-14', message: 'Lab session this Friday' }
      ],
      materials: [
        { name: 'Lab Manual.pdf', type: 'PDF', date: '2024-01-10' },
        { name: 'Theory Notes.pdf', type: 'PDF', date: '2024-01-07' }
      ]
    },
    {
      id: 3,
      name: 'Chemistry',
      code: 'CHEM-101',
      className: '10-A',
      teacher: {
        name: 'Dr. Emily Davis',
        email: 'emily.d@school.com',
        photo: 'https://i.pravatar.cc/150?img=45'
      },
      schedule: [
        { day: 'Tuesday', time: '09:00 - 10:00', room: '205' },
        { day: 'Thursday', time: '10:00 - 11:00', room: '205' },
        { day: 'Friday', time: '02:00 - 03:00', room: '205' }
      ],
      totalStudents: 30,
      attendance: 92.8,
      currentGrade: 91.2,
      upcomingAssignments: 3,
      pendingSubmissions: 2,
      topics: [
        'Organic Chemistry',
        'Inorganic Chemistry',
        'Physical Chemistry',
        'Chemical Bonding'
      ],
      recentAnnouncements: [
        { date: '2024-01-16', message: 'Quiz next Tuesday on Chemical Bonding' },
        { date: '2024-01-12', message: 'Lab report due Friday' }
      ],
      materials: [
        { name: 'Periodic Table.pdf', type: 'PDF', date: '2024-01-11' },
        { name: 'Reaction Guide.pdf', type: 'PDF', date: '2024-01-09' }
      ]
    },
    {
      id: 4,
      name: 'English Literature',
      code: 'ENG-101',
      className: '10-A',
      teacher: {
        name: 'Ms. Lisa Anderson',
        email: 'lisa.a@school.com',
        photo: 'https://i.pravatar.cc/150?img=48'
      },
      schedule: [
        { day: 'Monday', time: '10:00 - 11:00', room: '102' },
        { day: 'Wednesday', time: '11:00 - 12:00', room: '102' },
        { day: 'Thursday', time: '09:00 - 10:00', room: '102' }
      ],
      totalStudents: 30,
      attendance: 95.5,
      currentGrade: 87.8,
      upcomingAssignments: 1,
      pendingSubmissions: 0,
      topics: [
        'Poetry Analysis',
        'Shakespeare',
        'Modern Literature',
        'Essay Writing'
      ],
      recentAnnouncements: [
        { date: '2024-01-13', message: 'Book report due next Monday' }
      ],
      materials: [
        { name: 'Romeo and Juliet.pdf', type: 'PDF', date: '2024-01-08' },
        { name: 'Essay Guidelines.docx', type: 'DOC', date: '2024-01-06' }
      ]
    },
    {
      id: 5,
      name: 'History',
      code: 'HIST-101',
      className: '10-A',
      teacher: {
        name: 'Mr. Robert Wilson',
        email: 'robert.w@school.com',
        photo: 'https://i.pravatar.cc/150?img=33'
      },
      schedule: [
        { day: 'Tuesday', time: '11:00 - 12:00', room: '104' },
        { day: 'Thursday', time: '02:00 - 03:00', room: '104' },
        { day: 'Saturday', time: '09:00 - 10:00', room: '104' }
      ],
      totalStudents: 30,
      attendance: 89.5,
      currentGrade: 82.4,
      upcomingAssignments: 2,
      pendingSubmissions: 1,
      topics: [
        'World War II',
        'Ancient Civilizations',
        'Renaissance',
        'Industrial Revolution'
      ],
      recentAnnouncements: [
        { date: '2024-01-15', message: 'Project presentation next week' }
      ],
      materials: [
        { name: 'WWII Timeline.pdf', type: 'PDF', date: '2024-01-09' },
        { name: 'Study Guide.pdf', type: 'PDF', date: '2024-01-07' }
      ]
    }
  ]);

  const handleViewDetails = (classItem) => {
    setSelectedClass(classItem);
    setShowDetailsModal(true);
  };

  const totalPendingSubmissions = classes.reduce((sum, c) => sum + c.pendingSubmissions, 0);
  const avgAttendance = (classes.reduce((sum, c) => sum + c.attendance, 0) / classes.length).toFixed(1);
  const avgGrade = (classes.reduce((sum, c) => sum + c.currentGrade, 0) / classes.length).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
          <p className="text-gray-600 mt-1">View all your enrolled classes and course materials</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Enrolled Classes</p>
              <p className="text-2xl font-bold text-blue-600">{classes.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Avg Attendance</p>
              <p className="text-2xl font-bold text-green-600">{avgAttendance}%</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Avg Grade</p>
              <p className="text-2xl font-bold text-purple-600">{avgGrade}%</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Pending Work</p>
              <p className="text-2xl font-bold text-orange-600">{totalPendingSubmissions}</p>
            </div>
          </Card>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <Card key={classItem.id} hoverable>
              <div className="space-y-4">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FiBook className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{classItem.name}</h3>
                        <p className="text-sm text-gray-600">{classItem.code}</p>
                      </div>
                    </div>
                    <Badge variant="info" size="sm">
                      {classItem.className}
                    </Badge>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar
                    src={classItem.teacher.photo}
                    name={classItem.teacher.name}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {classItem.teacher.name}
                    </p>
                    <p className="text-xs text-gray-600 truncate">{classItem.teacher.email}</p>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-600">Attendance</p>
                    <p className="text-lg font-bold text-green-600">{classItem.attendance}%</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600">Grade</p>
                    <p className="text-lg font-bold text-purple-600">{classItem.currentGrade}%</p>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Upcoming Assignments</span>
                    <Badge variant="warning" size="sm">{classItem.upcomingAssignments}</Badge>
                  </div>
                  {classItem.pendingSubmissions > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Pending Submissions</span>
                      <Badge variant="danger" size="sm">{classItem.pendingSubmissions}</Badge>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Students</span>
                    <span className="font-medium text-gray-900">{classItem.totalStudents}</span>
                  </div>
                </div>

                {/* Actions */}
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => handleViewDetails(classItem)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Class Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedClass(null);
        }}
        title="Class Details"
        size="xl"
      >
        {selectedClass && (
          <div className="space-y-6">
            {/* Class Header */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <FiBook className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedClass.name}</h3>
                    <p className="text-gray-600">{selectedClass.code}</p>
                  </div>
                </div>
                <Badge variant="info">{selectedClass.className}</Badge>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    setShowDetailsModal(false);
                    navigate('/student/assignments');
                  }}
                >
                  <FiFileText className="mr-2 w-5 h-5" />
                  View Assignments
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    setShowDetailsModal(false);
                    navigate('/student/grades');
                  }}
                >
                  <FiAward className="mr-2 w-5 h-5" />
                  Check Grades
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    setShowDetailsModal(false);
                    navigate('/student/attendance');
                  }}
                >
                  <FiCheckCircle className="mr-2 w-5 h-5" />
                  View Attendance
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    setShowDetailsModal(false);
                    navigate('/student/timetable');
                  }}
                >
                  <FiClock className="mr-2 w-5 h-5" />
                  View Schedule
                </Button>
              </div>
            </div>

            {/* Teacher Information */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Teacher Information</h4>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar
                  src={selectedClass.teacher.photo}
                  name={selectedClass.teacher.name}
                  size="lg"
                />
                <div>
                  <p className="font-semibold text-gray-900">{selectedClass.teacher.name}</p>
                  <p className="text-sm text-gray-600">{selectedClass.teacher.email}</p>
                </div>
              </div>
            </div>

            {/* Performance Overview */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Performance Overview</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Attendance</p>
                  <p className="text-2xl font-bold text-green-600">{selectedClass.attendance}%</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Current Grade</p>
                  <p className="text-2xl font-bold text-purple-600">{selectedClass.currentGrade}%</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Class Rank</p>
                  <p className="text-2xl font-bold text-blue-600">5/{selectedClass.totalStudents}</p>
                </div>
              </div>
            </div>

            {/* Class Schedule */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Class Schedule</h4>
              <div className="space-y-2">
                {selectedClass.schedule.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-900">{schedule.day}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        <span>{schedule.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiMapPin className="w-4 h-4" />
                        <span>Room {schedule.room}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topics Covered */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Topics Covered</h4>
              <div className="flex flex-wrap gap-2">
                {selectedClass.topics.map((topic, index) => (
                  <Badge key={index} variant="default">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Recent Announcements */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recent Announcements</h4>
              <div className="space-y-2">
                {selectedClass.recentAnnouncements.map((announcement, index) => (
                  <div key={index} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-sm text-gray-900">{announcement.message}</p>
                    <p className="text-xs text-gray-600 mt-1">{announcement.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Materials */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Course Materials</h4>
              <div className="space-y-2">
                {selectedClass.materials.map((material, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FiFileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{material.name}</p>
                        <p className="text-xs text-gray-600">{material.date}</p>
                      </div>
                    </div>
                    <Badge variant="default" size="sm">{material.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default StudentMyClasses;
