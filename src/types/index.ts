export interface ClinicConfig {
  doctorName: string;
  clinicName: string;
  tagline: string;
  subtitle: string;
  qualification: string;
  specialization: string;
  experienceYears: string;
  registrationDetails: string;
  phone: string;
  phoneDialHref: string;
  email: string;
  whatsappNumber: string;
  instagramUsername: string;
  instagramUrl: string;
  doctorPhotoUrl: string;
  logoUrl: string;
  address: string;
  clinicHours: string;
  appointmentFee: string;
  consultationFee: string;
  consultationDuration: string;
  videoProvider: 'meet' | 'zoom' | 'daily' | 'jitsi' | 'webrtc';
  paymentGatewayConfigured: boolean;
  razorpayKey?: string;
  stripeKey?: string;
  whatsappMessage: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  idealFor: string[];
  clinicalApproach: string[];
  sessionDuration: string;
  mode: 'online' | 'hybrid' | 'both';
  price?: number;
  badge?: string;
}

export interface Condition {
  id: string;
  slug: string;
  name: string;
  category: 'Spine' | 'Joints' | 'Sports' | 'Posture & Work' | 'Rehabilitation' | 'Mobility' | 'Balance & Functional Mobility';
  shortDescription: string;
  commonSymptoms: string[];
  whenPhysioHelps: string[];
  recommendedServices: string[];
  ergonomicTips: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Online Consultation' | 'Clinical Process' | 'Booking & Fees' | 'Safety';
}

export interface Testimonial {
  id: string;
  patientName: string;
  conditionOrService: string;
  rating: number;
  content: string;
  timeframe: string;
  isDemoContent: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  category: 'Mobility' | 'Strengthening' | 'Stability' | 'Postural' | 'Stretching';
  targetRegion: string;
  duration: string;
  sets: number;
  reps: string;
  frequency: string;
  instructions: string[];
  safetyNotes: string[];
  videoThumbnail: string;
  completed?: boolean;
}

export interface Appointment {
  id: string;
  referenceNumber: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  dob: string;
  primaryConcern: string;
  preferredLanguage: string;
  additionalNotes?: string;
  status: 'confirmed' | 'pending' | 'rescheduled' | 'cancelled' | 'completed';
  createdAt: string;
  paymentStatus: 'pending_at_clinic' | 'paid_online' | 'unpaid';
  telehealthLink?: string;
}

export interface IntakeData {
  // Step 1: Personal
  fullName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  occupation: string;
  emergencyContact: string;

  // Step 2: Primary Concern
  primaryComplaint: string;
  affectedBodyArea: string;
  symptomOnset: string;
  isWorkOrSportRelated: boolean;

  // Step 3: Symptoms
  painLevelCurrent: number; // 0 to 10
  painLevelWorst: number;
  painType: string[]; // Sharp, Dull, Aching, Burning, Throbbing, Tingling
  aggravatingFactors: string;
  relievingFactors: string;

  // Step 4: Medical History
  previousTreatments: string;
  surgeriesOrInjuries: string;
  currentMedications: string;
  hasRedFlags: boolean; // sudden numbness, chest pain, bowel/bladder loss

  // Step 5: Goals
  functionalGoals: string;
  activityLevel: string;

  // Step 6: Consent
  telehealthConsent: boolean;
  privacyConsent: boolean;
  accuracyDeclaration: boolean;
}

export interface ConsultationSession {
  id: string;
  appointmentRef: string;
  date: string;
  time: string;
  doctorName: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  telehealthRoomId: string;
  provider: string;
  clinicalNotesSummary?: string;
  rehabPlanAssignedId?: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  name?: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  read: boolean;
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}
