import React, { useState } from 'react';
import { Plus, Trash2, Activity, Clock, Zap, Flame, Trophy } from 'lucide-react';

const PhysicalActivityTracker = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    type: '',
    duration: '',
    intensity: 'moderate'
  });

  // Activity icons, colors, and gradients mapping
  const activityMeta = {
    walking: { 
      icon: '🚶', 
      gradient: 'from-emerald-100 to-emerald-200',
      hoverGradient: 'hover:from-emerald-200 hover:to-emerald-300',
      activeGradient: 'from-emerald-200 to-emerald-300'
    },
    running: { 
      icon: '🏃', 
      gradient: 'from-blue-100 to-blue-200',
      hoverGradient: 'hover:from-blue-200 hover:to-blue-300',
      activeGradient: 'from-blue-200 to-blue-300'
    },
    cycling: { 
      icon: '🚴', 
      gradient: 'from-purple-100 to-purple-200',
      hoverGradient: 'hover:from-purple-200 hover:to-purple-300',
      activeGradient: 'from-purple-200 to-purple-300'
    },
    swimming: { 
      icon: '🏊', 
      gradient: 'from-cyan-100 to-cyan-200',
      hoverGradient: 'hover:from-cyan-200 hover:to-cyan-300',
      activeGradient: 'from-cyan-200 to-cyan-300'
    },
    yoga: { 
      icon: '🧘', 
      gradient: 'from-pink-100 to-pink-200',
      hoverGradient: 'hover:from-pink-200 hover:to-pink-300',
      activeGradient: 'from-pink-200 to-pink-300'
    },
    weightlifting: { 
      icon: '🏋️', 
      gradient: 'from-orange-100 to-orange-200',
      hoverGradient: 'hover:from-orange-200 hover:to-orange-300',
      activeGradient: 'from-orange-200 to-orange-300'
    }
  };

  const intensityGradients = {
    light: 'from-green-400 to-green-500',
    moderate: 'from-yellow-400 to-yellow-500',
    vigorous: 'from-red-400 to-red-500'
  };

  const metValues = {
    walking: { light: 2.5, moderate: 3.5, vigorous: 4.5 },
    running: { light: 6, moderate: 8, vigorous: 10 },
    cycling: { light: 4, moderate: 6, vigorous: 8 },
    swimming: { light: 5, moderate: 7, vigorous: 9 },
    yoga: { light: 2, moderate: 3, vigorous: 4 },
    weightlifting: { light: 3, moderate: 4, vigorous: 6 }
  };

  const calculateCalories = (activity) => {
    const weight = 70;
    const met = metValues[activity.type]?.[activity.intensity] || 3;
    const duration = parseFloat(activity.duration);
    return Math.round((met * weight * 3.5 * duration) / 200);
  };

  const handleAddActivity = () => {
    if (newActivity.type && newActivity.duration) {
      const calories = calculateCalories(newActivity);
      setActivities([...activities, { ...newActivity, calories, id: Date.now() }]);
      setNewActivity({ type: '', duration: '', intensity: 'moderate' });
    }
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const totalCalories = activities.reduce((sum, activity) => sum + activity.calories, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Activity Tracker</h1>
          </div>

          {/* Activity Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Select Activity</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(activityMeta).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setNewActivity({ ...newActivity, type: key })}
                  className={`p-4 rounded-lg transition-all bg-gradient-to-r ${
                    newActivity.type === key 
                      ? `${meta.activeGradient} ring-2 ring-blue-500` 
                      : `${meta.gradient} ${meta.hoverGradient}`
                  } flex items-center gap-3 hover:shadow-md`}
                >
                  <span className="text-2xl">{meta.icon}</span>
                  <span className="font-medium text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Duration and Intensity */}
          <div className="grid grid-cols-1  gap-4 mb-6">
            <div className="relative">
              <input
                type="number"
                placeholder="Duration (minutes)"
                className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 outline-none transition-colors pl-10 bg-white/50"
                value={newActivity.duration}
                onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
              />
              <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="flex gap-2">
              {['light', 'moderate', 'vigorous'].map((intensity) => (
                <button
                  key={intensity}
                  onClick={() => setNewActivity({ ...newActivity, intensity })}
                  className={`flex-1 p-3 rounded-lg transition-all bg-gradient-to-r ${
                    intensityGradients[intensity]
                  } ${
                    newActivity.intensity === intensity 
                      ? 'ring-2 ring-blue-500 shadow-md' 
                      : 'hover:shadow-md'
                  } text-white font-medium`}
                >
                  {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                </button>
              ))}
            </div>

            <button
              onClick={handleAddActivity}
              disabled={!newActivity.type || !newActivity.duration}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                (!newActivity.type || !newActivity.duration) 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
              } text-white shadow-md hover:shadow-lg`}
            >
              <Plus className="w-5 h-5" /> Add Activity
            </button>
          </div>

          {/* Activities List */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Today's Activities</h2>
            </div>

            {activities.length === 0 ? (
              <div className="text-center py-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <Zap className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No activities logged yet. Start your fitness journey!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className={`p-4 rounded-lg transition-all hover:shadow-md bg-gradient-to-r ${activityMeta[activity.type]?.gradient}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{activityMeta[activity.type]?.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {activity.duration} minutes
                            <span className={`px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${intensityGradients[activity.intensity]}`}>
                              {activity.intensity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Flame className="w-5 h-5 text-orange-500" />
                          <span className="font-bold text-orange-500">{activity.calories}</span>
                          <span className="text-gray-600">cal</span>
                        </div>
                        <button
                          onClick={() => handleDeleteActivity(activity.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Total Calories */}
                <div className="mt-6 p-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-lg text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="w-6 h-6" />
                      <span className="font-semibold">Total Calories Burned</span>
                    </div>
                    <span className="text-2xl font-bold">{totalCalories}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalActivityTracker;