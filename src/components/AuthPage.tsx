import React, { useState } from 'react';
import { LoginForm } from './auth/LoginForm';
import { RegisterForm } from './auth/RegisterForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4">
            <span className="text-white font-bold text-xl">IH</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">IntelliHealth Assistant</h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Your Multi-Agent AI Health Companion for holistic wellness management
          </p>
        </div>

        {/* Auth Form */}
        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggleMode={() => setIsLogin(true)} />
        )}

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              🌡️
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Environmental AI</h3>
            <p className="text-xs text-gray-600 mt-1">Weather-based recommendations</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              🏃‍♂️
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Activity Tracking</h3>
            <p className="text-xs text-gray-600 mt-1">Real-time plan adjustments</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              🍽️
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Smart Meal Plans</h3>
            <p className="text-xs text-gray-600 mt-1">AI-optimized nutrition</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              💊
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Health Monitoring</h3>
            <p className="text-xs text-gray-600 mt-1">Chronic condition management</p>
          </div>
        </div>
      </div>
    </div>
  );
};