import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import { FiPlus, FiEdit2, FiTrash2, FiBook, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Subjects = () => {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: 'Mathematics',
      code: 'MATH101',
      description: 'Algebra, Geometry, Calculus',
      teachers: [
        { id: 1, name: 'John Smith', classes: ['10-A', '11-A'] },
        { id: 2, name: 'Emily Davis', classes: ['10-B', '12-A'] }
      ],
      type: 'core',
      periodsPerWeek: 6
    },
    {
      id: 2,
      name: 'Science',
      code: 'SCI101',
      description: 'Physics, Chemistry, Biology',
      teachers: [
        { id: 3, name: 'Michael Brown', classes: ['10-A', '10-B'] },
        { id: 4, name: 'Sarah Johnson', classes: ['11-A'] }
      ],
      type: 'core',
      periodsPerWeek: 5
    },
    {
      id: 3,
      name: 'English',
      code: 'ENG101',
      description: 'Literature, Grammar, Writing',
      teachers: [
        { id: 5, name: 'Lisa Anderson', classes: ['10-A', '11-A', '12-A'] }
      ],
      type: 'core',
      periodsPerWeek: 5
    },
    {
      id: 4,
      name: 'Physical Education',
      code: 'PE101',
      description: 'Sports and Fitness',
      teachers: [
        { id: 6, name: 'David Wilson', classes: ['10-A', '10-B', '11-A'] }
      ],
      type: 'elective',
      periodsPerWeek: 2
    },
    {
      id: 5,
      name: 'Computer Science',
      code: 'CS101',
      description: 'Programming, Web Development',
      teachers: [
        { id: 7, name: 'James Taylor', classes: ['11-A', '12-A'] }
      ],
      type: 'elective',
      periodsPerWeek: 3
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignTeacherModal, setShowAssignTeacherModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    type: 'core',
    periodsPerWeek: 5
  });

  const [teacherAssignment, setTeacherAssignment] = useState({
    teacherName: '',
    classes: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      type: 'core',
      periodsPerWeek: 5
    });
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    const newSubject = {
      id: subjects.length + 1,
      ...formData,
      teachers: [],
      periodsPerWeek: parseInt(formData.periodsPerWeek)
    };
    setSubjects([...subjects, newSubject]);
    setShowAddModal(false);
    resetForm();
    toast.success('Subject added successfully!');
  };

  const handleEditSubject = (e) => {
    e.preventDefault();
    setSubjects(subjects.map(subject =>
      subject.id === selectedSubject.id
        ? { ...subject, ...formData, periodsPerWeek: parseInt(formData.periodsPerWeek) }
        : subject
    ));
    setShowEditModal(false);
    setSelectedSubject(null);
    resetForm();
    toast.success('Subject updated successfully!');
  };

  const handleDeleteSubject = (subjectId) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(subject => subject.id !== subjectId));
      toast.success('Subject deleted successfully!');
    }
  };

  const openEditModal = (subject) => {
    setSelectedSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      description: subject.description,
      type: subject.type,
      periodsPerWeek: subject.periodsPerWeek.toString()
    });
    setShowEditModal(true);
  };

  const openAssignTeacherModal = (subject) => {
    setSelectedSubject(subject);
    setTeacherAssignment({
      teacherName: '',
      classes: []
    });
    setShowAssignTeacherModal(true);
  };

  const handleAssignTeacher = (e) => {
    e.preventDefault();
    if (!teacherAssignment.teacherName || teacherAssignment.classes.length === 0) {
      toast.error('Please fill in all fields');
      return;
    }

    const newTeacher = {
      id: Date.now(),
      name: teacherAssignment.teacherName,
      classes: teacherAssignment.classes
    };

    setSubjects(subjects.map(subject =>
      subject.id === selectedSubject.id
        ? { ...subject, teachers: [...subject.teachers, newTeacher] }
        : subject
    ));

    setShowAssignTeacherModal(false);
    setSelectedSubject(null);
    toast.success('Teacher assigned successfully!');
  };

  const handleRemoveTeacher = (subjectId, teacherId) => {
    if (window.confirm('Remove this teacher from the subject?')) {
      setSubjects(subjects.map(subject =>
        subject.id === subjectId
          ? { ...subject, teachers: subject.teachers.filter(t => t.id !== teacherId) }
          : subject
      ));
      toast.success('Teacher removed successfully!');
    }
  };

  const handleClassSelection = (className) => {
    setTeacherAssignment(prev => ({
      ...prev,
      classes: prev.classes.includes(className)
        ? prev.classes.filter(c => c !== className)
        : [...prev.classes, className]
    }));
  };

  const availableClasses = ['10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];

  const columns = [
    {
      key: 'name',
      label: 'Subject Name',
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-semibold text-gray-900">{row.name}</div>
          <div className="text-sm text-gray-500">{row.code}</div>
        </div>
      )
    },
    {
      key: 'description',
      label: 'Description',
      sortable: false
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (row) => (
        <Badge variant={row.type === 'core' ? 'info' : 'success'} className="capitalize">
          {row.type}
        </Badge>
      )
    },
    {
      key: 'periodsPerWeek',
      label: 'Periods/Week',
      sortable: true
    },
    {
      key: 'teachers',
      label: 'Teachers',
      render: (row) => (
        <div className="text-sm">
          {row.teachers.length > 0 ? (
            <span className="text-blue-600 font-medium">{row.teachers.length} assigned</span>
          ) : (
            <span className="text-gray-400">No teachers</span>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openAssignTeacherModal(row)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Assign teacher"
          >
            <FiUser className="w-4 h-4" />
          </button>
          <button
            onClick={() => openEditModal(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit subject"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteSubject(row.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete subject"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const stats = {
    totalSubjects: subjects.length,
    coreSubjects: subjects.filter(s => s.type === 'core').length,
    electiveSubjects: subjects.filter(s => s.type === 'elective').length,
    totalTeachers: subjects.reduce((sum, s) => sum + s.teachers.length, 0)
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subjects Management</h1>
            <p className="text-gray-600 mt-1">Manage subjects and assign teachers</p>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <FiPlus className="mr-2" />
            Add Subject
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Subjects</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalSubjects}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <FiBook className="w-8 h-8 text-gray-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Core Subjects</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.coreSubjects}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiBook className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Elective Subjects</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.electiveSubjects}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiBook className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Assignments</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalTeachers}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FiUser className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Subjects Table */}
        <Card title="All Subjects" subtitle="View and manage all subjects">
          <Table
            columns={columns}
            data={subjects}
            hoverable
            striped
          />
        </Card>

        {/* Teacher Assignments */}
        <Card title="Teacher-Subject Assignments">
          <div className="space-y-4">
            {subjects.map(subject => (
              <div key={subject.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                    <p className="text-sm text-gray-600">{subject.code}</p>
                  </div>
                  <Badge variant={subject.type === 'core' ? 'info' : 'success'} className="capitalize">
                    {subject.type}
                  </Badge>
                </div>
                {subject.teachers.length > 0 ? (
                  <div className="space-y-2">
                    {subject.teachers.map(teacher => (
                      <div key={teacher.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{teacher.name}</p>
                          <p className="text-sm text-gray-600">
                            Classes: {teacher.classes.join(', ')}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveTeacher(subject.id, teacher.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No teachers assigned yet</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Add Subject Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Add New Subject"
      >
        <form onSubmit={handleAddSubject} className="space-y-4">
          <Input
            label="Subject Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Mathematics"
            required
          />
          <Input
            label="Subject Code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            placeholder="e.g., MATH101"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Subject description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="core">Core</option>
              <option value="elective">Elective</option>
            </select>
          </div>
          <Input
            label="Periods Per Week"
            name="periodsPerWeek"
            type="number"
            value={formData.periodsPerWeek}
            onChange={handleInputChange}
            min="1"
            max="10"
            required
          />

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
            <Button type="submit">Add Subject</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Subject Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedSubject(null);
          resetForm();
        }}
        title="Edit Subject"
      >
        <form onSubmit={handleEditSubject} className="space-y-4">
          <Input
            label="Subject Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Mathematics"
            required
          />
          <Input
            label="Subject Code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            placeholder="e.g., MATH101"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Subject description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="core">Core</option>
              <option value="elective">Elective</option>
            </select>
          </div>
          <Input
            label="Periods Per Week"
            name="periodsPerWeek"
            type="number"
            value={formData.periodsPerWeek}
            onChange={handleInputChange}
            min="1"
            max="10"
            required
          />

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedSubject(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Modal>

      {/* Assign Teacher Modal */}
      <Modal
        isOpen={showAssignTeacherModal}
        onClose={() => {
          setShowAssignTeacherModal(false);
          setSelectedSubject(null);
        }}
        title={`Assign Teacher to ${selectedSubject?.name}`}
      >
        <form onSubmit={handleAssignTeacher} className="space-y-4">
          <Input
            label="Teacher Name"
            value={teacherAssignment.teacherName}
            onChange={(e) => setTeacherAssignment({ ...teacherAssignment, teacherName: e.target.value })}
            placeholder="Enter teacher name"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign to Classes
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableClasses.map(className => (
                <label
                  key={className}
                  className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    teacherAssignment.classes.includes(className)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={teacherAssignment.classes.includes(className)}
                    onChange={() => handleClassSelection(className)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="font-medium">Class {className}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowAssignTeacherModal(false);
                setSelectedSubject(null);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Assign Teacher</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Subjects;
