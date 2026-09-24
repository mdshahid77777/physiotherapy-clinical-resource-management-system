import React, { useState } from 'react';
import { AlertTriangle, X, PhoneCall } from 'lucide-react';
import { EMERGENCY_NOTICE } from '../../data/config';

export const EmergencyBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div 
      role="region" 
      aria-label="Medical safety notice"
      className="bg-amber-50 border-b border-amber-200 text-amber-950 px-4 py-2.5 text-xs sm:text-sm"
    >
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
          <p className="leading-snug">
            <strong className="font-semibold">{EMERGENCY_NOTICE.title}:</strong>{' '}
            {EMERGENCY_NOTICE.body}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-center">
          <a
            href="tel:112"
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-950 bg-amber-200/70 hover:bg-amber-200 px-2 py-1 rounded transition-colors"
            title="Emergency Services"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Emergency (112)</span>
          </a>
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss emergency banner"
            className="text-amber-800 hover:text-amber-950 p-1 rounded hover:bg-amber-200/50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
