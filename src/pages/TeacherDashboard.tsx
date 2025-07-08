import React from 'react';
import { Users, Upload, FileText, TrendingUp, Plus, Eye, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TeacherDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '156',
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      change: '+12%'
    },
    {
      title: 'Uploaded Files',
      value: '43',
      icon: Upload,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      change: '+5'
    },
    {
      title: 'Quiz Statistics',
      value: '89%',
      icon: FileText,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      change: '+3%'
    },
    {
      title: 'Avg. Performance',
      value: '92%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      change: '+7%'
    }
  ];

  const myCourses = [
    {
      id: 1,
      title: 'Introduction to React',
      studentsEnrolled: 45,
      completion: 78,
      materials: 12,
      quizzes: 5,
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      studentsEnrolled: 32,
      completion: 65,
      materials: 18,
      quizzes: 8,
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Web Development Fundamentals',
      studentsEnrolled: 67,
      completion: 82,
      materials: 15,
      quizzes: 6,
      thumbnail: 'https://images.pexels.com/photos/326508/pexels-photo-326508.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const recentActivity = [
    {
      type: 'enrollment',
      message: '5 new students enrolled in React course',
      time: '2 hours ago'
    },
    {
      type: 'quiz',
      message: 'JavaScript Quiz completed by 12 students',
      time: '4 hours ago'
    },
    {
      type: 'material',
      message: 'New video uploaded to Web Dev course',
      time: '1 day ago'
    },
    {
      type: 'message',
      message: '3 new messages in course discussions',
      time: '2 days ago'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Teacher Dashboard</h1>
            <p className="opacity-90">Manage your courses and track student progress</p>
          </div>
          <Link
            to="/create-course"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Course</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-200 dark:border-gray-700`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.textColor} dark:opacity-90`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Courses */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Courses</h2>
              <Link 
                to="/my-courses"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{course.title}</h3>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div>
                          <span className="font-medium">{course.studentsEnrolled}</span> Students
                        </div>
                        <div>
                          <span className="font-medium">{course.materials}</span> Materials
                        </div>
                        <div>
                          <span className="font-medium">{course.quizzes}</span> Quizzes
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Completion:</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 max-w-32">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.completion}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          {course.completion}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
            
            <div className="space-y-3">
              <Link
                to="/create-course"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 px-4 rounded-lg transition-colors text-center block flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Course</span>
              </Link>
              <Link
                to="/upload"
                className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium py-3 px-4 rounded-lg transition-colors text-center block flex items-center justify-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Material</span>
              </Link>
              <Link
                to="/quiz-management"
                className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium py-3 px-4 rounded-lg transition-colors text-center block flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Create Quiz</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};