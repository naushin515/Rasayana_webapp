import React from 'react';
import { DietPlan } from '../types';
import { dietPlans } from '../data/dietPlans';
import { Apple, Coffee, Utensils, Cookie, Droplets, X, Zap } from 'lucide-react';

interface DietChartProps {
  dosha: 'vata' | 'pitta' | 'kapha';
}

export const DietChart: React.FC<DietChartProps> = ({ dosha }) => {
  const dietPlan = dietPlans[dosha];
  
  const sections = [
    { title: 'Breakfast', items: dietPlan.breakfast, icon: Coffee, color: 'text-orange-600' },
    { title: 'Lunch', items: dietPlan.lunch, icon: Utensils, color: 'text-green-600' },
    { title: 'Dinner', items: dietPlan.dinner, icon: Apple, color: 'text-blue-600' },
    { title: 'Snacks', items: dietPlan.snacks, icon: Cookie, color: 'text-purple-600' },
    { title: 'Beverages', items: dietPlan.beverages, icon: Droplets, color: 'text-cyan-600' },
    { title: 'Spices & Herbs', items: dietPlan.spices, icon: Zap, color: 'text-yellow-600' },
    { title: 'Foods to Avoid', items: dietPlan.avoid, icon: X, color: 'text-red-600' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Personalized Diet Chart for {dosha.charAt(0).toUpperCase() + dosha.slice(1)} Dosha
        </h2>
        <p className="text-gray-600 text-lg">
          Follow this customized nutrition plan to balance your dosha and optimize your health
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <section.icon className={`w-6 h-6 ${section.color}`} />
              <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
            </div>
            
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-2">
                  <div className={`w-2 h-2 rounded-full mt-2 ${section.color.replace('text-', 'bg-')}`} />
                  <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-emerald-100 to-orange-100 
rounded-2xl shadow-md p-8 text-center text-gray-800">
        <h3 className="text-xl font-bold mb-3">💡 Important Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="mb-2">• Eat your largest meal at lunch when digestion is strongest</p>
            <p className="mb-2">• Maintain regular meal times to support your body's natural rhythm</p>
          </div>
          <div>
            <p className="mb-2">• Chew food thoroughly and eat in a calm environment</p>
            <p className="mb-2">• Listen to your body and adjust portions based on hunger</p>
          </div>
        </div>
      </div>
    </div>
  );
};