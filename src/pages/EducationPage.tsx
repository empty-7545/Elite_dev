import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, FileText, BookOpen, Shield, Code, Bot, Trophy, Star, Lock, Unlock, Brain, Target, Zap, Check, Cloud, ChevronRight } from 'lucide-react';

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
  unlocked: boolean;
  question: string;
  options: string[];
  correctAnswer: number;
  specialization?: string;
  courses?: string[];
  focus?: string;
}

const EducationPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<EducationItem | null>(null);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [totalXP, setTotalXP] = useState<number>(0);
  const [unlockedCount, setUnlockedCount] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const [educationData, setEducationData] = useState<EducationItem[]>([
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
      unlocked: true,
      question: 'What subjects did I focus on during my Higher Secondary education?',
      options: ['Physics & Chemistry', 'Biology & Mathematics', 'Commerce & Economics', 'Computer Science'],
      correctAnswer: 1,
      focus: 'Biology with Mathematics'
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
      unlocked: false,
      question: 'Which university am I currently pursuing my B.Tech from?',
      options: ['Anna University', 'Madurai Kamarajar University', 'VIT University', 'SRM University'],
      correctAnswer: 1,
      specialization: 'Programming Basics',
      courses: ['Network Basics', 'Distributed Systems']
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
      unlocked: false,
      question: 'What will be my specialization focus in the MCA program?',
      options: ['Web Development', 'Data Science', 'Software Development & System Design', 'Mobile App Development'],
      correctAnswer: 2,
      specialization: 'Software Development & System Design',
      courses: ['Data Structures', 'Algorithms', 'Software Design', 'Database Systems']
    },
    {
      id: 'cissp',
      type: 'certification',
      title: 'Certified Information Systems Security Professional (CISSP)',
      institution: 'Professional Certification',
      period: '2024',
      description: 'Advanced certification in information security, covering risk management and cryptography.',
      icon: <Shield className="w-6 h-6" />,
      level: 90,
      xp: 2000,
      unlocked: false,
      question: 'What does CISSP certification primarily focus on?',
      options: ['Web Development', 'Information Security & Risk Management', 'Database Administration', 'Mobile Development'],
      correctAnswer: 1
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
      unlocked: false,
      question: 'AWS Solutions Architect certification focuses on what primary skill?',
      options: ['Database Management', 'Designing Distributed Systems on Cloud', 'Frontend Development', 'Mobile App Security'],
      correctAnswer: 1
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
      unlocked: false,
      question: 'Which technologies are covered in Full Stack Development?',
      options: ['Only Frontend', 'React, Node.js & Cloud Services', 'Only Backend', 'Mobile Development'],
      correctAnswer: 1
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
      unlocked: false,
      question: 'TensorFlow certification focuses on which area of technology?',
      options: ['Web Development', 'Database Design', 'Machine Learning & Neural Networks', 'Mobile Apps'],
      correctAnswer: 2
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
      unlocked: false,
      question: 'Advanced React Patterns course focuses on what aspect?',
      options: ['Basic React', 'Performance Optimization & Advanced Patterns', 'Backend Integration', 'Mobile Development'],
      correctAnswer: 1
    },
    {
      id: 'cyber-ai',
      type: 'course',
      title: 'Cybersecurity in the Age of AI',
      institution: 'Security Conference',
      period: '2023',
      description: 'Exploring the intersection of artificial intelligence and cybersecurity.',
      icon: <Brain className="w-4 h-4" />,
      level: 86,
      xp: 1100,
      unlocked: false,
      question: 'This course explores the intersection of which two technologies?',
      options: ['Web & Mobile', 'AI & Cybersecurity', 'Database & Cloud', 'Frontend & Backend'],
      correctAnswer: 1
    }
  ]);

  useEffect(() => {
    const unlocked = educationData.filter(item => item.unlocked);
    const totalExp = unlocked.reduce((sum, item) => sum + item.xp, 0);
    setTotalXP(totalExp);
    setUnlockedCount(unlocked.length);
  }, [educationData]);

  const handleUnlockAttempt = (item: EducationItem) => {
    setSelectedItem(item);
    setShowQuiz(true);
    setSelectedAnswer(null);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || !selectedItem) return;
    
    if (selectedAnswer === selectedItem.correctAnswer) {
      // Correct answer - unlock the item
      setEducationData(prev => 
        prev.map(item => 
          item.id === selectedItem.id 
            ? { ...item, unlocked: true }
            : item
        )
      );
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
    
    setShowQuiz(false);
    setSelectedItem(null);
    setSelectedAnswer(null);
  };

  const handleNavigateToSkills = () => {
    window.location.href = '/skills';
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'degree': return 'from-green-400 to-green-600';
      case 'certification': return 'from-yellow-400 to-yellow-600';
      case 'course': return 'from-red-400 to-red-600';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Player Stats */}
        <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-green-900/30 to-yellow-900/30 rounded-xl border border-green-500/30 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mr-2 sm:mr-3" />
                Education Quest
              </h1>
              <p className="text-sm sm:text-base text-green-300">Academic Journey Unlocked: {unlockedCount}/{educationData.length}</p>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6 w-full sm:w-auto justify-center sm:justify-end">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-400">{totalXP.toLocaleString()}</div>
                <div className="text-xs sm:text-sm text-gray-400">Knowledge XP</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-400">{Math.floor((unlockedCount / educationData.length) * 100)}%</div>
                <div className="text-xs sm:text-sm text-gray-400">Journey Complete</div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs sm:text-sm mb-1">
              <span className="text-gray-300">Education Progress</span>
              <span className="text-gray-300">{unlockedCount}/{educationData.length} Unlocked</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 sm:h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-yellow-400 h-2 sm:h-3 rounded-full transition-all duration-1000"
                style={{ width: `${(unlockedCount / educationData.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Education Timeline */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white flex items-center">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mr-2 sm:mr-3" />
            Academic Achievement Tree
          </h2>
          
          <div className="relative">
            {/* Timeline Line - Hidden on mobile, shown on larger screens */}
            <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-yellow-500 to-red-500"></div>
            
            <div className="space-y-6 sm:space-y-8">
              {educationData.map((item, index) => (
                <div key={item.id} className="relative flex items-start">
                  {/* Timeline Node - Only shown on larger screens */}
                  <div className={`hidden sm:flex absolute left-4 w-8 h-8 rounded-full border-4 items-center justify-center z-10 ${
                    item.unlocked 
                      ? 'bg-green-500 border-green-300' 
                      : 'bg-gray-700 border-gray-500'
                  }`}>
                    {item.unlocked ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Lock className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-full sm:ml-16">
                    <div className={`relative group transition-all duration-300 ${
                      item.unlocked 
                        ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-green-500/50 hover:scale-105' 
                        : 'bg-gray-800/30 border-gray-700/50 hover:border-yellow-500/50'
                    } p-4 sm:p-6 rounded-xl border backdrop-blur-sm cursor-pointer`}
                    onClick={() => !item.unlocked && handleUnlockAttempt(item)}
                    >
                      {/* Type Badge */}
                      <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 px-2 py-1 sm:px-3 sm:py-1 rounded-full flex items-center space-x-1 sm:space-x-2 ${
                        item.type === 'degree' ? 'bg-green-500' :
                        item.type === 'certification' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                        {getTypeIcon(item.type)}
                        <span className="text-xs font-bold text-white uppercase">{item.type}</span>
                      </div>

                      {/* Mobile Status Indicator */}
                      <div className="sm:hidden absolute top-3 left-3">
                        {item.unlocked ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <Lock className="w-5 h-5 text-yellow-400" />
                        )}
                      </div>

                      {/* Lock Overlay for Locked Items */}
                      {!item.unlocked && (
                        <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <div className="text-center p-4">
                            <Lock className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-3 sm:mb-4" />
                            <p className="text-white font-bold mb-2 text-sm sm:text-base">Unlock This Achievement</p>
                            <p className="text-yellow-400 text-xs sm:text-sm mb-3">Answer the question to reveal</p>
                            <div className="px-3 py-2 sm:px-4 sm:py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-xs sm:text-sm">
                              Click to Challenge
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 pt-8 sm:pt-0">
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

                          {/* Additional Details for Unlocked Items */}
                          {item.unlocked && (
                            <>
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
                                  <span className="font-semibold text-sm sm:text-base">{item.xp} XP Gained</span>
                                </div>
                                <div className="flex items-center text-green-400">
                                  <Target className="w-4 h-4 mr-1" />
                                  <span className="text-sm sm:text-base">{item.level}% Mastery</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quiz Modal */}
        {showQuiz && selectedItem && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 sm:p-8 rounded-2xl border border-yellow-500/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="text-center mb-6">
                <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Knowledge Challenge</h2>
                <p className="text-gray-400 text-sm sm:text-base">Answer correctly to unlock this achievement</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4">{selectedItem.question}</h3>
                <div className="space-y-3">
                  {selectedItem.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(index)}
                      className={`w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                        selectedAnswer === index
                          ? 'border-yellow-400 bg-yellow-400/10 text-white'
                          : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 ${
                          selectedAnswer === index ? 'border-yellow-400 bg-yellow-400' : 'border-gray-500'
                        }`}>
                          {selectedAnswer === index && <div className="w-2 h-2 bg-black rounded-full"></div>}
                        </div>
                        <span className="text-sm sm:text-base">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setShowQuiz(false)}
                  className="py-3 px-6 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null}
                  className="py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Celebration Modal */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-green-800 to-green-900 p-6 sm:p-8 rounded-2xl border border-green-400 text-center">
              <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Achievement Unlocked!</h2>
              <p className="text-green-300 text-sm sm:text-base">You've gained new knowledge and XP!</p>
              <div className="mt-4 flex items-center justify-center text-yellow-400">
                <Star className="w-5 h-5 mr-2" />
                <span className="font-bold text-sm sm:text-base">+{selectedItem?.xp} XP</span>
              </div>
            </div>
          </div>
        )}

        {/* Achievement Summary */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gradient-to-r from-yellow-900/20 to-red-900/20 rounded-xl border border-yellow-500/30">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mr-2" />
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
            <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-500/30 sm:col-span-2 lg:col-span-1">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 mx-auto mb-2" />
              <div className="text-white font-semibold text-sm sm:text-base">Lifelong Learner</div>
              <div className="text-xs sm:text-sm text-gray-400">Always acquiring new skills</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-gray-400 mb-4 font-mono text-sm sm:text-base px-4">
            "Knowledge is power, but applied knowledge is unstoppable."
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
            <button 
              onClick={handleNavigateToSkills}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-semibold rounded-lg hover:from-green-400 hover:to-yellow-400 transition-all flex items-center justify-center text-sm sm:text-base"
            >
              View Skills <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;