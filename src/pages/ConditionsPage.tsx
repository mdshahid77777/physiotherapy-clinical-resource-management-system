import React, { useState } from 'react';
import { 
  Search, 
  ChevronRight, 
  HelpCircle, 
  ShieldAlert, 
  Activity, 
  Calendar,
  CheckCircle,
  Lightbulb
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CLINIC_CONDITIONS } from '../data/conditions';
import { SectionHeader } from '../components/common/UIComponents';
import { TELEMEDICINE_NOTE, EMERGENCY_NOTICE } from '../data/config';

export const ConditionsPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedConditionId, setExpandedConditionId] = useState<string | null>(null);

  const filteredConditions = CLINIC_CONDITIONS.filter((cond) => {
    const matchesSearch = 
      cond.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cond.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cond.commonSymptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || cond.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      <SectionHeader
        eyebrow="SYMPTOM & CONDITION DIRECTORY"
        title="Condition and Symptom Information for Review"
        subtitle="This educational, non-diagnostic directory is retained for navigation. Specific conditions and treatments Riya wants to advertise remain subject to confirmation."
        centered
      />

      {/* Educational Non-Diagnostic Banner */}
      <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Non-Diagnostic Disclaimer:</strong> Information presented here is for educational guidance and to help you communicate with your healthcare provider. A formal clinical history and assessment with Dr. Riya Master is required to determine the exact mechanical factors involved in your case. {EMERGENCY_NOTICE.body}
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search symptoms, body regions, or conditions (e.g. neck stiffness, knee, posture)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-brand-teal-600 shadow-subtle"
          />
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          {['All', 'Spine', 'Joints', 'Sports', 'Posture & Work', 'Rehabilitation', 'Mobility'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-teal-600 text-white shadow-subtle'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Condition Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConditions.map((condition) => {
          const isExpanded = expandedConditionId === condition.id;
          return (
            <div
              key={condition.id}
              className="bg-white rounded-2xl p-6 shadow-card border border-slate-200/80 flex flex-col justify-between hover:border-brand-teal-400 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal-800 bg-brand-teal-50 px-2.5 py-0.5 rounded border border-brand-teal-200">
                    {condition.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-navy-900 leading-snug">
                    {condition.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {condition.shortDescription}
                  </p>
                </div>

                {/* Common concerns */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Common Concerns & Symptoms:
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {condition.commonSymptoms.slice(0, 2).map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-slate-400">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* When Physiotherapy May Help */}
                <div className="p-3 rounded-xl bg-brand-teal-50/50 border border-brand-teal-100 text-xs text-slate-700">
                  <strong className="block text-[11px] uppercase font-bold text-brand-teal-800 mb-1">
                    When Physiotherapy May Help:
                  </strong>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {condition.whenPhysioHelps[0]}
                  </p>
                </div>

                {/* Ergonomic & Self-Care tips on expand */}
                {isExpanded && (
                  <div className="pt-2 border-t border-slate-100 text-xs space-y-2 animate-fadeIn">
                    <strong className="block text-[11px] uppercase font-bold text-slate-500">
                      Ergonomic Guidance:
                    </strong>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      {condition.ergonomicTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setExpandedConditionId(isExpanded ? null : condition.id)}
                  className="text-xs font-semibold text-brand-teal-700 hover:text-brand-teal-800"
                >
                  {isExpanded ? 'Show Less' : 'Self-Care Tips'}
                </button>
                <button
                  onClick={() => navigateTo('book')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand-navy-900 text-white hover:bg-brand-navy-800 shadow-subtle transition-all"
                >
                  Discuss Your Concern
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
