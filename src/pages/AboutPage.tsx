import React, { useState, useEffect } from 'react';
import { Shield, Code, User, GraduationCap, Trophy, Star, Zap, Target, Award, Gamepad2, Crown, Sparkles } from 'lucide-react';

// Encrypted developer information
const encryptedData = {
  name: "███████ ████████",
  title: "█████ ███████ ██████████",
  location: "███████, ██",
  bio: `
    █████ ████ ████████ ████ ██ ████ ███████████ ███ ██████ ████████ ███ ██████ ██████.
    ████ █████████ ██████ ███ ███████ ████ ████████ ███ ████ ████████ ████████.
    █████ ██ ██████████ ████ ████ ████ ███████ ███ ██ ████ █████████ ████████ ███ ███████.
    ███ ████ ████ ████ ████████ ██ ███████ █████ ████ ███████ ████ ███ ████████ ████.
  `,
  experience: "██+ █████",
  specialization: "██████████, ███████, ██████████, ████",
  level: "██",
  xp: "█████"
};

// Decrypted developer information
const decryptedData = {
  name: "Karthigaiselvam T",
  title: "Senior Software Developer",
  location: "Dindigul, Tamil Nadu, India",
  bio: `
    I'm a passionate developer with 1+ years of experience building web applications and secure systems.
    My background includes working with startups and enterprise-level clients across multiple industries.
    I'm committed to creating code that solves real problems and is both maintainable and scalable.
    My work has been featured in several major tech publications and developer communities.
  `,
  experience: "1+ years",
  specialization: "Full Stack, Security, React Native",
  level: "25",
  xp: "2,547"
};

const achievements = [
  { id: 1, name: "Code Warrior", description: "Mastered multiple programming languages", icon: Code, unlocked: true, rarity: "legendary" },
  { id: 2, name: "Security Guardian", description: "Implemented secure applications", icon: Shield, unlocked: true, rarity: "epic" },
  { id: 3, name: "Full Stack Master", description: "Conquered both frontend and backend", icon: Crown, unlocked: true, rarity: "legendary" },
  { id: 4, name: "Innovation Pioneer", description: "Created groundbreaking solutions", icon: Sparkles, unlocked: true, rarity: "rare" },
  { id: 5, name: "Team Leader", description: "Led successful development teams", icon: Trophy, unlocked: true, rarity: "epic" },
  { id: 6, name: "Problem Solver", description: "Solved complex technical challenges", icon: Target, unlocked: true, rarity: "rare" }
];

const skills = [
  { name: "JavaScript/TypeScript", level: 95, category: "Programming", color: "from-yellow-400 to-yellow-600" },
  { name: "React/Next.js", level: 92, category: "Frontend", color: "from-blue-400 to-blue-600" },
  { name: "Node.js", level: 88, category: "Backend", color: "from-green-400 to-green-600" },
  { name: "Python", level: 85, category: "Programming", color: "from-purple-400 to-purple-600" },
  { name: "Security", level: 90, category: "Specialty", color: "from-red-400 to-red-600" },
  { name: "React Native", level: 80, category: "Mobile", color: "from-pink-400 to-pink-600" }
];

