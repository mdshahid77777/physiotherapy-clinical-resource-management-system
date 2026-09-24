import React from 'react';
import { SectionHeader } from '../components/common/UIComponents';

export const TestimonialsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
    <SectionHeader
      eyebrow="PATIENT EXPERIENCES"
      title="Testimonials are not published yet"
      subtitle="No confirmed real patient testimonials have been provided. This section will remain unavailable until approved testimonials are supplied."
      centered
    />
  </div>
);
