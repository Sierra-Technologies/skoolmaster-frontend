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
      name: 'Class 10-A',
      grade: '10',
      section: 'A',
      teacher: 'John Smith',
      teacherId: 1,
      subject: 'Mathematics',
      students: 35,
      room: 'Room 201',
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      status: 'active'
    },
    {
      id: 2,
      name: 'Class 10-B',
      grade: '10',
      section: 'B',
      teacher: 'Sarah Johnson',
      teacherId: 2,
      subject: 'Science',
      students: 32,
      room: 'Room 202',
      schedule: 'Tue, Thu - 10:00 AM',
      status: 'active'
    },
    {
      id: 3,
      name: 'Class 11-A',
      grade: '11',
      section: 'A',
      teacher: 'Michael Brown',
      teacherId: 3,
      subject: 'English',
      students: 30,
      room: 'Room 301',
      schedule: 'Mon, Wed, Fri - 11:00 AM',
      status: 'active'
    },
    {
      id: 4,
      name: 'Class 12-A',
      grade: '12',
      section: 'A',
      teacher: 'Emily Davis',
      teacherId: 4,
      subject: 'Physics',
      students: 28,
      room: 'Room 401',
      schedule: 'Tue, Thu, Fri - 2:00 PM',
      status: 'active'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    section: '',
    teacher: '',
    subject: '',
    students: 0,
    room: '',
    schedule: '',
    status: 'active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      grade: '',
      section: '',
      teacher: '',
      subject: '',
      students: 0,
      room: '',
      schedule: '',
      status: 'active'
    });
  };

  const handleAddClass = (e) => {
    e.preventDefault();
    const newClass = {
      id: classes.length + 1,
      ...formData,
      teacherId: classes.length + 1,
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
        ? { ...cls, ...formData, students: parseInt(formData.students) || 0 }
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
      name: classItem.name,
      grade: classItem.grade,
      section: classItem.section,
      teacher: classItem.teacher,
      subject: classItem.subject,
      students: classItem.students,
      room: classItem.room,
      schedule: classItem.schedule,
      status: classItem.status
    });
    setShowEditModal(true);
  };

  const columns = [
    {
      key: 'name',
      label: 'Class Name',
      sortable: true
    },
    {
      key: 'teacher',
      label: 'Class Teacher',
      sortable: true
    },
    {
      key: 'subject',
      label: 'Subject',
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
      key: 'schedule',
      label: 'Schedule'
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Classes Management</h1>
            <p className="text-gray-600 mt-1">Manage all classes and their schedules</p>
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

        {/* Classes Table */}
        <Card title="All Classes" subtitle="View and manage all classes">
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
            <Input
              label="Class Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Class 10-A"
              required
            />
            <Input
              label="Grade"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              placeholder="e.g., 10"
              required
            />
            <Input
              label="Section"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              placeholder="e.g., A"
              required
            />
            <Input
              label="Class Teacher"
              name="teacher"
              value={formData.teacher}
              onChange={handleInputChange}
              placeholder="Teacher name"
              required
            />
            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="e.g., Mathematics"
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
            <Input
              label="Schedule"
              name="schedule"
              value={formData.schedule}
              onChange={handleInputChange}
              placeholder="e.g., Mon, Wed - 9:00 AM"
              required
            />
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
            <Input
              label="Class Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Class 10-A"
              required
            />
            <Input
              label="Grade"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              placeholder="e.g., 10"
              required
            />
            <Input
              label="Section"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              placeholder="e.g., A"
              required
            />
            <Input
              label="Class Teacher"
              name="teacher"
              value={formData.teacher}
              onChange={handleInputChange}
              placeholder="Teacher name"
              required
            />
            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="e.g., Mathematics"
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
            <Input
              label="Schedule"
              name="schedule"
              value={formData.schedule}
              onChange={handleInputChange}
              placeholder="e.g., Mon, Wed - 9:00 AM"
              required
            />
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
