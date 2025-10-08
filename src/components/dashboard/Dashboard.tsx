import React from 'react';
import { LogOut, User } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { EnvironmentalAdvisor } from './EnvironmentalAdvisor';
import { ActivityTracker } from './ActivityTracker';
import { MealPlan } from './MealPlan';
import { YogaSession } from './YogaSession';
import { HealthMetrics } from './HealthMetrics';
import { SymptomAdvisor } from './SymptomAdvisor';
import { AyurvedicRemedies } from './AyurvedicRemedies';
import { MedicationTracker } from './MedicationTracker';

export const Dashboard: React.FC = () => {
  const { userProfile } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IH</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">IntelliHealth Assistant</h1>
                <p className="text-xs text-gray-600">Multi-Agent AI Health Companion</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User size={16} />
                <span>Welcome, {userProfile?.name}</span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
              >
                <LogOut size={16} className="mr-1" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Health Hub</h2>
          <p className="text-gray-600">
            Personalized health insights powered by AI • Real-time adaptation across all modules
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Environmental Advisor - Full width on mobile, spans 2 columns on xl */}
          <div className="xl:col-span-2">
            <EnvironmentalAdvisor />
          </div>
          
          {/* Activity Tracker */}
          <div className="xl:col-span-1">
            <ActivityTracker />
          </div>
          
          {/* Meal Plan - Full width on mobile, spans 2 columns on lg+ */}
          <div className="lg:col-span-2 xl:col-span-2">
            <MealPlan />
          </div>
          
          {/* Yoga Session */}
          <div className="xl:col-span-1">
            <YogaSession />
          </div>
          
          {/* Health Metrics */}
          <div className="lg:col-span-1">
            <HealthMetrics />
          </div>
          
          {/* Symptom Advisor */}
          <div className="lg:col-span-1">
            <SymptomAdvisor />
          </div>
          
          {/* Ayurvedic Remedies */}
          <div className="lg:col-span-1">
            <AyurvedicRemedies />
          </div>
          
          {/* Medication Tracker - Full width on mobile */}
          <div className="lg:col-span-2 xl:col-span-2">
            <MedicationTracker />
          </div>
        </div>

        {/* AI Integration Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">🤖 Multi-Agent AI Active</h3>
            <p className="text-sm text-purple-700">
              All modules are interconnected and adapt in real-time based on your activities, health metrics, and symptoms.
              Changes in one area automatically optimize your entire health plan.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};