import React, { useState,useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth } from "../Config/FireBase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // If using React Router for navigation

const NutritionAnalyzer = ({ onLoginRequest }) => {
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [foodItems, setFoodItems] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate(); // Hook from React Router for navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const genAI = new GoogleGenerativeAI("AIzaSyCNJcZT4sGpJzkOZ6NqXnf6Rhicev4N68o");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const handleGetNutritionInfoClick = () => {
    if (!user) {
      onLoginRequest();  // Trigger login modal from parent component
      return;
    }
    getNutritionInfo();
  };

  const getNutritionInfo = async () => {
    if (!foodItems.trim()) {
      setError('Please enter some food items');
      return;
    }

    setLoading(true);
    setError('');
    
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
- Details: provide details on the potential disease impacts

If sufficient details are provided, calculate and provide the exact nutritional information in the same list format as demonstrated above.`;

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
    // Replace **text** patterns with bold text
    const parts = text.split('**');
    return parts.map((part, index) => {
      // Even indices are normal text, odd indices should be bold
      return index % 2 === 1 ? <strong key={index}>{part}</strong> : part;
    });
  };

  const formatResponse = (text) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (!line.trim()) return null;

      // Format headings
      if (line.includes('Total Nutrition:') || 
          line.includes('Deficiencies:') || 
          line.includes('Diseases:')) {
        return (
          <h3 key={index} className="text-lg font-bold mt-4 mb-2">
            {formatLine(line)}
          </h3>
        );
      }

      // Format list items
      if (line.startsWith('-')) {
        return (
          <p key={index} className="ml-4 mb-1">
            {formatLine(line)}
          </p>
        );
      }

      // Format any other text
      return (
        <p key={index} className="mb-1">
          {formatLine(line)}
        </p>
      );
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Nutrition Analyzer</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={foodItems}
          onChange={e => setFoodItems(e.target.value)}
          placeholder="Enter food items (e.g., '2 slices of pizza, salad, and a cookie')"
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button 
          onClick={handleGetNutritionInfoClick} 
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Get Nutrition Info'}
        </button>
      </div>

      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {responseText && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          {formatResponse(responseText)}
        </div>
      )}
    </div>
  );
};

export default NutritionAnalyzer;