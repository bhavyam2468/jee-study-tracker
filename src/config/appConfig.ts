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
  "Physics and Measurements",
  "Kinematics",
  "Laws of Motion",
  "Work Energy and Power",
  "Rotational Motion",
  "Gravitation",
  "Properties of Solids and Liquids",
  "Thermodynamics",
  "Kinetic Theory of Gases",
  "Oscillations and Waves",
  "Electrostatics",
  "Current Electricity",
  "Magnetic Effects of Current and Magnetism",
  "Electromagnetic Induction and Alternating Currents",
  "Electromagnetic Waves",
  "Ray Optics and Optical Instruments",
  "Wave Optics",
  "Dual Nature of Matter and Radiation",
  "Atoms",
  "Nuclei",
  "Semiconductor Electronics",
  "Communication Systems",
  "Experimental Skills",
  "Error Analysis",
  "Modern Physics Applications",
  "Fluid Mechanics",
  "Thermal Properties of Matter",
  "Simple Harmonic Motion",
  "System of Particles and Centre of Mass",
  "Mechanical Properties of Materials"
];

// Chemistry chapters for JEE
export const CHEMISTRY_CHAPTERS = [
  "Some Basic Concepts of Chemistry",
  "Atomic Structure",
  "Chemical Bonding and Molecular Structure",
  "Chemical Thermodynamics",
  "Solutions",
  "Equilibrium",
  "Redox Reactions and Electrochemistry",
  "Chemical Kinetics",
  "Surface Chemistry",
  "Classification of Elements and Periodicity",
  "Hydrogen",
  "s-Block Elements",
  "p-Block Elements",
  "d and f-Block Elements",
  "Coordination Compounds",
  "Environmental Chemistry",
  "Purification and Characterization of Organic Compounds",
  "Basic Principles of Organic Chemistry",
  "Hydrocarbons",
  "Organic Compounds Containing Halogens",
  "Organic Compounds Containing Oxygen",
  "Organic Compounds Containing Nitrogen",
  "Biomolecules",
  "Polymers",
  "Chemistry in Everyday Life",
  "Solid State",
  "Solutions and Colligative Properties",
  "Aldehydes Ketones and Carboxylic Acids",
  "Amines",
  "Practical Organic Chemistry"
];

// Mathematics chapters for JEE
export const MATHEMATICS_CHAPTERS = [
  "Sets Relations and Functions",
  "Complex Numbers and Quadratic Equations",
  "Matrices and Determinants",
  "Permutations and Combinations",
  "Mathematical Induction",
  "Binomial Theorem",
  "Sequences and Series",
  "Limit Continuity and Differentiability",
  "Application of Derivatives",
  "Indefinite Integration",
  "Definite Integration",
  "Area Under Curves",
  "Differential Equations",
  "Straight Lines",
  "Circles",
  "Parabola",
  "Ellipse",
  "Hyperbola",
  "Three Dimensional Geometry",
  "Vector Algebra",
  "Statistics",
  "Probability",
  "Trigonometry",
  "Inverse Trigonometric Functions",
  "Trigonometric Equations",
  "Heights and Distances",
  "Mathematical Reasoning",
  "Linear Programming",
  "Coordinate Geometry",
  "Conic Sections"
];

// Default subjects configuration
export const DEFAULT_SUBJECTS = [
  { name: 'Physics', chapters: PHYSICS_CHAPTERS },
  { name: 'Chemistry', chapters: CHEMISTRY_CHAPTERS },
  { name: 'Mathematics', chapters: MATHEMATICS_CHAPTERS }
];