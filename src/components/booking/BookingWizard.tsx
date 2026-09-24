import React, { useState } from 'react';
import {
  Calendar,
  Building2,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  Phone,
  ShieldCheck,
  User,
  Video,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BOOKABLE_SERVICES } from '../../data/services';
import { Appointment } from '../../types';

interface BookingFormData {
  serviceId: string;
  serviceName: string;
  fee: number;
  date: string;
  timeSlot: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  dob: string;
  primaryConcern: string;
  preferredLanguage: string;
  additionalNotes: string;
  consentAgreed: boolean;
}

const stepLabels = ['Appointment Type', 'Date', 'Time', 'Patient Info', 'Review & Pay'];
const stepIcons = [Calendar, Calendar, Clock, User, CreditCard];

const availableDates = Array.from({ length: 7 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() + index);
  return {
    date: date.toISOString().slice(0, 10),
    dayName: date.toLocaleDateString('en-IN', { weekday: 'short' }),
    dayNum: date.toLocaleDateString('en-IN', { day: 'numeric' }),
    isAvailable: date.getDay() !== 0,
  };
});

const timeSlots = [
  '09:00 AM - 09:30 AM',
  '09:30 AM - 10:00 AM',
  '10:00 AM - 10:30 AM',
  '10:30 AM - 11:00 AM',
  '11:00 AM - 11:30 AM',
  '11:30 AM - 12:00 PM',
  '12:00 PM - 12:30 PM',
  '12:30 PM - 01:00 PM',
];

