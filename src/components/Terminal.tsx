import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, X } from 'lucide-react';

interface CommandResult {
  success: boolean;
  output: string;
  clear?: boolean;
  decrypt?: string;
}

interface TerminalProps {
  onCommand: (command: string) => CommandResult;
}

interface HistoryEntry {
  command: string;
  result: CommandResult;
  timestamp: Date;
}

interface Position {
  x: number;
  y: number;
}

const ModernTerminal: React.FC<TerminalProps> = ({ onCommand }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get screen size and responsive breakpoints
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({ width, height });
      
      // Responsive size adjustments
      if (width < 480) {
        // Extra small screens (phones)
        setSize({ width: width - 20, height: height - 100 });
        setPosition({ x: 10, y: 50 });
      } else if (width < 768) {
        // Small screens (small tablets)
        setSize({ width: width - 40, height: height - 120 });
        setPosition({ x: 20, y: 60 });
      } else if (width < 1024) {
        // Medium screens (tablets)
        setSize({ width: Math.min(700, width - 100), height: Math.min(500, height - 150) });
        setPosition({ x: 50, y: 75 });
      } else {
        // Large screens (desktop)
        setSize({ width: 800, height: 500 });
        setPosition({ x: 100, y: 100 });
      }
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Check if mobile device
  const isMobile = screenSize.width < 768;
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;
  const isExtraSmall = screenSize.width < 480;

  // Welcome message with responsive styling
  useEffect(() => {
    const welcomeMessage: HistoryEntry = {
      command: '',
      result: {
        success: true,
        output: `🚀 Navigator v3.0${isMobile ? '\n' : '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'}
✨ Welcome to the Elite Dev Terminal!
📅 System initialized: ${new Date().toLocaleString()}

🎯 Available Commands:
  help        - Show all available commands
  cd </path>   - Navigate to different sections
  ls          - List current directory contents
  about       - Learn more about me
  projects    - View my projects
  skills      - Check out my skills
  contact     - Get in touch
  
💡 Pro Tips:
  • Use Tab for auto-completion
  • Use ↑/↓ arrows for command history${!isMobile ? '\n  • Drag this window around!\n  • Resize from the bottom-right corner' : ''}

Ready to explore? Type a command below! 👇`,
      },
      timestamp: new Date(),
    };
    
    setHistory([welcomeMessage]);
  }, [isMobile]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  // Handle dragging (disabled on mobile and tablet)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile || isTablet) return;
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isMaximized && !isMobile && !isTablet) {
      const newX = Math.max(0, Math.min(screenSize.width - size.width, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(screenSize.height - size.height, e.clientY - dragOffset.y));
      
      setPosition({
        x: newX,
        y: newY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, screenSize, size]);

  // Handle window controls
  const handleMinimize = () => {
    setIsAnimating(true);
    setIsMinimized(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleMaximize = () => {
    setIsAnimating(true);
    setIsMaximized(!isMaximized);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimating(false);
    }, 300);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle command execution
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const result = onCommand(input);
    
    const newEntry: HistoryEntry = {
      command: input,
      result,
      timestamp: new Date(),
    };
    
    if (result.clear) {
      setHistory([]);
    } else {
      setHistory(prev => [...prev, newEntry]);
    }
    
    // Check if the command is a cd command and auto-minimize
    const trimmedInput = input.trim().toLowerCase();
    if (trimmedInput.startsWith('cd ') || trimmedInput === 'cd') {
      setTimeout(() => {
        handleMinimize();
      }, 1000);
    }
    
    setInput('');
    setHistoryIndex(-1);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].command);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'cd', 'ls', 'about', 'projects', 'skills', 'contact', 'clear', 'date', 'whoami'];
      const match = commands.find(cmd => cmd.startsWith(input));
      if (match) setInput(match);
    }
  };

  // Render history entries with responsive styling
  const renderHistoryEntries = () => {
    return history.map((entry, index) => (
      <div key={index} className="mb-3 md:mb-4 animate-fade-in">
        {entry.command && (
          <div className="flex items-center mb-1 md:mb-2 flex-wrap">
            <span className="text-blue-400 font-mono font-bold text-sm md:text-base">❯</span>
            <span className="ml-2 text-white font-mono text-sm md:text-base break-all">{entry.command}</span>
            <span className="ml-auto text-gray-500 text-xs mt-1 md:mt-0 w-full md:w-auto">
              {entry.timestamp.toLocaleTimeString()}
            </span>
          </div>
        )}
        <div className="text-gray-300 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-line ml-2 md:ml-4 border-l-2 border-gray-700 pl-2 md:pl-4 break-words">
          {entry.result.output}
        </div>
      </div>
    ));
  };

  if (!isVisible) return null;

  // Minimized state with responsive positioning
  if (isMinimized) {
    return (
      <div 
        className="fixed z-50 cursor-pointer bottom-4 right-4"
        onClick={handleRestore}
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-600 rounded-lg px-3 md:px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-sm"></div>
            <span className="text-white text-xs md:text-sm font-medium">Terminal</span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Responsive window styling
  const getWindowStyle = () => {
    if (isMobile || isTablet) {
      return isMaximized
        ? { top: 0, left: 0, width: '100vw', height: '100vh' }
        : { 
            top: `${position.y}px`, 
            left: `${position.x}px`, 
            width: `${size.width}px`, 
            height: `${size.height}px`,
            maxWidth: '100vw',
            maxHeight: '100vh'
          };
    }
    
    return isMaximized 
      ? { top: 0, left: 0, width: '100vw', height: '100vh' }
      : { 
          top: `${position.y}px`, 
          left: `${position.x}px`, 
          width: `${size.width}px`, 
          height: `${size.height}px` 
        };
  };

  return (
    <div 
      ref={terminalRef}
      className={`fixed z-50 transition-all duration-300 ${
        isAnimating ? 'animate-bounce' : ''
      } ${isDragging ? 'cursor-grabbing' : (isMobile || isTablet ? '' : 'cursor-grab')}`}
      style={getWindowStyle()}
    >
      {/* Window Container */}
      <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-600 rounded-lg md:rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
        
        {/* Title Bar */}
        <div 
          className={`drag-handle bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-600 px-3 md:px-4 py-2 md:py-3 flex items-center justify-between ${
            !isMobile && !isTablet ? 'cursor-move' : ''
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-sm"></div>
            <span className="text-white font-semibold text-sm md:text-base">Navigator</span>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
          
          {/* Window Controls */}
          <div className="flex items-center space-x-1 md:space-x-2">
            <button 
              onClick={handleMinimize}
              className="p-1 md:p-1.5 hover:bg-gray-700 rounded-md transition-colors group"
              title="Minimize"
            >
              <Minimize2 size={isExtraSmall ? 12 : 14} className="text-gray-400 group-hover:text-yellow-400" />
            </button>
            <button 
              onClick={handleMaximize}
              className="p-1 md:p-1.5 hover:bg-gray-700 rounded-md transition-colors group"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              <Maximize2 size={isExtraSmall ? 12 : 14} className="text-gray-400 group-hover:text-green-400" />
            </button>
            <button 
              onClick={handleClose}
              className="p-1 md:p-1.5 hover:bg-red-600 rounded-md transition-colors group"
              title="Close"
            >
              <X size={isExtraSmall ? 12 : 14} className="text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </div>
        
        {/* Terminal Body */}
        <div 
          className="flex-1 overflow-auto bg-black/50 backdrop-blur-sm" 
          ref={terminalBodyRef}
          style={{ height: 'calc(100% - 50px)' }}
        >
          <div className="p-2 md:p-4 space-y-1 md:space-y-2">
            {renderHistoryEntries()}
            
            {/* Input Line */}
            <div className="flex items-center space-x-1 md:space-x-2 mt-2 md:mt-4">
              <span className="text-blue-400 font-mono font-bold text-sm md:text-lg">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
                className="flex-1 bg-transparent text-white font-mono text-sm md:text-lg outline-none border-none caret-green-400"
                placeholder={isExtraSmall ? "Command..." : "Type a command..."}
                autoFocus
                spellCheck="false"
                autoComplete="off"
              />
              <div className="w-2 h-4 md:w-3 md:h-6 bg-green-400 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Resize Handle - Only show on desktop */}
        {!isMaximized && !isMobile && !isTablet && (
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize"
            style={{
              background: 'linear-gradient(-45deg, transparent 30%, #374151 30%, #374151 70%, transparent 70%)'
            }}
          />
        )}
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-lg md:rounded-xl pointer-events-none -z-10 blur-xl"></div>
    </div>
  );
};

// Demo component with sample command handler
const TerminalDemo = () => {
  const handleCommand = (command: string): CommandResult => {
    const cmd = command.trim().toLowerCase();
    
    switch (cmd) {
      case 'help':
        return {
          success: true,
          output: `Available commands:
• help - Show this help message
• about - Learn about me
• projects - View my projects
• skills - My technical skills
• contact - Get in touch
• clear - Clear terminal
• date - Show current date
• whoami - Current user info`
        };
      
      case 'about':
        return {
          success: true,
          output: `👋 Hi! I'm a passionate developer who loves creating amazing digital experiences.
          
🎯 What I do:
• Full-stack web development
• Mobile app development
• UI/UX design
• System architecture

💡 I believe in writing clean, efficient code and creating user-friendly interfaces.`
        };
      
      case 'projects':
        return {
          success: true,
          output: `🚀 My Recent Projects:

1. 📱 Mobile Banking App
   - React Native, Node.js, MongoDB
   - Secure payment processing
   
2. 🛒 E-commerce Platform
   - Next.js, PostgreSQL, Stripe
   - Real-time inventory management
   
3. 🎮 Game Development Studio Site
   - React, Three.js, WebGL
   - Interactive 3D experiences`
        };
      
      case 'skills':
        return {
          success: true,
          output: `💻 Technical Skills:

Frontend:
• JavaScript/TypeScript ⭐⭐⭐⭐⭐
• React/Next.js ⭐⭐⭐⭐⭐
• Vue.js ⭐⭐⭐⭐
• CSS/Tailwind ⭐⭐⭐⭐⭐

Backend:
• Node.js/Express ⭐⭐⭐⭐⭐
• Python/Django ⭐⭐⭐⭐
• PostgreSQL/MongoDB ⭐⭐⭐⭐
• AWS/Docker ⭐⭐⭐⭐`
        };
      
      case 'contact':
        return {
          success: true,
          output: `📬 Let's Connect!

📧 Email: developer@example.com
🐙 GitHub: github.com/developer
💼 LinkedIn: linkedin.com/in/developer
🐦 Twitter: @developer
🌐 Website: developer.dev

Feel free to reach out for collaborations or just to say hi! 👋`
        };
      
      case 'clear':
        return {
          success: true,
          output: '',
          clear: true
        };
      
      case 'date':
        return {
          success: true,
          output: `📅 ${new Date().toLocaleString()}`
        };
      
      case 'whoami':
        return {
          success: true,
          output: `👤 guest@navigator:~$ 
💻 System: Navigator Terminal v3.0
🌍 Location: Web Browser
🔑 Access Level: Guest`
        };
      
      default:
        return {
          success: false,
          output: `Command not found: ${command}
Type 'help' to see available commands.`
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <ModernTerminal onCommand={handleCommand} />
    </div>
  );
};

export default TerminalDemo;