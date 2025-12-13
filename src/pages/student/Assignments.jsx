import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { toast } from 'react-hot-toast';
import {
  FiFileText,
  FiCalendar,
  FiClock,
  FiUpload,
  FiDownload,
  FiCheckCircle,
  FiAlertCircle,
  FiBook,
  FiAward
} from 'react-icons/fi';

const StudentAssignments = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [submissionNote, setSubmissionNote] = useState('');

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'English Literature', 'History'];
  const tabs = ['all', 'pending', 'submitted', 'graded'];

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Calculus Problem Set 3',
      subject: 'Mathematics',
      code: 'MATH-101',
      teacher: 'Prof. Sarah Johnson',
      description: 'Solve problems 1-15 from Chapter 5. Show all working steps and provide detailed explanations for each solution.',
      assignedDate: '2024-01-15',
      dueDate: '2024-01-25',
      dueTime: '11:59 PM',
      maxMarks: 100,
      status: 'pending',
      priority: 'high',
      attachments: [
        { name: 'Problem_Set_3.pdf', size: '2.5 MB', type: 'PDF' }
      ],
      guidelines: [
        'Submit in PDF format only',
        'Include your name and roll number',
        'Show all working steps',
        'Late submissions will incur penalty'
      ],
      submittedDate: null,
      submittedFiles: [],
      grade: null,
      feedback: null
    },
    {
      id: 2,
      title: 'Lab Report - Newton\'s Laws',
      subject: 'Physics',
      code: 'PHY-101',
      teacher: 'Prof. Michael Brown',
      description: 'Write a comprehensive lab report on the experiment conducted on Newton\'s Laws of Motion. Include observations, calculations, and conclusions.',
      assignedDate: '2024-01-10',
      dueDate: '2024-01-22',
      dueTime: '11:59 PM',
      maxMarks: 50,
      status: 'submitted',
      priority: 'medium',
      attachments: [
        { name: 'Lab_Guidelines.pdf', size: '1.2 MB', type: 'PDF' },
        { name: 'Data_Sheet.xlsx', size: '500 KB', type: 'Excel' }
      ],
      guidelines: [
        'Follow the lab report format',
        'Include graphs and charts',
        'Cite all references',
        'Maximum 10 pages'
      ],
      submittedDate: '2024-01-20',
      submittedFiles: [
        { name: 'Lab_Report_Newton_Laws.pdf', size: '3.2 MB' }
      ],
      grade: null,
      feedback: null
    },
    {
      id: 3,
      title: 'Organic Chemistry Mechanisms',
      subject: 'Chemistry',
      code: 'CHEM-101',
      teacher: 'Dr. Emily Davis',
      description: 'Draw and explain the mechanisms for the given organic reactions. Provide step-by-step electron movement and intermediate structures.',
      assignedDate: '2024-01-12',
      dueDate: '2024-01-20',
      dueTime: '11:59 PM',
      maxMarks: 75,
      status: 'graded',
      priority: 'medium',
      attachments: [
        { name: 'Reaction_List.pdf', size: '1.8 MB', type: 'PDF' }
      ],
      guidelines: [
        'Draw clear structures',
        'Show electron movement with arrows',
        'Explain each step',
        'Use ChemDraw or similar software'
      ],
      submittedDate: '2024-01-19',
      submittedFiles: [
        { name: 'Chemistry_Mechanisms.pdf', size: '4.5 MB' }
      ],
      grade: 68,
      feedback: 'Good work overall. Some mechanisms need more detailed explanations. Watch the stereochemistry in reaction 3.'
    },
    {
      id: 4,
      title: 'Shakespeare Analysis Essay',
      subject: 'English Literature',
      code: 'ENG-101',
      teacher: 'Ms. Lisa Anderson',
      description: 'Write a 2000-word essay analyzing the themes of love and tragedy in Romeo and Juliet. Support your arguments with textual evidence.',
      assignedDate: '2024-01-08',
      dueDate: '2024-01-28',
      dueTime: '11:59 PM',
      maxMarks: 100,
      status: 'pending',
      priority: 'low',
      attachments: [
        { name: 'Essay_Guidelines.pdf', size: '800 KB', type: 'PDF' },
        { name: 'Romeo_and_Juliet.pdf', size: '5.0 MB', type: 'PDF' }
      ],
      guidelines: [
        'Minimum 2000 words',
        'Use MLA citation format',
        'Include bibliography',
        'Original work only - plagiarism will be penalized'
      ],
      submittedDate: null,
      submittedFiles: [],
      grade: null,
      feedback: null
    },
    {
      id: 5,
      title: 'World War II Research Project',
      subject: 'History',
      code: 'HIST-101',
      teacher: 'Mr. Robert Wilson',
      description: 'Prepare a detailed research project on any major event of World War II. Include causes, key events, outcomes, and historical significance.',
      assignedDate: '2024-01-05',
      dueDate: '2024-01-18',
      dueTime: '11:59 PM',
      maxMarks: 100,
      status: 'graded',
      priority: 'high',
      attachments: [
        { name: 'Project_Requirements.pdf', size: '1.5 MB', type: 'PDF' }
      ],
      guidelines: [
        'Minimum 15 pages',
        'Include maps and timelines',
        'Cite at least 10 sources',
        'Presentation required'
      ],
      submittedDate: '2024-01-17',
      submittedFiles: [
        { name: 'WWII_Research_Project.pdf', size: '8.2 MB' },
        { name: 'Presentation_Slides.pptx', size: '6.5 MB' }
      ],
      grade: 92,
      feedback: 'Excellent research and presentation. Well-structured arguments and comprehensive coverage of the topic. Great use of primary sources.'
    },
    {
      id: 6,
      title: 'Quadratic Equations Worksheet',
      subject: 'Mathematics',
      code: 'MATH-101',
      teacher: 'Prof. Sarah Johnson',
      description: 'Complete the worksheet on quadratic equations. Solve all problems and show your working.',
      assignedDate: '2024-01-18',
      dueDate: '2024-01-24',
      dueTime: '11:59 PM',
      maxMarks: 50,
      status: 'pending',
      priority: 'medium',
      attachments: [
        { name: 'Quadratic_Worksheet.pdf', size: '1.0 MB', type: 'PDF' }
      ],
      guidelines: [
        'Show all steps',
        'Use proper mathematical notation',
        'Check your answers'
      ],
      submittedDate: null,
      submittedFiles: [],
      grade: null,
      feedback: null
    }
  ]);

  const filteredAssignments = assignments.filter(a => {
    const matchesTab = selectedTab === 'all' || a.status === selectedTab;
    const matchesSubject = selectedSubject === 'all' || a.subject === selectedSubject;
    return matchesTab && matchesSubject;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'submitted':
        return 'info';
      case 'graded':
        return 'success';
      default:
        return 'default';
    }
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmit = (assignment) => {
    setSelectedAssignment(assignment);
    setUploadedFile(null);
    setSubmissionNote('');
    setShowSubmitModal(true);
  };

  const handleViewDetails = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailsModal(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmitAssignment = () => {
    if (!uploadedFile) {
      toast.error('Please upload a file');
      return;
    }

    setAssignments(assignments.map(a =>
      a.id === selectedAssignment.id
        ? {
            ...a,
            status: 'submitted',
            submittedDate: new Date().toISOString().split('T')[0],
            submittedFiles: [{ name: uploadedFile.name, size: `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB` }]
          }
        : a
    ));

    toast.success('Assignment submitted successfully!');
    setShowSubmitModal(false);
    setUploadedFile(null);
    setSubmissionNote('');
  };

  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;
  const gradedCount = assignments.filter(a => a.status === 'graded').length;
  const avgGrade = gradedCount > 0
    ? (assignments.filter(a => a.grade !== null).reduce((sum, a) => sum + a.grade, 0) / gradedCount).toFixed(1)
    : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
          <p className="text-gray-600 mt-1">View and submit your assignments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <FiClock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiUpload className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Submitted</p>
              <p className="text-2xl font-bold text-blue-600">{submittedCount}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiCheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Graded</p>
              <p className="text-2xl font-bold text-green-600">{gradedCount}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiAward className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Avg Grade</p>
              <p className="text-2xl font-bold text-purple-600">{avgGrade}%</p>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => {
            const daysRemaining = getDaysRemaining(assignment.dueDate);
            const isOverdue = daysRemaining < 0 && assignment.status === 'pending';
            const isDueSoon = daysRemaining <= 3 && daysRemaining >= 0 && assignment.status === 'pending';

            return (
              <Card key={assignment.id} hoverable>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiFileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant="info" size="sm">
                            <FiBook className="inline w-3 h-3 mr-1" />
                            {assignment.subject}
                          </Badge>
                          <Badge variant={getStatusColor(assignment.status)} size="sm">
                            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                          </Badge>
                          <Badge variant={getPriorityColor(assignment.priority)} size="sm">
                            {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)} Priority
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{assignment.teacher}</p>
                      </div>
                    </div>
                    {assignment.grade !== null && (
                      <div className="text-right">
                        <p className="text-3xl font-bold text-green-600">{assignment.grade}</p>
                        <p className="text-sm text-gray-600">/{assignment.maxMarks}</p>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-700">{assignment.description}</p>

                  {/* Dates & Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <FiCalendar className="w-4 h-4" />
                        <span>Assigned</span>
                      </div>
                      <p className="font-medium text-gray-900">{assignment.assignedDate}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <FiClock className="w-4 h-4" />
                        <span>Due Date</span>
                      </div>
                      <p className={`font-medium ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-orange-600' : 'text-gray-900'}`}>
                        {assignment.dueDate} at {assignment.dueTime}
                      </p>
                      {assignment.status === 'pending' && (
                        <p className={`text-xs ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-orange-600' : 'text-gray-600'}`}>
                          {isOverdue
                            ? `Overdue by ${Math.abs(daysRemaining)} days`
                            : `${daysRemaining} days remaining`
                          }
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <FiAward className="w-4 h-4" />
                        <span>Max Marks</span>
                      </div>
                      <p className="font-medium text-gray-900">{assignment.maxMarks}</p>
                    </div>
                  </div>

                  {/* Submission Info */}
                  {assignment.submittedDate && (
                    <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <div className="flex items-center gap-2">
                        <FiCheckCircle className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-blue-900">
                          Submitted on {assignment.submittedDate}
                        </p>
                      </div>
                      {assignment.submittedFiles.length > 0 && (
                        <p className="text-xs text-blue-800 mt-1">
                          Files: {assignment.submittedFiles.map(f => f.name).join(', ')}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Overdue Warning */}
                  {isOverdue && (
                    <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                      <div className="flex items-center gap-2">
                        <FiAlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-sm text-red-900 font-medium">
                          This assignment is overdue! Submit as soon as possible.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Due Soon Warning */}
                  {isDueSoon && (
                    <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                      <div className="flex items-center gap-2">
                        <FiAlertCircle className="w-5 h-5 text-orange-600" />
                        <p className="text-sm text-orange-900 font-medium">
                          Due soon! Only {daysRemaining} days remaining.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Feedback */}
                  {assignment.feedback && (
                    <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                      <p className="text-sm font-medium text-green-900 mb-1">Teacher's Feedback:</p>
                      <p className="text-sm text-green-800">{assignment.feedback}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(assignment)}
                    >
                      <FiFileText className="mr-2 w-4 h-4" />
                      View Details
                    </Button>
                    {assignment.status === 'pending' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSubmit(assignment)}
                      >
                        <FiUpload className="mr-2 w-4 h-4" />
                        Submit Assignment
                      </Button>
                    )}
                    {assignment.attachments.length > 0 && (
                      <Button variant="outline" size="sm">
                        <FiDownload className="mr-2 w-4 h-4" />
                        Download Materials ({assignment.attachments.length})
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredAssignments.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <FiFileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No assignments found matching your filters.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Submit Assignment Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => {
          setShowSubmitModal(false);
          setUploadedFile(null);
          setSubmissionNote('');
        }}
        title="Submit Assignment"
        size="lg"
      >
        {selectedAssignment && (
          <div className="space-y-6">
            {/* Assignment Info */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">{selectedAssignment.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedAssignment.subject}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="text-gray-600">Due: {selectedAssignment.dueDate}</span>
                <span className="text-gray-600">Max Marks: {selectedAssignment.maxMarks}</span>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Your Work *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <FiUpload className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX, PPT, PPTX (MAX. 10MB)
                  </p>
                </label>
                {uploadedFile && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900 font-medium">{uploadedFile.name}</p>
                    <p className="text-xs text-blue-700">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submission Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={submissionNote}
                onChange={(e) => setSubmissionNote(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any notes for your teacher..."
              />
            </div>

            {/* Guidelines Reminder */}
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm font-medium text-yellow-900 mb-2">Submission Guidelines:</p>
              <ul className="text-sm text-yellow-800 space-y-1">
                {selectedAssignment.guidelines.map((guideline, index) => (
                  <li key={index}>• {guideline}</li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowSubmitModal(false);
                  setUploadedFile(null);
                  setSubmissionNote('');
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmitAssignment}>
                <FiUpload className="mr-2 w-4 h-4" />
                Submit Assignment
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Assignment Details Modal */}
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
            {/* Assignment Header */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900">{selectedAssignment.title}</h3>
              <p className="text-gray-600 mt-1">{selectedAssignment.subject} ({selectedAssignment.code})</p>
              <p className="text-sm text-gray-600">Teacher: {selectedAssignment.teacher}</p>
              <div className="flex gap-2 mt-3">
                <Badge variant={getStatusColor(selectedAssignment.status)}>
                  {selectedAssignment.status.charAt(0).toUpperCase() + selectedAssignment.status.slice(1)}
                </Badge>
                <Badge variant={getPriorityColor(selectedAssignment.priority)}>
                  {selectedAssignment.priority.charAt(0).toUpperCase() + selectedAssignment.priority.slice(1)} Priority
                </Badge>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-gray-700">{selectedAssignment.description}</p>
            </div>

            {/* Important Dates */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Important Dates</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Assigned Date</p>
                  <p className="font-medium text-gray-900">{selectedAssignment.assignedDate}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="font-medium text-gray-900">
                    {selectedAssignment.dueDate} at {selectedAssignment.dueTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Submission Guidelines</h4>
              <ul className="space-y-2">
                {selectedAssignment.guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Attachments */}
            {selectedAssignment.attachments.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Course Materials</h4>
                <div className="space-y-2">
                  {selectedAssignment.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FiFileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-600">{file.size} • {file.type}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <FiDownload className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submission Status */}
            {selectedAssignment.submittedDate && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Submission Status</h4>
                <p className="text-sm text-blue-800">
                  Submitted on {selectedAssignment.submittedDate}
                </p>
                {selectedAssignment.submittedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {selectedAssignment.submittedFiles.map((file, index) => (
                      <div key={index} className="text-sm text-blue-900">
                        • {file.name} ({file.size})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Grade & Feedback */}
            {selectedAssignment.grade !== null && (
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-green-900">Grade</h4>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-green-600">{selectedAssignment.grade}</span>
                    <span className="text-gray-600">/{selectedAssignment.maxMarks}</span>
                  </div>
                </div>
                {selectedAssignment.feedback && (
                  <div>
                    <p className="text-sm font-medium text-green-900 mb-1">Feedback:</p>
                    <p className="text-sm text-green-800">{selectedAssignment.feedback}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default StudentAssignments;
