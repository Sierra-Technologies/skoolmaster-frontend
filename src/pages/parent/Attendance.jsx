import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { FiCalendar, FiCheckCircle, FiXCircle, FiClock, FiBook, FiAlertCircle, FiUser } from 'react-icons/fi';

const ParentAttendance = () => {
  const location = useLocation();
  const initialChildId = location.state?.childId || 1;

  const [selectedChild, setSelectedChild] = useState(initialChildId);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const children = [
    { id: 1, name: 'John Doe', className: '10-A' },
    { id: 2, name: 'Jane Doe', className: '8-B' }
  ];

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'English Literature', 'History', 'English', 'Science'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Mock attendance data for each child
  const attendanceData = {
    1: [ // John Doe
      {
        id: 1,
        subject: 'Mathematics',
        code: 'MATH-101',
        teacher: 'Prof. Sarah Johnson',
        totalClasses: 24,
        attended: 23,
        absent: 1,
        late: 0,
        percentage: 95.83,
        records: [
          { date: '2024-01-22', day: 'Monday', status: 'present', time: '08:00 AM', duration: '60 min' },
          { date: '2024-01-20', day: 'Saturday', status: 'present', time: '08:00 AM', duration: '60 min' },
          { date: '2024-01-19', day: 'Friday', status: 'present', time: '09:00 AM', duration: '60 min' },
          { date: '2024-01-15', day: 'Monday', status: 'absent', time: '08:00 AM', duration: '60 min', reason: 'Sick leave' }
        ]
      },
      {
        id: 2,
        subject: 'Physics',
        code: 'PHY-101',
        teacher: 'Prof. Michael Brown',
        totalClasses: 15,
        attended: 15,
        absent: 0,
        late: 0,
        percentage: 100.0,
        records: [
          { date: '2024-01-22', day: 'Monday', status: 'present', time: '09:00 AM', duration: '60 min' },
          { date: '2024-01-19', day: 'Friday', status: 'present', time: '10:00 AM', duration: '60 min' }
        ]
      },
      {
        id: 3,
        subject: 'Chemistry',
        code: 'CHEM-101',
        teacher: 'Dr. Emily Davis',
        totalClasses: 15,
        attended: 13,
        absent: 1,
        late: 1,
        percentage: 86.67,
        records: [
          { date: '2024-01-19', day: 'Friday', status: 'present', time: '02:00 PM', duration: '60 min' },
          { date: '2024-01-18', day: 'Thursday', status: 'late', time: '10:00 AM', duration: '60 min', lateBy: 15 },
          { date: '2024-01-12', day: 'Friday', status: 'absent', time: '02:00 PM', duration: '60 min', reason: 'Medical appointment' }
        ]
      }
    ],
    2: [ // Jane Doe
      {
        id: 1,
        subject: 'English',
        code: 'ENG-201',
        teacher: 'Ms. Lisa Anderson',
        totalClasses: 20,
        attended: 20,
        absent: 0,
        late: 0,
        percentage: 100.0,
        records: [
          { date: '2024-01-22', day: 'Monday', status: 'present', time: '09:00 AM', duration: '60 min' },
          { date: '2024-01-20', day: 'Saturday', status: 'present', time: '10:00 AM', duration: '60 min' }
        ]
      },
      {
        id: 2,
        subject: 'Science',
        code: 'SCI-201',
        teacher: 'Dr. Alan Turing',
        totalClasses: 18,
        attended: 17,
        absent: 1,
        late: 0,
        percentage: 94.44,
        records: [
          { date: '2024-01-21', day: 'Sunday', status: 'present', time: '11:00 AM', duration: '60 min' },
          { date: '2024-01-14', day: 'Sunday', status: 'absent', time: '11:00 AM', duration: '60 min', reason: 'Family event' }
        ]
      }
    ]
  };

  const attendanceRecords = attendanceData[selectedChild] || [];
  const filteredRecords = selectedSubject === 'all'
    ? attendanceRecords
    : attendanceRecords.filter(r => r.subject === selectedSubject);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <FiCheckCircle className="w-5 h-5 text-green-600" />;
      case 'absent':
        return <FiXCircle className="w-5 h-5 text-red-600" />;
      case 'late':
        return <FiClock className="w-5 h-5 text-orange-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'absent':
        return 'danger';
      case 'late':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 85) return 'text-blue-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setShowDetailsModal(true);
  };

  const totalClasses = attendanceRecords.reduce((sum, r) => sum + r.totalClasses, 0);
  const totalAttended = attendanceRecords.reduce((sum, r) => sum + r.attended, 0);
  const totalAbsent = attendanceRecords.reduce((sum, r) => sum + r.absent, 0);
  const totalLate = attendanceRecords.reduce((sum, r) => sum + r.late, 0);
  const overallPercentage = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(2) : '0.00';

  const selectedChildData = children.find(c => c.id === selectedChild);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600 mt-1">Monitor your children's attendance records</p>
        </div>

        {/* Child Selector */}
        <Card>
          <div className="flex items-center gap-4">
            <FiUser className="w-5 h-5 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">Select Child:</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {children.map(child => (
                <option key={child.id} value={child.id}>
                  {child.name} - Class {child.className}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Overall</p>
              <p className={`text-3xl font-bold ${getPercentageColor(parseFloat(overallPercentage))}`}>
                {overallPercentage}%
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">{totalClasses}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiCheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Present</p>
              <p className="text-2xl font-bold text-green-600">{totalAttended}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiXCircle className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">{totalAbsent}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiClock className="w-6 h-6 text-orange-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Late</p>
              <p className="text-2xl font-bold text-orange-600">{totalLate}</p>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month} 2024</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Attendance Warning */}
        {parseFloat(overallPercentage) < 75 && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
            <FiAlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900">Low Attendance Warning</h4>
              <p className="text-sm text-red-800 mt-1">
                Attendance is below the required 75%. Please ensure regular attendance to avoid academic penalties.
              </p>
            </div>
          </div>
        )}

        {/* Subject-wise Attendance */}
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <Card key={record.id} hoverable>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiBook className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{record.subject}</h3>
                      <p className="text-sm text-gray-600">{record.code} • {record.teacher}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl font-bold ${getPercentageColor(record.percentage)}`}>
                      {record.percentage.toFixed(1)}%
                    </p>
                    <p className="text-sm text-gray-600">{record.attended}/{record.totalClasses} classes</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        record.percentage >= 95
                          ? 'bg-green-500'
                          : record.percentage >= 85
                          ? 'bg-blue-500'
                          : record.percentage >= 75
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${record.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg text-center">
                    <FiCheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Present</p>
                    <p className="text-lg font-bold text-green-600">{record.attended}</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg text-center">
                    <FiXCircle className="w-5 h-5 text-red-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Absent</p>
                    <p className="text-lg font-bold text-red-600">{record.absent}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg text-center">
                    <FiClock className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Late</p>
                    <p className="text-lg font-bold text-orange-600">{record.late}</p>
                  </div>
                </div>

                {/* Action */}
                <div className="flex justify-end">
                  <button
                    onClick={() => handleViewDetails(record)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                  >
                    <FiCalendar className="w-4 h-4" />
                    View Attendance History
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500">No attendance records found for the selected subject.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Attendance Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedRecord(null);
        }}
        title="Attendance History"
        size="lg"
      >
        {selectedRecord && (
          <div className="space-y-6">
            {/* Student Info */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Student</p>
              <p className="text-lg font-bold text-gray-900">{selectedChildData?.name}</p>
              <p className="text-sm text-gray-600 mt-1">Class {selectedChildData?.className}</p>
            </div>

            {/* Subject Header */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedRecord.subject}</h3>
                  <p className="text-gray-600">{selectedRecord.code}</p>
                  <p className="text-sm text-gray-600 mt-1">Teacher: {selectedRecord.teacher}</p>
                </div>
                <div className="text-right">
                  <p className={`text-4xl font-bold ${getPercentageColor(selectedRecord.percentage)}`}>
                    {selectedRecord.percentage.toFixed(1)}%
                  </p>
                  <p className="text-gray-600">{selectedRecord.attended}/{selectedRecord.totalClasses} classes</p>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <FiCheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Present</p>
                <p className="text-2xl font-bold text-green-600">{selectedRecord.attended}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg text-center">
                <FiXCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Absent</p>
                <p className="text-2xl font-bold text-red-600">{selectedRecord.absent}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <FiClock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Late</p>
                <p className="text-2xl font-bold text-orange-600">{selectedRecord.late}</p>
              </div>
            </div>

            {/* Attendance Records */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Attendance Records ({selectedMonth} 2024)</h4>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {selectedRecord.records.map((attendance, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      attendance.status === 'present'
                        ? 'bg-green-50 border-green-200'
                        : attendance.status === 'absent'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-orange-50 border-orange-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(attendance.status)}
                        <div>
                          <p className="font-medium text-gray-900">
                            {attendance.day}, {attendance.date}
                          </p>
                          <p className="text-sm text-gray-600">
                            {attendance.time} • {attendance.duration}
                          </p>
                          {attendance.status === 'late' && attendance.lateBy && (
                            <p className="text-xs text-orange-600 mt-1">
                              Late by {attendance.lateBy} minutes
                            </p>
                          )}
                          {attendance.status === 'absent' && attendance.reason && (
                            <p className="text-xs text-red-600 mt-1">
                              Reason: {attendance.reason}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge variant={getStatusBadge(attendance.status)}>
                        {attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning if low attendance */}
            {selectedRecord.percentage < 75 && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-red-900">Attendance Below Requirement</h5>
                    <p className="text-sm text-red-800 mt-1">
                      Your child needs to attend at least {Math.ceil((0.75 * selectedRecord.totalClasses) - selectedRecord.attended)} more classes
                      to meet the 75% attendance requirement.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default ParentAttendance;
