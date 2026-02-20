import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { FiDownload, FiFileText, FiBarChart2, FiPieChart, FiTrendingUp } from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState('attendance');

  // Sample data for charts
  const attendanceData = [
    { month: 'Jan', percentage: 92 },
    { month: 'Feb', percentage: 88 },
    { month: 'Mar', percentage: 95 },
    { month: 'Apr', percentage: 91 },
    { month: 'May', percentage: 94 },
    { month: 'Jun', percentage: 89 }
  ];

  const feeCollectionData = [
    { month: 'Jan', collected: 45000, pending: 5000 },
    { month: 'Feb', collected: 48000, pending: 2000 },
    { month: 'Mar', collected: 50000, pending: 0 },
    { month: 'Apr', collected: 47000, pending: 3000 },
    { month: 'May', collected: 49000, pending: 1000 },
    { month: 'Jun', collected: 50000, pending: 0 }
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 45 },
    { grade: 'A', count: 78 },
    { grade: 'B+', count: 92 },
    { grade: 'B', count: 65 },
    { grade: 'C', count: 32 },
    { grade: 'F', count: 8 }
  ];

  const classPerformance = [
    { class: '10-A', average: 85 },
    { class: '10-B', average: 82 },
    { class: '11-A', average: 88 },
    { class: '11-B', average: 84 },
    { class: '12-A', average: 90 },
    { class: '12-B', average: 86 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const handleDownloadReport = (reportType) => {
    toast.success(`${reportType} report downloaded successfully!`);
  };

  const reportTypes = [
    { id: 'attendance', name: 'Attendance Report', icon: FiBarChart2, color: 'blue' },
    { id: 'fees', name: 'Fee Collection Report', icon: FiPieChart, color: 'green' },
    { id: 'grades', name: 'Academic Performance', icon: FiTrendingUp, color: 'purple' },
    { id: 'students', name: 'Student Report', icon: FiFileText, color: 'orange' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Generate and view comprehensive school reports</p>
          </div>
          <Button onClick={() => handleDownloadReport('All Reports')}>
            <FiDownload className="mr-2" />
            Export All
          </Button>
        </div>

        {/* Report Type Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTypes.map(type => (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all ${
                selectedReportType === type.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedReportType(type.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-${type.color}-100 rounded-full`}>
                  <type.icon className={`w-6 h-6 text-${type.color}-600`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{type.name}</p>
                  <p className="text-xs text-gray-600">Click to view</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Attendance Report */}
        {selectedReportType === 'attendance' && (
          <>
            <Card
              title="Attendance Trends"
              subtitle="Monthly attendance percentage"
              action={
                <Button variant="outline" size="sm" onClick={() => handleDownloadReport('Attendance')}>
                  <FiDownload className="mr-2" />
                  Download
                </Button>
              }
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="percentage" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Overall Statistics">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Attendance</span>
                    <span className="font-semibold text-blue-600">91.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Month</span>
                    <Badge variant="success">March (95%)</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lowest Month</span>
                    <Badge variant="warning">February (88%)</Badge>
                  </div>
                </div>
              </Card>

              <Card title="Class-wise Attendance">
                <div className="space-y-2">
                  {['10-A', '10-B', '11-A', '11-B'].map(cls => (
                    <div key={cls} className="flex justify-between items-center">
                      <span className="text-gray-600">Class {cls}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.random() * 20 + 80}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">
                          {(Math.random() * 20 + 80).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Trend Analysis">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Improvement</p>
                    <p className="text-lg font-bold text-green-600">+3.5%</p>
                    <p className="text-xs text-gray-500">vs last quarter</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Consistency</p>
                    <p className="text-lg font-bold text-blue-600">High</p>
                    <p className="text-xs text-gray-500">90%+ for 4 months</p>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Fee Collection Report */}
        {selectedReportType === 'fees' && (
          <>
            <Card
              title="Fee Collection Trends"
              subtitle="Monthly collection and pending fees"
              action={
                <Button variant="outline" size="sm" onClick={() => handleDownloadReport('Fee Collection')}>
                  <FiDownload className="mr-2" />
                  Download
                </Button>
              }
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={feeCollectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="collected" fill="#10B981" />
                  <Bar dataKey="pending" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Collection Summary">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Collected</span>
                    <span className="font-semibold text-green-600">$289,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Pending</span>
                    <span className="font-semibold text-red-600">$11,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Collection Rate</span>
                    <Badge variant="success">96.3%</Badge>
                  </div>
                </div>
              </Card>

              <Card title="Payment Status">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paid in Full</span>
                    <Badge variant="success">245 students</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Partial Payment</span>
                    <Badge variant="warning">32 students</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">No Payment</span>
                    <Badge variant="error">8 students</Badge>
                  </div>
                </div>
              </Card>

              <Card title="Monthly Comparison">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Best Month</p>
                    <p className="text-lg font-bold text-green-600">March</p>
                    <p className="text-xs text-gray-500">$50,000 collected</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Average</p>
                    <p className="text-lg font-bold text-blue-600">$48,167</p>
                    <p className="text-xs text-gray-500">per month</p>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Academic Performance Report */}
        {selectedReportType === 'grades' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card
                title="Grade Distribution"
                subtitle="Overall student performance"
                action={
                  <Button variant="outline" size="sm" onClick={() => handleDownloadReport('Academic Performance')}>
                    <FiDownload className="mr-2" />
                    Download
                  </Button>
                }
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      dataKey="count"
                      nameKey="grade"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card title="Class Performance">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={classPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="average" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Top Performers">
                <div className="space-y-2">
                  {['Alice Johnson - 95%', 'Bob Smith - 94%', 'Carol Davis - 93%'].map((student, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg">
                      <p className="font-semibold text-gray-900">{student.split(' - ')[0]}</p>
                      <p className="text-sm text-green-600">{student.split(' - ')[1]}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Subject Analysis">
                <div className="space-y-2">
                  {['Mathematics: 87%', 'Science: 85%', 'English: 89%', 'Social: 82%'].map((subject, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-600">{subject.split(':')[0]}</span>
                      <span className="font-semibold text-blue-600">{subject.split(':')[1]}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Pass Rate">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Overall Pass Rate</p>
                    <p className="text-3xl font-bold text-green-600">97.5%</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Average Score</p>
                    <p className="text-3xl font-bold text-blue-600">85.7%</p>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Student Report */}
        {selectedReportType === 'students' && (
          <>
            <Card
              title="Student Demographics"
              subtitle="Comprehensive student information"
              action={
                <Button variant="outline" size="sm" onClick={() => handleDownloadReport('Student Demographics')}>
                  <FiDownload className="mr-2" />
                  Download
                </Button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-4xl font-bold text-blue-600 mt-2">1,245</p>
                </div>
                <div className="p-6 bg-green-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">New Admissions</p>
                  <p className="text-4xl font-bold text-green-600 mt-2">87</p>
                </div>
                <div className="p-6 bg-purple-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Male Students</p>
                  <p className="text-4xl font-bold text-purple-600 mt-2">652</p>
                </div>
                <div className="p-6 bg-pink-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Female Students</p>
                  <p className="text-4xl font-bold text-pink-600 mt-2">593</p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Grade Distribution">
                <div className="space-y-2">
                  {[
                    { grade: '10th Grade', count: 420 },
                    { grade: '11th Grade', count: 412 },
                    { grade: '12th Grade', count: 413 }
                  ].map(item => (
                    <div key={item.grade} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{item.grade}</span>
                      <Badge variant="info">{item.count} students</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Recent Activities">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-semibold text-gray-900">New Admissions</p>
                    <p className="text-sm text-gray-600">12 students enrolled this month</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-gray-900">Transfers</p>
                    <p className="text-sm text-gray-600">3 students transferred</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="font-semibold text-gray-900">Graduations</p>
                    <p className="text-sm text-gray-600">405 students graduated</p>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reports;
