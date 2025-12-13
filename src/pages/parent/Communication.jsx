import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Avatar from '../../components/common/Avatar';
import { toast } from 'react-hot-toast';
import {
  FiMail,
  FiSend,
  FiSearch,
  FiFilter,
  FiUser,
  FiUsers,
  FiClock,
  FiMessageSquare,
  FiEdit,
  FiTrash2,
  FiCheck,
  FiCheckCircle
} from 'react-icons/fi';

const ParentCommunication = () => {
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [composeForm, setComposeForm] = useState({
    childId: '',
    teacher: '',
    subject: '',
    message: ''
  });

  const [children] = useState([
    { id: 1, name: 'John Doe', className: '10-A', rollNo: 'STU-2024-001' },
    { id: 2, name: 'Jane Doe', className: '8-B', rollNo: 'STU-2024-150' }
  ]);

  const [teachers] = useState([
    { id: 1, name: 'Prof. Sarah Johnson', subject: 'Mathematics', email: 'sarah.j@school.com', photo: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Prof. Michael Brown', subject: 'Physics', email: 'michael.b@school.com', photo: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Dr. Emily Davis', subject: 'Chemistry', email: 'emily.d@school.com', photo: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Ms. Lisa Anderson', subject: 'English', email: 'lisa.a@school.com', photo: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Mr. Robert Wilson', subject: 'History', email: 'robert.w@school.com', photo: 'https://i.pravatar.cc/150?img=5' }
  ]);

  const [messages] = useState([
    {
      id: 1,
      childId: 1,
      childName: 'John Doe',
      teacherId: 1,
      teacherName: 'Prof. Sarah Johnson',
      teacherPhoto: 'https://i.pravatar.cc/150?img=1',
      subject: 'Mathematics',
      messageSubject: 'Progress Update - Mid-term Performance',
      lastMessage: 'John has shown excellent improvement in his mathematics skills...',
      date: '2024-12-10',
      time: '10:30 AM',
      unread: true,
      replies: 3,
      thread: [
        {
          id: 1,
          sender: 'teacher',
          senderName: 'Prof. Sarah Johnson',
          message: 'John has shown excellent improvement in his mathematics skills. He scored 92% in the recent test. Keep up the good work!',
          date: '2024-12-10',
          time: '10:30 AM'
        },
        {
          id: 2,
          sender: 'parent',
          senderName: 'You',
          message: 'Thank you for the update! We are very proud of his progress. Are there any areas where he needs to focus more?',
          date: '2024-12-10',
          time: '02:15 PM'
        },
        {
          id: 3,
          sender: 'teacher',
          senderName: 'Prof. Sarah Johnson',
          message: 'He should work on geometry concepts. I recommend extra practice on triangles and circles.',
          date: '2024-12-11',
          time: '09:00 AM'
        }
      ]
    },
    {
      id: 2,
      childId: 1,
      childName: 'John Doe',
      teacherId: 2,
      teacherName: 'Prof. Michael Brown',
      teacherPhoto: 'https://i.pravatar.cc/150?img=2',
      subject: 'Physics',
      messageSubject: 'Assignment Submission Reminder',
      lastMessage: 'Please remind John to submit the physics lab report by Friday...',
      date: '2024-12-08',
      time: '03:45 PM',
      unread: false,
      replies: 1,
      thread: [
        {
          id: 1,
          sender: 'teacher',
          senderName: 'Prof. Michael Brown',
          message: 'Please remind John to submit the physics lab report by Friday. He has done excellent work but the submission is pending.',
          date: '2024-12-08',
          time: '03:45 PM'
        }
      ]
    },
    {
      id: 3,
      childId: 2,
      childName: 'Jane Doe',
      teacherId: 4,
      teacherName: 'Ms. Lisa Anderson',
      teacherPhoto: 'https://i.pravatar.cc/150?img=4',
      subject: 'English',
      messageSubject: 'Excellent Essay Work!',
      lastMessage: 'Jane submitted an outstanding essay on Shakespeare. Her analytical skills...',
      date: '2024-12-12',
      time: '11:20 AM',
      unread: true,
      replies: 2,
      thread: [
        {
          id: 1,
          sender: 'teacher',
          senderName: 'Ms. Lisa Anderson',
          message: 'Jane submitted an outstanding essay on Shakespeare. Her analytical skills are remarkable for her age!',
          date: '2024-12-12',
          time: '11:20 AM'
        },
        {
          id: 2,
          sender: 'parent',
          senderName: 'You',
          message: 'Thank you so much! She really enjoys your classes. We appreciate your guidance.',
          date: '2024-12-12',
          time: '04:30 PM'
        }
      ]
    },
    {
      id: 4,
      childId: 2,
      childName: 'Jane Doe',
      teacherId: 5,
      teacherName: 'Mr. Robert Wilson',
      teacherPhoto: 'https://i.pravatar.cc/150?img=5',
      subject: 'History',
      messageSubject: 'Field Trip Permission',
      lastMessage: 'We are planning a field trip to the National Museum next week...',
      date: '2024-12-05',
      time: '09:15 AM',
      unread: false,
      replies: 4,
      thread: [
        {
          id: 1,
          sender: 'teacher',
          senderName: 'Mr. Robert Wilson',
          message: 'We are planning a field trip to the National Museum next week. Please sign the permission slip.',
          date: '2024-12-05',
          time: '09:15 AM'
        },
        {
          id: 2,
          sender: 'parent',
          senderName: 'You',
          message: 'That sounds wonderful! When exactly is the trip scheduled?',
          date: '2024-12-05',
          time: '01:20 PM'
        },
        {
          id: 3,
          sender: 'teacher',
          senderName: 'Mr. Robert Wilson',
          message: 'The trip is scheduled for December 15th, from 9 AM to 3 PM. We will provide lunch.',
          date: '2024-12-05',
          time: '03:30 PM'
        },
        {
          id: 4,
          sender: 'parent',
          senderName: 'You',
          message: 'Perfect! I will sign the permission slip and send it tomorrow.',
          date: '2024-12-05',
          time: '06:00 PM'
        }
      ]
    },
    {
      id: 5,
      childId: 1,
      childName: 'John Doe',
      teacherId: 3,
      teacherName: 'Dr. Emily Davis',
      teacherPhoto: 'https://i.pravatar.cc/150?img=3',
      subject: 'Chemistry',
      messageSubject: 'Lab Safety Reminder',
      lastMessage: 'Please ensure John brings his lab coat for tomorrow\'s practical session...',
      date: '2024-12-13',
      time: '02:00 PM',
      unread: true,
      replies: 1,
      thread: [
        {
          id: 1,
          sender: 'teacher',
          senderName: 'Dr. Emily Davis',
          message: 'Please ensure John brings his lab coat for tomorrow\'s practical session. We will be working with chemicals and safety equipment is mandatory.',
          date: '2024-12-13',
          time: '02:00 PM'
        }
      ]
    }
  ]);

  const handleComposeMessage = () => {
    setShowComposeModal(true);
  };

  const handleSendMessage = () => {
    if (!composeForm.childId || !composeForm.teacher || !composeForm.subject || !composeForm.message) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Message sent successfully!');
    setShowComposeModal(false);
    setComposeForm({ childId: '', teacher: '', subject: '', message: '' });
  };

  const handleViewThread = (message) => {
    setSelectedMessage(message);
    setShowThreadModal(true);
  };

  const handleReply = () => {
    toast.success('Reply sent successfully!');
  };

  // Filter messages based on selected child and search query
  const filteredMessages = messages.filter(message => {
    const matchesChild = selectedChild === 'all' || message.childId === parseInt(selectedChild);
    const matchesSearch = message.messageSubject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'unread' && message.unread) ||
                         (filterStatus === 'read' && !message.unread);
    return matchesChild && matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(m => m.unread).length;
  const totalMessages = messages.length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communication</h1>
          <p className="text-gray-600 mt-1">Communicate with your children's teachers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <FiMail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Messages</p>
              <p className="text-2xl font-bold text-blue-600">{totalMessages}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiMessageSquare className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-orange-600">{unreadCount}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiCheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Read</p>
              <p className="text-2xl font-bold text-green-600">{totalMessages - unreadCount}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiUsers className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Teachers</p>
              <p className="text-2xl font-bold text-purple-600">{teachers.length}</p>
            </div>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card>
          <div className="space-y-4">
            {/* Child Selector */}
            <div className="flex items-center gap-4 flex-wrap">
              <FiUser className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">View messages for:</span>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedChild === 'all' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedChild('all')}
                >
                  <FiUsers className="mr-2 w-4 h-4" />
                  All Children
                </Button>
                {children.map(child => (
                  <Button
                    key={child.id}
                    variant={selectedChild === child.id.toString() ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedChild(child.id.toString())}
                  >
                    {child.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'unread' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('unread')}
                >
                  Unread
                </Button>
                <Button
                  variant={filterStatus === 'read' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('read')}
                >
                  Read
                </Button>
              </div>
              <Button variant="primary" onClick={handleComposeMessage}>
                <FiEdit className="mr-2 w-4 h-4" />
                Compose
              </Button>
            </div>
          </div>
        </Card>

        {/* Messages List */}
        <div className="space-y-3">
          {filteredMessages.length === 0 ? (
            <Card>
              <div className="text-center py-8">
                <FiMail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No messages found</p>
              </div>
            </Card>
          ) : (
            filteredMessages.map((message) => (
              <Card
                key={message.id}
                hoverable
                className={`cursor-pointer ${message.unread ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                onClick={() => handleViewThread(message)}
              >
                <div className="flex items-start gap-4">
                  <Avatar
                    src={message.teacherPhoto}
                    name={message.teacherName}
                    size="lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{message.teacherName}</h3>
                          {message.unread && <Badge variant="warning" size="sm">New</Badge>}
                          <Badge variant="info" size="sm">{message.childName}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{message.subject}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm text-gray-600">{message.date}</p>
                        <p className="text-xs text-gray-500">{message.time}</p>
                      </div>
                    </div>
                    <h4 className="font-medium text-gray-900 mt-2">{message.messageSubject}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{message.lastMessage}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FiMessageSquare className="w-4 h-4" />
                        <span>{message.replies} {message.replies === 1 ? 'reply' : 'replies'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Compose Message Modal */}
      <Modal
        isOpen={showComposeModal}
        onClose={() => {
          setShowComposeModal(false);
          setComposeForm({ childId: '', teacher: '', subject: '', message: '' });
        }}
        title="Compose Message"
        size="lg"
      >
        <div className="space-y-4">
          {/* Child Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Child
            </label>
            <select
              value={composeForm.childId}
              onChange={(e) => setComposeForm({ ...composeForm, childId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a child...</option>
              {children.map(child => (
                <option key={child.id} value={child.id}>
                  {child.name} - Class {child.className}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Teacher
            </label>
            <select
              value={composeForm.teacher}
              onChange={(e) => setComposeForm({ ...composeForm, teacher: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a teacher...</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name} - {teacher.subject}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={composeForm.subject}
              onChange={(e) => setComposeForm({ ...composeForm, subject: e.target.value })}
              placeholder="Enter message subject..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={composeForm.message}
              onChange={(e) => setComposeForm({ ...composeForm, message: e.target.value })}
              placeholder="Type your message here..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowComposeModal(false);
                setComposeForm({ childId: '', teacher: '', subject: '', message: '' });
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSendMessage}>
              <FiSend className="mr-2 w-4 h-4" />
              Send Message
            </Button>
          </div>
        </div>
      </Modal>

      {/* Message Thread Modal */}
      <Modal
        isOpen={showThreadModal}
        onClose={() => {
          setShowThreadModal(false);
          setSelectedMessage(null);
        }}
        title="Message Thread"
        size="xl"
      >
        {selectedMessage && (
          <div className="space-y-6">
            {/* Thread Header */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Avatar
                  src={selectedMessage.teacherPhoto}
                  name={selectedMessage.teacherName}
                  size="lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{selectedMessage.teacherName}</h3>
                  <p className="text-sm text-gray-600">{selectedMessage.subject}</p>
                </div>
                <Badge variant="info">{selectedMessage.childName}</Badge>
              </div>
              <h4 className="font-semibold text-gray-900">{selectedMessage.messageSubject}</h4>
            </div>

            {/* Message Thread */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedMessage.thread.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg ${
                    msg.sender === 'parent'
                      ? 'bg-blue-50 ml-8'
                      : 'bg-gray-50 mr-8'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-gray-900">{msg.senderName}</p>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">{msg.date}</p>
                      <p className="text-xs text-gray-500">{msg.time}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{msg.message}</p>
                </div>
              ))}
            </div>

            {/* Reply Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reply to this message
              </label>
              <textarea
                placeholder="Type your reply here..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowThreadModal(false);
                  setSelectedMessage(null);
                }}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handleReply}>
                <FiSend className="mr-2 w-4 h-4" />
                Send Reply
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default ParentCommunication;
