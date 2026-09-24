import React from 'react';
import { 
  Video, 
  Calendar, 
  FileText, 
  Activity, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight,
  MonitorCheck,
  Headphones,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CLINIC_CONFIG, TELEMEDICINE_NOTE, EMERGENCY_NOTICE } from '../data/config';
import { SectionHeader } from '../components/common/UIComponents';

export const OnlineConsultationPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-teal-50 text-brand-teal-800 border border-brand-teal-200/70">
          <Video className="w-3.5 h-3.5 text-brand-teal-600" />
          <span>VIRTUAL TELE-REHABILITATION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy-900 tracking-tight leading-tight">
          Online Physiotherapy Consultation
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          High-definition video consultations designed to accurately assess movement restrictions, relieve pain, and build customized rehabilitation protocols.
        </p>
      </div>

      {/* 4 Steps Journey */}
      <div className="space-y-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-teal-700">THE DIGITAL PATIENT JOURNEY</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy-900 mt-1">
            How Your Online Consultation Works in 4 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Book Your Appointment',
              desc: 'Appointment dates, time slots, and confirmation rules are being finalized.',
              icon: Calendar,
            },
            {
              num: '02',
              title: 'Tell Us About Your Concern',
              desc: 'Patient details and consultation information will be collected once the privacy and intake process is approved.',
              icon: FileText,
            },
            {
              num: '03',
              title: 'Meet Riya Online',
              desc: 'The video provider and consultation process will be confirmed before launch.',
              icon: Video,
            },
            {
              num: '04',
              title: 'Receive Your Personalized Plan',
              desc: 'Access your video-based exercise protocol in the patient portal, track daily completed sets, and maintain communication between sessions.',
              icon: Activity,
            },
          ].map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200/80 flex flex-col justify-between hover:border-brand-teal-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-brand-teal-600 font-mono">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-brand-navy-900 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigateTo('book')}
            className="inline-flex items-center gap-2 bg-brand-teal-600 hover:bg-brand-teal-700 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-card transition-all active:scale-95"
          >
            <span>Start Your Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Equipment & Setup Checklist */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-200/80">
        <SectionHeader
          eyebrow="PREPARATION"
          title="What You Need for a Seamless Online Session"
          subtitle="Simple requirements to get the maximum clinical benefit out of your virtual physiotherapy consultation."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-brand-teal-100 text-brand-teal-800 flex items-center justify-center mb-3">
              <MonitorCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-brand-navy-900 mb-1">Device with Camera</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A laptop, tablet, or smartphone positioned with camera at roughly chest height, about 6–8 feet away so your full body can be seen during movement checks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-brand-teal-100 text-brand-teal-800 flex items-center justify-center mb-3">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-brand-navy-900 mb-1">Comfortable Clothing & Space</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Wear flexible clothing (shorts/t-shirt) allowing joint visualization. Ensure a clear 6x6 feet space where you can comfortably stand, bend, or lie down.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-brand-teal-100 text-brand-teal-800 flex items-center justify-center mb-3">
              <Headphones className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-brand-navy-900 mb-1">Quiet & Lit Environment</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A well-lit, quiet room ensures clear audio and video so Dr. Riya can accurately evaluate spinal alignment and exercise technique without distortion.
            </p>
          </div>
        </div>
      </div>

      {/* Safety & Telehealth Limitations Notice */}
      <div className="p-6 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs text-sky-950 flex items-start gap-3.5 leading-relaxed">
        <HelpCircle className="w-5 h-5 text-sky-700 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-sky-900 font-bold">{TELEMEDICINE_NOTE.title}:</strong> {TELEMEDICINE_NOTE.body} {EMERGENCY_NOTICE.body}
        </div>
      </div>
    </div>
  );
};
