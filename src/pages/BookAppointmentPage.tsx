import React, { useState } from 'react';
import { Calendar, FileText } from 'lucide-react';
import { BookingWizard } from '../components/booking/BookingWizard';
import { PatientIntakeForm } from '../components/intake/PatientIntakeForm';
import { SectionHeader } from '../components/common/UIComponents';

export const BookAppointmentPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'booking' | 'intake'>('booking');
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
    <SectionHeader eyebrow="APPOINTMENT RESERVATION" title="Schedule Your Physiotherapy Appointment" subtitle="Choose an appointment type, date, 30-minute time slot, patient details, and online payment method." centered />
    <div className="flex justify-center"><div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 border border-slate-200"><button onClick={() => setActiveView('booking')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold ${activeView === 'booking' ? 'bg-white text-brand-navy-900 shadow-subtle' : 'text-slate-600'}`}><Calendar className="w-4 h-4 text-brand-teal-600" /> 1. Book Consultation Slot</button><button onClick={() => setActiveView('intake')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold ${activeView === 'intake' ? 'bg-white text-brand-navy-900 shadow-subtle' : 'text-slate-600'}`}><FileText className="w-4 h-4 text-brand-teal-600" /> 2. Patient Clinical Intake Form</button></div></div>
    {activeView === 'booking' ? <BookingWizard /> : <div className="space-y-6"><div className="max-w-2xl mx-auto text-center"><h3 className="text-xl font-bold">Patient Pre-Consultation Intake</h3><p className="text-xs text-slate-500 mt-1">Demo intake flow restored for the existing application experience.</p></div><PatientIntakeForm /></div>}
  </div>;
};
