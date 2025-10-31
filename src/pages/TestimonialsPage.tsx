import React, { useState, useEffect } from 'react';
import { MessageSquare, Star, Shield, Unlock } from 'lucide-react';

interface Testimonial {
  id: string;
  client: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  encrypted: boolean;
  date: string;
}

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [decryptedIds, setDecryptedIds] = useState<string[]>([]);

  // Example testimonials data
  const testimonialsData: Testimonial[] = [
    {
      id: 'test-1',
      client: 'Sarah Chen',
      company: 'TechGrowth Inc',
      role: 'CTO',
      content: 'Exceptional work on our security infrastructure overhaul. The authentication system developed is robust, user-friendly, and has significantly reduced unauthorized access attempts. The documentation provided was comprehensive and made the handover process seamless.',
      rating: 5,
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      encrypted: false,
      date: '2023-09-15'
    },
    {
      id: 'test-2',
      client: 'Michael Rodriguez',
      company: 'FinTech Solutions',
      role: 'Lead Developer',
      content: 'We hired this developer to build our customer dashboard and the results exceeded our expectations. The attention to detail, clean code structure, and innovative solutions to complex problems were impressive. The real-time data visualization components have become a key selling point for our platform.',
      rating: 5,
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      encrypted: false,
      date: '2023-07-22'
    },
    {
      id: 'test-3',
      client: '████████ ███████',
      company: '███████ ███.',
      role: '███',
      content: '████ ████████ ███████ ██ ███ ███████ ████████ ███████. ███ ████ ███ ████████ ███ ███████ ████████. ███ ███████ ████ ███████ ███ ████ ███████ █████████ ███ ████████ ████ ███████ ███ ███████ ████ ████████ ████.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      encrypted: true,
      date: '2023-05-10'
    },
    {
      id: 'test-4',
      client: 'Emily Johnson',
      company: 'DataViz Pro',
      role: 'Product Manager',
      content: 'Working with this developer on our data visualization tools was a fantastic experience. They quickly understood our requirements and delivered a solution that made complex data easily understandable for our users. Their expertise in both frontend and data processing was invaluable.',
      rating: 4,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      encrypted: false,
      date: '2023-03-18'
    },
    {
      id: 'test-5',
      client: '████ ██████',
      company: '███████ ████████',
      role: '████████ ████████',
      content: '███ ████████ ████ ███ ███████ ██████████ ███ ████████. ██ ████████ ████ ████████ ████ ██████ ██████████ ███ ██████ █████████. ████ ████ █████ ███ ████████ ███ ████ ████████ ████ ███ ████ ████ ████████.',
      rating: 5,
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      encrypted: true,
      date: '2023-01-05'
    },
  ];

  // Sample decrypted content for encrypted testimonials
  const decryptedTestimonials: Record<string, Partial<Testimonial>> = {
    'test-3': {
      client: 'David Wilson',
      company: 'SecureNet Inc.',
      role: 'CEO',
      content: 'This developer created our entire security infrastructure from scratch. The work was confidential and highly sensitive, but the results were outstanding. Our systems have withstood multiple penetration tests and security audits with flying colors. Highly recommended for security-critical projects.',
    },
    'test-5': {
      client: 'Mark Johnson',
      company: 'Defense Dynamics',
      role: 'Security Director',
      content: 'We contracted this developer for a classified government project. For security reasons I cannot disclose details, but their expertise in encryption and secure systems was exceptional. They delivered on time and exceeded all security requirements. Would hire again for sensitive projects.',
    }
  };

  // Simulate loading testimonials
  useEffect(() => {
    const loadTestimonials = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTestimonials(testimonialsData);
      setLoading(false);
    };
    
    loadTestimonials();
    
    // Check if any testimonials should be decrypted from terminal commands
    const terminalDecrypt = window.localStorage.getItem('terminal-decrypt');
    if (terminalDecrypt && terminalDecrypt.startsWith('testimonial ')) {
      const testimonialId = terminalDecrypt.replace('testimonial ', '');
      handleDecrypt(testimonialId);
      window.localStorage.removeItem('terminal-decrypt');
    }
  }, []);

  // Decrypt a testimonial
  const handleDecrypt = (id: string) => {
    if (!decryptedIds.includes(id)) {
      setDecryptedIds(prev => [...prev, id]);
      
      // Auto re-encrypt after 30 seconds
      setTimeout(() => {
        setDecryptedIds(prev => prev.filter(testId => testId !== id));
      }, 30000);
    }
  };

  // Render stars for rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} 
      />
    ));
  };

  // Get testimonial data (decrypted or encrypted)
  const getTestimonialData = (testimonial: Testimonial) => {
    if (!testimonial.encrypted || !decryptedIds.includes(testimonial.id)) {
      return testimonial;
    }
    
    return {
      ...testimonial,
      ...decryptedTestimonials[testimonial.id]
    };
  };

  return (
    <div className="page-wrapper p-6 max-w-5xl mx-auto text-green-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-white">/</span>testimonials
        </h1>
        <p className="text-gray-400">Decrypting client communications and feedback...</p>
      </div>

      {loading ? (
        <div className="bg-black bg-opacity-30 p-8 rounded-lg border border-green-500 shadow-lg text-center">
          <div className="loading-spinner"></div>
          <p>Retrieving client testimonials...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {testimonials.map(testimonial => {
            const isDecrypted = !testimonial.encrypted || decryptedIds.includes(testimonial.id);
            const data = getTestimonialData(testimonial);
            
            return (
              <div 
                key={testimonial.id}
                className="bg-black bg-opacity-30 rounded-lg border border-green-500 shadow-lg overflow-hidden"
              >
                <div className="p-6 relative">
                  {/* Encryption indicator */}
                  {testimonial.encrypted && (
                    <div className="absolute top-4 right-4">
                      {isDecrypted ? (
                        <div className="flex items-center text-green-400 text-xs">
                          <Unlock size={14} className="mr-1" />
                          DECRYPTED
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDecrypt(testimonial.id)}
                          className="flex items-center bg-black bg-opacity-50 px-2 py-1 rounded text-xs border border-green-500 hover:bg-green-900 hover:bg-opacity-20"
                        >
                          <Shield size={14} className="mr-1" />
                          ENCRYPTED
                        </button>
                      )}
                    </div>
                  )}
                  
                  {/* Client info */}
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={data.image} 
                        alt={data.client} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{data.client}</h3>
                      <p className="text-green-400">{data.role} at {data.company}</p>
                      <div className="flex mt-1">
                        {renderStars(data.rating)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Testimonial content */}
                  <div className="bg-black bg-opacity-30 p-4 rounded-lg mb-3 relative">
                    <MessageSquare size={18} className="absolute text-green-400 opacity-20 top-3 left-3" />
                    <blockquote className="pl-7 text-gray-300">
                      "{data.content}"
                    </blockquote>
                  </div>
                  
                  <div className="text-right text-xs text-gray-500">
                    {new Date(data.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Terminal style stat cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black bg-opacity-30 p-4 rounded-lg border border-green-500">
          <div className="text-center">
            <div className="text-3xl font-bold">{testimonials.length}</div>
            <div className="text-sm text-gray-400">Total Testimonials</div>
          </div>
        </div>
        
        <div className="bg-black bg-opacity-30 p-4 rounded-lg border border-green-500">
          <div className="text-center">
            <div className="text-3xl font-bold">
              {testimonials.filter(t => t.rating === 5).length}
            </div>
            <div className="text-sm text-gray-400">5-Star Ratings</div>
          </div>
        </div>
        
        <div className="bg-black bg-opacity-30 p-4 rounded-lg border border-green-500">
          <div className="text-center">
            <div className="text-3xl font-bold">
              {testimonials.filter(t => t.encrypted).length}
            </div>
            <div className="text-sm text-gray-400">Encrypted Reviews</div>
          </div>
        </div>
      </div>
      
      {/* Terminal command help */}
      <div className="mt-8 p-4 bg-black bg-opacity-50 rounded-lg font-mono text-sm">
        <p className="text-gray-400 mb-2"># Decrypt specific testimonials</p>
        <p><span className="text-green-400">$</span> decrypt testimonial test-3</p>
        <p><span className="text-green-400">$</span> decrypt testimonial test-5</p>
        <p className="mt-2 text-gray-400"># Navigation commands</p>
        <p><span className="text-green-400">$</span> cd /projects</p>
        <p><span className="text-green-400">$</span> cd /contact</p>
      </div>
    </div>
  );
};

export default TestimonialsPage;