import React, { useState } from 'react';
import { bipolarQuestions } from './bipolarQuestions';
import BipolarDashboard from './BipolarDashboard';

/**
 * BipolarScreeningTest Component
 * 
 * Implements the Bipolar Disorder Screening Questionnaire.
 * Styled using custom design system classes from style.css to match
 * the original quiz UI exactly.
 * 
 * @param {Function} onBackToMenu Callback triggered when clicking "Back to Screening Menu"
 */
export default function BipolarScreeningTest({ onBackToMenu }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(
    bipolarQuestions.map((q) => ({
      id: q.id,
      symptom: null, // null, true, or false
      distress: null, // null, 0, 1, 2, 3, 4, or 5
    }))
  );
  const [testStage, setTestStage] = useState('quiz'); // 'quiz' | 'results'

  // Current question data and response state
  const currentQuestion = bipolarQuestions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / bipolarQuestions.length) * 100);

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
    if (currentIndex < bipolarQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Save results to localStorage for Bipolar Dashboard integration
      const symptomCount = answers.filter((ans) => ans.symptom === true).length;
      const totalDistress = answers.reduce((sum, ans) => {
        if (ans.symptom === true && ans.distress !== null) {
          return sum + ans.distress;
        }
        return sum;
      }, 0);

      localStorage.setItem('mindwave_bipolar_taken', 'true');
      localStorage.setItem('mindwave_bipolar_symptomCount', symptomCount);
      localStorage.setItem('mindwave_bipolar_totalExtent', totalDistress);
      const options = { month: 'short', day: 'numeric' };
      localStorage.setItem('mindwave_bipolar_date', new Date().toLocaleDateString('en-US', options));

      setTestStage('results');
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Restart the test
  const handleRetake = () => {
    setCurrentIndex(0);
    setAnswers(
      bipolarQuestions.map((q) => ({
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

  return (
    <>
      {testStage === 'quiz' ? (
        <div className="screening-quiz-card glass">
          {/* Header Progress section */}
          <div className="quiz-header">
            <div className="quiz-progress-text">
              <span className="quiz-test-tag">Bipolar Disorder Screening</span>
              <span className="quiz-progress-counter">
                Question {currentIndex + 1} of {bipolarQuestions.length}
              </span>
            </div>
            <div className="quiz-progress-bar">
              <div 
                className="quiz-progress-fill" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Question Content */}
          <div className="quiz-question-container fade-in-up">
            <h2 className="quiz-question-text" id={`question-${currentQuestion.id}`}>
              {currentQuestion.text}
            </h2>

            {/* True/False Toggle Buttons */}
            <div 
              className="quiz-toggle-group" 
              role="radiogroup" 
              aria-labelledby={`question-${currentQuestion.id}`}
            >
              <button 
                type="button" 
                className={`quiz-toggle-btn btn-tf-true ${currentAnswer.symptom === true ? 'active' : ''}`}
                role="radio" 
                aria-checked={currentAnswer.symptom === true}
                id="opt-true"
                onClick={() => handleSymptomSelect(true)}
              >
                True
              </button>
              <button 
                type="button" 
                className={`quiz-toggle-btn btn-tf-false ${currentAnswer.symptom === false ? 'active' : ''}`}
                role="radio" 
                aria-checked={currentAnswer.symptom === false}
                id="opt-false"
                onClick={() => handleSymptomSelect(false)}
              >
                False
              </button>
            </div>

            {/* Distress Rating Follow-Up (Revealed dynamically) */}
            <div 
              className={`quiz-distress-section ${currentAnswer.symptom === true ? 'visible' : ''}`} 
              id="distress-container"
            >
              <h3 className="quiz-distress-title">To what extent do you feel that?</h3>
              <div className="quiz-distress-options" role="radiogroup" aria-label="Distress rating">
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
                    className={`distress-btn ${currentAnswer.distress === opt.score ? 'active' : ''}`}
                    data-score={opt.score}
                    role="radio"
                    aria-checked={currentAnswer.distress === opt.score}
                    onClick={() => handleDistressSelect(opt.score)}
                  >
                    <span className="distress-score">{opt.score}</span>
                    <span className="distress-label">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Navigation Buttons */}
          <div className="quiz-footer">
            <button 
              type="button" 
              className="btn btn-secondary nav-btn-prev" 
              id="quiz-btn-prev" 
              disabled={currentIndex === 0}
              onClick={handleBack}
            >
              <svg className="nav-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back
            </button>
            
            <button 
              type="button" 
              className="btn btn-primary nav-btn-next" 
              id="quiz-btn-next" 
              disabled={isNextDisabled}
              onClick={handleNext}
            >
              <span>{currentIndex === bipolarQuestions.length - 1 ? 'Submit Test' : 'Next'}</span>
              <svg className="nav-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <BipolarDashboard 
          symptomsCount={symptomCount}
          severityScore={totalDistress}
          answers={answers}
          onRetake={handleRetake}
          onHome={onBackToMenu}
          patientName={localStorage.getItem('mindwave_user') || 'Dhruthi M'}
        />
      )}
    </>
  );
}
