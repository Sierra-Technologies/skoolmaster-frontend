import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import {
  FiHome,
  FiUsers,
  FiBook,
  FiCalendar,
  FiDollarSign,
  FiBarChart2,
  FiSettings,
  FiGrid,
  FiUserCheck,
  FiAward,
  FiMessageSquare,
  FiFileText,
  FiBriefcase,
  FiClock,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'super_admin':
        return [
          { icon: <FiHome />, label: 'Dashboard', path: '/superadmin/dashboard' },
          { icon: <FiGrid />, label: 'Schools', path: '/superadmin/schools' },
          { icon: <FiDollarSign />, label: 'Subscriptions', path: '/superadmin/subscriptions' },
          { icon: <FiBarChart2 />, label: 'Analytics', path: '/superadmin/analytics' },
          { icon: <FiSettings />, label: 'Settings', path: '/superadmin/settings' },
        ];

      case 'admin':
        return [
          { icon: <FiHome />, label: 'Dashboard', path: '/admin/dashboard' },
          { icon: <FiUsers />, label: 'Students', path: '/admin/students' },
          { icon: <FiUsers />, label: 'Teachers', path: '/admin/teachers' },
          { icon: <FiBook />, label: 'Classes', path: '/admin/classes' },
          { icon: <FiBook />, label: 'Subjects', path: '/admin/subjects' },
          { icon: <FiUserCheck />, label: 'Attendance', path: '/admin/attendance' },
          { icon: <FiAward />, label: 'Grades', path: '/admin/grades' },
          { icon: <FiClock />, label: 'Timetable', path: '/admin/timetable' },
          { icon: <FiDollarSign />, label: 'Fees', path: '/admin/fees' },
          { icon: <FiBriefcase />, label: 'Admissions', path: '/admin/admissions' },
          { icon: <FiMessageSquare />, label: 'Communication', path: '/admin/communication' },
          { icon: <FiFileText />, label: 'Reports', path: '/admin/reports' },
          { icon: <FiSettings />, label: 'Settings', path: '/admin/settings' },
        ];

      case 'teacher':
        return [
          { icon: <FiHome />, label: 'Dashboard', path: '/teacher/dashboard' },
          { icon: <FiBook />, label: 'My Classes', path: '/teacher/classes' },
          { icon: <FiUserCheck />, label: 'Attendance', path: '/teacher/attendance' },
          { icon: <FiAward />, label: 'Gradebook', path: '/teacher/gradebook' },
          { icon: <FiFileText />, label: 'Assignments', path: '/teacher/assignments' },
          { icon: <FiClock />, label: 'Timetable', path: '/teacher/timetable' },
          { icon: <FiUsers />, label: 'Students', path: '/teacher/students' },
          { icon: <FiMessageSquare />, label: 'Messages', path: '/teacher/messages' },
        ];

      case 'student':
        return [
          { icon: <FiHome />, label: 'Dashboard', path: '/student/dashboard' },
          { icon: <FiBook />, label: 'My Classes', path: '/student/classes' },
          { icon: <FiAward />, label: 'Grades', path: '/student/grades' },
          { icon: <FiUserCheck />, label: 'Attendance', path: '/student/attendance' },
          { icon: <FiFileText />, label: 'Assignments', path: '/student/assignments' },
          { icon: <FiClock />, label: 'Timetable', path: '/student/timetable' },
          { icon: <FiDollarSign />, label: 'Fees', path: '/student/fees' },
          { icon: <FiUsers />, label: 'Profile', path: '/student/profile' },
        ];

      case 'parent':
        return [
          { icon: <FiHome />, label: 'Dashboard', path: '/parent/dashboard' },
          { icon: <FiUsers />, label: 'Children', path: '/parent/children' },
          { icon: <FiAward />, label: 'Grades', path: '/parent/grades' },
          { icon: <FiUserCheck />, label: 'Attendance', path: '/parent/attendance' },
          { icon: <FiDollarSign />, label: 'Fees', path: '/parent/fees' },
          { icon: <FiMessageSquare />, label: 'Communication', path: '/parent/communication' },
          { icon: <FiClock />, label: 'Timetable', path: '/parent/timetable' },
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out',
          'w-64 lg:translate-x-0 lg:static',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-lg text-gray-900">SkoolMaster</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      )
                    }
                    onClick={() => window.innerWidth < 1024 && onClose()}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              SkoolMaster v1.0.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
