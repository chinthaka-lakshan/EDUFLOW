import React, { useState, useRef } from 'react';
import { BookOpen, Upload, Plus, X, Save, Eye, Calendar, Clock, Users, Target, Video, FileText, Image as ImageIcon, ChevronDown, ChevronUp, Contrast as DragDropContext, Cable as Draggable, Droplet as Droppable } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isExpanded: boolean;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration?: string;
  content?: string;
  videoUrl?: string;
  order: number;
}

export const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user } = useAuth();
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    duration: '',
    price: '',
    thumbnail: '',
    tags: [] as string[],
    prerequisites: [] as string[],
    learningObjectives: [] as string[],
    schedule: {
      startDate: '',
      endDate: '',
      timezone: 'UTC'
    }
  });

  const [modules, setModules] = useState<CourseModule[]>([]);
  const [newTag, setNewTag] = useState('');
  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [newObjective, setNewObjective] = useState('');

  const categories = [
    'Programming',
    'Design',
    'Business',
    'Marketing',
    'Data Science',
    'Mathematics',
    'Languages',
    'Arts'
  ];

  const levels = [
    { value: 'beginner', label: 'Beginner', color: 'emerald' },
    { value: 'intermediate', label: 'Intermediate', color: 'yellow' },
    { value: 'advanced', label: 'Advanced', color: 'red' }
  ];

  const steps = [
    { id: 1, title: 'Basic Information', description: 'Course details and metadata' },
    { id: 2, title: 'Course Content', description: 'Modules and lessons structure' },
    { id: 3, title: 'Settings & Schedule', description: 'Pricing and timeline' },
    { id: 4, title: 'Review & Publish', description: 'Final review and publication' }
  ];

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast({
          type: 'error',
          title: 'File Too Large',
          message: 'Please select an image smaller than 5MB'
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setCourseData(prev => ({ ...prev, thumbnail: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !courseData.tags.includes(newTag.trim())) {
      setCourseData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCourseData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addPrerequisite = () => {
    if (newPrerequisite.trim() && !courseData.prerequisites.includes(newPrerequisite.trim())) {
      setCourseData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites, newPrerequisite.trim()]
      }));
      setNewPrerequisite('');
    }
  };

  const removePrerequisite = (prereqToRemove: string) => {
    setCourseData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter(prereq => prereq !== prereqToRemove)
    }));
  };

  const addLearningObjective = () => {
    if (newObjective.trim() && !courseData.learningObjectives.includes(newObjective.trim())) {
      setCourseData(prev => ({
        ...prev,
        learningObjectives: [...prev.learningObjectives, newObjective.trim()]
      }));
      setNewObjective('');
    }
  };

  const removeLearningObjective = (objectiveToRemove: string) => {
    setCourseData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter(obj => obj !== objectiveToRemove)
    }));
  };

  const addModule = () => {
    const newModule: CourseModule = {
      id: Date.now().toString(),
      title: `Module ${modules.length + 1}`,
      description: '',
      lessons: [],
      isExpanded: true
    };
    setModules(prev => [...prev, newModule]);
  };

  const updateModule = (moduleId: string, updates: Partial<CourseModule>) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId ? { ...module, ...updates } : module
    ));
  };

  const deleteModule = (moduleId: string) => {
    setModules(prev => prev.filter(module => module.id !== moduleId));
  };

  const addLesson = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      const newLesson: Lesson = {
        id: Date.now().toString(),
        title: `Lesson ${module.lessons.length + 1}`,
        type: 'video',
        order: module.lessons.length,
        duration: '10'
      };
      
      updateModule(moduleId, {
        lessons: [...module.lessons, newLesson]
      });
    }
  };

  const updateLesson = (moduleId: string, lessonId: string, updates: Partial<Lesson>) => {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      const updatedLessons = module.lessons.map(lesson =>
        lesson.id === lessonId ? { ...lesson, ...updates } : lesson
      );
      updateModule(moduleId, { lessons: updatedLessons });
    }
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      const updatedLessons = module.lessons.filter(lesson => lesson.id !== lessonId);
      updateModule(moduleId, { lessons: updatedLessons });
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(courseData.title && courseData.description && courseData.category);
      case 2:
        return modules.length > 0 && modules.some(m => m.lessons.length > 0);
      case 3:
        return !!(courseData.duration && courseData.schedule.startDate);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      addToast({
        type: 'error',
        title: 'Incomplete Information',
        message: 'Please fill in all required fields before proceeding'
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePublish = () => {
    if (validateStep(currentStep)) {
      addToast({
        type: 'success',
        title: 'Course Published!',
        message: `${courseData.title} has been successfully published`
      });
      navigate('/my-courses');
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-red-500" />;
      case 'text':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'quiz':
        return <Target className="w-4 h-4 text-purple-500" />;
      case 'assignment':
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Basic Course Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={courseData.title}
                    onChange={(e) => setCourseData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter course title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    value={courseData.description}
                    onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Describe your course"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      value={courseData.category}
                      onChange={(e) => setCourseData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Level
                    </label>
                    <select
                      value={courseData.level}
                      onChange={(e) => setCourseData(prev => ({ ...prev, level: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {levels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="Add a tag"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {courseData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course Thumbnail */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Thumbnail
                  </label>
                  <div
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    {courseData.thumbnail ? (
                      <div className="relative">
                        <img
                          src={courseData.thumbnail}
                          alt="Course thumbnail"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCourseData(prev => ({ ...prev, thumbnail: '' }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">Click to upload thumbnail</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                  />
                </div>

                {/* Prerequisites */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prerequisites
                  </label>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={newPrerequisite}
                      onChange={(e) => setNewPrerequisite(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
                      className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="Add a prerequisite"
                    />
                    <button
                      type="button"
                      onClick={addPrerequisite}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {courseData.prerequisites.map((prereq, index) => (
                      <div
                        key={index}
                        className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 flex items-center justify-between"
                      >
                        <span className="text-emerald-800 dark:text-emerald-300 text-sm">{prereq}</span>
                        <button
                          type="button"
                          onClick={() => removePrerequisite(prereq)}
                          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Objectives */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Learning Objectives
                  </label>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={newObjective}
                      onChange={(e) => setNewObjective(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLearningObjective())}
                      className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="Add a learning objective"
                    />
                    <button
                      type="button"
                      onClick={addLearningObjective}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {courseData.learningObjectives.map((objective, index) => (
                      <div
                        key={index}
                        className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3 flex items-center justify-between"
                      >
                        <span className="text-purple-800 dark:text-purple-300 text-sm">{objective}</span>
                        <button
                          type="button"
                          onClick={() => removeLearningObjective(objective)}
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Course Modules</h3>
              <button
                onClick={addModule}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Module</span>
              </button>
            </div>

            <div className="space-y-4">
              {modules.map((module, moduleIndex) => (
                <div key={module.id} className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                          {moduleIndex + 1}
                        </span>
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => updateModule(module.id, { title: e.target.value })}
                          className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white font-medium"
                          placeholder="Module title"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateModule(module.id, { isExpanded: !module.isExpanded })}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          {module.isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => deleteModule(module.id)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {module.isExpanded && (
                      <div className="mt-3">
                        <textarea
                          value={module.description}
                          onChange={(e) => updateModule(module.id, { description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                          placeholder="Module description"
                          rows={2}
                        />
                      </div>
                    )}
                  </div>

                  {module.isExpanded && (
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">Lessons</h4>
                        <button
                          onClick={() => addLesson(module.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Lesson</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                {lessonIndex + 1}.
                              </span>
                              <div className="flex items-center space-x-2">
                                {getLessonIcon(lesson.type)}
                                <select
                                  value={lesson.type}
                                  onChange={(e) => updateLesson(module.id, lesson.id, { type: e.target.value as any })}
                                  className="text-sm border border-gray-200 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                  <option value="video">Video</option>
                                  <option value="text">Text</option>
                                  <option value="quiz">Quiz</option>
                                  <option value="assignment">Assignment</option>
                                </select>
                              </div>
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => updateLesson(module.id, lesson.id, { title: e.target.value })}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white text-sm"
                                placeholder="Lesson title"
                              />
                              <input
                                type="text"
                                value={lesson.duration || ''}
                                onChange={(e) => updateLesson(module.id, lesson.id, { duration: e.target.value })}
                                className="w-20 text-sm border border-gray-200 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="10 min"
                              />
                              <button
                                onClick={() => deleteLesson(module.id, lesson.id)}
                                className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {modules.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No modules yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Start building your course by adding modules</p>
                <button
                  onClick={addModule}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Add Your First Module
                </button>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Duration *
                  </label>
                  <input
                    type="text"
                    value={courseData.duration}
                    onChange={(e) => setCourseData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., 8 weeks, 3 months"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                    <input
                      type="number"
                      value={courseData.price}
                      onChange={(e) => setCourseData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Leave empty for free course</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={courseData.schedule.startDate}
                    onChange={(e) => setCourseData(prev => ({ 
                      ...prev, 
                      schedule: { ...prev.schedule, startDate: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={courseData.schedule.endDate}
                    onChange={(e) => setCourseData(prev => ({ 
                      ...prev, 
                      schedule: { ...prev.schedule, endDate: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Timezone
                  </label>
                  <select
                    value={courseData.schedule.timezone}
                    onChange={(e) => setCourseData(prev => ({ 
                      ...prev, 
                      schedule: { ...prev.schedule, timezone: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time</option>
                    <option value="PST">Pacific Time</option>
                    <option value="GMT">Greenwich Mean Time</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">Ready to Publish!</h3>
              <p className="text-blue-700 dark:text-blue-300">
                Review your course details below and click publish when you're ready to make it available to students.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Course Overview</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Title:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{courseData.title || 'Untitled Course'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{courseData.category || 'No category'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Level:</span>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{courseData.level}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Duration:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{courseData.duration || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Price:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {courseData.price ? `$${courseData.price}` : 'Free'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Content Summary</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Modules:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{modules.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Lessons:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {modules.reduce((total, module) => total + module.lessons.length, 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Prerequisites:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{courseData.prerequisites.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Learning Objectives:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{courseData.learningObjectives.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {courseData.thumbnail && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">Course Thumbnail</h4>
                    <img
                      src={courseData.thumbnail}
                      alt="Course thumbnail"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Schedule</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Start Date:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {courseData.schedule.startDate || 'Not set'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">End Date:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {courseData.schedule.endDate || 'Not set'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Timezone:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{courseData.schedule.timezone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Course Preview</h1>
              <button
                onClick={() => setIsPreviewMode(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Back to Editor
              </button>
            </div>
            
            {/* Course preview content would go here */}
            <div className="text-center py-12">
              <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Course Preview</h3>
              <p className="text-gray-600 dark:text-gray-400">
                This is how your course will appear to students
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Create New Course</h1>
              <p className="opacity-90">Build an engaging learning experience for your students</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPreviewMode(true)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 transition-colors flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </button>
              <button
                onClick={() => navigate('/my-courses')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      currentStep >= step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-24 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center space-x-4">
            {currentStep === 4 ? (
              <button
                onClick={handlePublish}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Publish Course</span>
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};