import React from 'react';
import { 
  CheckCircle2, 
  Award, 
  BookOpen, 
  HeartHandshake, 
  Activity, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CLINIC_CONFIG } from '../data/config';
import { SectionHeader } from '../components/common/UIComponents';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden shadow-card border-4 border-white bg-slate-100 aspect-[4/5]">
            <img
              src={CLINIC_CONFIG.doctorPhotoUrl}
              alt={`${CLINIC_CONFIG.doctorName} - Physiotherapist`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-teal-300">
                Physiotherapist
              </span>
              <h2 className="text-2xl font-bold">{CLINIC_CONFIG.doctorName}</h2>
              <p className="text-xs text-slate-200 mt-0.5">{CLINIC_CONFIG.specialization}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <SectionHeader
            eyebrow="ABOUT RIYA MASTER"
            title="Empowering You to Move Freely and Live Without Pain"
            subtitle="I believe sustainable recovery happens when patients understand their symptoms, build resilience through movement, and become active partners in their own health."
            className="mb-4"
          />

          <p className="text-sm text-slate-600 leading-relaxed">
            Riya Master is a Bachelor of Physiotherapy (BPT) graduate with six months of clinical internship experience at a government hospital. She currently works as a physiotherapy treatment staff member at a clinic, supporting children and older adults as part of their physiotherapy care.
          </p>

          <p className="text-sm text-slate-600 leading-relaxed">
            With a patient-centered approach, Riya focuses on providing accessible and personalized physiotherapy guidance through online consultations while continuing to develop her clinical knowledge and professional experience.
          </p>

          {/* Credentials Display with Required Placeholders */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle">
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Qualification</span>
              <strong className="block text-xs text-brand-navy-900 mt-1">{CLINIC_CONFIG.qualification}</strong>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle">
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Specialization</span>
              <strong className="block text-xs text-brand-navy-900 mt-1">{CLINIC_CONFIG.specialization}</strong>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle">
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Experience</span>
              <strong className="block text-xs text-brand-navy-900 mt-1">{CLINIC_CONFIG.experienceYears}</strong>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle">
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Council Reg.</span>
              <strong className="block text-xs text-brand-navy-900 mt-1">{CLINIC_CONFIG.registrationDetails}</strong>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={() => navigateTo('book')}
              className="inline-flex items-center gap-2 bg-brand-teal-600 hover:bg-brand-teal-700 text-white text-sm font-semibold px-6 py-3.5 rounded-xl shadow-card transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation with Riya</span>
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="text-sm font-semibold text-brand-navy-900 hover:text-brand-teal-700"
            >
              Contact →
            </button>
          </div>
        </div>
      </div>

      {/* Clinical Philosophy Pillars */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-card space-y-8">
        <SectionHeader
          eyebrow="PHILOSOPHY OF CARE"
          title="How We Approach Your Rehabilitation"
          subtitle="Our core clinical standards ensure that every consultation is thorough, safe, and tailored to you."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-brand-navy-900">Active Movement as Medicine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Research clearly shows that active exercises, progressive tissue loading, and movement pacing provide longer-lasting relief than passive treatments alone. We give you the tools to heal yourself.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-brand-navy-900">Evidence-Informed Practice</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every exercise and ergonomic recommendation is grounded in current physiotherapy literature, contemporary pain neuroscience, and biomechanical principles.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-brand-navy-900">Realistic Lifestyle Integration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We design routines that respect your work hours, home setup, and family commitments so you can easily maintain your exercises without feeling overwhelmed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
