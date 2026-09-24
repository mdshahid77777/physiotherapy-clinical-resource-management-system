import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { EmergencyBanner } from './components/common/EmergencyBanner';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';
import { MobileStickyCTA } from './components/common/MobileStickyCTA';
import { ToastContainer } from './components/common/UIComponents';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ConditionsPage } from './pages/ConditionsPage';
import { OnlineConsultationPage } from './pages/OnlineConsultationPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage, TermsPage } from './pages/LegalPages';
import { AuthPage } from './pages/AuthPage';

// Complex feature components
import { PatientPortal } from './components/portal/PatientPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { VideoConsultationRoom } from './components/consultation/VideoConsultationRoom';

export const App: React.FC = () => {
  const { currentRoute, authUser, authReady, navigateTo, addToast } = useApp();

  useEffect(() => {
    const protectedRoute = currentRoute === 'admin' || currentRoute === 'portal' || currentRoute === 'patient-portal';
    const allowed = (currentRoute === 'admin' && authUser?.role === 'ADMIN') || ((currentRoute === 'portal' || currentRoute === 'patient-portal') && authUser?.role === 'PATIENT');
    if (authReady && protectedRoute && !allowed) {
      addToast(authUser?.role === 'PATIENT' && currentRoute === 'admin' ? "You don't have permission to access this area." : 'Please sign in to access your portal.', 'error');
      navigateTo('auth');
    }
  }, [authReady, authUser, currentRoute, navigateTo, addToast]);

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
      case 'service-detail':
        return <ServicesPage />;
      case 'conditions':
      case 'condition-detail':
        return <ConditionsPage />;
      case 'online-consultation':
        return <OnlineConsultationPage />;
      case 'book':
        return <BookAppointmentPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      case 'video-room':
        return <VideoConsultationRoom />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'auth':
        return <AuthPage />;
      case 'portal':
        return authUser?.role === 'PATIENT' ? <PatientPortal /> : <AuthPage />;
      case 'patient-portal':
        return authUser?.role === 'PATIENT' ? <PatientPortal /> : <AuthPage />;
      case 'admin':
        return authUser?.role === 'ADMIN' ? <AdminDashboard /> : <AuthPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-brand-teal-100 selection:text-brand-teal-900 has-bottom-sticky">
      {/* Top Emergency Safety Banner */}
      <EmergencyBanner />

      {/* Sticky Premium Header */}
      <Header />

      {/* Main View Container */}
      <main className="flex-1 w-full">
        {renderCurrentView()}
      </main>

      {/* Premium Footer */}
      <Footer />

      {/* Floating Action Elements */}
      <WhatsAppFloatingButton />
      <MobileStickyCTA />
      <ToastContainer />
    </div>
  );
};
