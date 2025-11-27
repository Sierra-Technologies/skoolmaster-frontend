import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { FiUsers, FiBook, FiClock, FiCalendar, FiEye } from 'react-icons/fi';

const MyClasses = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const [classes] = useState([
    {
      id: 1,
      className: '10-A',
      subject: 'Mathematics',
      students: 32,
      schedule: [
        { day: 'Monday', time: '08:00 - 09:00', room: '201' },
        { day: 'Wednesday', time: '09:00 - 10:00', room: '201' },
        { day: 'Friday', time: '10:00 - 11:00', room: '201' }
      ],
      avgAttendance: 94.5,
      avgGrade: 85.3,
      nextClass: 'Monday 08:00',
      topics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus'],
      pendingAssignments: 2,
      upcomingTests: 1
    },
    {
      id: 2,
      className: '11-A',
      subject: 'Mathematics',
      students: 28,
      schedule: [
        { day: 'Tuesday', time: '09:00 - 10:00', room: '201' },
        { day: 'Thursday', time: '08:00 - 09:00', room: '201' },
        { day: 'Saturday', time: '10:00 - 11:00', room: '201' }
      ],
      avgAttendance: 91.2,
      avgGrade: 82.7,
      nextClass: 'Tuesday 09:00',
      topics: ['Advanced Algebra', 'Calculus', 'Statistics', 'Probability'],
      pendingAssignments: 3,
      upcomingTests: 0
    },
    {
      id: 3,
      className: '12-A',
      subject: 'Physics',
      students: 25,
      schedule: [
        { day: 'Monday', time: '10:00 - 11:00', room: '203' },
        { day: 'Wednesday', time: '11:00 - 12:00', room: '203' },
        { day: 'Friday', time: '08:00 - 09:00', room: '203' }
      ],
      avgAttendance: 96.8,
      avgGrade: 88.1,
      nextClass: 'Monday 10:00',
      topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics'],
      pendingAssignments: 1,
      upcomingTests: 2
    },
    {
      id: 4,
      className: '11-B',
      subject: 'Mathematics',
      students: 30,
      schedule: [
        { day: 'Tuesday', time: '11:00 - 12:00', room: '201' },
        { day: 'Thursday', time: '10:00 - 11:00', room: '201' }
      ],
      avgAttendance: 89.5,
      avgGrade: 80.2,
      nextClass: 'Tuesday 11:00',
      topics: ['Advanced Algebra', 'Calculus', 'Statistics', 'Probability'],
      pendingAssignments: 2,
      upcomingTests: 1
    }
  ]);

  const handleViewDetails = (classItem) => {
    setSelectedClass(classItem);
    setShowDetailsModal(true);
  };

  const totalStudents = classes.reduce((sum, c) => sum + c.students, 0);
  const avgAttendance = (classes.reduce((sum, c) => sum + c.avgAttendance, 0) / classes.length).toFixed(1);
  const totalPendingAssignments = classes.reduce((sum, c) => sum + c.pendingAssignments, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
          <p className="text-gray-600 mt-1">Manage and view your teaching classes</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiBook className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <FiUsers className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <FiClock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold text-gray-900">{avgAttendance}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {classes.map((classItem) => (
            <Card key={classItem.id} hoverable>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {classItem.subject} - Class {classItem.className}
                    </h3>
                    <p className="text-gray-600 mt-1">{classItem.students} students enrolled</p>
                  </div>
                  <Badge variant="info">{classItem.schedule.length} periods/week</Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Avg Attendance</p>
                    <p className="text-lg font-bold text-green-600">{classItem.avgAttendance}%</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Avg Grade</p>
                    <p className="text-lg font-bold text-blue-600">{classItem.avgGrade}%</p>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiCalendar className="w-4 h-4" />
                    <span>Next class: {classItem.nextClass}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiBook className="w-4 h-4" />
                    <span>{classItem.pendingAssignments} pending assignments</span>
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Topics Covered:</p>
                  <div className="flex flex-wrap gap-2">
                    {classItem.topics.slice(0, 3).map((topic, index) => (
                      <Badge key={index} variant="default" size="sm">
                        {topic}
                      </Badge>
                    ))}
                    {classItem.topics.length > 3 && (
                      <Badge variant="default" size="sm">
                        +{classItem.topics.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleViewDetails(classItem)}
                  >
                    <FiEye className="mr-2 w-4 h-4" />
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Manage Class
                  </Button>
                </div>
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
        size="lg"
      >
        {selectedClass && (
          <div className="space-y-6">
            {/* Class Info */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedClass.subject} - Class {selectedClass.className}
              </h3>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedClass.students}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Periods per Week</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedClass.schedule.length}</p>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Performance Overview</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Average Attendance</p>
                  <p className="text-2xl font-bold text-green-600">{selectedClass.avgAttendance}%</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Average Grade</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedClass.avgGrade}%</p>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Class Schedule</h4>
              <div className="space-y-2">
                {selectedClass.schedule.map((slot, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-900">{slot.day}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4" />
                        <span>{slot.time}</span>
                      </div>
                      <span>Room: {slot.room}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Topics Covered</h4>
              <div className="flex flex-wrap gap-2">
                {selectedClass.topics.map((topic, index) => (
                  <Badge key={index} variant="primary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Assignments & Tests */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Upcoming Work</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Pending Assignments</p>
                  <p className="text-2xl font-bold text-orange-600">{selectedClass.pendingAssignments}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Upcoming Tests</p>
                  <p className="text-2xl font-bold text-red-600">{selectedClass.upcomingTests}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default MyClasses;
