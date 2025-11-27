import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Pagination from '../../components/common/Pagination';
import Modal from '../../components/common/Modal';
import { mockStudents } from '../../data/mockStudents';
import { FiPlus, FiSearch, FiDownload, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { getFeeStatusColor } from '../../utils/helpers';
import { usePagination } from '../../hooks/usePagination';
import toast from 'react-hot-toast';

const Students = () => {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    class: '10',
    section: 'A',
    rollNumber: '',
    admissionDate: '',
    address: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    bloodGroup: 'O+',
    religion: '',
    status: 'active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: 'male',
      class: '10',
      section: 'A',
      rollNumber: '',
      admissionDate: '',
      address: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      bloodGroup: 'O+',
      religion: '',
      status: 'active'
    });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      id: students.length + 1,
      studentId: `STU2024${String(students.length + 1).padStart(3, '0')}`,
      ...formData,
      rollNumber: parseInt(formData.rollNumber) || 0,
      photo: 'https://i.pravatar.cc/150?img=' + (students.length + 10),
      attendancePercentage: 0,
      currentGPA: 0,
      feeStatus: 'pending'
    };
    setStudents([...students, newStudent]);
    setShowAddModal(false);
    resetForm();
    toast.success('Student added successfully!');
  };

  const handleEditStudent = (e) => {
    e.preventDefault();
    setStudents(students.map(student =>
      student.id === selectedStudent.id
        ? {
            ...student,
            ...formData,
            rollNumber: parseInt(formData.rollNumber) || 0
          }
        : student
    ));
    setShowEditModal(false);
    setSelectedStudent(null);
    resetForm();
    toast.success('Student updated successfully!');
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== studentId));
      toast.success('Student deleted successfully!');
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      class: student.class,
      section: student.section,
      rollNumber: student.rollNumber,
      admissionDate: student.admissionDate,
      address: student.address,
      parentName: student.parentName,
      parentEmail: student.parentEmail,
      parentPhone: student.parentPhone,
      bloodGroup: student.bloodGroup,
      religion: student.religion,
      status: student.status
    });
    setShowEditModal(true);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
  } = usePagination(filteredStudents, 10);

  const columns = [
    {
      key: 'student',
      label: 'Student',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.photo} name={row.name} />
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-sm text-gray-600">{row.studentId}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'class',
      label: 'Class',
      render: (row) => (
        <Badge variant="info">
          {row.class}-{row.section}
        </Badge>
      ),
    },
    {
      key: 'attendancePercentage',
      label: 'Attendance',
      render: (row) => (
        <span className={row.attendancePercentage >= 90 ? 'text-green-600' : 'text-yellow-600'}>
          {row.attendancePercentage}%
        </span>
      ),
      sortable: true,
    },
    {
      key: 'currentGPA',
      label: 'GPA',
      sortable: true,
    },
    {
      key: 'feeStatus',
      label: 'Fee Status',
      render: (row) => (
        <Badge
          variant={
            row.feeStatus === 'paid' ? 'success' :
            row.feeStatus === 'pending' ? 'warning' :
            row.feeStatus === 'overdue' ? 'error' : 'default'
          }
        >
          {row.feeStatus}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleViewStudent(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View details"
          >
            <FiEye className="w-4 h-4" />
          </button>
          <button
            onClick={() => openEditModal(row)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Edit student"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteStudent(row.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete student"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
            <p className="text-gray-600 mt-1">Manage all student records</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <FiDownload className="mr-2" />
              Export
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <FiPlus className="mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search students by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<FiSearch className="w-5 h-5 text-gray-400" />}
              />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
        </Card>

        {/* Students Table */}
        <Card>
          <Table
            columns={columns}
            data={paginatedData}
            hoverable
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            itemsPerPage={10}
            totalItems={filteredStudents.length}
          />
        </Card>
      </div>

      {/* View Student Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedStudent(null);
        }}
        title="Student Details"
        size="lg"
      >
        {selectedStudent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Avatar src={selectedStudent.photo} name={selectedStudent.name} size="lg" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h3>
                <p className="text-gray-600">{selectedStudent.studentId}</p>
                <Badge variant={selectedStudent.status === 'active' ? 'success' : 'error'} className="mt-1 capitalize">
                  {selectedStudent.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{selectedStudent.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">{selectedStudent.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-semibold text-gray-900">{selectedStudent.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="font-semibold text-gray-900 capitalize">{selectedStudent.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Class</p>
                <p className="font-semibold text-gray-900">{selectedStudent.class}-{selectedStudent.section}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Roll Number</p>
                <p className="font-semibold text-gray-900">{selectedStudent.rollNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Admission Date</p>
                <p className="font-semibold text-gray-900">{selectedStudent.admissionDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Blood Group</p>
                <p className="font-semibold text-gray-900">{selectedStudent.bloodGroup}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Religion</p>
                <p className="font-semibold text-gray-900">{selectedStudent.religion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Attendance</p>
                <p className={`font-semibold ${selectedStudent.attendancePercentage >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {selectedStudent.attendancePercentage}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current GPA</p>
                <p className="font-semibold text-gray-900">{selectedStudent.currentGPA}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fee Status</p>
                <Badge variant={
                  selectedStudent.feeStatus === 'paid' ? 'success' :
                  selectedStudent.feeStatus === 'pending' ? 'warning' :
                  selectedStudent.feeStatus === 'overdue' ? 'error' : 'default'
                }>
                  {selectedStudent.feeStatus}
                </Badge>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-semibold text-gray-900">{selectedStudent.address}</p>
              </div>
            </div>

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
          </div>
        )}
      </Modal>

      {/* Add Student Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Add New Student"
        size="lg"
      >
        <form onSubmit={handleAddStudent} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section
              </label>
              <select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <Input
              label="Roll Number"
              name="rollNumber"
              type="number"
              value={formData.rollNumber}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Admission Date"
              name="admissionDate"
              type="date"
              value={formData.admissionDate}
              onChange={handleInputChange}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <Input
              label="Religion"
              name="religion"
              value={formData.religion}
              onChange={handleInputChange}
            />
            <div className="md:col-span-2">
              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Parent/Guardian Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Parent Name"
                name="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Parent Email"
                name="parentEmail"
                type="email"
                value={formData.parentEmail}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Parent Phone"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add Student</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Student Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedStudent(null);
          resetForm();
        }}
        title="Edit Student"
        size="lg"
      >
        <form onSubmit={handleEditStudent} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section
              </label>
              <select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <Input
              label="Roll Number"
              name="rollNumber"
              type="number"
              value={formData.rollNumber}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Admission Date"
              name="admissionDate"
              type="date"
              value={formData.admissionDate}
              onChange={handleInputChange}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <Input
              label="Religion"
              name="religion"
              value={formData.religion}
              onChange={handleInputChange}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Parent/Guardian Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Parent Name"
                name="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Parent Email"
                name="parentEmail"
                type="email"
                value={formData.parentEmail}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Parent Phone"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedStudent(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Students;
