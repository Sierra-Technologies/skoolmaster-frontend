import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { mockSchools } from '../../data/mockOtherData';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiEye, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const Schools = () => {
  const [schools, setSchools] = useState(mockSchools);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    email: '',
    phone: '',
    address: '',
    principal: '',
    establishedYear: '',
    website: '',
    subscriptionPlan: 'basic',
    subscriptionExpiry: '',
    totalStudents: 0,
    totalTeachers: 0,
  });

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      email: '',
      phone: '',
      address: '',
      principal: '',
      establishedYear: '',
      website: '',
      subscriptionPlan: 'basic',
      subscriptionExpiry: '',
      totalStudents: 0,
      totalTeachers: 0,
    });
  };

  const handleAddSchool = (e) => {
    e.preventDefault();
    const newSchool = {
      id: schools.length + 1,
      ...formData,
      logo: 'https://via.placeholder.com/150',
      status: 'active',
      subscriptionStatus: 'active',
      theme: 'default',
      totalStudents: parseInt(formData.totalStudents) || 0,
      totalTeachers: parseInt(formData.totalTeachers) || 0,
      establishedYear: parseInt(formData.establishedYear) || new Date().getFullYear(),
    };

    setSchools([...schools, newSchool]);
    setIsAddModalOpen(false);
    resetForm();
    toast.success('School added successfully!');
  };

  const handleEditSchool = (e) => {
    e.preventDefault();
    setSchools(schools.map(school =>
      school.id === selectedSchool.id
        ? { ...school, ...formData }
        : school
    ));
    setIsEditModalOpen(false);
    setSelectedSchool(null);
    resetForm();
    toast.success('School updated successfully!');
  };

  const handleDeleteSchool = (schoolId) => {
    if (window.confirm('Are you sure you want to delete this school?')) {
      setSchools(schools.filter(school => school.id !== schoolId));
      toast.success('School deleted successfully!');
    }
  };

  const openEditModal = (school) => {
    setSelectedSchool(school);
    setFormData({
      name: school.name,
      code: school.code,
      email: school.email,
      phone: school.phone,
      address: school.address,
      principal: school.principal,
      establishedYear: school.establishedYear,
      website: school.website,
      subscriptionPlan: school.subscriptionPlan,
      subscriptionExpiry: school.subscriptionExpiry,
      totalStudents: school.totalStudents,
      totalTeachers: school.totalTeachers,
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (school) => {
    setSelectedSchool(school);
    setIsViewModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Schools Management</h1>
            <p className="text-gray-600 mt-1">Manage all registered schools</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <FiPlus className="mr-2" />
            Add School
          </Button>
        </div>

        {/* Search */}
        <Card>
          <Input
            placeholder="Search schools by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<FiSearch className="w-5 h-5 text-gray-400" />}
          />
        </Card>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <Card key={school.id} hoverable>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={school.logo}
                      alt={school.name}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{school.name}</h3>
                      <p className="text-sm text-gray-600">{school.code}</p>
                    </div>
                  </div>
                  <Badge variant={school.status === 'active' ? 'success' : 'error'}>
                    {school.status}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Principal:</span>
                    <span className="font-medium">{school.principal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{school.totalStudents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teachers:</span>
                    <span className="font-medium">{school.totalTeachers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <Badge variant="primary" size="sm" className="capitalize">
                      {school.subscriptionPlan}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expires:</span>
                    <span className="font-medium text-sm">{school.subscriptionExpiry}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openViewModal(school)}
                    className="flex-1"
                  >
                    <FiEye className="mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditModal(school)}
                    className="flex-1"
                  >
                    <FiEdit className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="error"
                    onClick={() => handleDeleteSchool(school.id)}
                  >
                    <FiTrash2 />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add School Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            resetForm();
          }}
          title="Add New School"
          size="lg"
        >
          <form onSubmit={handleAddSchool} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="School Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                label="School Code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
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
                label="Principal Name"
                name="principal"
                value={formData.principal}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Established Year"
                type="number"
                name="establishedYear"
                value={formData.establishedYear}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Total Students"
                type="number"
                name="totalStudents"
                value={formData.totalStudents}
                onChange={handleInputChange}
              />
              <Input
                label="Total Teachers"
                type="number"
                name="totalTeachers"
                value={formData.totalTeachers}
                onChange={handleInputChange}
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subscription Plan
                </label>
                <select
                  name="subscriptionPlan"
                  value={formData.subscriptionPlan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="free">Free</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              <Input
                label="Subscription Expiry"
                type="date"
                name="subscriptionExpiry"
                value={formData.subscriptionExpiry}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Website"
                name="website"
                value={formData.website}
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
            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddModalOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                Add School
              </Button>
            </div>
          </form>
        </Modal>

        {/* Edit School Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedSchool(null);
            resetForm();
          }}
          title="Edit School"
          size="lg"
        >
          <form onSubmit={handleEditSchool} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="School Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                label="School Code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
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
                label="Principal Name"
                name="principal"
                value={formData.principal}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Established Year"
                type="number"
                name="establishedYear"
                value={formData.establishedYear}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Total Students"
                type="number"
                name="totalStudents"
                value={formData.totalStudents}
                onChange={handleInputChange}
              />
              <Input
                label="Total Teachers"
                type="number"
                name="totalTeachers"
                value={formData.totalTeachers}
                onChange={handleInputChange}
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subscription Plan
                </label>
                <select
                  name="subscriptionPlan"
                  value={formData.subscriptionPlan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="free">Free</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              <Input
                label="Subscription Expiry"
                type="date"
                name="subscriptionExpiry"
                value={formData.subscriptionExpiry}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Website"
                name="website"
                value={formData.website}
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
            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedSchool(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>

        {/* View School Details Modal */}
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedSchool(null);
          }}
          title="School Details"
          size="lg"
        >
          {selectedSchool && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b">
                <img
                  src={selectedSchool.logo}
                  alt={selectedSchool.name}
                  className="w-20 h-20 rounded-lg"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSchool.name}</h2>
                  <p className="text-gray-600">{selectedSchool.code}</p>
                  <Badge variant={selectedSchool.status === 'active' ? 'success' : 'error'} className="mt-2">
                    {selectedSchool.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Principal</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedSchool.principal}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Established Year</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedSchool.establishedYear}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-lg font-semibold text-blue-600">{selectedSchool.totalStudents}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Teachers</p>
                  <p className="text-lg font-semibold text-green-600">{selectedSchool.totalTeachers}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{selectedSchool.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{selectedSchool.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Website:</span>
                  <a href={selectedSchool.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {selectedSchool.website}
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Address:</span>
                  <span className="font-medium text-right">{selectedSchool.address}</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Subscription Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <Badge variant="primary" className="capitalize">{selectedSchool.subscriptionPlan}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge variant={selectedSchool.subscriptionStatus === 'active' ? 'success' : 'error'} className="capitalize">
                      {selectedSchool.subscriptionStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expiry Date:</span>
                    <span className="font-medium">{selectedSchool.subscriptionExpiry}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setIsViewModalOpen(false);
                  openEditModal(selectedSchool);
                }}>
                  Edit School
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Schools;
