import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { FiSave, FiUser, FiBell, FiLock, FiSettings as FiSettingsIcon } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const [generalSettings, setGeneralSettings] = useState({
    schoolName: 'Springfield High School',
    schoolCode: 'SHS001',
    email: 'admin@springfield.edu',
    phone: '+1 234 567 8900',
    address: '123 Main Street, Springfield',
    website: 'www.springfield.edu',
    principalName: 'Dr. Robert Smith'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    attendanceAlerts: true,
    feeReminders: true,
    examNotifications: true,
    announcementAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    sessionTimeout: '30'
  });

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    toast.success('General settings saved successfully!');
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    toast.success('Notification settings saved successfully!');
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    toast.success('Security settings updated successfully!');
    setSecuritySettings({
      ...securitySettings,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const tabs = [
    { id: 'general', name: 'General', icon: FiSettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'security', name: 'Security', icon: FiLock },
    { id: 'profile', name: 'Profile', icon: FiUser }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your school settings and preferences</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <Card title="General Settings" subtitle="Update your school information">
            <form onSubmit={handleSaveGeneral} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="School Name"
                  value={generalSettings.schoolName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, schoolName: e.target.value })}
                  required
                />
                <Input
                  label="School Code"
                  value={generalSettings.schoolCode}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, schoolCode: e.target.value })}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={generalSettings.email}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                  required
                />
                <Input
                  label="Phone Number"
                  value={generalSettings.phone}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                  required
                />
                <Input
                  label="Website"
                  value={generalSettings.website}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, website: e.target.value })}
                />
                <Input
                  label="Principal Name"
                  value={generalSettings.principalName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, principalName: e.target.value })}
                  required
                />
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    value={generalSettings.address}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit">
                  <FiSave className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <Card title="Notification Preferences" subtitle="Manage how you receive notifications">
            <form onSubmit={handleSaveNotifications} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        smsNotifications: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Attendance Alerts</p>
                    <p className="text-sm text-gray-600">Get alerts for low attendance</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.attendanceAlerts}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        attendanceAlerts: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Fee Reminders</p>
                    <p className="text-sm text-gray-600">Receive fee payment reminders</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.feeReminders}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        feeReminders: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Exam Notifications</p>
                    <p className="text-sm text-gray-600">Get notified about upcoming exams</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.examNotifications}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        examNotifications: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button type="submit">
                  <FiSave className="mr-2" />
                  Save Preferences
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card title="Change Password" subtitle="Update your account password">
              <form onSubmit={handleSaveSecurity} className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  value={securitySettings.currentPassword}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    currentPassword: e.target.value
                  })}
                  required
                />
                <Input
                  label="New Password"
                  type="password"
                  value={securitySettings.newPassword}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    newPassword: e.target.value
                  })}
                  required
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={securitySettings.confirmPassword}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    confirmPassword: e.target.value
                  })}
                  required
                />
                <div className="flex justify-end pt-4">
                  <Button type="submit">
                    <FiSave className="mr-2" />
                    Update Password
                  </Button>
                </div>
              </form>
            </Card>

            <Card title="Additional Security" subtitle="Manage advanced security options">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <select
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({
                      ...securitySettings,
                      sessionTimeout: e.target.value
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <Card title="Profile Information" subtitle="Manage your personal information">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiUser className="w-12 h-12 text-blue-600" />
                </div>
                <div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="First Name" defaultValue="Robert" required />
                  <Input label="Last Name" defaultValue="Smith" required />
                  <Input label="Email" type="email" defaultValue="robert.smith@springfield.edu" required />
                  <Input label="Phone" defaultValue="+1 234 567 8900" required />
                  <Input label="Department" defaultValue="Administration" required />
                  <Input label="Position" defaultValue="School Administrator" required />
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit">
                    <FiSave className="mr-2" />
                    Save Profile
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Settings;
