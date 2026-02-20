import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiFileText, FiClock, FiUsers } from 'react-icons/fi';
import toast from 'react-hot-toast';

const TeacherAssignments = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    class: '10-A-Math',
    subject: 'Mathematics',
    dueDate: '',
    maxMarks: '',
    instructions: ''
  });

  const classes = [
    { id: '10-A-Math', name: 'Class 10-A - Mathematics' },
    { id: '11-A-Math', name: 'Class 11-A - Mathematics' },
    { id: '12-A-Physics', name: 'Class 12-A - Physics' },
    { id: '11-B-Math', name: 'Class 11-B - Mathematics' }
  ];

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Algebra Worksheet',
      description: 'Complete exercises from Chapter 5',
      class: '10-A-Math',
      subject: 'Mathematics',
      dueDate: '2024-02-15',
      maxMarks: 30,
      totalStudents: 32,
      submissions: 28,
      pending: 4,
      status: 'active',
      createdDate: '2024-02-01',
      instructions: 'Solve all problems showing your work. Submit scanned copies or photos of your solutions.'
    },
    {
      id: 2,
      title: 'Geometry Problem Set',
      description: 'Prove theorems from Unit 3',
      class: '11-A-Math',
      subject: 'Mathematics',
      dueDate: '2024-02-18',
      maxMarks: 40,
      totalStudents: 28,
      submissions: 25,
      pending: 3,
      status: 'active',
      createdDate: '2024-02-03',
      instructions: 'Provide detailed proofs for each theorem. Include diagrams where necessary.'
    },
    {
      id: 3,
      title: 'Mechanics Assignment',
      description: 'Solve numerical problems on motion',
      class: '12-A-Physics',
      subject: 'Physics',
      dueDate: '2024-02-12',
      maxMarks: 25,
      totalStudents: 25,
      submissions: 25,
      pending: 0,
      status: 'graded',
      createdDate: '2024-01-28',
      instructions: 'Show all calculations and write the final answers with correct units.'
    },
    {
      id: 4,
      title: 'Calculus Integration',
      description: 'Integration techniques practice',
      class: '11-B-Math',
      subject: 'Mathematics',
      dueDate: '2024-02-10',
      maxMarks: 35,
      totalStudents: 30,
      submissions: 30,
      pending: 0,
      status: 'graded',
      createdDate: '2024-01-25',
      instructions: 'Complete all integration problems using the methods discussed in class.'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      class: '10-A-Math',
      subject: 'Mathematics',
      dueDate: '',
      maxMarks: '',
      instructions: ''
    });
  };

  const handleAddAssignment = (e) => {
    e.preventDefault();
    const classInfo = classes.find(c => c.id === formData.class);
    const newAssignment = {
      id: assignments.length + 1,
      ...formData,
      maxMarks: parseInt(formData.maxMarks),
      totalStudents: 30, // Mock value
      submissions: 0,
      pending: 30,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setAssignments([newAssignment, ...assignments]);
    setShowAddModal(false);
    resetForm();
    toast.success('Assignment created successfully!');
  };

  const handleEditAssignment = (e) => {
    e.preventDefault();
    setAssignments(assignments.map(assignment =>
      assignment.id === selectedAssignment.id
        ? {
            ...assignment,
            ...formData,
            maxMarks: parseInt(formData.maxMarks)
          }
        : assignment
    ));
    setShowEditModal(false);
    setSelectedAssignment(null);
    resetForm();
    toast.success('Assignment updated successfully!');
  };

  const handleDeleteAssignment = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(a => a.id !== id));
      toast.success('Assignment deleted successfully!');
    }
  };

  const handleViewDetails = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailsModal(true);
  };

  const openEditModal = (assignment) => {
    setSelectedAssignment(assignment);
    setFormData({
      title: assignment.title,
      description: assignment.description,
      class: assignment.class,
      subject: assignment.subject,
      dueDate: assignment.dueDate,
      maxMarks: assignment.maxMarks,
      instructions: assignment.instructions
    });
    setShowEditModal(true);
  };

  const stats = {
    total: assignments.length,
    active: assignments.filter(a => a.status === 'active').length,
    graded: assignments.filter(a => a.status === 'graded').length,
    totalSubmissions: assignments.reduce((sum, a) => sum + a.submissions, 0),
    totalPending: assignments.reduce((sum, a) => sum + a.pending, 0)
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
            <p className="text-gray-600 mt-1">Create and manage student assignments</p>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <FiPlus className="mr-2" />
            Create Assignment
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Graded</p>
              <p className="text-2xl font-bold text-green-600">{stats.graded}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Submissions</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalSubmissions}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">{stats.totalPending}</p>
            </div>
          </Card>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} hoverable>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FiFileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                        <Badge variant={assignment.status === 'active' ? 'info' : 'success'}>
                          {assignment.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{assignment.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-500">Class</p>
                          <p className="font-medium text-gray-900">{assignment.class}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Due Date</p>
                          <p className="font-medium text-gray-900 flex items-center gap-1">
                            <FiClock className="w-4 h-4" />
                            {new Date(assignment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Max Marks</p>
                          <p className="font-medium text-gray-900">{assignment.maxMarks}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Submissions</p>
                          <p className="font-medium text-gray-900 flex items-center gap-1">
                            <FiUsers className="w-4 h-4" />
                            {assignment.submissions}/{assignment.totalStudents}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {Math.round((assignment.submissions / assignment.totalStudents) * 100)}% submitted
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleViewDetails(assignment)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View details"
                  >
                    <FiEye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => openEditModal(assignment)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteAssignment(assignment.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Assignment Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Create New Assignment"
        size="lg"
      >
        <form onSubmit={handleAddAssignment} className="space-y-4">
          <Input
            label="Assignment Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Due Date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Maximum Marks"
              name="maxMarks"
              type="number"
              value={formData.maxMarks}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <Button type="submit">Create Assignment</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Assignment Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedAssignment(null);
          resetForm();
        }}
        title="Edit Assignment"
        size="lg"
      >
        <form onSubmit={handleEditAssignment} className="space-y-4">
          <Input
            label="Assignment Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Due Date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Maximum Marks"
              name="maxMarks"
              type="number"
              value={formData.maxMarks}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedAssignment(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedAssignment(null);
        }}
        title="Assignment Details"
        size="lg"
      >
        {selectedAssignment && (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedAssignment.title}</h3>
              <p className="text-gray-700">{selectedAssignment.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Class</p>
                <p className="font-semibold text-gray-900">{selectedAssignment.class}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Subject</p>
                <p className="font-semibold text-gray-900">{selectedAssignment.subject}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="font-semibold text-gray-900">{new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Maximum Marks</p>
                <p className="font-semibold text-gray-900">{selectedAssignment.maxMarks}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created On</p>
                <p className="font-semibold text-gray-900">{new Date(selectedAssignment.createdDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge variant={selectedAssignment.status === 'active' ? 'info' : 'success'}>
                  {selectedAssignment.status}
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Instructions</h4>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedAssignment.instructions}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-purple-600">{selectedAssignment.totalStudents}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">Submitted</p>
                <p className="text-2xl font-bold text-green-600">{selectedAssignment.submissions}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{selectedAssignment.pending}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default TeacherAssignments;
