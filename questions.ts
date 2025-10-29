import { Question } from '../types';

export const doshaQuestions: Question[] = [
  {
    id: 1,
    question: "What is your body frame?",
    options: [
      { text: "Thin, light build", dosha: "vata", points: 3 },
      { text: "Medium, athletic build", dosha: "pitta", points: 3 },
      { text: "Large, heavy build", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 2,
    question: "How is your skin texture?",
    options: [
      { text: "Dry, rough, thin", dosha: "vata", points: 3 },
      { text: "Warm, oily, sensitive", dosha: "pitta", points: 3 },
      { text: "Thick, oily, smooth", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 3,
    question: "What describes your hair best?",
    options: [
      { text: "Dry, brittle, curly", dosha: "vata", points: 3 },
      { text: "Fine, straight, early graying", dosha: "pitta", points: 3 },
      { text: "Thick, wavy, lustrous", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 4,
    question: "How is your craving?",
    options: [
      { text: "Variable, sometimes forget to eat", dosha: "vata", points: 3 },
      { text: "Strong, cannot skip meals", dosha: "pitta", points: 3 },
      { text: "Steady, can skip meals easily", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 5,
    question: "What is your sleep pattern?",
    options: [
      { text: "Light sleeper, difficulty falling asleep", dosha: "vata", points: 3 },
      { text: "Moderate sleep, wake up refreshed", dosha: "pitta", points: 3 },
      { text: "Deep sleeper ", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 6,
    question: "How do you handle stress?",
    options: [
      { text: "Become anxious and worried", dosha: "vata", points: 3 },
      { text: "Become irritated and angry", dosha: "pitta", points: 3 },
      { text: "Remain calm and withdrawn", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 7,
    question: "What is your energy level like?",
    options: [
      { text: "Gets sudden bursts of energy, then feels worn out.", dosha: "vata", points: 3 },
      { text: "High and consistent", dosha: "pitta", points: 3 },
      { text: "Steady but slow to start", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 8,
    question: "How do you prefer the weather?",
    options: [
      { text: "Warm and humid", dosha: "vata", points: 3 },
      { text: "Cool and well-ventilated", dosha: "pitta", points: 3 },
      { text: "Warm and dry", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 9,
    question: "What describes your memory?",
    options: [
      { text: "Quick to learn, quick to forget", dosha: "vata", points: 3 },
      { text: "Sharp and clear", dosha: "pitta", points: 3 },
      { text: "Slow to learn, never forget", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: 10,
    question: "How do you make decisions?",
    options: [
      { text: "Quickly but change mind often", dosha: "vata", points: 3 },
      { text: "Decisively after analysis", dosha: "pitta", points: 3 },
      { text: "Slowly after much consideration", dosha: "kapha", points: 3 }
    ]
  }
];