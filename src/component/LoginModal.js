import React, { useState } from 'react';
import { auth } from "../Config/FireBase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const LoginModal = ({ isOpen, onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in");
      onClose();
    } catch (e) {
      console.log("Error during login:", e);
    }
  };

  const handleRegister = async () => {
    try {
      if (!name) {
        alert("Please enter your name");
        return; // Prevent further execution if name is empty
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      console.log("User registered with name:", user.displayName);
      onClose();
    } catch (e) {
      console.log("Error during registration:", e);
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">{isRegistering ? "Register" : "Login"}</h2>
        
        {isRegistering && (
          <input
            type="text"
            placeholder="Name..."
            className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email..."
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={isRegistering ? handleRegister : handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 mb-3"
        >
          {isRegistering ? "Register" : "Login"}
        </button>

        <p className="text-sm text-center">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}
          <span 
            className="text-blue-500 cursor-pointer"
            onClick={toggleForm}
          >
            {isRegistering ? " Login" : " Register"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
