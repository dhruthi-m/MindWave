import React, { useState } from 'react';
import { pq16Questions } from './pq16Questions';
import SchizophreniaDashboard from './SchizophreniaDashboard';

/**
 * SchizophreniaScreeningTest Component
 * 
 * Implements the PQ-16 (Prodromal Questionnaire, 16-item version).
 * Designed for React + Tailwind CSS environments.
 * 
 * @param {Function} onBackToMenu Callback triggered when clicking "Back to Screening Menu"
 */
export default function SchizophreniaScreeningTest({ onBackToMenu }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(
    pq16Questions.map((q) => ({
      id: q.id,
      symptom: null, // null, true, or false
      distress: null, // null, 0, 1, 2, 3, 4, or 5
    }))
  );
  const [testStage, setTestStage] = useState('quiz'); // 'quiz' | 'results'

  // Current question data and response state
  const currentQuestion = pq16Questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / pq16Questions.length) * 100);

  // Validation rules for current step
  const isSymptomAnswered = currentAnswer.symptom !== null;
  const isDistressRequired = currentAnswer.symptom === true;
  const isDistressAnswered = currentAnswer.distress !== null;
  const isNextDisabled = !isSymptomAnswered || (isDistressRequired && !isDistressAnswered);

  // Handle True/False selections
  const handleSymptomSelect = (value) => {
    const updated = [...answers];
    updated[currentIndex] = {
      ...updated[currentIndex],
      symptom: value,
      // If False, automatically assign 0 distress. If True, clear previous distress for fresh selection.
      distress: value === false ? 0 : null,
    };
    setAnswers(updated);
  };

  // Handle distress option selections
  const handleDistressSelect = (score) => {
    const updated = [...answers];
    updated[currentIndex] = {
      ...updated[currentIndex],
      distress: score,
    };
    setAnswers(updated);
  };

  // Handle next/submit navigation
  const handleNext = () => {
    if (currentIndex < pq16Questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setTestStage('results');
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Restart the test
  const handleRetake = () => {
    setCurrentIndex(0);
    setAnswers(
      pq16Questions.map((q) => ({
        id: q.id,
        symptom: null,
        distress: null,
      }))
    );
    setTestStage('quiz');
  };

  // Calculations for results stage
  const symptomCount = answers.filter((ans) => ans.symptom === true).length;
  const totalDistress = answers.reduce((sum, ans) => {
    if (ans.symptom === true && ans.distress !== null) {
      return sum + ans.distress;
    }
    return sum;
  }, 0);

  const isElevated = symptomCount >= 6;

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-8">
      {testStage === 'quiz' ? (
        <div className="w-full max-w-3xl rounded-3xl p-6 sm:p-12 border border-white/5 bg-slate-900/65 backdrop-blur-xl shadow-2xl flex flex-col gap-8 transition-all duration-300">
          
          {/* Header & Progress Indicator */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-violet-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
                Schizophrenia Screening (PQ-16)
              </span>
              <span className="text-slate-400">
                Question {currentIndex + 1} of {pq16Questions.length}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="flex flex-col gap-8 min-h-[220px] justify-center">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 leading-relaxed font-sans">
              {currentQuestion.text}
            </h2>

            {/* True/False Toggles */}
            <div className="flex gap-4 w-full">
              <button
                type="button"
                onClick={() => handleSymptomSelect(true)}
                className={`flex-1 font-semibold text-lg py-4 rounded-xl border transition-all duration-300 ${
                  currentAnswer.symptom === true
                    ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)] translate-y-[-2px]'
                    : 'bg-white/2 border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                True
              </button>
              <button
                type="button"
                onClick={() => handleSymptomSelect(false)}
                className={`flex-1 font-semibold text-lg py-4 rounded-xl border transition-all duration-300 ${
                  currentAnswer.symptom === false
                    ? 'bg-violet-500/10 border-violet-400 text-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.15)] translate-y-[-2px]'
                    : 'bg-white/2 border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                False
              </button>
            </div>

            {/* Distress Follow-up */}
            <div 
              className={`flex flex-col gap-4 transition-all duration-500 ease-in-out overflow-hidden ${
                currentAnswer.symptom === true 
                  ? 'opacity-100 max-h-[200px] visible pt-4' 
                  : 'opacity-0 max-h-0 invisible'
              }`}
            >
              <h3 className="text-slate-400 text-sm font-medium text-left">
                To what extent do you feel that?
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 w-full">
                {[
                  { label: 'None', score: 0 },
                  { label: 'Very Mild', score: 1 },
                  { label: 'Mild', score: 2 },
                  { label: 'Moderate', score: 3 },
                  { label: 'Severe', score: 4 },
                  { label: 'Extreme', score: 5 }
                ].map((opt) => (
                  <button
                    key={opt.score}
                    type="button"
                    onClick={() => handleDistressSelect(opt.score)}
                    className={`flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl border font-sans transition-all duration-300 ${
                      currentAnswer.distress === opt.score
                        ? 'bg-cyan-500/15 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] translate-y-[-2px]'
                        : 'bg-white/2 border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-lg font-bold">{opt.score}</span>
                    <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center border-t border-white/5 pt-6 w-full">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 font-semibold text-slate-300 hover:text-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
            >
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-[-4px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={isNextDisabled}
              className="flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-6 py-3 rounded-full disabled:opacity-40 disabled:pointer-events-none hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:translate-y-[-2px] transition-all duration-300"
            >
              <span>{currentIndex === pq16Questions.length - 1 ? 'Submit Test' : 'Next'}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <SchizophreniaDashboard 
          symptomsCount={symptomCount}
          severityScore={totalDistress}
          answers={answers}
          onRetake={handleRetake}
          onHome={onBackToMenu}
          patientName={localStorage.getItem('mindwave_user') || 'Dhruthi M'}
        />
      )}
    </div>
  );
}
