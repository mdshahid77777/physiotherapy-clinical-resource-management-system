import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Activity, 
  Settings, 
  MessageSquare, 
  Sliders, 
  Plus, 
  Search,
  Filter,
  RefreshCw,
  Eye,
  ShieldCheck,
  Phone,
  Mail,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLINIC_CONFIG } from '../../data/config';
import { CLINIC_SERVICES } from '../../data/services';
import { Appointment } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    appointments, 
    updateAppointmentStatus, 
    contactMessages, 
    updateContactMessage,
    deleteContactMessage,
    intakeSubmissions,
    addToast,
    navigateTo,
    signOut,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'patients' | 'availability' | 'messages' | 'settings'>('overview');
  const [appointmentFilter, setAppointmentFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  // Availability state
  const [workingHours, setWorkingHours] = useState({
    start: '09:00 AM',
    end: '07:00 PM',
    slotDuration: '45 mins',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  });

  // Calculate Metrics
  const todayDate = new Date().toISOString().split('T')[0];
  const todayCount = appointments.filter(a => a.date === todayDate).length;
  const upcomingCount = appointments.filter(a => a.status === 'confirmed').length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const unreadInquiries = contactMessages.filter(m => m.status === 'NEW').length;

  const filteredAppointments = appointments.filter(appt => {
    const matchesStatus = appointmentFilter === 'all' || appt.status === appointmentFilter;
    const matchesSearch = 
      appt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.patientPhone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleApprove = (id: string) => {
    updateAppointmentStatus(id, 'confirmed');
    addToast('Booking confirmation notification dispatched to patient', 'success');
  };

  const handleCancel = (id: string) => {
    updateAppointmentStatus(id, 'cancelled');
    addToast('Cancellation notification dispatched to patient', 'info');
  };

  const handleComplete = (id: string) => {
    updateAppointmentStatus(id, 'completed');
    addToast('Consultation marked as completed', 'success');
  };

  const handleMessageStatus = async (id: string, status: 'READ' | 'REPLIED' | 'ARCHIVED') => {
    try {
      await updateContactMessage(id, status);
      addToast(`Message marked as ${status.toLowerCase()}`, 'success');
    } catch {
      addToast('Unable to update the message.', 'error');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Delete this enquiry permanently?')) return;
    try {
      await deleteContactMessage(id);
      if (selectedMessageId === id) setSelectedMessageId(null);
      addToast('Message deleted', 'info');
    } catch {
      addToast('Unable to delete the message.', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Admin Bar */}
      <div className="bg-brand-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-teal-500/20 text-brand-teal-300 border border-brand-teal-500/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Clinic Clinical Administration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Clinic Operations & Telehealth Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Logged in as: <strong className="text-white">{CLINIC_CONFIG.doctorName} (Staff Access)</strong> • Practice: {CLINIC_CONFIG.clinicName}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('book')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-teal-600 hover:bg-brand-teal-500 text-white shadow-subtle"
          >
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
          <button
            onClick={() => { signOut(); navigateTo('auth'); }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
          >
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'overview', label: 'Dashboard Metrics', icon: Sliders },
          { id: 'appointments', label: 'Appointments Manager', icon: Calendar, count: appointments.length },
          { id: 'patients', label: 'Patient Roster & Intakes', icon: Users, count: intakeSubmissions.length + 3 },
          { id: 'availability', label: 'Availability & Slots', icon: Clock },
          { id: 'messages', label: 'Inquiries Inbox', icon: MessageSquare, count: unreadInquiries },
          { id: 'settings', label: 'Clinic Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-brand-navy-900 text-white shadow-subtle'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-brand-teal-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 5 Core Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Today's Consults</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-navy-900">{todayCount}</span>
                <span className="text-xs font-semibold text-emerald-600">Active</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Upcoming Slots</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-navy-900">{upcomingCount}</span>
                <span className="text-xs font-semibold text-brand-teal-700">Confirmed</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Approval</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">{pendingCount}</span>
                <span className="text-xs font-semibold text-amber-600">Action req.</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Completed</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{completedCount}</span>
                <span className="text-xs font-semibold text-slate-400">Archived</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle col-span-2 lg:col-span-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">New Inquiries</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-sky-600">{unreadInquiries}</span>
                <span className="text-xs font-semibold text-sky-600">Unread</span>
              </div>
            </div>
          </div>

          {/* Quick Appointments Overview Table */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-brand-navy-900 text-base">Recent Patient Booking Queue</h3>
              <button
                onClick={() => setActiveTab('appointments')}
                className="text-xs font-bold text-brand-teal-700 hover:text-brand-teal-800"
              >
                View Complete Manager →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 uppercase text-[10px] font-bold text-slate-400 tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Ref Code</th>
                    <th className="py-3 px-4">Patient</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.slice(0, 4).map((appt) => (
                    <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{appt.referenceNumber}</td>
                      <td className="py-3.5 px-4">
                        <strong className="block text-brand-navy-900 text-xs">{appt.patientName}</strong>
                        <span className="text-[11px] text-slate-400">{appt.patientPhone}</span>
                      </td>
                      <td className="py-3.5 px-4">{appt.serviceName}</td>
                      <td className="py-3.5 px-4">
                        <span className="block font-semibold text-slate-700">{appt.date}</span>
                        <span className="text-[11px] text-slate-400">{appt.timeSlot}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          appt.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : appt.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : appt.status === 'completed'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {appt.status === 'pending' && (
                          <button
                            onClick={() => handleApprove(appt.id)}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-brand-teal-600 text-white hover:bg-brand-teal-700"
                          >
                            Approve
                          </button>
                        )}
                        {appt.status === 'confirmed' && (
                          <button
                            onClick={() => handleComplete(appt.id)}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
                          >
                            Mark Completed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPOINTMENTS FULL MANAGER */}
      {activeTab === 'appointments' && (
        <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-brand-navy-900">Consultation Schedule & Status Control</h3>
              <p className="text-xs text-slate-500 mt-0.5">Approve, cancel, reschedule, or review patient booking requests.</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setAppointmentFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    appointmentFilter === filter
                      ? 'bg-brand-teal-600 text-white shadow-subtle'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient name, phone, or reference number..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-teal-600"
            />
          </div>

          {/* Detailed Appointments Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 uppercase text-[10px] font-bold text-slate-400 tracking-wider">
                <tr>
                  <th className="py-3 px-4">Ref Code</th>
                  <th className="py-3 px-4">Patient & Concern</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Date & Slot</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-400 text-xs">
                      No appointments match the current filter.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{appt.referenceNumber}</td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <strong className="block text-brand-navy-900 text-xs">{appt.patientName}</strong>
                        <span className="text-[11px] text-slate-400">{appt.patientPhone} • {appt.patientEmail}</span>
                        {appt.primaryConcern && (
                          <p className="text-[11px] text-slate-500 mt-1 truncate">Concern: {appt.primaryConcern}</p>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">{appt.serviceName}</td>
                      <td className="py-3.5 px-4">
                        <span className="block font-semibold text-slate-800">{appt.date}</span>
                        <span className="text-[11px] text-slate-500">{appt.timeSlot}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="capitalize text-[11px] font-medium text-slate-600">
                          {appt.paymentStatus.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          appt.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : appt.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : appt.status === 'completed'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        {appt.status === 'pending' && (
                          <button
                            onClick={() => handleApprove(appt.id)}
                            className="px-2.5 py-1 rounded text-xs font-semibold bg-brand-teal-600 text-white hover:bg-brand-teal-700"
                          >
                            Approve
                          </button>
                        )}
                        {appt.status === 'confirmed' && (
                          <button
                            onClick={() => handleComplete(appt.id)}
                            className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
                          >
                            Complete
                          </button>
                        )}
                        {appt.status !== 'cancelled' && (
                          <button
                            onClick={() => handleCancel(appt.id)}
                            className="px-2 py-1 rounded text-xs font-medium text-rose-600 hover:bg-rose-50"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PATIENTS & INTAKES */}
      {activeTab === 'patients' && (
        <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-brand-navy-900">Patient Directory & Clinical Intake Submissions</h3>
            <p className="text-xs text-slate-500 mt-0.5">View patient clinical profiles, reported pain maps, and intake history.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Registered demo patients */}
            {[
              {
                name: 'Rahul Sharma',
                phone: '+91 98765 43210',
                email: 'rahul.sharma@example.com',
                condition: 'L4-L5 Disc Protrusion / Lumbar Strain',
                phase: 'Phase 2: Functional Loading',
                lastVisit: '10 Sep 2026',
              },
              {
                name: 'Neha Patel',
                phone: '+91 98221 09876',
                email: 'neha.patel@example.com',
                condition: 'Patellar Tendinopathy (Runner Knee)',
                phase: 'Phase 1: Eccentric Loading',
                lastVisit: 'Awaiting initial consult',
              },
              {
                name: 'Amit Desai',
                phone: '+91 97110 54321',
                email: 'amit.d@example.com',
                condition: 'Cervical Spine Stiffness & Posture',
                phase: 'Discharged / Maintenance',
                lastVisit: '14 Sep 2026',
              },
            ].map((p, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-brand-navy-900">{p.name}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal-800 bg-brand-teal-50 px-2 py-0.5 rounded border border-brand-teal-200">
                    {p.phase}
                  </span>
                </div>
                <p className="text-xs text-slate-600"><strong>Clinical Focus:</strong> {p.condition}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                  <span>Phone: {p.phone}</span>
                  <span>Last Visit: {p.lastVisit}</span>
                </div>
              </div>
            ))}

            {/* Any dynamically submitted intakes */}
            {intakeSubmissions.map((intake, i) => (
              <div key={i} className="p-4 rounded-xl border border-brand-teal-200 bg-brand-teal-50/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-brand-navy-900">{intake.fullName} (New Intake)</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Pain: {intake.painLevelCurrent}/10
                  </span>
                </div>
                <p className="text-xs text-slate-600"><strong>Complaint:</strong> {intake.primaryComplaint}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                  <span>Area: {intake.affectedBodyArea}</span>
                  <span>Goals: {intake.functionalGoals}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AVAILABILITY & SLOTS */}
      {activeTab === 'availability' && (
        <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-brand-navy-900">Telehealth Availability & Working Hours</h3>
            <p className="text-xs text-slate-500 mt-0.5">Configure consultation hours, appointment slot lengths, and block dates.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Day Start Time
              </label>
              <input
                type="text"
                value={workingHours.start}
                onChange={(e) => setWorkingHours(p => ({ ...p, start: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Day End Time
              </label>
              <input
                type="text"
                value={workingHours.end}
                onChange={(e) => setWorkingHours(p => ({ ...p, end: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Slot Duration
              </label>
              <select
                value={workingHours.slotDuration}
                onChange={(e) => setWorkingHours(p => ({ ...p, slotDuration: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="30 mins">30 minutes</option>
                <option value="45 mins">45 minutes</option>
                <option value="60 mins">60 minutes</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Active Consultation Working Days
            </label>
            <div className="flex flex-wrap gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                const isSelected = workingHours.workingDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      setWorkingHours(p => ({
                        ...p,
                        workingDays: isSelected
                          ? p.workingDays.filter(d => d !== day)
                          : [...p.workingDays, day]
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      isSelected
                        ? 'bg-brand-teal-600 text-white border-brand-teal-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => addToast('Availability settings updated successfully', 'success')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-teal-600 text-white hover:bg-brand-teal-700 shadow-subtle"
            >
              Save Schedule Settings
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: INQUIRIES INBOX */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-brand-navy-900">Website Patient Contact Inquiries</h3>
          
          <div className="divide-y divide-slate-100">
            {contactMessages.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-400">No contact messages received yet.</p>
            ) : (
              contactMessages.map((msg) => (
                  <div key={msg.id} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                    <strong className="text-brand-navy-900 text-sm">{msg.fullName || msg.name}</strong>
                    {msg.status === 'NEW' && (
                        <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 text-[9px] font-extrabold uppercase">
                          New
                        </span>
                      )}
                    <span className="text-xs text-slate-400">• {new Date(msg.createdAt || msg.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {msg.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {msg.phone}</span>
                    </div>
                    <p className={`${selectedMessageId === msg.id ? '' : 'truncate'} text-xs text-slate-700 pt-1 leading-relaxed max-w-2xl`}>{msg.message}</p>
                    <div className="flex items-center gap-2 pt-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">{msg.status}</span>
                      <button onClick={() => setSelectedMessageId(selectedMessageId === msg.id ? null : msg.id)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700">
                        <Eye className="w-3 h-3" /> {selectedMessageId === msg.id ? 'Hide' : 'Open'}
                      </button>
                      {msg.status === 'NEW' && <button onClick={() => handleMessageStatus(msg.id, 'READ')} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700">Mark Read</button>}
                      {msg.status !== 'REPLIED' && msg.status !== 'ARCHIVED' && <button onClick={() => handleMessageStatus(msg.id, 'REPLIED')} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-teal-50 hover:bg-brand-teal-100 text-brand-teal-800">Mark Replied</button>}
                      {msg.status !== 'ARCHIVED' && <button onClick={() => handleMessageStatus(msg.id, 'ARCHIVED')} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800">Archive</button>}
                      <button onClick={() => handleDeleteMessage(msg.id)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-700 hover:bg-rose-50"><Trash2 className="w-3 h-3" /> Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 6: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-brand-navy-900">Clinic Configuration & Integrations</h3>
            <p className="text-xs text-slate-500 mt-0.5">Central settings managed via <code className="text-brand-teal-700">src/data/config.ts</code></p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Lead Clinician:</span>
              <strong className="text-slate-800">{CLINIC_CONFIG.doctorName}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Practice Entity:</span>
              <strong className="text-slate-800">{CLINIC_CONFIG.clinicName}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Telehealth Video Provider:</span>
              <strong className="text-brand-teal-700 uppercase">{CLINIC_CONFIG.videoProvider}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Payment Gateway Adapter:</span>
              <span className="text-slate-600">Razorpay / Stripe (Ready in environment)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Standard Consultation Fee:</span>
              <strong className="text-brand-navy-900">{CLINIC_CONFIG.consultationFee}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
