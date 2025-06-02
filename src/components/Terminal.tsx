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
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Welcome message with modern styling
  useEffect(() => {
    const welcomeMessage: HistoryEntry = {
      command: '',
      result: {
        success: true,
        output: `🚀 MODERN TERMINAL v3.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Welcome to the Interactive Portfolio Terminal!
📅 System initialized: ${new Date().toLocaleString()}

🎯 Available Commands:
  help        - Show all available commands
  cd <path>   - Navigate to different sections
  ls          - List current directory contents
  about       - Learn more about me
  projects    - View my projects
  skills      - Check out my skills
  contact     - Get in touch
  
💡 Pro Tips:
  • Use Tab for auto-completion
  • Use ↑/↓ arrows for command history
  • Drag this window around!
  • Resize from the bottom-right corner

Ready to explore? Type a command below! 👇`,
      },
      timestamp: new Date(),
    };
    
    setHistory([welcomeMessage]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

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
    
    // Keep focus on input after command execution
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
        height: '100vh',
        position: 'fixed' as const
      }
    : isMaximized 
      ? { top: 0, left: 0, width: '100vw', height: '100vh' }
      : { 
          top: `${position.y}px`, 
          left: `${position.x}px`, 
          width: `${size.width}px`, 
          height: `${size.height}px` 
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
      <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-600 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
        
        {/* Title Bar */}
        <div 
          className="drag-handle bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-600 px-4 py-3 flex items-center justify-between cursor-move"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-400 rounded-sm"></div>
            <span className="text-white font-semibold">Modern Terminal</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
          
          {/* Window Controls */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleMinimize}
              className="p-1.5 hover:bg-gray-700 rounded-md transition-colors group"
              title="Minimize"
            >
              <Minimize2 size={14} className="text-gray-400 group-hover:text-yellow-400" />
            </button>
            <button 
              onClick={handleMaximize}
              className="p-1.5 hover:bg-gray-700 rounded-md transition-colors group"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              <Maximize2 size={14} className="text-gray-400 group-hover:text-green-400" />
            </button>
            <button 
              onClick={handleClose}
              className="p-1.5 hover:bg-red-600 rounded-md transition-colors group"
              title="Close"
            >
              <X size={14} className="text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </div>
        
        {/* Terminal Body */}
        <div 
          className="flex-1 overflow-auto bg-black/50 backdrop-blur-sm" 
          ref={terminalBodyRef}
          style={{ height: 'calc(100% - 60px)' }}
        >
          <div className="p-4 space-y-2">
            {renderHistoryEntries()}
            
            {/* Input Line */}
            <div className="flex items-center space-x-2 mt-4">
              <span className="text-blue-400 font-mono font-bold text-lg">❯</span>
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
                className="flex-1 bg-transparent text-white font-mono text-lg outline-none border-none caret-green-400"
                placeholder="Type a command..."
                autoFocus
                spellCheck="false"
                autoComplete="off"
              />
              <div className="w-3 h-6 bg-green-400 animate-pulse"></div>
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