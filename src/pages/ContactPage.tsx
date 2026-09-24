import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Camera,
  Send, 
  CheckCircle, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { CLINIC_CONFIG } from '../data/config';
import { SectionHeader } from '../components/common/UIComponents';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { submitContactMessage } = useApp();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const validate = () => {
    const err: Record<string, string> = {};
    if (name.trim().length < 2 || name.trim().length > 100) err.name = 'Please enter a valid name';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) err.email = 'Valid email address is required';
    if (!/^\+?[0-9\s().-]{8,20}$/.test(phone.trim()) || phone.replace(/\D/g, '').length < 8) err.phone = 'Valid contact number is required';
    if (message.trim().length < 10 || message.trim().length > 4000) err.message = 'Message must be between 10 and 4000 characters';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitted(false);
    setSubmissionError('');
    const result = await submitContactMessage({ fullName: name, email, phone, message });
    setIsSubmitting(false);
    if (!result.success) {
      setSubmissionError("We couldn't send your message. Please try again or contact Riya directly.");
      return;
    }
    setSubmitted(true);
    setName(''); setEmail(''); setPhone(''); setMessage('');
  };

  const whatsappUrl = `https://wa.me/${CLINIC_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(CLINIC_CONFIG.whatsappMessage)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      <SectionHeader
        eyebrow="GET IN TOUCH"
        title="Contact Master's Physiotherapy"
        subtitle="Have questions about online physiotherapy consultation? Reach out via form, call, or WhatsApp."
        centered
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information & Placeholders (Cols 1-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-6">
            <h3 className="text-xl font-bold text-brand-navy-900">Contact Details</h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Phone Number</span>
                  <a href={CLINIC_CONFIG.phoneDialHref} className="font-semibold text-brand-navy-900 hover:text-brand-teal-700" aria-label="Call Master's Physiotherapy at +91 9737508297">
                    {CLINIC_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Instagram</span>
                  <a href={CLINIC_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-teal-700 hover:underline">{CLINIC_CONFIG.instagramUsername}</a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</span>
                  <a href={`mailto:${CLINIC_CONFIG.email}`} className="font-semibold text-brand-navy-900 hover:text-brand-teal-700">
                    {CLINIC_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">WhatsApp Support</span>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 hover:underline">
                    {CLINIC_CONFIG.whatsappNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Service Location / Base Location</span>
                  <p className="font-medium text-slate-700">{CLINIC_CONFIG.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Consultation Hours</span>
                  <p className="font-medium text-slate-700">{CLINIC_CONFIG.clinicHours}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Dial Buttons */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <a
                href={CLINIC_CONFIG.phoneDialHref}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-brand-navy-900 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-teal-700" />
                <span>Call Riya</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-subtle transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Contact Form (Cols 6-12) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-200/80">
            <h3 className="text-xl font-bold text-brand-navy-900 mb-1">Send a Message</h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out the form below and Riya Master will reply when available.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Your message has been sent successfully. Riya will get back to you shortly!</span>
              </div>
            )}
            {submissionError && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <span>{submissionError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                    errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-brand-teal-600'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-brand-teal-600'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                      errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-brand-teal-600'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Your Message or Question *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your pain, questions regarding online consultation, or appointment preferences..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                    errors.message ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-brand-teal-600'
                  }`}
                />
                {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal-600 hover:bg-brand-teal-700 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-subtle transition-all active:scale-[0.98] w-full sm:w-auto"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
