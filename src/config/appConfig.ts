/**
 * JEE Study Tracker Configuration
 * Edit this file to customize default subjects, chapters, and columns
 */

// Default columns that appear for each subject
export const DEFAULT_COLUMNS = [
  { name: 'PYQs', type: 'pyqs' as const },
  { name: 'Notes', type: 'notes' as const }
];

// Available columns that users can add via "More" button
export const AVAILABLE_COLUMNS = [
  { name: 'Lectures', type: 'lectures' as const },
  { name: 'Quick Revision', type: 'quick-revision' as const },
  { name: 'Brush up', type: 'brush-up' as const }
];

// Physics chapters for JEE
export const PHYSICS_CHAPTERS = [
  "Units and Measurements",
  "Kinematics",
  "Laws of Motion",
  "Work, Energy and Power",
  "Rotational Motion",
  "Gravitation",
  "Properties of Solids and Liquids",
  "Oscillations and Waves",
  "Thermodynamics",
  "Kinetic Theory of Gases",
  "Electrostatics",
  "Current Electricity",
  "Magnetic Effects of Current and Magnetism",
  "Electromagnetic Induction and Alternating Currents",
  "Electromagnetic Waves",
  "Optics",
  "Dual Nature of Matter and Radiation",
  "Atoms and Nuclei",
  "Electronic Devices"
];

// Chemistry chapters for JEE
export const CHEMISTRY_CHAPTERS = [
  "Some Basic Concepts in Chemistry",
  "Atomic Structure",
  "Chemical Bonding and Molecular Structure",
  "Chemical Thermodynamics",
  "Solutions",
  "Equilibrium (Chemical & Ionic)",
  "Redox Reactions and Electrochemistry",
  "Chemical Kinetics",
  "Surface Chemistry",
  "Solid State",
  "Classification of Elements and Periodicity in Properties",
  "Hydrogen",
  "s-Block Elements",
  "p-Block Elements",
  "d-Block and f-Block Elements",
  "Coordination Compounds",
  "Environmental Chemistry",
  "Purification and Characterisation of Organic Compounds",
  "Some Basic Principles of Organic Chemistry",
  "Hydrocarbons",
  "Organic Compounds Containing Halogens",
  "Organic Compounds Containing Oxygen",
  "Organic Compounds Containing Nitrogen",
  "Biomolecules",
  "Polymers",
  "Chemistry in Everyday Life"
];

// Mathematics chapters for JEE
export const MATHEMATICS_CHAPTERS = [
  "Sets, Relations and Functions",
  "Complex Numbers and Quadratic Equations",
  "Matrices and Determinants",
  "Permutations and Combinations",
  "Binomial Theorem",
  "Sequence and Series (Arithmetic & Geometric Progressions)",
  "Limit, Continuity and Differentiability",
  "Integral Calculus",
  "Differential Equations",
  "Coordinate Geometry",
  "Three Dimensional Geometry",
  "Vector Algebra",
  "Trigonometry",
  "Statistics and Probability"
];

// Default subjects configuration
export const DEFAULT_SUBJECTS = [
  { name: 'Physics', chapters: PHYSICS_CHAPTERS },
  { name: 'Chemistry', chapters: CHEMISTRY_CHAPTERS },
  { name: 'Mathematics', chapters: MATHEMATICS_CHAPTERS }
];