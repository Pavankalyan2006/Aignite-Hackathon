import React, { useState, useEffect } from 'react';
import { Play, Pause, Heart, Flame, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useHealth } from '../../context/HealthContext';

export const YogaSession: React.FC = () => {
  const { isYogaActive, toggleYogaSession } = useHealth();
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionData, setSessionData] = useState({
    heartRate: 68,
    calories: 0,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isYogaActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        // Simulate increasing heart rate and calorie burn during yoga
        setSessionData(prev => ({
          heartRate: Math.min(85, prev.heartRate + Math.random() * 2),
          calories: prev.calories + 0.1,
        }));
      }, 1000);
    } else {
      setSessionTime(0);
      setSessionData({ heartRate: 68, calories: 0 });
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isYogaActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card title="Guided Yoga Session" subtitle="Mindful movement for wellness">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
          <div className={`text-4xl transition-all duration-300 ${isYogaActive ? 'animate-pulse' : ''}`}>
            🧘‍♀️
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {isYogaActive ? 'Session in Progress' : 'Ready to Start'}
        </h3>
        
        <div className="text-3xl font-bold text-gray-800 mb-4">
          {formatTime(sessionTime)}
        </div>

        <Button
          onClick={toggleYogaSession}
          variant={isYogaActive ? 'danger' : 'primary'}
          size="lg"
          className="mb-6"
        >
          {isYogaActive ? (
            <>
              <Pause size={20} className="mr-2" />
              End Session
            </>
          ) : (
            <>
              <Play size={20} className="mr-2" />
              Start Session
            </>
          )}
        </Button>
      </div>

      {isYogaActive && (
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="text-red-500" size={20} />
            </div>
            <p className="text-xs text-gray-500">Heart Rate</p>
            <p className="font-bold text-lg">{Math.round(sessionData.heartRate)}</p>
            <p className="text-xs text-gray-400">bpm</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="text-orange-500" size={20} />
            </div>
            <p className="text-xs text-gray-500">Calories</p>
            <p className="font-bold text-lg">{Math.round(sessionData.calories)}</p>
            <p className="text-xs text-gray-400">cal</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="text-blue-500" size={20} />
            </div>
            <p className="text-xs text-gray-500">Duration</p>
            <p className="font-bold text-lg">{Math.floor(sessionTime / 60)}</p>
            <p className="text-xs text-gray-400">min</p>
          </div>
        </div>
      )}

      {!isYogaActive && sessionTime > 0 && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-green-800 font-medium">
            Great session! Your meal plan has been updated for optimal recovery.
          </p>
        </div>
      )}
    </Card>
  );
};