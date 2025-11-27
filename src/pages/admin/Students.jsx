import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Pagination from '../../components/common/Pagination';
import { mockStudents } from '../../data/mockStudents';
import { FiPlus, FiSearch, FiDownload } from 'react-icons/fi';
import { getFeeStatusColor } from '../../utils/helpers';
import { usePagination } from '../../hooks/usePagination';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = mockStudents.filter((student) =>
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
        <Button size="sm" variant="outline">
          View Details
        </Button>
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
            <Button>
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
    </DashboardLayout>
  );
};

export default Students;
