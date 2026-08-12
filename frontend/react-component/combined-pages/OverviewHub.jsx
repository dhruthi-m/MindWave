import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Activity,
  Compass,
  Brain,
  Sparkles,
  BookOpen,
  Moon,
  Wind,
  Heart,
  Stethoscope,
  Download,
  Calendar,
  RefreshCw,
  ArrowRight,
  Zap,
  Layers
} from 'lucide-react';

export default function OverviewHub({ symptomsCount, schizCount, bipolarCount, patientName, dateString }) {
  const SCHIZ_TOTAL  = 13;
  const BIPOLAR_TOTAL = 12;

  // Combined overall risk
  const overallRisk = useMemo(() => {
    const schizRisk   = schizCount  >= 7 ? 2 : schizCount  >= 4 ? 1 : 0;
    const bipolarRisk = bipolarCount >= 7 ? 2 : bipolarCount >= 4 ? 1 : 0;
    const max = Math.max(schizRisk, bipolarRisk);
    if (max === 2) return 'High Risk';
    if (max === 1) return 'Moderate Risk';
    if (symptomsCount >= 3) return 'Mild Risk';
    return 'Low Risk';
  }, [symptomsCount, schizCount, bipolarCount]);

  // Schizophrenia domain summary
  const schizSummary = useMemo(() => {
    if (schizCount >= 9) return 'Significant Perceptual Shift';
    if (schizCount >= 6) return 'Moderate Reality Deviation';
    if (schizCount >= 3) return 'Mild Deviation';
    return 'High Reality Anchoring';
  }, [schizCount]);

  // Bipolar domain summary
  const bipolarSummary = useMemo(() => {
    if (bipolarCount >= 9) return 'Significant Mood Instability';
    if (bipolarCount >= 6) return 'Moderate Mood Changes';
    if (bipolarCount >= 3) return 'Mostly Stable';
    return 'Very Stable';
  }, [bipolarCount]);

  const riskColor = overallRisk === 'High Risk'
    ? 'text-red-400' : overallRisk === 'Moderate Risk'
    ? 'text-orange-400' : overallRisk === 'Mild Risk'
    ? 'text-cyan-400' : 'text-green-400';

  return (
    <div className="flex flex-col gap-10 sm:gap-12 text-left pb-16">

      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#384F6E]/15 pb-6">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading">
            Combined Mental Health Screening Results
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Dual-domain assessment covering Schizophrenia &amp; Bipolar spectrums. Select any card to explore full clinical details.
          </p>
        </div>
        <div className="text-xs sm:text-sm text-slate-400 bg-[#182235]/40 border border-[#384F6E]/20 px-4 py-2.5 rounded-xl flex flex-col items-start min-w-[200px]">
          <div>Patient: <strong className="text-white">{patientName}</strong></div>
          <div className="mt-1 text-[11px] text-slate-500">Date: {dateString}</div>
        </div>
      </div>

      {/* Dual-Domain Score Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Schizophrenia sub-score */}
        <div className="bg-[#182235]/65 border border-purple-500/20 rounded-[18px] p-5 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center flex-shrink-0">
            <Brain className="w-7 h-7 text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] text-purple-400 font-extrabold uppercase tracking-widest mb-1">Schizophrenia Domain</div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-white">{schizCount}</span>
              <span className="text-slate-500 text-sm mb-0.5">/ {SCHIZ_TOTAL}</span>
            </div>
            <div className="mt-2 h-1.5 bg-[#1d2b42] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-400 transition-all duration-700"
                style={{ width: `${Math.round((schizCount / SCHIZ_TOTAL) * 100)}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5">{schizSummary}</div>
          </div>
        </div>

        {/* Bipolar sub-score */}
        <div className="bg-[#182235]/65 border border-blue-500/20 rounded-[18px] p-5 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center flex-shrink-0">
            <Zap className="w-7 h-7 text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest mb-1">Bipolar Domain</div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-white">{bipolarCount}</span>
              <span className="text-slate-500 text-sm mb-0.5">/ {BIPOLAR_TOTAL}</span>
            </div>
            <div className="mt-2 h-1.5 bg-[#1d2b42] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
                style={{ width: `${Math.round((bipolarCount / BIPOLAR_TOTAL) * 100)}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5">{bipolarSummary}</div>
          </div>
        </div>
      </div>

      {/* Grid Sections */}
      <div className="flex flex-col gap-12 sm:gap-16">

        {/* Core Results */}
        <div>
          <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5">Core Screening Assessment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Card 1: Overall Risk */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-red-500/10 text-red-400 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Overall Risk Level</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Combined domains flagged at <strong className={riskColor}>{overallRisk}</strong>.
                </p>
              </div>
              <Link to="/risk" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2: Domain Scores */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Domain Scores</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Scored <strong className="text-white">{schizCount}/{SCHIZ_TOTAL}</strong> psychotic &amp; <strong className="text-white">{bipolarCount}/{BIPOLAR_TOTAL}</strong> mood symptoms.
                </p>
              </div>
              <Link to="/scores" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: Psychotic Spectrum */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Psychotic Spectrum</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Reality anchoring status: <strong className="text-white">{schizSummary}</strong>.
                </p>
              </div>
              <Link to="/psychotic" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 4: Mood Spectrum */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Mood Spectrum</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Mood stability status: <strong className="text-white">{bipolarSummary}</strong>.
                </p>
              </div>
              <Link to="/mood" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 5: Symptoms Identified */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-orange-500/10 text-orange-400 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Symptoms Identified</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  View the full map of endorsed symptoms across both domains.
                </p>
              </div>
              <Link to="/symptoms" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 6: Severity Index */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Severity Index</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Combined distress and symptom severity analysis across both spectrums.
                </p>
              </div>
              <Link to="/severity" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

        {/* Wellness & Support */}
        <div>
          <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5">Wellness Recommendations &amp; Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Card 7: Insights */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Clinical Insights</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Explore patterns, co-occurring indicators, and dual-domain clinical observations.
                </p>
              </div>
              <Link to="/insights" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 8: Recommendations */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Recommendations</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Integrated lifestyle, grounding, and mood-regulation advice.
                </p>
              </div>
              <Link to="/recommendations" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 9: Sleep */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Moon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Sleep Guidelines</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Sleep hygiene for both psychotic and mood disorder profiles.
                </p>
              </div>
              <Link to="/sleep" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 10: Stress */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-green-500/10 text-green-400 flex items-center justify-center">
                  <Wind className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Stress Management</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Guided breathing, grounding exercises and calming techniques.
                </p>
              </div>
              <Link to="/stress" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 11: Wellness */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Daily Wellness Habits</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Daily self-care, hydration, activity, and routine checklists.
                </p>
              </div>
              <Link to="/wellness" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 12: When to Seek Help */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-orange-500/10 text-orange-400 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">When to Seek Help</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Warning signs and clinical referral guidance for both conditions.
                </p>
              </div>
              <Link to="/seek-help" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

        {/* Report & Actions */}
        <div>
          <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5">Report &amp; Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 13: Download */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Download Report</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Export a structured PDF summary of your combined dual-domain screening.
                </p>
              </div>
              <Link to="/report" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 14: History */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Assessment History</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Track trends across multiple combined screenings over time.
                </p>
              </div>
              <Link to="/history" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 15: Retake */}
            <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-slate-500/10 text-slate-400 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">Retake Assessment</h3>
                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                  Start a fresh combined screening to compare with current results.
                </p>
              </div>
              <Link to="/retake" className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200">
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
