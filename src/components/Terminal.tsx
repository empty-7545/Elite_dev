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
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if mobile device and handle mobile keyboard
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Handle mobile keyboard visibility with better performance
    if (isMobile) {
      const handleResize = () => {
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          const viewportHeight = window.visualViewport?.height || window.innerHeight;
          const windowHeight = window.innerHeight;
          const keyboardHeight = Math.max(0, windowHeight - viewportHeight);
          setKeyboardHeight(keyboardHeight);
        });
      };

      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize);
        window.visualViewport.addEventListener('scroll', handleResize);
      } else {
        window.addEventListener('resize', handleResize);
      }

      return () => {
        window.removeEventListener('resize', checkMobile);
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', handleResize);
          window.visualViewport.removeEventListener('scroll', handleResize);
        } else {
          window.removeEventListener('resize', handleResize);
        }
      };
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  // Welcome message with modern styling
  useEffect(() => {
    const welcomeMessage: HistoryEntry = {
      command: '',
      result: {
        success: true,
        output: `🚀 Navigator v3.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Welcome to the Elite Dev Terminal!
📅 System initialized: ${new Date().toLocaleString()}

🎯 Quick Start:
  help           - Show all available commands
  cd about       - Navigate to about section
  cd projects    - View my projects
  cd skills      - Check out my skills
  cd contact     - Get in touch
  ls             - List all sections
  
💡 Pro Tips:
  • Use Tab for auto-completion
  • Use ↑/↓ arrows for command history
  • Both 'cd about' and 'cd /about' work!
  • Drag this window around (desktop only)

Ready to explore? Type a command below! 👇`,
      },
      timestamp: new Date(),
    };
    
    setHistory([welcomeMessage]);
  }, []);

  // Auto-scroll to bottom with better performance
  useEffect(() => {
    if (terminalBodyRef.current) {
      const scrollToBottom = () => {
        requestAnimationFrame(() => {
          if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
          }
        });
      };
      
      // Immediate scroll
      scrollToBottom();
      
      // Delayed scroll for mobile keyboard adjustments
      if (isMobile && isInputFocused) {
        const timer1 = setTimeout(scrollToBottom, 150);
        const timer2 = setTimeout(scrollToBottom, 350);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    }
  }, [history, isMobile, keyboardHeight, isInputFocused]);

  // Handle dragging (disabled on mobile)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
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
  }, [isDragging, dragOffset]);

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

  // Handle command execution - Auto-minimize on cd commands
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
      // Add a small delay to show the command result before minimizing
      setTimeout(() => {
        handleMinimize();
      }, 1000); // 1 second delay to see the result
    }
    
    setInput('');
    setHistoryIndex(-1);
    
    // Keep focus on input after command execution with mobile-specific handling
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          // On mobile, ensure the input is visible after keyboard appears
          if (isMobile) {
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      }, isMobile ? 50 : 0);
    });
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

  // Render history entries
  const renderHistoryEntries = () => {
    return history.map((entry, index) => (
      <div key={index} className="mb-4 animate-fade-in">
        {entry.command && (
          <div className="flex items-center mb-2">
            <span className="text-blue-400 font-mono font-bold">❯</span>
            <span className="ml-2 text-white font-mono">{entry.command}</span>
            <span className="ml-auto text-gray-500 text-xs">
              {entry.timestamp.toLocaleTimeString()}
            </span>
          </div>
        )}
        <div className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-line ml-4 border-l-2 border-gray-700 pl-4">
          {entry.result.output}
        </div>
      </div>
    ));
  };

  if (!isVisible) return null;

  // Minimized state
  if (isMinimized) {
    return (
      <div 
        className={`fixed z-50 cursor-pointer ${
          isMobile ? 'bottom-4 right-4' : 'bottom-4 left-4'
        }`}
        onClick={handleRestore}
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-600 rounded-lg px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-400 rounded-sm"></div>
            <span className="text-white text-sm font-medium">Terminal</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const windowStyle = isMobile 
    ? { 
        top: '0px', 
        left: '0px', 
        width: '100vw', 
        height: keyboardHeight > 0 ? `calc(100vh - ${keyboardHeight}px)` : '100vh',
        position: 'fixed' as const,
        transform: 'translateZ(0)', // Enable hardware acceleration
        willChange: keyboardHeight > 0 ? 'height' : 'auto'
      }
    : isMaximized 
      ? { top: 0, left: 0, width: '100vw', height: '100vh', transform: 'translateZ(0)' }
      : { 
          top: `${position.y}px`, 
          left: `${position.x}px`, 
          width: '800px', 
          height: '500px',
          transform: 'translateZ(0)'
        };

  return (
    <div 
      ref={terminalRef}
      className={`fixed z-50 transition-all duration-300 ${
        isAnimating ? 'animate-bounce' : ''
      } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={windowStyle}
    >
      {/* Window Container */}
      <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-600 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm will-change-transform">
        
        {/* Title Bar */}
        <div 
          className={`drag-handle bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-600 ${
            isMobile ? 'px-3 py-2' : 'px-4 py-3'
          } flex items-center justify-between ${isMobile ? 'cursor-default' : 'cursor-move'}`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center space-x-3">
            <div className={`bg-green-400 rounded-sm ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`}></div>
            <span className={`text-white font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>Navigator</span>
            <div className="flex space-x-1">
              <div className={`bg-green-400 rounded-full animate-pulse ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></div>
              <div className={`bg-yellow-400 rounded-full animate-pulse delay-100 ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></div>
              <div className={`bg-red-400 rounded-full animate-pulse delay-200 ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></div>
            </div>
          </div>
          
          {/* Window Controls */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleMinimize}
              className={`hover:bg-gray-700 rounded-md transition-colors group ${
                isMobile ? 'p-2 touch-manipulation' : 'p-1.5'
              }`}
              title="Minimize"
            >
              <Minimize2 size={isMobile ? 16 : 14} className="text-gray-400 group-hover:text-yellow-400" />
            </button>
            {!isMobile && (
              <button 
                onClick={handleMaximize}
                className="p-1.5 hover:bg-gray-700 rounded-md transition-colors group"
                title={isMaximized ? "Restore" : "Maximize"}
              >
                <Maximize2 size={14} className="text-gray-400 group-hover:text-green-400" />
              </button>
            )}
            <button 
              onClick={handleClose}
              className={`hover:bg-red-600 rounded-md transition-colors group ${
                isMobile ? 'p-2 touch-manipulation' : 'p-1.5'
              }`}
              title="Close"
            >
              <X size={isMobile ? 16 : 14} className="text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </div>
        
        {/* Terminal Body */}
        <div 
          className={`flex-1 bg-black/50 backdrop-blur-sm ${
            isMobile ? 'overflow-y-auto overflow-x-hidden' : 'overflow-auto'
          }`}
          ref={terminalBodyRef}
          style={{ 
            height: isMobile ? 'calc(100% - 48px)' : 'calc(100% - 60px)',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            transform: 'translateZ(0)',
            willChange: 'scroll-position'
          }}
        >
          <div className={`${isMobile ? 'p-2' : 'p-4'} space-y-2 min-h-full flex flex-col`}>
            <div className="flex-1">
              {renderHistoryEntries()}
            </div>
            
            {/* Input Line - Always visible at bottom */}
            <div className={`flex items-center space-x-2 mt-4 sticky bottom-0 bg-black/90 backdrop-blur-md ${
              isMobile ? 'p-3 -m-2 border-t border-gray-700' : 'p-0'
            } rounded-lg`}>
              <span className={`text-blue-400 font-mono font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>❯</span>
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
                onFocus={() => {
                  setIsInputFocused(true);
                  // Ensure input is visible when focused on mobile
                  if (isMobile && inputRef.current) {
                    requestAnimationFrame(() => {
                      setTimeout(() => {
                        inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }, 200);
                    });
                  }
                }}
                onBlur={() => {
                  setIsInputFocused(false);
                }}
                className={`flex-1 bg-transparent text-white font-mono outline-none border-none caret-green-400 ${
                  isMobile ? 'text-base py-2' : 'text-lg'
                }`}
                placeholder="Type a command..."
                autoFocus
                spellCheck="false"
                autoComplete="off"
                style={{
                  fontSize: isMobile ? '16px' : '18px',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent'
                }}
              />
              <div className={`bg-green-400 animate-pulse ${isMobile ? 'w-2 h-5' : 'w-3 h-6'}`}></div>
            </div>
          </div>
        </div>
        
        {/* Resize Handle */}
        {!isMaximized && !isMobile && (
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize"
            style={{
              background: 'linear-gradient(-45deg, transparent 30%, #374151 30%, #374151 70%, transparent 70%)'
            }}
          />
        )}
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-xl pointer-events-none -z-10 blur-xl"></div>
    </div>
  );
};

export default ModernTerminal;