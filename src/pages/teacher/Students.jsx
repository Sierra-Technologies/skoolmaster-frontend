import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Avatar from '../../components/common/Avatar';
import { FiSearch, FiEye, FiMail, FiPhone, FiBook } from 'react-icons/fi';

const TeacherStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const classes = ['all', '10-A', '11-A', '11-B', '12-A'];

  const [students] = useState([
    {
      id: 1,
      rollNo: '001',
      name: 'John Doe',
      email: 'john.doe@school.com',
      phone: '+1234567890',
      class: '10-A',
      photo: 'https://i.pravatar.cc/150?img=12',
      attendance: 94.5,
      avgGrade: 85.3,
      subjects: ['Mathematics'],
      recentGrades: { midterm: 85, final: 88 },
      parentName: 'Robert Doe',
      parentEmail: 'robert.doe@email.com',
      parentPhone: '+1234567891'
    },
    {
      id: 2,
      rollNo: '002',
      name: 'Jane Smith',
      email: 'jane.smith@school.com',
      phone: '+1234567892',
      class: '10-A',
      photo: 'https://i.pravatar.cc/150?img=45',
      attendance: 97.2,
      avgGrade: 92.5,
      subjects: ['Mathematics'],
      recentGrades: { midterm: 92, final: 95 },
      parentName: 'Sarah Smith',
      parentEmail: 'sarah.smith@email.com',
      parentPhone: '+1234567893'
    },
    {
      id: 3,
      rollNo: '001',
      name: 'Mike Johnson',
      email: 'mike.j@school.com',
      phone: '+1234567894',
      class: '11-A',
      photo: 'https://i.pravatar.cc/150?img=33',
      attendance: 89.5,
      avgGrade: 78.2,
      subjects: ['Mathematics'],
      recentGrades: { midterm: 78, final: 82 },
      parentName: 'David Johnson',
      parentEmail: 'david.j@email.com',
      parentPhone: '+1234567895'
    },
    {
      id: 4,
      rollNo: '002',
      name: 'Emily Davis',
      email: 'emily.d@school.com',
      phone: '+1234567896',
      class: '11-A',
      photo: 'https://i.pravatar.cc/150?img=47',
      attendance: 92.8,
      avgGrade: 88.1,
      subjects: ['Mathematics'],
      recentGrades: { midterm: 88, final: 90 },
      parentName: 'Linda Davis',
      parentEmail: 'linda.d@email.com',
      parentPhone: '+1234567897'
    },
    {
      id: 5,
      rollNo: '001',
      name: 'Daniel Martinez',
      email: 'daniel.m@school.com',
      phone: '+1234567898',
      class: '11-B',
      photo: 'https://i.pravatar.cc/150?img=15',
      attendance: 95.1,
      avgGrade: 72.5,
      subjects: ['Mathematics'],
      recentGrades: { midterm: 72, final: 75 },
      parentName: 'Carlos Martinez',
      parentEmail: 'carlos.m@email.com',
      parentPhone: '+1234567899'
    },
    {
      id: 6,
      rollNo: '001',
      name: 'Sophia Garcia',
      email: 'sophia.g@school.com',
      phone: '+1234567800',
      class: '12-A',
      photo: 'https://i.pravatar.cc/150?img=48',
      attendance: 98.5,
      avgGrade: 95.2,
      subjects: ['Physics'],
      recentGrades: { midterm: 95, final: 97 },
      parentName: 'Maria Garcia',
      parentEmail: 'maria.g@email.com',
      parentPhone: '+1234567801'
    },
  ]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.includes(searchTerm) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Students</h1>
          <p className="text-gray-600 mt-1">View and manage your students</p>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by name, roll number, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<FiSearch className="w-5 h-5 text-gray-400" />}
              />
            </div>
            <div>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Classes</option>
                {classes.filter(c => c !== 'all').map(cls => (
                  <option key={cls} value={cls}>Class {cls}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{filteredStudents.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Avg Attendance</p>
              <p className="text-2xl font-bold text-green-600">
                {(filteredStudents.reduce((sum, s) => sum + s.attendance, 0) / filteredStudents.length).toFixed(1)}%
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Avg Grade</p>
              <p className="text-2xl font-bold text-blue-600">
                {(filteredStudents.reduce((sum, s) => sum + s.avgGrade, 0) / filteredStudents.length).toFixed(1)}%
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Classes</p>
              <p className="text-2xl font-bold text-purple-600">
                {new Set(filteredStudents.map(s => s.class)).size}
              </p>
            </div>
          </Card>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} hoverable>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <Avatar src={student.photo} name={student.name} size="lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                    <Badge variant="info" size="sm" className="mt-1">
                      Class {student.class}
                    </Badge>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMail className="w-4 h-4" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiPhone className="w-4 h-4" />
                    <span>{student.phone}</span>
                  </div>
                </div>

                {/* Performance */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-600">Attendance</p>
                    <p className="text-lg font-bold text-green-600">{student.attendance}%</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600">Avg Grade</p>
                    <p className="text-lg font-bold text-blue-600">{student.avgGrade}%</p>
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {student.subjects.map((subject, index) => (
                      <Badge key={index} variant="default" size="sm">
                        <FiBook className="inline w-3 h-3 mr-1" />
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleViewDetails(student)}
                >
                  <FiEye className="mr-2 w-4 h-4" />
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500">No students found matching your search.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Student Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedStudent(null);
        }}
        title="Student Details"
        size="lg"
      >
        {selectedStudent && (
          <div className="space-y-6">
            {/* Student Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Avatar src={selectedStudent.photo} name={selectedStudent.name} size="xl" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h3>
                <p className="text-gray-600">Roll No: {selectedStudent.rollNo}</p>
                <Badge variant="info" className="mt-1">Class {selectedStudent.class}</Badge>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedStudent.phone}</p>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Performance Overview</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                  <p className="text-2xl font-bold text-green-600">{selectedStudent.attendance}%</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Average Grade</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedStudent.avgGrade}%</p>
                </div>
              </div>
            </div>

            {/* Recent Grades */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recent Grades</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">Mid-Term Exam</span>
                  <Badge variant="success">{selectedStudent.recentGrades.midterm}%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">Final Exam</span>
                  <Badge variant="success">{selectedStudent.recentGrades.final}%</Badge>
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Parent/Guardian Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Parent Name</p>
                  <p className="font-semibold text-gray-900">{selectedStudent.parentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Parent Email</p>
                  <p className="font-semibold text-gray-900">{selectedStudent.parentEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Parent Phone</p>
                  <p className="font-semibold text-gray-900">{selectedStudent.parentPhone}</p>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Enrolled Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.subjects.map((subject, index) => (
                  <Badge key={index} variant="primary">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default TeacherStudents;
