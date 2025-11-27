import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiBook } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Classes = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: '10-A',
      grade: '10',
      section: 'A',
      classTeacher: 'John Smith',
      classTeacherId: 1,
      students: 35,
      room: 'Room 201',
      status: 'active'
    },
    {
      id: 2,
      name: '10-B',
      grade: '10',
      section: 'B',
      classTeacher: 'Sarah Johnson',
      classTeacherId: 2,
      students: 32,
      room: 'Room 202',
      status: 'active'
    },
    {
      id: 3,
      name: '11-A',
      grade: '11',
      section: 'A',
      classTeacher: 'Michael Brown',
      classTeacherId: 3,
      students: 30,
      room: 'Room 301',
      status: 'active'
    },
    {
      id: 4,
      name: '11-B',
      grade: '11',
      section: 'B',
      classTeacher: 'Emily Davis',
      classTeacherId: 4,
      students: 28,
      room: 'Room 302',
      status: 'active'
    },
    {
      id: 5,
      name: '12-A',
      grade: '12',
      section: 'A',
      classTeacher: 'David Wilson',
      classTeacherId: 5,
      students: 33,
      room: 'Room 401',
      status: 'active'
    },
    {
      id: 6,
      name: '12-B',
      grade: '12',
      section: 'B',
      classTeacher: 'Lisa Anderson',
      classTeacherId: 6,
      students: 31,
      room: 'Room 402',
      status: 'active'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({
    grade: '',
    section: '',
    classTeacher: '',
    students: 0,
    room: '',
    status: 'active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      grade: '',
      section: '',
      classTeacher: '',
      students: 0,
      room: '',
      status: 'active'
    });
  };

  const handleAddClass = (e) => {
    e.preventDefault();
    const newClass = {
      id: classes.length + 1,
      name: `${formData.grade}-${formData.section}`,
      ...formData,
      classTeacherId: classes.length + 1,
      students: parseInt(formData.students) || 0
    };
    setClasses([...classes, newClass]);
    setShowAddModal(false);
    resetForm();
    toast.success('Class added successfully!');
  };

  const handleEditClass = (e) => {
    e.preventDefault();
    setClasses(classes.map(cls =>
      cls.id === selectedClass.id
        ? {
            ...cls,
            name: `${formData.grade}-${formData.section}`,
            ...formData,
            students: parseInt(formData.students) || 0
          }
        : cls
    ));
    setShowEditModal(false);
    setSelectedClass(null);
    resetForm();
    toast.success('Class updated successfully!');
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(cls => cls.id !== classId));
      toast.success('Class deleted successfully!');
    }
  };

  const openEditModal = (classItem) => {
    setSelectedClass(classItem);
    setFormData({
      grade: classItem.grade,
      section: classItem.section,
      classTeacher: classItem.classTeacher,
      students: classItem.students,
      room: classItem.room,
      status: classItem.status
    });
    setShowEditModal(true);
  };

  const columns = [
    {
      key: 'name',
      label: 'Class',
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-gray-900">Class {value}</span>
      )
    },
    {
      key: 'classTeacher',
      label: 'Class Teacher',
      sortable: true
    },
    {
      key: 'students',
      label: 'Students',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <FiUsers className="w-4 h-4 text-gray-500" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'room',
      label: 'Room',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'error'} className="capitalize">
          {value}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEditModal(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit class"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteClass(row.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete class"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  // Calculate stats
  const stats = {
    totalClasses: classes.length,
    totalStudents: classes.reduce((sum, cls) => sum + cls.students, 0),
    activeClasses: classes.filter(cls => cls.status === 'active').length,
    avgClassSize: Math.round(classes.reduce((sum, cls) => sum + cls.students, 0) / classes.length)
  };

  // Group classes by grade
  const classesByGrade = classes.reduce((acc, cls) => {
    if (!acc[cls.grade]) {
      acc[cls.grade] = [];
    }
    acc[cls.grade].push(cls);
    return acc;
  }, {});

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Classes Management</h1>
            <p className="text-gray-600 mt-1">Manage class sections and class teachers</p>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <FiPlus className="mr-2" />
            Add Class
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalClasses}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiBook className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalStudents}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiUsers className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Classes</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.activeClasses}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FiBook className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Class Size</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.avgClassSize}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FiUsers className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Classes by Grade */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(classesByGrade).sort().map(grade => (
            <Card key={grade} title={`Grade ${grade}`}>
              <div className="space-y-3">
                {classesByGrade[grade].map(cls => (
                  <div key={cls.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">Class {cls.name}</p>
                        <p className="text-sm text-gray-600">{cls.classTeacher}</p>
                      </div>
                      <Badge variant="info" size="sm">
                        {cls.students} students
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{cls.room}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Classes Table */}
        <Card title="All Classes" subtitle="View and manage all class sections">
          <Table
            columns={columns}
            data={classes}
            hoverable
            striped
          />
        </Card>
      </div>

      {/* Add Class Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Add New Class"
      >
        <form onSubmit={handleAddClass} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Grade</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
            <Input
              label="Section"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              placeholder="e.g., A, B, C"
              required
            />
            <Input
              label="Class Teacher"
              name="classTeacher"
              value={formData.classTeacher}
              onChange={handleInputChange}
              placeholder="Teacher name"
              required
            />
            <Input
              label="Number of Students"
              name="students"
              type="number"
              value={formData.students}
              onChange={handleInputChange}
              placeholder="0"
              required
            />
            <Input
              label="Room"
              name="room"
              value={formData.room}
              onChange={handleInputChange}
              placeholder="e.g., Room 201"
              required
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
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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
            <Button type="submit">Add Class</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Class Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedClass(null);
          resetForm();
        }}
        title="Edit Class"
      >
        <form onSubmit={handleEditClass} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Grade</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
            <Input
              label="Section"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              placeholder="e.g., A, B, C"
              required
            />
            <Input
              label="Class Teacher"
              name="classTeacher"
              value={formData.classTeacher}
              onChange={handleInputChange}
              placeholder="Teacher name"
              required
            />
            <Input
              label="Number of Students"
              name="students"
              type="number"
              value={formData.students}
              onChange={handleInputChange}
              placeholder="0"
              required
            />
            <Input
              label="Room"
              name="room"
              value={formData.room}
              onChange={handleInputChange}
              placeholder="e.g., Room 201"
              required
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
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedClass(null);
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

export default Classes;
