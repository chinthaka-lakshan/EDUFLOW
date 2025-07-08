export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  teacher: string;
  teacherId: string;
  category: string;
  level: string;
  duration: string;
  progress?: number;
  totalMaterials?: number;
  completedMaterials?: number;
  thumbnail?: string;
  studentsCount?: number;
  rating?: number;
  price?: string;
  lastUpdated?: string;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'document' | 'image';
  url: string;
  size?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  courseId: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  avatar?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
}