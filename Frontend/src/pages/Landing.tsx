import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Award, ArrowRight } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Header */}
      <header className="px-4 lg:px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">EduFlow</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Transform Your
                <span className="text-blue-600 dark:text-blue-400"> Learning</span>
                <br />
                Experience
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Join thousands of students and teachers on our modern learning platform. 
                Access courses, take quizzes, and connect with your learning community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Learning Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg font-medium transition-colors"
              >
                Sign In
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 p-3 rounded-full w-fit mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Interactive Courses</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Engaging content with multimedia</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full w-fit mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Live Chat</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Connect with peers and teachers</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-full w-fit mx-auto mb-3">
                  <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Track Progress</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Monitor your learning journey</p>
              </div>
            </div>
          </div>

          {/* Illustration/Image */}
          <div className="lg:pl-8">
            <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Welcome to EduFlow</h3>
                    <p className="text-blue-100">Your learning journey starts here</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Course Progress</span>
                      <span className="text-sm">75%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Quiz Score</span>
                      <span className="text-sm font-bold">92/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};