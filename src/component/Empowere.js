import React, { useEffect, useState } from 'react';
import em from '../assets/em1.jpg';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

const Empowering = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const element = document.getElementById('Empower');
      if (element) {
        const position = element.getBoundingClientRect();
        const isVisible = position.top < window.innerHeight - 100;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToAISection = () => {
        const aiSection = document.getElementById('ai');
        if (aiSection) {
            aiSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <div id="Empower" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between px-6 lg:px-32 py-20">
        {/* Image Section */}
        <div className={`lg:w-1/2 transform transition-all duration-1000 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl filter blur-2xl"></div>
            <img
              src={em}
              alt="Empowering Health Journey"
              className="relative w-full h-auto object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center animate-pulse">
              <Sparkles className="w-12 h-12 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={`lg:w-1/2 mt-12 lg:mt-0 lg:ml-20 text-center lg:text-left space-y-8 transform transition-all duration-1000 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <h1 
            className="text-4xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: '"Climate Crisis", cursive' }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Empowering
            </span>
            <br />
            <span className="text-gray-800">Your Health Journey</span>
          </h1>

          <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
            Unlock the secrets to a healthier, happier you with our cutting-edge chatbot. 
            Receive personalized nutrition recommendations tailored to your unique needs 
            and preferences.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button  onClick={scrollToAISection} className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors duration-300">
              Learn More
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8">
            {['Personalized', 'AI-Powered', 'Evidence-Based'].map((feature, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-gray-600 text-sm flex items-center gap-1"
              >
                <Sparkles className="w-4 h-4 text-blue-500" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empowering;