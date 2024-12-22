import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NutritionInfo from './component/ai';
import Home from './component/Home';



function App() {
  return (
    <Router>
      <div>
        

        <Routes>
          <Route path="/" element={<Home/>} />
          {/* Add more routes as needed */}
          <Route path="*" element={<h1>404: Page Not Found</h1>} /> {/* Catch-all route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;