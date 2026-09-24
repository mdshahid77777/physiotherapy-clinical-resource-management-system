import React, { useState } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  Video, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  HeartHandshake, 
  Clock, 
  Award, 
  ChevronRight, 
  ChevronDown,
  Sparkles,
  Phone,
  Search,
  Check,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CLINIC_CONFIG, EMERGENCY_NOTICE, TELEMEDICINE_NOTE } from '../data/config';
import { CLINIC_SERVICES } from '../data/services';
import { CLINIC_CONDITIONS } from '../data/conditions';
import { CLINIC_TESTIMONIALS } from '../data/testimonials';
import { CLINIC_FAQS } from '../data/faqs';
import { SectionHeader, Badge } from '../components/common/UIComponents';

export const HomePage: React.FC = () => {
  const { navigateTo } = useApp();
  
  // Search & Filter state for conditions
  const [conditionSearch, setConditionSearch] = useState('');
  const [conditionCategory, setConditionCategory] = useState<string>('All');
  
  // FAQ accordion active state
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const filteredConditions = CLINIC_CONDITIONS.filter(cond => {
    const matchesSearch = cond.name.toLowerCase().includes(conditionSearch.toLowerCase()) ||
      cond.shortDescription.toLowerCase().includes(conditionSearch.toLowerCase());
    const matchesCat = conditionCategory === 'All' || cond.category === conditionCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-20 sm:space-y-28 pb-12 overflow-hidden">
      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section className="relative pt-6 sm:pt-12 lg:pt-16 pb-12 sm:pb-20">
        {/* Subtle background ambient gradient */}
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-brand-teal-50/50 via-transparent to-transparent -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (Cols 1-7) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-teal-50 text-brand-teal-800 border border-brand-teal-200/70">
                <span className="w-2 h-2 rounded-full bg-brand-teal-600 animate-pulse" />
                <span>PERSONALIZED PHYSIOTHERAPY CARE</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy-900 leading-[1.12]">
                Move Better. <br className="hidden sm:block" />
                Feel Stronger. <br className="hidden sm:block" />
                <span className="text-brand-teal-700">Live Without Limits.</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl leading-relaxed">
                Personalized physiotherapy consultations and rehabilitation guidance designed around your body, your goals, and your everyday life.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => navigateTo('book')}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal-600 hover:bg-brand-teal-700 active:scale-[0.98] text-white text-sm sm:text-base font-semibold px-7 py-4 rounded-xl shadow-card hover:shadow-premium transition-all"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Book Online Consultation</span>
                </button>

                <button
                  onClick={() => navigateTo('services')}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-brand-navy-900 text-sm sm:text-base font-semibold px-6 py-4 rounded-xl border border-slate-200 shadow-subtle transition-all"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Line */}
              <div className="pt-4 flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-teal-600 flex-shrink-0" />
                <span>Online consultations • Personalized treatment plans • Follow-up support</span>
              </div>
            </div>

            {/* Right Visual Composition (Cols 8-12) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-premium border-4 border-white aspect-[4/5] bg-slate-100">
                  <img
                    src="https://cdn.phototourl.com/free/2026-09-14-7444d185-3b04-44bd-8460-3987c34c6f8b.jpg"
                    alt="Riya Master, Physiotherapist"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950/60 via-transparent to-transparent" />
                  
                  {/* Overlay text on image */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-teal-300">
                      Physiotherapist
                    </span>
                    <h3 className="text-lg font-bold">{CLINIC_CONFIG.doctorName}</h3>
                    <p className="text-xs text-slate-200">{CLINIC_CONFIG.specialization}</p>
                  </div>
                </div>

                {/* Floating Card 1: Personalized Care (Top-Left) */}
                <div className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-card border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center flex-shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-brand-navy-900">Personalized Care</span>
                    <span className="block text-[11px] text-slate-500">1-on-1 Guided Sessions</span>
                  </div>
                </div>

                {/* Floating Card 2: Online Consultations Available (Bottom-Right) */}
                <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-card border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-brand-navy-900">Online Telehealth</span>
                    <span className="block text-[11px] text-emerald-600 font-semibold">Consultations Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. TRUST PILLARS SECTION (Immediately after hero)
          ======================================================== */}
      <section className="bg-white py-12 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
            {[
              {
                title: 'Personalized Treatment',
                desc: 'Tailored to your body mechanics & goals',
                icon: Activity,
              },
              {
                title: 'Online Consultation',
                desc: 'High-definition video evaluations anywhere',
                icon: Video,
              },
              {
                title: 'Patient-Centered Care',
                desc: 'Your routine & lifestyle put first',
                icon: HeartHandshake,
              },
              {
                title: 'Evidence-Informed',
                desc: 'Contemporary pain science & biomechanics',
                icon: ShieldCheck,
              },
              {
                title: 'Flexible Follow-Ups',
                desc: 'Progressive updates as you recover',
                icon: Clock,
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                    idx === 4 ? 'col-span-2 md:col-span-1' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-brand-navy-900 leading-snug">{pillar.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. MEET DR. RIYA MASTER (About Preview)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-card border border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Doctor Portrait */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-subtle bg-slate-100 aspect-[4/5]">
                <img
                  src="https://cdn.phototourl.com/free/2026-09-14-7444d185-3b04-44bd-8460-3987c34c6f8b.jpg"
                  alt={`${CLINIC_CONFIG.doctorName} - Physiotherapist`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold text-brand-teal-300">Physiotherapist</span>
                  <p className="text-sm font-bold">{CLINIC_CONFIG.doctorName}</p>
                </div>
              </div>
            </div>

            {/* Doctor Bio & Credentials Placeholders */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeader
                eyebrow="MEET YOUR PHYSIOTHERAPIST"
                title={`Compassionate Care Guided by ${CLINIC_CONFIG.doctorName}`}
                subtitle="Dedicated to helping individuals overcome musculoskeletal pain, regain movement confidence, and safely return to the activities they cherish."
                className="mb-6"
              />

              {/* Editable Credential Badges (Placeholders) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Qualification</span>
                  <strong className="block text-xs text-brand-navy-900 mt-0.5">{CLINIC_CONFIG.qualification}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Specialization</span>
                  <strong className="block text-xs text-brand-navy-900 mt-0.5">{CLINIC_CONFIG.specialization}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Experience</span>
                  <strong className="block text-xs text-brand-navy-900 mt-0.5">{CLINIC_CONFIG.experienceYears}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Registration status</span>
                  <strong className="block text-xs text-brand-navy-900 mt-0.5">{CLINIC_CONFIG.registrationDetails}</strong>
                </div>
              </div>

              {/* Areas of Expertise */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Clinical Areas of Focus
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Spine & Postural Rehabilitation',
                    'Sports & Kinetic Chain Biomechanics',
                    'Workplace Ergonomic Optimization',
                    'Persistent Pain Neuroscience Education',
                    'Functional Mobility & Balance'
                  ].map((area, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-brand-teal-50 text-brand-teal-800 border border-brand-teal-200/60">
                      <Check className="w-3 h-3 text-brand-teal-600" />
                      <span>{area}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => navigateTo('about')}
                  className="inline-flex items-center gap-2 bg-brand-teal-600 hover:bg-brand-teal-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-subtle transition-all"
                >
                  <span>About Riya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('book')}
                  className="text-sm font-semibold text-brand-navy-900 hover:text-brand-teal-700"
                >
                  Book Consultation →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SERVICES SECTION
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="COMPREHENSIVE PHYSIOTHERAPY"
          title="Clinical Services Designed for Lasting Relief"
          subtitle="Whether you need digital consultations from home or targeted exercise therapy, we offer evidence-informed rehabilitation customized to your exact condition."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 shadow-card border border-slate-200/80 hover:border-brand-teal-400 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center group-hover:bg-brand-teal-600 group-hover:text-white transition-colors">
                    <Activity className="w-6 h-6" />
                  </div>
                  {service.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-teal-100 text-brand-teal-800">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-brand-navy-900 group-hover:text-brand-teal-700 transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => navigateTo('services', { serviceId: service.id })}
                  className="text-xs font-bold text-brand-teal-700 hover:text-brand-teal-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigateTo('book')}
                  className="text-xs font-semibold text-slate-500 hover:text-brand-navy-900"
                >
                  Book →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigateTo('services')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-brand-navy-900 hover:bg-slate-50 transition-colors shadow-subtle"
          >
            <span>View All Services & Clinical Approaches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================
          5. CONDITIONS SECTION (Searchable & Filterable)
          ======================================================== */}
      <section className="bg-slate-100/70 py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="UNDERSTAND YOUR SYMPTOMS"
            title="Common Conditions We Support"
            subtitle="Search through common musculoskeletal symptoms and discover how structured physiotherapy, movement retraining, and ergonomic habits help you regain comfort."
            centered
          />

          {/* Search & Category Filter Bar */}
          <div className="max-w-3xl mx-auto mb-10 space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={conditionSearch}
                onChange={(e) => setConditionSearch(e.target.value)}
                placeholder="Search by condition (e.g. back pain, knee stiffness, posture, runner knee)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-brand-teal-600 shadow-subtle"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {['All', 'Spine', 'Joints', 'Sports', 'Posture & Work', 'Rehabilitation', 'Mobility'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setConditionCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    conditionCategory === cat
                      ? 'bg-brand-teal-600 text-white shadow-subtle'
                      : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Condition Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConditions.slice(0, 6).map((condition) => (
              <div
                key={condition.id}
                className="bg-white rounded-2xl p-6 shadow-card border border-slate-200/80 flex flex-col justify-between hover:shadow-card-hover transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal-800 bg-brand-teal-50 px-2 py-0.5 rounded border border-brand-teal-200">
                      {condition.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-brand-navy-900 leading-snug">
                    {condition.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {condition.shortDescription}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      When Physiotherapy May Help:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {condition.whenPhysioHelps.slice(0, 2).map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-brand-teal-600 font-bold">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => navigateTo('conditions', { conditionId: condition.id })}
                    className="text-xs font-bold text-brand-teal-700 hover:text-brand-teal-800 flex items-center gap-1"
                  >
                    <span>View Care Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigateTo('book')}
                    className="text-xs font-semibold text-slate-500 hover:text-brand-navy-900"
                  >
                    Discuss Concern →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigateTo('conditions')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-sm font-semibold text-brand-navy-900 hover:bg-slate-50 shadow-subtle"
            >
              <span>Explore All 12 Musculoskeletal Conditions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. ONLINE CONSULTATION 4-STEP JOURNEY
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-navy-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-premium border border-slate-800">
          <SectionHeader
            eyebrow="DIGITAL TELEHEALTH REHABILITATION"
            title="How Your Online Consultation Works"
            subtitle="Access specialized physiotherapy care from the comfort of your home or workspace in 4 streamlined steps."
            centered
            className="text-white [&_h2]:text-white [&_p]:text-slate-300 mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Book Your Appointment',
                desc: 'Select a convenient date and time slot with Dr. Riya Master via our simple 6-step online booking portal.',
              },
              {
                step: '02',
                title: 'Tell Us About Your Concern',
                desc: 'Complete our secure clinical intake form so Dr. Riya can review your pain triggers and medical history prior to meeting.',
              },
              {
                step: '03',
                title: 'Meet Dr. Riya Online',
                desc: 'Join a secure video call for functional movement assessment, ergonomic analysis, and clear explanation of your symptoms.',
              },
              {
                step: '04',
                title: 'Receive Your Personalized Plan',
                desc: 'Get immediate access to your custom exercise video protocol, daily checklist, and milestone tracking in the patient portal.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 relative hover:border-brand-teal-500 transition-colors"
              >
                <div className="text-3xl font-extrabold text-brand-teal-400/80 mb-3 font-mono">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigateTo('online-consultation')}
              className="inline-flex items-center gap-2 bg-brand-teal-500 hover:bg-brand-teal-400 active:scale-95 text-brand-navy-950 font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-card transition-all"
            >
              <span>Start Your Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. TESTIMONIALS SECTION ("Real Experiences. Real Progress.")
          ======================================================== */}
      {CLINIC_TESTIMONIALS.length > 0 && <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-teal-50 text-brand-teal-800 border border-brand-teal-200/60 mb-3.5">
            <span>PATIENT EXPERIENCES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-brand-navy-900">
            Real Experiences. Real Progress.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Stories of recovery and functional movement restored through personalized rehabilitation.
          </p>
          <div className="mt-2 inline-block px-2.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-[11px] text-amber-800 font-medium">
            Demo Content: Representative patient scenarios for illustration
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLINIC_TESTIMONIALS.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-card border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-base">★</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <strong className="block text-xs sm:text-sm font-bold text-brand-navy-900">
                    {testimonial.patientName}
                  </strong>
                  <span className="block text-[11px] text-slate-500 mt-0.5">
                    {testimonial.conditionOrService}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-brand-teal-700 bg-brand-teal-50 px-2 py-0.5 rounded">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigateTo('testimonials')}
            className="text-xs font-bold text-brand-teal-700 hover:text-brand-teal-800"
          >
            Read All Patient Recovery Stories →
          </button>
        </div>
      </section>}

        {/* ========================================================
          8. FAQ SECTION (Animated Accordion)
          ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="QUESTIONS & ANSWERS"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our virtual consultations, appointment preparation, and exercise prescriptions."
          centered
        />

        <div className="space-y-3">
          {CLINIC_FAQS.slice(0, 6).map((faq) => {
            const isOpen = openFaqId === faq.id;
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
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-brand-navy-900 leading-snug">
                    {faq.question}
                  </span>
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

        {/* Telemedicine Suitability Note */}
        <div className="mt-8 p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 leading-relaxed flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
          <p>
            <strong>{TELEMEDICINE_NOTE.title}:</strong> {TELEMEDICINE_NOTE.body}
          </p>
        </div>
      </section>

      {/* ========================================================
          9. CONVERSION CTA BANNER
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-teal-700 via-brand-teal-600 to-brand-navy-900 text-white rounded-3xl p-8 sm:p-14 shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-200">
              TAKE THE FIRST STEP TOWARDS PAIN-FREE MOVEMENT
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Start Your Recovery Journey?
            </h2>
            <p className="text-sm text-teal-50 leading-relaxed">
              Book your comprehensive online physiotherapy assessment with Dr. Riya Master today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            <button
              onClick={() => navigateTo('book')}
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-teal-900 hover:bg-slate-50 font-bold text-sm sm:text-base px-7 py-4 rounded-xl shadow-card transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Book Consultation</span>
            </button>
            <a
              href={CLINIC_CONFIG.phoneDialHref}
              className="inline-flex items-center justify-center gap-2 bg-brand-navy-950/40 hover:bg-brand-navy-950/60 border border-white/20 text-white font-medium text-sm px-6 py-4 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Riya</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
