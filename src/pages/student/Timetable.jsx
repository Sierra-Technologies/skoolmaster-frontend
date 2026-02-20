import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { FiClock, FiMapPin, FiBook, FiUser, FiCalendar } from 'react-icons/fi';

const StudentTimetable = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const timetable = {
    Monday: [
      { period: 1, time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Prof. Sarah Johnson', room: '201', type: 'class' },
      { period: 2, time: '09:00 - 10:00', subject: 'Physics', teacher: 'Prof. Michael Brown', room: '203', type: 'class' },
      { period: 3, time: '10:00 - 11:00', subject: 'English Literature', teacher: 'Ms. Lisa Anderson', room: '102', type: 'class' },
      { period: 4, time: '11:00 - 12:00', subject: 'Free Period', teacher: '', room: '', type: 'free' },
      { period: 5, time: '12:00 - 01:00', subject: 'Lunch Break', teacher: '', room: '', type: 'break' },
      { period: 6, time: '01:00 - 02:00', subject: 'Chemistry', teacher: 'Dr. Emily Davis', room: '205', type: 'class' },
      { period: 7, time: '02:00 - 03:00', subject: 'History', teacher: 'Mr. Robert Wilson', room: '104', type: 'class' },
    ],
    Tuesday: [
      { period: 1, time: '08:00 - 09:00', subject: 'Free Period', teacher: '', room: '', type: 'free' },
      { period: 2, time: '09:00 - 10:00', subject: 'Chemistry', teacher: 'Dr. Emily Davis', room: '205', type: 'class' },
      { period: 3, time: '10:00 - 11:00', subject: 'Mathematics', teacher: 'Prof. Sarah Johnson', room: '201', type: 'class' },
      { period: 4, time: '11:00 - 12:00', subject: 'History', teacher: 'Mr. Robert Wilson', room: '104', type: 'class' },
      { period: 5, time: '12:00 - 01:00', subject: 'Lunch Break', teacher: '', room: '', type: 'break' },
      { period: 6, time: '01:00 - 02:00', subject: 'Physical Education', teacher: 'Coach Smith', room: 'Sports Ground', type: 'class' },
      { period: 7, time: '02:00 - 03:00', subject: 'Free Period', teacher: '', room: '', type: 'free' },
    ],
    Wednesday: [
      { period: 1, time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Prof. Sarah Johnson', room: '201', type: 'class' },
      { period: 2, time: '09:00 - 10:00', subject: 'Free Period', teacher: '', room: '', type: 'free' },
      { period: 3, time: '10:00 - 11:00', subject: 'English Literature', teacher: 'Ms. Lisa Anderson', room: '102', type: 'class' },
      { period: 4, time: '11:00 - 12:00', subject: 'Computer Science', teacher: 'Dr. Alan Turing', room: 'Lab-1', type: 'class' },
      { period: 5, time: '12:00 - 01:00', subject: 'Lunch Break', teacher: '', room: '', type: 'break' },
      { period: 6, time: '01:00 - 02:00', subject: 'Free Period', teacher: '', room: '', type: 'free' },
      { period: 7, time: '02:00 - 03:00', subject: 'Physics', teacher: 'Prof. Michael Brown', room: '203', type: 'class' },
    ],
    Thursday: [
      { period: 1, time: '08:00 - 09:00', subject: 'English Literature', teacher: 'Ms. Lisa Anderson', room: '102', type: 'class' },
      { period: 2, time: '09:00 - 10:00', subject: 'Free Period', teacher: '', room: '', type: 'free' },
      { period: 3, time: '10:00 - 11:00', subject: 'Chemistry', teacher: 'Dr. Emily Davis', room: '205', type: 'class' },
      { period: 4, time: '11:00 - 12:00', subject: 'Mathematics', teacher: 'Prof. Sarah Johnson', room: '201', type: 'class' },
      { period: 5, time: '12:00 - 01:00', subject: 'Lunch Break', teacher: '', room: '', type: 'break' },
      { period: 6, time: '01:00 - 02:00', subject: 'Computer Science', teacher: 'Dr. Alan Turing', room: 'Lab-1', type: 'class' },
      { period: 7, time: '02:00 - 03:00', subject: 'History', teacher: 'Mr. Robert Wilson', room: '104', type: 'class' },
    ],
    Friday: [
      { period: 1, time: '08:00 - 09:00', subject: 'Free Period', teacher: '', room: '', type: 'free' },
      { period: 2, time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Prof. Sarah Johnson', room: '201', type: 'class' },
      { period: 3, time: '10:00 - 11:00', subject: 'Physics', teacher: 'Prof. Michael Brown', room: '203', type: 'class' },
      { period: 4, time: '11:00 - 12:00', subject: 'Free Period', teacher: '', room: '', type: 'free' },
      { period: 5, time: '12:00 - 01:00', subject: 'Lunch Break', teacher: '', room: '', type: 'break' },
      { period: 6, time: '01:00 - 02:00', subject: 'Art & Craft', teacher: 'Ms. Clara Davis', room: 'Art Room', type: 'class' },
      { period: 7, time: '02:00 - 03:00', subject: 'Chemistry', teacher: 'Dr. Emily Davis', room: '205', type: 'class' },
    ],
    Saturday: [
      { period: 1, time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Prof. Sarah Johnson', room: '201', type: 'class' },
      { period: 2, time: '09:00 - 10:00', subject: 'History', teacher: 'Mr. Robert Wilson', room: '104', type: 'class' },
      { period: 3, time: '10:00 - 11:00', subject: 'Computer Science', teacher: 'Dr. Alan Turing', room: 'Lab-1', type: 'class' },
      { period: 4, time: '11:00 - 12:00', subject: 'Free Period', teacher: '', room: '', type: 'free' },
    ],
  };

  const getPeriodColor = (type) => {
    switch (type) {
      case 'class':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'free':
        return 'bg-gray-100 border-gray-300 text-gray-600';
      case 'break':
        return 'bg-green-100 border-green-300 text-green-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-600';
    }
  };

  const getTotalClassesForDay = (day) => {
    return timetable[day].filter(p => p.type === 'class').length;
  };

  // Get all unique subjects from timetable
  const getAllSubjects = () => {
    const subjects = new Set();
    Object.values(timetable).forEach(day => {
      day.forEach(period => {
        if (period.type === 'class') {
          subjects.add(period.subject);
        }
      });
    });
    return Array.from(subjects);
  };

  // Count classes per subject per week
  const getSubjectStats = () => {
    const stats = {};
    Object.values(timetable).forEach(day => {
      day.forEach(period => {
        if (period.type === 'class') {
          if (!stats[period.subject]) {
            stats[period.subject] = {
              count: 0,
              teacher: period.teacher
            };
          }
          stats[period.subject].count++;
        }
      });
    });
    return stats;
  };

  const subjectStats = getSubjectStats();
  const totalWeeklyClasses = weekDays.reduce((sum, day) => sum + getTotalClassesForDay(day), 0);

  // Get current day's schedule
  const getCurrentDaySchedule = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return weekDays.includes(today) ? today : 'Monday';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Timetable</h1>
          <p className="text-gray-600 mt-1">View your weekly class schedule</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <FiBook className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Subjects</p>
              <p className="text-2xl font-bold text-blue-600">{Object.keys(subjectStats).length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiCalendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Weekly Classes</p>
              <p className="text-2xl font-bold text-purple-600">{totalWeeklyClasses}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiClock className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Today's Classes</p>
              <p className="text-2xl font-bold text-green-600">{getTotalClassesForDay(selectedDay)}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <FiUser className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Active Days</p>
              <p className="text-2xl font-bold text-orange-600">{weekDays.length}</p>
            </div>
          </Card>
        </div>

        {/* Day Selector */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {weekDays.map(day => (
            <Card
              key={day}
              className={`cursor-pointer transition-all ${
                selectedDay === day ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedDay(day)}
            >
              <div className="text-center">
                <p className={`font-semibold ${selectedDay === day ? 'text-blue-600' : 'text-gray-900'}`}>
                  {day}
                </p>
                <p className="text-sm text-gray-600 mt-1">{getTotalClassesForDay(day)} classes</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Day Schedule */}
        <Card title={`${selectedDay}'s Schedule`}>
          <div className="space-y-3">
            {timetable[selectedDay].map((period, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${getPeriodColor(period.type)}`}
              >
                {period.type === 'class' ? (
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center">
                        <Badge variant="default">Period {period.period}</Badge>
                        <p className="text-xs text-gray-600 mt-1 flex items-center gap-1 justify-center">
                          <FiClock className="w-3 h-3" />
                          {period.time}
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FiBook className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold text-gray-900">{period.subject}</h4>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiUser className="w-4 h-4" />
                          <span>{period.teacher}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiMapPin className="w-4 h-4" />
                      <span className="font-medium">{period.room}</span>
                    </div>
                  </div>
                ) : period.type === 'break' ? (
                  <div className="text-center py-2">
                    <h4 className="font-semibold text-gray-900">{period.subject}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-1 justify-center mt-1">
                      <FiClock className="w-3 h-3" />
                      {period.time}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <Badge variant="default">Period {period.period}</Badge>
                    <p className="text-sm text-gray-600 mt-1">{period.time}</p>
                    <h4 className="font-semibold text-gray-500 mt-1">Free Period</h4>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subject-wise Classes */}
          <Card title="Subject-wise Classes">
            <div className="space-y-3">
              {Object.entries(subjectStats)
                .sort((a, b) => b[1].count - a[1].count)
                .map(([subject, data], index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <FiBook className="w-4 h-4 text-blue-600" />
                          <h4 className="font-medium text-gray-900">{subject}</h4>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{data.teacher}</p>
                      </div>
                      <Badge variant="info">{data.count} classes/week</Badge>
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          {/* Weekly Overview */}
          <Card title="Weekly Overview">
            <div className="space-y-3">
              {weekDays.map(day => {
                const classCount = getTotalClassesForDay(day);
                return (
                  <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-900 font-medium">{day}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{classCount} classes</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(classCount / 7) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Total Weekly Classes</span>
                  <Badge variant="success" size="lg">{totalWeeklyClasses}</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Upcoming Classes (Today's Remaining) */}
        <Card title="Today's Remaining Classes">
          <div className="space-y-2">
            {timetable[selectedDay]
              .filter(p => p.type === 'class')
              .slice(0, 3)
              .map((period, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <FiBook className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{period.subject}</h4>
                        <p className="text-sm text-gray-600">{period.teacher}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-gray-900">
                        <FiClock className="w-4 h-4" />
                        <span className="font-medium">{period.time.split(' - ')[0]}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <FiMapPin className="w-3 h-3" />
                        <span>{period.room}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {timetable[selectedDay].filter(p => p.type === 'class').length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No more classes for today!</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentTimetable;
