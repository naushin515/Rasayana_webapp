import React from 'react';
import { Heart, User, ClipboardList, LogOut, Apple, Calendar, MessageSquare } from 'lucide-react';

interface NavigationProps {
  currentView: 'profile' | 'assessment' | 'results' | 'diet' | 'schedule' | 'followup';
  onViewChange: (view: 'profile' | 'assessment' | 'results' | 'diet' | 'schedule' | 'followup') => void;
  onLogout: () => void;
  hasResults: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentView, 
  onViewChange, 
  onLogout, 
  hasResults 
}) => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="   w-10 h-10 bg-gradient-to-r from-lime-100 to-emerald-200 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AyurVeda</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onViewChange('profile')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentView === 'profile'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => onViewChange('assessment')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentView === 'assessment'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Dosha Assessment</span>
            </button>

            {hasResults && (
              <>
                <button
                  onClick={() => onViewChange('results')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    currentView === 'results'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>My Results</span>
                </button>

                <button
                  onClick={() => onViewChange('diet')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    currentView === 'diet'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <Apple className="w-4 h-4" />
                  <span>Diet Chart</span>
                </button>

                <button
                  onClick={() => onViewChange('schedule')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    currentView === 'schedule'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Daily Schedule</span>
                </button>

                <button
                  onClick={() => onViewChange('followup')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    currentView === 'followup'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Follow-up</span>
                </button>
              </>
            )}

            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};