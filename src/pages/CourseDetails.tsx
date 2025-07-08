import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Play, 
  FileText, 
  Download, 
  Users, 
  Clock, 
  Star,
  ChevronRight,
  Video,
  File,
  Image as ImageIcon,
  BookOpen,
  CheckCircle,
  Lock,
  MessageCircle,
  ThumbsUp,
  Share2,
  Bookmark,
  Award,
  Target,
  TrendingUp
} from 'lucide-react';

export const CourseDetails: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('materials');
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  // Mock course data with enhanced interactive features
  const course = {
    id: 1,
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React including components, state management, hooks, and modern React patterns. This comprehensive course will take you from beginner to confident React developer with hands-on projects and real-world examples.',
    teacher: 'Dr. Sarah Johnson',
    teacherId: '1',
    rating: 4.8,
    studentsCount: 45,
    duration: '8 weeks',
    level: 'Beginner',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    certificate: true,
    skills: ['React Components', 'State Management', 'Hooks', 'JSX', 'Props'],
    prerequisites: ['Basic JavaScript', 'HTML/CSS', 'ES6 Fundamentals']
  };

  const modules = [
    {
      id: 1,
      title: 'Getting Started with React',
      lessons: 6,
      duration: '2 hours',
      completed: 6,
      materials: [
        {
          id: 1,
          title: 'Introduction to React Components',
          type: 'video' as const,
          duration: '25:30',
          size: '156 MB',
          completed: true,
          interactive: true
        },
        {
          id: 2,
          title: 'Setting up Development Environment',
          type: 'video' as const,
          duration: '18:45',
          size: '98 MB',
          completed: true,
          interactive: false
        },
        {
          id: 3,
          title: 'React Fundamentals Guide',
          type: 'pdf' as const,
          size: '2.4 MB',
          completed: true,
          interactive: false
        }
      ]
    },
    {
      id: 2,
      title: 'React Hooks Deep Dive',
      lessons: 8,
      duration: '3.5 hours',
      completed: 5,
      materials: [
        {
          id: 4,
          title: 'useState Hook Explained',
          type: 'video' as const,
          duration: '32:15',
          size: '198 MB',
          completed: true,
          interactive: true
        },
        {
          id: 5,
          title: 'useEffect Hook Patterns',
          type: 'video' as const,
          duration: '28:30',
          size: '165 MB',
          completed: true,
          interactive: true
        },
        {
          id: 6,
          title: 'Custom Hooks Workshop',
          type: 'video' as const,
          duration: '45:20',
          size: '287 MB',
          completed: false,
          interactive: true
        }
      ]
    },
    {
      id: 3,
      title: 'State Management & Context',
      lessons: 10,
      duration: '4 hours',
      completed: 3,
      materials: [
        {
          id: 7,
          title: 'Context API Fundamentals',
          type: 'video' as const,
          duration: '35:45',
          size: '220 MB',
          completed: true,
          interactive: true
        },
        {
          id: 8,
          title: 'Redux vs Context Comparison',
          type: 'document' as const,
          size: '1.8 MB',
          completed: false,
          interactive: false
        }
      ]
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: 'React Fundamentals Quiz',
      questions: 15,
      timeLimit: 30,
      attempts: 2,
      maxAttempts: 3,
      score: 88,
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Hooks and State Management',
      questions: 20,
      timeLimit: 45,
      attempts: 1,
      maxAttempts: 3,
      score: 92,
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Advanced React Patterns',
      questions: 12,
      timeLimit: 25,
      attempts: 0,
      maxAttempts: 3,
      score: null,
      difficulty: 'Advanced'
    }
  ];

  const discussions = [
    {
      id: 1,
      user: 'Alice Johnson',
      avatar: '',
      message: 'Great explanation on useEffect! Can someone help me understand the cleanup function better?',
      time: '2 hours ago',
      replies: 5,
      likes: 12
    },
    {
      id: 2,
      user: 'Bob Smith',
      avatar: '',
      message: 'The custom hooks section was amazing. Here\'s a practical example I built...',
      time: '1 day ago',
      replies: 8,
      likes: 24
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5 text-red-500" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'document':
        return <File className="w-5 h-5 text-blue-500" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300';
      case 'Intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Course Header */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8 shadow-lg">
          <div className="md:flex">
            <div className="md:w-2/5 relative">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {course.level}
                  </span>
                  <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium text-gray-900">{course.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-3/5 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{course.title}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{course.description}</p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Instructor: <span className="text-blue-600 dark:text-blue-400">{course.teacher}</span>
                </p>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Students</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{course.studentsCount}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Clock className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{course.duration}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <BookOpen className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Lessons</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{course.totalLessons}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Award className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Certificate</p>
                  <p className="font-semibold text-gray-900 dark:text-white">Yes</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Course Progress</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>{course.completedLessons} completed</span>
                  <span>{course.totalLessons - course.completedLessons} remaining</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  <Play className="w-5 h-5" />
                  <span>Continue Learning</span>
                </button>
                <button className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Prerequisites */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              Skills You'll Learn
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <BookOpen className="w-5 h-5 text-emerald-600 mr-2" />
              Prerequisites
            </h3>
            <div className="space-y-2">
              {course.prerequisites.map((prereq, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{prereq}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'materials', label: 'Course Content', icon: BookOpen },
                { id: 'quizzes', label: 'Quizzes', icon: FileText },
                { id: 'discussions', label: 'Discussions', icon: MessageCircle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Course Content Tab */}
            {activeTab === 'materials' && (
              <div className="space-y-4">
                {modules.map((module, moduleIndex) => (
                  <div key={module.id} className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex)}
                      className="w-full p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-bold">{moduleIndex + 1}</span>
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{module.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span>{module.lessons} lessons</span>
                            <span>{module.duration}</span>
                            <span className="flex items-center space-x-1">
                              <TrendingUp className="w-3 h-3" />
                              <span>{module.completed}/{module.lessons} completed</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(module.completed / module.lessons) * 100}%` }}
                          />
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedModule === moduleIndex ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </button>
                    
                    {expandedModule === moduleIndex && (
                      <div className="p-4 space-y-3 bg-white dark:bg-gray-800">
                        {module.materials.map((material) => (
                          <div 
                            key={material.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`p-2 rounded-lg ${material.completed ? 'bg-emerald-100 dark:bg-emerald-900/20' : 'bg-gray-100 dark:bg-gray-600'}`}>
                                {material.completed ? (
                                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                                ) : material.type === 'video' ? (
                                  <Video className="w-5 h-5 text-red-500" />
                                ) : (
                                  getFileIcon(material.type)
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                                  <span>{material.title}</span>
                                  {material.interactive && (
                                    <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full">
                                      Interactive
                                    </span>
                                  )}
                                </h4>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  <span>{material.size}</span>
                                  {material.type === 'video' && material.duration && (
                                    <span className="flex items-center space-x-1">
                                      <Play className="w-3 h-3" />
                                      <span>{material.duration}</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {material.completed && (
                                <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Completed</span>
                              )}
                              {!material.completed && (
                                <Lock className="w-4 h-4 text-gray-400" />
                              )}
                              <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Quizzes Tab */}
            {activeTab === 'quizzes' && (
              <div className="space-y-4">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{quiz.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
                            {quiz.difficulty}
                          </span>
                        </div>
                      </div>
                      {quiz.score !== null && (
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            quiz.score >= 80 
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-yellow-600 dark:text-yellow-400'
                          }`}>
                            {quiz.score}%
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Best Score</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>{quiz.questions} Questions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{quiz.timeLimit} Minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>{quiz.attempts}/{quiz.maxAttempts} Attempts</span>
                      </div>
                      <div className="md:text-right">
                        {quiz.attempts < quiz.maxAttempts && (
                          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            {quiz.attempts === 0 ? 'Start Quiz' : 'Retake'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Discussions Tab */}
            {activeTab === 'discussions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Course Discussions</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    New Discussion
                  </button>
                </div>
                
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                            {discussion.user.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">{discussion.user}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{discussion.time}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">{discussion.message}</p>
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{discussion.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span>{discussion.replies} replies</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};