import React, { useEffect, useState } from 'react';
import { auth } from '../Config/FireBase'; // Make sure this path is correct
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = ({ onLoginClick }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Health Buddy</div>
          {user ? (
            <div>
              <span className="mr-4">Logged in as {user.email}</span>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
