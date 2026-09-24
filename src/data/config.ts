import { ClinicConfig } from '../types';

export const CLINIC_CONFIG: ClinicConfig = {
  doctorName: "Riya Master, BPT",
  clinicName: "Master's Physiotherapy",
  tagline: "Accessible online physiotherapy guidance",
  subtitle: "Online physiotherapy consultation and guidance from Riya Master, BPT.",
  qualification: "Bachelor of Physiotherapy (BPT)",
  specialization: "Not specified",
  experienceYears: "Fresher / Newly graduated",
  registrationDetails: "Not yet applied",
  phone: "9737508297",
  phoneDialHref: "tel:+919737508297",
  email: "riamaster17@gmail.com",
  whatsappNumber: "9737508297",
  instagramUsername: "riyamaster22",
  instagramUrl: "https://www.instagram.com/riyamaster22/",
  doctorPhotoUrl: "https://cdn.phototourl.com/free/2026-09-14-7444d185-3b04-44bd-8460-3987c34c6f8b.jpg",
  logoUrl: "https://cdn.phototourl.com/free/2026-09-14-436bf8b1-8dcc-4e1c-81f5-7bfbe22a6ed5.png",
  address: "C-24 Ashray Society, Nandelav Road, Bharuch",
  clinicHours: "Monday-Saturday: 9:00 AM - 1:00 PM; Sunday: Closed",
  appointmentFee: "₹200",
  consultationFee: "₹150",
  consultationDuration: "30 Minutes",
  
  // Integration Architecture
  videoProvider: 'meet', // 'meet' | 'zoom' | 'daily' | 'jitsi' | 'webrtc'
  paymentGatewayConfigured: false,
  razorpayKey: import.meta.env.VITE_RAZORPAY_KEY || "",
  stripeKey: import.meta.env.VITE_STRIPE_KEY || "",
  
  whatsappMessage: "Hello Riya, I would like to enquire about an online physiotherapy consultation.",
};

export const EMERGENCY_NOTICE = {
  title: "Important Medical Safety Notice",
  body: "If you are experiencing severe or sudden symptoms, major trauma, difficulty breathing, chest pain, loss of consciousness, sudden weakness, or another medical emergency, seek immediate emergency medical care at the nearest hospital rather than relying on an online physiotherapy consultation.",
};

export const TELEMEDICINE_NOTE = {
  title: "Digital Consultation Suitability",
  body: "Online consultation may not be appropriate for every concern. Some situations require an in-person physical examination, imaging, or urgent medical assessment. Riya will explain when online guidance is not suitable.",
};
