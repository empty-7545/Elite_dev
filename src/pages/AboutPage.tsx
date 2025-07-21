import React, { useState, useEffect, useCallback, FC } from 'react';
import { 
  ShieldFill, 
  CodeSlash, 
  PersonFill, 
  AwardFill, 
  TrophyFill, 
  StarFill, 
  LightningFill, 
  Bullseye, 
  Joystick, 
  Crown, 
  Stars, 
  ChevronRight, 
  LockFill, 
  UnlockFill, 
  Fire, 
  Sword, 
  Magic, 
  HeartFill 
} from 'react-bootstrap-icons';

// Define interfaces for data structures
interface DeveloperData {
  name: string;
  title: string;
  location: string;
  bio: string;
  experience: string;
  specialization: string;
  level: string;
  xp: string;
  health: string;
  mana: string;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  unlocked: boolean;
  rarity: string;
  xpReward: number;
}

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

// Encrypted developer information
const encryptedData: DeveloperData = {
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
  xp: "█████",
  health: "███",
  mana: "███"
};

// Decrypted developer information
const decryptedData: DeveloperData = {
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
  xp: "2,547",
  health: "100",
  mana: "85"
};

const achievements: Achievement[] = [
  { id: 1, name: "Code Warrior", description: "Mastered multiple programming languages", icon: Sword, unlocked: true, rarity: "legendary", xpReward: 500 },
  { id: 2, name: "Security Guardian", description: "Implemented secure applications", icon: ShieldFill, unlocked: true, rarity: "epic", xpReward: 350 },
  { id: 3, name: "Full Stack Master", description: "Conquered both frontend and backend", icon: Crown, unlocked: true, rarity: "legendary", xpReward: 600 },
  { id: 4, name: "Innovation Pioneer", description: "Created groundbreaking solutions", icon: Stars, unlocked: true, rarity: "rare", xpReward: 250 },
  { id: 5, name: "Team Leader", description: "Led successful development teams", icon: TrophyFill, unlocked: true, rarity: "epic", xpReward: 400 },
  { id: 6, name: "Problem Solver", description: "Solved complex technical challenges", icon: Bullseye, unlocked: true, rarity: "rare", xpReward: 300 }
];

const skills: Skill[] = [
  { name: "JavaScript/TypeScript", level: 95, category: "Programming", color: "from-yellow-400 to-yellow-600", icon: CodeSlash },
  { name: "React/Next.js", level: 92, category: "Frontend", color: "from-blue-400 to-blue-600", icon: LightningFill },
  { name: "Node.js", level: 88, category: "Backend", color: "from-green-400 to-green-600", icon: Fire },
  { name: "Python", level: 85, category: "Programming", color: "from-purple-400 to-purple-600", icon: Magic },
  { name: "Security", level: 90, category: "Specialty", color: "from-red-400 to-red-600", icon: ShieldFill },
  { name: "React Native", level: 80, category: "Mobile", color: "from-pink-400 to-pink-600", icon: Stars }
];

