import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Terminal from './components/Terminal';
import MatrixBackground from './components/MatrixBackground';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import EducationPage from './pages/EducationPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Callback to handle terminal commands
  const handleCommand = (command: string) => {
    const args = command.split(' ');
    const cmd = args[0].toLowerCase();
    
    // Handle navigation commands
    if (cmd === 'cd') {
      let path = args[1] || '/';
      
      // Normalize path - add leading slash if not present (except for special cases)
      if (path !== '/' && path !== '~' && !path.startsWith('/')) {
        path = '/' + path;
      }
      
      // Handle home directory shortcuts
      if (path === '~' || path === '/home') {
        path = '/';
      }
      
      switch (path) {
        case '/':
          navigate('/');
          return { success: true, output: 'Navigating to home directory...' };
        case '/about':
        case 'about':
          navigate('/about');
          return { success: true, output: 'Navigating to about section...' };
        case '/skills':
        case 'skills':
          navigate('/skills');
          return { success: true, output: 'Navigating to skills directory...' };
        case '/projects':
        case 'projects':
          navigate('/projects');
          return { success: true, output: 'Navigating to projects repository...' };
        case '/education':
        case 'education':
          navigate('/education');
          return { success: true, output: 'Navigating to education records...' };
        case '/testimonials':
        case 'testimonials':
          navigate('/testimonials');
          return { success: true, output: 'Navigating to testimonials vault...' };
        case '/contact':
        case 'contact':
          navigate('/contact');
          return { success: true, output: 'Establishing communication protocol...' };
        default:
          return { 
            success: false, 
            output: `bash: cd: ${path}: No such file or directory` 
          };
      }
    } 
    
    // Handle other system commands
    else if (cmd === 'ls') {
      return { 
        success: true, 
        output: `
Available directories:
drwxr-xr-x  2 user user  4096 Aug 11 2004 home
drwxr-xr-x  2 user user  4096 Aug 11 2004 about
drwxr-xr-x  2 user user  4096 Aug 11 2004 skills
drwxr-xr-x  2 user user  4096 Aug 11 2004 projects
drwxr-xr-x  2 user user  4096 Aug 11 2004 education
drwxr-xr-x  2 user user  4096 Aug 11 2004 testimonials
drwxr-xr-x  2 user user  4096 Aug 11 2004 contact
`
      };
    } 
    
    else if (cmd === 'pwd') {
      return { 
        success: true, 
        output: location.pathname || '/' 
      };
    } 
    
    else if (cmd === 'clear') {
      return { success: true, output: '', clear: true };
    } 
    
    else if (cmd === 'whoami') {
      return { 
        success: true, 
        output: 'Karthigaiselvam ~ $ User privileges detected' 
      };
    } 
    
    else if (cmd === 'help') {
      return { 
        success: true, 
        output: `
Available commands:
  cd [path]            Navigate to a section (e.g., 'cd about' or 'cd /about')
  ls                   List available sections
  pwd                  Show current location
  whoami               Display user info
  clear                Clear terminal
  help                 Show this help message
  date                 Show current time
  decrypt [target]     Decrypt content
  matrix               Toggle matrix animation
  history              View command history

Tip: You can use 'cd about' or 'cd /about' - both work!
` 
      };
    } 
    
    else if (cmd === 'date') {
      return { 
        success: true, 
        output: `Current timestamp: ${new Date().toLocaleString()}` 
      };
    } 
    
    else if (cmd === 'matrix') {
      return { 
        success: true, 
        output: 'Matrix rain effect toggled' 
      };
    } 
    
    else if (cmd === 'decrypt') {
      const target = args[1];
      
      if (!target) {
        return { 
          success: false, 
          output: 'Error: Specify target to decrypt. Usage: decrypt [target]' 
        };
      }
      
      return { 
        success: true, 
        output: `Decrypting ${target}... [ACCESS GRANTED]`,
        decrypt: target 
      };
    } 
    
    else {
      return { 
        success: false, 
        output: `bash: ${cmd}: command not found`
      };
    }
  };

  return (
    <div className="app-container">
      <MatrixBackground />
      <Terminal onCommand={handleCommand} />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;