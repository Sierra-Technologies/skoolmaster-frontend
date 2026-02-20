import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { FiClock, FiBook, FiUser } from 'react-icons/fi';

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState('10-A');

  const classes = ['10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];

  const timetableData = {
    '10-A': {
      Monday: [
        { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'John Smith', room: '201' },
        { time: '09:00 - 10:00', subject: 'English', teacher: 'Sarah Johnson', room: '202' },
        { time: '10:00 - 11:00', subject: 'Science', teacher: 'Michael Brown', room: '203' },
        { time: '11:00 - 12:00', subject: 'Social Studies', teacher: 'Emily Davis', room: '204' },
        { time: '12:00 - 01:00', subject: 'Break', teacher: '', room: '' },
        { time: '01:00 - 02:00', subject: 'Physical Education', teacher: 'David Wilson', room: 'Gym' },
        { time: '02:00 - 03:00', subject: 'Art', teacher: 'Lisa Anderson', room: '205' }
      ],
      Tuesday: [
        { time: '08:00 - 09:00', subject: 'Science', teacher: 'Michael Brown', room: '203' },
        { time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'John Smith', room: '201' },
        { time: '10:00 - 11:00', subject: 'English', teacher: 'Sarah Johnson', room: '202' },
        { time: '11:00 - 12:00', subject: 'Computer Science', teacher: 'James Taylor', room: 'Lab' },
        { time: '12:00 - 01:00', subject: 'Break', teacher: '', room: '' },
        { time: '01:00 - 02:00', subject: 'Music', teacher: 'Mary Martinez', room: '206' },
        { time: '02:00 - 03:00', subject: 'Social Studies', teacher: 'Emily Davis', room: '204' }
      ],
      Wednesday: [
        { time: '08:00 - 09:00', subject: 'English', teacher: 'Sarah Johnson', room: '202' },
        { time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'John Smith', room: '201' },
        { time: '10:00 - 11:00', subject: 'Science', teacher: 'Michael Brown', room: '203' },
        { time: '11:00 - 12:00', subject: 'Physical Education', teacher: 'David Wilson', room: 'Gym' },
        { time: '12:00 - 01:00', subject: 'Break', teacher: '', room: '' },
        { time: '01:00 - 02:00', subject: 'Social Studies', teacher: 'Emily Davis', room: '204' },
        { time: '02:00 - 03:00', subject: 'Computer Science', teacher: 'James Taylor', room: 'Lab' }
      ],
      Thursday: [
        { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'John Smith', room: '201' },
        { time: '09:00 - 10:00', subject: 'Science', teacher: 'Michael Brown', room: '203' },
        { time: '10:00 - 11:00', subject: 'English', teacher: 'Sarah Johnson', room: '202' },
        { time: '11:00 - 12:00', subject: 'Art', teacher: 'Lisa Anderson', room: '205' },
        { time: '12:00 - 01:00', subject: 'Break', teacher: '', room: '' },
        { time: '01:00 - 02:00', subject: 'Social Studies', teacher: 'Emily Davis', room: '204' },
        { time: '02:00 - 03:00', subject: 'Music', teacher: 'Mary Martinez', room: '206' }
      ],
      Friday: [
        { time: '08:00 - 09:00', subject: 'Science', teacher: 'Michael Brown', room: '203' },
        { time: '09:00 - 10:00', subject: 'English', teacher: 'Sarah Johnson', room: '202' },
        { time: '10:00 - 11:00', subject: 'Mathematics', teacher: 'John Smith', room: '201' },
        { time: '11:00 - 12:00', subject: 'Computer Science', teacher: 'James Taylor', room: 'Lab' },
        { time: '12:00 - 01:00', subject: 'Break', teacher: '', room: '' },
        { time: '01:00 - 02:00', subject: 'Physical Education', teacher: 'David Wilson', room: 'Gym' },
        { time: '02:00 - 03:00', subject: 'Social Studies', teacher: 'Emily Davis', room: '204' }
      ],
      Saturday: [
        { time: '08:00 - 09:00', subject: 'Activities', teacher: 'Various', room: 'Ground' },
        { time: '09:00 - 10:00', subject: 'Sports', teacher: 'David Wilson', room: 'Ground' },
        { time: '10:00 - 11:00', subject: 'Clubs', teacher: 'Various', room: 'Various' },
        { time: '11:00 - 12:00', subject: 'Library', teacher: 'Free Time', room: 'Library' }
      ]
    }
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-700 border-blue-300',
      'English': 'bg-purple-100 text-purple-700 border-purple-300',
      'Science': 'bg-green-100 text-green-700 border-green-300',
      'Social Studies': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Physical Education': 'bg-orange-100 text-orange-700 border-orange-300',
      'Computer Science': 'bg-indigo-100 text-indigo-700 border-indigo-300',
      'Art': 'bg-pink-100 text-pink-700 border-pink-300',
      'Music': 'bg-red-100 text-red-700 border-red-300',
      'Break': 'bg-gray-100 text-gray-700 border-gray-300',
      'Activities': 'bg-teal-100 text-teal-700 border-teal-300',
      'Sports': 'bg-lime-100 text-lime-700 border-lime-300',
      'Clubs': 'bg-cyan-100 text-cyan-700 border-cyan-300',
      'Library': 'bg-violet-100 text-violet-700 border-violet-300'
    };
    return colors[subject] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Timetable</h1>
          <p className="text-gray-600 mt-1">View class schedules and timetables</p>
        </div>

        {/* Class Selector */}
        <Card>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Select Class:
            </label>
            <div className="flex gap-2 flex-wrap">
              {classes.map(cls => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedClass === cls
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Timetable Grid */}
        <Card title={`Timetable for Class ${selectedClass}`}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-gray-50 p-3 text-left font-semibold text-gray-700">
                    Time
                  </th>
                  {weekDays.map(day => (
                    <th key={day} className="border border-gray-300 bg-gray-50 p-3 text-center font-semibold text-gray-700 min-w-[150px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetableData[selectedClass]?.Monday.map((slot, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-3 bg-gray-50 font-medium text-gray-700 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-gray-500" />
                        {slot.time}
                      </div>
                    </td>
                    {weekDays.map(day => {
                      const daySlot = timetableData[selectedClass]?.[day]?.[index];
                      return (
                        <td key={day} className="border border-gray-300 p-2">
                          {daySlot ? (
                            <div className={`p-3 rounded-lg border-2 ${getSubjectColor(daySlot.subject)}`}>
                              <div className="flex items-center gap-2 mb-1">
                                <FiBook className="w-4 h-4" />
                                <span className="font-semibold text-sm">{daySlot.subject}</span>
                              </div>
                              {daySlot.teacher && (
                                <div className="flex items-center gap-2 text-xs mb-1">
                                  <FiUser className="w-3 h-3" />
                                  <span>{daySlot.teacher}</span>
                                </div>
                              )}
                              {daySlot.room && (
                                <div className="text-xs">
                                  <Badge variant="info" size="sm">{daySlot.room}</Badge>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-center text-gray-400 text-sm">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Legend */}
        <Card title="Subject Legend">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              'Mathematics', 'English', 'Science', 'Social Studies',
              'Physical Education', 'Computer Science', 'Art', 'Music',
              'Activities', 'Sports', 'Clubs', 'Library'
            ].map(subject => (
              <div
                key={subject}
                className={`p-3 rounded-lg border-2 text-center ${getSubjectColor(subject)}`}
              >
                <span className="text-sm font-medium">{subject}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Weekly Summary">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Periods</span>
                <span className="font-semibold text-gray-900">42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Teaching Hours</span>
                <span className="font-semibold text-gray-900">35 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Break Hours</span>
                <span className="font-semibold text-gray-900">7 hours</span>
              </div>
            </div>
          </Card>

          <Card title="Popular Subjects">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Mathematics</span>
                <Badge variant="info">6 periods</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Science</span>
                <Badge variant="info">6 periods</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">English</span>
                <Badge variant="info">6 periods</Badge>
              </div>
            </div>
          </Card>

          <Card title="Teachers">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Teachers</span>
                <span className="font-semibold text-gray-900">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Today</span>
                <span className="font-semibold text-green-600">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">On Leave</span>
                <span className="font-semibold text-red-600">0</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Timetable;
