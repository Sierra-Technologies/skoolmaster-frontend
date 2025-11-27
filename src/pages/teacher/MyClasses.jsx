import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { FiUsers, FiBook, FiClock, FiCalendar, FiEye, FiUserCheck, FiAward, FiFileText, FiEdit2, FiPlus, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const MyClasses = () => {
  const navigate = useNavigate();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [editingTopics, setEditingTopics] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [classNotes, setClassNotes] = useState('');

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

  const handleManageClass = (classItem) => {
    setSelectedClass(classItem);
    setClassNotes('');
    setEditingTopics(false);
    setNewTopic('');
    setShowManageModal(true);
  };

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      toast.success(`Topic "${newTopic}" added successfully!`);
      setNewTopic('');
      setEditingTopics(false);
    }
  };

  const handleSaveNotes = () => {
    toast.success('Class notes saved successfully!');
    setClassNotes('');
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
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleManageClass(classItem)}
                  >
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

      {/* Manage Class Modal */}
      <Modal
        isOpen={showManageModal}
        onClose={() => {
          setShowManageModal(false);
          setSelectedClass(null);
          setEditingTopics(false);
          setNewTopic('');
          setClassNotes('');
        }}
        title="Manage Class"
        size="lg"
      >
        {selectedClass && (
          <div className="space-y-6">
            {/* Class Header */}
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-1">
                {selectedClass.subject} - Class {selectedClass.className}
              </h3>
              <p className="text-blue-100">{selectedClass.students} students enrolled</p>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    setShowManageModal(false);
                    navigate('/teacher/attendance');
                  }}
                >
                  <FiUserCheck className="mr-2 w-5 h-5" />
                  Mark Attendance
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    setShowManageModal(false);
                    navigate('/teacher/grades');
                  }}
                >
                  <FiAward className="mr-2 w-5 h-5" />
                  Enter Grades
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    setShowManageModal(false);
                    navigate('/teacher/assignments');
                  }}
                >
                  <FiFileText className="mr-2 w-5 h-5" />
                  Create Assignment
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    setShowManageModal(false);
                    navigate('/teacher/students');
                  }}
                >
                  <FiUsers className="mr-2 w-5 h-5" />
                  View Students
                </Button>
              </div>
            </div>

            {/* Class Performance */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Current Performance</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Attendance Rate</p>
                  <p className="text-2xl font-bold text-green-600">{selectedClass.avgAttendance}%</p>
                  <p className="text-xs text-gray-500 mt-1">Class average</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Average Grade</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedClass.avgGrade}%</p>
                  <p className="text-xs text-gray-500 mt-1">Class average</p>
                </div>
              </div>
            </div>

            {/* Topics Management */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Topics Covered</h4>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingTopics(!editingTopics)}
                >
                  <FiEdit2 className="mr-1 w-4 h-4" />
                  {editingTopics ? 'Cancel' : 'Add Topic'}
                </Button>
              </div>

              {editingTopics && (
                <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter new topic name..."
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTopic()}
                    />
                    <Button onClick={handleAddTopic}>
                      <FiPlus className="mr-1 w-4 h-4" />
                      Add
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {selectedClass.topics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-sm font-medium text-blue-700">{topic}</span>
                    <button
                      onClick={() => toast.success(`Topic "${topic}" removed`)}
                      className="text-blue-600 hover:text-red-600 transition-colors"
                      title="Remove topic"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Notes/Announcements */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Class Notes / Announcements</h4>
              <textarea
                value={classNotes}
                onChange={(e) => setClassNotes(e.target.value)}
                placeholder="Add notes or announcements for this class..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="mt-2 flex justify-end">
                <Button size="sm" onClick={handleSaveNotes} disabled={!classNotes.trim()}>
                  Save Notes
                </Button>
              </div>
            </div>

            {/* Upcoming Schedule */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Upcoming Classes</h4>
              <div className="space-y-2">
                {selectedClass.schedule.slice(0, 3).map((slot, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{slot.day}</p>
                        <p className="text-sm text-gray-600">{slot.time}</p>
                      </div>
                    </div>
                    <Badge variant="info">Room {slot.room}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Work */}
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Pending Work</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-gray-600">Assignments to Review</p>
                  <p className="text-2xl font-bold text-orange-600">{selectedClass.pendingAssignments}</p>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
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
