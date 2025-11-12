import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Code, 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Heart,
  Sparkles,
  ChevronRight,
  Mail,
  Github
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  rarity: string;
  xpReward: number;
}

interface Interest {
  name: string;
  description: string;
}

const AboutPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const personalInfo = {
    name: 'Karthigaiselvam T',
    title: 'Senior Software Developer',
    location: 'Dindigul, Tamil Nadu, India',
    age: 21,
    experience: '3+ Years',
    email: 'karthigaiselvam@example.com',
    phone: '+91 98765 43210',
    bio: `Passionate software developer with expertise in full-stack development, cybersecurity, and AI/ML. 
    I love creating innovative solutions and building scalable applications that make a difference. 
    Currently pursuing my B.Tech in Information Technology while working on cutting-edge projects.`,
    mission: 'To leverage technology to solve real-world problems and create meaningful digital experiences.',
    vision: 'Building a future where technology empowers everyone to achieve their full potential.'
  };

  const topSkills: Skill[] = [
    { name: 'React/Next.js', level: 95, category: 'Frontend', color: 'text-blue-400' },
    { name: 'Node.js/Express', level: 90, category: 'Backend', color: 'text-green-400' },
    { name: 'Python/Django', level: 88, category: 'Backend', color: 'text-yellow-400' },
    { name: 'Cybersecurity', level: 85, category: 'Security', color: 'text-red-400' },
    { name: 'Cloud (AWS)', level: 82, category: 'DevOps', color: 'text-purple-400' },
    { name: 'AI/ML', level: 80, category: 'AI', color: 'text-pink-400' }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      name: 'Full Stack Master',
      description: 'Mastered both frontend and backend development',
      rarity: 'Epic',
      xpReward: 2500
    },
    {
      id: 2,
      name: 'Security Expert',
      description: 'Advanced knowledge in cybersecurity practices',
      rarity: 'Legendary',
      xpReward: 3000
    },
    {
      id: 3,
      name: 'Innovation Pioneer',
      description: 'Created multiple innovative projects',
      rarity: 'Rare',
      xpReward: 2000
    },
    {
      id: 4,
      name: 'Code Architect',
      description: 'Designed scalable software architectures',
      rarity: 'Epic',
      xpReward: 2200
    }
  ];

  const interests: Interest[] = [
    { name: 'Gaming', description: 'Strategy and puzzle games' },
    { name: 'Music', description: 'Classical and electronic music' },
    { name: 'Photography', description: 'Nature and tech photography' },
    { name: 'Reading', description: 'Tech blogs and sci-fi novels' },
    { name: 'Coffee', description: 'Exploring different brewing methods' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'from-yellow-400 to-orange-500';
      case 'Epic': return 'from-purple-400 to-pink-500';
      case 'Rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="page-wrapper min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <div className={`mb-8 sm:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-2xl border border-green-500/30 backdrop-blur-sm p-6 sm:p-8 overflow-hidden relative">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/20 to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
              
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-green-400/50 shadow-2xl">
                    <img 
                      src="/profile-image.jpeg" 
                      alt="Karthigaiselvam T"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-gray-900 shadow-lg">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  {personalInfo.name}
                </h1>
                <h2 className="text-lg sm:text-xl lg:text-2xl text-green-400 font-semibold mb-4">
                  {personalInfo.title}
                </h2>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4 text-sm sm:text-base">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                    {personalInfo.location}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-green-400" />
                    Age {personalInfo.age}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
                    {personalInfo.experience}
                  </div>
                </div>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                  {personalInfo.bio}
                </p>

                {/* Contact Buttons */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <button className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Me
                  </button>
                  <button className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base border border-gray-600">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className={`mb-8 sm:mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/30 backdrop-blur-sm p-6">
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">Mission</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {personalInfo.mission}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-xl border border-green-500/30 backdrop-blur-sm p-6">
              <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-green-400 mr-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">Vision</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {personalInfo.vision}
              </p>
            </div>
          </div>
        </div>

        {/* Top Skills */}
        <div className={`mb-8 sm:mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center">
            <Code className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mr-3" />
            Core Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topSkills.map((skill) => (
              <div key={skill.name} className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Code className={`w-5 h-5 mr-2 ${skill.color}`} />
                    <span className="text-white font-semibold text-sm sm:text-base">{skill.name}</span>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">{skill.category}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${skill.color === 'text-blue-400' ? 'from-blue-400 to-blue-600' :
                      skill.color === 'text-green-400' ? 'from-green-400 to-green-600' :
                      skill.color === 'text-yellow-400' ? 'from-yellow-400 to-yellow-600' :
                      skill.color === 'text-red-400' ? 'from-red-400 to-red-600' :
                      skill.color === 'text-purple-400' ? 'from-purple-400 to-purple-600' :
                      'from-pink-400 to-pink-600'} transition-all duration-1000 group-hover:shadow-lg`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className={`mb-8 sm:mb-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mr-3" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm hover:border-yellow-500/50 transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRarityColor(achievement.rarity)} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-bold text-sm sm:text-base">{achievement.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white font-semibold`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm mb-2">{achievement.description}</p>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-3 h-3 mr-1" />
                      <span className="text-xs font-semibold">+{achievement.xpReward} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests & Hobbies */}
        <div className={`mb-8 sm:mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 mr-3" />
            Interests & Hobbies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {interests.map((interest) => (
              <div key={interest.name} className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 group text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-red-400/20 to-pink-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">{interest.name}</h3>
                <p className="text-gray-400 text-xs">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className={`mb-8 sm:mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30 backdrop-blur-sm p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mr-3" />
              Fun Facts About Me
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-gray-300 text-sm">Cups of Coffee</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">50+</div>
                <div className="text-gray-300 text-sm">Projects Completed</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">24/7</div>
                <div className="text-gray-300 text-sm">Learning Mode</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl border border-green-500/30 backdrop-blur-sm p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Let's Build Something Amazing Together!</h2>
            <p className="text-gray-300 mb-6 text-sm sm:text-base max-w-2xl mx-auto">
              I'm always excited to work on new projects and collaborate with fellow developers. 
              Whether it's a startup idea, open source contribution, or just a chat about tech, I'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 font-semibold">
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
              <button className="flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 font-semibold border border-gray-600">
                <Trophy className="w-5 h-5 mr-2" />
                View My Work
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
