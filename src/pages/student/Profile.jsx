import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Modal from '../../components/common/Modal';
import { toast } from 'react-hot-toast';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiBook,
  FiEdit,
  FiSave,
  FiX,
  FiCamera,
  FiAward,
  FiUsers
} from 'react-icons/fi';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@school.com',
    phone: '+232 76 685170',
    dateOfBirth: '2005-06-15',
    gender: 'Male',
    bloodGroup: 'O+',
    photo: 'https://i.pravatar.cc/150?img=12',

    // Academic Information
    rollNo: 'STU-2024-001',
    className: '10-A',
    section: 'A',
    admissionDate: '2020-04-01',
    academicYear: '2024-2025',

    // Address Information
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',

    // Parent/Guardian Information
    parentName: 'Robert Doe',
    parentEmail: 'robert.doe@email.com',
    parentPhone: '+1 (555) 123-4568',
    parentRelation: 'Father',

    // Emergency Contact
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '+1 (555) 123-4569',
    emergencyContactRelation: 'Mother'
  });

  const [editData, setEditData] = useState(profileData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEditClick = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    setProfileData(editData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleInputChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long!');
      return;
    }

    // Here you would typically call an API to change the password
    toast.success('Password changed successfully!');
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const academicStats = {
    overallGPA: '3.85',
    overallPercentage: '88.5',
    attendance: '94.5',
    rank: '5',
    totalStudents: '30'
  };

  const achievements = [
    { title: 'Academic Excellence Award', year: '2023', icon: <FiAward /> },
    { title: 'Mathematics Olympiad - Gold Medal', year: '2023', icon: <FiAward /> },
    { title: 'Science Fair - First Prize', year: '2024', icon: <FiAward /> },
    { title: 'Perfect Attendance Award', year: '2023', icon: <FiAward /> }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">View and manage your profile information</p>
          </div>
          {!isEditing && (
            <Button variant="primary" onClick={handleEditClick}>
              <FiEdit className="mr-2 w-4 h-4" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Header Card */}
        <Card>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar
                src={profileData.photo}
                name={`${profileData.firstName} ${profileData.lastName}`}
                size="2xl"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <FiCamera className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-600 mt-1">Roll No: {profileData.rollNo}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                <Badge variant="info">Class {profileData.className}</Badge>
                <Badge variant="success">Academic Year {profileData.academicYear}</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </Button>
            </div>
          </div>
        </Card>

        {/* Academic Performance */}
        <Card title="Academic Performance">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Overall GPA</p>
              <p className="text-2xl font-bold text-blue-600">{academicStats.overallGPA}</p>
              <p className="text-xs text-gray-500 mt-1">out of 4.0</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Overall %</p>
              <p className="text-2xl font-bold text-purple-600">{academicStats.overallPercentage}%</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-green-600">{academicStats.attendance}%</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Class Rank</p>
              <p className="text-2xl font-bold text-orange-600">#{academicStats.rank}</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-pink-600">{academicStats.totalStudents}</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card title="Personal Information">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={editData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={editData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiMail className="inline w-4 h-4 mr-1" />
                  Email Address
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiPhone className="inline w-4 h-4 mr-1" />
                  Phone Number
                </label>
                {isEditing ? (
                  <Input
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.phone}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiCalendar className="inline w-4 h-4 mr-1" />
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={editData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.dateOfBirth}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  {isEditing ? (
                    <select
                      value={editData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.gender}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group
                  </label>
                  {isEditing ? (
                    <select
                      value={editData.bloodGroup}
                      onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.bloodGroup}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Academic Information */}
          <Card title="Academic Information">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roll Number
                  </label>
                  <p className="text-gray-900 font-medium">{profileData.rollNo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class
                  </label>
                  <p className="text-gray-900 font-medium">{profileData.className}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section
                  </label>
                  <p className="text-gray-900 font-medium">{profileData.section}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year
                  </label>
                  <p className="text-gray-900 font-medium">{profileData.academicYear}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiCalendar className="inline w-4 h-4 mr-1" />
                  Admission Date
                </label>
                <p className="text-gray-900 font-medium">{profileData.admissionDate}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Address Information */}
        <Card title="Address Information">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiMapPin className="inline w-4 h-4 mr-1" />
                Street Address
              </label>
              {isEditing ? (
                <Input
                  value={editData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              ) : (
                <p className="text-gray-900 font-medium">{profileData.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                {isEditing ? (
                  <Input
                    value={editData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                {isEditing ? (
                  <Input
                    value={editData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.state}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                {isEditing ? (
                  <Input
                    value={editData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.zipCode}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                {isEditing ? (
                  <Input
                    value={editData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.country}</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Parent/Guardian Information */}
          <Card title="Parent/Guardian Information">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiUser className="inline w-4 h-4 mr-1" />
                  Parent/Guardian Name
                </label>
                <p className="text-gray-900 font-medium">{profileData.parentName}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship
                </label>
                <p className="text-gray-900 font-medium">{profileData.parentRelation}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiMail className="inline w-4 h-4 mr-1" />
                  Email
                </label>
                <p className="text-gray-900 font-medium">{profileData.parentEmail}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiPhone className="inline w-4 h-4 mr-1" />
                  Phone
                </label>
                <p className="text-gray-900 font-medium">{profileData.parentPhone}</p>
              </div>
            </div>
          </Card>

          {/* Emergency Contact */}
          <Card title="Emergency Contact">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiUser className="inline w-4 h-4 mr-1" />
                  Contact Name
                </label>
                {isEditing ? (
                  <Input
                    value={editData.emergencyContactName}
                    onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.emergencyContactName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship
                </label>
                {isEditing ? (
                  <Input
                    value={editData.emergencyContactRelation}
                    onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.emergencyContactRelation}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiPhone className="inline w-4 h-4 mr-1" />
                  Phone Number
                </label>
                {isEditing ? (
                  <Input
                    value={editData.emergencyContactPhone}
                    onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.emergencyContactPhone}</p>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card title="Achievements & Awards">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                  {achievement.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">Year: {achievement.year}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCancelEdit}>
              <FiX className="mr-2 w-4 h-4" />
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              <FiSave className="mr-2 w-4 h-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        }}
        title="Change Password"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <Input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <Input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              placeholder="Enter new password"
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters long
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <Input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowPasswordModal(false);
                setPasswordData({
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: ''
                });
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handlePasswordChange}>
              Change Password
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default StudentProfile;
