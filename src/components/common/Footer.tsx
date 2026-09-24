import React from 'react';
import { 
  Activity, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLINIC_CONFIG, EMERGENCY_NOTICE } from '../../data/config';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-brand-navy-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Column 1: Logo & Mission */}
          <div className="space-y-4">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 text-white text-left focus:outline-none group"
              aria-label="Master's Physiotherapy home"
            >
              <img src={CLINIC_CONFIG.logoUrl} alt="Master's Physiotherapy logo" className="w-10 h-10 object-contain" />
              <div>
                <span className="block text-lg font-bold tracking-tight text-white leading-tight">
                  MASTER'S PHYSIOTHERAPY
                </span>
                <span className="block text-xs font-semibold tracking-wider text-brand-teal-400 uppercase">
                  Online Physiotherapy
                </span>
              </div>
            </button>
            <p className="text-sm text-slate-400 leading-relaxed">
              Move Better. Feel Stronger. Live Without Limits. Personalized physiotherapy care designed around your body, your goals, and your everyday life.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-brand-teal-300">
                <Shield className="w-3.5 h-3.5 text-brand-teal-400" />
                <span>Evidence-Informed Practice</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Explore Practice
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-brand-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-brand-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>About Riya</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-brand-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Physiotherapy Services</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('conditions')}
                  className="hover:text-brand-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Service Focus</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('online-consultation')}
                  className="hover:text-brand-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Online Telehealth Process</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('testimonials')}
                  className="hover:text-brand-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Testimonials unavailable</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Patient Resources & Portal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Patient Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('book')}
                  className="hover:text-brand-teal-400 transition-colors flex items-center gap-1.5 text-brand-teal-300 font-medium"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-teal-400" />
                  <span>Book Appointment Online</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('portal')}
                  className="hover:text-brand-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Patient Dashboard & Exercises</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('video-room')}
                  className="hover:text-brand-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Virtual Consultation Room</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-brand-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Frequently Asked Questions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('auth')}
                  className="hover:text-brand-teal-400 transition-colors flex items-center gap-1.5 text-slate-400 text-xs"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  <span>Clinic Staff Sign In</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contact
            </h3>
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-brand-teal-400 flex-shrink-0 mt-0.5" />
              <span>Service Location / Base Location: {CLINIC_CONFIG.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Phone className="w-4 h-4 text-brand-teal-400 flex-shrink-0" />
              <a href={CLINIC_CONFIG.phoneDialHref} className="hover:text-white transition-colors">
                {CLINIC_CONFIG.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Mail className="w-4 h-4 text-brand-teal-400 flex-shrink-0" />
              <a href={`mailto:${CLINIC_CONFIG.email}`} className="hover:text-white transition-colors">
                {CLINIC_CONFIG.email}
              </a>
            </div>
            <div className="flex items-start gap-3 text-sm text-slate-300 pt-1">
              <Clock className="w-4 h-4 text-brand-teal-400 flex-shrink-0 mt-0.5" />
              <span>{CLINIC_CONFIG.clinicHours}</span>
            </div>
          </div>
        </div>

        {/* Medical Safety Disclaimer Strip */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-relaxed mb-8">
          <p>
            <strong className="text-slate-300 font-semibold">Medical Disclaimer:</strong>{' '}
            The health and rehabilitation information provided on this website is for educational and appointment scheduling purposes only. It is not intended to be a substitute for direct medical diagnosis, hands-on clinical assessment, or in-person treatment by a qualified healthcare professional. Always consult Dr. Riya Master or your primary physician regarding any persistent symptoms or medical condition. {EMERGENCY_NOTICE.body}
          </p>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Master's Physiotherapy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('contact')}
              className="hover:text-slate-300 transition-colors"
            >
              Contact Clinic
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
