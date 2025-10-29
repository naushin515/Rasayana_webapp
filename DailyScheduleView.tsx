import React from 'react';
import { DailySchedule } from '../types';
import { dailySchedules } from '../data/dailySchedules';
import { Sun, Sunrise, Sunset, Moon, Activity, Brain } from 'lucide-react';

interface DailyScheduleViewProps {
  dosha: 'vata' | 'pitta' | 'kapha';
}

export const DailyScheduleView: React.FC<DailyScheduleViewProps> = ({ dosha }) => {
  const schedule = dailySchedules[dosha];

  const timeSlots = [
    { 
      title: 'Wake Up Time', 
      time: schedule.wakeUp, 
      activities: [], 
      icon: Sunrise, 
      color: 'text-yellow-600 bg-yellow-50' 
    },
    { 
      title: 'Morning Routine', 
      time: '6:00 - 10:00 AM', 
      activities: schedule.morning, 
      icon: Sun, 
      color: 'text-orange-600 bg-orange-50' 
    },
    { 
      title: 'Afternoon Activities', 
      time: '10:00 AM - 6:00 PM', 
      activities: schedule.afternoon, 
      icon: Sun, 
      color: 'text-blue-600 bg-blue-50' 
    },
    { 
      title: 'Evening Routine', 
      time: '6:00 - 9:00 PM', 
      activities: schedule.evening, 
      icon: Sunset, 
      color: 'text-purple-600 bg-purple-50' 
    },
    { 
      title: 'Bedtime', 
      time: schedule.bedtime, 
      activities: [], 
      icon: Moon, 
      color: 'text-indigo-600 bg-indigo-50' 
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Daily Schedule for {dosha.charAt(0).toUpperCase() + dosha.slice(1)} Dosha
        </h2>
        <p className="text-gray-600 text-lg">
          Follow this personalized daily routine to maintain balance and optimal health
        </p>
      </div>

      {/* Time-based Schedule */}
      <div className="space-y-6">
        {timeSlots.map((slot, index) => (
          <div key={index} className={`rounded-2xl p-6 ${slot.color.split(' ')[1]} border border-gray-200`}>
            <div className="flex items-center space-x-3 mb-4">
              <slot.icon className={`w-6 h-6 ${slot.color.split(' ')[0]}`} />
              <h3 className="text-xl font-semibold text-gray-900">{slot.title}</h3>
              <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
                {slot.time}
              </span>
            </div>
            
            {slot.activities.length > 0 && (
              <ul className="space-y-2">
                {slot.activities.map((activity, activityIndex) => (
                  <li key={activityIndex} className="flex items-start space-x-2">
                    <div className={`w-2 h-2 rounded-full mt-2 ${slot.color.split(' ')[0].replace('text-', 'bg-')}`} />
                    <span className="text-gray-700">{activity}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Exercise and Meditation Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Recommended Exercise</h3>
          </div>
          <ul className="space-y-2">
            {schedule.exercise.map((exercise, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full mt-2 bg-green-600" />
                <span className="text-gray-700">{exercise}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-900">Meditation & Mindfulness</h3>
          </div>
          <ul className="space-y-2">
            {schedule.meditation.map((meditation, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full mt-2 bg-purple-600" />
                <span className="text-gray-700">{meditation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-100 to-orange-100 
rounded-2xl shadow-md p-8 text-center text-gray-800
">
        <h3 className="text-xl font-bold mb-3">🌟 Schedule Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="mb-2">• Consistency is key - try to maintain regular timings</p>
            <p className="mb-2">• Adjust activities based on seasons and your energy levels</p>
          </div>
          <div>
            <p className="mb-2">• Listen to your body and modify as needed</p>
            <p className="mb-2">• Gradually implement changes for lasting results</p>
          </div>
        </div>
      </div>
    </div>
  );
};