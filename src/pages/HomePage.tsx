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
  const [isMobile, setIsMobile] = useState(false);
  const [matrixText, setMatrixText] = useState('');
  const [hackingPhase, setHackingPhase] = useState(0);
  const [stats, setStats] = useState({
    linesOfCode: 0,
    projectsCompleted: 0,
    bugsSquashed: 0,
    coffeeConsumed: 0
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Matrix Rain Animation for loading screen
  useEffect(() => {
    if (!loading) return;
    
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'.split('');
    const fontSize = isMobile ? 12 : 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [loading, isMobile]);

  // Particle animation for main page
  useEffect(() => {
    if (loading) return;
    
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
    
    // Create fewer particles on mobile for performance
    const particleCount = isMobile ? 25 : 50;
    for (let i = 0; i < particleCount; i++) {
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
  }, [loading, isMobile]);

  // Hacker typing animation
  useEffect(() => {
    if (!loading) return;
    
    const messages = [
      'ACCESSING MAINFRAME...',
      'BYPASSING SECURITY PROTOCOLS...',
      'DECRYPTING DATA STREAMS...',
      'INITIALIZING NEURAL NETWORK...',
      'LOADING ELITE PROFILE...',
      'ESTABLISHING CONNECTION...',
      'SYSTEM BREACH SUCCESSFUL...'
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    
    const typeMessage = () => {
      if (messageIndex < messages.length) {
        const currentMessage = messages[messageIndex];
        if (charIndex < currentMessage.length) {
          setMatrixText(currentMessage.substring(0, charIndex + 1));
          charIndex++;
          setTimeout(typeMessage, 50 + Math.random() * 100);
        } else {
          setTimeout(() => {
            messageIndex++;
            charIndex = 0;
            if (messageIndex < messages.length) {
              setMatrixText('');
              setTimeout(typeMessage, 300);
            }
          }, 1000);
        }
      }
    };
    
    setTimeout(typeMessage, 1000);
  }, [loading]);

  // Enhanced boot sequence with hacking phases
  useEffect(() => {
    const phases = [
      { phase: 0, message: 'INITIATING HACK...', duration: 1000 },
      { phase: 1, message: 'SCANNING NETWORK...', duration: 1500 },
      { phase: 2, message: 'BREACHING FIREWALL...', duration: 2000 },
      { phase: 3, message: 'ACCESSING DATABASE...', duration: 1500 },
      { phase: 4, message: 'DOWNLOAD COMPLETE...', duration: 1000 }
    ];
    
    let currentPhase = 0;
    
    const phaseInterval = setInterval(() => {
      if (currentPhase < phases.length) {
        setHackingPhase(currentPhase);
        currentPhase++;
      } else {
        clearInterval(phaseInterval);
      }
    }, 1200);

    const bootInterval = setInterval(() => {
      setSystemBoot(prev => {
        if (prev >= 100) {
          clearInterval(bootInterval);
          setTimeout(() => {
            setLoading(false);
            unlockAchievement('SYSTEM_ONLINE');
            animateStats();
          }, 1500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 150);

    return () => {
      clearInterval(bootInterval);
      clearInterval(phaseInterval);
    };
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
      <div className="min-h-screen text-green-400 flex items-center justify-center relative overflow-hidden">
        {/* Matrix Rain Background */}
        <canvas ref={matrixCanvasRef} className="absolute inset-0 opacity-60" />
        
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-green-400 opacity-50 animate-ping"></div>
        </div>
        
        <div className={`text-center z-10 mx-auto ${isMobile ? 'p-4 max-w-sm' : 'p-6 max-w-2xl'}`}>
          {/* Animated Terminal Icon */}
          <div className={`mb-6 ${isMobile ? 'text-4xl' : 'text-6xl'}`}>
            <div className="relative inline-block">
              <div className="relative">
                {/* Rotating brackets animation */}
                <div className="flex items-center justify-center gap-1">
                  <span className="text-green-400 animate-pulse inline-block" style={{ animationDelay: '0s' }}>&lt;</span>
                  <span className="text-red-500 animate-bounce inline-block" style={{ animationDelay: '0.1s' }}>/</span>
                  <span className="text-green-400 animate-pulse inline-block" style={{ animationDelay: '0.2s' }}>&gt;</span>
                </div>
                {/* Orbiting dots */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
          
          <h2 className={`mb-8 font-bold font-mono ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
            <span className="text-red-500">[</span>
            <span className="animate-pulse">HACKING IN PROGRESS</span>
            <span className="text-red-500">]</span>
          </h2>
          
          <div className={`bg-gray-900 bg-opacity-90 rounded-lg border border-green-500 shadow-2xl ${
            isMobile ? 'p-4' : 'p-8'
          }`}>
            {/* Progress Bar with Glitch Effect */}
            <div className={`relative bg-gray-800 rounded-full mb-6 overflow-hidden ${
              isMobile ? 'h-4' : 'h-6'
            }`}>
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 via-green-400 to-green-600 transition-all duration-300"
                style={{ width: `${systemBoot}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 animate-pulse" />
                {/* Glitch effect */}
                <div className="absolute inset-0 bg-red-500 opacity-20 animate-ping" style={{ animationDuration: '0.1s' }} />
              </div>
            </div>
            
            <div className={`font-bold mb-6 font-mono ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
              <span className="text-red-500">{systemBoot}</span>
              <span className="text-green-400">%</span>
              <span className="animate-pulse ml-2">COMPLETE</span>
            </div>
            
            {/* Hacker Terminal Output */}
            <div className={`text-left font-mono space-y-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              <div className="text-green-400 mb-4">
                <span className="text-red-500">root@elite:~$ </span>
                <span className="animate-pulse">{matrixText}</span>
                <span className="animate-ping">|</span>
              </div>
              
              <div className="space-y-1">
                <div className={`flex items-center ${hackingPhase >= 0 ? 'text-green-400' : 'text-gray-600'}`}>
                  <span className="mr-2 text-red-500">►</span>
                  <span>Getting your IP address...</span>
                  {hackingPhase >= 0 && <span className="ml-auto text-green-400">[OK]</span>}
                </div>
                <div className={`flex items-center ${hackingPhase >= 1 ? 'text-green-400' : 'text-gray-600'}`}>
                  <span className="mr-2 text-red-500">►</span>
                  <span>Fetching user details...</span>
                  {hackingPhase >= 1 && <span className="ml-auto text-green-400">[OK]</span>}
                </div>
                <div className={`flex items-center ${hackingPhase >= 2 ? 'text-green-400' : 'text-gray-600'}`}>
                  <span className="mr-2 text-red-500">►</span>
                  <span>Analyzing browser fingerprint...</span>
                  {hackingPhase >= 2 && <span className="ml-auto text-green-400">[OK]</span>}
                </div>
                <div className={`flex items-center ${hackingPhase >= 3 ? 'text-green-400' : 'text-gray-600'}`}>
                  <span className="mr-2 text-red-500">►</span>
                  <span>Extracting device information...</span>
                  {hackingPhase >= 3 && <span className="ml-auto text-green-400">[OK]</span>}
                </div>
                <div className={`flex items-center ${hackingPhase >= 4 ? 'text-green-400' : 'text-gray-600'}`}>
                  <span className="mr-2 text-red-500">►</span>
                  <span>Loading portfolio data...</span>
                  {hackingPhase >= 4 && <span className="ml-auto text-green-400">[COMPLETE]</span>}
                </div>
              </div>
              
              {systemBoot > 90 && (
                <div className="mt-4 text-center">
                  <div className="text-red-500 font-bold animate-pulse">
                    ACCESS GRANTED - WELCOME TO THE MATRIX
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-green-400 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />
      
      {/* Achievement Popup */}
      {showAchievement && (
        <div className={`fixed z-50 bg-yellow-500 text-black rounded-lg shadow-lg animate-bounce ${
          isMobile ? 'top-2 right-2 left-2 px-4 py-3' : 'top-4 right-4 px-6 py-4'
        }`}>
          <div className="flex items-center space-x-3">
            <span className={isMobile ? 'text-xl' : 'text-2xl'}>🏆</span>
            <div>
              <div className={`font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>Achievement Unlocked!</div>
              <div className={isMobile ? 'text-xs' : 'text-sm'}>{getAchievementTitle(showAchievement)}</div>
            </div>
          </div>
        </div>
      )}

      <div className={`relative z-10 mx-auto ${
        isMobile ? 'p-3 max-w-full' : 'p-6 max-w-6xl'
      }`}>
        {/* Player Stats Header */}
        <div className={`text-center ${isMobile ? 'mb-6' : 'mb-8'}`}>
          <div className={`flex justify-center items-center mb-8 ${
            isMobile ? 'flex-col space-y-3' : 'space-x-6'
          }`}>
            <div className={`bg-gray-900 bg-opacity-90 rounded-lg border border-blue-500 shadow-lg ${
              isMobile ? 'px-4 py-2 w-full max-w-xs' : 'px-6 py-3'
            }`}>
              <div className={`text-blue-400 font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>LEVEL {level}</div>
            </div>
            <div className={`bg-gray-900 bg-opacity-90 rounded-lg border border-purple-500 shadow-lg ${
              isMobile ? 'px-4 py-2 w-full max-w-xs' : 'px-6 py-3'
            }`}>
              <div className={`text-purple-400 font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>XP: {experience.toLocaleString()}</div>
            </div>
            <div className={`bg-gray-900 bg-opacity-90 rounded-lg border border-yellow-500 shadow-lg ${
              isMobile ? 'px-4 py-2 w-full max-w-xs' : 'px-6 py-3'
            }`}>
              <div className={`text-yellow-400 font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>🏆 {achievements.length}</div>
            </div>
          </div>
          
          <h1 className={`mb-4 font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent ${
            isMobile ? 'text-3xl' : 'text-6xl'
          }`}>
            DEVELOPER.EXE
          </h1>
          
          <div className={`text-white mb-4 ${isMobile ? 'text-lg' : 'text-2xl'}`}>
            <div className="typing-animation">Elite Code Warrior | System Architect</div>
          </div>
          
          <div className={`text-gray-300 mb-8 ${isMobile ? 'text-sm px-2' : 'text-lg'}`}>
            🎯 Mission: Explore all sectors and unlock achievements
          </div>
        </div>

        {/* Live Stats Grid */}
        <div className={`grid mb-8 ${
          isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-2 md:grid-cols-4 gap-6'
        }`}>
          <div className={`bg-gray-900 bg-opacity-90 rounded-lg border border-green-500 text-center shadow-lg ${
            isMobile ? 'p-3' : 'p-6'
          }`}>
            <div className={`font-bold text-green-400 mb-2 ${
              isMobile ? 'text-2xl' : 'text-4xl'
            }`}>
              {stats.linesOfCode.toLocaleString()}
            </div>
            <div className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Lines of Code</div>
          </div>
          
          <div className={`bg-gray-900 bg-opacity-90 rounded-lg border border-blue-500 text-center shadow-lg ${
            isMobile ? 'p-3' : 'p-6'
          }`}>
            <div className={`font-bold text-blue-400 mb-2 ${
              isMobile ? 'text-2xl' : 'text-4xl'
            }`}>
              {stats.projectsCompleted}
            </div>
            <div className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Projects</div>
          </div>
          
          <div className={`bg-gray-900 bg-opacity-90 rounded-lg border border-red-500 text-center shadow-lg ${
            isMobile ? 'p-3' : 'p-6'
          }`}>
            <div className={`font-bold text-red-400 mb-2 ${
              isMobile ? 'text-2xl' : 'text-4xl'
            }`}>
              {stats.bugsSquashed}
            </div>
            <div className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Bugs Squashed</div>
          </div>
          
          <div className={`bg-gray-900 bg-opacity-90 rounded-lg border border-yellow-500 text-center shadow-lg ${
            isMobile ? 'p-3' : 'p-6'
          }`}>
            <div className={`font-bold text-yellow-400 mb-2 ${
              isMobile ? 'text-2xl' : 'text-4xl'
            }`}>
              {stats.coffeeConsumed}
            </div>
            <div className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Coffee Cups</div>
          </div>
        </div>

        {/* Mission Brief */}
        <div className={`text-center mb-8 bg-gray-900 bg-opacity-90 rounded-lg border border-cyan-500 shadow-lg ${
          isMobile ? 'p-4' : 'p-8'
        }`}>
          <h2 className={`mb-6 text-cyan-400 font-bold ${
            isMobile ? 'text-xl' : 'text-3xl'
          }`}>🎮 MISSION OBJECTIVES</h2>
          <div className={`grid gap-6 ${
            isMobile ? 'grid-cols-1 text-base' : 'grid-cols-1 md:grid-cols-3 text-lg'
          }`}>
            <div className="flex items-center justify-center">
              <span className={`mr-3 ${
                isMobile ? 'text-xl' : 'text-2xl'
              }`}>🎯</span>
              <span className="text-white">Explore All Sectors</span>
            </div>
            <div className="flex items-center justify-center">
              <span className={`mr-3 ${
                isMobile ? 'text-xl' : 'text-2xl'
              }`}>⚡</span>
              <span className="text-white">Gain Experience</span>
            </div>
            <div className="flex items-center justify-center">
              <span className={`mr-3 ${
                isMobile ? 'text-xl' : 'text-2xl'
              }`}>🏆</span>
              <span className="text-white">Unlock Achievements</span>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className={`grid mb-8 ${
          isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-3 gap-8'
        }`}>
          {[
            { id: 'about', title: 'About Sector', icon: '🧙‍♂️', desc: 'Discover the origin story', color: 'green' },
            { id: 'skills', title: 'Skills Matrix', icon: '⚔️', desc: 'Unlock technical abilities', color: 'blue' },
            { id: 'projects', title: 'Battle Archives', icon: '🏆', desc: 'View conquered challenges', color: 'purple' },
            { id: 'contact', title: 'Contact Guild', icon: '📬', desc: 'Send a raven or message scroll', color: 'orange' },
            { id: 'education', title: 'Training Grounds', icon: '🎓', desc: 'Explore knowledge quests', color: 'teal' }            
          ].map(card => (
            <div
              key={card.id}
              className={`relative bg-gray-900 bg-opacity-90 rounded-lg border-2 cursor-pointer transition-all duration-300 shadow-lg ${
                isMobile ? 'p-4 hover:bg-gray-800 active:scale-95' : 'p-8 transform hover:scale-105'
              } ${
                hoveredCard === card.id 
                  ? `border-${card.color}-400 shadow-${card.color}-400/50` 
                  : `border-${card.color}-500`
              }`}
              onMouseEnter={() => !isMobile && setHoveredCard(card.id)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
              onTouchStart={() => isMobile && setHoveredCard(card.id)}
              onTouchEnd={() => isMobile && setTimeout(() => setHoveredCard(null), 150)}
              onClick={() => handleCardClick(card.id)}
            >
              <div className={`text-center mb-6 ${
                isMobile ? 'text-4xl mb-4' : 'text-6xl mb-6'
              }`}>{card.icon}</div>
              <h3 className={`text-center font-bold text-white mb-4 ${
                isMobile ? 'text-lg' : 'text-2xl'
              }`}>{card.title}</h3>
              <p className={`text-gray-300 text-center mb-6 ${
                isMobile ? 'text-sm mb-4' : 'mb-6'
              }`}>{card.desc}</p>
              <div className="text-center">
                <span className={`bg-green-600 text-white rounded-full font-bold ${
                  isMobile ? 'px-3 py-1 text-sm' : 'px-4 py-2'
                }`}>
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
          <div className={`bg-gray-900 bg-opacity-90 rounded-lg border border-purple-500 shadow-lg ${
            isMobile ? 'p-4' : 'p-6'
          }`}>
            <h3 className={`mb-4 text-purple-400 font-bold ${
              isMobile ? 'text-lg' : 'text-2xl'
            }`}>Mission Progress</h3>
            <div className={`w-full bg-gray-800 rounded-full mb-4 ${
              isMobile ? 'h-3' : 'h-4'
            }`}>
              <div 
                className={`bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500 ${
                  isMobile ? 'h-3' : 'h-4'
                }`}
                style={{ width: `${Math.min((experience / 3000) * 100, 100)}%` }}
              />
            </div>
            <div className={`text-gray-300 ${
              isMobile ? 'text-base' : 'text-lg'
            }`}>
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