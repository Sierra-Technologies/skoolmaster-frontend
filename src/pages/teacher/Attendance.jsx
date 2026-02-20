import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import { FiCheck, FiX, FiClock, FiDownload, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const TeacherAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10-A-Math');

  const classes = [
    { id: '10-A-Math', name: 'Class 10-A - Mathematics' },
    { id: '11-A-Math', name: 'Class 11-A - Mathematics' },
    { id: '12-A-Physics', name: 'Class 12-A - Physics' },
    { id: '11-B-Math', name: 'Class 11-B - Mathematics' }
  ];

  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', rollNo: '001', status: 'present', lateBy: 0 },
    { id: 2, name: 'Jane Smith', rollNo: '002', status: 'present', lateBy: 0 },
    { id: 3, name: 'Mike Johnson', rollNo: '003', status: 'absent', lateBy: 0 },
    { id: 4, name: 'Sarah Williams', rollNo: '004', status: 'present', lateBy: 0 },
    { id: 5, name: 'David Brown', rollNo: '005', status: 'late', lateBy: 15 },
    { id: 6, name: 'Emily Davis', rollNo: '006', status: 'present', lateBy: 0 },
    { id: 7, name: 'James Wilson', rollNo: '007', status: 'present', lateBy: 0 },
    { id: 8, name: 'Lisa Anderson', rollNo: '008', status: 'absent', lateBy: 0 },
    { id: 9, name: 'Robert Taylor', rollNo: '009', status: 'present', lateBy: 0 },
    { id: 10, name: 'Maria Garcia', rollNo: '010', status: 'present', lateBy: 0 },
  ]);

  const toggleAttendance = (studentId, newStatus) => {
    setStudents(students.map(student =>
      student.id === studentId
        ? { ...student, status: newStatus, lateBy: newStatus === 'late' ? 10 : 0 }
        : student
    ));
  };

  const markAllPresent = () => {
    setStudents(students.map(student => ({ ...student, status: 'present', lateBy: 0 })));
    toast.success('All students marked as present');
  };

  const handleSaveAttendance = () => {
    toast.success('Attendance saved successfully!');
  };

  const handleExportAttendance = () => {
    toast.success('Attendance report exported!');
  };

  const stats = {
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    late: students.filter(s => s.status === 'late').length,
    total: students.length
  };

  const attendancePercentage = ((stats.present / stats.total) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mark Attendance</h1>
            <p className="text-gray-600 mt-1">Track and manage daily attendance for your classes</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleExportAttendance} variant="outline">
              <FiDownload className="mr-2" />
              Export Report
            </Button>
            <Button onClick={handleSaveAttendance}>
              Save Attendance
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiCalendar className="inline mr-2" />
                Select Date
              </label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full" onClick={markAllPresent}>
                Mark All Present
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Present</p>
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Late</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Attendance %</p>
              <p className="text-2xl font-bold text-blue-600">{attendancePercentage}%</p>
            </div>
          </Card>
        </div>

        {/* Attendance List */}
        <Card title="Student Attendance">
          <div className="space-y-2">
            {students.map((student) => (
              <div
                key={student.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  student.status === 'present'
                    ? 'bg-green-50 border-green-200'
                    : student.status === 'absent'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                      {student.rollNo}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                      {student.status === 'late' && (
                        <p className="text-sm text-yellow-600">
                          <FiClock className="inline mr-1" />
                          Late by {student.lateBy} minutes
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleAttendance(student.id, 'present')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        student.status === 'present'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                      }`}
                    >
                      <FiCheck className="inline mr-1" />
                      Present
                    </button>
                    <button
                      onClick={() => toggleAttendance(student.id, 'late')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        student.status === 'late'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'
                      }`}
                    >
                      <FiClock className="inline mr-1" />
                      Late
                    </button>
                    <button
                      onClick={() => toggleAttendance(student.id, 'absent')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        student.status === 'absent'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                      }`}
                    >
                      <FiX className="inline mr-1" />
                      Absent
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats Summary */}
        <Card title="Attendance Summary">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-gray-900">Present Students</span>
              <Badge variant="success">{stats.present} / {stats.total}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="font-medium text-gray-900">Absent Students</span>
              <Badge variant="error">{stats.absent} / {stats.total}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium text-gray-900">Late Students</span>
              <Badge variant="warning">{stats.late} / {stats.total}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-gray-900">Overall Attendance Rate</span>
              <Badge variant="info">{attendancePercentage}%</Badge>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherAttendance;
