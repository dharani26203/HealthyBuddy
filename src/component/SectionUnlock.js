import React from 'react';
import hb1 from '../assets/hb1.jpg';
import hb2 from '../assets/hb2.jpg';
import hb23 from '../assets/hb23.jpg';

const SectionUnlock = () => {
  return (
    <div className="bg-white p-6 md:p-12">
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 text-center mb-6">Unlock Your</h2>
      <div className="flex flex-wrap justify-center gap-4">
        <img src={hb1} alt="Unlock Feature 1" className="w-1/3 sm:w-1/4 md:w-1/6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"/>
        <img src={hb2} alt="Unlock Feature 2" className="w-1/3 sm:w-1/4 md:w-1/6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"/>
        <img src={hb23} alt="Unlock Feature 3" className="w-1/3 sm:w-1/4 md:w-1/6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"/>
      </div>
    </div>
  );
}

export default SectionUnlock;
