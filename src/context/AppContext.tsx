import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appointment, Exercise, ContactMessage, IntakeData } from '../types';
import { INITIAL_EXERCISE_PLAN } from '../data/exercises';
import { CLINIC_CONFIG } from '../data/config';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export type AuthRole = 'PATIENT' | 'ADMIN';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: AuthRole;
}

interface AppContextType {
  currentRoute: string;
  navigateTo: (route: string, params?: { serviceId?: string; conditionId?: string }) => void;
  selectedServiceId: string | null;
  selectedConditionId: string | null;

  authUser: AuthUser | null;
  authReady: boolean;
  signInPatient: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signInAdmin: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signUpPatient: (details: { name: string; email: string; phone: string; password: string; dob?: string }) => Promise<{ success: boolean; message: string }>;
  signOut: () => void;
  
  // Appointments
  appointments: Appointment[];
  bookAppointment: (newAppt: Omit<Appointment, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  
  // Patient Portal State
  currentPatient: {
    name: string;
    email: string;
    phone: string;
  };
  patientExercises: Exercise[];
  toggleExerciseCompletion: (exerciseId: string) => void;
  
  // Intake Form
  intakeSubmissions: IntakeData[];
  submitIntake: (intake: IntakeData) => void;
  
  // Inquiries & Messages
  contactMessages: ContactMessage[];
  submitContactMessage: (msg: { fullName: string; email: string; phone: string; message: string }) => Promise<{ success: boolean; message: string }>;
  loadContactMessages: () => Promise<void>;
  updateContactMessage: (id: string, status: ContactMessage['status']) => Promise<void>;
  deleteContactMessage: (id: string) => Promise<void>;
  
  // Toast notifications
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Selected appointment for video consultation
  activeConsultationAppt: Appointment | null;
  setActiveConsultationAppt: (appt: Appointment | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-1', referenceNumber: 'RM-78921', serviceId: 'online-consultation',
    serviceName: 'Online Physiotherapy Consultation', date: '2026-09-16',
    timeSlot: '11:00 AM - 11:45 AM', patientName: 'Rahul Sharma',
    patientEmail: 'rahul.sharma@example.com', patientPhone: '+91 98765 43210',
    dob: '1988-06-14', primaryConcern: 'Lower back stiffness and left hip aching after desk shifts',
    preferredLanguage: 'English / Hindi', additionalNotes: 'Demo appointment data', status: 'confirmed',
    createdAt: '2026-09-13T10:00:00Z', paymentStatus: 'paid_online',
    telehealthLink: 'https://meet.google.com/demo-riya-master-telehealth'
  },
  {
    id: 'appt-2', referenceNumber: 'RM-78922', serviceId: 'online-consultation',
    serviceName: 'Online Physiotherapy Consultation', date: '2026-09-17',
    timeSlot: '04:00 PM - 04:45 PM', patientName: 'Neha Patel',
    patientEmail: 'neha.patel@example.com', patientPhone: '+91 98221 09876',
    dob: '1995-11-20', primaryConcern: 'Demo consultation concern', preferredLanguage: 'English',
    status: 'pending', createdAt: '2026-09-14T08:30:00Z', paymentStatus: 'unpaid'
  },
  {
    id: 'appt-3', referenceNumber: 'RM-78890', serviceId: 'online-consultation',
    serviceName: 'Online Physiotherapy Consultation', date: '2026-09-14',
    timeSlot: '05:30 PM - 06:15 PM', patientName: 'Amit Desai',
    patientEmail: 'amit.d@example.com', patientPhone: '+91 97110 54321',
    dob: '1990-03-08', primaryConcern: 'Demo consultation concern', preferredLanguage: 'English',
    status: 'completed', createdAt: '2026-09-10T14:15:00Z', paymentStatus: 'paid_online'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sync with browser hash to enable natural browser history back/forward
  const getInitialRoute = () => {
    const hash = window.location.hash.replace('#', '').trim();
    return hash || 'home';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  
  const [appointments, setAppointments] = useState<Appointment[]>(DEMO_INITIAL_APPOINTMENTS);
  const [patientExercises, setPatientExercises] = useState<Exercise[]>(INITIAL_EXERCISE_PLAN);
  const [intakeSubmissions, setIntakeSubmissions] = useState<IntakeData[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeConsultationAppt, setActiveConsultationAppt] = useState<Appointment | null>(DEMO_INITIAL_APPOINTMENTS[0]);

  const currentPatient = authUser?.role === 'PATIENT' ? {
    name: authUser.name,
    email: authUser.email,
    phone: authUser.phone,
  } : {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
  };

  const signUpPatient = async (details: { name: string; email: string; phone: string; password: string; dob?: string }) => {
    const response = await fetch('/api/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(details) });
    const result = await response.json();
    return { success: response.ok, message: result.message || 'Unable to create the account.' };
  };

  const signInPatient = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, role: 'PATIENT' }) });
    const result = await response.json();
    if (response.ok) setAuthUser(result.user);
    return { success: response.ok, message: result.message || (response.ok ? 'Signed in successfully.' : 'Invalid patient email or password.') };
  };

  const signInAdmin = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, role: 'ADMIN' }) });
    const result = await response.json();
    if (response.ok) setAuthUser(result.user);
    return { success: response.ok, message: result.message || (response.ok ? 'Signed in successfully.' : 'Invalid staff credentials.') };
  };

  const signOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setAuthUser(null);
  };

  useEffect(() => {
    fetch('/api/auth/session')
      .then(response => response.ok ? response.json() : { user: null })
      .then(result => setAuthUser(result.user))
      .catch(() => setAuthUser(null))
      .finally(() => setAuthReady(true));
  }, []);

  useEffect(() => {
    if (authUser?.role === 'ADMIN') loadContactMessages();
  }, [authUser]);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash) {
        // Handle routes with params, e.g. service/online-consultation
        if (hash.startsWith('service/')) {
          setSelectedServiceId(hash.replace('service/', ''));
          setCurrentRoute('service-detail');
        } else if (hash.startsWith('condition/')) {
          setSelectedConditionId(hash.replace('condition/', ''));
          setCurrentRoute('condition-detail');
        } else {
          setCurrentRoute(hash);
        }
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string, params?: { serviceId?: string; conditionId?: string }) => {
    if (params?.serviceId) {
      setSelectedServiceId(params.serviceId);
      window.location.hash = `service/${params.serviceId}`;
      setCurrentRoute('service-detail');
    } else if (params?.conditionId) {
      setSelectedConditionId(params.conditionId);
      window.location.hash = `condition/${params.conditionId}`;
      setCurrentRoute('condition-detail');
    } else {
      window.location.hash = route;
      setCurrentRoute(route);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const bookAppointment = (
    newApptData: Omit<Appointment, 'id' | 'referenceNumber' | 'createdAt' | 'status'>
  ): Appointment => {
    const refNum = `RM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newAppt: Appointment = {
      ...newApptData,
      id: `appt-${Date.now()}`,
      referenceNumber: refNum,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      telehealthLink: 'https://meet.google.com/demo-telehealth-' + refNum.toLowerCase(),
    };

    setAppointments((prev) => [newAppt, ...prev]);
    setActiveConsultationAppt(newAppt);
    addToast(`Appointment successfully requested! Reference: ${refNum}`, 'success');
    return newAppt;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status } : appt))
    );
    addToast(`Appointment status updated to ${status}`, 'info');
  };

  const toggleExerciseCompletion = (exerciseId: string) => {
    setPatientExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
      )
    );
  };

  const submitIntake = (intake: IntakeData) => {
    setIntakeSubmissions((prev) => [intake, ...prev]);
    addToast('Patient clinical intake submitted successfully to Dr. Riya', 'success');
  };

  const submitContactMessage = async (msg: { fullName: string; email: string; phone: string; message: string }) => {
    try {
      const response = await fetch('https://formsubmit.co/ajax/77b31c727f041903164e56836b4e7f65', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: msg.fullName,
          fullName: msg.fullName,
          email: msg.email,
          phone: msg.phone,
          message: msg.message,
          _replyto: msg.email,
          _subject: 'New Patient Enquiry — Master\'s Physiotherapy',
          _captcha: 'false',
          _template: 'table',
          _honey: '',
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) {
        return { success: false, message: "We couldn't send your message. Please try again or contact Riya directly." };
      }
      return { success: true, message: 'Your message has been sent successfully. Riya will get back to you shortly!' };
    } catch {
      return { success: false, message: "We couldn't send your message. Please try again or contact Riya directly." };
    }
  };

  const loadContactMessages = async () => {
    const response = await fetch('/api/admin/messages');
    if (!response.ok) return;
    const result = await response.json();
    setContactMessages(result.messages || []);
  };

  const updateContactMessage = async (id: string, status: ContactMessage['status']) => {
    const response = await fetch(`/api/admin/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Unable to update the message.');
    const result = await response.json();
    setContactMessages(previous => previous.map(message => message.id === id ? result.message : message));
  };

  const deleteContactMessage = async (id: string) => {
    const response = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Unable to delete the message.');
    setContactMessages(previous => previous.filter(message => message.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigateTo,
        selectedServiceId,
        selectedConditionId,
        authUser,
        authReady,
        signInPatient,
        signInAdmin,
        signUpPatient,
        signOut,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        currentPatient,
        patientExercises,
        toggleExerciseCompletion,
        intakeSubmissions,
        submitIntake,
        contactMessages,
        submitContactMessage,
        loadContactMessages,
        updateContactMessage,
        deleteContactMessage,
        toasts,
        addToast,
        removeToast,
        activeConsultationAppt,
        setActiveConsultationAppt,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
