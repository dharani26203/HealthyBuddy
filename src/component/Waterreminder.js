import React, { useState, useEffect } from 'react';
import { GlassWater, Droplets } from 'lucide-react';

const WaterReminder = ({ onDrinkCountChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [drinkCount, setDrinkCount] = useState(0);
  const [lastDrinkTime, setLastDrinkTime] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(true);
    }, 10 * 60 * 1000);

    setIsOpen(true);
    return () => clearInterval(interval);
  }, []);

  const handleDrink = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setDrinkCount(prev => {
        const newCount = prev + 1;
        onDrinkCountChange(newCount); // Update the parent state
        return newCount;
      });
      setLastDrinkTime(new Date().toLocaleTimeString());
      setIsOpen(false);
      setIsAnimating(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-cyan-900/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 border border-cyan-100">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-cyan-600 p-3 rounded-full">
            <GlassWater className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-700 to-blue-600 text-transparent bg-clip-text">
            Stay Hydrated!
          </h2>
        </div>

        {/* Content Section */}
        <div className="mb-8 space-y-4">
          <p className="text-gray-700 text-lg">
            Time for a water break! Would you like to log a glass of water?
          </p>
          
          {drinkCount > 0 && (
            <div className="bg-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 text-blue-800">
                <Droplets className="h-5 w-5" />
                <span className="font-medium">
                  {drinkCount} glass{drinkCount !== 1 ? 'es' : ''} today
                </span>
              </div>
              {lastDrinkTime && (
                <div className="text-sm text-blue-600 mt-1">
                  Last drink: {lastDrinkTime}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Buttons Section */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
          >
            Skip
          </button>
          <button
            onClick={handleDrink}
            disabled={isAnimating}
            className={`px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium
              transform transition-all duration-200 hover:scale-105 hover:shadow-lg
              ${isAnimating ? 'animate-pulse' : ''}
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isAnimating ? (
              <span className="flex items-center gap-2">
                <Droplets className="h-5 w-5 animate-bounce" />
                Logging...
              </span>
            ) : (
              "Yes, I drank water!"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterReminder;