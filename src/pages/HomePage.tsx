import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [systemBoot, setSystemBoot] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate system boot sequence
    const bootInterval = setInterval(() => {
      setSystemBoot(prev => {
        if (prev >= 100) {
          clearInterval(bootInterval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 120);

    return () => clearInterval(bootInterval);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto text-green-400">
      {loading ? (
        <div className="text-center">
          <h2 className="text-xl mb-4">SYSTEM BOOT SEQUENCE</h2>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill"
              style={{ width: `${systemBoot}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm">Loading... {systemBoot}%</div>
          <div className="mt-8 font-mono text-xs text-left">
            <p>Initializing kernel...</p>
            <p>Loading system modules...</p>
            <p>Mounting virtual file system...</p>
            <p>Establishing secure connection...</p>
            <p>Starting network services...</p>
            <p>Loading user interface...</p>
            {systemBoot > 60 && <p>Decrypting portfolio data...</p>}
            {systemBoot > 80 && <p>Enabling terminal access...</p>}
            {systemBoot > 90 && <p>Ready for user interaction...</p>}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl mb-8 glitch">You Have Been Notified</h1>
          
          <div className="mb-12 text-xl">
            <p className="typing-animation">Elite Developer | Creative Coder</p>
          </div>
          
          <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg mb-12">
            <h2 className="text-2xl mb-4">System Status</h2>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p><span className="text-white">Current time:</span> {new Date().toLocaleString()}</p>
                <p><span className="text-white">System:</span> Active</p>
                <p><span className="text-white">Security:</span> <span className="text-green-400">Encrypted</span></p>
              </div>
              <div>
                <p><span className="text-white">User:</span> Visitor</p>
                <p><span className="text-white">Location:</span> <span className="encrypted-text">██████████</span></p>
                <p><span className="text-white">Access level:</span> Standard</p>
              </div>
            </div>
          </div>
          
          <div className="text-white mb-12">
            <p className="mb-4">Use the terminal to navigate through this portfolio.</p>
            <p className="bg-black bg-opacity-50 p-2 rounded font-mono">
              Try typing: <span className="text-green-400">cd /about</span> or <span className="text-green-400">help</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div 
              className="bg-black bg-opacity-30 p-4 rounded border border-green-500 cursor-pointer hover:bg-green-900 hover:bg-opacity-20 transition-all"
              onClick={() => navigate('/about')}
            >
              <h3 className="text-xl mb-2">About</h3>
              <p className="text-gray-300 text-sm">Personal background and story</p>
            </div>
            
            <div 
              className="bg-black bg-opacity-30 p-4 rounded border border-green-500 cursor-pointer hover:bg-green-900 hover:bg-opacity-20 transition-all"
              onClick={() => navigate('/skills')}
            >
              <h3 className="text-xl mb-2">Skills</h3>
              <p className="text-gray-300 text-sm">Technical abilities and expertise</p>
            </div>
            
            <div 
              className="bg-black bg-opacity-30 p-4 rounded border border-green-500 cursor-pointer hover:bg-green-900 hover:bg-opacity-20 transition-all"
              onClick={() => navigate('/projects')}
            >
              <h3 className="text-xl mb-2">Projects</h3>
              <p className="text-gray-300 text-sm">Portfolio of completed work</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;