export const BookingWizard: React.FC = () => {
  const { bookAppointment, navigateTo, selectedServiceId } = useApp();
  const selectedService = BOOKABLE_SERVICES.find(item => item.id === selectedServiceId) || BOOKABLE_SERVICES[0];
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: selectedService.id,
    serviceName: selectedService.title,
    fee: selectedService.price || 150,
    date: availableDates.find(item => item.isAvailable)?.date || '',
    timeSlot: '11:00 AM - 11:30 AM',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    dob: '',
    primaryConcern: '',
    preferredLanguage: 'English',
    additionalNotes: '',
    consentAgreed: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  const update = (field: keyof BookingFormData, value: string | boolean | number) => {
    setFormData(previous => ({ ...previous, [field]: value }));
  };

  const validateDetails = () => {
    const next: Record<string, string> = {};
    if (!formData.patientName.trim()) next.patientName = 'Full name is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.patientEmail)) next.patientEmail = 'Valid email address is required';
    if (formData.patientPhone.trim().length < 8) next.patientPhone = 'Valid contact phone number is required';
    if (!formData.dob) next.dob = 'Date of birth is required';
    if (!formData.primaryConcern.trim()) next.primaryConcern = 'Please describe your reason for consultation';
    if (!formData.consentAgreed) next.consentAgreed = 'Please agree to the telehealth consent terms';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1 && !formData.serviceId) return setErrors({ serviceId: 'Please select an appointment type' });
    if (currentStep === 2 && !formData.date) return setErrors({ date: 'Please select a date' });
    if (currentStep === 3 && !formData.timeSlot) return setErrors({ timeSlot: 'Please select a time slot' });
    if (currentStep === 4 && !validateDetails()) return;
    setCurrentStep(step => step + 1);
    setErrors({});
  };

  const goToCompletedStep = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
      setErrors({});
    }
  };

  const submit = () => {
    setIsSubmitting(true);
    window.setTimeout(() => {
      const appointment = bookAppointment({ ...formData, paymentStatus: 'unpaid' });
      setConfirmedAppt(appointment);
      setIsSubmitting(false);
      setCurrentStep(6);
    }, 500);
  };

  const downloadCalendar = () => {
    if (!confirmedAppt) return;
    const content = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:${confirmedAppt.referenceNumber}\nSUMMARY:${confirmedAppt.serviceName}\nDTSTART:${confirmedAppt.date.replace(/-/g, '')}T090000\nDURATION:PT30M\nLOCATION:${confirmedAppt.serviceName}\nEND:VEVENT\nEND:VCALENDAR`;
    const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `appointment-${confirmedAppt.referenceNumber}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const back = () => setCurrentStep(step => Math.max(1, step - 1));
  const inputClass = (key: string) => `w-full px-3.5 py-2.5 rounded-xl border text-sm ${errors[key] ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-brand-teal-600'}`;
  const isOnline = formData.serviceId === 'online-consultation';
  const appointmentIcon = (serviceId: string) => serviceId === 'online-consultation' ? Video : Building2;

  const renderStepper = () => (
    <div className="mb-8" aria-label="Booking progress">
      <div className="hidden sm:flex items-start w-full">
        {stepLabels.map((label, index) => {
          const step = index + 1;
          const completed = step < currentStep;
          const active = step === currentStep;
          const StepIcon = stepIcons[index];
          const StepControl = completed ? 'button' : 'div';
          return (
            <React.Fragment key={label}>
              <div className="flex min-w-0 flex-1 flex-col items-center">
                <StepControl
                  {...(completed ? { type: 'button', onClick: () => goToCompletedStep(step) } : {})}
                  className={`group flex flex-col items-center gap-2 rounded-xl px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-600 focus-visible:ring-offset-2 ${completed ? 'cursor-pointer' : active ? 'cursor-default' : 'cursor-not-allowed'}`}
                  aria-label={`${label}, ${completed ? 'completed, go back to edit' : active ? 'current step' : 'upcoming and unavailable'}`}
                  aria-current={active ? 'step' : undefined}
                  aria-disabled={!completed && !active ? true : undefined}
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${completed || active ? 'border-brand-teal-600 bg-brand-teal-600 text-white' : 'border-slate-300 bg-slate-100 text-slate-500'} ${completed ? 'group-hover:bg-brand-teal-700' : ''}`}>
                    {completed ? <Check className="h-5 w-5" aria-hidden="true" /> : <span>{step}</span>}
                  </span>
                  <span className={`text-center text-xs font-semibold leading-tight ${active ? 'text-brand-teal-800' : completed ? 'text-slate-700' : 'text-slate-400'}`}>{label}</span>
                  <span className="sr-only"><StepIcon aria-hidden="true" /></span>
                </StepControl>
              </div>
              {step < stepLabels.length && <div className={`mt-5 h-0.5 flex-1 rounded-full transition-colors ${step < currentStep ? 'bg-brand-teal-600' : 'bg-slate-200'}`} aria-hidden="true" />}
            </React.Fragment>
          );
        })}
      </div>
      <div className="sm:hidden">
        <div className="flex items-center gap-1" aria-hidden="true">
          {stepLabels.map((label, index) => {
            const step = index + 1;
            return <React.Fragment key={label}><div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${step <= currentStep ? 'border-brand-teal-600 bg-brand-teal-600 text-white' : 'border-slate-300 bg-slate-100 text-slate-500'}`}>{step < currentStep ? <Check className="h-4 w-4" /> : step}</div>{step < stepLabels.length && <div className={`h-0.5 min-w-0 flex-1 rounded-full ${step < currentStep ? 'bg-brand-teal-600' : 'bg-slate-200'}`} />}</React.Fragment>;
          })}
        </div>
        <p className="mt-3 text-center text-xs font-semibold text-slate-500">Step {currentStep} of 5</p>
        <p className="text-center text-base font-bold text-brand-teal-800">{stepLabels[currentStep - 1]}</p>
      </div>
    </div>
  );

  const navigation = (nextLabel: string) => (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
      <button type="button" onClick={back} disabled={currentStep === 1} className="secondary-button min-h-11 border-brand-teal-200 bg-white px-5 text-brand-navy-900 transition-all hover:border-brand-teal-500 hover:bg-brand-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"><ChevronLeft className="h-4 w-4" /> Back</button>
      <button type="button" onClick={nextStep} className="primary-button min-h-11 px-5 font-semibold shadow-subtle transition-all hover:-translate-y-0.5 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-600 focus-visible:ring-offset-2">{nextLabel} <ChevronRight className="h-4 w-4" /></button>
    </div>
  );

  return <div className="mx-auto max-w-4xl">
    {currentStep < 6 && renderStepper()}

    {currentStep === 1 && <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h3 className="text-xl font-bold text-brand-navy-900">Step 1: Select Appointment Type</h3><p className="mt-1 text-sm text-slate-500">Select one appointment type. The fee shown is the complete fee for that appointment type.</p><div className="mt-6 grid gap-4">{BOOKABLE_SERVICES.map(item => { const AppointmentIcon = appointmentIcon(item.id); return <button type="button" key={item.id} onClick={() => { update('serviceId', item.id); update('serviceName', item.title); update('fee', item.price || 0); }} className={`rounded-xl border-2 p-5 text-left ${formData.serviceId === item.id ? 'border-brand-teal-600 bg-brand-teal-50/50' : 'border-slate-200'}`}><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><AppointmentIcon className="h-5 w-5 text-brand-teal-700" aria-hidden="true" /><strong>{item.title}</strong></div><strong className="text-brand-teal-700">₹{item.price}</strong></div><p className="mt-2 text-xs text-slate-600">{item.shortDescription}</p><span className="text-xs text-brand-teal-700">Duration: 30 minutes</span></button>; })}</div>{navigation('Continue to Date')}</section>}

    {currentStep === 2 && <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h3 className="text-xl font-bold">Step 2: Select Appointment Date</h3><p className="mt-1 text-sm text-slate-500">Monday-Saturday, 9:00 AM-1:00 PM. Sunday is closed.</p><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">{availableDates.map(item => <button type="button" key={item.date} disabled={!item.isAvailable} onClick={() => update('date', item.date)} className={`rounded-xl border-2 p-3 ${!item.isAvailable ? 'bg-slate-50 text-slate-300' : formData.date === item.date ? 'border-brand-teal-600 bg-brand-teal-600 text-white' : 'border-slate-200'}`}><span className="block text-xs">{item.dayName}</span><strong className="block text-xl">{item.dayNum}</strong><span className="text-[10px]">{item.isAvailable ? 'Available' : 'Closed'}</span></button>)}</div>{navigation('Continue to Time')}</section>}

    {currentStep === 3 && <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h3 className="text-xl font-bold">Step 3: Select 30-minute Time Slot</h3><p className="mt-1 text-sm text-slate-500">Available Monday-Saturday from 9:00 AM to 1:00 PM.</p><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">{timeSlots.map(slot => <button type="button" key={slot} onClick={() => update('timeSlot', slot)} className={`rounded-xl border px-4 py-3 text-xs font-semibold ${formData.timeSlot === slot ? 'border-brand-teal-600 bg-brand-teal-600 text-white' : 'border-slate-200'}`}><Clock className="mr-1 inline h-3.5 w-3.5" />{slot}</button>)}</div>{navigation('Continue to Patient Info')}</section>}

    {currentStep === 4 && <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h3 className="text-xl font-bold">Step 4: Patient Details & Contact</h3><div className="mt-6 grid gap-4 sm:grid-cols-2">{([['patientName', 'Full Name'], ['patientEmail', 'Email Address'], ['patientPhone', 'Phone / WhatsApp'], ['dob', 'Date of Birth']] as const).map(([key, label]) => <div key={key}><label className="label">{label} *</label><input type={key === 'dob' ? 'date' : key === 'patientEmail' ? 'email' : key === 'patientPhone' ? 'tel' : 'text'} value={String(formData[key])} onChange={event => update(key, event.target.value)} className={inputClass(key)} />{errors[key] && <p className="error-text">{errors[key]}</p>}</div>)}</div><div className="mt-4"><label className="label">Preferred Language</label><select value={formData.preferredLanguage} onChange={event => update('preferredLanguage', event.target.value)} className={inputClass('preferredLanguage')}><option>English</option><option>Hindi</option><option>Gujarati</option><option>English / Hindi</option></select></div><div className="mt-4"><label className="label">Reason for Appointment *</label><textarea rows={3} value={formData.primaryConcern} onChange={event => update('primaryConcern', event.target.value)} className={inputClass('primaryConcern')} />{errors.primaryConcern && <p className="error-text">{errors.primaryConcern}</p>}</div><div className="mt-4"><label className="label">Additional Notes</label><textarea rows={2} value={formData.additionalNotes} onChange={event => update('additionalNotes', event.target.value)} className={inputClass('additionalNotes')} /></div><label className="mt-5 flex gap-2 text-xs text-slate-600"><input type="checkbox" checked={formData.consentAgreed} onChange={event => update('consentAgreed', event.target.checked)} /> I understand this {isOnline ? 'online consultation' : 'in-person appointment'} is not emergency care and will seek emergency care when appropriate. *</label>{errors.consentAgreed && <p className="error-text">{errors.consentAgreed}</p>}{navigation('Continue to Review & Pay')}</section>}

    {currentStep === 5 && <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"><h3 className="text-xl font-bold">Step 5: Review & Online Payment</h3><div className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm"><div className="flex justify-between"><span>Appointment type</span><strong>{formData.serviceName}</strong></div><div className="flex justify-between"><span>Date & time</span><strong>{formData.date} at {formData.timeSlot}</strong></div><div className="flex justify-between"><span>Patient</span><strong>{formData.patientName}</strong></div><div className="flex justify-between border-t pt-3"><span>Total appointment fee</span><strong>₹{formData.fee}</strong></div><p className="text-xs text-slate-600">Clinic Appointment is ₹200. Online Consultation is ₹150. These are separate appointment types, and the fees are never combined.</p></div><div className="mt-6"><h4 className="label">Payment method</h4><div className="mt-2 grid gap-3 sm:grid-cols-3">{(['upi', 'card', 'netbanking'] as const).map(method => <button key={method} type="button" onClick={() => setPaymentMethod(method)} className={`rounded-xl border p-3 text-sm font-semibold capitalize ${paymentMethod === method ? 'border-brand-teal-600 bg-brand-teal-50' : 'border-slate-200'}`}>{method === 'upi' ? 'UPI' : method}</button>)}</div></div><div className="mt-4 flex gap-2 rounded-xl border border-sky-200 bg-sky-50 p-3 text-xs text-sky-900"><ShieldCheck className="h-4 w-4 flex-shrink-0" /> Razorpay is the planned online payment gateway. Secure server-side order creation and payment verification are still required; no secret key is exposed in this frontend.</div><div className="mt-8 flex justify-between gap-3"><button onClick={back} disabled={isSubmitting} className="secondary-button"><ChevronLeft className="h-4 w-4" /> Back</button><button onClick={submit} disabled={isSubmitting} className="primary-button">{isSubmitting ? 'Submitting...' : 'Proceed to Payment'} <CheckCircle className="h-4 w-4" /></button></div></section>}

    {currentStep === 6 && confirmedAppt && <section className="rounded-2xl border bg-white p-8 text-center shadow-premium"><CheckCircle className="mx-auto h-14 w-14 text-emerald-600" /><h3 className="mt-4 text-2xl font-bold">Your appointment request was received</h3><p className="mt-2 text-sm text-slate-600">A demo booking record was created for {confirmedAppt.patientEmail}. Reference: <strong>{confirmedAppt.referenceNumber}</strong></p><p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">Payment is not processed in this frontend demo. Razorpay server integration is required before accepting live payments.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={downloadCalendar} className="primary-button"><Download className="h-4 w-4" /> Add to Calendar</button><button onClick={() => navigateTo('portal')} className="secondary-button"><User className="h-4 w-4" /> Patient Portal</button><button onClick={() => navigateTo('video-room')} className="secondary-button"><Video className="h-4 w-4" /> Consultation Room</button><button onClick={() => navigateTo('contact')} className="secondary-button"><Phone className="h-4 w-4" /> Contact</button></div></section>}
  </div>;
};
