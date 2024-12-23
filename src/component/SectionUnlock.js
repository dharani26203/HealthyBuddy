import React, { useEffect, useState } from 'react';
import hb1 from '../assets/hb1.jpg';
import hb2 from '../assets/hb2.jpg';
import hb23 from '../assets/hb23.jpg';
import { Lock, Unlock, ChevronDown } from 'lucide-react';

const SectionUnlock = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('unlock-section');
      if (element) {
        const position = element.getBoundingClientRect();
        const isVisible = position.top < window.innerHeight - 100;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const images = [
    { src: hb1, alt: "Unlock Feature 1", title: "Personalized Nutrition" },
    { src: hb2, alt: "Unlock Feature 2", title: "Smart Analysis" },
    { src: hb23, alt: "Unlock Feature 3", title: "Health Insights" }
  ];

  return (
    <div id="unlock-section" className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 px-6">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-40 -left-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block animate-bounce-slow">
            {isVisible ? (
              <Unlock className="w-12 h-12 text-blue-500 mb-4 transform rotate-12" />
            ) : (
              <Lock className="w-12 h-12 text-gray-400 mb-4" />
            )}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Unlock Your Potential
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover personalized nutrition insights and health recommendations tailored just for you
          </p>
          <ChevronDown className="w-6 h-6 mx-auto text-gray-400 animate-bounce" />
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {images.map((image, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className={`text-center mt-16 transform transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionUnlock;