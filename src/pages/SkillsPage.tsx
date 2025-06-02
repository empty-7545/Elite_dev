import React, { useState, useEffect } from 'react';
import { Server, Globe, Database, Shield, Command, Bot } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  experience: string;
  description: string;
  icon: React.ReactNode;
}

const SkillsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [skills, setSkills] = useState<Skill[]>([]);

  // Simulated skills data
  const skillsData: Skill[] = [
    {
      id: 'js-1',
      name: 'JavaScript/TypeScript',
      category: 'frontend',
      level: 95,
      experience: '1+ years',
      description: 'Expert in modern JavaScript and TypeScript development. Experience with ES6+, advanced TypeScript types, and optimization techniques.',
      icon: <Command />
    },
    {
      id: 'react-1',
      name: 'React & React Native',
      category: 'frontend',
      level: 92,
      experience: '1+ years',
      description: 'Advanced knowledge of React ecosystem including hooks, context, Redux, and performance optimization. Experience building cross-platform mobile apps.',
      icon: <Globe />
    },
    {
      id: 'node-1',
      name: 'Node.js',
      category: 'backend',
      level: 88,
      experience: '1+  years',
      description: 'Building scalable backend services, REST APIs, and microservices. Experience with Express, Fastify, and NestJS frameworks.',
      icon: <Server />
    },
    // {
    //   id: 'py-1',
    //   name: 'Python',
    //   category: 'backend',
    //   level: 85,
    //   experience: '6 years',
    //   description: 'Data processing, automation, and backend development. Experience with Django, Flask, and data science libraries.',
    //   icon: <Command />
    // },
    {
      id: 'db-1',
      name: 'SQL & NoSQL Databases',
      category: 'database',
      level: 90,
      experience: '1+ years',
      description: 'Database design, optimization, and management. Experience with PostgreSQL, MySQL, MongoDB, and Redis.',
      icon: <Database />
    },
    // {
    //   id: 'devops-1',
    //   name: 'DevOps & CI/CD',
    //   category: 'devops',
    //   level: 82,
    //   experience: '5 years',
    //   description: 'Building automated deployment pipelines, container orchestration, and infrastructure as code. Experience with Docker, Kubernetes, and AWS.',
    //   icon: <Server />
    // },
    // {
    //   id: 'sec-1',
    //   name: 'Cybersecurity',
    //   category: 'security',
    //   level: 88,
    //   experience: '7 years',
    //   description: 'Application security, penetration testing, and secure coding practices. Experience with OWASP top 10, authentication systems, and encryption.',
    //   icon: <Shield />
    // },
    // {
    //   id: 'ai-1',
    //   name: 'Machine Learning',
    //   category: 'ai',
    //   level: 78,
    //   experience: '4 years',
    //   description: 'Building ML models for classification, prediction, and natural language processing. Experience with TensorFlow, PyTorch, and scikit-learn.',
    //   icon: <Bot />
    // },
  ];

  // Simulate loading skills
  useEffect(() => {
    const loadSkills = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSkills(skillsData);
      setLoading(false);
    };
    
    loadSkills();
  }, []);

  // Filter skills by category
  const filteredSkills = filter === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === filter);

  return (
    <div className="p-6 max-w-5xl mx-auto text-green-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-white">/</span>skills
        </h1>
        <p className="text-gray-400">Running process analysis... Listing installed packages and capabilities</p>
      </div>
      
      {/* Terminal-style skill categories */}
      <div className="bg-black bg-opacity-50 p-4 rounded-lg mb-8 overflow-x-auto">
        <div className="flex space-x-4 min-w-max">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-green-700 text-white' : 'border border-green-500 hover:bg-green-900 hover:bg-opacity-20'}`}
          >
            All Skills
          </button>
          <button 
            onClick={() => setFilter('frontend')}
            className={`px-3 py-1 rounded ${filter === 'frontend' ? 'bg-green-700 text-white' : 'border border-green-500 hover:bg-green-900 hover:bg-opacity-20'}`}
          >
            Frontend
          </button>
          <button 
            onClick={() => setFilter('backend')}
            className={`px-3 py-1 rounded ${filter === 'backend' ? 'bg-green-700 text-white' : 'border border-green-500 hover:bg-green-900 hover:bg-opacity-20'}`}
          >
            Backend
          </button>
          <button 
            onClick={() => setFilter('database')}
            className={`px-3 py-1 rounded ${filter === 'database' ? 'bg-green-700 text-white' : 'border border-green-500 hover:bg-green-900 hover:bg-opacity-20'}`}
          >
            Database
          </button>
          <button 
            onClick={() => setFilter('security')}
            className={`px-3 py-1 rounded ${filter === 'security' ? 'bg-green-700 text-white' : 'border border-green-500 hover:bg-green-900 hover:bg-opacity-20'}`}
          >
            Security
          </button>
          <button 
            onClick={() => setFilter('devops')}
            className={`px-3 py-1 rounded ${filter === 'devops' ? 'bg-green-700 text-white' : 'border border-green-500 hover:bg-green-900 hover:bg-opacity-20'}`}
          >
            DevOps
          </button>
          <button 
            onClick={() => setFilter('ai')}
            className={`px-3 py-1 rounded ${filter === 'ai' ? 'bg-green-700 text-white' : 'border border-green-500 hover:bg-green-900 hover:bg-opacity-20'}`}
          >
            AI/ML
          </button>
        </div>
      </div>
      
      {/* Terminal-style process list */}
      <div className="bg-black bg-opacity-30 rounded-lg border border-green-500 shadow-lg mb-8 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="loading-spinner"></div>
            <p>Scanning system for skills...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black bg-opacity-50 text-left">
                <tr>
                  <th className="p-4">PID</th>
                  <th className="p-4">SKILL</th>
                  <th className="p-4">CATEGORY</th>
                  <th className="p-4">EXP</th>
                  <th className="p-4">LEVEL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-900">
                {filteredSkills.map((skill, index) => (
                  <tr 
                    key={skill.id}
                    className="hover:bg-green-900 hover:bg-opacity-10 transition-colors"
                  >
                    <td className="p-4 font-mono">{Math.floor(Math.random() * 10000)}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <span className="mr-2">{skill.icon}</span>
                        {skill.name}
                      </div>
                    </td>
                    <td className="p-4 capitalize">{skill.category}</td>
                    <td className="p-4">{skill.experience}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-32 bg-black bg-opacity-50 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full" 
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        <span>{skill.level}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Skill details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkills.map(skill => (
          <div 
            key={`detail-${skill.id}`}
            className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-900 bg-opacity-30 flex items-center justify-center mr-3">
                {skill.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold">{skill.name}</h3>
                <p className="text-sm text-gray-400 capitalize">{skill.category} | {skill.experience}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Proficiency</span>
                <span>{skill.level}%</span>
              </div>
              <div className="w-full bg-black bg-opacity-50 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm">{skill.description}</p>
          </div>
        ))}
      </div>
      
      {/* Terminal command navigation */}
      <div className="mt-8 p-4 bg-black bg-opacity-50 rounded-lg font-mono text-sm">
        <p className="text-gray-400 mb-2"># Navigate to other sections</p>
        <p><span className="text-green-400">$</span> cd /projects</p>
        <p><span className="text-green-400">$</span> cd /about</p>
        <p><span className="text-green-400">$</span> cd /home</p>
      </div>
    </div>
  );
};

export default SkillsPage;