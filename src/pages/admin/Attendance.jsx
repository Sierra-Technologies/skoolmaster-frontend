import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import { FiCalendar, FiCheck, FiX, FiClock, FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10-A');

  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', rollNo: '001', status: 'present' },
    { id: 2, name: 'Jane Smith', rollNo: '002', status: 'present' },
    { id: 3, name: 'Mike Johnson', rollNo: '003', status: 'absent' },
    { id: 4, name: 'Sarah Williams', rollNo: '004', status: 'present' },
    { id: 5, name: 'David Brown', rollNo: '005', status: 'late' },
    { id: 6, name: 'Emily Davis', rollNo: '006', status: 'present' },
    { id: 7, name: 'James Wilson', rollNo: '007', status: 'present' },
    { id: 8, name: 'Lisa Anderson', rollNo: '008', status: 'absent' },
  ]);

  const classes = ['10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];

  const toggleAttendance = (studentId, newStatus) => {
    setStudents(students.map(student =>
      student.id === studentId ? { ...student, status: newStatus } : student
    ));
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
            <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600 mt-1">Track and manage daily attendance</p>
          </div>
          <Button onClick={handleExportAttendance} variant="outline">
            <FiDownload className="mr-2" />
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <option key={cls} value={cls}>Class {cls}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={handleSaveAttendance}>
                Save Attendance
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Present</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.present}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.absent}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Attendance Rate</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{attendancePercentage}%</p>
            </div>
          </Card>
        </div>

        {/* Attendance List */}
        <Card title={`Attendance for Class ${selectedClass} - ${selectedDate}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Roll No</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Student Name</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{student.rollNo}</td>
                    <td className="py-3 px-4 text-gray-900 font-medium">{student.name}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant={
                          student.status === 'present' ? 'success' :
                          student.status === 'absent' ? 'error' :
                          'warning'
                        }
                        className="capitalize"
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => toggleAttendance(student.id, 'present')}
                          className={`p-2 rounded-lg transition-colors ${
                            student.status === 'present'
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-green-100'
                          }`}
                          title="Mark Present"
                        >
                          <FiCheck className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleAttendance(student.id, 'absent')}
                          className={`p-2 rounded-lg transition-colors ${
                            student.status === 'absent'
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-red-100'
                          }`}
                          title="Mark Absent"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleAttendance(student.id, 'late')}
                          className={`p-2 rounded-lg transition-colors ${
                            student.status === 'late'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-yellow-100'
                          }`}
                          title="Mark Late"
                        >
                          <FiClock className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Weekly Summary */}
        <Card title="Weekly Attendance Summary">
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const randomPercentage = (Math.random() * 20 + 80).toFixed(1);
              return (
                <div key={day} className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600 font-medium">{day}</p>
                  <p className="text-2xl font-bold text-blue-600 mt-2">{randomPercentage}%</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.floor((randomPercentage / 100) * stats.total)}/{stats.total}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
