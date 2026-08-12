import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip as ChartTooltip, ReferenceLine, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import {
  ArrowLeft, ShieldAlert, Activity, Compass, Brain, Sparkles,
  BookOpen, Moon, Wind, Heart, Stethoscope, Download, Calendar,
  RefreshCw, CheckCircle, AlertTriangle, Smile, Users, Sun,
  FileText, Printer, Share2, Zap, Layers, Eye, HelpCircle,
  ChevronDown, ChevronUp
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Shared Helpers
// ─────────────────────────────────────────────────────────────────────────────
const SCHIZ_TOTAL  = 13;
const BIPOLAR_TOTAL = 12;

function PageHeader({ title, subtitle, badge }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#384F6E]/15 pb-6 mb-8 text-left mt-4 w-full">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="p-3 bg-[#182235]/80 hover:bg-[#202E48] rounded-full text-slate-200 transition-all border border-[#384F6E]/20 shadow-lg hover:scale-105 cursor-pointer flex items-center justify-center"
          aria-label="Back to overview"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] text-purple-400 font-extrabold uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/15">MindWave Portal</span>
            {badge && <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border bg-slate-500/10 border-slate-500/20 text-slate-300">{badge}</span>}
          </div>
          <h1 className="text-[28px] sm:text-[34px] font-black text-white tracking-wide leading-tight">{title}</h1>
          <p className="text-[14px] text-slate-400 mt-1 font-normal leading-relaxed">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, iconColor, iconBg, title, children }) {
  return (
    <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 hover:border-[#384F6E]/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-[10px] ${iconBg} ${iconColor} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Overall Risk Page
// ─────────────────────────────────────────────────────────────────────────────
export function RiskPage({ symptomsCount, schizCount, bipolarCount }) {
  const navigate = useNavigate();
  const today = useMemo(() => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), []);

  const schizRisk = schizCount >= 9 ? 'High' : schizCount >= 6 ? 'Moderate' : schizCount >= 3 ? 'Mild' : 'Low';
  const bipolarRisk = bipolarCount >= 8 ? 'High' : bipolarCount >= 5 ? 'Moderate' : bipolarCount >= 3 ? 'Mild' : 'Low';
  const overallRisk = (schizRisk === 'High' || bipolarRisk === 'High') ? 'High Risk'
    : (schizRisk === 'Moderate' || bipolarRisk === 'Moderate') ? 'Moderate Risk'
    : (schizRisk === 'Mild' || bipolarRisk === 'Mild') ? 'Mild Risk' : 'Low Risk';

  const riskMeta = {
    'High Risk':     { color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/25',    strokeColor: '#EF4444', deg: 150, badge: '🔴 High Risk',     interp: 'Significant clinical indicators detected across one or both domains. Immediate professional consultation is strongly recommended.' },
    'Moderate Risk': { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25', strokeColor: '#F59E0B', deg: 100, badge: '🟠 Moderate Risk', interp: 'Elevated indicators in one or both domains meeting subthreshold clinical criteria. Professional follow-up is advised.' },
    'Mild Risk':     { color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/25',   strokeColor: '#22D3EE', deg: 50,  badge: '🟡 Mild Risk',     interp: 'Subthreshold indicators observed. Lifestyle monitoring and self-care routines are recommended.' },
    'Low Risk':      { color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/25',  strokeColor: '#10B981', deg: 15,  badge: '🟢 Low Risk',      interp: 'Responses remain within typical baselines across both domains. Continue monitoring your well-being.' },
  };
  const meta = riskMeta[overallRisk];

  const gaugeCircumference = 2 * Math.PI * 54;
  const gaugeOffset = gaugeCircumference - (meta.deg / 180) * gaugeCircumference * 0.5;

  const riskLevels = [
    { label: 'Low',      color: 'bg-green-400',  active: overallRisk === 'Low Risk' },
    { label: 'Mild',     color: 'bg-cyan-400',   active: overallRisk === 'Mild Risk' },
    { label: 'Moderate', color: 'bg-orange-400', active: overallRisk === 'Moderate Risk' },
    { label: 'High',     color: 'bg-red-400',    active: overallRisk === 'High Risk' },
  ];

  const domainData = [
    { name: 'Schizophrenia', score: schizCount, total: SCHIZ_TOTAL, color: '#a78bfa', risk: schizRisk },
    { name: 'Bipolar',       score: bipolarCount, total: BIPOLAR_TOTAL, color: '#60a5fa', risk: bipolarRisk },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader
        title="Overall Risk Assessment"
        subtitle="Combined dual-domain clinical interpretation of your screening result."
        badge={meta.badge}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
        {/* Risk Hero Card */}
        <div className={`lg:col-span-5 bg-[#182235]/65 border ${meta.border} rounded-[20px] p-7 shadow-2xl flex flex-col justify-between min-h-[320px]`}>
          <div className="flex flex-col gap-4">
            <span className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest">Combined Assessment Status</span>
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl ${meta.bg} ${meta.color} flex items-center justify-center border ${meta.border}`}>
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[12px] text-slate-500 font-semibold block">OVERALL RISK LEVEL</span>
                <h2 className={`text-3xl font-black ${meta.color} tracking-wide mt-0.5`}>{overallRisk}</h2>
              </div>
            </div>
            <p className="text-[15px] text-slate-300 leading-relaxed mt-2">{meta.interp}</p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#384F6E]/15 grid grid-cols-2 gap-3">
            {domainData.map(d => (
              <div key={d.name} className="bg-[#1d2b42] rounded-xl p-3">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{d.name}</div>
                <div className="text-lg font-black text-white">{d.score}<span className="text-sm text-slate-500 font-normal">/{d.total}</span></div>
                <div className={`text-xs font-bold mt-0.5 ${d.risk === 'High' ? 'text-red-400' : d.risk === 'Moderate' ? 'text-orange-400' : d.risk === 'Mild' ? 'text-cyan-400' : 'text-green-400'}`}>{d.risk} Risk</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gauge + Scale */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Gauge */}
          <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col items-center justify-center gap-4">
            <span className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest">Risk Gauge</span>
            <svg width="140" height="80" viewBox="0 0 140 80">
              <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke="#1d2b42" strokeWidth="10" strokeLinecap="round" />
              <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke={meta.strokeColor} strokeWidth="10" strokeLinecap="round"
                strokeDasharray={gaugeCircumference} strokeDashoffset={gaugeOffset} style={{ transition: 'stroke-dashoffset 1s ease' }} />
              <text x="70" y="68" textAnchor="middle" className="fill-white" style={{ fontSize: 13, fontWeight: 800, fill: 'white' }}>{overallRisk.split(' ')[0]}</text>
            </svg>
            <div className="flex gap-2">
              {['Low', 'Mild', 'Moderate', 'High'].map(l => (
                <div key={l} className="flex flex-col items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${l === 'Low' ? 'bg-green-400' : l === 'Mild' ? 'bg-cyan-400' : l === 'Moderate' ? 'bg-orange-400' : 'bg-red-400'} ${overallRisk.includes(l) ? 'ring-2 ring-white/30 scale-125' : 'opacity-40'}`} />
                  <span className="text-[9px] text-slate-500">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Domain Risk Bars */}
          <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col gap-4">
            <span className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest">Domain Scores</span>
            {domainData.map(d => (
              <div key={d.name}>
                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span className="font-semibold text-white">{d.name}</span>
                  <span>{d.score}/{d.total}</span>
                </div>
                <div className="h-2.5 bg-[#1d2b42] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.round((d.score / d.total) * 100)}%`, background: d.color }} />
                </div>
                <div className={`text-[11px] mt-1 font-bold ${d.risk === 'High' ? 'text-red-400' : d.risk === 'Moderate' ? 'text-orange-400' : d.risk === 'Mild' ? 'text-cyan-400' : 'text-green-400'}`}>{d.risk} Risk</div>
              </div>
            ))}
          </div>

          {/* Clinical Note */}
          <div className="sm:col-span-2 bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Clinical Disclaimer</h4>
                <p className="text-xs text-slate-400 leading-relaxed">This screening is for informational self-awareness only and does not constitute a clinical diagnosis. Scores are based on self-reported data. If results concern you, consult a licensed mental health professional or psychiatrist for a comprehensive evaluation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Level Legend */}
      <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6">
        <h3 className="text-sm font-bold text-white mb-5">Combined Risk Level Reference Scale</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { level: 'Low Risk',      color: 'text-green-400',  bg: 'bg-green-500/10',    border: 'border-green-500/20',  desc: 'Few or no indicators. Both domains within typical baselines.' },
            { level: 'Mild Risk',     color: 'text-cyan-400',   bg: 'bg-cyan-500/10',     border: 'border-cyan-500/20',   desc: 'Subthreshold signals in one or both domains. Monitor closely.' },
            { level: 'Moderate Risk', color: 'text-orange-400', bg: 'bg-orange-500/10',   border: 'border-orange-500/20', desc: 'Above-threshold in at least one domain. Follow-up advised.' },
            { level: 'High Risk',     color: 'text-red-400',    bg: 'bg-red-500/10',      border: 'border-red-500/20',    desc: 'Significant multi-domain indicators. Clinical consultation needed.' },
          ].map(r => (
            <div key={r.level} className={`${r.bg} border ${r.border} rounded-xl p-4 ${overallRisk === r.level ? 'ring-1 ring-white/10' : 'opacity-60'}`}>
              <div className={`text-xs font-extrabold uppercase tracking-widest ${r.color} mb-2`}>{r.level}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Domain Scores Page
// ─────────────────────────────────────────────────────────────────────────────
export function ScoresPage({ symptomsCount, schizCount, bipolarCount, totalDistress }) {
  const schizPct   = Math.round((schizCount / SCHIZ_TOTAL) * 100);
  const bipolarPct = Math.round((bipolarCount / BIPOLAR_TOTAL) * 100);

  const barData = [
    { name: 'Schiz.', score: schizCount, total: SCHIZ_TOTAL },
    { name: 'Bipolar', score: bipolarCount, total: BIPOLAR_TOTAL },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="Domain Scores" subtitle="Side-by-side breakdown of your Schizophrenia and Bipolar domain responses." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Schizophrenia score card */}
        <div className="bg-[#182235]/65 border border-purple-500/20 rounded-[20px] p-7 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-[10px] text-purple-400 font-extrabold uppercase tracking-widest">Schizophrenia Domain</div>
              <div className="text-2xl font-black text-white">{schizCount}<span className="text-sm text-slate-500 font-normal"> / {SCHIZ_TOTAL}</span></div>
            </div>
          </div>
          <div className="h-3 bg-[#1d2b42] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-violet-400 transition-all duration-700" style={{ width: `${schizPct}%` }} />
          </div>
          <div className="text-4xl font-black text-purple-400 text-center mt-2">{schizPct}%</div>
          <p className="text-xs text-slate-400 text-center">of schizophrenia domain questions endorsed</p>
          <div className="mt-2 pt-4 border-t border-[#384F6E]/15 text-[11px] text-slate-500 leading-relaxed">
            Threshold for elevated concern: ≥ 6 of {SCHIZ_TOTAL} ({Math.round((6/SCHIZ_TOTAL)*100)}%)
          </div>
        </div>

        {/* Bipolar score card */}
        <div className="bg-[#182235]/65 border border-blue-500/20 rounded-[20px] p-7 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest">Bipolar Domain</div>
              <div className="text-2xl font-black text-white">{bipolarCount}<span className="text-sm text-slate-500 font-normal"> / {BIPOLAR_TOTAL}</span></div>
            </div>
          </div>
          <div className="h-3 bg-[#1d2b42] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-700" style={{ width: `${bipolarPct}%` }} />
          </div>
          <div className="text-4xl font-black text-blue-400 text-center mt-2">{bipolarPct}%</div>
          <p className="text-xs text-slate-400 text-center">of bipolar domain questions endorsed</p>
          <div className="mt-2 pt-4 border-t border-[#384F6E]/15 text-[11px] text-slate-500 leading-relaxed">
            Threshold for elevated concern: ≥ 5 of {BIPOLAR_TOTAL} ({Math.round((5/BIPOLAR_TOTAL)*100)}%)
          </div>
        </div>

        {/* Combined summary */}
        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-7 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/25 flex items-center justify-center">
              <Layers className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-[10px] text-yellow-400 font-extrabold uppercase tracking-widest">Combined Total</div>
              <div className="text-2xl font-black text-white">{symptomsCount}<span className="text-sm text-slate-500 font-normal"> / 25</span></div>
            </div>
          </div>
          <div className="h-3 bg-[#1d2b42] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-400 transition-all duration-700" style={{ width: `${Math.round((symptomsCount/25)*100)}%` }} />
          </div>
          <div className="mt-2 pt-4 border-t border-[#384F6E]/15 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Total Distress Score</span>
              <span className="text-white font-bold">{totalDistress}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Max Possible Distress</span>
              <span className="text-slate-500">125</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Distress Intensity</span>
              <span className="text-white font-bold">{symptomsCount > 0 ? (totalDistress / symptomsCount).toFixed(1) : '0.0'} avg/symptom</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart Comparison */}
      <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6">
        <h3 className="text-sm font-bold text-white mb-6">Domain Comparison</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} barSize={48}>
            <CartesianGrid strokeDasharray="3 3" stroke="#384F6E20" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <ChartTooltip
              contentStyle={{ background: '#182235', border: '1px solid #384F6E40', borderRadius: 10 }}
              labelStyle={{ color: '#e2e8f0', fontWeight: 700 }}
              itemStyle={{ color: '#94a3b8' }}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              <Cell fill="#a78bfa" />
              <Cell fill="#60a5fa" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Psychotic Spectrum (Schizophrenia domain detail)
// ─────────────────────────────────────────────────────────────────────────────
export function PsychoticPage({ schizCount, answers = [] }) {
  const schizAnswers = answers.filter(a => a.category === 'schizophrenia');
  const endorsed = schizAnswers.filter(a => a.symptom === true);
  const pct = Math.round((schizCount / SCHIZ_TOTAL) * 100);

  const level = schizCount >= 9 ? { label: 'Significant Perceptual Shift', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/25' }
    : schizCount >= 6 ? { label: 'Moderate Reality Deviation', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25' }
    : schizCount >= 3 ? { label: 'Mild Deviation', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/25' }
    : { label: 'High Reality Anchoring', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/25' };

  const clusters = [
    { name: 'Perceptual', desc: 'Sensory hallucinations (visual, auditory, olfactory)' },
    { name: 'Cognitive',  desc: 'Thought control, racing or intrusive thoughts' },
    { name: 'Paranoid',   desc: 'Suspicion, ideas of reference, feelings of persecution' },
    { name: 'Somatic',    desc: 'Bodily distortions, depersonalisation feelings' },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="Psychotic Spectrum Analysis" subtitle="Detailed Schizophrenia-domain breakdown of your perceptual and cognitive responses." badge="🔬 Schizophrenia Domain" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Score Hero */}
        <div className={`lg:col-span-4 bg-[#182235]/65 border ${level.border} rounded-[20px] p-7 flex flex-col gap-5`}>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${level.bg} border ${level.border} flex items-center justify-center`}>
              <Brain className={`w-7 h-7 ${level.color}`} />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Reality Contact</div>
              <div className={`text-xl font-black ${level.color}`}>{level.label}</div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Endorsed symptoms</span><span className="text-white font-bold">{schizCount}/{SCHIZ_TOTAL}</span>
            </div>
            <div className="h-3 bg-[#1d2b42] rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-violet-400 transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            <div className={`text-right text-xs font-bold mt-1 ${level.color}`}>{pct}%</div>
          </div>
          <div className="pt-4 border-t border-[#384F6E]/15 text-xs text-slate-400 leading-relaxed">
            Clinical threshold for elevated concern is <strong className="text-white">≥ 6</strong> endorsed symptoms.
          </div>
        </div>

        {/* Endorsed Symptoms List */}
        <div className="lg:col-span-8 bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6">
          <h3 className="text-sm font-bold text-white mb-4">Endorsed Schizophrenia-Domain Symptoms</h3>
          {endorsed.length === 0 ? (
            <div className="flex items-center gap-3 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">No schizophrenia-domain symptoms endorsed.</span>
            </div>
          ) : (
            <div className="space-y-2">
              {endorsed.map(a => {
                const q = schizAnswers.find(x => x.id === a.id);
                return (
                  <div key={a.id} className="flex items-start gap-3 bg-purple-500/5 border border-purple-500/15 rounded-xl p-3">
                    <Eye className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-xs text-white leading-relaxed">{/* question text from answers array */}Q{a.id} — reported symptom endorsed</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Distress: <span className="text-purple-300 font-bold">{a.distress ?? 0}/5</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Symptom Clusters */}
      <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6">
        <h3 className="text-sm font-bold text-white mb-5">Schizophrenia Symptom Clusters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clusters.map(c => (
            <div key={c.name} className="bg-purple-500/5 border border-purple-500/15 rounded-xl p-4">
              <div className="text-xs font-extrabold text-purple-400 uppercase tracking-widest mb-2">{c.name}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Mood Spectrum (Bipolar domain detail)
// ─────────────────────────────────────────────────────────────────────────────
export function MoodPage({ bipolarCount, answers = [] }) {
  const bipolarAnswers = answers.filter(a => a.category === 'bipolar');
  const endorsed = bipolarAnswers.filter(a => a.symptom === true);
  const pct = Math.round((bipolarCount / BIPOLAR_TOTAL) * 100);

  const level = bipolarCount >= 9 ? { label: 'Significant Mood Instability', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/25' }
    : bipolarCount >= 6 ? { label: 'Moderate Mood Changes', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25' }
    : bipolarCount >= 3 ? { label: 'Mostly Stable', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/25' }
    : { label: 'Very Stable', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/25' };

  const clusters = [
    { name: 'Energy',       desc: 'Elevated energy, reduced need for sleep, hyperactivity' },
    { name: 'Cognition',    desc: 'Racing thoughts, distractibility, increased talkativeness' },
    { name: 'Behaviour',    desc: 'Impulsivity, reckless spending, project initiation' },
    { name: 'Mood Cycling', desc: 'Dramatic mood swings, irritability, emotional dysregulation' },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="Mood Spectrum Analysis" subtitle="Detailed Bipolar-domain breakdown of your mood, energy, and behavioral responses." badge="🌊 Bipolar Domain" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Score Hero */}
        <div className={`lg:col-span-4 bg-[#182235]/65 border ${level.border} rounded-[20px] p-7 flex flex-col gap-5`}>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${level.bg} border ${level.border} flex items-center justify-center`}>
              <Zap className={`w-7 h-7 ${level.color}`} />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Mood Stability</div>
              <div className={`text-xl font-black ${level.color}`}>{level.label}</div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Endorsed symptoms</span><span className="text-white font-bold">{bipolarCount}/{BIPOLAR_TOTAL}</span>
            </div>
            <div className="h-3 bg-[#1d2b42] rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            <div className={`text-right text-xs font-bold mt-1 ${level.color}`}>{pct}%</div>
          </div>
          <div className="pt-4 border-t border-[#384F6E]/15 text-xs text-slate-400 leading-relaxed">
            Clinical threshold for elevated concern is <strong className="text-white">≥ 5</strong> endorsed symptoms.
          </div>
        </div>

        {/* Endorsed Symptoms List */}
        <div className="lg:col-span-8 bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6">
          <h3 className="text-sm font-bold text-white mb-4">Endorsed Bipolar-Domain Symptoms</h3>
          {endorsed.length === 0 ? (
            <div className="flex items-center gap-3 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">No bipolar-domain symptoms endorsed.</span>
            </div>
          ) : (
            <div className="space-y-2">
              {endorsed.map(a => (
                <div key={a.id} className="flex items-start gap-3 bg-blue-500/5 border border-blue-500/15 rounded-xl p-3">
                  <Zap className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs text-white leading-relaxed">Q{a.id} — mood/behavioral symptom endorsed</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Distress: <span className="text-blue-300 font-bold">{a.distress ?? 0}/5</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Symptom Clusters */}
      <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6">
        <h3 className="text-sm font-bold text-white mb-5">Bipolar Symptom Clusters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clusters.map(c => (
            <div key={c.name} className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-4">
              <div className="text-xs font-extrabold text-blue-400 uppercase tracking-widest mb-2">{c.name}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Symptoms Identified (all endorsed questions)
// ─────────────────────────────────────────────────────────────────────────────
export function SymptomsPage({ answers = [], questions = [] }) {
  const [filter, setFilter] = useState('all');
  const endorsed = answers.filter(a => a.symptom === true);
  const filtered = filter === 'all' ? endorsed
    : endorsed.filter(a => a.category === filter);

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="Symptoms Identified" subtitle="Full map of all endorsed symptoms across both domains with distress ratings." />

      {/* Filter */}
      <div className="flex gap-3 flex-wrap">
        {[['all', 'All Domains', 'bg-slate-500/10 border-slate-500/20 text-slate-300'],
          ['schizophrenia', '🔬 Schizophrenia', 'bg-purple-500/10 border-purple-500/20 text-purple-300'],
          ['bipolar', '🌊 Bipolar', 'bg-blue-500/10 border-blue-500/20 text-blue-300']
        ].map(([val, label, cls]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${filter === val ? cls + ' ring-1 ring-white/10' : 'bg-transparent border-[#384F6E]/20 text-slate-500 hover:text-slate-300'}`}>
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-10 text-center">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No symptoms endorsed in this domain.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(a => {
            const isSchiz = a.category === 'schizophrenia';
            const pct = Math.round((a.distress / 5) * 100);
            return (
              <div key={a.id} className={`bg-[#182235]/65 border ${isSchiz ? 'border-purple-500/15' : 'border-blue-500/15'} rounded-[16px] p-5 flex flex-col sm:flex-row sm:items-center gap-4`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isSchiz ? 'bg-purple-500/10' : 'bg-blue-500/10'}`}>
                  {isSchiz ? <Brain className="w-4 h-4 text-purple-400" /> : <Zap className="w-4 h-4 text-blue-400" />}
                </div>
                <div className="flex-1">
                  <div className={`text-[10px] font-extrabold uppercase tracking-widest mb-1 ${isSchiz ? 'text-purple-400' : 'text-blue-400'}`}>
                    {isSchiz ? 'Schizophrenia Domain' : 'Bipolar Domain'} — Q{a.id}
                  </div>
                  <p className="text-sm text-white leading-relaxed">Symptom endorsed as <strong>True</strong></p>
                </div>
                <div className="flex flex-col items-end gap-1.5 min-w-[100px]">
                  <div className="text-xs text-slate-400">Distress</div>
                  <div className="h-1.5 w-24 bg-[#1d2b42] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${isSchiz ? 'bg-purple-400' : 'bg-blue-400'}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="text-xs font-bold text-white">{a.distress ?? 0}/5</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Severity Index
// ─────────────────────────────────────────────────────────────────────────────
export function SeverityPage({ answers = [] }) {
  const endorsed = answers.filter(a => a.symptom === true);
  const totalDistress = endorsed.reduce((s, a) => s + (a.distress ?? 0), 0);
  const schizDistress = answers.filter(a => a.category === 'schizophrenia' && a.symptom === true).reduce((s, a) => s + (a.distress ?? 0), 0);
  const bipolarDistress = answers.filter(a => a.category === 'bipolar' && a.symptom === true).reduce((s, a) => s + (a.distress ?? 0), 0);

  const chartData = endorsed.map(a => ({
    name: `Q${a.id}`,
    distress: a.distress ?? 0,
    fill: a.category === 'schizophrenia' ? '#a78bfa' : '#60a5fa',
  }));

  const severityLabel = totalDistress >= 60 ? { label: 'Extreme', color: 'text-red-400' }
    : totalDistress >= 35 ? { label: 'Severe', color: 'text-orange-400' }
    : totalDistress >= 15 ? { label: 'Moderate', color: 'text-cyan-400' }
    : { label: 'Mild / None', color: 'text-green-400' };

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="Severity Index" subtitle="Combined distress severity analysis across all endorsed symptoms in both domains." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Distress', value: totalDistress, sub: 'out of 125 max', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', Icon: Activity },
          { label: 'Schizophrenia Distress', value: schizDistress, sub: `${endorsed.filter(a=>a.category==='schizophrenia').length} symptoms`, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', Icon: Brain },
          { label: 'Bipolar Distress', value: bipolarDistress, sub: `${endorsed.filter(a=>a.category==='bipolar').length} symptoms`, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', Icon: Zap },
        ].map(s => (
          <div key={s.label} className={`bg-[#182235]/65 border ${s.border} rounded-[20px] p-6 flex flex-col gap-3`}>
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
              <s.Icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">{s.label}</div>
            <div className={`text-4xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Severity level */}
      <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col gap-3">
        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Overall Severity Classification</div>
        <div className={`text-3xl font-black ${severityLabel.color}`}>{severityLabel.label}</div>
        <div className="h-3 bg-[#1d2b42] rounded-full overflow-hidden mt-1">
          <div className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-700" style={{ width: `${Math.min(Math.round((totalDistress / 125) * 100), 100)}%` }} />
        </div>
        <div className="text-xs text-slate-500 mt-1">{totalDistress}/125 ({Math.min(Math.round((totalDistress/125)*100), 100)}%)</div>
      </div>

      {/* Bar chart */}
      {chartData.length > 0 && (
        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6">
          <h3 className="text-sm font-bold text-white mb-5">Distress Per Endorsed Question</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#384F6E20" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 5]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <ChartTooltip contentStyle={{ background: '#182235', border: '1px solid #384F6E40', borderRadius: 10 }} labelStyle={{ color: '#e2e8f0', fontWeight: 700 }} itemStyle={{ color: '#94a3b8' }} />
              <Bar dataKey="distress" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-purple-400" /><span className="text-[11px] text-slate-400">Schizophrenia domain</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-400" /><span className="text-[11px] text-slate-400">Bipolar domain</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Clinical Insights
// ─────────────────────────────────────────────────────────────────────────────
export function InsightsPage({ schizCount, bipolarCount }) {
  const insights = [
    {
      title: 'Co-occurrence Patterns',
      icon: Layers, iconColor: 'text-yellow-400', iconBg: 'bg-yellow-500/10',
      body: 'When psychotic-like experiences and mood elevation co-occur, it may indicate schizoaffective features. Research shows up to 25% of individuals with bipolar disorder experience sub-threshold psychotic symptoms during mood episodes.',
    },
    {
      title: 'Schizophrenia Domain Interpretation',
      icon: Brain, iconColor: 'text-purple-400', iconBg: 'bg-purple-500/10',
      body: `You endorsed ${schizCount} of ${SCHIZ_TOTAL} schizophrenia-domain items. The PQ-16 clinical cut-off is 6+ endorsements for elevated psychotic-like experience risk. These items screen for perceptual, cognitive, and paranoid features.`,
    },
    {
      title: 'Bipolar Domain Interpretation',
      icon: Zap, iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10',
      body: `You endorsed ${bipolarCount} of ${BIPOLAR_TOTAL} bipolar-domain items. Items cover manic energy, sleep reduction, impulsivity, and mood cycling. A score of 5+ is considered a threshold for clinical follow-up.`,
    },
    {
      title: 'Stress & Trigger Sensitivity',
      icon: Wind, iconColor: 'text-green-400', iconBg: 'bg-green-500/10',
      body: 'Both psychotic-like experiences and mood episodes are frequently triggered or worsened by sleep deprivation, substance use, and chronic stress. Addressing these modifiable risk factors can significantly reduce symptom frequency.',
    },
    {
      title: 'Limitations of Self-Report',
      icon: HelpCircle, iconColor: 'text-slate-400', iconBg: 'bg-slate-500/10',
      body: 'Self-report screening tools capture subjective experience but cannot distinguish between clinical disorders, normal variation, or transient states. A licensed mental health professional should conduct a structured clinical interview for a diagnosis.',
    },
    {
      title: 'Positive Indicators',
      icon: Smile, iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10',
      body: 'Completing this assessment is a proactive step toward self-awareness and mental wellness. Early identification of risk factors allows for earlier intervention, which is consistently associated with improved long-term outcomes.',
    },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="Clinical Insights" subtitle="Dual-domain observations, co-occurrence patterns, and evidence-based context for your results." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map(ins => (
          <InfoCard key={ins.title} icon={ins.icon} iconColor={ins.iconColor} iconBg={ins.iconBg} title={ins.title}>
            <p className="text-sm text-slate-400 leading-relaxed">{ins.body}</p>
          </InfoCard>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. Recommendations
// ─────────────────────────────────────────────────────────────────────────────
export function RecommendationsPage({ schizCount, bipolarCount }) {
  const schizHigh   = schizCount >= 6;
  const bipolarHigh = bipolarCount >= 5;

  const sections = [
    {
      title: 'Grounding & Reality Anchoring',
      icon: Compass, iconColor: 'text-purple-400', iconBg: 'bg-purple-500/10',
      show: schizHigh,
      items: [
        '5-4-3-2-1 sensory grounding technique when feeling detached',
        'Keep a reality journal to distinguish thoughts from perceptions',
        'Limit sensory overload — reduce screen time and loud environments',
        'Practice mindful breathing for 10 minutes each morning',
        'Maintain a consistent daily schedule to anchor your routine',
      ],
    },
    {
      title: 'Mood Stabilisation',
      icon: Zap, iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10',
      show: bipolarHigh,
      items: [
        'Track your mood daily using a mood journal or app',
        'Establish a fixed sleep-wake schedule — even on weekends',
        'Avoid caffeine and alcohol which destabilise mood cycles',
        'Identify and plan around your personal mood triggers',
        'Build in buffer time before major decisions during elevated states',
      ],
    },
    {
      title: 'General Lifestyle Recommendations',
      icon: Heart, iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10',
      show: true,
      items: [
        '30 minutes of moderate aerobic exercise at least 5 days per week',
        'Eat a balanced, regular diet — skipped meals affect mood and cognition',
        'Limit alcohol and avoid recreational drugs entirely',
        'Maintain social connections — isolation worsens symptoms',
        'Seek professional support if symptoms affect daily functioning',
      ],
    },
    {
      title: 'Cognitive Strategies',
      icon: Brain, iconColor: 'text-yellow-400', iconBg: 'bg-yellow-500/10',
      show: true,
      items: [
        'Challenge catastrophic thoughts with evidence-based reframing',
        'Use the "double-check" technique before acting on strong beliefs',
        'Practice cognitive behavioural strategies for intrusive thoughts',
        'Keep a thought diary to spot patterns and triggers',
        'Try progressive muscle relaxation to reduce cognitive hyperactivity',
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="Recommendations" subtitle="Tailored evidence-based guidance covering both psychotic and mood spectrum domains." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.filter(s => s.show).map(s => (
          <InfoCard key={s.title} icon={s.icon} iconColor={s.iconColor} iconBg={s.iconBg} title={s.title}>
            <ul className="space-y-2.5">
              {s.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </InfoCard>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. Sleep Guidelines
// ─────────────────────────────────────────────────────────────────────────────
export function SleepPage() {
  const tips = [
    { time: 'Morning', icon: Sun, color: 'text-yellow-400', bg: 'bg-yellow-500/10', tips: ['Get 10–15 min natural light within 1 hour of waking', 'Avoid lying in bed after waking — it weakens sleep drive', 'Exercise in the morning to anchor your circadian clock'] },
    { time: 'Evening', icon: Moon, color: 'text-blue-400', bg: 'bg-blue-500/10', tips: ['Dim lights 2 hours before bedtime', 'Avoid screens 1 hour before sleep — use blue-light filter if needed', 'No caffeine after 2pm; avoid alcohol as a sleep aid'] },
    { time: 'Bedtime', icon: Heart, color: 'text-purple-400', bg: 'bg-purple-500/10', tips: ['Keep bedroom cool (16–19°C / 60–67°F)', 'Use 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s', 'If awake >20 min, leave bed and do a calm activity until sleepy'] },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="Sleep Guidelines" subtitle="Evidence-based sleep hygiene for psychotic-spectrum and mood disorder profiles." />
      <div className="bg-[#182235]/65 border border-blue-500/15 rounded-[20px] p-5 flex items-start gap-3 mb-2">
        <Moon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-slate-300 leading-relaxed">Sleep disturbance is a key trigger and early warning sign for both psychotic episodes and bipolar mood cycles. Consistent sleep hygiene is one of the most powerful tools for symptom management.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map(t => (
          <InfoCard key={t.time} icon={t.icon} iconColor={t.color} iconBg={t.bg} title={`${t.time} Routine`}>
            <ul className="space-y-2.5">
              {t.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </InfoCard>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. Stress Management
// ─────────────────────────────────────────────────────────────────────────────
export function StressPage() {
  const techniques = [
    { name: 'Box Breathing', icon: Wind, color: 'text-green-400', bg: 'bg-green-500/10', steps: ['Inhale for 4 counts', 'Hold for 4 counts', 'Exhale for 4 counts', 'Hold for 4 counts', 'Repeat 4–6 cycles'] },
    { name: 'Progressive Muscle Relaxation', icon: Heart, color: 'text-emerald-400', bg: 'bg-emerald-500/10', steps: ['Find a quiet, comfortable position', 'Tense each muscle group for 5s, then release', 'Work from feet upward to face', 'Notice the contrast between tension and release', 'Practise for 15–20 minutes daily'] },
    { name: '5-4-3-2-1 Grounding', icon: Compass, color: 'text-purple-400', bg: 'bg-purple-500/10', steps: ['Name 5 things you can see', 'Name 4 things you can touch', 'Name 3 things you can hear', 'Name 2 things you can smell', 'Name 1 thing you can taste'] },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="Stress Management" subtitle="Proven techniques to reduce cognitive load, ground perceptual disturbances, and stabilise mood." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {techniques.map(t => (
          <InfoCard key={t.name} icon={t.icon} iconColor={t.color} iconBg={t.bg} title={t.name}>
            <ol className="space-y-2">
              {t.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className={`text-[11px] font-black ${t.color} mt-0.5 w-4 flex-shrink-0`}>{i + 1}.</span>
                  <span className="text-sm text-slate-400 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </InfoCard>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. Daily Wellness
// ─────────────────────────────────────────────────────────────────────────────
export function WellnessPage() {
  const [checked, setChecked] = useState({});
  const habits = [
    { id: 'sleep',    label: 'Slept 7–9 hours last night',           icon: Moon },
    { id: 'water',    label: 'Drank ≥ 8 glasses of water today',     icon: Heart },
    { id: 'move',     label: 'Did 30 min of physical activity',       icon: Activity },
    { id: 'meds',     label: 'Took prescribed medications on time',   icon: CheckCircle },
    { id: 'mood',     label: 'Logged mood or journal entry today',    icon: FileText },
    { id: 'social',   label: 'Had a positive social interaction',     icon: Users },
    { id: 'screen',   label: 'Limited screen time before bed',        icon: Sun },
    { id: 'ground',   label: 'Practised a grounding technique today', icon: Compass },
  ];
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="Daily Wellness Habits" subtitle="Track your daily self-care activities to maintain stability across both domains." />
      <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-white">Today's Checklist</h3>
          <span className="text-sm font-black text-green-400">{done}/{habits.length} complete</span>
        </div>
        <div className="h-2 bg-[#1d2b42] rounded-full overflow-hidden mb-6">
          <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500" style={{ width: `${Math.round((done/habits.length)*100)}%` }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {habits.map(h => (
            <button key={h.id} onClick={() => setChecked(c => ({ ...c, [h.id]: !c[h.id] }))}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${checked[h.id] ? 'bg-green-500/10 border-green-500/30' : 'bg-[#1d2b42] border-[#384F6E]/20 hover:border-[#384F6E]/40'}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${checked[h.id] ? 'bg-green-500 border-green-500' : 'border-slate-500'}`}>
                {checked[h.id] && <CheckCircle className="w-3 h-3 text-white" />}
              </div>
              <h.icon className={`w-4 h-4 flex-shrink-0 ${checked[h.id] ? 'text-green-400' : 'text-slate-500'}`} />
              <span className={`text-sm leading-relaxed ${checked[h.id] ? 'text-white' : 'text-slate-400'}`}>{h.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. When to Seek Help
// ─────────────────────────────────────────────────────────────────────────────
export function SeekHelpPage() {
  const warningSchiz = [
    'Hearing voices or sounds that others cannot hear',
    'Seeing things that are not there',
    'Believing people are plotting against you without basis',
    'Feeling your thoughts are being controlled or broadcast',
    'Significant loss of motivation or emotional expression',
  ];
  const warningBipolar = [
    'Sleeping fewer than 3 hours but feeling fully rested',
    'Spending excessively or making reckless major decisions',
    'Thoughts racing so fast you cannot follow them',
    'Extended low mood with hopelessness or worthlessness',
    'Self-harm thoughts or thoughts of suicide — call emergency services immediately',
  ];
  const resources = [
    { name: 'iCall (India)', info: '9152987821 — Mon–Sat 8am–10pm', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { name: 'Vandrevala Foundation', info: '1860-2662-345 — 24/7 helpline', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { name: 'NIMHANS Helpline', info: '080-46110007 — National mental health', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { name: 'Snehi India', info: '+91 44-24640050 — Emotional support', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="When to Seek Help" subtitle="Critical warning signs and professional resources for both schizophrenia and bipolar domains." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#182235]/65 border border-purple-500/20 rounded-[20px] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-[10px] bg-purple-500/10 flex items-center justify-center"><Brain className="w-5 h-5 text-purple-400" /></div>
            <h3 className="text-base font-bold text-white">Schizophrenia Domain — Seek Help If</h3>
          </div>
          <ul className="space-y-2.5">
            {warningSchiz.map((w, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400 leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#182235]/65 border border-blue-500/20 rounded-[20px] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-[10px] bg-blue-500/10 flex items-center justify-center"><Zap className="w-5 h-5 text-blue-400" /></div>
            <h3 className="text-base font-bold text-white">Bipolar Domain — Seek Help If</h3>
          </div>
          <ul className="space-y-2.5">
            {warningBipolar.map((w, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400 leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6">
        <h3 className="text-sm font-bold text-white mb-5">Crisis &amp; Support Resources (India)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resources.map(r => (
            <div key={r.name} className={`${r.bg} border ${r.border} rounded-xl p-4`}>
              <div className={`text-xs font-extrabold uppercase tracking-widest ${r.color} mb-1`}>{r.name}</div>
              <div className="text-sm text-slate-300">{r.info}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. Download Report
// ─────────────────────────────────────────────────────────────────────────────
export function DownloadPage({ symptomsCount, schizCount, bipolarCount, totalDistress, patientName }) {
  const handlePrint = () => window.print();
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="Download Report" subtitle="Export a structured summary of your combined dual-domain screening results." />

      {/* Print Preview */}
      <div id="print-area" className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-8 space-y-6">
        <div className="border-b border-[#384F6E]/15 pb-5">
          <div className="text-[10px] text-purple-400 font-extrabold uppercase tracking-widest mb-1">MindWave Assessment Portal</div>
          <h2 className="text-2xl font-black text-white">Combined Mental Health Screening Report</h2>
          <div className="text-sm text-slate-400 mt-1">Patient: <strong className="text-white">{patientName}</strong> &nbsp;|&nbsp; Date: {today}</div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Symptoms', value: `${symptomsCount}/25`, color: 'text-white' },
            { label: 'Schizophrenia', value: `${schizCount}/13`, color: 'text-purple-400' },
            { label: 'Bipolar', value: `${bipolarCount}/12`, color: 'text-blue-400' },
            { label: 'Distress Score', value: totalDistress, color: 'text-yellow-400' },
          ].map(s => (
            <div key={s.label} className="bg-[#1d2b42] rounded-xl p-4">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{s.label}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="text-xs text-slate-500 leading-relaxed pt-4 border-t border-[#384F6E]/15">
          This report is for informational purposes only and does not constitute a clinical diagnosis. Consult a licensed mental health professional for a comprehensive evaluation. © {new Date().getFullYear()} MindWave Inc.
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full text-sm font-bold transition-all shadow-lg">
          <Printer className="w-4 h-4" /> Print / Save PDF
        </button>
        <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-3 bg-[#182235] hover:bg-[#1d2b42] text-slate-300 border border-[#384F6E]/30 rounded-full text-sm font-bold transition-all">
          <Share2 className="w-4 h-4" /> Share Results
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. Assessment History
// ─────────────────────────────────────────────────────────────────────────────
export function HistoryPage() {
  const history = (() => {
    try {
      const taken = localStorage.getItem('mindwave_combined_taken');
      if (!taken) return [];
      return [{
        date: localStorage.getItem('mindwave_combined_date') || 'Today',
        schiz: parseInt(localStorage.getItem('mindwave_combined_schizSymptoms') || '0'),
        bipolar: parseInt(localStorage.getItem('mindwave_combined_bipolarSymptoms') || '0'),
        total: parseInt(localStorage.getItem('mindwave_combined_symptomCount') || '0'),
        distress: parseInt(localStorage.getItem('mindwave_combined_totalExtent') || '0'),
      }];
    } catch { return []; }
  })();

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="Assessment History" subtitle="Track your combined screening results over time to monitor trends." />
      <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6">
        <h3 className="text-sm font-bold text-white mb-5">Past Screening Sessions</h3>
        {history.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No previous screening sessions recorded yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((h, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1d2b42] border border-[#384F6E]/20 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="text-sm font-bold text-white">{h.date}</span>
                </div>
                <div className="flex gap-4 text-xs">
                  <span className="text-purple-400 font-bold">Schiz: {h.schiz}/13</span>
                  <span className="text-blue-400 font-bold">Bipolar: {h.bipolar}/12</span>
                  <span className="text-yellow-400 font-bold">Distress: {h.distress}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 15. Retake
// ─────────────────────────────────────────────────────────────────────────────
export function RetakePage({ onRetake }) {
  return (
    <div className="flex flex-col gap-10 max-w-[1200px] w-full p-4 md:p-8 text-left">
      <PageHeader title="Retake Assessment" subtitle="Start a fresh combined screening to compare with your current results." />
      <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-8 flex flex-col items-center text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-slate-500/10 border border-slate-500/20 flex items-center justify-center">
          <RefreshCw className="w-10 h-10 text-slate-400" />
        </div>
        <div>
          <h3 className="text-xl font-black text-white mb-2">Ready to Retake?</h3>
          <p className="text-sm text-slate-400 leading-relaxed max-w-md">Your current results will remain in history. Taking the assessment again allows you to compare changes over time across both Schizophrenia and Bipolar domains.</p>
        </div>
        <button
          onClick={onRetake}
          className="flex items-center gap-2 px-8 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full text-sm font-bold transition-all shadow-lg"
        >
          <RefreshCw className="w-4 h-4" /> Start New Assessment
        </button>
      </div>
    </div>
  );
}
