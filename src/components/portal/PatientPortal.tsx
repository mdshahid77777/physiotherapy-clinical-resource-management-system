import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Activity, 
  CheckCircle2, 
  Circle, 
  Video, 
  FileText, 
  MessageSquare, 
  User, 
  AlertCircle,
  ChevronRight,
  Shield,
  TrendingUp,
  RefreshCw,
  Send,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLINIC_CONFIG } from '../../data/config';
import { Exercise } from '../../types';

export const PatientPortal: React.FC = () => {
  const { 
    currentPatient, 
    patientExercises, 
    toggleExerciseCompletion, 
    appointments, 
    updateAppointmentStatus,
    navigateTo,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'exercises' | 'treatment' | 'history' | 'messages'>('overview');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'patient' | 'doctor'; text: string; time: string }[]>([
    {
      sender: 'doctor',
      text: 'Hello Rahul! How is the lower back feeling following the glute bridges and cat-cow routine?',
      time: 'Yesterday at 4:30 PM'
    },
    {
      sender: 'patient',
      text: 'Morning stiffness is noticeably less! Had a slight pinch when doing bird dogs on the left side though.',
      time: 'Yesterday at 6:15 PM'
    },
    {
      sender: 'doctor',
      text: 'Great to hear morning stiffness has reduced. For bird dogs, reduce leg elevation height slightly and keep your core braced. We will review form in our next video check-in.',
      time: 'Today at 9:00 AM'
    }
  ]);

  const upcomingAppt = appointments.find(a => a.status === 'confirmed' || a.status === 'pending');

  const completedCount = patientExercises.filter(e => e.completed).length;
  const totalCount = patientExercises.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { sender: 'patient', text: messageInput, time: 'Just now' }
    ]);
    setMessageInput('');
    addToast('Message sent to Dr. Riya Master Clinic', 'success');
  };

  const handleCancelAppt = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this consultation appointment?')) {
      updateAppointmentStatus(id, 'cancelled');
    }
  };

  const handleRescheduleAppt = () => {
    navigateTo('book');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Patient Greeting & Status Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-teal-50 text-brand-teal-800 border border-brand-teal-200/60 mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Active Rehabilitation Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy-900">
            Welcome back, {currentPatient.name}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Care Lead: <strong className="text-brand-navy-900">{CLINIC_CONFIG.doctorName}</strong> • Patient ID: <span className="font-mono">PT-9812</span>
          </p>
        </div>

        {/* Quick Progress Dial */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-brand-teal-600 transition-all duration-500"
                strokeDasharray={`${progressPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-extrabold text-brand-navy-900">{progressPercent}%</span>
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Daily Rehab Goal</span>
            <strong className="block text-sm text-brand-navy-900">{completedCount} of {totalCount} exercises completed</strong>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'overview', label: 'Overview', icon: User },
          { id: 'exercises', label: 'Exercise Plan', icon: Activity, count: `${completedCount}/${totalCount}` },
          { id: 'treatment', label: 'Treatment Roadmap', icon: TrendingUp },
          { id: 'history', label: 'Past Sessions', icon: FileText },
          { id: 'messages', label: 'Messages', icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-brand-teal-600 text-white shadow-subtle'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-brand-teal-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointment Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200/80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-brand-navy-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-teal-600" />
                  <span>Next Scheduled Consultation</span>
                </h3>
                {upcomingAppt && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {upcomingAppt.status}
                  </span>
                )}
              </div>

              {upcomingAppt ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-base text-brand-navy-900">{upcomingAppt.serviceName}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Consultant: {CLINIC_CONFIG.doctorName}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs font-semibold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-brand-teal-600" />
                          {upcomingAppt.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-brand-teal-600" />
                          {upcomingAppt.timeSlot}
                        </span>
                      </div>
                    </div>

                    {/* Actions: Join, Reschedule, Cancel */}
                    <div className="flex flex-wrap sm:flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => navigateTo('video-room')}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-teal-600 text-white hover:bg-brand-teal-700 shadow-subtle"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Room</span>
                      </button>
                      <button
                        onClick={handleRescheduleAppt}
                        className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                      >
                        <span>Reschedule</span>
                      </button>
                      <button
                        onClick={() => handleCancelAppt(upcomingAppt.id)}
                        className="inline-flex items-center justify-center text-xs font-medium text-rose-600 hover:text-rose-700 py-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center justify-between">
                    <span>Reference ID: <strong>{upcomingAppt.referenceNumber}</strong></span>
                    <span className="text-brand-teal-700 font-medium">Video link will open 5 minutes prior to session</span>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-sm text-slate-500">No upcoming appointments scheduled.</p>
                  <button
                    onClick={() => navigateTo('book')}
                    className="mt-3 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-teal-600 text-white hover:bg-brand-teal-700"
                  >
                    Book New Consultation
                  </button>
                </div>
              )}
            </div>

            {/* Quick Exercise Summary Card */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-brand-navy-900">Today's Prescribed Exercises</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Click any checkmark to update your progress for Dr. Riya.</p>
                </div>
                <button
                  onClick={() => setActiveTab('exercises')}
                  className="text-xs font-bold text-brand-teal-700 hover:text-brand-teal-800 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {patientExercises.slice(0, 3).map((ex) => (
                  <div
                    key={ex.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      ex.completed
                        ? 'border-emerald-200 bg-emerald-50/40'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleExerciseCompletion(ex.id)}
                        className={`p-1 rounded-full ${ex.completed ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                        aria-label={`Mark ${ex.title} as ${ex.completed ? 'incomplete' : 'completed'}`}
                      >
                        {ex.completed ? <CheckCircle2 className="w-5 h-5 fill-emerald-100" /> : <Circle className="w-5 h-5" />}
                      </button>
                      <div>
                        <h4 className={`text-sm font-semibold ${ex.completed ? 'text-slate-600 line-through' : 'text-brand-navy-900'}`}>
                          {ex.title}
                        </h4>
                        <span className="text-xs text-slate-500">
                          {ex.sets} sets × {ex.reps} • {ex.duration}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-brand-teal-700 bg-brand-teal-50 px-2 py-0.5 rounded border border-brand-teal-200">
                      {ex.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Clinical Milestones & Quick Contact */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200/80">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                Current Care Phase
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-brand-teal-50 border border-brand-teal-200/70">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-teal-800">
                    Phase 2: Functional Loading
                  </span>
                  <p className="text-xs text-brand-navy-900 mt-1 font-medium">
                    Restoring lumbar active tolerance and gluteal endurance.
                  </p>
                </div>
                <div className="text-xs text-slate-500 space-y-1.5 pt-1">
                  <div className="flex justify-between">
                    <span>Initial Assessment:</span>
                    <strong className="text-slate-800">Completed</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Symptom Trend:</span>
                    <span className="text-emerald-600 font-bold">Improving (+40%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Review:</span>
                    <strong className="text-slate-800">16 Sep 2026</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-navy-900 text-white rounded-2xl p-6 shadow-card">
              <h3 className="text-base font-bold mb-2">Need Guidance?</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Leave a message for Dr. Riya Master or request an urgent check-in if you experience sudden symptoms.
              </p>
              <button
                onClick={() => setActiveTab('messages')}
                className="w-full py-2.5 rounded-xl bg-brand-teal-600 hover:bg-brand-teal-500 text-white text-xs font-bold transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXERCISE PLAN (Detailed Interactive View) */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-card border border-slate-200">
            <div>
              <h3 className="text-xl font-bold text-brand-navy-900">Your Rehabilitation Plan</h3>
              <p className="text-xs text-slate-500 mt-1">
                Prescribed by Dr. Riya Master. Updated for Phase 2: Mobility & Functional Strength.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-brand-teal-800 bg-brand-teal-50 px-3 py-1.5 rounded-xl border border-brand-teal-200">
                {completedCount} of {totalCount} exercises completed
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patientExercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
                  exercise.completed
                    ? 'border-emerald-300 shadow-subtle ring-1 ring-emerald-200'
                    : 'border-slate-200 shadow-card hover:border-slate-300'
                }`}
              >
                {/* Exercise Media Header */}
                <div className="relative h-44 bg-slate-800 overflow-hidden">
                  <img
                    src={exercise.videoThumbnail}
                    alt={exercise.title}
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                      {exercise.category}
                    </span>
                    <button
                      onClick={() => toggleExerciseCompletion(exercise.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition-all ${
                        exercise.completed
                          ? 'bg-emerald-500 text-white shadow-card'
                          : 'bg-white/90 text-slate-800 hover:bg-white'
                      }`}
                    >
                      {exercise.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                      <span>{exercise.completed ? 'Done' : 'Mark Done'}</span>
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-bold text-base leading-snug">{exercise.title}</h4>
                    <p className="text-xs text-slate-300 mt-0.5">Target: {exercise.targetRegion}</p>
                  </div>
                </div>

                {/* Prescription Parameters */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center text-xs">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Sets</span>
                      <strong className="text-brand-navy-900">{exercise.sets}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Reps / Hold</span>
                      <strong className="text-brand-navy-900">{exercise.reps}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Frequency</span>
                      <strong className="text-brand-navy-900 text-[11px] truncate">{exercise.frequency}</strong>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Technique Instructions:
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {exercise.instructions.map((ins, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-brand-teal-600 font-bold">•</span>
                          <span>{ins}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Safety Notes */}
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900">
                    <strong className="font-semibold">Safety Cue:</strong> {exercise.safetyNotes.join(' ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TREATMENT ROADMAP */}
      {activeTab === 'treatment' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-brand-navy-900">Personalized Rehabilitation Roadmap</h3>
            <p className="text-sm text-slate-500 mt-1">
              Phased timeline engineered to safely progress from symptom control to full functional activity.
            </p>
          </div>

          <div className="space-y-6 border-l-2 border-brand-teal-200 pl-6 ml-3">
            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Phase 1 — Completed
              </span>
              <h4 className="text-base font-bold text-brand-navy-900 mt-1">Acute Pain Mitigation & Ergonomic Offloading</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Workstation modifications, gentle active lumbar flexion-extension flows, and desensitization of protective spasms.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-brand-teal-600 ring-4 ring-brand-teal-100" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-teal-800 bg-brand-teal-50 px-2.5 py-0.5 rounded border border-brand-teal-200">
                Phase 2 — Active Current Phase
              </span>
              <h4 className="text-base font-bold text-brand-navy-900 mt-1">Spinal Stability & Gluteal Muscle Recruitment</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Progressing isometric bridges, bird-dog endurance, and deep cervical posture pacing. Re-assessment scheduled for 16 Sep 2026.
              </p>
            </div>

            <div className="relative opacity-60">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-slate-100" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded">
                Phase 3 — Upcoming
              </span>
              <h4 className="text-base font-bold text-brand-navy-900 mt-1">Dynamic Loading, Sport Conditioning & Independent Maintenance</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Return to running protocols, rotational power training, and graduation to lifetime spinal hygiene routine.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-4">
          <h3 className="text-xl font-bold text-brand-navy-900">Consultation Session History</h3>
          <div className="divide-y divide-slate-100">
            <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400">10 Sep 2026 • 05:30 PM</span>
                <h4 className="font-bold text-brand-navy-900 text-sm">Initial Telehealth Functional Movement Evaluation</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Conducted by Dr. Riya Master. Identified mild L4-L5 directional sensitivity and restricted hip extension.
                </p>
              </div>
              <button
                onClick={() => addToast('Clinical consultation summary downloaded', 'info')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-teal-700 bg-brand-teal-50 hover:bg-brand-teal-100 px-3 py-1.5 rounded-lg border border-brand-teal-200 self-start sm:self-center"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Clinical Notes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MESSAGES */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 flex flex-col h-[520px]">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="font-bold text-brand-navy-900 text-base">Direct Clinical Inquiry Channel</h3>
            <p className="text-xs text-slate-500">Non-urgent asynchronous messaging with Dr. Riya Master.</p>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === 'patient' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'patient'
                      ? 'bg-brand-teal-600 text-white rounded-br-none'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Ask Dr. Riya about an exercise, pain response, or milestone..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-teal-600"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-brand-teal-600 hover:bg-brand-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-subtle"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
