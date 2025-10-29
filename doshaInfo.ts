import { DoshaInfo } from '../types';

export const doshaInformation: Record<'vata' | 'pitta' | 'kapha', DoshaInfo> = {
  vata: {
    name: "Vata Dosha",
    description: "Vata is the energy of movement, composed of air and space elements. People with dominant Vata are creative, energetic, and flexible.",
    characteristics: [
      "Quick thinking and creative",
      "Enthusiastic and energetic", 
      "Flexible and adaptable",
      "Light sleeper",
      "Variable appetite",
      "Dry skin and hair"
    ],
    recommendations: [
      "Maintain regular routines",
      "Stay warm and avoid cold weather",
      "Eat warm, cooked foods",
      "Practice calming activities like yoga",
      "Get adequate rest and sleep",
      "Use oil massages for skin"
    ],
    color: "#8B4513",
   
  },
  pitta: {
    name: "Pitta Dosha",
    description: "Pitta is the energy of transformation, composed of fire and water elements. People with dominant Pitta are intelligent, ambitious, and focused.",
    characteristics: [
      "Sharp intellect and focused",
      "Natural leaders",
      "Strong digestive fire",
      "Warm body temperature",
      "Medium build and strength",
      "Competitive nature"
    ],
    recommendations: [
      "Stay cool and avoid excessive heat",
      "Eat cooling foods and avoid spicy meals",
      "Practice moderation in activities",
      "Engage in calming exercises",
      "Avoid skipping meals",
      "Practice patience and tolerance"
    ],
    color: "#DC2626",
    
  },
  kapha: {
    name: "Kapha Dosha",
    description: "Kapha is the energy of structure, composed of earth and water elements. People with dominant Kapha are calm, stable, and nurturing.",
    characteristics: [
      "Calm and peaceful nature",
      "Strong immunity",
      "Steady energy levels",
      "Thick hair and smooth skin",
      "Good long-term memory",
      "Loyal and patient"
    ],
    recommendations: [
      "Stay active and exercise regularly",
      "Eat light and warm foods",
      "Avoid excessive sleep",
      "Engage in stimulating activities",
      "Practice deep breathing",
      "Avoid cold and damp environments"
    ],
    color: "#059669",
   
  }
};