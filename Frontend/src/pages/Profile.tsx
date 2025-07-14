import React, { useState, useRef } from 'react';
import { User, Mail, Camera, BookOpen, Trophy, Clock, Edit3, Save, X, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  if (!user) return null;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        addToast({
          type: 'error',
          title: 'File Too Large',
          message: 'Please select an image smaller than 5MB'
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        addToast({
          type: 'error',
          title: 'Invalid File Type',
          message: 'Please select a valid image file'
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfileImage(imageUrl);
        updateUser({ avatar: imageUrl });
        addToast({
          type: 'success',
          title: 'Profile Image Updated',
          message: 'Your profile image has been successfully updated'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!editForm.name.trim() || !editForm.email.trim()) {
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all fields'
      });
      return;
    }

    updateUser({
      name: editForm.name.trim(),
      email: editForm.email.trim(),
    });

    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile has been successfully updated'
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      email: user.email,
    });
    setIsEditing(false);
  };

  const userStats = user.role === 'student' ? [
    { label: 'Courses Enrolled', value: '12', icon: BookOpen, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Courses Completed', value: '8', icon: Trophy, color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Total Study Hours', value: '124', icon: Clock, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Average Quiz Score', value: '87%', icon: Trophy, color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-50 dark:bg-orange-900/20' }
  ] : [
    { label: 'Courses Created', value: '6', icon: BookOpen, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Total Students', value: '156', icon: User, color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Materials Uploaded', value: '43', icon: Upload, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Average Rating', value: '4.8', icon: Trophy, color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-50 dark:bg-orange-900/20' }
  ];

  const recentActivity = user.role === 'student' ? [
    { activity: 'Completed "React Hooks" lesson', time: '2 hours ago', type: 'course' },
    { activity: 'Scored 92% on JavaScript Quiz', time: '1 day ago', type: 'quiz' },
    { activity: 'Enrolled in "Advanced CSS" course', time: '3 days ago', type: 'course' },
    { activity: 'Posted question in discussion forum', time: '5 days ago', type: 'discussion' }
  ] : [
    { activity: 'Created new quiz for React course', time: '1 hour ago', type: 'quiz' },
    { activity: 'Uploaded video material', time: '4 hours ago', type: 'material' },
    { activity: 'Responded to student questions', time: '1 day ago', type: 'discussion' },
    { activity: 'Updated course curriculum', time: '3 days ago', type: 'course' }
  ];

  const currentProfileImage = profileImage || user.avatar;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Profile Header - Removed cover photo */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="px-6 sm:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Profile Image */}
                <div className="relative group">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white dark:bg-gray-800 rounded-full border-4 border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
                    {currentProfileImage ? (
                      <img 
                        src={currentProfileImage} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
                        <User className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-blue-500/20"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                
                {/* User Info */}
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 capitalize mb-3">{user.role}</p>
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{user.email}</span>
                  </div>
                </div>
              </div>
              
              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-6 sm:mt-0"
              >
                <Edit3 className="w-5 h-5" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {userStats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.activity}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Account Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</label>
                  <p className="text-gray-900 dark:text-white font-medium mt-1">{user.name}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email Address</label>
                  <p className="text-gray-900 dark:text-white font-medium mt-1">{user.email}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Role</label>
                  <p className="text-gray-900 dark:text-white font-medium capitalize mt-1">{user.role}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Member Since</label>
                  <p className="text-gray-900 dark:text-white font-medium mt-1">January 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 mt-8">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};