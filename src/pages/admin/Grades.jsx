import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import { FiSearch, FiDownload, FiAward } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Grades = () => {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [searchTerm, setSearchTerm] = useState('');

  const [grades, setGrades] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      rollNo: '001',
      class: '10-A',
      subject: 'Mathematics',
      midTerm: 85,
      finalTerm: 90,
      assignment: 88,
      quiz: 92,
      total: 89,
      grade: 'A',
      remarks: 'Excellent'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      rollNo: '002',
      class: '10-A',
      subject: 'Mathematics',
      midTerm: 78,
      finalTerm: 82,
      assignment: 85,
      quiz: 80,
      total: 81,
      grade: 'B+',
      remarks: 'Good'
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      rollNo: '003',
      class: '10-A',
      subject: 'Mathematics',
      midTerm: 92,
      finalTerm: 95,
      assignment: 90,
      quiz: 94,
      total: 93,
      grade: 'A+',
      remarks: 'Outstanding'
    },
    {
      id: 4,
      studentName: 'Sarah Williams',
      rollNo: '004',
      class: '10-A',
      subject: 'Mathematics',
      midTerm: 65,
      finalTerm: 70,
      assignment: 72,
      quiz: 68,
      total: 69,
      grade: 'C+',
      remarks: 'Needs Improvement'
    }
  ]);

  const classes = ['10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];
  const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer Science'];

  const handleGradeUpdate = (studentId, field, value) => {
    setGrades(grades.map(grade => {
      if (grade.id === studentId) {
        const updatedGrade = { ...grade, [field]: parseFloat(value) || 0 };
        // Calculate total
        const total = ((updatedGrade.midTerm + updatedGrade.finalTerm + updatedGrade.assignment + updatedGrade.quiz) / 4).toFixed(2);
        updatedGrade.total = parseFloat(total);
        // Calculate letter grade
        updatedGrade.grade = getLetterGrade(updatedGrade.total);
        return updatedGrade;
      }
      return grade;
    }));
  };

  const getLetterGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 85) return 'A';
    if (score >= 80) return 'B+';
    if (score >= 75) return 'B';
    if (score >= 70) return 'C+';
    if (score >= 65) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'success';
    if (grade === 'B+' || grade === 'B') return 'info';
    if (grade === 'C+' || grade === 'C') return 'warning';
    return 'error';
  };

  const handleSaveGrades = () => {
    toast.success('Grades saved successfully!');
  };

  const handleExportGrades = () => {
    toast.success('Grades exported successfully!');
  };

  const filteredGrades = grades.filter(grade =>
    grade.class === selectedClass &&
    grade.subject === selectedSubject &&
    (grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     grade.rollNo.includes(searchTerm))
  );

  const stats = {
    averageScore: (filteredGrades.reduce((sum, g) => sum + g.total, 0) / filteredGrades.length).toFixed(2),
    highest: Math.max(...filteredGrades.map(g => g.total)),
    lowest: Math.min(...filteredGrades.map(g => g.total)),
    passRate: ((filteredGrades.filter(g => g.total >= 60).length / filteredGrades.length) * 100).toFixed(1)
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Grades Management</h1>
            <p className="text-gray-600 mt-1">Manage student grades and assessments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportGrades}>
              <FiDownload className="mr-2" />
              Export
            </Button>
            <Button onClick={handleSaveGrades}>
              Save Grades
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <option key={cls} value={cls}>Class {cls}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Student
              </label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or roll number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.averageScore}%</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Highest Score</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.highest}%</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Lowest Score</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{stats.lowest}%</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Pass Rate</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{stats.passRate}%</p>
            </div>
          </Card>
        </div>

        {/* Grades Table */}
        <Card title={`Grades for Class ${selectedClass} - ${selectedSubject}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Roll No</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Student Name</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Mid-Term</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Final-Term</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Assignment</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Quiz</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Total</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Grade</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{student.rollNo}</td>
                    <td className="py-3 px-4 text-gray-900 font-medium">{student.studentName}</td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={student.midTerm}
                        onChange={(e) => handleGradeUpdate(student.id, 'midTerm', e.target.value)}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={student.finalTerm}
                        onChange={(e) => handleGradeUpdate(student.id, 'finalTerm', e.target.value)}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={student.assignment}
                        onChange={(e) => handleGradeUpdate(student.id, 'assignment', e.target.value)}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={student.quiz}
                        onChange={(e) => handleGradeUpdate(student.id, 'quiz', e.target.value)}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-gray-900">{student.total}%</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={getGradeColor(student.grade)}>
                        {student.grade}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Grade Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Grade Distribution">
            <div className="space-y-3">
              {['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'].map(grade => {
                const count = filteredGrades.filter(g => g.grade === grade).length;
                const percentage = ((count / filteredGrades.length) * 100).toFixed(1);
                return (
                  <div key={grade} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Grade {grade}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-16 text-right">
                        {count} ({percentage}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Top Performers">
            <div className="space-y-3">
              {filteredGrades
                .sort((a, b) => b.total - a.total)
                .slice(0, 5)
                .map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-700' :
                        index === 1 ? 'bg-gray-200 text-gray-700' :
                        index === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{student.studentName}</p>
                        <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{student.total}%</p>
                      <Badge variant={getGradeColor(student.grade)} size="sm">
                        {student.grade}
                      </Badge>
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

export default Grades;
