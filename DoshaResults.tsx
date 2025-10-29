import React from 'react';
import { DoshaResult } from '../types';
import { doshaInformation } from '../data/doshaInfo';
import { Trophy, Lightbulb, Heart, ArrowRight } from 'lucide-react';

interface DoshaResultsProps {
  result: DoshaResult;
  onReset: () => void;
}

export const DoshaResults: React.FC<DoshaResultsProps> = ({ result, onReset }) => {
  const dominantDosha = doshaInformation[result.dominant];
  
  const allDoshas = [
    { type: 'vata' as const, percentage: result.vata },
    { type: 'pitta' as const, percentage: result.pitta },
    { type: 'kapha' as const, percentage: result.kapha }
  ].sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-2xl shadow-xl p-8">
        <div style={{ backgroundColor: dominantDosha.color }} className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Dominant Dosha: {dominantDosha.name}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {dominantDosha.description}
        </p>
      </div>

      {/* Dosha Breakdown */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Heart className="w-6 h-6 mr-2 text-red-500" />
          Your Dosha Composition
        </h2>
        
        <div className="space-y-6">
          {allDoshas.map(({ type, percentage }) => {
            const info = doshaInformation[type];
            return (
              <div key={type} className="relative">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{info.icon}</span>
                    <span className="font-semibold text-lg text-gray-900">{info.name}</span>
                  </div>
                  <span className="font-bold text-lg" style={{ color: info.color }}>
                    {percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: info.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Characteristics */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="text-2xl mr-2">{dominantDosha.icon}</span>
            Key Characteristics
          </h3>
          <ul className="space-y-3">
            {dominantDosha.characteristics.map((characteristic, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: dominantDosha.color }}
                />
                <span className="text-gray-700">{characteristic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
            Recommendations
          </h3>
          <ul className="space-y-3">
            {dominantDosha.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-3">
                <ArrowRight className="w-4 h-4 mt-1 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-100 to-orange-100 
rounded-2xl shadow-md p-8 text-center text-gray-800">
        <h3 className="text-2xl font-bold mb-4">Ready to Start Your Ayurvedic Journey?</h3>
        <p className="text-lg mb-6 opacity-90">
          Understanding your dosha is the first step towards optimal health and well-being.
        </p>
        <button
          onClick={onReset}
          className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
        >
          Take Assessment Again
        </button>
      </div>
    </div>
  );
};