const GameifiedAboutPage = () => {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [data, setData] = useState(encryptedData);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [xpAnimation, setXpAnimation] = useState(false);
  const [currentSection, setCurrentSection] = useState('about');

  useEffect(() => {
    const terminalStore = window.localStorage?.getItem('terminal-decrypt');
    
    if (terminalStore === 'personal') {
      handleDecryption();
    }
  }, []);

  const handleDecryption = () => {
    if (isDecrypting || isDecrypted) return;
    
    setIsDecrypting(true);
    
    setTimeout(() => {
      setData(decryptedData);
      setIsDecrypted(true);
      setIsDecrypting(false);
      setXpAnimation(true);
      
      // Auto re-encrypt after 30 seconds
      setTimeout(() => {
        setData(encryptedData);
        setIsDecrypted(false);
        setXpAnimation(false);
      }, 30000);
    }, 2000);
  };

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const calculateOverallLevel = () => {
    const totalXP = skills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.floor(totalXP / skills.length);
  };

  return (
    <div className="min-h-screen  from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Gamepad2 size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Player Profile
              </h1>
              <p className="text-gray-400">Developer Stats & Achievements</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isDecrypted ? (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">DECRYPTED</span>
              </div>
            ) : (
              <button 
                onClick={handleDecryption}
                disabled={isDecrypting}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isDecrypting ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Decrypting...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Shield size={16} />
                    <span>Decrypt Profile</span>
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Player Card & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Player Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-purple-500 shadow-2xl">
              <div className="text-center mb-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
                    <User size={48} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <Crown size={16} className="text-white" />
                  </div>
                </div>
                
                <h2 className={`text-2xl font-bold text-white mb-2 ${isDecrypting ? 'animate-pulse' : ''}`}>
                  {data.name}
                </h2>
                <p className={`text-purple-300 mb-4 ${isDecrypting ? 'animate-pulse' : ''}`}>
                  {data.title}
                </p>
                
                {/* Level & XP */}
                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Level</span>
                    <span className={`text-lg font-bold text-purple-400 ${xpAnimation ? 'animate-bounce' : ''}`}>
                      {data.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${isDecrypted ? '75' : '0'}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xs text-gray-400">XP: {data.xp}</span>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                  <span className="text-gray-300">Location</span>
                  <span className={`text-white font-semibold ${isDecrypting ? 'animate-pulse' : ''}`}>
                    {data.location}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                  <span className="text-gray-300">Experience</span>
                  <span className={`text-purple-400 font-semibold ${isDecrypting ? 'animate-pulse' : ''}`}>
                    {data.experience}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                  <span className="text-gray-300">Specialization</span>
                  <span className={`text-pink-400 font-semibold ${isDecrypting ? 'animate-pulse' : ''}`}>
                    {data.specialization}
                  </span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-purple-500 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Trophy size={20} className="mr-2 text-yellow-400" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={achievement.id}
                      className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                        achievement.unlocked 
                          ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} border-transparent shadow-lg`
                          : 'bg-gray-700 border-gray-600 opacity-50'
                      }`}
                      onClick={() => setSelectedAchievement(achievement)}
                    >
                      <div className="text-center">
                        <Icon size={24} className="text-white mx-auto mb-1" />
                        <p className="text-xs text-white font-semibold">{achievement.name}</p>
                      </div>
                      {achievement.unlocked && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <Star size={10} className="text-white" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Skills & Experience */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-purple-500 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <User size={20} className="mr-2 text-purple-400" />
                Player Bio
              </h3>
              <div className={`text-gray-300 leading-relaxed ${isDecrypting ? 'animate-pulse' : ''}`}>
                {data.bio}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-purple-500 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Code size={20} className="mr-2 text-blue-400" />
                Skill Tree
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold">{skill.name}</span>
                      <span className="text-sm text-gray-300">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-3">
                      <div 
                        className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 relative overflow-hidden`}
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="mt-1">
                      <span className="text-xs text-gray-400">{skill.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-purple-500 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Award size={20} className="mr-2 text-green-400" />
                Quest History
              </h3>
              
              <div className="space-y-6">
                <div className="relative border-l-4 border-purple-500 pl-6">
                  <div className="absolute -left-3 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <Crown size={12} className="text-white" />
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white">Senior Developer Quest</h4>
                      <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">2025 - Present</span>
                    </div>
                    <p className="text-sm text-purple-400 mb-2">Virtual Technology</p>
                    <p className="text-gray-300 text-sm">
                      🎯 Lead development of secure applications • 👥 Manage team of 2 developers • 🛡️ Implement security protocols
                    </p>
                  </div>
                </div>
                
                <div className="relative border-l-4 border-blue-500 pl-6">
                  <div className="absolute -left-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Code size={12} className="text-white" />
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white">Full Stack Developer Quest</h4>
                      <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">2024 - 2025</span>
                    </div>
                    <p className="text-sm text-blue-400 mb-2">Virtual Technology</p>
                    <p className="text-gray-300 text-sm">
                      ⚡ Built scalable web applications • 🔒 Implemented authentication systems • 📊 Optimized performance
                    </p>
                  </div>
                </div>
                
                <div className="relative border-l-4 border-green-500 pl-6">
                  <div className="absolute -left-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Sparkles size={12} className="text-white" />
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white">Frontend Developer Quest</h4>
                      <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">2024</span>
                    </div>
                    <p className="text-sm text-green-400 mb-2">Virtual Technology</p>
                    <p className="text-gray-300 text-sm">
                      🎨 Developed responsive interfaces • 👨‍💻 Collaborated with designers • 📱 Mobile-first approach
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 bg-gray-800 rounded-xl p-4 border border-purple-500">
            <span className="text-gray-300">Navigate to:</span>
            <button 
              onClick={() => navigate('/skills')}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Skills Hub
            </button>
            <button 
              onClick={() => navigate('/projects')}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
            >
              Projects Lab
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Home Base
            </button>
          </div>
        </div>
      </div>

      {/* Achievement Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-purple-500">
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${getRarityColor(selectedAchievement.rarity)} flex items-center justify-center`}>
                <selectedAchievement.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{selectedAchievement.name}</h3>
              <p className="text-gray-300 mb-4">{selectedAchievement.description}</p>
              <div className="flex justify-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <button 
                onClick={() => setSelectedAchievement(null)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameifiedAboutPage;