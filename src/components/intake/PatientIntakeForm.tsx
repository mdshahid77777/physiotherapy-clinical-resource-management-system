import React, { useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, AlertTriangle, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { IntakeData } from '../../types';

export const PatientIntakeForm: React.FC = () => {
  const { submitIntake, navigateTo } = useApp();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<IntakeData>({
    fullName: '', email: '', phone: '', age: '', gender: 'Prefer not to say', occupation: '', emergencyContact: '',
    primaryComplaint: '', affectedBodyArea: 'Not specified', symptomOnset: 'Not specified', isWorkOrSportRelated: false,
    painLevelCurrent: 0, painLevelWorst: 0, painType: [], aggravatingFactors: '', relievingFactors: '', previousTreatments: '',
    surgeriesOrInjuries: '', currentMedications: '', hasRedFlags: false, functionalGoals: '', activityLevel: 'Not specified',
    telehealthConsent: false, privacyConsent: false, accuracyDeclaration: false,
  });
  const update = (field: keyof IntakeData, value: string | number | boolean | string[]) => setData(previous => ({ ...previous, [field]: value }));
  const validate = () => {
    const next: Record<string, string> = {};
    if (step === 1) { if (!data.fullName.trim()) next.fullName = 'Name is required'; if (!data.email.includes('@')) next.email = 'Valid email is required'; if (data.phone.length < 8) next.phone = 'Phone is required'; }
    if (step === 2 && !data.primaryComplaint.trim()) next.primaryComplaint = 'Please describe your concern';
    if (step === 6) { if (!data.telehealthConsent) next.telehealthConsent = 'Required'; if (!data.privacyConsent) next.privacyConsent = 'Required'; if (!data.accuracyDeclaration) next.accuracyDeclaration = 'Required'; }
    setErrors(next); return Object.keys(next).length === 0;
  };
  const next = () => { if (validate()) setStep(value => Math.min(6, value + 1)); };
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (validate()) { submitIntake(data); setSubmitted(true); } };
  if (submitted) return <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-card text-center"><CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" /><h3 className="text-xl font-bold mt-4">Clinical Intake Form Received</h3><p className="text-sm text-slate-600 mt-2">Demo submission received for the online consultation flow.</p><button onClick={() => navigateTo('portal')} className="primary-button mt-6">View Patient Dashboard</button></div>;
  const input = (field: keyof IntakeData, label: string, placeholder = '') => <div><label className="label">{label}</label><input value={String(data[field])} onChange={event => update(field, event.target.value)} placeholder={placeholder} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />{errors[field] && <p className="error-text">{errors[field]}</p>}</div>;
  return <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200"><div className="mb-6 flex justify-between text-xs font-bold text-slate-500"><span>Step {step} of 6</span><span>Demo intake flow</span></div><div className="h-2 bg-slate-100 rounded-full mb-6"><div className="h-full bg-brand-teal-600 rounded-full" style={{ width: `${step * 16.66}%` }} /></div><form onSubmit={submit} className="space-y-4">
    {step === 1 && <><h3 className="text-lg font-bold">Personal Information</h3>{input('fullName', 'Full Name *', 'Patient name')}<div className="grid sm:grid-cols-2 gap-4">{input('email', 'Email *', 'patient@example.com')}{input('phone', 'Phone *', '+91')}</div>{input('age', 'Age')}</>}
    {step === 2 && <><h3 className="text-lg font-bold">Primary Concern</h3><label className="label">Describe your main concern *</label><textarea rows={4} value={data.primaryComplaint} onChange={event => update('primaryComplaint', event.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />{errors.primaryComplaint && <p className="error-text">{errors.primaryComplaint}</p>}<label className="label">Affected body area</label><input value={data.affectedBodyArea} onChange={event => update('affectedBodyArea', event.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" /></>}
    {step === 3 && <><h3 className="text-lg font-bold">Symptoms</h3><label className="label">Current pain level: {data.painLevelCurrent}/10</label><input type="range" min="0" max="10" value={data.painLevelCurrent} onChange={event => update('painLevelCurrent', Number(event.target.value))} className="w-full" />{input('symptomOnset', 'When did it start?')}{input('aggravatingFactors', 'What makes it worse?')}{input('relievingFactors', 'What helps?')}</>}
    {step === 4 && <><h3 className="text-lg font-bold">Medical History & Screening</h3>{input('surgeriesOrInjuries', 'Previous surgeries or injuries')}{input('currentMedications', 'Current medications')}{input('previousTreatments', 'Previous treatments')}<div className="p-3 rounded-xl bg-amber-50 text-xs text-amber-900"><AlertTriangle className="inline w-4 h-4 mr-1" /> For emergencies or red-flag symptoms, seek urgent medical care.</div></>}
    {step === 5 && <><h3 className="text-lg font-bold">Goals & Lifestyle</h3><label className="label">Functional goals</label><textarea rows={4} value={data.functionalGoals} onChange={event => update('functionalGoals', event.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm" />{input('activityLevel', 'Activity level')}</>}
    {step === 6 && <><h3 className="text-lg font-bold">Consent & Declaration</h3>{(['telehealthConsent', 'privacyConsent', 'accuracyDeclaration'] as const).map(field => <label key={field} className="flex gap-2 text-sm text-slate-600"><input type="checkbox" checked={data[field]} onChange={event => update(field, event.target.checked)} /> I confirm this demo form statement ({field}). *</label>)}{Object.keys(errors).length > 0 && <p className="error-text">Please complete the required confirmations.</p>}</>}
    <div className="flex justify-between pt-4 border-t border-slate-100"><button type="button" disabled={step === 1} onClick={() => setStep(value => value - 1)} className="secondary-button"><ChevronLeft className="w-4 h-4" /> Back</button>{step < 6 ? <button type="button" onClick={next} className="primary-button">Next <ChevronRight className="w-4 h-4" /></button> : <button type="submit" className="primary-button">Submit Intake <Send className="w-4 h-4" /></button>}</div>
  </form></div>;
};
