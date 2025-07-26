import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Code,
  User,
  Trophy,
  Star,
  Zap,
  Target,
  Award,
  Gamepad2,
  Crown,
  Sparkles,
  ChevronRight,
  Lock,
  Unlock,
  Flame,
  Sword,
  Heart,
} from 'lucide-react';

// Define interfaces for type safety
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

interface Quest {
  title: string;
  company: string;
  period: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  borderColor: string;
  bgColor: string;
  description: string;
}

// Encrypted developer information
const encryptedData: DeveloperData = {
  name: '███████ ████████',
  title: '█████ ███████ ██████████',
  location: '███████, ██',
  bio: `
    █████ ████ ████████ ████ ██ ████ ███████████ ███ ██████ ████████ ███ ██████ ██████.
    ████ █████████ ██████ ███ ███████ ████ ████████ ███ ████ ████████ ████████.
    █████ ██ ██████████ ████ ████ ████ ███████ ███ ██ ████ █████████ ████████ ███ ███████.
    ███ ████ ████ ████ ████████ ██ ███████ █████ ████ ███████ ████ ███ ████████ ████.
  `,
  experience: '██+ █████',
  specialization: '██████████, ███████, ██████████, ████',
  level: '██',
  xp: '█████',
  health: '███',
  mana: '███',
};

// Decrypted developer information
const decryptedData: DeveloperData = {
  name: 'Karthigaiselvam T',
  title: 'Senior Software Developer',
  location: 'Dindigul, Tamil Nadu, India',
  bio: `
    I'm a passionate developer with 1+ years of experience building web applications and secure systems.
    My background includes working with startups and enterprise-level clients across multiple industries.
    I'm committed to creating code that solves real problems and is both maintainable and scalable.
    My work has been featured in several major tech publications and developer communities.
  `,
  experience: '1+ years',
  specialization: 'Full Stack, Security, React Native',
  level: '25',
  xp: '2,547',
  health: '100',
  mana: '85',
};

const achievements: Achievement[] = [
  { id: 1, name: 'Code Warrior', description: 'Mastered multiple programming languages', icon: Sword, unlocked: true, rarity: 'legendary', xpReward: 500 },
  { id: 2, name: 'Security Guardian', description: 'Implemented secure applications', icon: Shield, unlocked: true, rarity: 'epic', xpReward: 350 },
  { id: 3, name: 'Full Stack Master', description: 'Conquered both frontend and backend', icon: Crown, unlocked: true, rarity: 'legendary', xpReward: 600 },
  { id: 4, name: 'Innovation Pioneer', description: 'Created groundbreaking solutions', icon: Sparkles, unlocked: true, rarity: 'rare', xpReward: 250 },
  { id: 5, name: 'Team Leader', description: 'Led successful development teams', icon: Trophy, unlocked: true, rarity: 'epic', xpReward: 400 },
  { id: 6, name: 'Problem Solver', description: 'Solved complex technical challenges', icon: Target, unlocked: true, rarity: 'rare', xpReward: 300 },
];

const skills: Skill[] = [
  { name: 'JavaScript/TypeScript', level: 95, category: 'Programming', color: 'from-yellow-400 to-yellow-600', icon: Code },
  { name: 'React/Next.js', level: 92, category: 'Frontend', color: 'from-blue-400 to-blue-600', icon: Zap },
  { name: 'Node.js', level: 88, category: 'Backend', color: 'from-green-400 to-green-600', icon: Flame },
  { name: 'Python', level: 85, category: 'Programming', color: 'from-purple-400 to-purple-600', icon: Code },
  { name: 'Security', level: 90, category: 'Specialty', color: 'from-red-400 to-red-600', icon: Shield },
  { name: 'React Native', level: 80, category: 'Mobile', color: 'from-pink-400 to-pink-600', icon: Sparkles },
];

