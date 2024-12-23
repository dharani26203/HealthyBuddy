import React, { useEffect } from 'react';
import HeroImage from '../assets/Hero1.jpg';

const Hero = () => {
  useEffect(() => {
    // Add animation classes after component mount
    const heading1 = document.querySelector('.animate-slide-up-1');
    const heading2 = document.querySelector('.animate-slide-up-2');
    const paragraph = document.querySelector('.animate-fade-in');
    const button = document.querySelector('.animate-bounce-in');
    const image = document.querySelector('.animate-slide-in');

    setTimeout(() => {
      heading1?.classList.add('translate-y-0', 'opacity-100');
      setTimeout(() => {
        heading2?.classList.add('translate-y-0', 'opacity-100');
        setTimeout(() => {
          paragraph?.classList.add('opacity-100');
          setTimeout(() => {
            button?.classList.add('scale-100', 'opacity-100');
            image?.classList.add('translate-x-0', 'opacity-100');
          }, 200);
        }, 200);
      }, 200);
    }, 100);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 lg:px-32 pt-24 pb-12">
        <div className="text-center lg:text-left max-w-lg space-y-6 z-10">
          <h1 
            className="animate-slide-up-1 transform translate-y-8 opacity-0 transition-all duration-700 text-4xl lg:text-6xl font-bold text-gray-800 leading-tight"
            style={{ fontFamily: '"Climate Crisis", cursive' }}
          >
            Discover the Nutritional
          </h1>
          <h1 
            className="animate-slide-up-2 transform translate-y-8 opacity-0 transition-all duration-700 delay-200 text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent leading-tight"
            style={{ fontFamily: '"Climate Crisis", cursive' }}
          >
            Power of Our Chatbot
          </h1>
          <p className="animate-fade-in opacity-0 transition-all duration-700 delay-400 text-gray-600 text-lg lg:text-xl">
            Explore the ultimate chatbot experience that provides personalized nutrition recommendations based on your dietary preferences and health
          </p>
          <button className="animate-bounce-in transform scale-90 opacity-0 transition-all duration-500 delay-600 bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all">
            Try Now
          </button>
        </div>

        <div className="mt-8 lg:mt-0 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-full filter blur-3xl"></div>
            <img
              src={HeroImage}
              alt="AI Chatbot"
              className="animate-slide-in transform translate-x-8 opacity-0 transition-all duration-700 delay-800 relative w-full h-auto max-w-xl object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Add floating elements for visual interest */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-40 w-3 h-3 bg-orange-400 rounded-full animate-float animation-delay-2000"></div>
      <div className="absolute top-40 right-20 w-2 h-2 bg-purple-400 rounded-full animate-float animation-delay-4000"></div>
    </div>
  );
};

export default Hero;