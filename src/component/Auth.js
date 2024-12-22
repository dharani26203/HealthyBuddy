import React, { useState } from 'react'
import { auth, googleProvider } from "../Config/FireBase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

export const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered");
    } catch (e) {
      console.log(e);
    }
  }

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in");
    } catch (e) {
      console.log(e);
    }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.log(e);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isRegistering ? "Register" : "Sign In"}
        </h2>
        <input
          type='email'
          placeholder='Email...'
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password...'
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegistering ? (
          <button
            onClick={signUp}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        ) : (
          <button
            onClick={login}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        )}

        <button
          onClick={signInWithGoogle}
          className="w-full bg-red-500 text-white py-2 mt-4 rounded hover:bg-red-600 transition duration-300"
        >
          Sign In With Google
        </button>

        <button
          onClick={logout}
          className="w-full bg-gray-500 text-white py-2 mt-4 rounded hover:bg-gray-600 transition duration-300"
        >
          Sign Out
        </button>

        <div className="text-center mt-4">
          {isRegistering ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setIsRegistering(false)}
                className="text-blue-500 cursor-pointer"
              >
                Sign In
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => setIsRegistering(true)}
                className="text-blue-500 cursor-pointer"
              >
                Register
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
