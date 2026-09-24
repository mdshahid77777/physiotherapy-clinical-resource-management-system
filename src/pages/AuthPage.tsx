import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CLINIC_CONFIG } from '../data/config';

type AuthMode = 'signin' | 'signup';
type Role = 'PATIENT' | 'ADMIN';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*(?:\d|[^A-Za-z])).{8,}$/;

export const AuthPage: React.FC = () => {
  const { navigateTo, signInPatient, signInAdmin, signUpPatient } = useApp();
  const [role, setRole] = useState<Role>('PATIENT');
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', dob: '' });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field: keyof typeof form, value: string) => setForm(previous => ({ ...previous, [field]: value }));
  const switchRole = (nextRole: Role) => { setRole(nextRole); setMode('signin'); setError(''); setNotice(''); };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setNotice('');
    if (role === 'PATIENT' && mode === 'signup') {
      if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.password || !form.confirmPassword) return setError('Please complete all required fields.');
      if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Enter a valid email address.');
      if (!/^\+?[0-9\s()-]{8,}$/.test(form.phone)) return setError('Enter a valid phone number.');
      if (!passwordPattern.test(form.password)) return setError('Password must be at least 8 characters with uppercase, lowercase, and a number or special character.');
      if (form.password !== form.confirmPassword) return setError('Passwords do not match.');
    } else if (!form.email.trim() || !form.password) {
      return setError(role === 'ADMIN' ? 'Enter the admin ID/email and password.' : 'Enter your email and password.');
    }

    setIsSubmitting(true);
    const result = role === 'ADMIN'
      ? await signInAdmin(form.email, form.password)
      : mode === 'signup'
        ? await signUpPatient(form)
        : await signInPatient(form.email, form.password);
    setIsSubmitting(false);
    if (!result.success) return setError(result.message);
    if (mode === 'signup') {
      setNotice(result.message);
      setMode('signin');
      setForm(previous => ({ ...previous, password: '', confirmPassword: '' }));
      return;
    }
    navigateTo(role === 'ADMIN' ? 'admin' : 'portal');
  };

  const inputClass = 'w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none transition focus:border-brand-teal-600 focus:ring-2 focus:ring-brand-teal-100';
  const isAdmin = role === 'ADMIN';

  return <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-10">
    <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card lg:grid-cols-[0.85fr_1.15fr]">
      <div className="hidden bg-brand-navy-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div><img src={CLINIC_CONFIG.logoUrl} alt="Master's Physiotherapy logo" className="h-16 w-16 object-contain" /><p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal-300">{CLINIC_CONFIG.clinicName}</p><h1 className="mt-3 text-3xl font-extrabold leading-tight">Care access, thoughtfully protected.</h1></div>
        <div className="flex items-start gap-3 text-sm leading-relaxed text-slate-300"><ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-teal-300" /><span>Patient and staff access stay separate. Your account opens only the area assigned to your role.</span></div>
      </div>
      <div className="p-6 sm:p-10">
        <button onClick={() => navigateTo('home')} className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-teal-700"><ArrowLeft className="h-4 w-4" /> Back to website</button>
        <div className="mb-7 flex items-center gap-3 lg:hidden"><img src={CLINIC_CONFIG.logoUrl} alt="Master's Physiotherapy logo" className="h-12 w-12 object-contain" /><div><strong className="block text-sm text-brand-navy-900">{CLINIC_CONFIG.clinicName}</strong><span className="text-xs text-brand-teal-700">Secure account access</span></div></div>
        <div className="mb-6"><h2 className="text-2xl font-extrabold text-brand-navy-900">Welcome Back</h2><p className="mt-1 text-sm text-slate-500">Sign in to access your Master's Physiotherapy account.</p></div>
        <div className="mb-7 grid grid-cols-2 rounded-xl bg-slate-100 p-1"><button type="button" onClick={() => switchRole('PATIENT')} className={`rounded-lg px-3 py-2.5 text-xs font-bold ${!isAdmin ? 'bg-white text-brand-teal-800 shadow-subtle' : 'text-slate-500'}`}><UserRound className="mr-1 inline h-4 w-4" /> Patient</button><button type="button" onClick={() => switchRole('ADMIN')} className={`rounded-lg px-3 py-2.5 text-xs font-bold ${isAdmin ? 'bg-white text-brand-teal-800 shadow-subtle' : 'text-slate-500'}`}><LockKeyhole className="mr-1 inline h-4 w-4" /> Admin / Clinic Staff</button></div>
        <h3 className="text-lg font-bold text-brand-navy-900">{isAdmin ? 'Clinic Staff Sign In' : mode === 'signup' ? 'Create your patient account' : 'Patient Sign In'}</h3>
        {isAdmin && <p className="mt-1 text-xs text-slate-500">Authorized clinic staff only.</p>}
        {notice && <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</div>}
        {error && <div role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
        <form onSubmit={submit} className="mt-5 space-y-4">
          {mode === 'signup' && !isAdmin && <><div><label className="label">Full Name *</label><input className={inputClass} value={form.name} onChange={event => update('name', event.target.value)} /></div><div><label className="label">Phone Number *</label><input className={inputClass} type="tel" value={form.phone} onChange={event => update('phone', event.target.value)} /></div><div><label className="label">Date of Birth</label><input className={inputClass} type="date" value={form.dob} onChange={event => update('dob', event.target.value)} /></div></>}
          <div><label className="label">{isAdmin ? 'Admin ID / Email' : 'Email Address'} *</label><input className={inputClass} type="email" autoComplete="username" value={form.email} onChange={event => update('email', event.target.value)} /></div>
          <div><label className="label">Password *</label><div className="relative"><input className={`${inputClass} pr-11`} type={showPassword ? 'text' : 'password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={form.password} onChange={event => update('password', event.target.value)} /><button type="button" onClick={() => setShowPassword(value => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
          {mode === 'signup' && !isAdmin && <><div><label className="label">Confirm Password *</label><input className={inputClass} type="password" autoComplete="new-password" value={form.confirmPassword} onChange={event => update('confirmPassword', event.target.value)} /></div><p className="rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number or special character.</p></>}
          {!isAdmin && mode === 'signin' && <button type="button" onClick={() => setNotice('Password recovery requires email service configuration and is not enabled in this frontend-only build.')} className="text-xs font-semibold text-brand-teal-700 hover:underline">Forgot Password?</button>}
          <button type="submit" disabled={isSubmitting} className="primary-button w-full justify-center disabled:opacity-60">{isSubmitting ? 'Please wait...' : isAdmin ? 'Sign In to Staff Portal' : mode === 'signup' ? 'Create Patient Account' : 'Sign In'}</button>
        </form>
        {!isAdmin && <div className="mt-6 text-center text-xs text-slate-500">{mode === 'signin' ? <>Don't have a patient account? <button onClick={() => { setMode('signup'); setError(''); setNotice(''); }} className="font-bold text-brand-teal-700 hover:underline">Create Patient Account</button></> : <>Already have an account? <button onClick={() => { setMode('signin'); setError(''); setNotice(''); }} className="font-bold text-brand-teal-700 hover:underline">Sign In</button></>}</div>}
      </div>
    </div>
  </div>;
};
