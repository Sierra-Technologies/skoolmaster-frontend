import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import { FiPlus, FiEdit2, FiCheckCircle, FiXCircle, FiClock, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Admissions = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      applicationNo: 'ADM2025001',
      studentName: 'Alex Johnson',
      dateOfBirth: '2010-05-15',
      gender: 'Male',
      parentName: 'Robert Johnson',
      parentPhone: '+1 234 567 8901',
      parentEmail: 'robert.j@email.com',
      classApplied: '10-A',
      previousSchool: 'Green Valley School',
      applicationDate: '2025-01-15',
      status: 'pending',
      documents: ['Birth Certificate', 'Transfer Certificate', 'Photo']
    },
    {
      id: 2,
      applicationNo: 'ADM2025002',
      studentName: 'Emma Williams',
      dateOfBirth: '2011-08-22',
      gender: 'Female',
      parentName: 'Sarah Williams',
      parentPhone: '+1 234 567 8902',
      parentEmail: 'sarah.w@email.com',
      classApplied: '11-A',
      previousSchool: 'Sunrise Academy',
      applicationDate: '2025-01-18',
      status: 'approved',
      documents: ['Birth Certificate', 'Transfer Certificate']
    },
    {
      id: 3,
      applicationNo: 'ADM2025003',
      studentName: 'Oliver Brown',
      dateOfBirth: '2009-12-10',
      gender: 'Male',
      parentName: 'Michael Brown',
      parentPhone: '+1 234 567 8903',
      parentEmail: 'michael.b@email.com',
      classApplied: '12-A',
      previousSchool: 'Oak Hill School',
      applicationDate: '2025-01-20',
      status: 'rejected',
      documents: ['Birth Certificate']
    },
    {
      id: 4,
      applicationNo: 'ADM2025004',
      studentName: 'Sophia Davis',
      dateOfBirth: '2010-03-28',
      gender: 'Female',
      parentName: 'Emily Davis',
      parentPhone: '+1 234 567 8904',
      parentEmail: 'emily.d@email.com',
      classApplied: '10-B',
      previousSchool: 'Maple Leaf School',
      applicationDate: '2025-01-22',
      status: 'pending',
      documents: ['Birth Certificate', 'Transfer Certificate', 'Photo', 'Medical Records']
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    gender: 'Male',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    classApplied: '10-A',
    previousSchool: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      dateOfBirth: '',
      gender: 'Male',
      parentName: '',
      parentPhone: '',
      parentEmail: '',
      classApplied: '10-A',
      previousSchool: '',
      address: ''
    });
  };

  const handleAddApplication = (e) => {
    e.preventDefault();
    const newApplication = {
      id: applications.length + 1,
      applicationNo: `ADM2025${String(applications.length + 1).padStart(3, '0')}`,
      ...formData,
      applicationDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      documents: []
    };
    setApplications([...applications, newApplication]);
    setShowAddModal(false);
    resetForm();
    toast.success('Application submitted successfully!');
  };

  const handleStatusChange = (applicationId, newStatus) => {
    setApplications(applications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
    toast.success(`Application ${newStatus}!`);
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowViewModal(true);
  };

  const columns = [
    {
      key: 'applicationNo',
      label: 'Application No',
      sortable: true
    },
    {
      key: 'studentName',
      label: 'Student Name',
      sortable: true
    },
    {
      key: 'classApplied',
      label: 'Class',
      sortable: true
    },
    {
      key: 'parentName',
      label: 'Parent Name',
      sortable: true
    },
    {
      key: 'applicationDate',
      label: 'Applied On',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge
          variant={
            row.status === 'approved' ? 'success' :
            row.status === 'rejected' ? 'error' :
            'warning'
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
            onClick={() => handleViewApplication(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View details"
          >
            <FiEye className="w-4 h-4" />
          </button>
          {row.status === 'pending' && (
            <>
              <button
                onClick={() => handleStatusChange(row.id, 'approved')}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Approve"
              >
                <FiCheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStatusChange(row.id, 'rejected')}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Reject"
              >
                <FiXCircle className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admissions Management</h1>
            <p className="text-gray-600 mt-1">Manage student admission applications</p>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <FiPlus className="mr-2" />
            New Application
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <FiEdit2 className="w-8 h-8 text-gray-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pending}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FiClock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiCheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiXCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Applications Table */}
        <Card title="All Applications" subtitle="View and manage admission applications">
          <Table
            columns={columns}
            data={applications}
            hoverable
            striped
          />
        </Card>
      </div>

      {/* Add Application Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="New Admission Application"
        size="lg"
      >
        <form onSubmit={handleAddApplication} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Student Name"
              name="studentName"
              value={formData.studentName}
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
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Applied
              </label>
              <select
                name="classApplied"
                value={formData.classApplied}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {['10-A', '10-B', '11-A', '11-B', '12-A', '12-B'].map(cls => (
                  <option key={cls} value={cls}>Class {cls}</option>
                ))}
              </select>
            </div>
            <Input
              label="Parent/Guardian Name"
              name="parentName"
              value={formData.parentName}
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
            <Input
              label="Parent Email"
              name="parentEmail"
              type="email"
              value={formData.parentEmail}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Previous School"
              name="previousSchool"
              value={formData.previousSchool}
              onChange={handleInputChange}
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
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </Modal>

      {/* View Application Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedApplication(null);
        }}
        title="Application Details"
        size="lg"
      >
        {selectedApplication && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Application No</p>
                  <p className="text-lg font-bold text-gray-900">{selectedApplication.applicationNo}</p>
                </div>
                <Badge
                  variant={
                    selectedApplication.status === 'approved' ? 'success' :
                    selectedApplication.status === 'rejected' ? 'error' :
                    'warning'
                  }
                  className="capitalize"
                >
                  {selectedApplication.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Student Name</p>
                <p className="font-semibold text-gray-900">{selectedApplication.studentName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-semibold text-gray-900">{selectedApplication.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="font-semibold text-gray-900">{selectedApplication.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Class Applied</p>
                <p className="font-semibold text-gray-900">{selectedApplication.classApplied}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Parent Name</p>
                <p className="font-semibold text-gray-900">{selectedApplication.parentName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Parent Phone</p>
                <p className="font-semibold text-gray-900">{selectedApplication.parentPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Parent Email</p>
                <p className="font-semibold text-gray-900">{selectedApplication.parentEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Previous School</p>
                <p className="font-semibold text-gray-900">{selectedApplication.previousSchool}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Application Date</p>
                <p className="font-semibold text-gray-900">{selectedApplication.applicationDate}</p>
              </div>
            </div>

            {selectedApplication.documents && selectedApplication.documents.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Documents Submitted</p>
                <div className="flex flex-wrap gap-2">
                  {selectedApplication.documents.map((doc, index) => (
                    <Badge key={index} variant="info">{doc}</Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedApplication.status === 'pending' && (
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="success"
                  onClick={() => {
                    handleStatusChange(selectedApplication.id, 'approved');
                    setShowViewModal(false);
                  }}
                  className="flex-1"
                >
                  <FiCheckCircle className="mr-2" />
                  Approve
                </Button>
                <Button
                  variant="error"
                  onClick={() => {
                    handleStatusChange(selectedApplication.id, 'rejected');
                    setShowViewModal(false);
                  }}
                  className="flex-1"
                >
                  <FiXCircle className="mr-2" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default Admissions;
