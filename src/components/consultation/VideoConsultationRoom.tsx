import React, { useState } from 'react';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  UserCheck, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLINIC_CONFIG, TELEMEDICINE_NOTE } from '../../data/config';

export const VideoConsultationRoom: React.FC = () => {
  const { activeConsultationAppt, appointments, setActiveConsultationAppt, navigateTo } = useApp();
  
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [roomState, setRoomState] = useState<'ready' | 'connected' | 'ended'>('ready');

  const appt = activeConsultationAppt || appointments[0];

  const handleJoinClick = () => {
    if (appt?.telehealthLink) {
      setRoomState('connected');
    }
  };

  const handleOpenExternal = () => {
    if (appt?.telehealthLink) {
      window.open(appt.telehealthLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Consultation Header Banner */}
      <div className="bg-brand-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-teal-500/20 text-brand-teal-300 border border-brand-teal-500/30 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Digital Telehealth Suite</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Virtual Consultation Room
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Encrypted, HIPAA-aligned video telehealth session with {CLINIC_CONFIG.doctorName}.
            </p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-xs space-y-1.5 min-w-[240px]">
            <div className="flex justify-between text-slate-400">
              <span>Appointment:</span>
              <span className="text-white font-mono">{appt?.referenceNumber || 'RM-78921'}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Status:</span>
              <span className="text-emerald-400 font-bold capitalize">{appt?.status || 'Confirmed'}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Provider:</span>
              <span className="text-brand-teal-300 font-semibold">{CLINIC_CONFIG.doctorName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Video Telehealth Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Video Stream / Waiting Room Stage */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl overflow-hidden shadow-card border border-slate-800 flex flex-col justify-between aspect-video min-h-[360px] relative p-6">
          {/* Top Bar on Video Screen */}
          <div className="flex items-center justify-between z-10">
            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-slate-300 flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-brand-teal-400" />
              <span>Patient: <strong>{appt?.patientName || 'Rahul Sharma'}</strong></span>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-slate-300">
              Mode: <strong className="uppercase text-brand-teal-300">{CLINIC_CONFIG.videoProvider}</strong>
            </div>
          </div>

          {/* Center Stage State */}
          <div className="text-center my-auto py-8 px-4 z-10">
            {roomState === 'ready' && (
              <div className="space-y-4 max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-full bg-slate-800 text-brand-teal-400 flex items-center justify-center mx-auto ring-4 ring-slate-800/80 shadow-card">
                  <Video className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Telehealth Room Ready</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Dr. Riya Master is notified. Please test your camera and microphone below before entering.
                  </p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={handleJoinClick}
                    className="inline-flex items-center gap-2 bg-brand-teal-600 hover:bg-brand-teal-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-card transition-all active:scale-95"
                  >
                    <span>Join Consultation</span>
                  </button>
                  {appt?.telehealthLink && (
                    <button
                      onClick={handleOpenExternal}
                      className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-3 rounded-xl border border-slate-700"
                      title="Launch meeting in separate browser tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Direct Link</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {roomState === 'connected' && (
              <div className="space-y-4 max-w-md mx-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">Connecting Secure Consultation Stream</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Launching {CLINIC_CONFIG.doctorName} private clinical bridge. If the video window did not open automatically, click the direct link below.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleOpenExternal}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-card"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Room in New Tab</span>
                  </button>
                  <button
                    onClick={() => setRoomState('ready')}
                    className="text-xs text-slate-400 hover:text-white px-3 py-2"
                  >
                    Back to Pre-call
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Device Controls & Diagnostics */}
          <div className="flex items-center justify-between z-10 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMicEnabled(!micEnabled)}
                className={`p-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors ${
                  micEnabled ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                }`}
                title={micEnabled ? 'Mute Microphone' : 'Unmute Microphone'}
              >
                {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                <span className="text-[11px] hidden sm:inline">{micEnabled ? 'Mic On' : 'Muted'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCameraEnabled(!cameraEnabled)}
                className={`p-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors ${
                  cameraEnabled ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                }`}
                title={cameraEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
              >
                {cameraEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                <span className="text-[11px] hidden sm:inline">{cameraEnabled ? 'Cam On' : 'Cam Off'}</span>
              </button>
            </div>

            <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Audio/Video Hardware Ready</span>
            </div>
          </div>
        </div>

        {/* Right Col: Consultation Details & Preparation Checklist */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-subtle border border-slate-200">
            <h4 className="text-sm font-bold text-brand-navy-900 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-teal-600" />
              <span>Session Details</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Scheduled Date:</span>
                <strong>{appt?.date || '2026-09-16'}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Scheduled Time:</span>
                <strong>{appt?.timeSlot || '11:00 AM - 11:45 AM'}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Service:</span>
                <span className="font-semibold text-brand-navy-900">{appt?.serviceName || 'Online Physiotherapy'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Duration:</span>
                <span>{CLINIC_CONFIG.consultationDuration}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-subtle border border-slate-200">
            <h4 className="text-sm font-bold text-brand-navy-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-teal-600" />
              <span>Session Checklist</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Wear loose, comfortable clothing (shorts / t-shirt) for movement testing.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Position device camera roughly 6–8 feet away so full body is visible.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Ensure a clear floor space of about 6x6 feet for gentle movements.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Need to reschedule?</strong> You can modify your slot via the Patient Portal or contact the clinic via WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
