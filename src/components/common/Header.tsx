import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Calendar, 
  User, 
  ShieldCheck, 
  Activity, 
  ChevronRight,
  Video
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CLINIC_CONFIG } from '../../data/config';

export const Header: React.FC = () => {
  const { currentRoute, navigateTo, authUser, signOut } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'About', route: 'about' },
    { label: 'Services', route: 'services' },
    { label: 'Online Consultation', route: 'online-consultation', badge: 'Virtual' },
    { label: 'FAQ', route: 'faq' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleNavClick = (route: string) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-card border-b border-slate-200/80 py-3'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Clinic Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            aria-label="Master's Physiotherapy home"
          >
            <img src={CLINIC_CONFIG.logoUrl} alt="Master's Physiotherapy logo" className="w-10 h-10 sm:w-11 sm:h-11 object-contain" />
            <div>
              <span className="block text-base sm:text-lg font-bold tracking-tight text-brand-navy-900 leading-tight">
                MASTER'S PHYSIOTHERAPY
              </span>
              <span className="block text-[11px] sm:text-xs font-semibold tracking-wider text-brand-teal-700 uppercase">
                Online Physiotherapy
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`px-3 py-2 rounded-lg transition-colors relative ${
                    isActive
                      ? 'text-brand-teal-700 font-semibold bg-brand-teal-50/80'
                      : 'hover:text-brand-navy-900 hover:bg-slate-100/80'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-brand-teal-100 text-brand-teal-800">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-teal-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Secondary CTA: Call Now */}
            <a
              href={CLINIC_CONFIG.phoneDialHref}
              className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
              aria-label="Call Master's Physiotherapy at +91 9737508297"
            >
              <Phone className="w-3.5 h-3.5 text-brand-teal-700" />
              <span>Call Now</span>
            </a>

            {/* Primary CTA: Book Consultation */}
            <button
              onClick={() => handleNavClick('book')}
              className="flex items-center gap-2 bg-brand-teal-600 hover:bg-brand-teal-700 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-subtle hover:shadow-card transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('book')}
              className="bg-brand-teal-600 hover:bg-brand-teal-700 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-subtle"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <button
                  onClick={() => handleNavClick('home')}
                  className="flex items-center gap-2.5 text-left focus:outline-none"
                  aria-label="Master's Physiotherapy home"
                >
                  <img src={CLINIC_CONFIG.logoUrl} alt="Master's Physiotherapy logo" className="w-8 h-8 object-contain" />
                  <div>
                    <span className="block text-sm font-bold text-brand-navy-900">MASTER'S PHYSIOTHERAPY</span>
                    <span className="block text-[10px] font-semibold text-brand-teal-700 uppercase">Online Physiotherapy</span>
                  </div>
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-4 space-y-1" aria-label="Mobile Navigation">
                {navLinks.map((link) => {
                  const isActive = currentRoute === link.route;
                  return (
                    <button
                      key={link.route}
                      onClick={() => handleNavClick(link.route)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-brand-teal-50 text-brand-teal-800 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {link.label}
                        {link.badge && (
                          <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider rounded bg-brand-teal-100 text-brand-teal-800">
                            {link.badge}
                          </span>
                        )}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}
              </nav>

              {/* Portal & Admin Sections */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Digital Care & Portals
                </p>
                <button
                  onClick={() => handleNavClick('portal')}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <User className="w-4 h-4 text-brand-teal-600" />
                  <span>Patient Dashboard & Rehab Plan</span>
                </button>
                <button
                  onClick={() => handleNavClick('video-room')}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Video className="w-4 h-4 text-brand-teal-600" />
                  <span>Virtual Consultation Room</span>
                </button>
                <button
                  onClick={() => handleNavClick('auth')}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>{authUser?.role === 'ADMIN' ? 'Clinic Staff Portal' : 'Clinic Staff Sign In'}</span>
                </button>
                {authUser && <button
                  onClick={() => { signOut(); handleNavClick('auth'); }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>Sign Out</span>
                </button>}
              </div>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="pt-6 border-t border-slate-100 space-y-2.5">
              <button
                onClick={() => handleNavClick('book')}
                className="w-full flex items-center justify-center gap-2 bg-brand-teal-600 hover:bg-brand-teal-700 text-white text-sm font-semibold py-3 rounded-xl shadow-subtle"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Online Consultation</span>
              </button>
              <a
                href={CLINIC_CONFIG.phoneDialHref}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-brand-navy-900 text-sm font-medium py-2.5 rounded-xl"
              >
                <Phone className="w-4 h-4 text-brand-teal-700" />
                <span>Call Riya: {CLINIC_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
