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
  "2-D and vectors",
  "Laws of Motion",
  "Circular Motion",
  "Work, Energy and Power",
  "Centre of mass", 
  "Rotational Motion",
  "Gravitation",
  "Solids",
  "Liquids",
  "Oscillations and Waves",
  "Thermodynamics",
  "Kinetic Theory of Gases",
  "Electrostatics",
  "Current Electricity",
  "Magnetic Effects of Current and Magnetism",
  "Electromagnetic Induction",
  "Alternating Currents",
  "Electromagnetic Waves",
  "Ray Optics",
  "Wave Optics",
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
  "Chemical Equilibrium",
  "Ionic Equilibrium",
  "Redox Reactions and Electrochemistry Basics",
  "Chemical Kinetics",
  "Surface Chemistry",
  "Solid State",
  "Classification of Elements and Periodicity in Properties",
  "Hydrogen",
  "s-Block Elements",
  "p-Block Elements",
  "d-Block and f-Block Elements",
  "Coordination Compounds",
  "ElectroChemistry",
  "GOC, Nomenclature and Isomerism",
  "Reaction Mechanisms",
  "Hydrocarbons",
  "Haloalkanes and arenes",
  "Alcohol, Phenol and Ether",
  "Aldehyde, Ketone and Carboxylic acid",
  "Biomolecules",
  "Polymers",
  "Chemistry in Everyday Life"
];

// Mathematics chapters for JEE
export const MATHEMATICS_CHAPTERS = [
  "Sets", 
  "Trigonometry",
  "Relations and Functions",
  "Complex Numbers",
  "Quadratic Equations",
  "Matrices", 
  "Determinants",
  "Permutations and Combinations",
  "Binomial Theorem",
  "Sequence and Series",
  "Straight line",
  "Circle",
  "Hyperbola",
  "Parabola", 
  "Ellipse", 
  "Inverse Trignometry",
  "Limits",
  "Continuity and Differentiability",
  "Method of Differentiation",
  "Application of Derivatives",
  "Indefinite Integration",
  "Definite Integration",
  "Area Under the Curve",
  "Differential Equations",
  "Three Dimensional Geometry",
  "Vector Algebra",
  "Statistics",
  "Probability"
];

// Default subjects configuration
export const DEFAULT_SUBJECTS = [
  { name: 'Physics', chapters: PHYSICS_CHAPTERS },
  { name: 'Chemistry', chapters: CHEMISTRY_CHAPTERS },
  { name: 'Mathematics', chapters: MATHEMATICS_CHAPTERS }
];