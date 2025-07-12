import React from 'react';
import { GraduationCap, Award, FileText, BookOpen, Shield,  Code, Bot } from 'lucide-react';

const EducationPage: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-green-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-white">/</span>education
        </h1>
        <p className="text-gray-400">Accessing academic records and certifications...</p>
      </div>

      {/* Education timeline */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <GraduationCap size={24} className="mr-3" />
          Academic History
        </h2>
        
        <div className="relative border-l-2 border-green-500 pl-8 ml-4">
          {/* Master's Degree */}
          <div className="mb-12 relative">
            <div className="absolute -left-12 w-8 h-8 bg-green-900 rounded-full border-4 border-green-500 flex items-center justify-center">
              <GraduationCap size={16} />
            </div>
            
            <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Bachelor of Technology in Information Technology</h3>
                  <p className="text-green-400">Madurai Kamarajar University</p>
                </div>
                <div className="text-right">
                  <span className="bg-green-900 bg-opacity-30 px-2 py-1 rounded text-sm">2022 - 2025</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold mb-2">Specialization</h4>
                <p className="text-gray-300">Programming Basic</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold mb-2">Key Courses</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* <div className="bg-black bg-opacity-30 px-3 py-2 rounded text-sm">Advanced Cryptography</div> */}
                  {/* <div className="bg-black bg-opacity-30 px-3 py-2 rounded text-sm">Machine Learning</div> */}
                  <div className="bg-black bg-opacity-30 px-3 py-2 rounded text-sm">Network Basics</div>
                  <div className="bg-black bg-opacity-30 px-3 py-2 rounded text-sm">Distributed Systems</div>
                </div>
              </div>
              
              {/* <div>
                <h4 className="font-bold mb-2">Thesis</h4>
                <p className="text-gray-300">
                  "Novel Approaches to Intrusion Detection Using Hybrid Neural Networks"
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Research on improving security systems using artificial intelligence
                </p>
              </div> */}

            </div>
          </div>
          
          {/* Bachelor's Degree */}
          <div className="mb-12 relative">
            <div className="absolute -left-12 w-8 h-8 bg-green-900 rounded-full border-4 border-green-500 flex items-center justify-center">
              <GraduationCap size={16} />
            </div>
            
            <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Master of Computer Application</h3>
                  <p className="text-green-400">Anna University</p>
                </div>
                <div className="text-right">
                  <span className="bg-green-900 bg-opacity-30 px-2 py-1 rounded text-sm">2025 - 2027</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold mb-2">Minor</h4>
                <p className="text-gray-300">Mathematics</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold mb-2">Key Courses</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-black bg-opacity-30 px-3 py-2 rounded text-sm">Data Structures</div>
                  <div className="bg-black bg-opacity-30 px-3 py-2 rounded text-sm">Algorithms</div>
                  <div className="bg-black bg-opacity-30 px-3 py-2 rounded text-sm">Software Design</div>
                  <div className="bg-black bg-opacity-30 px-3 py-2 rounded text-sm">Database Systems</div>
                </div>
              </div>
              
              {/* <div>
                <h4 className="font-bold mb-2">Final Project</h4>
                <p className="text-gray-300">
                  "Secure Web Application Framework with Real-time Threat Detection"
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Built a web framework with integrated security features
                </p>
              </div> */}
            </div>
          </div>
          
          {/* Early Education */}
          <div className="relative">
            <div className="absolute -left-12 w-8 h-8 bg-green-900 rounded-full border-4 border-green-500 flex items-center justify-center">
              <BookOpen size={16} />
            </div>
            
            <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">HSLC</h3>
                  <p className="text-green-400">Thambithotam Higher Secondary School , Ghandhigram</p>
                </div>
                <div className="text-right">
                  <span className="bg-green-900 bg-opacity-30 px-2 py-1 rounded text-sm">2020 - 2022</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-2">Focus</h4>
                <p className="text-gray-300">
                  Biology with Maths
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Started Mathamatics at age 17 and won regional Maths competitions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Certifications */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Award size={24} className="mr-3" />
          Professional Certifications
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-900 bg-opacity-30 rounded-full flex items-center justify-center mr-4">
                <Shield size={24} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Certified Information Systems Security Professional (CISSP)</h3>
                {/* <p className="text-green-400 mb-1">(ISC)²</p> */}
                {/* <p className="text-sm text-gray-400 mb-3">Issued: 2019 • Expires: 2025</p> */}
                <p className="text-gray-300 text-sm">
                  Advanced certification in information security, covering risk management, security architecture, and cryptography.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-900 bg-opacity-30 rounded-full flex items-center justify-center mr-4">
                <Cloud size={24} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AWS Certified Solutions Architect</h3>
                {/* <p className="text-green-400 mb-1">Amazon Web Services</p> */}
                {/* <p className="text-sm text-gray-400 mb-3">Issued: 2021 • Expires: 2024</p> */}
                <p className="text-gray-300 text-sm">
                  Professional level certification for designing distributed applications and systems on AWS.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-900 bg-opacity-30 rounded-full flex items-center justify-center mr-4">
                <Code size={24} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Full Stack Developer Certification</h3>
                {/* <p className="text-green-400 mb-1">Tech Institute</p> */}
                {/* <p className="text-sm text-gray-400 mb-3">Issued: 2018</p> */}
                <p className="text-gray-300 text-sm">
                  Comprehensive training in modern web development technologies including React, Node.js, and cloud services.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-900 bg-opacity-30 rounded-full flex items-center justify-center mr-4">
                <Bot size={24} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">TensorFlow Developer Certificate</h3>
                {/* <p className="text-green-400 mb-1">Google</p> */}
                {/* <p className="text-sm text-gray-400 mb-3">Issued: 2022</p> */}
                <p className="text-gray-300 text-sm">
                  Certification in building machine learning models using TensorFlow, focusing on neural networks and deep learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Continuing Education */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FileText size={24} className="mr-3" />
          Continuing Education
        </h2>
        
        <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-green-500 shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Recent Courses & Workshops</h3>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="w-6 h-6 bg-green-900 bg-opacity-30 rounded-full flex items-center justify-center mr-3 mt-1">
                <Check size={12} className="text-green-400" />
              </div>
              <div>
                <h4 className="font-bold">Advanced React Patterns Masterclass</h4>
                <p className="text-sm text-gray-400">Frontend Masters (2023)</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="w-6 h-6 bg-green-900 bg-opacity-30 rounded-full flex items-center justify-center mr-3 mt-1">
                <Check size={12} className="text-green-400" />
              </div>
              <div>
                <h4 className="font-bold">Cybersecurity in the Age of AI</h4>
                <p className="text-sm text-gray-400">Security Conference (2023)</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="w-6 h-6 bg-green-900 bg-opacity-30 rounded-full flex items-center justify-center mr-3 mt-1">
                <Check size={12} className="text-green-400" />
              </div>
              <div>
                <h4 className="font-bold">Microservices Architecture and Design</h4>
                <p className="text-sm text-gray-400">O'Reilly Learning Platform (2022)</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="w-6 h-6 bg-green-900 bg-opacity-30 rounded-full flex items-center justify-center mr-3 mt-1">
                <Check size={12} className="text-green-400" />
              </div>
              <div>
                <h4 className="font-bold">GraphQL API Development</h4>
                <p className="text-sm text-gray-400">Apollo GraphQL Certification (2022)</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            "Continuous learning is the key to staying ahead in technology."
          </p>
          <div className="text-sm font-mono bg-black bg-opacity-30 p-3 rounded inline-block">
            <span className="text-green-400">$</span> cd /skills
          </div>
        </div>
      </div>
    </div>
  );
};

// Define missing icon components
const Check = (props: { size: number; className: string }) => {
  const { size, className } = props;
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

const Cloud = (props: { size: number; className: string }) => {
  const { size, className } = props;
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
};

export default EducationPage;