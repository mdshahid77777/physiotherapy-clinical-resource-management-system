import React from 'react';
import { AlertCircle } from 'lucide-react';

const missingInformation = [
  "Doctor's specific specialization, if any",
  'Home-visit service area',
  'Home-visit fee',
  'Cancellation policy',
  'Refund policy',
  'Rescheduling policy',
  'Appointment approval process',
  'Final detailed service list',
  'Service-specific pricing beyond the confirmed ₹200/₹150',
  'Specific conditions/treatments Riya wants to advertise',
  'Clinic/business logo',
  'Additional professional certifications, if any',
  'Privacy policy approval',
  'Terms & Conditions approval',
  'Teleconsultation consent wording',
  'Any additional legal/medical requirements',
];

export const MissingInformationNotice: React.FC = () => (
  <section className="max-w-4xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 text-amber-950">
    <div className="flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
      <div>
        <h2 className="text-lg font-bold">Missing information before launch</h2>
        <p className="text-sm leading-relaxed mt-2">
          These details are intentionally not guessed. Confirm them before publishing appointment availability, home visits, payment, or legal and clinical claims.
        </p>
        <ol className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 list-decimal list-inside text-sm">
          {missingInformation.map((item) => <li key={item}>{item}</li>)}
        </ol>
      </div>
    </div>
  </section>
);
