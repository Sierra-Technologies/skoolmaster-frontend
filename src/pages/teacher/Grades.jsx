import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import { FiSave, FiDownload, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import toast from 'react-hot-toast';

const TeacherGrades = () => {
  const [selectedClass, setSelectedClass] = useState('10-A-Math');
  const [selectedExam, setSelectedExam] = useState('midterm');

  const classes = [
    { id: '10-A-Math', name: 'Class 10-A - Mathematics' },
    { id: '11-A-Math', name: 'Class 11-A - Mathematics' },
    { id: '12-A-Physics', name: 'Class 12-A - Physics' },
    { id: '11-B-Math', name: 'Class 11-B - Mathematics' }
  ];

  const exams = [
    { id: 'midterm', name: 'Mid-Term Exam', maxMarks: 100 },
    { id: 'final', name: 'Final Exam', maxMarks: 100 },
    { id: 'quiz1', name: 'Quiz 1', maxMarks: 20 },
    { id: 'quiz2', name: 'Quiz 2', maxMarks: 20 },
    { id: 'assignment1', name: 'Assignment 1', maxMarks: 30 },
    { id: 'assignment2', name: 'Assignment 2', maxMarks: 30 }
  ];

  const [grades, setGrades] = useState([
    { id: 1, rollNo: '001', name: 'John Doe', midterm: 85, final: 88, quiz1: 18, quiz2: 16, assignment1: 28, assignment2: 26 },
    { id: 2, rollNo: '002', name: 'Jane Smith', midterm: 92, final: 95, quiz1: 19, quiz2: 20, assignment1: 29, assignment2: 28 },
    { id: 3, rollNo: '003', name: 'Mike Johnson', midterm: 78, final: 82, quiz1: 15, quiz2: 17, assignment1: 24, assignment2: 25 },
    { id: 4, rollNo: '004', name: 'Sarah Williams', midterm: 88, final: 90, quiz1: 18, quiz2: 19, assignment1: 27, assignment2: 28 },
    { id: 5, rollNo: '005', name: 'David Brown', midterm: 72, final: 75, quiz1: 14, quiz2: 15, assignment1: 22, assignment2: 23 },
    { id: 6, rollNo: '006', name: 'Emily Davis', midterm: 95, final: 97, quiz1: 20, quiz2: 19, assignment1: 30, assignment2: 29 },
    { id: 7, rollNo: '007', name: 'James Wilson', midterm: 80, final: 83, quiz1: 16, quiz2: 17, assignment1: 25, assignment2: 26 },
    { id: 8, rollNo: '008', name: 'Lisa Anderson', midterm: 68, final: 70, quiz1: 13, quiz2: 14, assignment1: 20, assignment2: 21 },
  ]);

  const handleGradeUpdate = (studentId, field, value) => {
    setGrades(grades.map(grade =>
      grade.id === studentId ? { ...grade, [field]: parseFloat(value) || 0 } : grade
    ));
  };

  const calculateTotal = (student) => {
    return student.midterm + student.final + student.quiz1 + student.quiz2 + student.assignment1 + student.assignment2;
  };

  const calculatePercentage = (student) => {
    const total = calculateTotal(student);
    const maxTotal = 100 + 100 + 20 + 20 + 30 + 30; // Total possible marks
    return ((total / maxTotal) * 100).toFixed(2);
  };

  const getLetterGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'B+';
    if (percentage >= 75) return 'B';
    if (percentage >= 70) return 'C+';
    if (percentage >= 65) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const handleSave = () => {
    toast.success('Grades saved successfully!');
  };

  const handleExport = () => {
    toast.success('Grade report exported!');
  };

  // Calculate class statistics
  const classStats = () => {
    const percentages = grades.map(g => parseFloat(calculatePercentage(g)));
    const average = (percentages.reduce((sum, p) => sum + p, 0) / percentages.length).toFixed(2);
    const highest = Math.max(...percentages).toFixed(2);
    const lowest = Math.min(...percentages).toFixed(2);
    const passing = percentages.filter(p => p >= 60).length;
    const passRate = ((passing / grades.length) * 100).toFixed(1);

    return { average, highest, lowest, passing, passRate };
  };

  const stats = classStats();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Grades</h1>
            <p className="text-gray-600 mt-1">Enter and manage student grades</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleExport} variant="outline">
              <FiDownload className="mr-2" />
              Export Report
            </Button>
            <Button onClick={handleSave}>
              <FiSave className="mr-2" />
              Save Grades
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Filter by Exam
              </label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Assessments</option>
                {exams.map(exam => (
                  <option key={exam.id} value={exam.id}>{exam.name}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Class Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Class Average</p>
              <p className="text-2xl font-bold text-blue-600">{stats.average}%</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Highest Score</p>
              <p className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                <FiTrendingUp className="w-5 h-5" />
                {stats.highest}%
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Lowest Score</p>
              <p className="text-2xl font-bold text-red-600 flex items-center justify-center gap-1">
                <FiTrendingDown className="w-5 h-5" />
                {stats.lowest}%
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Passing Students</p>
              <p className="text-2xl font-bold text-purple-600">{stats.passing}/{grades.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Pass Rate</p>
              <p className="text-2xl font-bold text-indigo-600">{stats.passRate}%</p>
            </div>
          </Card>
        </div>

        {/* Grades Table */}
        <Card title="Student Grades">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Roll No</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Student Name</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Mid-Term<br/>(100)</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Final<br/>(100)</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Quiz 1<br/>(20)</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Quiz 2<br/>(20)</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Assgn 1<br/>(30)</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Assgn 2<br/>(30)</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Total</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">%</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {grades.map((student) => {
                  const percentage = calculatePercentage(student);
                  const letterGrade = getLetterGrade(percentage);

                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{student.rollNo}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{student.name}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={student.midterm}
                          onChange={(e) => handleGradeUpdate(student.id, 'midterm', e.target.value)}
                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={student.final}
                          onChange={(e) => handleGradeUpdate(student.id, 'final', e.target.value)}
                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={student.quiz1}
                          onChange={(e) => handleGradeUpdate(student.id, 'quiz1', e.target.value)}
                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={student.quiz2}
                          onChange={(e) => handleGradeUpdate(student.id, 'quiz2', e.target.value)}
                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={student.assignment1}
                          onChange={(e) => handleGradeUpdate(student.id, 'assignment1', e.target.value)}
                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={student.assignment2}
                          onChange={(e) => handleGradeUpdate(student.id, 'assignment2', e.target.value)}
                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-900">
                        {calculateTotal(student)}
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-blue-600">
                        {percentage}%
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge
                          variant={
                            letterGrade.startsWith('A') ? 'success' :
                            letterGrade.startsWith('B') ? 'info' :
                            letterGrade.startsWith('C') ? 'warning' :
                            'error'
                          }
                        >
                          {letterGrade}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Grade Distribution */}
        <Card title="Grade Distribution">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'].map(grade => {
              const count = grades.filter(g => getLetterGrade(calculatePercentage(g)) === grade).length;
              return (
                <div key={grade} className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-600">{grade}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherGrades;
