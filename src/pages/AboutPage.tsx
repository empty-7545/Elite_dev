import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Code, User, GraduationCap } from 'lucide-react';

// Encrypted developer information
const encryptedData = {
  name: "███████ ████████",
  title: "█████ ███████ ██████████",
  location: "███████, ██",
  bio: `
    █████ ████ ████████ ████ ██ ████ ███████████ ███ ██████ ████████ ███ ██████ ██████.
    ████ █████████ ██████ ███ ███████ ████ ████████ ███ ████ ████████ ████████.
    █████ ██ ██████████ ████ ████ ████ ███████ ███ ██ ████ █████████ ████████ ███ ███████.
    ███ ████ ████ ████ ████████ ██ ███████ █████ ████ ███████ ████ ███ ████████ ████.
  `,
  experience: "██+ █████",
  specialization: "██████████, ███████, ██████████, ████"
};

// Decrypted developer information
const decryptedData = {
  name: "Karthigaiselvam T",
  title: "Senior Software Developer",
  location: "Dindigul, Tamil Nadu, India",
  bio: `
    I'm a passionate developer with 1+ years of experience building web applications and secure systems.
    My background includes working with startups and enterprise-level clients across multiple industries.
    I'm committed to creating code that solves real problems and is both maintainable and scalable.
    My work has been featured in several major tech publications and developer communities.
  `,
  experience: "1+ years",
  specialization: "Full Stack, Security, React Native"
};

const AboutPage: React.FC = () => {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [data, setData] = useState(encryptedData);
  const navigate = useNavigate();

  // Simulate decryption effect when commanded
  useEffect(() => {
    const terminalStore = window.localStorage.getItem('terminal-decrypt');
    
    if (terminalStore === 'personal') {
      handleDecryption();
    }
    
    return () => {
      window.localStorage.removeItem('terminal-decrypt');
    };
  }, []);

  const handleDecryption = () => {
    if (isDecrypting || isDecrypted) return;
    
    setIsDecrypting(true);
    
    // Simulate decryption with a timeout
    setTimeout(() => {
      setData(decryptedData);
      setIsDecrypted(true);
      setIsDecrypting(false);
      
      // Auto re-encrypt after 30 seconds
      setTimeout(() => {
        setData(encryptedData);
        setIsDecrypted(false);
      }, 30000);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-green-300">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="text-white">/</span>about
        </h1>
        <div className="text-sm">
          {isDecrypted ? (
            <span className="text-green-400">DECRYPTED | Auto-encryption in 30s</span>
          ) : (
            <button 
              onClick={handleDecryption}
              disabled={isDecrypting}
              className="px-3 py-1 bg-black bg-opacity-50 border border-green-500 rounded hover:bg-green-900 hover:bg-opacity-20 disabled:opacity-50"
            >
              {isDecrypting ? (
                <span className="flex items-center">
                  <span className="loading-spinner"></span>
                  Decrypting...
                </span>
              ) : (
                'Decrypt Personal Data'
              )}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg mb-6">
            <div className="w-32 h-32 bg-black bg-opacity-50 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User size={64} className="text-green-400" />
            </div>
            
            <div className="text-center mb-4">
              <h2 className={`text-xl font-bold ${isDecrypting ? 'decrypting-text' : ''}`}>
                {data.name}
              </h2>
              <p className={`text-gray-400 ${isDecrypting ? 'decrypting-text' : ''}`}>
                {data.title}
              </p>
            </div>
            
            <div className="border-t border-green-500 border-opacity-30 pt-4">
              <div className="flex items-center mb-2">
                <span className="text-white w-24">Location:</span>
                <span className={isDecrypting ? 'decrypting-text' : ''}>
                  {data.location}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-white w-24">Experience:</span>
                <span className={isDecrypting ? 'decrypting-text' : ''}>
                  {data.experience}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-white w-24">Focus:</span>
                <span className={isDecrypting ? 'decrypting-text' : ''}>
                  {data.specialization}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Code size={20} className="mr-2" />
              Core Technologies
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>JavaScript/TypeScript</span>
                <div className="w-32 bg-black bg-opacity-50 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <span>React/Next.js</span>
                <div className="w-32 bg-black bg-opacity-50 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <span>Node.js</span>
                <div className="w-32 bg-black bg-opacity-50 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <span>Python</span>
                <div className="w-32 bg-black bg-opacity-50 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <span>Security</span>
                <div className="w-32 bg-black bg-opacity-50 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg mb-6">
            <h3 className="text-xl font-bold mb-4">Bio</h3>
            <div className={`text-gray-300 whitespace-pre-line ${isDecrypting ? 'decrypting-text' : ''}`}>
              {data.bio}
            </div>
          </div>
          
          <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Shield size={20} className="mr-2" />
              Professional Experience
            </h3>
            
            <div className="space-y-6">
              <div className="border-l-2 border-green-500 pl-4">
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold">Senior Developer</h4>
                  <span className="text-sm text-gray-400">2025 - Present</span>
                </div>
                <p className="text-sm text-green-400 mb-2">Virtual Technology</p>
                <p className="text-gray-300 text-sm">
                  Lead development of secure applications for enterprise clients.
                  Managed team of 2 developers and implemented security best practices.
                </p>
              </div>
              
              <div className="border-l-2 border-green-500 pl-4">
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold">Full Stack Developer</h4>
                  <span className="text-sm text-gray-400">2024 - 2025</span>
                </div>
                <p className="text-sm text-green-400 mb-2">Virtual Technology</p>
                <p className="text-gray-300 text-sm">
                  Built scalable web applications using React and Node.js.
                  Implemented security protocols and authentication systems.
                </p>
              </div>
              
              <div className="border-l-2 border-green-500 pl-4">
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold">Frontend Developer</h4>
                  <span className="text-sm text-gray-400"> 2024 </span>
                </div>
                <p className="text-sm text-green-400 mb-2">Virtual Technology</p>
                <p className="text-gray-300 text-sm">
                  Developed responsive web interfaces with focus on UX/UI.
                  Collaborated with designers to implement visually appealing designs.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <GraduationCap size={20} className="mr-2" />
              Education
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold">Bachelor of Technology in Information Technology</h4>
                  <span className="text-sm text-gray-400">2022 - 2025</span>
                </div>
                <p className="text-green-400">Madurai Kamarajar University</p>
                <p className="text-sm text-gray-300">Parvathys Arts and Science College</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold">Master of Computer Application</h4>
                  <span className="text-sm text-gray-400">2025 - 2027</span>
                </div>
                <p className="text-green-400">Anna University</p>
                <p className="text-sm text-gray-300">RVS Engineering College</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-400 mb-2">
          Use terminal commands to navigate to other sections
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => navigate('/skills')}
            className="px-3 py-1 bg-black bg-opacity-50 border border-green-500 rounded hover:bg-green-900 hover:bg-opacity-20"
          >
            cd /skills
          </button>
          <button 
            onClick={() => navigate('/projects')}
            className="px-3 py-1 bg-black bg-opacity-50 border border-green-500 rounded hover:bg-green-900 hover:bg-opacity-20"
          >
            cd /projects
          </button>
          <button 
            onClick={() => navigate('/')}
            className="px-3 py-1 bg-black bg-opacity-50 border border-green-500 rounded hover:bg-green-900 hover:bg-opacity-20"
          >
            cd /home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;