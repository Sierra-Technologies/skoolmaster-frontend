import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import { mockTeachers } from '../../data/mockTeachers';
import { FiPlus, FiSearch, FiMail, FiPhone } from 'react-icons/fi';

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeachers = mockTeachers.filter((teacher) =>
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
          <Button>
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
                  <Button size="sm" variant="outline" className="flex-1">
                    View Profile
                  </Button>
                  <Button size="sm" className="flex-1">
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Teachers;
