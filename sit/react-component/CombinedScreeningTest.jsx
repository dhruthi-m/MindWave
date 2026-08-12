import React, { useState } from 'react';
import { combinedQuestions } from './combinedQuestions';
import CombinedDashboard from './CombinedDashboard';

/**
 * CombinedScreeningTest Component
 *
 * Implements the Combined Schizophrenia + Bipolar Disorder Screening Questionnaire.
 * Styled using custom design system classes from style.css to match the existing
 * quiz UI (Schizophrenia PQ-16 & Bipolar Disorder screening).
 *
 * On completion, transitions to the full CombinedDashboard (matching the
 * SchizophreniaDashboard / BipolarDashboard quality with all detail pages).
 *
 * @param {Function} onBackToMenu  Callback triggered when clicking "Back to Screening Menu"
 */
export default function CombinedScreeningTest({ onBackToMenu }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(
    combinedQuestions.map((q) => ({
      id:       q.id,
      category: q.category,
      symptom:  null,   // null | true | false
      distress: null,   // null | 0–5
    }))
  );
  const [testStage, setTestStage] = useState('quiz'); // 'quiz' | 'results'

  // ─── Derived values for the current question step ──────────────────────────
  const currentQuestion  = combinedQuestions[currentIndex];
  const currentAnswer    = answers[currentIndex];
  const progressPercent  = Math.round(((currentIndex + 1) / combinedQuestions.length) * 100);

  const isSymptomAnswered  = currentAnswer.symptom !== null;
  const isDistressRequired = currentAnswer.symptom === true;
  const isDistressAnswered = currentAnswer.distress !== null;
  const isNextDisabled     = !isSymptomAnswered || (isDistressRequired && !isDistressAnswered);

  // ─── Event Handlers ────────────────────────────────────────────────────────
  const handleSymptomSelect = (value) => {
    const updated = [...answers];
    updated[currentIndex] = {
      ...updated[currentIndex],
      symptom:  value,
      distress: value === false ? 0 : null,
    };
    setAnswers(updated);
  };

  const handleDistressSelect = (score) => {
    const updated = [...answers];
    updated[currentIndex] = { ...updated[currentIndex], distress: score };
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < combinedQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Persist scores
      const schizCount   = answers.filter((a) => a.category === 'schizophrenia' && a.symptom === true).length;
      const bipolarCount = answers.filter((a) => a.category === 'bipolar'       && a.symptom === true).length;
      const totalSymptoms = answers.filter((a) => a.symptom === true).length;
      const totalDistress = answers.reduce((sum, a) =>
        a.symptom === true && a.distress !== null ? sum + a.distress : sum, 0);

      localStorage.setItem('mindwave_combined_taken',           'true');
      localStorage.setItem('mindwave_combined_symptomCount',    totalSymptoms);
      localStorage.setItem('mindwave_combined_schizSymptoms',   schizCount);
      localStorage.setItem('mindwave_combined_bipolarSymptoms', bipolarCount);
      localStorage.setItem('mindwave_combined_totalExtent',     totalDistress);
      localStorage.setItem('mindwave_combined_date',
        new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

      setTestStage('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setAnswers(
      combinedQuestions.map((q) => ({
        id:       q.id,
        category: q.category,
        symptom:  null,
        distress: null,
      }))
    );
    setTestStage('quiz');
    document.body.className = 'screening-page-body';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Score calculations (for dashboard props) ──────────────────────────────
  const schizCount    = answers.filter((a) => a.category === 'schizophrenia' && a.symptom === true).length;
  const bipolarCount  = answers.filter((a) => a.category === 'bipolar'       && a.symptom === true).length;
  const totalSymptoms = answers.filter((a) => a.symptom === true).length;
  const totalDistress = answers.reduce((sum, a) =>
    a.symptom === true && a.distress !== null ? sum + a.distress : sum, 0);

  // ─── Category domain badge ─────────────────────────────────────────────────
  const isSchizDomain = currentQuestion.category === 'schizophrenia';
  const categoryLabel = isSchizDomain ? '🔬 Schizophrenia Domain' : '🌊 Bipolar Domain';

  // ─── Results: hand off to full CombinedDashboard ──────────────────────────
  if (testStage === 'results') {
    document.body.className = 'dashboard-body-layout medical-dashboard-active bg-[#0B1220]';
    return (
      <CombinedDashboard
        symptomsCount={totalSymptoms}
        schizCount={schizCount}
        bipolarCount={bipolarCount}
        totalDistress={totalDistress}
        answers={answers}
        onRetake={handleRetake}
        onHome={onBackToMenu}
        patientName={localStorage.getItem('mindwave_user') || 'Dhruthi M'}
      />
    );
  }

  // ─── Quiz Screen ────────────────────────────────────────────────────────────
  return (
    <div className="screening-quiz-card glass">
      {/* Header Progress section */}
      <div className="quiz-header">
        <div className="quiz-progress-text">
          <span className="quiz-test-tag">Combined Screening (Schizophrenia + Bipolar)</span>
          <span className="quiz-progress-counter">
            Question {currentIndex + 1} of {combinedQuestions.length}
          </span>
        </div>
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Question Content */}
      <div className="quiz-question-container fade-in-up">
        {/* Domain badge */}
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            marginBottom: '1rem',
            background:  isSchizDomain ? 'rgba(139,92,246,0.18)' : 'rgba(59,130,246,0.18)',
            color:       isSchizDomain ? '#a78bfa' : '#60a5fa',
            border: `1px solid ${isSchizDomain ? 'rgba(139,92,246,0.35)' : 'rgba(59,130,246,0.35)'}`,
          }}
        >
          {categoryLabel}
        </div>

        <h2 className="quiz-question-text" id={`question-${currentQuestion.id}`}>
          {currentQuestion.text}
        </h2>

        {/* True/False Toggle */}
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

        {/* Distress Rating */}
        <div
          className={`quiz-distress-section ${currentAnswer.symptom === true ? 'visible' : ''}`}
          id="distress-container"
        >
          <h3 className="quiz-distress-title">To what extent do you feel that?</h3>
          <div className="quiz-distress-options" role="radiogroup" aria-label="Distress rating">
            {[
              { label: 'None',      score: 0 },
              { label: 'Very Mild', score: 1 },
              { label: 'Mild',      score: 2 },
              { label: 'Moderate',  score: 3 },
              { label: 'Severe',    score: 4 },
              { label: 'Extreme',   score: 5 },
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

      {/* Footer Navigation */}
      <div className="quiz-footer">
        <button
          type="button"
          className="btn btn-secondary nav-btn-prev"
          id="quiz-btn-prev"
          disabled={currentIndex === 0}
          onClick={handleBack}
        >
          <svg className="nav-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
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
          <span>{currentIndex === combinedQuestions.length - 1 ? 'Submit Test' : 'Next'}</span>
          <svg className="nav-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
