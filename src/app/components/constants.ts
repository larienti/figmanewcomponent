// Size constants
export const ATHLETE_SIZES = {
  base: 90,
  shrunk: 70,
  expanded: 150,
} as const;

export const ATHLETE_RADII = {
  base: 45,
  shrunk: 35,
  expanded: 75,
} as const;

export const NODE_SIZE = 70;
export const EXERCISE_RADIUS = 120;

// Physics configuration
export const PHYSICS_CONFIG = {
  restitution: 0.6,
  friction: 0.01,
  frictionAir: 0.03,
  density: 0.001,
} as const;

// Apple design colors
export const COLORS = {
  text: '#1d1d1f',
  textSecondary: '#86868b',
  background: '#f5f5f7',
  backgroundHover: '#e8e8ed',
  success: '#34c759',
} as const;

// Animation presets
export const ANIMATIONS = {
  smooth: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 25,
  },
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 15,
  },
  stiff: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 30,
  },
} as const;

export const STAGGER_DELAY = 0.05;
