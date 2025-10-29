import { DietPlan } from '../types';

export const dietPlans: Record<'vata' | 'pitta' | 'kapha', DietPlan> = {
  vata: {
    dosha: 'vata',
    breakfast: [
      'Warm oatmeal with ghee and nuts',
      'Cooked fruits like stewed apples',
      'Warm milk with cardamom',
      'Whole grain toast with almond butter',
      'Herbal tea (ginger, cinnamon)'
    ],
    lunch: [
      'Warm, cooked vegetables with rice',
      'Lentil soup (dal) with ghee',
      'Steamed vegetables with quinoa',
      'Warm salads with olive oil dressing',
      'Cooked grains like barley or wheat'
    ],
    dinner: [
      'Light, warm soups',
      'Steamed vegetables with herbs',
      'Small portion of cooked grains',
      'Herbal tea before bed',
      'Avoid raw or cold foods'
    ],
    snacks: [
      'Warm nuts (almonds, walnuts)',
      'Dates and figs',
      'Warm herbal teas',
      'Cooked sweet fruits',
      'Warm milk with spices'
    ],
    beverages: [
      'Warm water throughout the day',
      'Herbal teas (ginger, licorice)',
      'Warm milk with turmeric',
      'Fresh fruit juices (room temperature)',
      'Avoid cold or iced drinks'
    ],
    avoid: [
      'Cold foods and drinks',
      'Raw vegetables in excess',
      'Dry, light foods',
      'Caffeine and alcohol',
      'Processed and frozen foods'
    ],
    spices: [
      'Ginger, cumin, coriander',
      'Cardamom, cinnamon, cloves',
      'Turmeric, black pepper',
      'Fennel, asafoetida',
      'Rock salt, mustard seeds'
    ]
  },
  pitta: {
    dosha: 'pitta',
    breakfast: [
      'Cool, sweet fruits like melons',
      'Coconut water and fresh juices',
      'Oatmeal with cooling spices',
      'Fresh fruit smoothies',
      'Herbal teas (mint, rose)'
    ],
    lunch: [
      'Fresh salads with cucumber',
      'Steamed vegetables with basmati rice',
      'Cooling soups and broths',
      'Fresh herbs like cilantro and mint',
      'Moderate portions of grains'
    ],
    dinner: [
      'Light, cooling meals',
      'Steamed vegetables',
      'Small portions of sweet grains',
      'Cooling herbal teas',
      'Avoid spicy or hot foods'
    ],
    snacks: [
      'Fresh, sweet fruits',
      'Coconut water',
      'Cool herbal teas',
      'Fresh vegetable juices',
      'Dates and sweet dried fruits'
    ],
    beverages: [
      'Cool (not ice-cold) water',
      'Coconut water',
      'Fresh fruit juices',
      'Herbal teas (mint, fennel)',
      'Avoid alcohol and caffeine'
    ],
    avoid: [
      'Spicy, hot, and sour foods',
      'Excessive salt and oil',
      'Alcohol and caffeine',
      'Fermented foods',
      'Red meat and processed foods'
    ],
    spices: [
      'Coriander, fennel, cardamom',
      'Mint, dill, turmeric',
      'Cumin (in moderation)',
      'Fresh herbs like cilantro',
      'Avoid hot spices like chili'
    ]
  },
  kapha: {
    dosha: 'kapha',
    breakfast: [
      'Light, warm foods',
      'Spiced herbal teas',
      'Small portions of cooked grains',
      'Warm water with lemon and honey',
      'Light fruits like apples and pears'
    ],
    lunch: [
      'Warm, spiced vegetables',
      'Light grains like quinoa',
      'Legumes and lentils',
      'Plenty of warming spices',
      'Moderate portions'
    ],
    dinner: [
      'Light, early dinner',
      'Warm soups and broths',
      'Steamed vegetables',
      'Herbal teas with warming spices',
      'Avoid heavy, oily foods'
    ],
    snacks: [
      'Warm herbal teas',
      'Light, spiced nuts',
      'Fresh ginger tea',
      'Avoid sweet and heavy snacks',
      'Warm water with spices'
    ],
    beverages: [
      'Warm water throughout the day',
      'Spiced herbal teas (ginger, cinnamon)',
      'Warm water with lemon',
      'Avoid cold drinks and dairy',
      'Green tea in moderation'
    ],
    avoid: [
      'Heavy, oily, and sweet foods',
      'Dairy products',
      'Cold foods and drinks',
      'Excessive salt',
      'Processed and fried foods'
    ],
    spices: [
      'Ginger, black pepper, cayenne',
      'Turmeric, cumin, coriander',
      'Cinnamon, cloves, cardamom',
      'Mustard seeds, fenugreek',
      'All warming spices'
    ]
  }
};