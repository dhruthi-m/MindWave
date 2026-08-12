import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import OverviewHub from './combined-pages/OverviewHub';
import {
  RiskPage,
  ScoresPage,
  PsychoticPage,
  MoodPage,
  SymptomsPage,
  SeverityPage,
  InsightsPage,
  RecommendationsPage,
  SleepPage,
  StressPage,
  WellnessPage,
  SeekHelpPage,
  DownloadPage,
  HistoryPage,
  RetakePage,
} from './combined-pages/DetailPageComponents';

export default function CombinedDashboard({
  symptomsCount = 0,
  schizCount = 0,
  bipolarCount = 0,
  totalDistress = 0,
  answers = [],
  onRetake,
  onHome,
  patientName = 'Dhruthi M',
}) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#0B1220';
    setCurrentTime(
      new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    );
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const sharedProps = {
    symptomsCount,
    schizCount,
    bipolarCount,
    totalDistress,
    answers,
    patientName,
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#0B1220] text-slate-150 font-sans p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start overflow-x-hidden w-full">
        <div className="w-full max-w-[1200px] flex flex-col gap-6">

          <Routes>
            {/* Overview Hub */}
            <Route
              path="/"
              element={
                <OverviewHub
                  symptomsCount={symptomsCount}
                  schizCount={schizCount}
                  bipolarCount={bipolarCount}
                  patientName={patientName}
                  dateString={currentTime || 'Loading...'}
                />
              }
            />

            {/* Core assessment pages */}
            <Route path="/risk"       element={<RiskPage     {...sharedProps} />} />
            <Route path="/scores"     element={<ScoresPage   {...sharedProps} />} />
            <Route path="/psychotic"  element={<PsychoticPage schizCount={schizCount} answers={answers} />} />
            <Route path="/mood"       element={<MoodPage      bipolarCount={bipolarCount} answers={answers} />} />
            <Route path="/symptoms"   element={<SymptomsPage  answers={answers} />} />
            <Route path="/severity"   element={<SeverityPage  answers={answers} />} />

            {/* Wellness & support pages */}
            <Route path="/insights"        element={<InsightsPage        schizCount={schizCount} bipolarCount={bipolarCount} />} />
            <Route path="/recommendations" element={<RecommendationsPage schizCount={schizCount} bipolarCount={bipolarCount} />} />
            <Route path="/sleep"           element={<SleepPage />} />
            <Route path="/stress"          element={<StressPage />} />
            <Route path="/wellness"        element={<WellnessPage />} />
            <Route path="/seek-help"       element={<SeekHelpPage />} />

            {/* Report & action pages */}
            <Route path="/report"  element={<DownloadPage {...sharedProps} />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/retake"  element={<RetakePage onRetake={onRetake} />} />
          </Routes>

        </div>
      </div>
    </HashRouter>
  );
}
