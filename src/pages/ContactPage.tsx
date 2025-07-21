import React, { useState, useEffect } from 'react';
import { Send, Mail, Github, Linkedin, Twitter, Globe, Shield, Zap, Trophy, Target, Star, Rocket, MessageSquare, Lock, CheckCircle } from 'lucide-react';

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
  const [missionProgress, setMissionProgress] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [connectionLevel, setConnectionLevel] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  // Calculate mission progress based on form completion
  useEffect(() => {
    const fields = [formData.name, formData.email, formData.subject, formData.message];
    const completed = fields.filter(field => field.trim() !== '').length;
    const progress = (completed / fields.length) * 100;
    setMissionProgress(progress);

    // Unlock achievements based on progress
    const newAchievements: string[] = [];
    if (completed >= 1) newAchievements.push('First Contact');
    if (completed >= 2) newAchievements.push('Data Collector');
    if (completed >= 3) newAchievements.push('Message Crafter');
    if (completed >= 4) newAchievements.push('Ready to Launch');
    
    setUnlockedAchievements(newAchievements);
    setConnectionLevel(Math.floor(progress / 25) + 1);
  }, [formData]);

  // Typing indicator
  useEffect(() => {
    if (formData.message.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [formData.message]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmitStatus('loading');
    setEncryption({ active: true, progress: 0 });
    
    // Animate encryption progress with gaming feel
    const interval = setInterval(() => {
      setEncryption(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, progress: prev.progress + 8 };
      });
    }, 80);
    
    setTimeout(() => {
      clearInterval(interval);
      setEncryption({ active: true, progress: 100 });
      setSubmitStatus('success');
      setUnlockedAchievements(prev => [...prev, 'Message Sent', 'Crypto Master']);
      
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitStatus('idle');
        setEncryption({ active: true, progress: 0 });
        setMissionProgress(0);
      }, 3000);
    }, 2000);
  };

  const toggleEncryption = () => {
    setEncryption(prev => ({ ...prev, active: !prev.active }));
  };

  const getProgressColor = (progress: number) => {
    if (progress < 25) return 'from-red-500 to-red-600';
    if (progress < 50) return 'from-yellow-500 to-yellow-600';
    if (progress < 75) return 'from-yellow-400 to-green-400';
    return 'from-green-400 to-green-500';
  };

  const getMissionStatus = () => {
    if (missionProgress === 0) return { text: 'Mission: Establish Contact', color: 'text-red-400' };
    if (missionProgress < 50) return { text: 'Mission: Gathering Intel', color: 'text-yellow-400' };
    if (missionProgress < 100) return { text: 'Mission: Preparing Transmission', color: 'text-yellow-300' };
    return { text: 'Mission: Ready to Launch!', color: 'text-green-400' };
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center mb-6 animate-pulse">
              <Rocket className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">Mission Accomplished!</h1>
          <p className="text-xl text-green-400 mb-6">Secure transmission successful</p>
          
          <div className="bg-gradient-to-r from-green-900/30 to-yellow-900/30 p-6 rounded-xl border border-green-500/50 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">New Achievements Unlocked!</h2>
            <div className="space-y-2">
              <div className="flex items-center text-green-300">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                Message Delivered
              </div>
              <div className="flex items-center text-green-300">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                Encryption Expert
              </div>
              <div className="flex items-center text-green-300">
                <Target className="w-4 h-4 mr-2 text-red-400" />
                Communication Established
              </div>
            </div>
          </div>
          
          <p className="text-gray-300 mb-2">Your message has been securely transmitted.</p>
          <p className="text-sm text-gray-400">Response incoming soon...</p>
        </div>
      </div>
    );
  }

  const missionStatus = getMissionStatus();

  return (
    <div className="min-h-screen  from-gray-900 via-black to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Mission Header */}
        <div className="mb-8 p-6 bg-gradient-to-r from-green-900/30 to-yellow-900/30 rounded-xl border border-green-500/30 backdrop-blur-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                <MessageSquare className="w-8 h-8 text-green-400 mr-3" />
                Contact Mission
              </h1>
              <p className={`text-lg ${missionStatus.color}`}>{missionStatus.text}</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">Level {connectionLevel}</div>
                <div className="text-sm text-gray-400">Connection</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{unlockedAchievements.length}</div>
                <div className="text-sm text-gray-400">Achievements</div>
              </div>
            </div>
          </div>
          
          {/* Mission Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Mission Progress</span>
              <span className="text-gray-300">{Math.round(missionProgress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4">
              <div 
                className={`bg-gradient-to-r ${getProgressColor(missionProgress)} h-4 rounded-full transition-all duration-500`}
                style={{ width: `${missionProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Main Mission */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Zap className="w-6 h-6 text-yellow-400 mr-3" />
                Secure Communication Console
              </h2>
              
              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-6 group">
                  <label className="block text-sm font-bold mb-2 text-gray-300" htmlFor="name">
                    Agent Codename
                    {formData.name && <CheckCircle className="inline w-4 h-4 ml-2 text-green-400" />}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:border-green-500/50"
                    placeholder="Enter your codename..."
                  />
                </div>
                
                {/* Email Field */}
                <div className="mb-6 group">
                  <label className="block text-sm font-bold mb-2 text-gray-300" htmlFor="email">
                    Secure Channel
                    {formData.email && <CheckCircle className="inline w-4 h-4 ml-2 text-green-400" />}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:border-green-500/50"
                    placeholder="your.secure@channel.com"
                  />
                </div>
                
                {/* Subject Field */}
                <div className="mb-6 group">
                  <label className="block text-sm font-bold mb-2 text-gray-300" htmlFor="subject">
                    Mission Objective
                    {formData.subject && <CheckCircle className="inline w-4 h-4 ml-2 text-green-400" />}
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:border-green-500/50"
                    placeholder="What's your mission?"
                  />
                </div>
                
                {/* Message Field */}
                <div className="mb-6 group">
                  <label className="block text-sm font-bold mb-2 text-gray-300" htmlFor="message">
                    Classified Message
                    {formData.message && <CheckCircle className="inline w-4 h-4 ml-2 text-green-400" />}
                    {isTyping && <span className="inline text-yellow-400 text-xs ml-2 animate-pulse">Agent typing...</span>}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:border-green-500/50 resize-none"
                    placeholder="Enter your classified message here... All communications are encrypted."
                  />
                </div>
                
                {/* Encryption Toggle */}
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50">
                  <div className="flex items-center">
                    <input
                      id="encryption"
                      type="checkbox"
                      checked={encryption.active}
                      onChange={toggleEncryption}
                      className="h-5 w-5 text-green-500 focus:ring-green-400 border-gray-600 rounded bg-gray-800"
                    />
                    <label htmlFor="encryption" className="ml-3 flex items-center text-white">
                      <Lock className="w-4 h-4 mr-2" />
                      Quantum Encryption
                    </label>
                  </div>
                  <div className={`text-sm px-3 py-1 rounded-full ${encryption.active ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                    {encryption.active ? 'SECURE' : 'UNSECURED'}
                  </div>
                </div>
                
                {/* Loading State */}
                {submitStatus === 'loading' && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-900/20 to-yellow-900/20 rounded-lg border border-green-500/30">
                    <div className="flex justify-between mb-2">
                      <span className="text-green-300">Encrypting transmission...</span>
                      <span className="text-yellow-400 font-mono">{encryption.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-yellow-400 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${encryption.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Applying military-grade encryption protocols...
                    </div>
                  </div>
                )}
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitStatus === 'loading' || missionProgress < 100}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                    missionProgress < 100
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : submitStatus === 'loading'
                      ? 'bg-yellow-600 text-black'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-lg hover:shadow-green-500/25'
                  }`}
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-3"></div>
                      Transmitting...
                    </>
                  ) : missionProgress < 100 ? (
                    <>
                      <Target className="w-5 h-5 mr-3" />
                      Complete Mission Parameters
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5 mr-3" />
                      Launch Secure Transmission
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          {/* Sidebar - Agent Info & Achievements */}
          <div className="lg:col-span-1 space-y-6">
            {/* Agent Contact Info */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Globe className="w-5 h-5 text-green-400 mr-2" />
                Agent Profile
              </h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-gray-900/30 rounded-lg border border-green-500/20">
                  <div className="text-sm text-gray-400 mb-1">Secure Channel</div>
                  <div className="flex items-center text-green-300">
                    <Mail size={16} className="mr-2" />
                    <a href="mailto:Karthigaiselvam01@gmail.com" className="hover:text-green-400 transition-colors">
                      Karthigaiselvam01@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-900/30 rounded-lg border border-yellow-500/20">
                  <div className="text-sm text-gray-400 mb-1">Base Location</div>
                  <div className="flex items-center text-yellow-300">
                    <Globe size={16} className="mr-2" />
                    <span>Dindigul, Tamil Nadu, India</span>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-900/30 rounded-lg border border-green-500/20">
                  <div className="text-sm text-gray-400 mb-1">Mission Status</div>
                  <div className="text-green-400 font-semibold">Available for Collaboration</div>
                </div>
              </div>
            </div>
            
            {/* Social Connections */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                Network Connections
              </h3>
              
              <div className="space-y-3">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center p-3 bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:bg-gray-800/50"
                >
                  <Github size={20} className="mr-3 text-gray-400 group-hover:text-white" />
                  <span className="text-gray-300 group-hover:text-white">GitHub Command Center</span>
                </a>
                
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center p-3 bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-800/50"
                >
                  <Linkedin size={20} className="mr-3 text-gray-400 group-hover:text-blue-400" />
                  <span className="text-gray-300 group-hover:text-white">Professional Network</span>
                </a>
                
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center p-3 bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 hover:bg-gray-800/50"
                >
                  <Twitter size={20} className="mr-3 text-gray-400 group-hover:text-blue-400" />
                  <span className="text-gray-300 group-hover:text-white">Mission Updates</span>
                </a>
              </div>
            </div>
            
            {/* Achievements Panel */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                Mission Achievements
              </h3>
              
              <div className="space-y-3">
                {['First Contact', 'Data Collector', 'Message Crafter', 'Ready to Launch'].map((achievement, index) => (
                  <div 
                    key={achievement}
                    className={`flex items-center p-3 rounded-lg border transition-all duration-300 ${
                      unlockedAchievements.includes(achievement)
                        ? 'bg-green-900/20 border-green-500/50 text-green-300'
                        : 'bg-gray-900/30 border-gray-700/50 text-gray-500'
                    }`}
                  >
                    {unlockedAchievements.includes(achievement) ? (
                      <CheckCircle size={16} className="mr-3 text-green-400" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-600 rounded-full mr-3"></div>
                    )}
                    <span className="text-sm font-medium">{achievement}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-700/50 text-center">
                <div className="text-sm text-gray-400 mb-2">Security Level</div>
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-mono">CLASSIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;