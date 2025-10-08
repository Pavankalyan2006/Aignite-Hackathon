import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HealthProvider } from './context/HealthContext';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/dashboard/Dashboard';

const AppContent: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">IH</span>
          </div>
          <p className="text-gray-600">Loading IntelliHealth...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthPage />;
  }

  return (
    <HealthProvider>
      <Dashboard />
    </HealthProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;