import React, { useState } from 'react';
import { FollowUp } from '../types';
import { Calendar, TrendingUp, Heart, MessageSquare, Save } from 'lucide-react';

interface FollowUpFormProps {
  userId: string;
  onSubmit: (followUp: Omit<FollowUp, 'id'>) => void;
}

export const FollowUpForm: React.FC<FollowUpFormProps> = ({ userId, onSubmit }) => {
  const [formData, setFormData] = useState({
    symptoms: [] as string[],
    improvements: [] as string[],
    concerns: [] as string[],
    energyLevel: 5,
    sleepQuality: 5,
    digestiveHealth: 5,
    notes: ''
  });

  const [newSymptom, setNewSymptom] = useState('');
  const [newImprovement, setNewImprovement] = useState('');
  const [newConcern, setNewConcern] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      userId,
      date: new Date().toISOString(),
      ...formData
    });
    
    // Reset form
    setFormData({
      symptoms: [],
      improvements: [],
      concerns: [],
      energyLevel: 5,
      sleepQuality: 5,
      digestiveHealth: 5,
      notes: ''
    });
  };

  const addItem = (type: 'symptoms' | 'improvements' | 'concerns', value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      setter('');
    }
  };

  const removeItem = (type: 'symptoms' | 'improvements' | 'concerns', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSliderChange = (field: 'energyLevel' | 'sleepQuality' | 'digestiveHealth', value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Weekly Follow-Up</h2>
        <p className="text-gray-600">Track your progress and share your experience</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Symptoms Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Symptoms</h3>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newSymptom}
              onChange={(e) => setNewSymptom(e.target.value)}
              placeholder="Add a symptom..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => addItem('symptoms', newSymptom, setNewSymptom)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.symptoms.map((symptom, index) => (
              <span
                key={index}
                className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
              >
                <span>{symptom}</span>
                <button
                  type="button"
                  onClick={() => removeItem('symptoms', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Improvements Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Improvements Noticed</h3>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newImprovement}
              onChange={(e) => setNewImprovement(e.target.value)}
              placeholder="Add an improvement..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => addItem('improvements', newImprovement, setNewImprovement)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.improvements.map((improvement, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
              >
                <span>{improvement}</span>
                <button
                  type="button"
                  onClick={() => removeItem('improvements', index)}
                  className="text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Concerns Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Concerns or Questions</h3>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newConcern}
              onChange={(e) => setNewConcern(e.target.value)}
              placeholder="Add a concern..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => addItem('concerns', newConcern, setNewConcern)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.concerns.map((concern, index) => (
              <span
                key={index}
                className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
              >
                <span>{concern}</span>
                <button
                  type="button"
                  onClick={() => removeItem('concerns', index)}
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Rating Scales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Energy Level: {formData.energyLevel}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.energyLevel}
              onChange={(e) => handleSliderChange('energyLevel', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sleep Quality: {formData.sleepQuality}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.sleepQuality}
              onChange={(e) => handleSliderChange('sleepQuality', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Digestive Health: {formData.digestiveHealth}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.digestiveHealth}
              onChange={(e) => handleSliderChange('digestiveHealth', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Share any additional thoughts, experiences, or questions..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-100 to-orange-100 
rounded-2xl shadow-md p-8 text-center text-gray-800
 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Submit Follow-Up</span>
        </button>
      </form>
    </div>
  );
};