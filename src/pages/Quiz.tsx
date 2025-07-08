import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  Filter,
  Search,
  Trophy,
  Target,
  Brain,
  Zap,
  Star,
  Play,
  Users,
  Calendar
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export const Quiz: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user } = useAuth();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showQuizList, setShowQuizList] = useState(!id);

  // Enhanced quiz categories with subjects and difficulty levels
  const subjects = [
    { id: 'all', name: 'All Subjects', icon: BookOpen, color: 'text-gray-600' },
    { id: 'programming', name: 'Programming', icon: Brain, color: 'text-blue-600' },
    { id: 'design', name: 'Design', icon: Target, color: 'text-purple-600' },
    { id: 'business', name: 'Business', icon: Trophy, color: 'text-emerald-600' },
    { id: 'mathematics', name: 'Mathematics', icon: Zap, color: 'text-orange-600' }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels', color: 'text-gray-600' },
    { id: 'beginner', name: 'Beginner', color: 'text-emerald-600' },
    { id: 'intermediate', name: 'Intermediate', color: 'text-yellow-600' },
    { id: 'advanced', name: 'Advanced', color: 'text-red-600' }
  ];

  // Enhanced quiz data with categorization
  const quizzes = [
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Test your knowledge of React basics including components, props, and state management.',
      subject: 'programming',
      difficulty: 'beginner',
      questions: 15,
      timeLimit: 30,
      attempts: 2,
      maxAttempts: 3,
      score: 88,
      rating: 4.8,
      participants: 234,
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Advanced JavaScript Concepts',
      description: 'Deep dive into closures, prototypes, async programming, and ES6+ features.',
      subject: 'programming',
      difficulty: 'advanced',
      questions: 25,
      timeLimit: 45,
      attempts: 1,
      maxAttempts: 2,
      score: 92,
      rating: 4.9,
      participants: 156,
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'UI/UX Design Principles',
      description: 'Comprehensive assessment of design thinking, user research, and interface design.',
      subject: 'design',
      difficulty: 'intermediate',
      questions: 20,
      timeLimit: 35,
      attempts: 0,
      maxAttempts: 3,
      score: null,
      rating: 4.7,
      participants: 189,
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      title: 'Digital Marketing Strategy',
      description: 'Test your understanding of SEO, social media marketing, and content strategy.',
      subject: 'business',
      difficulty: 'intermediate',
      questions: 18,
      timeLimit: 40,
      attempts: 1,
      maxAttempts: 3,
      score: 76,
      rating: 4.6,
      participants: 298,
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      title: 'Calculus Fundamentals',
      description: 'Essential calculus concepts including derivatives, integrals, and limits.',
      subject: 'mathematics',
      difficulty: 'beginner',
      questions: 22,
      timeLimit: 50,
      attempts: 0,
      maxAttempts: 3,
      score: null,
      rating: 4.5,
      participants: 167,
      thumbnail: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      title: 'Advanced Statistics',
      description: 'Complex statistical analysis, hypothesis testing, and data interpretation.',
      subject: 'mathematics',
      difficulty: 'advanced',
      questions: 30,
      timeLimit: 60,
      attempts: 0,
      maxAttempts: 2,
      score: null,
      rating: 4.8,
      participants: 89,
      thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  // Mock quiz data for individual quiz
  const quiz = {
    id: 1,
    title: 'React Fundamentals Quiz',
    description: 'Test your knowledge of React fundamentals including components, props, state, and hooks.',
    timeLimit: 30,
    questions: [
      {
        id: 1,
        question: 'What is JSX in React?',
        options: [
          'A JavaScript library for building user interfaces',
          'A syntax extension for JavaScript that looks similar to XML/HTML',
          'A state management library',
          'A testing framework for React applications'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which hook is used to manage state in functional components?',
        options: [
          'useEffect',
          'useContext',
          'useState',
          'useReducer'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What is the purpose of useEffect hook?',
        options: [
          'To manage component state',
          'To perform side effects in functional components',
          'To optimize component rendering',
          'To handle form submissions'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'How do you pass data from parent to child component in React?',
        options: [
          'Using state',
          'Using props',
          'Using context',
          'Using refs'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is the virtual DOM in React?',
        options: [
          'A physical representation of the DOM',
          'A JavaScript representation of the real DOM kept in memory',
          'A CSS framework for React',
          'A testing tool for React components'
        ],
        correctAnswer: 1
      }
    ]
  };

  // Filter quizzes based on selected criteria
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || quiz.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted && !showQuizList) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted, showQuizList]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    
    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    
    addToast({
      type: score >= 70 ? 'success' : 'warning',
      title: 'Quiz Submitted!',
      message: `You scored ${score}% (${correctAnswers}/${quiz.questions.length} correct)`
    });
    
    setShowResults(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  const getSubjectIcon = (subject: string) => {
    const subjectData = subjects.find(s => s.id === subject);
    return subjectData ? subjectData.icon : BookOpen;
  };

  const startQuiz = (quizId: string) => {
    setShowQuizList(false);
    navigate(`/quiz/${quizId}`);
  };

  if (showQuizList) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Center</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Test your knowledge across different subjects and difficulty levels
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Subject Filter */}
              <div className="lg:w-64">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.id} value={difficulty.id}>
                      {difficulty.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Subject Categories */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              const isActive = selectedSubject === subject.id;
              return (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
                  }`}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${isActive ? 'text-blue-600 dark:text-blue-400' : subject.color}`} />
                  <span className={`text-sm font-medium ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    {subject.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quiz Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => {
              const SubjectIcon = getSubjectIcon(quiz.subject);
              return (
                <div
                  key={quiz.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Quiz Image */}
                  <div className="relative h-48">
                    <img 
                      src={quiz.thumbnail} 
                      alt={quiz.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-lg">
                      <SubjectIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    {quiz.score !== null && (
                      <div className="absolute bottom-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {quiz.score}%
                      </div>
                    )}
                  </div>

                  {/* Quiz Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {quiz.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {quiz.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{quiz.timeLimit} min</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>{quiz.questions} questions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{quiz.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{quiz.participants}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {quiz.attempts > 0 ? (
                          <span>Attempts: {quiz.attempts}/{quiz.maxAttempts}</span>
                        ) : (
                          <span>Not attempted</span>
                        )}
                      </div>
                      <button
                        onClick={() => startQuiz(quiz.id)}
                        disabled={quiz.attempts >= quiz.maxAttempts}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>{quiz.attempts > 0 ? 'Retake' : 'Start'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredQuizzes.length === 0 && (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No quizzes found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showResults) {
    const correctAnswers = quiz.questions.filter((question, index) => 
      selectedAnswers[index] === question.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            score >= 70 ? 'bg-emerald-100 dark:bg-emerald-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'
          }`}>
            {score >= 70 ? (
              <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertCircle className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quiz Complete!</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            You scored <span className="font-bold text-blue-600 dark:text-blue-400">{score}%</span>
          </p>
          
          <div className="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{correctAnswers}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{quiz.questions.length - correctAnswers}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Incorrect</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{quiz.questions.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/quizzes')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Quizzes
            </button>
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
              }}
              className="block mx-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Review Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{quiz.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{quiz.description}</p>
          </div>
          <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
            <Clock className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="font-mono text-lg font-bold text-red-600 dark:text-red-400">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {quiz.questions[currentQuestion].question}
        </h2>
        
        <div className="space-y-4">
          {quiz.questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestion, index)}
              disabled={isSubmitted}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-gray-900 dark:text-white">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-4">
          {/* Question indicators */}
          <div className="flex items-center space-x-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : selectedAnswers[index] !== undefined
                    ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {currentQuestion === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};