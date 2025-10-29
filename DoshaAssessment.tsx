import React, { useState } from 'react';
import { doshaQuestions } from '../data/questions';
import { DoshaResult } from '../types';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface DoshaAssessmentProps {
  onComplete: (result: DoshaResult) => void;
}

export const DoshaAssessment: React.FC<DoshaAssessmentProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const goToNext = () => {
    if (currentQuestion < doshaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    
    Object.entries(answers).forEach(([questionId, optionIndex]) => {
      const question = doshaQuestions.find(q => q.id === parseInt(questionId));
      if (question && question.options[optionIndex]) {
        const option = question.options[optionIndex];
        scores[option.dosha] += option.points;
      }
    });

    const total = scores.vata + scores.pitta + scores.kapha;
    const percentages = {
      vata: Math.round((scores.vata / total) * 100),
      pitta: Math.round((scores.pitta / total) * 100),
      kapha: Math.round((scores.kapha / total) * 100)
    };

    let dominant: 'vata' | 'pitta' | 'kapha' = 'vata';
    if (scores.pitta > scores.vata && scores.pitta > scores.kapha) {
      dominant = 'pitta';
    } else if (scores.kapha > scores.vata && scores.kapha > scores.pitta) {
      dominant = 'kapha';
    }

    const result: DoshaResult = {
      ...percentages,
      dominant
    };

    setIsComplete(true);
    onComplete(result);
  };

  const progress = ((currentQuestion + 1) / doshaQuestions.length) * 100;
  const question = doshaQuestions[currentQuestion];
  const isAnswered = answers[question.id] !== undefined;

  if (isComplete) {
    return (
      <div className="text-center p-8">
        <div className="w-24 h-24 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Assessment Complete!</h2>
        <p className="text-gray-600 text-lg">
          Your dosha analysis is ready. Let's discover your unique constitution.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion + 1} of {doshaQuestions.length}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-emerald-200 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {question.question}
        </h2>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(question.id, index)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                answers[question.id] === index
                  ? 'border-gray-200 bg-white text-gray-900'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  answers[question.id] === index
                    ? 'border-gray-200 bg-white text-gray-900'
                    : 'border-gray-300'
                }`}>
                  {answers[question.id] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-lg">{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={goToPrevious}
          disabled={currentQuestion === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <button
          onClick={goToNext}
          disabled={!isAnswered}
          className="flex items-center space-x-2 px-6 py-3 
bg-gradient-to-r from-blue-500 to-cyan-500 
text-white rounded-lg 
hover:from-blue-600 hover:to-cyan-600 
transition-all duration-200 
disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{currentQuestion === doshaQuestions.length - 1 ? 'Complete Assessment' : 'Next'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};