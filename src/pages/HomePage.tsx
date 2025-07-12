import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [systemBoot, setSystemBoot] = useState(0);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showAchievement, setShowAchievement] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [stats, setStats] = useState({
    linesOfCode: 0,
    projectsCompleted: 0,
    bugsSquashed: 0,
    coffeeConsumed: 0
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particles: Array<{x: number, y: number, vx: number, vy: number, size: number}> = [];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Boot sequence
  useEffect(() => {
    const bootInterval = setInterval(() => {
      setSystemBoot(prev => {
        if (prev >= 100) {
          clearInterval(bootInterval);
          setTimeout(() => {
            setLoading(false);
            unlockAchievement('SYSTEM_ONLINE');
            animateStats();
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 3;
      });
    }, 120);

    return () => clearInterval(bootInterval);
  }, []);

  // Level system
  useEffect(() => {
    const newLevel = Math.floor(experience / 1000) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      unlockAchievement(`LEVEL_${newLevel}`);
    }
  }, [experience, level]);

  const unlockAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      setAchievements(prev => [...prev, achievement]);
      setShowAchievement(achievement);
      setTimeout(() => setShowAchievement(''), 3000);
    }
  };

  const animateStats = () => {
    const duration = 3000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setStats({
        linesOfCode: Math.floor(progress * 50000),
        projectsCompleted: Math.floor(progress * 25),
        bugsSquashed: Math.floor(progress * 150),
        coffeeConsumed: Math.floor(progress * 300)
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setExperience(1500);
      }
    };
    
    animate();
  };

  const handleCardClick = (section: string) => {
    setExperience(prev => prev + 250);
    navigate(`/${section}`);
  };

  const getAchievementTitle = (achievement: string) => {
    const titles: { [key: string]: string } = {
      'SYSTEM_ONLINE': 'System Online!',
      'LEVEL_2': 'Level Up!',
      'LEVEL_3': 'Expert Mode!',
      'LEVEL_4': 'Master Developer!'
    };
    return titles[achievement] || achievement;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center relative overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />
        <div className="text-center z-10 max-w-2xl mx-auto p-6">
          <div className="text-6xl mb-6 animate-pulse">⚡</div>
          <h2 className="text-4xl mb-8 font-bold">INITIALIZING GAME MODE</h2>
          
          <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg border border-green-500 shadow-2xl">
            <div className="relative h-6 bg-gray-800 rounded-full mb-6 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300"
                style={{ width: `${systemBoot}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
              </div>
            </div>
            
            <div className="text-3xl font-bold mb-6">{systemBoot}%</div>
            
            <div className="text-left font-mono text-sm space-y-2">
              <div className="flex items-center">
                <span className="mr-2">🔧</span>
                <span className="animate-pulse">Initializing quantum processors...</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🌐</span>
                <span className="animate-pulse">Establishing neural networks...</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🔐</span>
                <span className="animate-pulse">Encrypting data streams...</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">⚡</span>
                <span className="animate-pulse">Powering up game engine...</span>
              </div>
              {systemBoot > 40 && (
                <div className="flex items-center text-yellow-400">
                  <span className="mr-2">🎮</span>
                  <span className="animate-pulse">Loading player profile...</span>
                </div>
              )}
              {systemBoot > 60 && (
                <div className="flex items-center text-blue-400">
                  <span className="mr-2">🏆</span>
                  <span className="animate-pulse">Initializing achievement system...</span>
                </div>
              )}
              {systemBoot > 80 && (
                <div className="flex items-center text-purple-400">
                  <span className="mr-2">✨</span>
                  <span className="animate-pulse">Calibrating experience points...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />
      
      {/* Achievement Popup */}
      {showAchievement && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-500 text-black px-6 py-4 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="font-bold text-lg">Achievement Unlocked!</div>
              <div className="text-sm">{getAchievementTitle(showAchievement)}</div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Player Stats Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="bg-gray-900 bg-opacity-90 px-6 py-3 rounded-lg border border-blue-500 shadow-lg">
              <div className="text-blue-400 font-bold text-lg">LEVEL {level}</div>
            </div>
            <div className="bg-gray-900 bg-opacity-90 px-6 py-3 rounded-lg border border-purple-500 shadow-lg">
              <div className="text-purple-400 font-bold text-lg">XP: {experience.toLocaleString()}</div>
            </div>
            <div className="bg-gray-900 bg-opacity-90 px-6 py-3 rounded-lg border border-yellow-500 shadow-lg">
              <div className="text-yellow-400 font-bold text-lg">🏆 {achievements.length}</div>
            </div>
          </div>
          
          <h1 className="text-6xl mb-4 font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            DEVELOPER.EXE
          </h1>
          
          <div className="text-2xl text-white mb-4">
            <div className="typing-animation">Elite Code Warrior | System Architect</div>
          </div>
          
          <div className="text-lg text-gray-300 mb-8">
            🎯 Mission: Explore all sectors and unlock achievements
          </div>
        </div>

        {/* Live Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg border border-green-500 text-center shadow-lg">
            <div className="text-4xl font-bold text-green-400 mb-2">
              {stats.linesOfCode.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">Lines of Code</div>
          </div>
          
          <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg border border-blue-500 text-center shadow-lg">
            <div className="text-4xl font-bold text-blue-400 mb-2">
              {stats.projectsCompleted}
            </div>
            <div className="text-sm text-gray-300">Projects</div>
          </div>
          
          <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg border border-red-500 text-center shadow-lg">
            <div className="text-4xl font-bold text-red-400 mb-2">
              {stats.bugsSquashed}
            </div>
            <div className="text-sm text-gray-300">Bugs Squashed</div>
          </div>
          
          <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg border border-yellow-500 text-center shadow-lg">
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {stats.coffeeConsumed}
            </div>
            <div className="text-sm text-gray-300">Coffee Cups</div>
          </div>
        </div>

        {/* Mission Brief */}
        <div className="text-center mb-8 bg-gray-900 bg-opacity-90 p-8 rounded-lg border border-cyan-500 shadow-lg">
          <h2 className="text-3xl mb-6 text-cyan-400 font-bold">🎮 MISSION OBJECTIVES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
            <div className="flex items-center justify-center">
              <span className="mr-3 text-2xl">🎯</span>
              <span className="text-white">Explore All Sectors</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-3 text-2xl">⚡</span>
              <span className="text-white">Gain Experience</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-3 text-2xl">🏆</span>
              <span className="text-white">Unlock Achievements</span>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {[
            { id: 'about', title: 'About Sector', icon: '🧙‍♂️', desc: 'Discover the origin story', color: 'green' },
            { id: 'skills', title: 'Skills Matrix', icon: '⚔️', desc: 'Unlock technical abilities', color: 'blue' },
            { id: 'projects', title: 'Battle Archives', icon: '🏆', desc: 'View conquered challenges', color: 'purple' }
          ].map(card => (
            <div
              key={card.id}
              className={`relative bg-gray-900 bg-opacity-90 p-8 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg ${
                hoveredCard === card.id 
                  ? `border-${card.color}-400 shadow-${card.color}-400/50` 
                  : `border-${card.color}-500`
              }`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="text-6xl mb-6 text-center">{card.icon}</div>
              <h3 className="text-2xl mb-4 text-center font-bold text-white">{card.title}</h3>
              <p className="text-gray-300 text-center mb-6">{card.desc}</p>
              <div className="text-center">
                <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold">
                  +250 XP
                </span>
              </div>
              
              {hoveredCard === card.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-10 rounded-lg" />
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="text-center">
          <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg border border-purple-500 shadow-lg">
            <h3 className="text-2xl mb-4 text-purple-400 font-bold">Mission Progress</h3>
            <div className="w-full bg-gray-800 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((experience / 3000) * 100, 100)}%` }}
              />
            </div>
            <div className="text-lg text-gray-300">
              {Math.min(Math.floor((experience / 3000) * 100), 100)}% Complete
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .typing-animation {
          overflow: hidden;
          border-right: 2px solid #22c55e;
          white-space: nowrap;
          margin: 0 auto;
          animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
          display: inline-block;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #22c55e }
        }
      `}</style>
    </div>
  );
};

export default HomePage;