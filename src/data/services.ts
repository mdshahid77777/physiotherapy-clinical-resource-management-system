import { Service } from '../types';

const demo = (id: string, slug: string, title: string, description: string, duration = '45 mins', mode: 'online' | 'both' = 'both'): Service => ({
  id, slug, title, shortDescription: description, fullDescription: `${description} This is representative demo content and must be confirmed before publication.`, iconName: 'Activity',
  idealFor: ['Demo patient scenario', 'Patients seeking guidance', 'Individual goals to be confirmed'],
  clinicalApproach: ['Detailed history and discussion', 'Guided movement review', 'Personalized next steps to be confirmed'], sessionDuration: duration, mode,
});

export const CLINIC_SERVICES: Service[] = [
  { id: 'online-consultation', slug: 'online-physiotherapy-consultation', title: 'Online Physiotherapy Consultation', shortDescription: 'Primary service for accessible, personalized physiotherapy guidance by video.', fullDescription: 'A 30-minute online physiotherapy consultation focused on understanding your needs and discussing suitable next steps.', iconName: 'Video', idealFor: ['Online physiotherapy guidance', 'Children and older adults who can participate remotely', 'Patients seeking an initial discussion'], clinicalApproach: ['History and discussion', 'Guided movement review where suitable', 'Personalized next steps'], sessionDuration: '30 mins', mode: 'online', price: 150, badge: 'Primary focus' },
  { id: 'in-person-appointment', slug: 'in-person-physiotherapy-appointment', title: 'In-Person Appointment', shortDescription: 'A 30-minute appointment at the clinic where Riya currently works; this is not an independently operated clinic.', fullDescription: 'In-person physiotherapy support may be available at the clinic where Riya currently works, subject to appointment confirmation. Riya does not currently operate an independent physical clinic.', iconName: 'Activity', idealFor: ['Patients seeking in-person support', 'Children and older adults', 'Appointments requiring an in-person setting'], clinicalApproach: ['History and discussion', 'In-person assessment as appropriate', 'Personalized next steps'], sessionDuration: '30 mins', mode: 'both', price: 200, badge: 'In-person option' },
  { id: 'home-visits', slug: 'home-physiotherapy-visits', title: 'Home Physiotherapy Visits', shortDescription: 'Availability subject to location and appointment confirmation.', fullDescription: 'Home physiotherapy visits may be available. Availability is subject to location and appointment confirmation; fee, service area, and schedule are not yet confirmed.', iconName: 'Activity', idealFor: ['Patients who may need support at home', 'Children and older adults', 'Location-dependent appointments'], clinicalApproach: ['Needs discussion', 'Location confirmation', 'Appointment confirmation'], sessionDuration: '30 mins', mode: 'both', badge: 'Availability to confirm' },
  demo('pain-management', 'pain-management', 'Pain Management', 'Evidence-informed strategies for discussing pain, movement, and daily function.'),
  demo('exercise-therapy', 'exercise-therapy', 'Exercise Therapy', 'Targeted therapeutic exercise guidance and progression.'),
  demo('sports-injury', 'sports-injury-rehabilitation', 'Sports Injury Rehabilitation', 'Rehabilitation guidance for active individuals and sports-related concerns.'),
  demo('post-surgery', 'post-surgery-rehabilitation', 'Post-Surgery Rehabilitation', 'Structured rehabilitation guidance following orthopedic procedures.'),
  demo('posture-ergonomics', 'posture-and-ergonomic-guidance', 'Posture & Ergonomic Guidance', 'Practical workstation and movement guidance.', '30 mins', 'online'),
  demo('mobility-strength', 'mobility-and-strength-training', 'Mobility & Strength Training', 'Mobility and strengthening guidance for daily movement.'),
  demo('follow-up', 'follow-up-physiotherapy', 'Follow-Up Physiotherapy', 'Focused follow-up reviews for exercise and progress discussion.', '30 mins'),
];

export const BOOKABLE_SERVICES = CLINIC_SERVICES.filter(service => service.price !== undefined);