const GameifiedAboutPage: FC = () => {
  const [isDecrypted, setIsDecrypted] = useState<boolean>(false);
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);
  const [data, setData] = useState<DeveloperData>(encryptedData);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [xpAnimation, setXpAnimation] = useState<boolean>(false);
  const [healthAnimation, setHealthAnimation] = useState<boolean>(false);
  const [manaAnimation, setManaAnimation] = useState<boolean>(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [currentXP, setCurrentXP] = useState<number>(0);
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [typingIndex, setTypingIndex] = useState<number>(0);
  const [showTerminalEffect, setShowTerminalEffect] = useState<boolean>(false);

  // Handle window object safely for SSR
  const getWindowDimensions = useCallback(() => {
    if (typeof window !== 'undefined') {
      return { width: window.innerWidth, height: window.innerHeight };
    }
    return { width: 1200, height: 800 };
  }, []);

  // Particle system for effects
  const createParticles = useCallback((count = 20) => {
    const { width, height } = getWindowDimensions();
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Math.random(),
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1,
        color: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981'][Math.floor(Math.random() * 4)]
      });
    }
    setParticles(newParticles);
    
    const timer = setTimeout(() => {
      setParticles([]);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [getWindowDimensions]);

  // Terminal typing effect
  useEffect(() => {
    if (showTerminalEffect && isDecrypting) {
      const interval = setInterval(() => {
        setTypingIndex(prev => {
          if (prev < 50) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [showTerminalEffect, isDecrypting]);

  // XP Animation effect
  useEffect(() => {
    if (isDecrypted && currentXP < 2547) {
      const interval = setInterval(() => {
        setCurrentXP(prev => {
          const next = prev + 50;
          if (next >= 2547) {
            clearInterval(interval);
            return 2547;
          }
          return next;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isDecrypted, currentXP]);

  const handleDecryption = () => {
    if (isDecrypting || isDecrypted) return;
    
    setIsDecrypting(true);
    setShowTerminalEffect(true);
    createParticles(30);
    
    // Simulate terminal decryption process
    const decryptTimer = setTimeout(() => {
      setData(decryptedData);
      setIsDecrypted(true);
      setIsDecrypting(false);
      setShowTerminalEffect(false);
      setXpAnimation(true);
      setHealthAnimation(true);
      setManaAnimation(true);
      setShowLevelUp(true);
      createParticles(50);
      
      // Hide level up notification
      const levelUpTimer = setTimeout(() => {
        setShowLevelUp(false);
      }, 3000);
      
      // Auto re-encrypt after 30 seconds
      const reEncryptTimer = setTimeout(() => {
        setData(encryptedData);
        setIsDecrypted(false);
        setXpAnimation(false);
        setHealthAnimation(false);
        setManaAnimation(false);
        setCurrentXP(0);
        setTypingIndex(0);
      }, 30000);

      return () => {
        clearTimeout(levelUpTimer);
        clearTimeout(reEncryptTimer);
      };
    }, 3000);

    return () => clearTimeout(decryptTimer);
  };

  const getRarityColor = (rarity: string): string => {
    switch(rarity) {
      case 'legendary': return 'from-yellow-400 via-orange-500 to-red-500';
      case 'epic': return 'from-purple-400 via-pink-500 to-purple-600';
      case 'rare': return 'from-blue-400 via-cyan-500 to-blue-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityGlow = (rarity: string): string => {
    switch(rarity) {
      case 'legendary': return 'shadow-lg shadow-yellow-500/50';
      case 'epic': return 'shadow-lg shadow-purple-500/50';
      case 'rare': return 'shadow-lg shadow-blue-500/50';
      default: return 'shadow-lg shadow-gray-500/50';
    }
  };

  const renderSkillBar = (skill: Skill, index: number, isHovered: boolean) => {
    const Icon = skill.icon;
    const width = isHovered ? skill.level : (isDecrypted ? skill.level : 0);
    
    return (
      <div 
        key={index} 
        className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:-rotate-1 border border-gray-600/30 cursor-pointer"
        onMouseEnter={() => setHoveredSkill(index)}
        onMouseLeave={() => setHoveredSkill(null)}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <Icon size={24} className="text-white" />
            <span className="text-white font-bold text-lg">{skill.name}</span>
          </div>
          <span className="text-lg text-gray-300 font-mono">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-4 overflow-hidden relative">
          <div 
            className={`bg-gradient-to-r ${skill.color} h-4 rounded-full transition-all duration-2000 relative`}
            style={{ width: `${width}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            <div className="absolute right-0 top-0 h-full w-1 bg-white/80 animate-pulse"></div>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <span className="text-sm text-gray-400">{skill.category}</span>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <StarFill 
                key={i} 
                size={12} 
                className={`${i < Math.floor(skill.level / 20) ? 'text-yellow-400' : 'text-gray-600'} transition-colors duration-500`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full pointer-events-none animate-ping"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            animationDuration: '2s'
          }}
        />
      ))}

      {/* Level Up Notification */}
      {showLevelUp && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl shadow-2xl border-4 border-yellow-300">
            <div className="text-center">
              <Crown size={32} className="mx-auto mb-2 animate-spin" />
              <h2 className="text-2xl font-bold">LEVEL UP!</h2>
              <p className="text-lg">You've reached Level {data.level}!</p>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Effect Overlay */}
      {showTerminalEffect && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-40 flex items-center justify-center">
          <div className="bg-black text-green-400 font-mono p-8 rounded-lg border border-green-500 max-w-2xl">
            <div className="mb-4 text-center">
              <div className="inline-block animate-spin">⚡</div>
              <span className="ml-2">DECRYPTION IN PROGRESS</span>
              <div className="inline-block animate-spin ml-2">⚡</div>
            </div>
            <div className="space-y-2">
              <div>{'> Initializing secure connection...'.slice(0, Math.min(typingIndex, 35))}<span className="animate-pulse">_</span></div>
              <div>{'> Authenticating credentials...'.slice(0, Math.max(0, typingIndex - 10))}<span className="animate-pulse">_</span></div>
              <div>{'> Decrypting personal data...'.slice(0, Math.max(0, typingIndex - 25))}<span className="animate-pulse">_</span></div>
              <div>{'> Access granted. Welcome back, Developer!'.slice(0, Math.max(0, typingIndex - 40))}<span className="animate-pulse">_</span></div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                <Joystick size={32} className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Player Profile
              </h1>
              <p className="text-gray-300 text-lg">Developer Stats & Epic Achievements</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isDecrypted ? (
              <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 border border-green-400 rounded-xl shadow-lg">
                <UnlockFill size={20} className="text-white animate-pulse" />
                <span className="text-white font-bold">DECRYPTED</span>
              </div>
            ) : (
              <button 
                onClick={handleDecryption}
                disabled={isDecrypting}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-purple-500/50"
              >
                {isDecrypting ? (
                  <span className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Decrypting...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-3">
                    <LockFill size={20} className="group-hover:animate-bounce" />
                    <span>Decrypt Profile</span>
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Player Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-gray-800/90 via-purple-900/30 to-gray-900/90 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/50 shadow-2xl transform transition-all duration-500 hover:scale-105">
              <div className="text-center mb-6">
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-2xl transform transition-all duration-500 hover:rotate-12">
                    <PersonFill size={64} className="text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                    <Crown size={24} className="text-white" />
                  </div>
                  {isDecrypted && (
                    <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                      <LightningFill size={16} className="text-white" />
                    </div>
                  )}
                </div>
                
                <h2 className={`text-3xl font-bold text-white mb-3 ${isDecrypting ? 'animate-pulse' : ''} ${isDecrypted ? 'animate-bounce' : ''}`}>
                  {data.name}
                </h2>
                <p className={`text-purple-300 text-lg mb-6 ${isDecrypting ? 'animate-pulse' : ''}`}>
                  {data.title}
                </p>
                
                {/* Stats Bars */}
                <div className="space-y-4 mb-6">
                  {/* Level & XP */}
                  <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-2xl p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-300 font-semibold">Level</span>
                      <span className={`text-2xl font-bold text-purple-400 ${xpAnimation ? 'animate-bounce' : ''}`}>
                        {data.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 h-4 rounded-full transition-all duration-2000 relative"
                        style={{ width: `${isDecrypted ? '75' : '0'}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <span className="text-sm text-gray-300 font-mono">XP: {isDecrypted ? currentXP.toLocaleString() : data.xp}</span>
                    </div>
                  </div>

                  {/* Health Bar */}
                  <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <HeartFill size={16} className="text-red-400" />
                        <span className="text-gray-300 text-sm">Health</span>
                      </div>
                      <span className="text-red-400 font-bold">{data.health}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-3">
                      <div 
                        className={`bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-1500 ${healthAnimation ? 'animate-pulse' : ''}`}
                        style={{ width: `${isDecrypted ? data.health + '%' : '0%'}` }}
                      ></div>
                    </div>
                  </div>

                  {/* Mana Bar */}
                  <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Magic size={16} className="text-blue-400" />
                        <span className="text-gray-300 text-sm">Mana</span>
                      </div>
                      <span className="text-blue-400 font-bold">{data.mana}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-3">
                      <div 
                        className={`bg-gradient-to-r from-blue-500 to-cyan-600 h-3 rounded-full transition-all duration-1500 ${manaAnimation ? 'animate-pulse' : ''}`}
                        style={{ width: `${isDecrypted ? data.mana + '%' : '0%'}` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Profile Stats */}
              <div className="space-y-4">
                {[
                  { label: 'Location', value: data.location, icon: Bullseye, color: 'text-green-400' },
                  { label: 'Experience', value: data.experience, icon: AwardFill, color: 'text-purple-400' },
                  { label: 'Specialization', value: data.specialization, icon: Stars, color: 'text-pink-400' }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl border border-gray-600/30 transform transition-all duration-300 hover:scale-105 hover:bg-gray-700/50">
                      <div className="flex items-center space-x-3">
                        <Icon size={20} className={stat.color} />
                        <span className="text-gray-300">{stat.label}</span>
                      </div>
                      <span className={`${stat.color} font-semibold ${isDecrypting ? 'animate-pulse' : ''}`}>
                        {stat.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-gray-800/90 via-purple-900/30 to-gray-900/90 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <TrophyFill size={24} className="mr-3 text-yellow-400 animate-bounce" />
                Epic Achievements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={achievement.id}
                      className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-500 transform hover:scale-110 hover:-rotate-2 ${
                        achievement.unlocked 
                          ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} border-transparent ${getRarityGlow(achievement.rarity)} animate-pulse`
                          : 'bg-gray-700/50 border-gray-600 opacity-50 hover:opacity-75'
                      }`}
                      onClick={() => setSelectedAchievement(achievement)}
                    >
                      <div className="text-center">
                        <Icon size={32} className="text-white mx-auto mb-2" />
                        <p className="text-xs text-white font-bold">{achievement.name}</p>
                        {achievement.unlocked && (
                          <p className="text-xs text-white/80 mt-1">+{achievement.xpReward} XP</p>
                        )}
                      </div>
                      {achievement.unlocked && (
                        <>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                            <StarFill size={12} className="text-white" />
                          </div>
                          <div className="absolute inset-0 bg-white/10 rounded-2xl animate-ping"></div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <div className="bg-gradient-to-br from-gray-800/90 via-purple-900/30 to-gray-900/90 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/50 shadow-2xl transform transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <PersonFill size={24} className="mr-3 text-purple-400" />
                Player Backstory
              </h3>
              <div className={`text-gray-300 leading-relaxed text-lg ${isDecrypting ? 'animate-pulse' : ''}`}>
                {data.bio}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-gradient-to-br from-gray-800/90 via-purple-900/30 to-gray-900/90 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <CodeSlash size={24} className="mr-3 text-blue-400" />
                Skill Mastery Tree
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => 
                  renderSkillBar(skill, index, hoveredSkill === index)
                )}
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="bg-gradient-to-br from-gray-800/90 via-purple-900/30 to-gray-900/90 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <AwardFill size={24} className="mr-3 text-green-400" />
                Epic Quest Chronicles
              </h3>
              
              <div className="space-y-8">
                {[
                  {
                    title: "Senior Developer Quest",
                    company: "Virtual Technology",
                    period: "2025 - Present",
                    icon: Crown,
                    color: "purple",
                    borderColor: "border-purple-500",
                    bgColor: "bg-purple-500",
                    description: "🎯 Lead development of secure applications • 👥 Manage team of 2 developers • 🛡️ Implement security protocols"
                  },
                  {
                    title: "Full Stack Developer Quest",
                    company: "Virtual Technology",
                    period: "2024 - 2025",
                    icon: CodeSlash,
                    color: "blue",
                    borderColor: "border-blue-500",
                    bgColor: "bg-blue-500",
                    description: "⚡ Built scalable web applications • 🔒 Implemented authentication systems • 📊 Optimized performance"
                  },
                  {
                    title: "Frontend Developer Quest",
                    company: "Virtual Technology",
                    period: "2024",
                    icon: Stars,
                    color: "green",
                    borderColor: "border-green-500",
                    bgColor: "bg-green-500",
                    description: "🎨 Developed responsive interfaces • 👨‍💻 Collaborated with designers • 📱 Mobile-first approach"
                  }
                ].map((quest, index) => {
                  const Icon = quest.icon;
                  return (
                    <div key={index} className={`relative ${quest.borderColor} border-l-4 pl-8 transform transition-all duration-500 hover:scale-105 hover:translate-x-4`}>
                      <div className={`absolute -left-4 w-8 h-8 ${quest.bgColor} rounded-full flex items-center justify-center shadow-lg animate-pulse`}>
                        <Icon size={16} className="text-white" />
                      </div>
                      <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-500">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-white text-xl">{quest.title}</h4>
                          <span className="text-sm text-gray-400 bg-gray-600/50 px-3 py-1 rounded-full border border-gray-500/30">
                            {quest.period}
                          </span>
                        </div>
                        <p className={`text-lg text-${quest.color}-400 mb-3 font-semibold`}>{quest.company}</p>
                        <p className="text-gray-300 leading-relaxed">{quest.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Navigation */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/50 shadow-2xl">
            <span className="text-gray-300 text-lg font-semibold flex items-center">
              <Joystick size={20} className="mr-2 text-purple-400" />
              Navigate to:
            </span>
            {[
              { name: 'Skills Hub', color: 'from-blue-500 to-blue-600', hoverColor: 'hover:from-blue-600 hover:to-blue-700', icon: CodeSlash },
              { name: 'Projects Lab', color: 'from-green-500 to-green-600', hoverColor: 'hover:from-green-600 hover:to-green-700', icon: Bullseye },
              { name: 'Home Base', color: 'from-purple-500 to-purple-600', hoverColor: 'hover:from-purple-600 hover:to-purple-700', icon: Crown }
            ].map((nav, index) => {
              const Icon = nav.icon;
              return (
                <button 
                  key={index}
                  className={`group px-6 py-3 bg-gradient-to-r ${nav.color} text-white rounded-xl ${nav.hoverColor} transition-all duration-500 transform hover:scale-110 hover:-rotate-2 shadow-lg font-semibold`}
                >
                  <span className="flex items-center space-x-2">
                    <Icon size={18} className="group-hover:animate-bounce" />
                    <span>{nav.name}</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Achievement Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-8 max-w-md w-full border-2 border-purple-500/50 shadow-2xl transform animate-scale-in">
            <div className="text-center">
              <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${getRarityColor(selectedAchievement.rarity)} flex items-center justify-center ${getRarityGlow(selectedAchievement.rarity)} animate-pulse`}>
                <selectedAchievement.icon size={48} className="text-white" />
              </div>
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  selectedAchievement.rarity === 'legendary' ? 'bg-yellow-500 text-black' :
                  selectedAchievement.rarity === 'epic' ? 'bg-purple-500 text-white' :
                  'bg-blue-500 text-white'
                }`}>
                  {selectedAchievement.rarity}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{selectedAchievement.name}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{selectedAchievement.description}</p>
              
              {/* XP Reward */}
              <div className="flex justify-center items-center space-x-2 mb-6 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
                <LightningFill size={20} className="text-yellow-400" />
                <span className="text-yellow-400 font-bold">+{selectedAchievement.xpReward} XP Reward</span>
              </div>
              
              {/* Star Rating */}
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <StarFill key={i} size={24} className="text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                ))}
              </div>
              
              <button 
                onClick={() => setSelectedAchievement(null)}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-105 font-semibold shadow-lg"
              >
                <span className="flex items-center space-x-2">
                  <span>Close</span>
                  <ChevronRight size={16} />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for additional animations */}
      <style >{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0.5) rotate(-10deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default GameifiedAboutPage;