const GameifiedAboutPage: React.FC = () => {
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

  const navigate = useNavigate();

  // Particle system for effects
  const createParticles = useCallback((count = 20) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Math.random(),
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1,
        color: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981'][Math.floor(Math.random() * 4)],
      });
    }
    setParticles(newParticles);

    setTimeout(() => {
      setParticles([]);
    }, 3000);
  }, []);

  // Terminal typing effect
  useEffect(() => {
    if (showTerminalEffect && isDecrypting) {
      const interval = setInterval(() => {
        setTypingIndex((prev) => {
          if (prev < 50) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 100);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [showTerminalEffect, isDecrypting]);

  // XP Animation effect
  useEffect(() => {
    if (isDecrypted && currentXP < 2547) {
      const interval = setInterval(() => {
        setCurrentXP((prev) => {
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
    return () => {};
  }, [isDecrypted, currentXP]);

  const handleDecryption = () => {
    if (isDecrypting || isDecrypted) return;

    setIsDecrypting(true);
    setShowTerminalEffect(true);
    createParticles(30);

    setTimeout(() => {
      setData(decryptedData);
      setIsDecrypted(true);
      setIsDecrypting(false);
      setShowTerminalEffect(false);
      setXpAnimation(true);
      setHealthAnimation(true);
      setManaAnimation(true);
      setShowLevelUp(true);
      createParticles(50);

      setTimeout(() => {
        setShowLevelUp(false);
      }, 3000);

      setTimeout(() => {
        setData(encryptedData);
        setIsDecrypted(false);
        setXpAnimation(false);
        setHealthAnimation(false);
        setManaAnimation(false);
        setCurrentXP(0);
        setTypingIndex(0);
      }, 30000);
    }, 3000);
  };

  const getRarityColor = (rarity: string): string => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-400 via-orange-500 to-red-500';
      case 'epic':
        return 'from-purple-400 via-pink-500 to-purple-600';
      case 'rare':
        return 'from-blue-400 via-cyan-500 to-blue-600';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityGlow = (rarity: string): string => {
    switch (rarity) {
      case 'legendary':
        return 'shadow-lg shadow-yellow-500/50';
      case 'epic':
        return 'shadow-lg shadow-purple-500/50';
      case 'rare':
        return 'shadow-lg shadow-blue-500/50';
      default:
        return 'shadow-lg shadow-gray-500/50';
    }
  };

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen  from-gray-900 via-purple-900 to-indigo-900 p-2 sm:p-4 lg:p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full pointer-events-none animate-ping"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            animationDuration: '2s',
          }}
        />
      ))}

      {/* Level Up Notification */}
      {showLevelUp && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce px-4">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl border-4 border-yellow-300">
            <div className="text-center">
              <Crown size={24} className="sm:hidden mx-auto mb-2 animate-spin" />
              <Crown size={32} className="hidden sm:block mx-auto mb-2 animate-spin" />
              <h2 className="text-lg sm:text-2xl font-bold">LEVEL UP!</h2>
              <p className="text-sm sm:text-lg">You've reached Level {data.level}!</p>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Effect Overlay */}
      {showTerminalEffect && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-40 flex items-center justify-center p-4">
          <div className="bg-black text-green-400 font-mono p-4 sm:p-8 rounded-lg border border-green-500 max-w-full sm:max-w-2xl">
            <div className="mb-4 text-center">
              <div className="inline-block animate-spin">⚡</div>
              <span className="ml-2 text-sm sm:text-base">DECRYPTION IN PROGRESS</span>
              <div className="inline-block animate-spin ml-2">⚡</div>
            </div>
            <div className="space-y-2 text-xs sm:text-sm">
              <div>
                {'> Initializing secure connection...'.slice(0, Math.min(typingIndex, 35))}
                <span className="animate-pulse">_</span>
              </div>
              <div>
                {'> Authenticating credentials...'.slice(0, Math.max(0, typingIndex - 10))}
                <span className="animate-pulse">_</span>
              </div>
              <div>
                {'> Decrypting personal data...'.slice(0, Math.max(0, typingIndex - 25))}
                <span className="animate-pulse">_</span>
              </div>
              <div>
                {'> Access granted. Welcome back, Developer!'.slice(0, Math.max(0, typingIndex - 40))}
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                <Gamepad2 size={20} className="sm:hidden text-white" />
                <Gamepad2 size={32} className="hidden sm:block text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Player Profile
              </h1>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg">Developer Stats & Epic Achievements</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {isDecrypted ? (
              <div className="flex items-center space-x-2 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-500 border border-green-400 rounded-xl shadow-lg">
                <Unlock size={16} className="sm:hidden text-white animate-pulse" />
                <Unlock size={20} className="hidden sm:block text-white animate-pulse" />
                <span className="text-white font-bold text-sm sm:text-base">DECRYPTED</span>
              </div>
            ) : (
              <button
                onClick={handleDecryption}
                disabled={isDecrypting}
                className="group px-3 sm:px-8 py-2 sm:py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-purple-500/50"
              >
                {isDecrypting ? (
                  <span className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 sm:border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm sm:text-base">Decrypting...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2 sm:space-x-3">
                    <Lock size={16} className="sm:hidden group-hover:animate-bounce" />
                    <Lock size={20} className="hidden sm:block group-hover:animate-bounce" />
                    <span className="text-sm sm:text-base">Decrypt Profile</span>
                    <ChevronRight size={16} className="sm:hidden group-hover:translate-x-1 transition-transform" />
                    <ChevronRight size={20} className="hidden sm:block group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Player Card */}
          <div className="xl:col-span-1 space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-gray-800/90 via-purple-900/30 to-gray-900/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-purple-500/50 shadow-2xl transform transition-all duration-500 hover:scale-105">
              <div className="text-center mb-4 sm:mb-6">
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-2xl transform transition-all duration-500 hover:rotate-12">
                    <User size={32} className="sm:hidden text-white" />
                    <User size={64} className="hidden sm:block text-white" />
                  </div>
                  <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                    <Crown size={16} className="sm:hidden text-white" />
                    <Crown size={24} className="hidden sm:block text-white" />
                  </div>
                  {isDecrypted && (
                    <div className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                      <Zap size={12} className="sm:hidden text-white" />
                      <Zap size={16} className="hidden sm:block text-white" />
                    </div>
                  )}
                </div>

                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 ${isDecrypting ? 'animate-pulse' : ''} ${isDecrypted ? 'animate-bounce' : ''}`}>
                  {data.name}
                </h2>
                <p className={`text-purple-300 text-base sm:text-lg mb-4 sm:mb-6 ${isDecrypting ? 'animate-pulse' : ''}`}>
                  {data.title}
                </p>

                {/* Stats Bars */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {/* Level & XP */}
                  <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-xl sm:rounded-2xl p-3 sm:p-5">
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <span className="text-gray-300 font-semibold text-sm sm:text-base">Level</span>
                      <span className={`text-lg sm:text-2xl font-bold text-purple-400 ${xpAnimation ? 'animate-bounce' : ''}`}>
                        {data.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-3 sm:h-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 h-3 sm:h-4 rounded-full transition-all duration-2000 relative"
                        style={{ width: `${isDecrypted ? '75' : '0'}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-center mt-2 sm:mt-3">
                      <span className="text-xs sm:text-sm text-gray-300 font-mono">XP: {isDecrypted ? currentXP.toLocaleString() : data.xp}</span>
                    </div>
                  </div>

                  {/* Health Bar */}
                  <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Heart size={14} className="sm:hidden text-red-400" />
                        <Heart size={16} className="hidden sm:block text-red-400" />
                        <span className="text-gray-300 text-xs sm:text-sm">Health</span>
                      </div>
                      <span className="text-red-400 font-bold text-sm sm:text-base">{data.health}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2 sm:h-3">
                      <div
                        className={`bg-gradient-to-r from-red-500 to-red-600 h-2 sm:h-3 rounded-full transition-all duration-1500 ${healthAnimation ? 'animate-pulse' : ''}`}
                        style={{ width: `${isDecrypted ? data.health : '0'}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Mana Bar */}
                  <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Heart size={14} className="sm:hidden text-blue-400" />
                        <Heart size={16} className="hidden sm:block text-blue-400" />
                        <span className="text-gray-300 text-xs sm:text-sm">Mana</span>
                      </div>
                      <span className="text-blue-400 font-bold text-sm sm:text-base">{data.mana}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2 sm:h-3">
                      <div
                        className={`bg-gradient-to-r from-blue-500 to-cyan-600 h-2 sm:h-3 rounded-full transition-all duration-1500 ${manaAnimation ? 'animate-pulse' : ''}`}
                        style={{ width: `${isDecrypted ? data.mana : '0'}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: 'Location', value: data.location, icon: Target, color: 'text-green-400' },
                  { label: 'Experience', value: data.experience, icon: Award, color: 'text-purple-400' },
                  { label: 'Specialization', value: data.specialization, icon: Sparkles, color: 'text-pink-400' },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl border border-gray-600/30 transform transition-all duration-300 hover:scale-105 hover:bg-gray-700/50"
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Icon size={16} className={`sm:hidden ${stat.color}`} />
                        <Icon size={20} className={`hidden sm:block ${stat.color}`} />
                        <span className="text-gray-300 text-sm sm:text-base">{stat.label}</span>
                      </div>
                      <span className={`${stat.color} font-semibold text-sm sm:text-base ${isDecrypting ? 'animate-pulse' : ''}`}>
                        {stat.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-gray-800/90 via-purple-900/30 to-gray-900/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-purple-500/50 shadow-2xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <Trophy size={20} className="sm:hidden mr-2 text-yellow-400 animate-bounce" />
                <Trophy size={24} className="hidden sm:block mr-3 text-yellow-400 animate-bounce" />
                Epic Achievements
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-2 sm:gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`relative p-2 sm:p-4 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all duration-500 transform hover:scale-110 hover:-rotate-2 ${
                        achievement.unlocked
                          ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} border-transparent ${getRarityGlow(achievement.rarity)} animate-pulse`
                          : 'bg-gray-700/50 border-gray-600 opacity-50 hover:opacity-75'
                      }`}
                      onClick={() => setSelectedAchievement(achievement)}
                    >
                      <div className="text-center">
                        <Icon size={20} className="sm:hidden text-white mx-auto mb-1" />
                        <Icon size={32} className="hidden sm:block text-white mx-auto mb-2" />
                        <p className="text-xs font-bold text-white">{achievement.name}</p>
                        {achievement.unlocked && (
                          <p className="text-xs text-white/80 mt-1">+{achievement.xpReward} XP</p>
                        )}
                      </div>
                      {achievement.unlocked && (
                        <>
                          <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                            <Star size={8} className="sm:hidden text-white" />
                            <Star size={12} className="hidden sm:block text-white" />
                          </div>
                          <div className="absolute inset-0 bg-white/10 rounded-xl sm:rounded-2xl animate-ping"></div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Bio Section */}
            <div className="bg-gradient-to-br from-gray-800/90 via-purple-900/30 to-gray-900/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-purple-500/50 shadow-2xl transform transition-all duration-500 hover:scale-105">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <User size={20} className="sm:hidden mr-2 text-purple-400" />
                <User size={24} className="hidden sm:block mr-3 text-purple-400" />
                Player Backstory
              </h3>
              <div className={`text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg ${isDecrypting ? 'animate-pulse' : ''}`}>
                {data.bio.trim()}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-gradient-to-br from-gray-800/90 via-purple-900/30 to-gray-900/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-purple-500/50 shadow-2xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 flex items-center">
                <Code size={20} className="sm:hidden mr-2 text-blue-400" />
                <Code size={24} className="hidden sm:block mr-3 text-blue-400" />
                Skill Mastery Tree
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 transform transition-all duration-500 hover:scale-105 hover:-rotate-1 border border-gray-600/30"
                      onMouseEnter={() => setHoveredSkill(index)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex justify-between items-center mb-3 sm:mb-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Icon size={20} className="sm:hidden text-white" />
                          <Icon size={24} className="hidden sm:block text-white" />
                          <span className="text-white font-bold text-sm sm:text-base lg:text-lg">{skill.name}</span>
                        </div>
                        <span className="text-sm sm:text-lg text-gray-300 font-mono">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-3 sm:h-4 overflow-hidden relative">
                        <div
                          className={`bg-gradient-to-r ${skill.color} h-3 sm:h-4 rounded-full transition-all duration-2000 relative`}
                          style={{ width: `${hoveredSkill === index ? skill.level : isDecrypted ? skill.level : 0}%` }}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                          <div className="absolute right-0 top-0 h-full w-1 bg-white/80 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-3 flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-400">{skill.category}</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={10}
                              className={`sm:hidden ${i < Math.floor(skill.level / 20) ? 'text-yellow-400' : 'text-gray-600'} transition-colors duration-500`}
                              fill="currentColor"
                            />
                          ))}
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={`hidden sm:block ${i < Math.floor(skill.level / 20) ? 'text-yellow-400' : 'text-gray-600'} transition-colors duration-500`}
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="bg-gradient-to-br from-gray-800/90 via-purple-900/30 to-gray-900/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-purple-500/50 shadow-2xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 flex items-center">
                <Award size={20} className="sm:hidden mr-2 text-green-400" />
                <Award size={24} className="hidden sm:block mr-3 text-green-400" />
                Epic Quest Chronicles
              </h3>

              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                {([
                  {
                    title: 'Senior Developer Quest',
                    company: 'Virtual Technology',
                    period: '2025 - Present',
                    icon: Crown,
                    color: 'purple',
                    borderColor: 'border-purple-500',
                    bgColor: 'bg-purple-500',
                    description: '🎯 Lead development of secure applications • 👥 Manage team of 2 developers • 🛡️ Implement security protocols',
                  },
                  {
                    title: 'Full Stack Developer Quest',
                    company: 'Virtual Technology',
                    period: '2024 - 2025',
                    icon: Code,
                    color: 'blue',
                    borderColor: 'border-blue-500',
                    bgColor: 'bg-blue-500',
                    description: '⚡ Built scalable web applications • 🔒 Implemented authentication systems • 📊 Optimized performance',
                  },
                  {
                    title: 'Frontend Developer Quest',
                    company: 'Virtual Technology',
                    period: '2024',
                    icon: Sparkles,
                    color: 'green',
                    borderColor: 'border-green-500',
                    bgColor: 'bg-green-500',
                    description: '🎨 Developed responsive interfaces • 👨‍💻 Collaborated with designers • 📱 Mobile-first approach',
                  },
                ] as Quest[]).map((quest, index) => {
                  const Icon = quest.icon;
                  return (
                    <div
                      key={index}
                      className={`relative ${quest.borderColor} border-l-2 sm:border-l-4 pl-4 sm:pl-8 transform transition-all duration-500 hover:scale-105 hover:translate-x-2 sm:hover:translate-x-4`}
                    >
                      <div className={`absolute -left-3 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 ${quest.bgColor} rounded-full flex items-center justify-center shadow-lg animate-pulse`}>
                        <Icon size={12} className="sm:hidden text-white" />
                        <Icon size={16} className="hidden sm:block text-white" />
                      </div>
                      <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-500">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-3 space-y-2 sm:space-y-0">
                          <h4 className="font-bold text-white text-base sm:text-lg lg:text-xl">{quest.title}</h4>
                          <span className="text-xs sm:text-sm text-gray-400 bg-gray-600/50 px-2 sm:px-3 py-1 rounded-full border border-gray-500/30 self-start">
                            {quest.period}
                          </span>
                        </div>
                        <p className={`text-sm sm:text-base lg:text-lg text-${quest.color}-400 mb-2 sm:mb-3 font-semibold`}>{quest.company}</p>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{quest.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 sm:mt-8 lg:mt-12 text-center">
          <div className="inline-flex items-center flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-purple-500/50 shadow-2xl">
            <span className="text-gray-300 text-sm sm:text-base lg:text-lg font-semibold flex items-center w-full sm:w-auto justify-center sm:justify-start mb-2 sm:mb-0">
              <Gamepad2 size={16} className="sm:hidden mr-2 text-purple-400" />
              <Gamepad2 size={20} className="hidden sm:block mr-2 text-purple-400" />
              Navigate to:
            </span>
            {[
              { name: 'Skills Hub', color: 'from-blue-500 to-blue-600', hoverColor: 'hover:from-blue-600 hover:to-blue-700', icon: Code, route: '/skills' },
              { name: 'Projects Lab', color: 'from-green-500 to-green-600', hoverColor: 'hover:from-green-600 hover:to-green-700', icon: Target, route: '/projects' },
              { name: 'Home Base', color: 'from-purple-500 to-purple-600', hoverColor: 'hover:from-purple-600 hover:to-purple-700', icon: Crown, route: '/home' },
            ].map((nav, index) => {
              const Icon = nav.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleNavigation(nav.route)}
                  className={`group px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-gradient-to-r ${nav.color} text-white rounded-lg sm:rounded-xl ${nav.hoverColor} transition-all duration-500 transform hover:scale-110 hover:-rotate-2 shadow-lg font-semibold text-sm sm:text-base`}
                >
                  <span className="flex items-center space-x-1 sm:space-x-2">
                    <Icon size={14} className="sm:hidden group-hover:animate-bounce" />
                    <Icon size={18} className="hidden sm:block group-hover:animate-bounce" />
                    <span>{nav.name}</span>
                    <ChevronRight size={12} className="sm:hidden group-hover:translate-x-1 transition-transform" />
                    <ChevronRight size={16} className="hidden sm:block group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Achievement Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md w-full border-2 border-purple-500/50 shadow-2xl transform animate-scale-in">
            <div className="text-center">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r ${getRarityColor(selectedAchievement.rarity)} flex items-center justify-center ${getRarityGlow(
                  selectedAchievement.rarity
                )} animate-pulse`}
              >
                <selectedAchievement.icon size={32} className="sm:hidden text-white" />
                <selectedAchievement.icon size={40} className="hidden sm:block lg:hidden text-white" />
                <selectedAchievement.icon size={48} className="hidden lg:block text-white" />
              </div>
              <div className="mb-3 sm:mb-4">
                <span
                  className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    selectedAchievement.rarity === 'legendary' ? 'bg-yellow-500 text-black' : selectedAchievement.rarity === 'epic' ? 'bg-purple-500 text-white' : 'bg-blue-500 text-white'
                  }`}
                >
                  {selectedAchievement.rarity}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">{selectedAchievement.name}</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{selectedAchievement.description}</p>

              {/* XP Reward */}
              <div className="flex justify-center items-center space-x-2 mb-4 sm:mb-6 p-2 sm:p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg sm:rounded-xl border border-yellow-500/30">
                <Zap size={16} className="sm:hidden text-yellow-400" />
                <Zap size={20} className="hidden sm:block text-yellow-400" />
                <span className="text-yellow-400 font-bold text-sm sm:text-base">+{selectedAchievement.xpReward} XP Reward</span>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center space-x-1 mb-4 sm:mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="sm:hidden text-yellow-400 animate-pulse" fill="currentColor" style={{ animationDelay: `${i * 200}ms` }} />
                ))}
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} className="hidden sm:block text-yellow-400 animate-pulse" fill="currentColor" style={{ animationDelay: `${i * 200}ms` }} />
                ))}
              </div>

              <button
                onClick={() => setSelectedAchievement(null)}
                className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-105 font-semibold shadow-lg text-sm sm:text-base"
              >
                <span className="flex items-center space-x-2">
                  <span>Close</span>
                  <ChevronRight size={14} className="sm:hidden" />
                  <ChevronRight size={16} className="hidden sm:block" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.5) rotate(-10deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
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

        /* Custom scrollbar for better mobile experience */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.6);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.8);
        }
      `}</style>
    </div>
  );
};

export default GameifiedAboutPage;