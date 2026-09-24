import { Condition } from '../types';

const demoCondition = (id: string, name: string, category: Condition['category']): Condition => ({
  id, slug: id, name, category, shortDescription: 'Representative demo information for layout and navigation only; conditions treated must be confirmed.',
  commonSymptoms: ['Demo symptom information'], whenPhysioHelps: ['To be confirmed'], recommendedServices: ['Online Physiotherapy Consultation'], ergonomicTips: ['General information only; confirm before publication'],
});

export const CLINIC_CONDITIONS: Condition[] = [
  demoCondition('back-pain', 'Back Pain & Lumbar Strain', 'Spine'),
  demoCondition('neck-pain', 'Neck Pain & Cervical Strain', 'Spine'),
  demoCondition('knee-pain', 'Knee Pain & Patellofemoral Discomfort', 'Joints'),
  demoCondition('shoulder-pain', 'Shoulder Pain & Rotator Cuff Irritation', 'Joints'),
  demoCondition('sports-injuries', 'Sports Injuries & Athletic Overuse', 'Sports'),
  demoCondition('muscle-strain', 'Muscle Strain & Acute Spasms', 'Sports'),
  demoCondition('joint-stiffness', 'Joint Stiffness & Reduced Range of Motion', 'Joints'),
  demoCondition('posture-problems', 'Postural Strain & Work-Related Discomfort', 'Posture & Work'),
  demoCondition('mobility-issues', 'Functional Mobility Limitations', 'Mobility'),
  demoCondition('balance-functional-mobility', 'Balance & Functional Mobility', 'Balance & Functional Mobility'),
];
