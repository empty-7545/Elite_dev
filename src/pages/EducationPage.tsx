import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, FileText, BookOpen, Code, Bot, Trophy, Star, Target, Cloud, ChevronRight } from 'lucide-react';

interface EducationItem {
  id: string;
  type: 'degree' | 'certification' | 'course';
  title: string;
  institution: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  level: number;
  xp: number;
  specialization?: string;
  courses?: string[];
  focus?: string;
  status: 'completed' | 'in-progress' | 'planned';
}

const EducationPage: React.FC = () => {
  const [totalXP, setTotalXP] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);

  const educationData: EducationItem[] = [
    {
      id: 'hslc',
      type: 'degree',
      title: 'HSLC (Higher Secondary)',
      institution: 'Thambithotam Higher Secondary School, Ghandhigram',
      period: '2020 - 2022',
      description: 'Foundation in Biology with Mathematics. Started mathematical journey at age 17.',
      icon: <BookOpen className="w-6 h-6" />,
      level: 85,
      xp: 1500,
      focus: 'Biology with Mathematics',
      status: 'completed'
    },
    {
      id: 'btech',
      type: 'degree',
      title: 'Bachelor of Technology in Information Technology',
      institution: 'Madurai Kamarajar University',
      period: '2022 - 2025',
      description: 'Comprehensive IT program focusing on programming fundamentals and system architecture.',
      icon: <GraduationCap className="w-6 h-6" />,
      level: 92,
      xp: 2500,
      specialization: 'Programming Basics',
      courses: ['Network Basics', 'Distributed Systems', 'Data Structures', 'Algorithms'],
      status: 'in-progress'
    },
    {
      id: 'mca',
      type: 'degree',
      title: 'Master of Computer Application',
      institution: 'Anna University',
      period: '2025 - 2027',
      description: 'Advanced computer application studies with focus on software development and system design.',
      icon: <GraduationCap className="w-6 h-6" />,
      level: 95,
      xp: 3000,
      specialization: 'Software Development & System Design',
      courses: ['Advanced Data Structures', 'Software Architecture', 'System Design', 'Database Systems'],
      status: 'planned'
    },
    {
      id: 'cissp',
      type: 'certification',
      title: 'Certified Information Systems Security Professional (CISSP)',
      institution: 'Professional Certification',
      period: '2024',
      description: 'Advanced certification in information security, covering risk management and cryptography.',
      icon: <Award className="w-6 h-6" />,
      level: 90,
      xp: 2000,
      status: 'planned'
    },
    {
      id: 'aws',
      type: 'certification',
      title: 'AWS Certified Solutions Architect',
      institution: 'Amazon Web Services',
      period: '2024',
      description: 'Professional certification for designing distributed applications and systems on AWS.',
      icon: <Cloud className="w-6 h-6" />,
      level: 88,
      xp: 1800,
      status: 'planned'
    },
    {
      id: 'fullstack',
      type: 'certification',
      title: 'Full Stack Developer Certification',
      institution: 'Tech Institute',
      period: '2023',
      description: 'Comprehensive training in modern web development technologies including React and Node.js.',
      icon: <Code className="w-6 h-6" />,
      level: 94,
      xp: 2200,
      status: 'completed'
    },
    {
      id: 'tensorflow',
      type: 'certification',
      title: 'TensorFlow Developer Certificate',
      institution: 'Google',
      period: '2024',
      description: 'Building machine learning models using TensorFlow, focusing on neural networks.',
      icon: <Bot className="w-6 h-6" />,
      level: 87,
      xp: 1900,
      status: 'planned'
    },
    {
      id: 'react-course',
      type: 'course',
      title: 'Advanced React Patterns Masterclass',
      institution: 'Frontend Masters',
      period: '2023',
      description: 'Deep dive into advanced React patterns and performance optimization techniques.',
      icon: <Target className="w-4 h-4" />,
      level: 91,
      xp: 1200,
      status: 'completed'
    }
  ];

  useEffect(() => {
    const completed = educationData.filter(item => item.status === 'completed');
    const totalExp = completed.reduce((sum, item) => sum + item.xp, 0);
    setTotalXP(totalExp);
    setCompletedCount(completed.length);
  }, []);

  const getItemColor = (type: string) => {
    switch (type) {
      case 'degree': return 'from-green-400 to-green-600';
      case 'certification': return 'from-yellow-400 to-yellow-600';
      case 'course': return 'from-blue-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'degree': return <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'certification': return <Award className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'course': return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />;
      default: return <FileText className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'planned': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Planned';
      default: return 'Unknown';
    }
  };

  return (
    <div className="page-wrapper min-h-screen from-gray-900 via-black to-gray-800 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Stats */}
        <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl border border-green-500/30 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mr-2 sm:mr-3" />
                Education Journey
              </h1>
              <p className="text-sm sm:text-base text-green-300">Academic Progress: {completedCount}/{educationData.length} Completed</p>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6 w-full sm:w-auto justify-center sm:justify-end">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-400">{totalXP.toLocaleString()}</div>
                <div className="text-xs sm:text-sm text-gray-400">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-400">{Math.floor((completedCount / educationData.length) * 100)}%</div>
                <div className="text-xs sm:text-sm text-gray-400">Progress</div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs sm:text-sm mb-1">
              <span className="text-gray-300">Education Progress</span>
              <span className="text-gray-300">{completedCount}/{educationData.length} Completed</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 sm:h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 sm:h-3 rounded-full transition-all duration-1000"
                style={{ width: `${(completedCount / educationData.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Education Timeline */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white flex items-center">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mr-2 sm:mr-3" />
            Academic Timeline
          </h2>
          
          <div className="relative">
            {/* Timeline Line - Hidden on mobile, shown on larger screens */}
            <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-yellow-500 to-blue-500"></div>
            
            <div className="space-y-6 sm:space-y-8">
              {educationData.map((item, index) => (
                <div key={item.id} className="relative flex items-start">
                  {/* Timeline Node - Only shown on larger screens */}
                  <div className={`hidden sm:flex absolute left-4 w-8 h-8 rounded-full border-4 items-center justify-center z-10 ${
                    item.status === 'completed' 
                      ? 'bg-green-500 border-green-300' 
                      : item.status === 'in-progress'
                      ? 'bg-yellow-500 border-yellow-300'
                      : 'bg-blue-500 border-blue-300'
                  }`}>
                    {getTypeIcon(item.type)}
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-full sm:ml-16">
                    <div className={`relative group transition-all duration-300 hover:scale-105 
                      bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-green-500/50
                      p-4 sm:p-6 rounded-xl border backdrop-blur-sm`}
                    >
                      {/* Type Badge */}
                      <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 px-2 py-1 sm:px-3 sm:py-1 rounded-full flex items-center space-x-1 sm:space-x-2 ${
                        item.type === 'degree' ? 'bg-green-500' :
                        item.type === 'certification' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}>
                        {getTypeIcon(item.type)}
                        <span className="text-xs font-bold text-white uppercase">{item.type}</span>
                      </div>

                      {/* Status Badge */}
                      <div className={`absolute top-3 left-3 sm:top-4 sm:left-4 px-2 py-1 sm:px-3 sm:py-1 rounded-full flex items-center space-x-1 ${getStatusColor(item.status)}`}>
                        <span className="text-xs font-bold text-white">{getStatusText(item.status)}</span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 pt-12 sm:pt-8">
                        {/* Icon */}
                        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${getItemColor(item.type)}/20 border border-current/30 flex-shrink-0`}>
                          <div className="text-xl sm:text-2xl text-green-400">
                            {item.icon}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 w-full">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-2 sm:space-y-0">
                            <h3 className="text-lg sm:text-xl font-bold text-white pr-0 sm:pr-4">{item.title}</h3>
                            <span className="bg-gray-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm text-green-400 self-start">
                              {item.period}
                            </span>
                          </div>
                          
                          <p className="text-green-400 font-semibold mb-2 text-sm sm:text-base">{item.institution}</p>
                          <p className="text-gray-300 mb-4 text-sm sm:text-base">{item.description}</p>

                          {/* Additional Details */}
                          {item.specialization && (
                            <div className="mb-3">
                              <h4 className="text-green-400 font-semibold mb-1 text-sm sm:text-base">Specialization:</h4>
                              <p className="text-gray-300 text-sm sm:text-base">{item.specialization}</p>
                            </div>
                          )}
                          
                          {item.focus && (
                            <div className="mb-3">
                              <h4 className="text-green-400 font-semibold mb-1 text-sm sm:text-base">Focus:</h4>
                              <p className="text-gray-300 text-sm sm:text-base">{item.focus}</p>
                            </div>
                          )}

                          {item.courses && (
                            <div className="mb-3">
                              <h4 className="text-green-400 font-semibold mb-2 text-sm sm:text-base">Key Courses:</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.courses.map((course, i) => (
                                  <div key={i} className="bg-black/30 px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm text-gray-300">
                                    {course}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* XP Display */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-2 sm:space-y-0">
                            <div className="flex items-center text-yellow-400">
                              <Star className="w-4 h-4 mr-1" />
                              <span className="font-semibold text-sm sm:text-base">{item.xp} XP</span>
                            </div>
                            <div className="flex items-center text-green-400">
                              <Target className="w-4 h-4 mr-1" />
                              <span className="text-sm sm:text-base">{item.level}% Mastery</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievement Summary */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl border border-green-500/30">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mr-2" />
            Learning Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2" />
              <div className="text-white font-semibold text-sm sm:text-base">Academic Explorer</div>
              <div className="text-xs sm:text-sm text-gray-400">Pursuing continuous education</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-white font-semibold text-sm sm:text-base">Certification Hunter</div>
              <div className="text-xs sm:text-sm text-gray-400">Professional certifications earned</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30 sm:col-span-2 lg:col-span-1">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-white font-semibold text-sm sm:text-base">Lifelong Learner</div>
              <div className="text-xs sm:text-sm text-gray-400">Always acquiring new skills</div>
            </div>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-gray-400 mb-4 font-mono text-sm sm:text-base px-4">
            "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
