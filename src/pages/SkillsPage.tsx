import React, { useState, useEffect } from 'react';
import { Server, Globe, Database, Shield, Command, Bot, Trophy, Star, Zap, Target, Award, DollarSign, CreditCard, Plane, Heart, MessageSquare, ShoppingCart } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  experience: string;
  description: string;
  icon: React.ReactNode;
  xp: number;
  maxXp: number;
  achievements: string[];
}

const SkillsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [totalXp, setTotalXp] = useState<number>(0);
  const [playerLevel, setPlayerLevel] = useState<number>(1);

  // Gamified skills data with XP and achievements
  const skillsData: Skill[] = [
    {
      id: 'js-1',
      name: 'JavaScript/TypeScript',
      category: 'frontend',
      level: 95,
      experience: '1+ years',
      description: 'Master of the modern web! Conquered ES6+, TypeScript wizardry, and performance optimization quests.',
      icon: <Command className="w-6 h-6" />,
      xp: 9500,
      maxXp: 10000,
      achievements: ['ES6 Master', 'TypeScript Guru', 'Performance Optimizer']
    },
    {
      id: 'react-1',
      name: 'React & React Native',
      category: 'frontend',
      level: 92,
      experience: '1+ years',
      description: 'Component architect extraordinaire! Built kingdoms with hooks, conquered state management dragons.',
      icon: <Globe className="w-6 h-6" />,
      xp: 9200,
      maxXp: 10000,
      achievements: ['Hook Master', 'Redux Warrior', 'Mobile App Creator']
    },
    {
      id: 'node-1',
      name: 'Node.js',
      category: 'backend',
      level: 88,
      experience: '1+ years',
      description: 'Backend fortress builder! Crafted scalable APIs and tamed the microservices wilderness.',
      icon: <Server className="w-6 h-6" />,
      xp: 8800,
      maxXp: 10000,
      achievements: ['API Architect', 'Express Expert', 'Microservices Hero']
    },
    {
      id: 'db-1',
      name: 'SQL & NoSQL Databases',
      category: 'database',
      level: 90,
      experience: '1+ years',
      description: 'Data realm guardian! Mastered relational puzzles and conquered NoSQL challenges.',
      icon: <Database className="w-6 h-6" />,
      xp: 9000,
      maxXp: 10000,
      achievements: ['Query Master', 'Schema Designer', 'Performance Tuner']
    },
    {
      id: 'fintech-1',
      name: 'Financial Systems',
      category: 'fintech',
      level: 85,
      experience: '1+ years',
      description: 'Financial fortress architect! Built secure banking systems, conquered compliance dragons, and mastered financial calculations.',
      icon: <DollarSign className="w-6 h-6" />,
      xp: 8500,
      maxXp: 10000,
      achievements: ['Banking Systems Expert', 'Compliance Guardian', 'Risk Calculator']
    },
    {
      id: 'payment-1',
      name: 'Payment Gateways',
      category: 'fintech',
      level: 88,
      experience: '1+ years',
      description: 'Payment wizard extraordinaire! Integrated multiple payment providers, secured transactions, and optimized checkout flows.',
      icon: <CreditCard className="w-6 h-6" />,
      xp: 8800,
      maxXp: 10000,
      achievements: ['Gateway Integrator', 'Transaction Secure', 'Checkout Optimizer']
    },
    {
      id: 'ecom-1',
      name: 'E-commerce Platforms',
      category: 'business',
      level: 82,
      experience: '1+ years',
      description: 'Digital marketplace conqueror! Built scalable shopping experiences, inventory systems, and customer journeys.',
      icon: <ShoppingCart className="w-6 h-6" />,
      xp: 8200,
      maxXp: 10000,
      achievements: ['Marketplace Builder', 'Inventory Master', 'UX Champion']
    },
    {
      id: 'travel-1',
      name: 'Travel & Booking Systems',
      category: 'business',
      level: 78,
      experience: '1+ years',
      description: 'Travel tech explorer! Created booking engines, reservation systems, and wanderlust-inducing user experiences.',
      icon: <Plane className="w-6 h-6" />,
      xp: 7800,
      maxXp: 10000,
      achievements: ['Booking Engine Pro', 'Reservation System', 'Travel UX Designer']
    },
    {
      id: 'matrimony-1',
      name: 'Matrimony Platforms',
      category: 'business',
      level: 75,
      experience: '1+ years',
      description: 'Love connection architect! Built matchmaking algorithms, profile systems, and relationship-building platforms.',
      icon: <Heart className="w-6 h-6" />,
      xp: 7500,
      maxXp: 10000,
      achievements: ['Matchmaker Pro', 'Profile Architect', 'Connection Builder']
    },
    {
      id: 'messaging-1',
      name: 'Message Gateways',
      category: 'backend',
      level: 80,
      experience: '1+ years',
      description: 'Communication master! Integrated SMS, email, and push notification systems for seamless user engagement.',
      icon: <MessageSquare className="w-6 h-6" />,
      xp: 8000,
      maxXp: 10000,
      achievements: ['SMS Integration', 'Email Automation', 'Push Notification Pro']
    },
  ];

  useEffect(() => {
    const loadSkills = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSkills(skillsData);
      setLoading(false);
      
      // Calculate total XP and player level
      const total = skillsData.reduce((sum, skill) => sum + skill.xp, 0);
      setTotalXp(total);
      setPlayerLevel(Math.floor(total / 5000) + 1);
    };
    
    loadSkills();
  }, []);

  const filteredSkills = filter === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === filter);

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'from-green-400 to-green-600';
    if (level >= 70) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const getSkillBadge = (level: number) => {
    if (level >= 90) return { text: 'EXPERT', color: 'bg-green-500', icon: <Trophy className="w-4 h-4" /> };
    if (level >= 70) return { text: 'ADVANCED', color: 'bg-yellow-500', icon: <Star className="w-4 h-4" /> };
    return { text: 'LEARNING', color: 'bg-red-500', icon: <Target className="w-4 h-4" /> };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <Zap className="w-8 h-8 text-yellow-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-xl font-bold text-green-400 mb-2">Loading Skills Database...</h2>
          <p className="text-gray-400">Initializing player stats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  from-gray-900 via-black to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Player Stats Header */}
        <div className="mb-8 p-6 bg-gradient-to-r from-green-900/30 to-yellow-900/30 rounded-xl border border-green-500/30 backdrop-blur-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
                Skills Arsenal
              </h1>
              <p className="text-green-300">Level {playerLevel} Developer • {totalXp.toLocaleString()} Total XP</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{skills.length}</div>
                <div className="text-sm text-gray-400">Skills Unlocked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{skills.filter(s => s.level >= 90).length}</div>
                <div className="text-sm text-gray-400">Expert Level</div>
              </div>
            </div>
          </div>
          
          {/* Player XP Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">Progress to Level {playerLevel + 1}</span>
              <span className="text-gray-300">{totalXp % 5000}/5000 XP</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-yellow-400 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${(totalXp % 5000) / 5000 * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-3">
          {['all', 'frontend', 'backend', 'database', 'fintech', 'business', 'security', 'devops', 'ai'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                filter === category
                  ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-black shadow-lg'
                  : 'bg-gray-800/50 text-green-300 border border-green-500/30 hover:bg-gray-700/50'
              }`}
            >
              {category === 'all' ? 'All Skills' : 
               category === 'fintech' ? 'FinTech' :
               category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSkills.map((skill, index) => {
            const badge = getSkillBadge(skill.level);
            return (
              <div
                key={skill.id}
                onClick={() => setSelectedSkill(skill)}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm"
              >
                {/* Skill Badge */}
                <div className={`absolute top-3 right-3 ${badge.color} px-2 py-1 rounded-full flex items-center space-x-1`}>
                  {badge.icon}
                  <span className="text-xs font-bold text-white">{badge.text}</span>
                </div>

                {/* Skill Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-green-900/30 to-yellow-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-green-400 group-hover:text-yellow-400 transition-colors">
                    {skill.icon}
                  </div>
                </div>

                {/* Skill Info */}
                <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
                <p className="text-sm text-gray-400 mb-4 capitalize">{skill.category} • {skill.experience}</p>

                {/* XP Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Level Progress</span>
                    <span className="text-green-400 font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${getSkillColor(skill.level)} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>

                {/* XP Info */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-yellow-400 font-semibold">{skill.xp.toLocaleString()} XP</span>
                  <div className="flex items-center text-gray-400">
                    <Award className="w-4 h-4 mr-1" />
                    {skill.achievements.length} badges
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skill Detail Modal */}
        {selectedSkill && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setSelectedSkill(null)}>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-green-500/30 max-w-md w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedSkill.name}</h2>
                <button 
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-900/30 to-yellow-900/30 rounded-2xl flex items-center justify-center mb-4">
                  <div className="text-green-400 text-3xl">
                    {selectedSkill.icon}
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{selectedSkill.description}</p>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">XP Progress: {selectedSkill.xp}/{selectedSkill.maxXp}</div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${getSkillColor(selectedSkill.level)} h-3 rounded-full`}
                      style={{ width: `${(selectedSkill.xp / selectedSkill.maxXp) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Achievements Unlocked
                </h3>
                <div className="space-y-2">
                  {selectedSkill.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center text-green-300">
                      <Star className="w-4 h-4 mr-2 text-yellow-400" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievement Summary */}
        <div className="mt-8 p-6 bg-gradient-to-r from-yellow-900/20 to-red-900/20 rounded-xl border border-yellow-500/30">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Zap className="w-6 h-6 text-yellow-400 mr-2" />
            Industry Expertise & Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Financial Systems Pro</div>
              <div className="text-sm text-gray-400">Banking & Finance Expert</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
              <CreditCard className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Payment Gateway Master</div>
              <div className="text-sm text-gray-400">Secure Transaction Handler</div>
            </div>
            <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-500/30">
              <ShoppingCart className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-white font-semibold">E-commerce Architect</div>
              <div className="text-sm text-gray-400">Digital Marketplace Builder</div>
            </div>
            <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <MessageSquare className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Communication Hub</div>
              <div className="text-sm text-gray-400">Gateway Integration Expert</div>
            </div>
          </div>
          
          {/* Industry Experience Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-lg border border-blue-500/30">
              <div className="flex items-center mb-3">
                <Plane className="w-6 h-6 text-blue-400 mr-2" />
                <span className="text-white font-semibold">Travel Tech</span>
              </div>
              <p className="text-sm text-gray-300">Built comprehensive booking systems, reservation management, and travel experience platforms.</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-pink-900/20 to-red-900/20 rounded-lg border border-pink-500/30">
              <div className="flex items-center mb-3">
                <Heart className="w-6 h-6 text-pink-400 mr-2" />
                <span className="text-white font-semibold">Matrimony Platforms</span>
              </div>
              <p className="text-sm text-gray-300">Developed matchmaking systems, profile management, and relationship-building features.</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-900/20 to-yellow-900/20 rounded-lg border border-purple-500/30">
              <div className="flex items-center mb-3">
                <Trophy className="w-6 h-6 text-purple-400 mr-2" />
                <span className="text-white font-semibold">Full Stack Mastery</span>
              </div>
              <p className="text-sm text-gray-300">End-to-end development across finance, commerce, and communication domains.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;