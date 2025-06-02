import React, { useState, useEffect } from 'react';
import { Code, ExternalLink, Github, Server, Shield, Globe } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  encrypted: boolean;
}

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [decryptedProjects, setDecryptedProjects] = useState<string[]>([]);

  // Example projects data
  const projectsData: Project[] = [
    {
      id: 'proj-1',
      name: 'SecureAuth System',
      description: 'Advanced authentication system with multi-factor auth, biometric verification, and brute force protection. Built with Node.js, React, and MongoDB.',
      tags: ['security', 'fullstack', 'node', 'react'],
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      demoUrl: 'https://example.com/demo',
      repoUrl: 'https://github.com/example/secure-auth',
      featured: true,
      encrypted: true
    },
    {
      id: 'proj-2',
      name: 'DataViz Dashboard',
      description: 'Real-time data visualization dashboard for monitoring system metrics. Features customizable widgets, alerts, and historical data analysis.',
      tags: ['frontend', 'data', 'react', 'charts'],
      image: 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      demoUrl: 'https://example.com/dataviz',
      repoUrl: 'https://github.com/example/dataviz',
      featured: true,
      encrypted: false
    },
    {
      id: 'proj-3',
      name: 'API Gateway Service',
      description: 'Microservice API gateway handling routing, rate limiting, caching, and authentication for distributed systems.',
      tags: ['backend', 'microservices', 'node', 'api'],
      image: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      demoUrl: undefined,
      repoUrl: 'https://github.com/example/api-gateway',
      featured: false,
      encrypted: true
    },
    {
      id: 'proj-4',
      name: 'Neural Network Visualizer',
      description: 'Interactive tool for visualizing neural network architectures and training processes in real-time.',
      tags: ['frontend', 'ai', 'python', 'react'],
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      demoUrl: 'https://example.com/nn-viz',
      repoUrl: 'https://github.com/example/nn-viz',
      featured: false,
      encrypted: false
    },
  ];

  // Simulate loading projects
  useEffect(() => {
    const loadProjects = async () => {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setProjects(projectsData);
      setLoading(false);
    };
    
    loadProjects();
    
    // Check if any projects should be decrypted from terminal commands
    const terminalDecrypt = window.localStorage.getItem('terminal-decrypt');
    if (terminalDecrypt && terminalDecrypt.startsWith('project ')) {
      const projectName = terminalDecrypt.replace('project ', '');
      handleDecrypt(projectName);
      window.localStorage.removeItem('terminal-decrypt');
    }
  }, []);

  // Handle project decryption
  const handleDecrypt = (projectId: string) => {
    if (!decryptedProjects.includes(projectId)) {
      setDecryptedProjects(prev => [...prev, projectId]);
      
      // Auto re-encrypt after 30 seconds
      setTimeout(() => {
        setDecryptedProjects(prev => prev.filter(id => id !== projectId));
      }, 30000);
    }
  };

  // Filter projects
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.tags.includes(activeFilter));

  // Check if a project is decrypted
  const isDecrypted = (project: Project) => {
    if (!project.encrypted) return true;
    return decryptedProjects.includes(project.id);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-green-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-white">/</span>projects
        </h1>
        <p className="text-gray-400">Cloning repositories... Accessing project database</p>
      </div>

      {/* Project filters */}
      <div className="bg-black bg-opacity-50 p-4 rounded-lg mb-8 overflow-x-auto">
        <div className="flex space-x-4 min-w-max">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded ${activeFilter === 'all' ? 'bg-green-700 text-white' : 'border border-green-500 hover:bg-green-900 hover:bg-opacity-20'}`}
          >
            All Projects
          </button>
          <button 
            onClick={() => setActiveFilter('frontend')}
            className={`px-3 py-1 rounded ${activeFilter === 'frontend' ? 'bg-green-700 text-white' : 'border border-green-500 hover:bg-green-900 hover:bg-opacity-20'}`}
          >
            Frontend
          </button>
          <button 
            onClick={() => setActiveFilter('backend')}
            className={`px-3 py-1 rounded ${activeFilter === 'backend' ? 'bg-green-700 text-white' : 'border border-green-500 hover:bg-green-900 hover:bg-opacity-20'}`}
          >
            Backend
          </button>
          <button 
            onClick={() => setActiveFilter('fullstack')}
            className={`px-3 py-1 rounded ${activeFilter === 'fullstack' ? 'bg-green-700 text-white' : 'border border-green-500 hover:bg-green-900 hover:bg-opacity-20'}`}
          >
            Full Stack
          </button>
          <button 
            onClick={() => setActiveFilter('security')}
            className={`px-3 py-1 rounded ${activeFilter === 'security' ? 'bg-green-700 text-white' : 'border border-green-500 hover:bg-green-900 hover:bg-opacity-20'}`}
          >
            Security
          </button>
          <button 
            onClick={() => setActiveFilter('ai')}
            className={`px-3 py-1 rounded ${activeFilter === 'ai' ? 'bg-green-700 text-white' : 'border border-green-500 hover:bg-green-900 hover:bg-opacity-20'}`}
          >
            AI/ML
          </button>
        </div>
      </div>

      {/* Project grid */}
      {loading ? (
        <div className="bg-black bg-opacity-30 p-8 rounded-lg border border-green-500 shadow-lg text-center">
          <div className="loading-spinner"></div>
          <p>Fetching project repositories...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-black bg-opacity-30 rounded-lg border border-green-500 shadow-lg overflow-hidden relative"
            >
              {/* Project image with overlay */}
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover filter brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-green-500 text-black px-2 py-1 text-xs font-bold rounded">
                    FEATURED
                  </div>
                )}
                
                {/* Encryption overlay */}
                {project.encrypted && !isDecrypted(project) && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
                    <Shield size={32} className="mb-2" />
                    <p className="text-center mb-2">ENCRYPTED PROJECT</p>
                    <button 
                      onClick={() => handleDecrypt(project.id)}
                      className="px-3 py-1 bg-green-900 bg-opacity-50 border border-green-500 rounded hover:bg-green-700"
                    >
                      Decrypt Data
                    </button>
                  </div>
                )}
              </div>
              
              {/* Project details */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Code size={18} className="mr-2" />
                  {project.name}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4">
                  {isDecrypted(project) ? project.description : '████████ ███████ ████ ████████ ███████ ███ ███████ ████████ ████ ████ ███████.'}
                </p>
                
                {/* Project tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span 
                      key={`${project.id}-${tag}`}
                      className="px-2 py-1 bg-black bg-opacity-50 text-green-400 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* Project links */}
                {isDecrypted(project) && (
                  <div className="flex space-x-3 mt-4">
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-1 bg-green-900 bg-opacity-30 rounded hover:bg-green-800 transition-colors"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a 
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-1 bg-black bg-opacity-50 rounded hover:bg-gray-800 transition-colors"
                      >
                        <Github size={14} className="mr-1" />
                        Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black bg-opacity-30 p-4 rounded-lg border border-green-500 flex items-center">
          <div className="w-10 h-10 rounded-full bg-green-900 bg-opacity-30 flex items-center justify-center mr-3">
            <Code size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold">{projects.length}</div>
            <div className="text-xs text-gray-400">Total Projects</div>
          </div>
        </div>
        
        <div className="bg-black bg-opacity-30 p-4 rounded-lg border border-green-500 flex items-center">
          <div className="w-10 h-10 rounded-full bg-green-900 bg-opacity-30 flex items-center justify-center mr-3">
            <Globe size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {projects.filter(p => p.tags.includes('frontend')).length}
            </div>
            <div className="text-xs text-gray-400">Frontend Projects</div>
          </div>
        </div>
        
        <div className="bg-black bg-opacity-30 p-4 rounded-lg border border-green-500 flex items-center">
          <div className="w-10 h-10 rounded-full bg-green-900 bg-opacity-30 flex items-center justify-center mr-3">
            <Server size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {projects.filter(p => p.tags.includes('backend')).length}
            </div>
            <div className="text-xs text-gray-400">Backend Projects</div>
          </div>
        </div>
        
        <div className="bg-black bg-opacity-30 p-4 rounded-lg border border-green-500 flex items-center">
          <div className="w-10 h-10 rounded-full bg-green-900 bg-opacity-30 flex items-center justify-center mr-3">
            <Shield size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {projects.filter(p => p.encrypted).length}
            </div>
            <div className="text-xs text-gray-400">Encrypted Projects</div>
          </div>
        </div>
      </div>
      
      {/* Terminal command help */}
      <div className="mt-8 p-4 bg-black bg-opacity-50 rounded-lg font-mono text-sm">
        <p className="text-gray-400 mb-2"># Project commands</p>
        <p><span className="text-green-400">$</span> decrypt project [name]</p>
        <p><span className="text-green-400">$</span> cd /skills</p>
        <p><span className="text-green-400">$</span> cd /contact</p>
      </div>
    </div>
  );
};

export default ProjectsPage;