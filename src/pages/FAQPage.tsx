import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, ShieldAlert, Calendar } from 'lucide-react';
import { CLINIC_FAQS } from '../data/faqs';
import { SectionHeader } from '../components/common/UIComponents';
import { TELEMEDICINE_NOTE, EMERGENCY_NOTICE } from '../data/config';
import { useApp } from '../context/AppContext';

export const FAQPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-1': true, 'faq-2': true });

  const toggleFaq = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = CLINIC_FAQS.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      <SectionHeader
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="Everything You Need to Know About Virtual Physiotherapy"
        subtitle="Common questions regarding clinical consultations, appointment preparation, and exercise prescriptions answered clearly."
        centered
      />

      {/* Search & Category Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQs (e.g. back pain, online consultation, equipment, reschedule)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-brand-teal-600 shadow-subtle"
          />
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          {['All', 'Online Consultation', 'Clinical Process', 'Booking & Fees', 'Safety'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-brand-teal-600 text-white shadow-subtle'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = !!openIds[faq.id];
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'border-brand-teal-500 bg-white shadow-card ring-1 ring-brand-teal-100'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-subtle'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm sm:text-base font-bold text-brand-navy-900 leading-snug">
                    {faq.question}
                  </span>
                </div>
                <div className={`p-1.5 rounded-lg transition-transform ${isOpen ? 'bg-brand-teal-50 text-brand-teal-700 rotate-180' : 'text-slate-400'}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mandatory Safety Notice */}
      <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-950 flex items-start gap-3 leading-relaxed">
        <HelpCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-sky-900 font-bold">{TELEMEDICINE_NOTE.title}:</strong> {TELEMEDICINE_NOTE.body} {EMERGENCY_NOTICE.body}
        </div>
      </div>

      <div className="pt-4 text-center">
        <button
          onClick={() => navigateTo('book')}
          className="inline-flex items-center gap-2 bg-brand-teal-600 hover:bg-brand-teal-700 text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-subtle transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>Ready to Begin? Book Consultation</span>
        </button>
      </div>
    </div>
  );
};
