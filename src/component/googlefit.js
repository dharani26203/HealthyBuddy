import React, { useState, useEffect } from 'react';

const GoogleFit = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [fitnessData, setFitnessData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const CLIENT_ID = '3048706275-2p1t30jcgsjtgik3vi1vntvf3u6lldrn.apps.googleusercontent.com';
  
  const SCOPES = [
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.body.read',
    'https://www.googleapis.com/auth/fitness.location.read'
  ];

  useEffect(() => {
    const loadGapiAndInitialize = async () => {
      try {
        await loadGapiScript();
        await initializeGoogleAPI();
      } catch (error) {
        console.error('Failed to initialize:', error);
        setError('Failed to initialize Google API. Please refresh the page.');
      }
    };

    loadGapiAndInitialize();
  }, []);

  const loadGapiScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const initializeGoogleAPI = () => {
    return new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', async () => {
        try {
          await window.gapi.client.init({
            clientId: CLIENT_ID,
            scope: SCOPES.join(' '),
            plugin_name: 'fitness'
          });

          const authInstance = window.gapi.auth2.getAuthInstance();
          setIsAuthenticated(authInstance.isSignedIn.get());
          setIsInitialized(true);

          authInstance.isSignedIn.listen((signedIn) => {
            setIsAuthenticated(signedIn);
          });

          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      const options = {
        prompt: 'select_account',
        ux_mode: 'popup'
      };

      await authInstance.signIn(options);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Sign-in error:', error);
      if (error.error === 'popup_closed_by_user') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (error.error === 'access_denied') {
        setError('Access denied. Please grant the required permissions to use the app.');
      } else {
        setError('Failed to sign in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setError(null);
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signOut();
      setFitnessData(null);
    } catch (error) {
      setError('Failed to sign out. Please try again.');
    }
  };

  const fetchFitnessData = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const endTime = new Date();
      const startTime = new Date();
      startTime.setDate(endTime.getDate() - 7);

      const response = await window.gapi.client.request({
        path: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
        method: 'POST',
        body: {
          aggregateBy: [{
            dataTypeName: 'com.google.step_count.delta',
          }],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: startTime.getTime(),
          endTimeMillis: endTime.getTime(),
        }
      });

      setFitnessData(response.result);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch fitness data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        Initializing Google Fit...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Google Fit Integration</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!isAuthenticated ? (
          <button 
            onClick={handleSignIn}
            disabled={isLoading}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>
        ) : (
          <div className="space-y-4">
            <button 
              onClick={fetchFitnessData}
              disabled={isLoading}
              className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Fetching data...' : 'Fetch Fitness Data'}
            </button>
            
            <button 
              onClick={handleSignOut}
              disabled={isLoading}
              className="w-full border border-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
            
            {fitnessData && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Last 7 Days Activity</h3>
                <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(fitnessData, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleFit;