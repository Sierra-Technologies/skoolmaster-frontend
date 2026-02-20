import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiClock, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Exams = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      name: 'Mid-Term Mathematics',
      subject: 'Mathematics',
      class: '10-A',
      date: '2025-12-15',
      startTime: '09:00',
      endTime: '11:00',
      totalMarks: 100,
      passingMarks: 40,
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'Final Science Exam',
      subject: 'Science',
      class: '10-B',
      date: '2025-12-20',
      startTime: '10:00',
      endTime: '12:00',
      totalMarks: 100,
      passingMarks: 40,
      status: 'upcoming'
    },
    {
      id: 3,
      name: 'English Literature Test',
      subject: 'English',
      class: '11-A',
      date: '2025-11-25',
      startTime: '14:00',
      endTime: '16:00',
      totalMarks: 50,
      passingMarks: 20,
      status: 'completed'
    },
    {
      id: 4,
      name: 'Physics Practical',
      subject: 'Physics',
      class: '12-A',
      date: '2025-12-10',
      startTime: '11:00',
      endTime: '13:00',
      totalMarks: 50,
      passingMarks: 20,
      status: 'upcoming'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    class: '',
    date: '',
    startTime: '',
    endTime: '',
    totalMarks: '',
    passingMarks: '',
    status: 'upcoming'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      subject: '',
      class: '',
      date: '',
      startTime: '',
      endTime: '',
      totalMarks: '',
      passingMarks: '',
      status: 'upcoming'
    });
  };

  const handleAddExam = (e) => {
    e.preventDefault();
    const newExam = {
      id: exams.length + 1,
      ...formData,
      totalMarks: parseInt(formData.totalMarks),
      passingMarks: parseInt(formData.passingMarks)
    };
    setExams([...exams, newExam]);
    setShowAddModal(false);
    resetForm();
    toast.success('Exam added successfully!');
  };

  const handleEditExam = (e) => {
    e.preventDefault();
    setExams(exams.map(exam =>
      exam.id === selectedExam.id
        ? {
            ...exam,
            ...formData,
            totalMarks: parseInt(formData.totalMarks),
            passingMarks: parseInt(formData.passingMarks)
          }
        : exam
    ));
    setShowEditModal(false);
    setSelectedExam(null);
    resetForm();
    toast.success('Exam updated successfully!');
  };

  const handleDeleteExam = (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(exam => exam.id !== examId));
      toast.success('Exam deleted successfully!');
    }
  };

  const openEditModal = (exam) => {
    setSelectedExam(exam);
    setFormData({
      name: exam.name,
      subject: exam.subject,
      class: exam.class,
      date: exam.date,
      startTime: exam.startTime,
      endTime: exam.endTime,
      totalMarks: exam.totalMarks.toString(),
      passingMarks: exam.passingMarks.toString(),
      status: exam.status
    });
    setShowEditModal(true);
  };

  const columns = [
    {
      key: 'name',
      label: 'Exam Name',
      sortable: true
    },
    {
      key: 'subject',
      label: 'Subject',
      sortable: true
    },
    {
      key: 'class',
      label: 'Class',
      sortable: true
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <FiCalendar className="w-4 h-4 text-gray-500" />
          <span>{new Date(row.date).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: 'startTime',
      label: 'Time',
      render: (row) => (
        <div className="flex items-center gap-2">
          <FiClock className="w-4 h-4 text-gray-500" />
          <span>{row.startTime} - {row.endTime}</span>
        </div>
      )
    },
    {
      key: 'totalMarks',
      label: 'Total Marks',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge
          variant={
            row.status === 'upcoming' ? 'info' :
            row.status === 'ongoing' ? 'warning' :
            'success'
          }
          className="capitalize"
        >
          {row.status}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEditModal(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit exam"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteExam(row.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete exam"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const stats = {
    totalExams: exams.length,
    upcoming: exams.filter(e => e.status === 'upcoming').length,
    ongoing: exams.filter(e => e.status === 'ongoing').length,
    completed: exams.filter(e => e.status === 'completed').length
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Exams Management</h1>
            <p className="text-gray-600 mt-1">Schedule and manage examinations</p>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <FiPlus className="mr-2" />
            Add Exam
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Exams</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalExams}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <FiFileText className="w-8 h-8 text-gray-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.upcoming}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiCalendar className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ongoing</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.ongoing}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FiClock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiFileText className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Exams Table */}
        <Card title="All Exams" subtitle="View and manage all scheduled exams">
          <Table
            columns={columns}
            data={exams}
            hoverable
            striped
          />
        </Card>
      </div>

      {/* Add Exam Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Add New Exam"
      >
        <form onSubmit={handleAddExam} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Exam Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Mid-Term Mathematics"
                required
              />
            </div>
            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="e.g., Mathematics"
              required
            />
            <Input
              label="Class"
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              placeholder="e.g., 10-A"
              required
            />
            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
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
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <Input
              label="Start Time"
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleInputChange}
              required
            />
            <Input
              label="End Time"
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Total Marks"
              name="totalMarks"
              type="number"
              value={formData.totalMarks}
              onChange={handleInputChange}
              placeholder="100"
              required
            />
            <Input
              label="Passing Marks"
              name="passingMarks"
              type="number"
              value={formData.passingMarks}
              onChange={handleInputChange}
              placeholder="40"
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
            <Button type="submit">Add Exam</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Exam Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedExam(null);
          resetForm();
        }}
        title="Edit Exam"
      >
        <form onSubmit={handleEditExam} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Exam Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Mid-Term Mathematics"
                required
              />
            </div>
            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="e.g., Mathematics"
              required
            />
            <Input
              label="Class"
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              placeholder="e.g., 10-A"
              required
            />
            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
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
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <Input
              label="Start Time"
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleInputChange}
              required
            />
            <Input
              label="End Time"
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Total Marks"
              name="totalMarks"
              type="number"
              value={formData.totalMarks}
              onChange={handleInputChange}
              placeholder="100"
              required
            />
            <Input
              label="Passing Marks"
              name="passingMarks"
              type="number"
              value={formData.passingMarks}
              onChange={handleInputChange}
              placeholder="40"
              required
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedExam(null);
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

export default Exams;
