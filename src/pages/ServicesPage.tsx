import React, { useState } from 'react';
import { 
  Activity, 
  Video, 
  HeartPulse, 
  Trophy, 
  ShieldCheck, 
  Laptop, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CLINIC_SERVICES } from '../data/services';
import { SectionHeader } from '../components/common/UIComponents';

export const ServicesPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [filterMode, setFilterMode] = useState<'all' | 'online' | 'both'>('all');

  const filteredServices = CLINIC_SERVICES.filter((svc) => {
    if (filterMode === 'online') return svc.mode === 'online' || svc.mode === 'both';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      <SectionHeader
        eyebrow="PHYSIOTHERAPY SERVICES"
        title="Physiotherapy Services and Appointment Options"
        subtitle="Online consultation is the primary service. Additional service cards remain visible for continuity and are marked as information to review before publication."
        centered
      />

      <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
        Only online physiotherapy consultation, in-person appointments at the clinic where Riya currently works, support for children and older adults, and home visits subject to location and confirmation have been confirmed. Other cards below are retained as review placeholders.
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setFilterMode('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterMode === 'all'
              ? 'bg-brand-teal-600 text-white shadow-subtle'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Online Consultation
        </button>
        <button
          onClick={() => setFilterMode('online')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterMode === 'online'
              ? 'bg-brand-teal-600 text-white shadow-subtle'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Online Focus
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200/80 flex flex-col justify-between hover:shadow-card-hover transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                {service.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-teal-100 text-brand-teal-800">
                    {service.badge}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-brand-navy-900 leading-snug">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Ideal for bullets */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Frequently Recommended For:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {service.idealFor.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-teal-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Duration: {service.sessionDuration}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigateTo('book')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-teal-600 hover:bg-brand-teal-700 text-white shadow-subtle transition-all"
                >
                  Book Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
