import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, MoreVertical, Phone, Video, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';

export const Chat: React.FC = () => {
  const { user } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState('general');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatRooms = [
    { id: 'general', name: 'General Discussion', memberCount: 45, lastMessage: 'Hey everyone!', lastMessageTime: '2m ago' },
    { id: 'react-course', name: 'React Course', memberCount: 23, lastMessage: 'Great explanation on hooks!', lastMessageTime: '5m ago' },
    { id: 'javascript-help', name: 'JavaScript Help', memberCount: 31, lastMessage: 'Can someone help with this error?', lastMessageTime: '10m ago' },
    { id: 'project-discussion', name: 'Project Discussion', memberCount: 18, lastMessage: 'Let\'s discuss the final project', lastMessageTime: '1h ago' }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Dr. Sarah Johnson',
      message: 'Welcome everyone! Feel free to ask any questions about the React course.',
      timestamp: new Date(Date.now() - 3600000),
      avatar: ''
    },
    {
      id: '2',
      userId: '3',
      userName: 'Alice Cooper',
      message: 'Thank you Dr. Johnson! I have a question about useEffect hook.',
      timestamp: new Date(Date.now() - 3500000),
      avatar: ''
    },
    {
      id: '3',
      userId: '2',
      userName: 'Dr. Sarah Johnson',
      message: 'Great question Alice! The useEffect hook is used for side effects in functional components. It runs after the render cycle.',
      timestamp: new Date(Date.now() - 3400000),
      avatar: ''
    },
    {
      id: '4',
      userId: '4',
      userName: 'Bob Wilson',
      message: 'I\'m working on the homework assignment. The state management part is a bit confusing.',
      timestamp: new Date(Date.now() - 3200000),
      avatar: ''
    },
    {
      id: '5',
      userId: user?.id || '1',
      userName: user?.name || 'You',
      message: 'I can help with that Bob! State management becomes easier once you understand the flow.',
      timestamp: new Date(Date.now() - 3000000),
      avatar: ''
    }
  ]);

  const onlineUsers = [
    { id: '2', name: 'Dr. Sarah Johnson', role: 'teacher', status: 'online' },
    { id: '3', name: 'Alice Cooper', role: 'student', status: 'online' },
    { id: '4', name: 'Bob Wilson', role: 'student', status: 'away' },
    { id: '5', name: 'Carol Davis', role: 'student', status: 'online' },
    { id: '6', name: 'David Chen', role: 'student', status: 'offline' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      message: message.trim(),
      timestamp: new Date(),
      avatar: ''
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMessageTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const selectedRoomData = chatRooms.find(room => room.id === selectedRoom);

  return (
    <div className="h-[calc(100vh-120px)] flex bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Chat Rooms Sidebar */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Room List */}
        <div className="flex-1 overflow-y-auto">
          {chatRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedRoom === room.id ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">{room.name}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">{room.lastMessageTime}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{room.lastMessage}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{room.memberCount} members</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedRoomData?.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedRoomData?.memberCount} members
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.userId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[70%] ${msg.userId === user?.id ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {msg.userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className={`${msg.userId === user?.id ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'} rounded-2xl px-4 py-2`}>
                  {msg.userId !== user?.id && (
                    <p className="text-xs font-medium mb-1 opacity-70">{msg.userName}</p>
                  )}
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.userId === user?.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-3 rounded-full transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Online Users Sidebar */}
      <div className="w-64 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Online Users</h3>
        </div>
        <div className="p-4 space-y-3">
          {onlineUsers.map((user) => (
            <div key={user.id} className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-700 ${
                  user.status === 'online' ? 'bg-emerald-500' :
                  user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                <p className={`text-xs capitalize ${
                  user.role === 'teacher' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {user.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};