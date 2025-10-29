import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/LoginForm';
import { Navigation } from './components/Navigation';
import { Profile } from './components/Profile';
import { DoshaAssessment } from './components/DoshaAssessment';
import { DoshaResults } from './components/DoshaResults';
import { DietChart } from './components/DietChart';
import { DailyScheduleView } from './components/DailyScheduleView';
import { FollowUpForm } from './components/FollowUpForm';
import { AdminPanel } from './components/AdminPanel';
import { DoshaResult, FollowUp } from './types';

function App() {
  const { user, login, register, logout, updateProfile, isLoading, error, clearError } = useAuth();
  const [currentView, setCurrentView] = useState<'profile' | 'assessment' | 'results' | 'diet' | 'schedule' | 'followup'>('profile');
  const [doshaResult, setDoshaResult] = useState<DoshaResult | null>(null);

  // Load stored dosha result
  useEffect(() => {
    if (user) {
      const storedResult = localStorage.getItem(`dosha_result_${user.id}`);
      if (storedResult) {
        setDoshaResult(JSON.parse(storedResult));
      }
    }
  }, [user]);

  const handleAssessmentComplete = (result: DoshaResult) => {
    setDoshaResult(result);
    if (user) {
      localStorage.setItem(`dosha_result_${user.id}`, JSON.stringify(result));
    }
    setCurrentView('results');
  };

  const handleResetAssessment = () => {
    setDoshaResult(null);
    if (user) {
      localStorage.removeItem(`dosha_result_${user.id}`);
    }
    setCurrentView('assessment');
  };

  const handleLogout = () => {
    setDoshaResult(null);
    setCurrentView('profile');
    logout();
  };

  const handleFollowUpSubmit = (followUp: Omit<FollowUp, 'id'>) => {
    const newFollowUp: FollowUp = {
      ...followUp,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    const existingFollowUps = JSON.parse(localStorage.getItem('ayurveda_followups') || '[]');
    existingFollowUps.push(newFollowUp);
    localStorage.setItem('ayurveda_followups', JSON.stringify(existingFollowUps));
    
    alert('Follow-up submitted successfully!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is admin
  if (user && 'role' in user && user.role === 'admin') {
    return <AdminPanel onLogout={handleLogout} />;
  }

  if (!user) {
    return (
      <LoginForm 
        onLogin={login} 
        onRegister={register}
        error={error}
        onClearError={clearError}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-orange-50 to-yellow-50">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
        hasResults={!!doshaResult}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'profile' && (
          <Profile user={user} onUpdate={updateProfile} />
        )}
        
        {currentView === 'assessment' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Discover Your Dosha
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Answer these questions to understand your unique Ayurvedic constitution. 
                Be honest and choose the option that best describes you most of the time.
              </p>
            </div>
            <DoshaAssessment onComplete={handleAssessmentComplete} />
          </div>
        )}
        
        {currentView === 'results' && doshaResult && (
          <DoshaResults result={doshaResult} onReset={handleResetAssessment} />
        )}
        
        {currentView === 'diet' && doshaResult && (
          <DietChart dosha={doshaResult.dominant} />
        )}
        
        {currentView === 'schedule' && doshaResult && (
          <DailyScheduleView dosha={doshaResult.dominant} />
        )}
        
        {currentView === 'followup' && user && (
          <FollowUpForm userId={user.id} onSubmit={handleFollowUpSubmit} />
        )}
      </main>
    </div>
  );
}

export default App;