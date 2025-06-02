import React, { useState } from 'react';
import { Send, Mail, Github, Linkedin, Twitter, Globe } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [encryption, setEncryption] = useState({
    active: true,
    progress: 0,
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Simulate message encryption
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Start encryption animation
    setSubmitStatus('loading');
    setEncryption({ active: true, progress: 0 });
    
    // Animate encryption progress
    const interval = setInterval(() => {
      setEncryption(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, progress: prev.progress + 5 };
      });
    }, 100);
    
    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setEncryption({ active: true, progress: 100 });
      setSubmitStatus('success');
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitStatus('idle');
        setEncryption({ active: true, progress: 0 });
      }, 2000);
    }, 2500);
  };

  // Toggle encryption
  const toggleEncryption = () => {
    setEncryption(prev => ({ ...prev, active: !prev.active }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-green-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-white">/</span>contact
        </h1>
        <p className="text-gray-400">Establishing secure communication channel...</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Mail size={24} className="mr-3" />
              Send Encrypted Message
            </h2>
            
            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-900 bg-opacity-30 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Send size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-300">
                  Your encrypted message has been transmitted securely.
                </p>
                <p className="mt-4 text-sm text-gray-400">
                  I will respond to your inquiry as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black bg-opacity-50 border border-green-500 rounded py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black bg-opacity-50 border border-green-500 rounded py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-black bg-opacity-50 border border-green-500 rounded py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-black bg-opacity-50 border border-green-500 rounded py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="encryption"
                      type="checkbox"
                      checked={encryption.active}
                      onChange={toggleEncryption}
                      className="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                    />
                    <label htmlFor="encryption" className="ml-2 block text-sm">
                      Enable message encryption
                    </label>
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    All messages are end-to-end encrypted
                  </div>
                </div>
                
                {submitStatus === 'loading' && (
                  <div className="mb-6">
                    <div className="flex justify-between mb-1">
                      <span>Encrypting message...</span>
                      <span>{encryption.progress}%</span>
                    </div>
                    <div className="w-full bg-black bg-opacity-50 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${encryption.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 flex items-center justify-center"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <div className="loading-spinner mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg mb-6">
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Email</div>
                <div className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  <a href="mailto:contact@hackerportfolio.com" className="hover:text-green-400">
                    contact@hackerportfolio.com
                  </a>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-400 mb-1">Location</div>
                <div className="flex items-center">
                  <Globe size={16} className="mr-2" />
                  <span>Seattle, WA, USA</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-400 mb-1">Availability</div>
                <div className="text-green-400">Available for new projects</div>
              </div>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            
            <div className="space-y-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-2 hover:bg-green-900 hover:bg-opacity-20 rounded transition-colors"
              >
                <Github size={20} className="mr-3" />
                <span>GitHub</span>
              </a>
              
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-2 hover:bg-green-900 hover:bg-opacity-20 rounded transition-colors"
              >
                <Linkedin size={20} className="mr-3" />
                <span>LinkedIn</span>
              </a>
              
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-2 hover:bg-green-900 hover:bg-opacity-20 rounded transition-colors"
              >
                <Twitter size={20} className="mr-3" />
                <span>Twitter</span>
              </a>
            </div>
            
            <div className="mt-6 pt-6 border-t border-green-500 border-opacity-30 text-center">
              <p className="text-sm text-gray-400">
                For secure communications, please use PGP encryption.
              </p>
              <button className="mt-2 text-xs bg-black bg-opacity-50 px-3 py-1 rounded border border-green-500 hover:bg-green-900 hover:bg-opacity-20">
                View PGP Key
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Terminal command reference */}
      <div className="mt-8 p-4 bg-black bg-opacity-50 rounded-lg font-mono text-sm">
        <p className="text-gray-400 mb-2"># Return to main sections</p>
        <p><span className="text-green-400">$</span> cd /home</p>
        <p><span className="text-green-400">$</span> cd /projects</p>
        <p><span className="text-green-400">$</span> cd /skills</p>
      </div>
    </div>
  );
};

export default ContactPage;