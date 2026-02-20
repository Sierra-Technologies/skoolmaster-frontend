import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { mockTeachers } from '../../data/mockTeachers';
import { FiPlus, FiSearch, FiMail, FiPhone, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Teachers = () => {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    qualification: '',
    experience: '',
    specialization: '',
    joiningDate: '',
    address: '',
    bloodGroup: 'O+',
    salary: '',
    subjects: [],
    classes: [],
    status: 'active'
  });
  const [tempSubject, setTempSubject] = useState('');
  const [tempClass, setTempClass] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSubject = () => {
    if (tempSubject && !formData.subjects.includes(tempSubject)) {
      setFormData(prev => ({ ...prev, subjects: [...prev.subjects, tempSubject] }));
      setTempSubject('');
    }
  };

  const removeSubject = (subject) => {
    setFormData(prev => ({ ...prev, subjects: prev.subjects.filter(s => s !== subject) }));
  };

  const addClass = () => {
    if (tempClass && !formData.classes.includes(tempClass)) {
      setFormData(prev => ({ ...prev, classes: [...prev.classes, tempClass] }));
      setTempClass('');
    }
  };

  const removeClass = (className) => {
    setFormData(prev => ({ ...prev, classes: prev.classes.filter(c => c !== className) }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: 'male',
      qualification: '',
      experience: '',
      specialization: '',
      joiningDate: '',
      address: '',
      bloodGroup: 'O+',
      salary: '',
      subjects: [],
      classes: [],
      status: 'active'
    });
    setTempSubject('');
    setTempClass('');
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    const newTeacher = {
      id: teachers.length + 1,
      teacherId: `TCH2024${String(teachers.length + 1).padStart(3, '0')}`,
      ...formData,
      experience: parseInt(formData.experience) || 0,
      salary: parseFloat(formData.salary) || 0,
      photo: 'https://i.pravatar.cc/150?img=' + (teachers.length + 20)
    };
    setTeachers([...teachers, newTeacher]);
    setShowAddModal(false);
    resetForm();
    toast.success('Teacher added successfully!');
  };

  const handleEditTeacher = (e) => {
    e.preventDefault();
    setTeachers(teachers.map(teacher =>
      teacher.id === selectedTeacher.id
        ? {
            ...teacher,
            ...formData,
            experience: parseInt(formData.experience) || 0,
            salary: parseFloat(formData.salary) || 0
          }
        : teacher
    ));
    setShowEditModal(false);
    setSelectedTeacher(null);
    resetForm();
    toast.success('Teacher updated successfully!');
  };

  const handleDeleteTeacher = (teacherId) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
      toast.success('Teacher deleted successfully!');
    }
  };

  const handleViewTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setShowViewModal(true);
  };

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      dateOfBirth: teacher.dateOfBirth,
      gender: teacher.gender,
      qualification: teacher.qualification,
      experience: teacher.experience,
      specialization: teacher.specialization,
      joiningDate: teacher.joiningDate,
      address: teacher.address,
      bloodGroup: teacher.bloodGroup,
      salary: teacher.salary,
      subjects: [...teacher.subjects],
      classes: [...teacher.classes],
      status: teacher.status
    });
    setShowEditModal(true);
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teachers Management</h1>
            <p className="text-gray-600 mt-1">Manage all teaching staff</p>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <FiPlus className="mr-2" />
            Add Teacher
          </Button>
        </div>

        {/* Search */}
        <Card>
          <Input
            placeholder="Search teachers by name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<FiSearch className="w-5 h-5 text-gray-400" />}
          />
        </Card>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <Card key={teacher.id} hoverable>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <Avatar src={teacher.photo} name={teacher.name} size="xl" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                    <p className="text-sm text-gray-600">{teacher.teacherId}</p>
                    <Badge variant="success" size="sm" className="mt-1">
                      {teacher.status}
                    </Badge>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMail className="w-4 h-4" />
                    <span>{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiPhone className="w-4 h-4" />
                    <span>{teacher.phone}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Qualification:</span>
                    <span className="font-medium">{teacher.qualification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{teacher.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Classes:</span>
                    <span className="font-medium">{teacher.classes.length}</span>
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects.map((subject) => (
                      <Badge key={subject} variant="primary" size="sm">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleViewTeacher(teacher)}
                  >
                    View Profile
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => openEditModal(teacher)}
                  >
                    Edit
                  </Button>
                  <button
                    onClick={() => handleDeleteTeacher(teacher.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete teacher"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* View Teacher Profile Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedTeacher(null);
        }}
        title="Teacher Profile"
        size="lg"
      >
        {selectedTeacher && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Avatar src={selectedTeacher.photo} name={selectedTeacher.name} size="xl" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedTeacher.name}</h3>
                <p className="text-gray-600">{selectedTeacher.teacherId}</p>
                <Badge variant="success" className="mt-1 capitalize">
                  {selectedTeacher.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{selectedTeacher.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">{selectedTeacher.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-semibold text-gray-900">{selectedTeacher.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="font-semibold text-gray-900 capitalize">{selectedTeacher.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Qualification</p>
                <p className="font-semibold text-gray-900">{selectedTeacher.qualification}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Experience</p>
                <p className="font-semibold text-gray-900">{selectedTeacher.experience} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Specialization</p>
                <p className="font-semibold text-gray-900">{selectedTeacher.specialization}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Joining Date</p>
                <p className="font-semibold text-gray-900">{selectedTeacher.joiningDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Blood Group</p>
                <p className="font-semibold text-gray-900">{selectedTeacher.bloodGroup}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Salary</p>
                <p className="font-semibold text-gray-900">${selectedTeacher.salary.toLocaleString()}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-semibold text-gray-900">{selectedTeacher.address}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Subjects Teaching</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTeacher.subjects.map((subject, index) => (
                  <Badge key={index} variant="primary">{subject}</Badge>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Classes Assigned</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTeacher.classes.map((className, index) => (
                  <Badge key={index} variant="info">{className}</Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Teacher Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Add New Teacher"
        size="lg"
      >
        <form onSubmit={handleAddTeacher} className="space-y-4">
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
            <Input
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Experience (years)"
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Joining Date"
              name="joiningDate"
              type="date"
              value={formData.joiningDate}
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
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleInputChange}
              required
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
            <h4 className="font-semibold text-gray-900 mb-3">Subjects</h4>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Enter subject"
                value={tempSubject}
                onChange={(e) => setTempSubject(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubject())}
              />
              <Button type="button" onClick={addSubject}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.subjects.map((subject, index) => (
                <Badge key={index} variant="primary">
                  {subject}
                  <button
                    type="button"
                    onClick={() => removeSubject(subject)}
                    className="ml-2 text-white hover:text-gray-200"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Classes</h4>
            <div className="flex gap-2 mb-2">
              <select
                value={tempClass}
                onChange={(e) => setTempClass(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a class</option>
                {['10-A', '10-B', '11-A', '11-B', '12-A', '12-B'].map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              <Button type="button" onClick={addClass}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.classes.map((className, index) => (
                <Badge key={index} variant="info">
                  {className}
                  <button
                    type="button"
                    onClick={() => removeClass(className)}
                    className="ml-2 text-white hover:text-gray-200"
                  >
                    ×
                  </button>
                </Badge>
              ))}
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
            <Button type="submit">Add Teacher</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Teacher Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTeacher(null);
          resetForm();
        }}
        title="Edit Teacher"
        size="lg"
      >
        <form onSubmit={handleEditTeacher} className="space-y-4">
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
            <Input
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Experience (years)"
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Joining Date"
              name="joiningDate"
              type="date"
              value={formData.joiningDate}
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
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
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
            <h4 className="font-semibold text-gray-900 mb-3">Subjects</h4>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Enter subject"
                value={tempSubject}
                onChange={(e) => setTempSubject(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubject())}
              />
              <Button type="button" onClick={addSubject}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.subjects.map((subject, index) => (
                <Badge key={index} variant="primary">
                  {subject}
                  <button
                    type="button"
                    onClick={() => removeSubject(subject)}
                    className="ml-2 text-white hover:text-gray-200"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Classes</h4>
            <div className="flex gap-2 mb-2">
              <select
                value={tempClass}
                onChange={(e) => setTempClass(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a class</option>
                {['10-A', '10-B', '11-A', '11-B', '12-A', '12-B'].map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              <Button type="button" onClick={addClass}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.classes.map((className, index) => (
                <Badge key={index} variant="info">
                  {className}
                  <button
                    type="button"
                    onClick={() => removeClass(className)}
                    className="ml-2 text-white hover:text-gray-200"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedTeacher(null);
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

export default Teachers;
