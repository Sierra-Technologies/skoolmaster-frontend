import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { FiClock, FiMapPin, FiBook } from 'react-icons/fi';

const TeacherTimetable = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const timetable = {
    Monday: [
      { period: 1, time: '08:00 - 09:00', class: '10-A', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 2, time: '09:00 - 10:00', class: '12-A', subject: 'Physics', room: '203', type: 'class' },
      { period: 3, time: '10:00 - 11:00', class: 'Free', subject: '', room: '', type: 'free' },
      { period: 4, time: '11:00 - 12:00', class: '11-A', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 5, time: '12:00 - 01:00', class: 'Lunch Break', subject: '', room: '', type: 'break' },
      { period: 6, time: '01:00 - 02:00', class: 'Free', subject: '', room: '', type: 'free' },
      { period: 7, time: '02:00 - 03:00', class: '11-B', subject: 'Mathematics', room: '201', type: 'class' },
    ],
    Tuesday: [
      { period: 1, time: '08:00 - 09:00', class: 'Free', subject: '', room: '', type: 'free' },
      { period: 2, time: '09:00 - 10:00', class: '11-A', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 3, time: '10:00 - 11:00', class: '10-A', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 4, time: '11:00 - 12:00', class: '11-B', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 5, time: '12:00 - 01:00', class: 'Lunch Break', subject: '', room: '', type: 'break' },
      { period: 6, time: '01:00 - 02:00', class: '12-A', subject: 'Physics', room: '203', type: 'class' },
      { period: 7, time: '02:00 - 03:00', class: 'Free', subject: '', room: '', type: 'free' },
    ],
    Wednesday: [
      { period: 1, time: '08:00 - 09:00', class: '10-A', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 2, time: '09:00 - 10:00', class: 'Free', subject: '', room: '', type: 'free' },
      { period: 3, time: '10:00 - 11:00', class: '11-A', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 4, time: '11:00 - 12:00', class: '12-A', subject: 'Physics', room: '203', type: 'class' },
      { period: 5, time: '12:00 - 01:00', class: 'Lunch Break', subject: '', room: '', type: 'break' },
      { period: 6, time: '01:00 - 02:00', class: 'Free', subject: '', room: '', type: 'free' },
      { period: 7, time: '02:00 - 03:00', class: '11-B', subject: 'Mathematics', room: '201', type: 'class' },
    ],
    Thursday: [
      { period: 1, time: '08:00 - 09:00', class: '11-A', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 2, time: '09:00 - 10:00', class: 'Free', subject: '', room: '', type: 'free' },
      { period: 3, time: '10:00 - 11:00', class: '11-B', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 4, time: '11:00 - 12:00', class: '10-A', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 5, time: '12:00 - 01:00', class: 'Lunch Break', subject: '', room: '', type: 'break' },
      { period: 6, time: '01:00 - 02:00', class: '12-A', subject: 'Physics', room: '203', type: 'class' },
      { period: 7, time: '02:00 - 03:00', class: 'Free', subject: '', room: '', type: 'free' },
    ],
    Friday: [
      { period: 1, time: '08:00 - 09:00', class: '12-A', subject: 'Physics', room: '203', type: 'class' },
      { period: 2, time: '09:00 - 10:00', class: '10-A', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 3, time: '10:00 - 11:00', class: '11-A', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 4, time: '11:00 - 12:00', class: 'Free', subject: '', room: '', type: 'free' },
      { period: 5, time: '12:00 - 01:00', class: 'Lunch Break', subject: '', room: '', type: 'break' },
      { period: 6, time: '01:00 - 02:00', class: '11-B', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 7, time: '02:00 - 03:00', class: 'Free', subject: '', room: '', type: 'free' },
    ],
    Saturday: [
      { period: 1, time: '08:00 - 09:00', class: '10-A', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 2, time: '09:00 - 10:00', class: '11-A', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 3, time: '10:00 - 11:00', class: '11-B', subject: 'Mathematics', room: '201', type: 'class' },
      { period: 4, time: '11:00 - 12:00', class: 'Free', subject: '', room: '', type: 'free' },
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Timetable</h1>
          <p className="text-gray-600 mt-1">View your weekly teaching schedule</p>
        </div>

        {/* Weekly Overview */}
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center">
                        <Badge variant="default">Period {period.period}</Badge>
                        <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          {period.time}
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FiBook className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold text-gray-900">{period.subject}</h4>
                        </div>
                        <p className="text-sm text-gray-600">Class {period.class}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiMapPin className="w-4 h-4" />
                        <span>Room {period.room}</span>
                      </div>
                    </div>
                  </div>
                ) : period.type === 'break' ? (
                  <div className="text-center py-2">
                    <h4 className="font-semibold text-gray-900">{period.class}</h4>
                    <p className="text-sm text-gray-600">{period.time}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Weekly Classes">
            <div className="space-y-3">
              {weekDays.map(day => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">{day}</span>
                  <Badge variant="info">{getTotalClassesForDay(day)} classes</Badge>
                </div>
              ))}
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <Badge variant="success">
                    {weekDays.reduce((sum, day) => sum + getTotalClassesForDay(day), 0)} classes
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Subjects Teaching">
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Mathematics</p>
                <p className="text-lg font-bold text-blue-600">3 Classes</p>
                <p className="text-xs text-gray-500">10-A, 11-A, 11-B</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Physics</p>
                <p className="text-lg font-bold text-green-600">1 Class</p>
                <p className="text-xs text-gray-500">12-A</p>
              </div>
            </div>
          </Card>

          <Card title="Today's Classes">
            <div className="space-y-2">
              {timetable[selectedDay]
                .filter(p => p.type === 'class')
                .map((period, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{period.subject}</p>
                        <p className="text-sm text-gray-600">Class {period.class}</p>
                      </div>
                      <p className="text-sm text-gray-500">{period.time.split(' - ')[0]}</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherTimetable;
