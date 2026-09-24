import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLINIC_CONFIG } from '../../data/config';

export const MobileStickyCTA: React.FC = () => {
  const { navigateTo } = useApp();

  const whatsappUrl = `https://wa.me/${CLINIC_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(CLINIC_CONFIG.whatsappMessage)}`;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* Call Now */}
        <a
          href={CLINIC_CONFIG.phoneDialHref}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-navy-900 active:scale-95 transition-all text-center"
          aria-label="Call Riya directly"
        >
          <Phone className="w-4 h-4 text-brand-teal-700 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/60 active:scale-95 transition-all text-center"
          aria-label="Enquire via WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">WhatsApp</span>
        </a>

        {/* Book Consultation */}
        <button
          onClick={() => navigateTo('book')}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-brand-teal-600 hover:bg-brand-teal-700 text-white active:scale-95 transition-all text-center shadow-subtle"
          aria-label="Book Online Consultation"
        >
          <Calendar className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Book Now</span>
        </button>
      </div>
    </div>
  );
};
