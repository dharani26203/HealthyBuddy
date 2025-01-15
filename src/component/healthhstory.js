import React, { useEffect, useState, useCallback } from 'react';
import { auth, db } from '../Config/FireBase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';


const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const HealthHistory = () => {
  const [userHistory, setUserHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const fetchUserHistory = useCallback(async (user) => {
    try {
      const docRef = doc(db, `users/${user.uid}/analyses`);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUserHistory({ uid: user.uid, history: docSnap.data().healthHistory });
        setError('');
        setRetryCount(0);
      } else {
        setError('No history found');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      
      // Handle specific Firebase errors
      if (err.code === 'permission-denied') {
        setError('You don\'t have permission to access this data');
      } else if (err.code === 'unavailable') {
        setError('Service temporarily unavailable');
      } else if (err.name === 'QuotaExceededError') {
        setError('Database quota exceeded. Please try again later.');
      } else {
        setError('Failed to fetch user history');
      }

      // Implement retry logic
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchUserHistory(user);
        }, RETRY_DELAY * (retryCount + 1)); // Exponential backoff
      }
    }
  }, [retryCount]);

  useEffect(() => {
    // Setup Firebase offline persistence
    db.enablePersistence()
      .catch((err) => {
        if (err.code === 'failed-precondition') {
          console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code === 'unimplemented') {
          console.warn('The current browser doesn\'t support persistence.');
        }
      });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserHistory(user);
      } else {
        setError('User is not logged in');
      }
      setLoading(false);
    });

    // Implement connection state monitoring
    const connectedRef = db.ref('.info/connected');
    const connectionListener = connectedRef.on('value', (snap) => {
      if (snap.val() === true) {
        console.log('Connected to Firebase');
      } else {
        console.log('Disconnected from Firebase');
        setError('Connection lost. Retrying...');
      }
    });

    return () => {
      unsubscribe();
      connectedRef.off('value', connectionListener);
    };
  }, [fetchUserHistory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Health History</h1>
      
      {error && (
        <div>{error}</div>
      )}
      
      {userHistory && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold">UID: {userHistory.uid}</h2>
          </div>
          
          <div className="space-y-2">
            {userHistory.history.map((historyItem, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow"
              >
                <p>{historyItem.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthHistory;