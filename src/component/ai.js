import React, { useState, useEffect } from 'react'; 
import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth } from "../Config/FireBase";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {  Bot, Loader2, AlertCircle, ChevronRight, Apple, Scale, Ruler, GlassWater, User2  } from 'lucide-react';

const NutritionAnalyzer = ({ onLoginRequest }) => {
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [foodItems, setFoodItems] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);
  
  // New state variables
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [waterIntake, setWaterIntake] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (responseText) {
      setIsAnalysisVisible(true);
    }
  }, [responseText]);

  const genAI = new GoogleGenerativeAI("AIzaSyCNJcZT4sGpJzkOZ6NqXnf6Rhicev4N68o");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const handleGetNutritionInfoClick = () => {
    if (!user) {
      onLoginRequest();
      return;
    }
    getNutritionInfo();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      handleGetNutritionInfoClick();
    }
  };

  const getNutritionInfo = async () => {
    if (!foodItems.trim()) {
      setError('Please enter some food items');
      return;
    }

    if (!height || !weight || !gender || !waterIntake) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    setIsAnalysisVisible(false);
    
    const bmi = calculateBMI(weight, height);
    
    const prompt = `I am a ${gender} individual with height ${height}cm and weight ${weight}kg (BMI: ${bmi}). I consumed ${waterIntake} glasses of water today and ate ${foodItems}. 

If precise nutritional information is unavailable, generate plausible values in this format:

Total Nutrition:
- Total Calories (kcal): generate a random value between 100 and 600
- Protein (g): generate a random value between 5 and 30
- Carbohydrates (g): generate a random value between 20 and 120
- Fats (g): generate a random value between 10 and 60
- Vitamin A (µg): generate a random value between 200 and 1000
- Vitamin C (mg): generate a random value between 10 and 90
- Calcium (mg): generate a random value between 50 and 500
- Iron (mg): generate a random value between 2 and 18

BMI Analysis:
- Current BMI: ${bmi}
- Category: determine BMI category
- Health Implications: provide brief health implications

Water Intake Analysis:
- Current Intake: ${waterIntake} glasses
- Recommended Intake: provide recommendation
- Hydration Status: evaluate status

Exercise Recommendations:
- Provide 3 specific exercises based on BMI and overall health profile
- Include duration and frequency for each exercise

Lifestyle Recommendations:
- Provide 3 actionable lifestyle improvements
- Include specific dietary adjustments if needed`;

    try {
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      setResponseText(text);
    } catch (error) {
      setError(error.message || 'An error occurred while analyzing your information');
    } finally {
      setLoading(false);
    }
  };

  const formatLine = (text) => {
    const parts = text.split('**');
    return parts.map((part, index) => 
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    );
  };

  const formatResponse = (text) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (!line.trim()) return null;

      if (line.includes('Total Nutrition:') || line.includes('BMI Analysis:') || 
          line.includes('Water Intake Analysis:') || line.includes('Exercise Recommendations:') ||
          line.includes('Lifestyle Recommendations:')) {
        return (
          <h3 key={index} className="text-xl font-bold mt-6 mb-4 text-blue-600 flex items-center gap-2">
            <Apple className="h-5 w-5" />
            {formatLine(line)}
          </h3>
        );
      }

      if (line.startsWith('-')) {
        return (
          <div key={index} 
               className="ml-4 mb-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <p className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              {formatLine(line)}
            </p>
          </div>
        );
      }

      return (
        <p key={index} className="mb-3 text-gray-600">
          {formatLine(line)}
        </p>
      );
    });
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Bot className="h-12 w-12 text-blue-500 animate-bounce" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Nutrition & Health Analyzer
              </h2>
            </div>
            <p className="text-gray-600">Track your nutrition, calculate BMI, and get personalized health recommendations</p>
          </div>

          {/* Input Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Personal Info Card */}
            <div className="bg-blue-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <User2 className="h-5 w-5" />
                Personal Information
              </h3>
              <div className="space-y-4">
                {/* Height Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                  <div className="flex items-center gap-2 bg-white rounded-xl p-3 border-2 border-transparent focus-within:border-blue-500 transition-all duration-300">
                    <Ruler className="h-5 w-5 text-blue-400" />
                    <input
                      type="number"
                      value={height}
                      onChange={e => setHeight(e.target.value)}
                      placeholder="Enter height"
                      className="w-full focus:outline-none"
                    />
                    <span className="text-gray-500">cm</span>
                  </div>
                </div>

                {/* Weight Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <div className="flex items-center gap-2 bg-white rounded-xl p-3 border-2 border-transparent focus-within:border-blue-500 transition-all duration-300">
                    <Scale className="h-5 w-5 text-blue-400" />
                    <input
                      type="number"
                      value={weight}
                      onChange={e => setWeight(e.target.value)}
                      placeholder="Enter weight"
                      className="w-full focus:outline-none"
                    />
                    <span className="text-gray-500">kg</span>
                  </div>
                </div>

                {/* Gender Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <div className="flex gap-4 bg-white p-3 rounded-xl">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="radio"
                          value="male"
                          checked={gender === 'male'}
                          onChange={e => setGender(e.target.value)}
                          className="peer sr-only"
                        />
                        <div className="w-6 h-6 border-2 rounded-full border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all duration-300"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-500 transition-colors duration-300">Male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="radio"
                          value="female"
                          checked={gender === 'female'}
                          onChange={e => setGender(e.target.value)}
                          className="peer sr-only"
                        />
                        <div className="w-6 h-6 border-2 rounded-full border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all duration-300"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-500 transition-colors duration-300">Female</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Consumption Info Card */}
            <div className="bg-orange-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                <Apple className="h-5 w-5" />
                Consumption Details
              </h3>
              <div className="space-y-4">
                {/* Water Intake Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Water Intake</label>
                  <div className="flex items-center gap-2 bg-white rounded-xl p-3 border-2 border-transparent focus-within:border-orange-500 transition-all duration-300">
                    <GlassWater className="h-5 w-5 text-orange-400" />
                    <input
                      type="number"
                      value={waterIntake}
                      onChange={e => setWaterIntake(e.target.value)}
                      placeholder="Number of glasses"
                      className="w-full focus:outline-none"
                    />
                    <span className="text-gray-500">glasses</span>
                  </div>
                </div>

                {/* Food Items Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Food Items</label>
                  <div className="relative">
                    <textarea
                      value={foodItems}
                      onChange={e => setFoodItems(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your meals (e.g., '2 slices of pizza, salad, and a cookie')"
                      className="w-full p-3 bg-white rounded-xl border-2 border-transparent focus:border-orange-500 focus:outline-none transition-all duration-300 min-h-[120px] resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <div className="flex justify-center">
            <button 
              onClick={handleGetNutritionInfoClick} 
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-xl hover:from-blue-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Bot className="h-6 w-6" />
                  Analyze Health Profile
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-fade-in">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {error}
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {responseText && (
            <div className={`mt-8 transition-all duration-500 transform ${
              isAnalysisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-xl border border-gray-200">
                {formatResponse(responseText)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionAnalyzer;