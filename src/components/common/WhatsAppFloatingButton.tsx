import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CLINIC_CONFIG } from '../../data/config';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  // WhatsApp click handler
  const handleWhatsAppClick = () => {
    const cleanNumber = CLINIC_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(CLINIC_CONFIG.whatsappMessage);
    const url = cleanNumber 
      ? `https://wa.me/${cleanNumber}?text=${encodedMsg}` 
      : `https://api.whatsapp.com/send?text=${encodedMsg}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-30 flex items-center gap-2">
      {/* Informative Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-medium py-2 px-3.5 rounded-xl shadow-premium border border-slate-200 animate-fadeIn">
          <span>Chat with Riya Master on WhatsApp</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }} 
            className="text-slate-400 hover:text-slate-600"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        aria-label="Chat with Dr. Riya Master on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </div>
  );
};
