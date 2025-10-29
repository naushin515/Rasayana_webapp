import { DailySchedule } from '../types';

export const dailySchedules: Record<'vata' | 'pitta' | 'kapha', DailySchedule> = {
  vata: {
    dosha: 'vata',
    wakeUp: '6:00 - 7:00 AM',
    morning: [
      'Gentle stretching or yoga (15-20 minutes)',
      'Warm oil massage (Abhyanga)',
      'Meditation or breathing exercises (10-15 minutes)',
      'Warm shower',
      'Nutritious breakfast with warm foods'
    ],
    afternoon: [
      'Light lunch between 12:00 - 1:00 PM',
      'Short walk after meals',
      'Avoid overexertion',
      'Stay warm and comfortable',
      'Regular work breaks every 2 hours'
    ],
    evening: [
      'Light dinner before 7:00 PM',
      'Gentle evening walk',
      'Relaxing activities (reading, music)',
      'Warm bath with essential oils',
      'Early bedtime routine'
    ],
    bedtime: '9:30 - 10:30 PM',
    exercise: [
      'Gentle yoga and stretching',
      'Walking and light jogging',
      'Swimming in warm water',
      'Tai Chi or Qigong',
      'Avoid intense or competitive sports'
    ],
    meditation: [
      'Morning meditation (10-20 minutes)',
      'Deep breathing exercises',
      'Mindfulness practices',
      'Calming music or mantras',
      'Evening relaxation techniques'
    ]
  },
  pitta: {
    dosha: 'pitta',
    wakeUp: '5:30 - 6:30 AM',
    morning: [
      'Cool morning air and gentle sunlight',
      'Moderate yoga practice',
      'Cool shower or bath',
      'Meditation in a cool, quiet place',
      'Nutritious breakfast with cooling foods'
    ],
    afternoon: [
      'Lunch between 12:00 - 1:00 PM',
      'Avoid midday sun exposure',
      'Take breaks in cool environments',
      'Stay hydrated with cool water',
      'Avoid intense work during peak heat'
    ],
    evening: [
      'Dinner before 7:30 PM',
      'Evening walk in cool air',
      'Relaxing, non-competitive activities',
      'Cool bath or shower',
      'Reading or gentle music'
    ],
    bedtime: '10:00 - 11:00 PM',
    exercise: [
      'Swimming and water sports',
      'Moderate yoga practice',
      'Walking or hiking in nature',
      'Cycling in cool weather',
      'Avoid hot yoga or intense workouts'
    ],
    meditation: [
      'Morning meditation (15-20 minutes)',
      'Cooling breath practices (Sheetali)',
      'Visualization of cool, peaceful scenes',
      'Moonlight meditation',
      'Avoid meditation in hot environments'
    ]
  },
  kapha: {
    dosha: 'kapha',
    wakeUp: '5:00 - 6:00 AM',
    morning: [
      'Vigorous exercise or yoga',
      'Dry brushing before shower',
      'Energizing breathing exercises',
      'Hot shower with invigorating oils',
      'Light breakfast with warming spices'
    ],
    afternoon: [
      'Light lunch between 11:00 AM - 12:00 PM',
      'Active work and movement',
      'Avoid afternoon naps',
      'Stay active and engaged',
      'Take stairs instead of elevators'
    ],
    evening: [
      'Early, light dinner before 6:00 PM',
      'Vigorous evening exercise',
      'Stimulating activities',
      'Hot bath with energizing oils',
      'Avoid heavy evening meals'
    ],
    bedtime: '10:00 - 11:00 PM',
    exercise: [
      'Vigorous cardio exercises',
      'Hot yoga or Bikram yoga',
      'Running and jogging',
      'Weight training',
      'High-intensity interval training'
    ],
    meditation: [
      'Energizing morning meditation',
      'Breath of fire (Kapalabhati)',
      'Active meditation practices',
      'Chanting and mantras',
      'Avoid meditation that increases lethargy'
    ]
  }
};