import React, { useState, useEffect, useRef } from 'react';
import { Code, ExternalLink, Github, Server, Shield, Globe, DollarSign, TrendingUp, Calculator, Users, Building, Banknote } from 'lucide-react';

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
  difficulty: number;
  experience: number;
  company?: string;
  loanType?: string;
  achievement?: string;
}

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [decryptedProjects, setDecryptedProjects] = useState<string[]>([]);
  const [playerStats, setPlayerStats] = useState({
    totalExperience: 0,
    level: 1,
    unlockedProjects: 0,
    financeExpertise: 0
  });
  const [showAchievement, setShowAchievement] = useState<string>('');
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number}>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Enhanced projects data with finance expertise
  const projectsData: Project[] = [
    {
      id: 'proj-1',
      name: 'Vetrivikas Finance System',
      description: 'Complete loan management system for Vetrivikas Finance handling Business Loans, JLG (Joint Liability Group) loans, and GP (Group) loans. Features EMI diminishing method calculations, automated interest computations, and comprehensive borrower management.',
      tags: ['finance', 'fullstack', 'loan-management', 'emi-calculation'],
      image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: true,
      encrypted: true,
      difficulty: 5,
      experience: 1200,
      company: 'Vetrivikas Finance',
      loanType: 'Business Loans, JLG, GP Loans',
      achievement: 'Finance System Architect'
    },
    {
      id: 'proj-2',
      name: 'Jothiinga Finance API Suite',
      description: 'RESTful API ecosystem for Jothiinga Finance with endpoints for loan applications, EMI calculations using diminishing method, borrower verification, and real-time payment tracking. Built with Node.js and integrated with banking systems.',
      tags: ['api-development', 'finance', 'backend', 'node'],
      image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: true,
      encrypted: false,
      difficulty: 4,
      experience: 1000,
      company: 'Jothiinga Finance',
      loanType: 'API Integration',
      achievement: 'API Master'
    },
    {
      id: 'proj-3',
      name: 'Jothillinga Finance Dashboard',
      description: 'Comprehensive finance dashboard for Jothillinga Finance featuring real-time loan portfolio monitoring, EMI tracking with diminishing method visualization, borrower analytics, and automated report generation.',
      tags: ['finance', 'frontend', 'dashboard', 'data-visualization'],
      image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: true,
      encrypted: true,
      difficulty: 4,
      experience: 900,
      company: 'Jothillinga Finance',
      loanType: 'Portfolio Management',
      achievement: 'Data Visualization Expert'
    },
    {
      id: 'proj-4',
      name: 'EMI Diminishing Calculator Engine',
      description: 'Advanced mathematical engine for EMI calculations using diminishing method across multiple loan types. Handles complex interest calculations, payment schedules, and provides detailed amortization tables.',
      tags: ['finance', 'algorithms', 'mathematics', 'calculation-engine'],
      image: 'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: false,
      encrypted: false,
      difficulty: 5,
      experience: 800,
      achievement: 'Mathematical Genius'
    },
    {
      id: 'proj-5',
      name: 'Multi-Finance API Gateway',
      description: 'Unified API gateway connecting multiple finance companies (Vetrivikas, Jothiinga, Jothillinga) with standardized loan processing, EMI calculations, and secure data exchange protocols.',
      tags: ['api-gateway', 'microservices', 'finance', 'integration'],
      image: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: false,
      encrypted: true,
      difficulty: 5,
      experience: 1100,
      achievement: 'Integration Specialist'
    },
    {
      id: 'proj-6',
      name: 'JLG Loan Management System',
      description: 'Specialized system for Joint Liability Group loans with group member management, collective responsibility tracking, and automated EMI collection using diminishing method calculations.',
      tags: ['finance', 'jlg-loans', 'group-management', 'fullstack'],
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: false,
      encrypted: false,
      difficulty: 4,
      experience: 750,
      loanType: 'JLG Loans',
      achievement: 'Group Loan Expert'
    },
    {
      id: 'proj-7',
      name: 'Business Loan Origination Platform',
      description: 'End-to-end business loan origination system with automated underwriting, risk assessment, EMI calculation using diminishing method, and integrated approval workflows.',
      tags: ['finance', 'business-loans', 'workflow', 'automation'],
      image: 'https://images.pexels.com/photos/6694538/pexels-photo-6694538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: false,
      encrypted: true,
      difficulty: 5,
      experience: 950,
      loanType: 'Business Loans',
      achievement: 'Business Finance Pro'
    },
    {
      id: 'proj-8',
      name: 'Real-time Payment Tracking API',
      description: 'High-performance API for real-time payment tracking across multiple finance companies with automated reconciliation, EMI status updates, and payment gateway integrations.',
      tags: ['api-development', 'payments', 'real-time', 'finance'],
      image: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: false,
      encrypted: false,
      difficulty: 4,
      experience: 700,
      achievement: 'Payment Systems Expert'
    }
  ];

  // Particle system for visual effects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createParticle = () => ({
      id: Math.random(),
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    });

    const initialParticles = Array.from({ length: 30 }, createParticle);
    setParticles(initialParticles);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      setParticles(prev => prev.map(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
        ctx.fill();
        
        return particle;
      }));
      
      requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate loading projects
  useEffect(() => {
    const loadProjects = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProjects(projectsData);
      setLoading(false);
      
      // Calculate initial stats
      const totalExp = projectsData.reduce((sum, project) => sum + project.experience, 0);
      const level = Math.floor(totalExp / 1000) + 1;
      const financeProjects = projectsData.filter(p => p.tags.includes('finance')).length;
      
      setPlayerStats({
        totalExperience: totalExp,
        level,
        unlockedProjects: projectsData.filter(p => !p.encrypted).length,
        financeExpertise: financeProjects
      });
    };
    
    loadProjects();
  }, []);

  // Handle project decryption with gamification
  const handleDecrypt = (projectId: string) => {
    if (!decryptedProjects.includes(projectId)) {
      setDecryptedProjects(prev => [...prev, projectId]);
      
      const project = projects.find(p => p.id === projectId);
      if (project?.achievement) {
        setShowAchievement(project.achievement);
        setTimeout(() => setShowAchievement(''), 3000);
      }
      
      setPlayerStats(prev => ({
        ...prev,
        unlockedProjects: prev.unlockedProjects + 1,
        totalExperience: prev.totalExperience + (project?.experience || 0)
      }));
      
      // Auto re-encrypt after 45 seconds
      setTimeout(() => {
        setDecryptedProjects(prev => prev.filter(id => id !== projectId));
      }, 45000);
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

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(difficulty);
  };

  const getFilterIcon = (filter: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'all': <Globe size={16} />,
      'finance': <DollarSign size={16} />,
      'api-development': <Server size={16} />,
      'fullstack': <Code size={16} />,
      'business-loans': <Building size={16} />,
      'jlg-loans': <Users size={16} />,
      'emi-calculation': <Calculator size={16} />
    };
    return icons[filter] || <Code size={16} />;
  };

  return (
    <div className="page-wrapper relative min-h-screen from-gray-900 via-gray-800 to-black">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Achievement Notification - Responsive */}
      {showAchievement && (
        <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto z-50 bg-yellow-500 text-black px-4 sm:px-6 py-3 rounded-lg shadow-lg transform animate-bounce">
          <div className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl">🏆</span>
            <div>
              <div className="font-bold text-sm sm:text-base">Achievement Unlocked!</div>
              <div className="text-xs sm:text-sm">{showAchievement}</div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto text-green-300">
        {/* Header with Player Stats - Responsive */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 lg:mb-8 space-y-4 lg:space-y-0">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              💼 FINANCE PROJECTS VAULT
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">Accessing secure project repositories... Finance expertise unlocked</p>
          </div>
          
          {/* Stats Grid - Responsive */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 sm:flex sm:space-x-4">
            <div className="bg-gray-900 bg-opacity-80 px-2 sm:px-4 py-2 rounded-lg border border-green-500">
              <div className="text-green-400 font-bold text-sm sm:text-base">Level {playerStats.level}</div>
              <div className="text-xs text-gray-400">Finance Expert</div>
            </div>
            <div className="bg-gray-900 bg-opacity-80 px-2 sm:px-4 py-2 rounded-lg border border-blue-500">
              <div className="text-blue-400 font-bold text-sm sm:text-base">{playerStats.totalExperience.toLocaleString()} XP</div>
              <div className="text-xs text-gray-400">Experience</div>
            </div>
            <div className="bg-gray-900 bg-opacity-80 px-2 sm:px-4 py-2 rounded-lg border border-purple-500">
              <div className="text-purple-400 font-bold text-sm sm:text-base">{playerStats.unlockedProjects}/{projects.length}</div>
              <div className="text-xs text-gray-400">Unlocked</div>
            </div>
          </div>
        </div>

        {/* Enhanced Project Filters - Responsive */}
        <div className="bg-gray-900 bg-opacity-80 p-3 sm:p-4 rounded-lg mb-6 lg:mb-8 border border-cyan-500">
          <h3 className="text-cyan-400 font-bold mb-3 sm:mb-4 text-lg sm:text-xl text-center sm:text-left">🎯 PROJECT CATEGORIES</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {[
              { key: 'all', label: 'All Projects', count: projects.length },
              { key: 'finance', label: 'Finance', count: projects.filter(p => p.tags.includes('finance')).length },
              { key: 'api-development', label: 'API Dev', count: projects.filter(p => p.tags.includes('api-development')).length },
              { key: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.tags.includes('fullstack')).length },
              { key: 'business-loans', label: 'Business Loans', count: projects.filter(p => p.tags.includes('business-loans')).length },
              { key: 'jlg-loans', label: 'JLG Loans', count: projects.filter(p => p.tags.includes('jlg-loans')).length },
              { key: 'emi-calculation', label: 'EMI Calc', count: projects.filter(p => p.tags.includes('emi-calculation')).length }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-green-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-800 border border-gray-600 hover:border-green-400 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  {getFilterIcon(filter.key)}
                </div>
                <div className="text-xs font-bold text-center">{filter.label}</div>
                <div className="text-xs text-gray-400 text-center">({filter.count})</div>
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid - Responsive */}
        {loading ? (
          <div className="bg-gray-900 bg-opacity-80 p-6 sm:p-8 rounded-lg border border-green-500 shadow-lg text-center">
            <div className="text-4xl sm:text-6xl mb-4 animate-spin">⚡</div>
            <p className="text-lg sm:text-xl">Accessing secure finance repositories...</p>
            <div className="mt-4 text-sm text-gray-400 space-y-1">
              <p>🔐 Decrypting loan management systems...</p>
              <p>💰 Loading EMI calculation engines...</p>
              <p>🏦 Connecting to finance company databases...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`bg-gray-900 bg-opacity-90 rounded-lg border-2 shadow-lg overflow-hidden relative transition-all duration-300 hover:transform hover:scale-105 ${
                  project.featured ? 'border-yellow-400 shadow-yellow-400/30' : 'border-green-500'
                }`}
              >
                {/* Project Image - Responsive */}
                <div className="h-36 sm:h-48 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover filter brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
                  
                  {/* Badges - Responsive */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {project.featured && (
                      <div className="bg-yellow-500 text-black px-2 py-1 text-xs font-bold rounded">
                        ⭐ FEATURED
                      </div>
                    )}
                    {project.company && (
                      <div className="bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded max-w-24 sm:max-w-none truncate">
                        {project.company}
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute top-2 right-2 flex flex-col space-y-1">
                    <div className="bg-green-600 text-white px-2 py-1 text-xs font-bold rounded">
                      +{project.experience} XP
                    </div>
                    <div className="bg-purple-600 text-white px-2 py-1 text-xs font-bold rounded">
                      {getDifficultyStars(project.difficulty)}
                    </div>
                  </div>
                  
                  {/* Encryption Overlay */}
                  {project.encrypted && !isDecrypted(project) && (
                    <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center p-4">
                      <Shield size={32} className="sm:hidden mb-2 text-yellow-400" />
                      <Shield size={40} className="hidden sm:block mb-3 text-yellow-400" />
                      <p className="text-center mb-3 font-bold text-sm sm:text-base">🔒 CLASSIFIED PROJECT</p>
                      <button
                        onClick={() => handleDecrypt(project.id)}
                        className="px-3 py-2 sm:px-4 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-colors text-sm"
                      >
                        🔓 DECRYPT (+{project.experience} XP)
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Project Content - Responsive */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center flex-1 min-w-0">
                      <DollarSign size={16} className="sm:hidden mr-2 text-green-400 flex-shrink-0" />
                      <DollarSign size={18} className="hidden sm:block mr-2 text-green-400 flex-shrink-0" />
                      <span className="truncate">{project.name}</span>
                    </h3>
                  </div>
                  
                  {project.loanType && (
                    <div className="mb-2 text-sm text-blue-400 font-semibold">
                      📊 {project.loanType}
                    </div>
                  )}
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {isDecrypted(project) ? project.description : '████████ ███████ ████ ████████ ███████ ███ ███████ ████████ ████ ████ ███████ ███████ ███████ ████████.'}
                  </p>
                  
                  {/* Tags - Responsive */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                    {project.tags.slice(0, 4).map(tag => (
                      <span
                        key={`${project.id}-${tag}`}
                        className="px-2 py-1 bg-gray-800 text-green-400 text-xs rounded-full border border-green-600"
                      >
                        #{tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full border border-gray-600">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                  
                  {/* Action Buttons - Responsive */}
                  {isDecrypted(project) && (
                    <div className="flex flex-wrap gap-2">
                      {project.demoUrl && (
                        <button className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm font-bold transition-colors">
                          <ExternalLink size={14} className="mr-1" />
                          Demo
                        </button>
                      )}
                      {project.repoUrl && (
                        <button className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm font-bold transition-colors">
                          <Github size={14} className="mr-1" />
                          Code
                        </button>
                      )}
                      {project.achievement && (
                        <div className="flex items-center px-3 py-1 bg-yellow-600 text-black rounded text-sm font-bold">
                          🏆 <span className="hidden sm:inline ml-1">{project.achievement}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Stats Dashboard - Responsive */}
        <div className="mt-6 lg:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-gray-900 bg-opacity-80 p-3 sm:p-4 rounded-lg border border-green-500">
            <div className="flex items-center">
              <DollarSign size={20} className="sm:hidden text-green-400 mr-2" />
              <DollarSign size={24} className="hidden sm:block text-green-400 mr-2" />
              <div>
                <div className="text-lg sm:text-2xl font-bold text-green-400">{projects.filter(p => p.tags.includes('finance')).length}</div>
                <div className="text-xs text-gray-400">Finance Projects</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 bg-opacity-80 p-3 sm:p-4 rounded-lg border border-blue-500">
            <div className="flex items-center">
              <Server size={20} className="sm:hidden text-blue-400 mr-2" />
              <Server size={24} className="hidden sm:block text-blue-400 mr-2" />
              <div>
                <div className="text-lg sm:text-2xl font-bold text-blue-400">{projects.filter(p => p.tags.includes('api-development')).length}</div>
                <div className="text-xs text-gray-400">API Projects</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 bg-opacity-80 p-3 sm:p-4 rounded-lg border border-purple-500">
            <div className="flex items-center">
              <Building size={20} className="sm:hidden text-purple-400 mr-2" />
              <Building size={24} className="hidden sm:block text-purple-400 mr-2" />
              <div>
                <div className="text-lg sm:text-2xl font-bold text-purple-400">{projects.filter(p => p.tags.includes('business-loans')).length}</div>
                <div className="text-xs text-gray-400">Business Loans</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 bg-opacity-80 p-3 sm:p-4 rounded-lg border border-yellow-500">
            <div className="flex items-center">
              <Users size={20} className="sm:hidden text-yellow-400 mr-2" />
              <Users size={24} className="hidden sm:block text-yellow-400 mr-2" />
              <div>
                <div className="text-lg sm:text-2xl font-bold text-yellow-400">{projects.filter(p => p.tags.includes('jlg-loans')).length}</div>
                <div className="text-xs text-gray-400">JLG Loans</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 bg-opacity-80 p-3 sm:p-4 rounded-lg border border-red-500">
            <div className="flex items-center">
              <Calculator size={20} className="sm:hidden text-red-400 mr-2" />
              <Calculator size={24} className="hidden sm:block text-red-400 mr-2" />
              <div>
                <div className="text-lg sm:text-2xl font-bold text-red-400">{projects.filter(p => p.tags.includes('emi-calculation')).length}</div>
                <div className="text-xs text-gray-400">EMI Calculators</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 bg-opacity-80 p-3 sm:p-4 rounded-lg border border-cyan-500">
            <div className="flex items-center">
              <Shield size={20} className="sm:hidden text-cyan-400 mr-2" />
              <Shield size={24} className="hidden sm:block text-cyan-400 mr-2" />
              <div>
                <div className="text-lg sm:text-2xl font-bold text-cyan-400">{projects.filter(p => p.encrypted).length}</div>
                <div className="text-xs text-gray-400">Encrypted</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Finance Companies Showcase - Responsive */}
        <div className="mt-6 lg:mt-8 bg-gradient-to-r from-green-900 via-blue-900 to-purple-900 p-4 sm:p-6 rounded-lg border-2 border-cyan-400">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">💼 FINANCE COMPANY EXPERTISE</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
              <div className="text-2xl sm:text-3xl mb-2">🏦</div>
              <h4 className="font-bold text-green-400 text-sm sm:text-base">Vetrivikas Finance</h4>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">Complete loan management system with EMI calculations</p>
            </div>
            <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
              <div className="text-2xl sm:text-3xl mb-2">🔧</div>
              <h4 className="font-bold text-blue-400 text-sm sm:text-base">Jothiinga Finance</h4>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">RESTful API suite for finance operations</p>
            </div>
            <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center sm:col-span-2 lg:col-span-1">
              <div className="text-2xl sm:text-3xl mb-2">📊</div>
              <h4 className="font-bold text-purple-400 text-sm sm:text-base">Jothillinga Finance</h4>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">Advanced dashboard and portfolio management</p>
            </div>
          </div>
        </div>
        
        {/* Terminal Commands - Responsive */}
        <div className="mt-6 lg:mt-8 p-3 sm:p-4 bg-black bg-opacity-70 rounded-lg font-mono text-xs sm:text-sm border border-gray-600 overflow-x-auto">
          <p className="text-green-400 mb-2"># Finance Project Commands</p>
          <div className="space-y-1">
            <p><span className="text-green-400">$</span> decrypt project [name] <span className="text-gray-500">// Unlock encrypted finance projects</span></p>
            <p><span className="text-green-400">$</span> calculate --emi --diminishing <span className="text-gray-500">// Access EMI calculation engine</span></p>
            <p><span className="text-green-400">$</span> api --finance --companies <span className="text-gray-500">// List finance company APIs</span></p>
            <p><span className="text-green-400">$</span> cd /skills <span className="text-gray-500">// Navigate to skills section</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;