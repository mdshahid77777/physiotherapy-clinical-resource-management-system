import { Exercise } from '../types';

export const INITIAL_EXERCISE_PLAN: Exercise[] = [
  {
    id: 'ex-1',
    title: 'Cat-Cow Segmental Spinal Mobility',
    category: 'Mobility',
    targetRegion: 'Thoracic & Lumbar Spine',
    duration: '3 mins',
    sets: 3,
    reps: '10 slow cycles',
    frequency: 'Twice daily (Morning & Evening)',
    instructions: [
      'Begin on all fours with hands directly below shoulders and knees beneath hips.',
      'Inhale: Gently drop your belly towards the floor, lift your chest and gaze slightly upward (Cow).',
      'Exhale: Draw your navel gently toward your spine, round your back toward the ceiling, and tuck your chin toward your chest (Cat).',
      'Move fluidly and synchronously with your breath without forcing end ranges.'
    ],
    safetyNotes: [
      'Avoid hyperextending the neck; maintain soft, smooth motion.',
      'If you experience any pinching in the lower back, decrease the depth of extension.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    completed: true
  },
  {
    id: 'ex-2',
    title: 'Prone Quadruped Bird-Dog Stability',
    category: 'Stability',
    targetRegion: 'Deep Core & Posterior Kinetic Chain',
    duration: '4 mins',
    sets: 3,
    reps: '8 reps per side',
    frequency: 'Once daily',
    instructions: [
      'Set up in a neutral spine tabletop position with hips squared.',
      'Simultaneously reach your right arm straight forward and extend your left leg straight back.',
      'Pause for 2-3 seconds at full extension, keeping hips level without rotating.',
      'Slowly return to the start position and alternate to the left arm and right leg.'
    ],
    safetyNotes: [
      'Imagine balancing a glass of water on your lower back—do not let your hips sag or tilt.',
      'Keep your gaze downward toward the mat to avoid cervical strain.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    completed: true
  },
  {
    id: 'ex-3',
    title: 'Glute Bridge with Isometric Hold',
    category: 'Strengthening',
    targetRegion: 'Gluteus Maximus & Hamstrings',
    duration: '4 mins',
    sets: 3,
    reps: '12 repetitions (3s pause)',
    frequency: 'Once daily',
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor, hip-width apart.',
      'Engage your abdominal wall lightly without breath-holding.',
      'Press through your heels to lift your hips until thighs and torso align.',
      'Squeeze glutes at the top for 3 seconds, then lower slowly with control.'
    ],
    safetyNotes: [
      'Do not arch your lumbar spine at the peak; the lift must come from glute contraction.',
      'Ensure knees stay tracking in line with toes, not caving inward.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
    completed: true
  },
  {
    id: 'ex-4',
    title: 'Deep Cervical Flexor Chin Tucks',
    category: 'Postural',
    targetRegion: 'Cervical Spine & Suboccipital Muscles',
    duration: '2 mins',
    sets: 3,
    reps: '10 repetitions (5s hold)',
    frequency: 'Every 2 hours during desk work',
    instructions: [
      'Sit tall with shoulders relaxed and eyes looking straight ahead.',
      'Gently glide your head backward as if making a subtle double chin.',
      'Hold the retracted position for 5 seconds while breathing normally.',
      'Release back to neutral position. Do not tilt your head up or down.'
    ],
    safetyNotes: [
      'Motion is purely horizontal translation; do not jam chin into chest violently.',
      'Stop if you feel any dizziness or shooting tingling down your arms.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    completed: true
  },
  {
    id: 'ex-5',
    title: 'Thoracic Extension over Foam Roller / Towel Roll',
    category: 'Mobility',
    targetRegion: 'Mid-Back & Ribcage Excursion',
    duration: '3 mins',
    sets: 2,
    reps: '8 gentle extensions',
    frequency: 'Once daily',
    instructions: [
      'Place a rolled towel or foam roller horizontally across your mid-back.',
      'Support your head with your hands, keeping elbows pointing forward.',
      'Gently arch backward over the fulcrum, feeling a comfortable opening in the chest.',
      'Hold for 3-5 seconds, take a deep breath into the ribs, and return to neutral.'
    ],
    safetyNotes: [
      'Never place the roller under the lower back (lumbar); keep it strictly in the rib cage zone.',
      'Keep glutes on the ground throughout.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    completed: false
  },
  {
    id: 'ex-6',
    title: 'Side-Lying Clamshell with Band Resistance',
    category: 'Strengthening',
    targetRegion: 'Gluteus Medius & Pelvic Stability',
    duration: '4 mins',
    sets: 3,
    reps: '15 reps per side',
    frequency: 'Once daily',
    instructions: [
      'Lie on your side with hips stacked, knees bent at 90 degrees, and feet together.',
      'Keeping your feet in contact, slowly lift your top knee toward the ceiling.',
      'Pause at top for 1 second, focusing on contracting the outside of the hip.',
      'Lower down slowly and repeat before switching sides.'
    ],
    safetyNotes: [
      'Do not let your pelvis roll backward during the lift; keep your top hip slightly rolled forward.',
      'If using a resistance band, choose a light tension to avoid compensatory muscle recruitment.'
    ],
    videoThumbnail: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=600&q=80',
    completed: false
  }
];
