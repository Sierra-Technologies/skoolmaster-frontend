import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { FiBook, FiTrendingUp, FiTrendingDown, FiAward, FiFileText } from 'react-icons/fi';

const StudentGrades = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'English Literature', 'History'];

  const [grades] = useState([
    {
      id: 1,
      subject: 'Mathematics',
      code: 'MATH-101',
      midterm: 85,
      final: 88,
      assignment: 90,
      quiz: 82,
      practical: 0,
      total: 86.25,
      grade: 'A',
      gpa: 4.0,
      teacher: 'Prof. Sarah Johnson',
      breakdown: [
        { type: 'Mid-Term Exam', score: 85, maxScore: 100, weight: '25%', date: '2024-01-10' },
        { type: 'Final Exam', score: 88, maxScore: 100, weight: '25%', date: '2024-01-20' },
        { type: 'Assignments (Avg)', score: 90, maxScore: 100, weight: '30%', date: 'Various' },
        { type: 'Quizzes (Avg)', score: 82, maxScore: 100, weight: '20%', date: 'Various' }
      ],
      trend: 'up',
      previousGrade: 82.5,
      classAverage: 78.5,
      rank: 5,
      totalStudents: 30
    },
    {
      id: 2,
      subject: 'Physics',
      code: 'PHY-101',
      midterm: 90,
      final: 92,
      assignment: 88,
      quiz: 85,
      practical: 95,
      total: 90.0,
      grade: 'A+',
      gpa: 4.0,
      teacher: 'Prof. Michael Brown',
      breakdown: [
        { type: 'Mid-Term Exam', score: 90, maxScore: 100, weight: '20%', date: '2024-01-12' },
        { type: 'Final Exam', score: 92, maxScore: 100, weight: '20%', date: '2024-01-22' },
        { type: 'Assignments (Avg)', score: 88, maxScore: 100, weight: '25%', date: 'Various' },
        { type: 'Quizzes (Avg)', score: 85, maxScore: 100, weight: '15%', date: 'Various' },
        { type: 'Practical (Avg)', score: 95, maxScore: 100, weight: '20%', date: 'Various' }
      ],
      trend: 'up',
      previousGrade: 87.0,
      classAverage: 82.3,
      rank: 3,
      totalStudents: 30
    },
    {
      id: 3,
      subject: 'Chemistry',
      code: 'CHEM-101',
      midterm: 88,
      final: 85,
      assignment: 92,
      quiz: 90,
      practical: 88,
      total: 88.6,
      grade: 'A',
      gpa: 4.0,
      teacher: 'Dr. Emily Davis',
      breakdown: [
        { type: 'Mid-Term Exam', score: 88, maxScore: 100, weight: '20%', date: '2024-01-11' },
        { type: 'Final Exam', score: 85, maxScore: 100, weight: '20%', date: '2024-01-21' },
        { type: 'Assignments (Avg)', score: 92, maxScore: 100, weight: '25%', date: 'Various' },
        { type: 'Quizzes (Avg)', score: 90, maxScore: 100, weight: '15%', date: 'Various' },
        { type: 'Practical (Avg)', score: 88, maxScore: 100, weight: '20%', date: 'Various' }
      ],
      trend: 'down',
      previousGrade: 91.2,
      classAverage: 80.1,
      rank: 4,
      totalStudents: 30
    },
    {
      id: 4,
      subject: 'English Literature',
      code: 'ENG-101',
      midterm: 87,
      final: 90,
      assignment: 85,
      quiz: 88,
      practical: 0,
      total: 87.5,
      grade: 'A',
      gpa: 4.0,
      teacher: 'Ms. Lisa Anderson',
      breakdown: [
        { type: 'Mid-Term Exam', score: 87, maxScore: 100, weight: '25%', date: '2024-01-09' },
        { type: 'Final Exam', score: 90, maxScore: 100, weight: '25%', date: '2024-01-19' },
        { type: 'Assignments (Avg)', score: 85, maxScore: 100, weight: '30%', date: 'Various' },
        { type: 'Quizzes (Avg)', score: 88, maxScore: 100, weight: '20%', date: 'Various' }
      ],
      trend: 'up',
      previousGrade: 85.0,
      classAverage: 79.8,
      rank: 6,
      totalStudents: 30
    },
    {
      id: 5,
      subject: 'History',
      code: 'HIST-101',
      midterm: 80,
      final: 82,
      assignment: 85,
      quiz: 78,
      practical: 0,
      total: 81.25,
      grade: 'B+',
      gpa: 3.5,
      teacher: 'Mr. Robert Wilson',
      breakdown: [
        { type: 'Mid-Term Exam', score: 80, maxScore: 100, weight: '25%', date: '2024-01-08' },
        { type: 'Final Exam', score: 82, maxScore: 100, weight: '25%', date: '2024-01-18' },
        { type: 'Assignments (Avg)', score: 85, maxScore: 100, weight: '30%', date: 'Various' },
        { type: 'Quizzes (Avg)', score: 78, maxScore: 100, weight: '20%', date: 'Various' }
      ],
      trend: 'up',
      previousGrade: 79.5,
      classAverage: 76.2,
      rank: 8,
      totalStudents: 30
    }
  ]);

  const filteredGrades = selectedSubject === 'all'
    ? grades
    : grades.filter(g => g.subject === selectedSubject);

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'success';
    if (grade >= 85) return 'info';
    if (grade >= 80) return 'primary';
    if (grade >= 70) return 'warning';
    return 'danger';
  };

  const getLetterGradeColor = (letter) => {
    if (letter.startsWith('A')) return 'text-green-600';
    if (letter.startsWith('B')) return 'text-blue-600';
    if (letter.startsWith('C')) return 'text-yellow-600';
    if (letter.startsWith('D')) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleViewDetails = (grade) => {
    setSelectedGrade(grade);
    setShowDetailsModal(true);
  };

  const totalGPA = (grades.reduce((sum, g) => sum + g.gpa, 0) / grades.length).toFixed(2);
  const avgScore = (grades.reduce((sum, g) => sum + g.total, 0) / grades.length).toFixed(2);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Grades</h1>
          <p className="text-gray-600 mt-1">View your academic performance across all subjects</p>
        </div>

        {/* Overall Performance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Overall GPA</p>
              <p className="text-3xl font-bold text-green-600">{totalGPA}</p>
              <p className="text-xs text-gray-500 mt-1">out of 4.0</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-3xl font-bold text-blue-600">{avgScore}%</p>
              <p className="text-xs text-gray-500 mt-1">across all subjects</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Subjects</p>
              <p className="text-3xl font-bold text-purple-600">{grades.length}</p>
              <p className="text-xs text-gray-500 mt-1">this semester</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600">Class Rank</p>
              <p className="text-3xl font-bold text-orange-600">5</p>
              <p className="text-xs text-gray-500 mt-1">out of 30 students</p>
            </div>
          </Card>
        </div>

        {/* Filter */}
        <Card>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Filter by Subject:</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Grades List */}
        <div className="space-y-4">
          {filteredGrades.map((grade) => (
            <Card key={grade.id} hoverable>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiBook className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{grade.subject}</h3>
                      <p className="text-sm text-gray-600">{grade.code} • {grade.teacher}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getLetterGradeColor(grade.grade)}`}>
                      {grade.grade}
                    </div>
                    <p className="text-sm text-gray-600">GPA: {grade.gpa}</p>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="p-3 bg-purple-50 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Mid-Term</p>
                    <p className="text-lg font-bold text-purple-600">{grade.midterm}%</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Final</p>
                    <p className="text-lg font-bold text-blue-600">{grade.final}%</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Assignment</p>
                    <p className="text-lg font-bold text-green-600">{grade.assignment}%</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Quiz</p>
                    <p className="text-lg font-bold text-yellow-600">{grade.quiz}%</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Total</p>
                    <p className="text-lg font-bold text-orange-600">{grade.total}%</p>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      {grade.trend === 'up' ? (
                        <FiTrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <FiTrendingDown className="w-5 h-5 text-red-600" />
                      )}
                      <p className="text-sm text-gray-600">Trend</p>
                    </div>
                    <p className={`font-semibold ${grade.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {grade.trend === 'up' ? '+' : ''}{(grade.total - grade.previousGrade).toFixed(1)}% from last term
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Class Average</p>
                    <p className="font-semibold text-gray-900">{grade.classAverage}%</p>
                    <p className="text-xs text-gray-600">
                      You're {(grade.total - grade.classAverage).toFixed(1)}% above average
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Class Rank</p>
                    <p className="font-semibold text-gray-900">
                      #{grade.rank} of {grade.totalStudents}
                    </p>
                    <p className="text-xs text-gray-600">
                      Top {Math.round((grade.rank / grade.totalStudents) * 100)}%
                    </p>
                  </div>
                </div>

                {/* Action */}
                <div className="flex justify-end">
                  <button
                    onClick={() => handleViewDetails(grade)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                  >
                    <FiFileText className="w-4 h-4" />
                    View Detailed Breakdown
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredGrades.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500">No grades found for the selected subject.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Grade Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedGrade(null);
        }}
        title="Grade Breakdown"
        size="lg"
      >
        {selectedGrade && (
          <div className="space-y-6">
            {/* Subject Header */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedGrade.subject}</h3>
                  <p className="text-gray-600">{selectedGrade.code}</p>
                  <p className="text-sm text-gray-600 mt-1">Teacher: {selectedGrade.teacher}</p>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${getLetterGradeColor(selectedGrade.grade)}`}>
                    {selectedGrade.grade}
                  </div>
                  <p className="text-gray-600">GPA: {selectedGrade.gpa}</p>
                </div>
              </div>
            </div>

            {/* Overall Performance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Score</p>
                <p className="text-3xl font-bold text-blue-600">{selectedGrade.total}%</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Class Rank</p>
                <p className="text-3xl font-bold text-green-600">
                  #{selectedGrade.rank}
                </p>
                <p className="text-xs text-gray-600 mt-1">of {selectedGrade.totalStudents} students</p>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Score Breakdown</h4>
              <div className="space-y-3">
                {selectedGrade.breakdown.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{item.type}</p>
                        <p className="text-sm text-gray-600">
                          {item.date} • Weight: {item.weight}
                        </p>
                      </div>
                      <Badge variant={getGradeColor(item.score)} size="lg">
                        {item.score}/{item.maxScore}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.score >= 90
                            ? 'bg-green-500'
                            : item.score >= 80
                            ? 'bg-blue-500'
                            : item.score >= 70
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Comparison */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Performance Comparison</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">Your Score</span>
                  <Badge variant="success" size="lg">{selectedGrade.total}%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">Class Average</span>
                  <Badge variant="info" size="lg">{selectedGrade.classAverage}%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">Difference</span>
                  <Badge
                    variant={selectedGrade.total >= selectedGrade.classAverage ? 'success' : 'warning'}
                    size="lg"
                  >
                    {selectedGrade.total >= selectedGrade.classAverage ? '+' : ''}
                    {(selectedGrade.total - selectedGrade.classAverage).toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Trend Analysis */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                {selectedGrade.trend === 'up' ? (
                  <FiTrendingUp className="w-8 h-8 text-green-600" />
                ) : (
                  <FiTrendingDown className="w-8 h-8 text-red-600" />
                )}
                <div>
                  <p className="font-semibold text-gray-900">Performance Trend</p>
                  <p className={`text-sm ${selectedGrade.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedGrade.trend === 'up' ? 'Improved' : 'Declined'} by{' '}
                    {Math.abs(selectedGrade.total - selectedGrade.previousGrade).toFixed(1)}% from previous term
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Previous: {selectedGrade.previousGrade}% → Current: {selectedGrade.total}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default StudentGrades;
