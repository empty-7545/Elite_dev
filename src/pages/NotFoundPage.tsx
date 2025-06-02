import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Terminal, Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  // Auto redirect countdown
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/');
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="p-6 max-w-4xl mx-auto text-red-400 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-black bg-opacity-30 p-8 rounded-lg border border-red-500 shadow-lg w-full max-w-2xl">
        <div className="flex items-center justify-center mb-6">
          <AlertTriangle size={48} className="text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-center">ERROR 404</h1>
        <div className="font-mono bg-black bg-opacity-50 p-4 rounded mb-6 text-red-300">
          <p>bash: cd: No such file or directory</p>
          <p>Access denied: Target location not found in filesystem</p>
          <p>System error: Invalid path specified</p>
          <p className="text-gray-400 mt-2">
            # The requested resource could not be located on the server
          </p>
        </div>
        
        <p className="text-center mb-8">
          Redirecting to home directory in {countdown} seconds...
        </p>
        
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center px-4 py-2 bg-green-900 bg-opacity-30 rounded hover:bg-green-800 transition-colors"
          >
            <Home size={16} className="mr-2" />
            Return Home
          </button>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center px-4 py-2 bg-black bg-opacity-50 rounded hover:bg-gray-800 transition-colors"
          >
            <Terminal size={16} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
      
      <div className="mt-8 font-mono text-sm text-gray-400">
        <p>Try these commands:</p>
        <p className="mt-2"><span className="text-green-400">$</span> cd /home</p>
        <p><span className="text-green-400">$</span> ls</p>
        <p><span className="text-green-400">$</span> help</p>
      </div>
    </div>
  );
};

export default NotFoundPage;