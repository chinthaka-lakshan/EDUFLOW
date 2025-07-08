import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Clock,
  Award,
  Target,
  PieChart,
  Activity,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Mock analytics data
  const overviewStats = [
    {
      id: 'students',
      title: 'Total Students',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      description: 'Active enrolled students'
    },
    {
      id: 'courses',
      title: 'Active Courses',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: BookOpen,
      color: 'emerald',
      description: 'Currently running courses'
    },
    {
      id: 'completion',
      title: 'Avg. Completion Rate',
      value: '87.3%',
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      color: 'purple',
      description: 'Course completion average'
    },
    {
      id: 'engagement',
      title: 'Engagement Score',
      value: '94.1',
      change: '+2.8',
      trend: 'up',
      icon: Activity,
      color: 'orange',
      description: 'Student engagement metric'
    }
  ];

  const coursePerformance = [
    { name: 'Introduction to React', students: 45, completion: 89, avgScore: 92, engagement: 95 },
    { name: 'Advanced JavaScript', students: 32, completion: 76, avgScore: 88, engagement: 87 },
    { name: 'UI/UX Design Principles', students: 67, completion: 94, avgScore: 91, engagement: 96 },
    { name: 'Digital Marketing', students: 89, completion: 82, avgScore: 85, engagement: 89 },
    { name: 'Web Development Fundamentals', students: 156, completion: 91, avgScore: 90, engagement: 93 }
  ];

  const studentActivity = [
    { day: 'Mon', logins: 234, submissions: 89, discussions: 45 },
    { day: 'Tue', logins: 267, submissions: 102, discussions: 52 },
    { day: 'Wed', logins: 298, submissions: 95, discussions: 48 },
    { day: 'Thu', logins: 245, submissions: 87, discussions: 41 },
    { day: 'Fri', logins: 289, submissions: 110, discussions: 58 },
    { day: 'Sat', logins: 156, submissions: 67, discussions: 32 },
    { day: 'Sun', logins: 134, submissions: 45, discussions: 28 }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-600 dark:text-blue-400',
        icon: 'bg-blue-600'
      },
      emerald: {
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        icon: 'bg-emerald-600'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        text: 'text-purple-600 dark:text-purple-400',
        icon: 'bg-purple-600'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        text: 'text-orange-600 dark:text-orange-400',
        icon: 'bg-orange-600'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Analytics Dashboard</h1>
              <p className="opacity-90">Comprehensive insights into your educational platform</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last year</option>
              </select>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {overviewStats.map((stat) => {
            const colors = getColorClasses(stat.color);
            const isExpanded = expandedCard === stat.id;
            
            return (
              <div
                key={stat.id}
                className={`${colors.bg} rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                onClick={() => toggleCardExpansion(stat.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${colors.icon} p-3 rounded-xl shadow-sm`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <p className={`text-2xl font-bold ${colors.text}`}>{stat.value}</p>
                  {isExpanded && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{stat.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Performance</h2>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {coursePerformance.map((course, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{course.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{course.students} students</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Completion</span>
                        <span className="font-medium text-gray-900 dark:text-white">{course.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                        <div 
                          className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${course.completion}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Avg Score</span>
                        <span className="font-medium text-gray-900 dark:text-white">{course.avgScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${course.avgScore}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Engagement</span>
                        <span className="font-medium text-gray-900 dark:text-white">{course.engagement}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                        <div 
                          className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${course.engagement}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Activity Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Activity</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Logins</span>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Submissions</span>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Discussions</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {studentActivity.map((day, index) => {
                const maxValue = Math.max(...studentActivity.map(d => Math.max(d.logins, d.submissions, d.discussions)));
                
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 text-xs font-medium text-gray-600 dark:text-gray-400">
                      {day.day}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(day.logins / maxValue) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-8">
                          {day.logins}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(day.submissions / maxValue) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-8">
                          {day.submissions}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(day.discussions / maxValue) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-8">
                          {day.discussions}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Peak Hours</h3>
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">9:00 AM - 11:00 AM</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Peak Activity</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">2:00 PM - 4:00 PM</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">High Activity</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">7:00 PM - 9:00 PM</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Moderate Activity</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Top Performers</h3>
              <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">1</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Alice Johnson</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">98.5% avg score</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">2</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Bob Smith</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">96.2% avg score</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">3</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Carol Davis</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">94.8% avg score</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quick Actions</h3>
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Generate Report
              </button>
              <button className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Export Data
              </button>
              <button className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Schedule Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};