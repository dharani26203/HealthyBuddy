import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth } from "../Config/FireBase";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Bot, Loader2, AlertCircle, ChevronRight, Apple } from 'lucide-react';

const NutritionAnalyzer = ({ onLoginRequest }) => {
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [foodItems, setFoodItems] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);

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

    setLoading(true);
    setError('');
    setIsAnalysisVisible(false);
    
    const prompt = `I ate ${foodItems}. If it is impossible to provide precise nutritional information due to unspecified details about the food items such as brand, size, or recipe, please generate random plausible nutritional values and health details in the following list format:

Total Nutrition:
- Total Calories (kcal): generate a random value between 100 and 600
- Protein (g): generate a random value between 5 and 30
- Carbohydrates (g): generate a random value between 20 and 120
- Fats (g): generate a random value between 10 and 60
- Vitamin A (µg): generate a random value between 200 and 1000
- Vitamin C (mg): generate a random value between 10 and 90
- Calcium (mg): generate a random value between 50 and 500
- Iron (mg): generate a random value between 2 and 18

Deficiencies: provide a random deficiency description
Diseases:
- Disease Name: provide a potential random disease related to dietary habits
- Details: provide details on the potential disease impacts`;

    try {
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      setResponseText(text);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching nutrition information');
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

      if (line.includes('Total Nutrition:')) {
        return (
          <h3 key={index} className="text-xl font-bold mt-6 mb-4 text-blue-600 flex items-center gap-2">
            <Apple className="h-5 w-5" />
            {formatLine(line)}
          </h3>
        );
      }

      if (line.includes('Deficiencies:') || line.includes('Diseases:')) {
        return (
          <h3 key={index} className="text-xl font-bold mt-6 mb-4 text-orange-600 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
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
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Bot className="h-8 w-8 text-blue-500 animate-bounce" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Nutrition Analyzer
            </h2>
          </div>
          
          <div className="relative mb-6">
            <input
              type="text"
              value={foodItems}
              onChange={e => setFoodItems(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter food items (e.g., '2 slices of pizza, salad, and a cookie')"
              className="w-full p-4 pr-36 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300"
            />
            <button 
              onClick={handleGetNutritionInfoClick} 
              disabled={loading}
              className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Bot className="h-5 w-5" />
                  Analyze
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="p-4 mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-fade-in">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {error}
              </div>
            </div>
          )}

          {responseText && (
            <div className={`mt-6 transition-all duration-500 transform ${
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