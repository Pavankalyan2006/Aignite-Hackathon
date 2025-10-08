import React, { useEffect } from 'react';
import { Footprints, Flame, Heart, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { useHealth } from '../../context/HealthContext';

export const ActivityTracker: React.FC = () => {
  const { activityData, updateActivityData } = useHealth();

  // Simulate live step counter
  useEffect(() => {
    const interval = setInterval(() => {
      updateActivityData({
        steps: activityData.steps + Math.floor(Math.random() * 3),
        calories: activityData.calories + Math.floor(Math.random() * 2),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activityData.steps, activityData.calories, updateActivityData]);

  const getStepGoalProgress = () => {
    const goal = 10000;
    return Math.min((activityData.steps / goal) * 100, 100);
  };

  const getActivityLevel = () => {
    if (activityData.steps < 2000) return { label: 'Low Activity', color: 'text-red-600' };
    if (activityData.steps < 6000) return { label: 'Moderate Activity', color: 'text-yellow-600' };
    if (activityData.steps < 10000) return { label: 'Active', color: 'text-green-600' };
    return { label: 'Very Active', color: 'text-emerald-600' };
  };

  const activityLevel = getActivityLevel();

  return (
    <Card title="Live Activity Tracking" subtitle="Connected to your smartwatch">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Footprints className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Steps Today</p>
            <p className="text-xl font-bold text-gray-800">{activityData.steps.toLocaleString()}</p>
            <p className={`text-xs font-medium ${activityLevel.color}`}>{activityLevel.label}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-red-100 rounded-lg">
            <Flame className="text-red-600" size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Calories Burned</p>
            <p className="text-xl font-bold text-gray-800">{activityData.calories}</p>
            <p className="text-xs text-gray-500">cal</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-pink-100 rounded-lg">
            <Heart className="text-pink-600" size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Heart Rate</p>
            <p className="text-xl font-bold text-gray-800">{activityData.heartRate}</p>
            <p className="text-xs text-gray-500">bpm</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <Clock className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Active Minutes</p>
            <p className="text-xl font-bold text-gray-800">{activityData.activeMinutes}</p>
            <p className="text-xs text-gray-500">min</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700">Daily Step Goal</p>
          <p className="text-sm text-gray-600">{activityData.steps}/10,000</p>
        </div>
        <div className="bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getStepGoalProgress()}%` }}
          ></div>
        </div>
      </div>
    </Card>
  );
};