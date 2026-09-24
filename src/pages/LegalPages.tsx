import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { SectionHeader } from '../components/common/UIComponents';

const legalItems = [
  'Privacy Policy',
  'Terms & Conditions',
  'Cancellation Policy',
  'Refund Policy',
  'Rescheduling Policy',
  'Teleconsultation Consent',
  'Medical Disclaimer',
  'Patient data handling and storage policy',
];

const LegalReviewNotice: React.FC<{ title: string }> = ({ title }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
    <SectionHeader eyebrow="LEGAL INFORMATION" title={title} subtitle="This content is not final and must be reviewed and approved before publication." />
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 text-amber-950">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="font-bold">Awaiting requirements and review</h2>
          <p className="text-sm leading-relaxed mt-2">
            No legally binding policy text has been created. The following documents and requirements still need to be provided and reviewed by an appropriate professional:
          </p>
          <ul className="mt-4 list-disc list-inside space-y-1 text-sm">
            {legalItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export const PrivacyPolicyPage: React.FC = () => <LegalReviewNotice title="Privacy Policy" />;
export const TermsPage: React.FC = () => <LegalReviewNotice title="Terms & Conditions" />;
