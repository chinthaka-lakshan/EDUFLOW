import React, { useState, useRef } from 'react';
import { 
  Upload, 
  File, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  X, 
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  Users,
  BarChart3,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: Date;
  course: string;
  status: 'uploading' | 'completed' | 'failed';
  progress: number;
  downloads: number;
  views: number;
}

export const UploadMaterials: React.FC = () => {
  const { addToast } = useToast();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'React Fundamentals - Introduction.mp4',
      type: 'video',
      size: '156 MB',
      uploadDate: new Date(Date.now() - 86400000),
      course: 'Introduction to React',
      status: 'completed',
      progress: 100,
      downloads: 45,
      views: 123
    },
    {
      id: '2',
      name: 'JavaScript ES6 Features.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: new Date(Date.now() - 172800000),
      course: 'Advanced JavaScript',
      status: 'completed',
      progress: 100,
      downloads: 32,
      views: 89
    },
    {
      id: '3',
      name: 'Component Lifecycle Diagram.png',
      type: 'image',
      size: '892 KB',
      uploadDate: new Date(Date.now() - 259200000),
      course: 'Introduction to React',
      status: 'completed',
      progress: 100,
      downloads: 28,
      views: 67
    }
  ]);

  const courses = [
    { id: '1', name: 'Introduction to React', students: 45 },
    { id: '2', name: 'Advanced JavaScript', students: 32 },
    { id: '3', name: 'Web Development Fundamentals', students: 67 }
  ];

  const stats = [
    {
      title: 'Total Files',
      value: uploadedFiles.length.toString(),
      icon: File,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Total Downloads',
      value: uploadedFiles.reduce((sum, file) => sum + file.downloads, 0).toString(),
      icon: Download,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      title: 'Total Views',
      value: uploadedFiles.reduce((sum, file) => sum + file.views, 0).toString(),
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Active Courses',
      value: courses.length.toString(),
      icon: BookOpen,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5 text-red-500" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-green-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'uploading':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (!selectedCourse) {
      addToast({
        type: 'error',
        title: 'Course Required',
        message: 'Please select a course before uploading files'
      });
      return;
    }

    Array.from(files).forEach(file => {
      // Validate file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        addToast({
          type: 'error',
          title: 'File Too Large',
          message: `${file.name} exceeds the 100MB limit`
        });
        return;
      }

      // Create new file entry
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.startsWith('video/') ? 'video' : 
              file.type.startsWith('image/') ? 'image' :
              file.type === 'application/pdf' ? 'pdf' : 'document',
        size: formatFileSize(file.size),
        uploadDate: new Date(),
        course: courses.find(c => c.id === selectedCourse)?.name || '',
        status: 'uploading',
        progress: 0,
        downloads: 0,
        views: 0
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      simulateUpload(newFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        setUploadedFiles(prev => 
          prev.map(file => 
            file.id === fileId 
              ? { ...file, status: 'completed', progress: 100 }
              : file
          )
        );
        clearInterval(interval);
        addToast({
          type: 'success',
          title: 'Upload Complete',
          message: 'File uploaded successfully'
        });
      } else {
        setUploadedFiles(prev => 
          prev.map(file => 
            file.id === fileId 
              ? { ...file, progress }
              : file
          )
        );
      }
    }, 200);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const deleteFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    addToast({
      type: 'success',
      title: 'File Deleted',
      message: 'File has been removed successfully'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Upload Materials</h1>
          <p className="opacity-90">Share resources and materials with your students</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-2xl p-6 border border-gray-200 dark:border-gray-700`}>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Select Course</h2>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Choose a course...</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.students} students)
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Area */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Upload Files</h2>
              
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Drop files here or click to upload
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Support for videos, PDFs, images, and documents up to 100MB
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!selectedCourse}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Choose Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov,.avi,.jpg,.jpeg,.png,.gif"
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Quiz</span>
                </button>
                <button className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Manage Courses</span>
                </button>
                <button className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upload Tips</h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Use descriptive file names</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Keep file sizes under 100MB</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Organize by course topics</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Include version numbers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Uploaded Files */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Uploads</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {uploadedFiles.length} files
            </span>
          </div>

          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">{file.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span>{file.size}</span>
                      <span>{file.course}</span>
                      <span>{file.uploadDate.toLocaleDateString()}</span>
                    </div>
                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                          <span>Uploading...</span>
                          <span>{Math.round(file.progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    {getStatusIcon(file.status)}
                    <span>{file.downloads} downloads</span>
                    <span>{file.views} views</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteFile(file.id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};