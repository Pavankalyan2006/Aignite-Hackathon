import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface RegisterFormProps {
  onToggleMode: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleMode }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    location: '',
    familyHistory: '',
    healthStatus: '',
    wellnessGoals: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }
    setError('');
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save user profile to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        age: parseInt(formData.age),
        location: formData.location,
        familyHistory: formData.familyHistory,
        healthStatus: formData.healthStatus,
        wellnessGoals: formData.wellnessGoals,
        createdAt: new Date(),
      });

    } catch (error: any) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Join IntelliHealth</h2>
        <p className="text-gray-600">Step {step} of 3 - Create your health profile</p>
        
        {/* Progress bar */}
        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNextStep(); }}>
        {step === 1 && (
          <>
            <Input
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
            <Input
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
            <Input
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              required
            />
          </>
        )}

        {step === 2 && (
          <>
            <Input
              type="text"
              label="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
            <Input
              type="number"
              label="Age"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              required
            />
            <Input
              type="text"
              label="Location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g., Hyderabad, Telangana"
              required
            />
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Family Medical History
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows={3}
                value={formData.familyHistory}
                onChange={(e) => handleInputChange('familyHistory', e.target.value)}
                placeholder="Any known family medical conditions..."
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Health Status
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows={3}
                value={formData.healthStatus}
                onChange={(e) => handleInputChange('healthStatus', e.target.value)}
                placeholder="Describe your current health status, known conditions..."
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wellness Goals
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows={3}
                value={formData.wellnessGoals}
                onChange={(e) => handleInputChange('wellnessGoals', e.target.value)}
                placeholder="What are your health and wellness goals?"
                required
              />
            </div>
          </>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              className="flex-1"
            >
              Previous
            </Button>
          )}
          
          <Button
            type="submit"
            className="flex-1"
            disabled={loading}
          >
            {step === 3 ? (loading ? 'Creating Account...' : 'Create Account') : 'Next'}
          </Button>
        </div>
      </form>

      {step === 1 && (
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onToggleMode}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      )}
    </div>
  );
};