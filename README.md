# JEE Study Tracker

A modern, minimalist React-based study tracking application for JEE preparation with advanced progress tracking, 10-level precision checkballs, data persistence, and PDF export.

![JEE Study Tracker](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)

## Features

### Core Functionality
- ✅ **Track 90 chapters** across 3 subjects (Physics, Chemistry, Mathematics)
- ✅ **10-level granular progress tracking** (0-10 scale) for precise study monitoring
- ✅ **Dynamic column management** - add/remove custom study types
- ✅ **Real-time progress statistics** with chapter and overall completion percentages
- ✅ **Auto-save to localStorage** with 300ms debounce for performance

### Interactive Checkballs
- **Single Click**: Cycle through states (0 → 5 → 10 → 0)
- **Long Press (500ms)**: Open precision slider for granular control
- **Keyboard Shortcuts**: Press 0-9 to set precise levels
- **Visual Feedback**: Green gradient fill indicates completion level

### Data Management
- **Auto-save**: Progress automatically saved to browser localStorage
- **JSON Export**: Download your progress data for backup
- **JSON Import**: Restore progress from backup files with validation
- **Reset**: Return to default state with all 90 chapters

### User Interface
- **Modern Design**: Subtle blue-green gradient on black background
- **Rounded Corners**: Modernist aesthetic with glow effects (shadcn/ui inspired)
- **Light/Dark Mode**: Toggle between themes
- **Responsive**: Works on mobile, tablet, and desktop
- **Accessibility**: Full keyboard navigation and ARIA labels

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd jee-study-tracker

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## Usage Guide

### Tracking Progress

#### Using Checkballs
1. **Quick Progress**: Single-click to cycle through empty (0%) → half (50%) → full (100%)
2. **Precise Tracking**: Long-press any checkball to open the precision slider
3. **Keyboard Shortcuts**: Focus a checkball and press number keys 0-9 to set exact levels

#### Managing Columns
- Click "+ Column" on any subject to add custom study types
- Default columns: PYQs (Previous Year Questions), Notes
- Available options: Lectures, Quick Revision, Brush up
- Add your own custom column names

#### Managing Chapters
- Click "+ Add Chapter" at the bottom of any subject table
- Enter chapter name and press Enter or click Add
- All chapters automatically get checkballs for existing columns

### Data Management

#### Export Data
1. Click the ⬇️ icon in the header
2. A JSON file will download with your current progress
3. Filename format: `jee-study-tracker-YYYY-MM-DD.json`

#### Import Data
1. Click the ⬆️ icon in the header
2. Select a previously exported JSON file
3. Data will be validated and loaded

#### PDF Export
1. Click the 📄 icon in the header
2. Choose layout:
   - **Styled Layout**: Maintains colors and design
   - **Plain White/Black**: Print-friendly version

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Set checkball to level 0-9 (when focused) |
| `Space` | Cycle checkball through states |
| `Enter` | Open precision slider |
| `Escape` | Close modal |
| `Tab` | Navigate between checkballs |

## Project Structure

```
jee-study-tracker/
├── src/
│   ├── components/         # React components
│   │   ├── Header/        # App header with controls
│   │   ├── Footer/        # Progress statistics
│   │   ├── SubjectTable/  # Subject table display
│   │   └── Checkball/     # Interactive checkball
│   ├── contexts/          # React Context for state
│   ├── hooks/             # Custom React hooks
│   ├── services/          # Business logic
│   ├── types/             # TypeScript definitions
│   ├── data/              # Default chapter data
│   ├── styles/            # Global styles
│   └── App.tsx            # Main app component
├── public/
└── package.json
```

## Technical Details

### Tech Stack
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **CSS Modules** for component-scoped styling
- **html2canvas + jspdf** for PDF generation

### State Management
- React Context API with useReducer for global state
- LocalStorage for data persistence
- Automatic debounced saves (300ms)

### Progress Calculation
```typescript
// Overall completion percentage
completion = (sum of all checkball levels / (total checkballs × 10)) × 100

// Chapter is "completed" when all its checkballs are at level 10
```

## Default Subjects

### Physics (30 Chapters)
Physics and Measurements, Kinematics, Laws of Motion, Work Energy and Power, Rotational Motion, Gravitation, Properties of Solids and Liquids, Thermodynamics, Kinetic Theory of Gases, Oscillations and Waves, Electrostatics, Current Electricity, Magnetic Effects of Current and Magnetism, Electromagnetic Induction and Alternating Currents, Electromagnetic Waves, Ray Optics and Optical Instruments, Wave Optics, Dual Nature of Matter and Radiation, Atoms, Nuclei, Semiconductor Electronics, Communication Systems, Experimental Skills, Error Analysis, Modern Physics Applications, Fluid Mechanics, Thermal Properties of Matter, Simple Harmonic Motion, System of Particles and Centre of Mass, Mechanical Properties of Materials

### Chemistry (30 Chapters)
Some Basic Concepts of Chemistry, Atomic Structure, Chemical Bonding and Molecular Structure, Chemical Thermodynamics, Solutions, Equilibrium, Redox Reactions and Electrochemistry, Chemical Kinetics, Surface Chemistry, Classification of Elements and Periodicity, Hydrogen, s-Block Elements, p-Block Elements, d and f-Block Elements, Coordination Compounds, Environmental Chemistry, Purification and Characterization of Organic Compounds, Basic Principles of Organic Chemistry, Hydrocarbons, Organic Compounds Containing Halogens, Organic Compounds Containing Oxygen, Organic Compounds Containing Nitrogen, Biomolecules, Polymers, Chemistry in Everyday Life, Solid State, Solutions and Colligative Properties, Aldehydes Ketones and Carboxylic Acids, Amines, Practical Organic Chemistry

### Mathematics (30 Chapters)
Sets Relations and Functions, Complex Numbers and Quadratic Equations, Matrices and Determinants, Permutations and Combinations, Mathematical Induction, Binomial Theorem, Sequences and Series, Limit Continuity and Differentiability, Application of Derivatives, Indefinite Integration, Definite Integration, Area Under Curves, Differential Equations, Straight Lines, Circles, Parabola, Ellipse, Hyperbola, Three Dimensional Geometry, Vector Algebra, Statistics, Probability, Trigonometry, Inverse Trigonometric Functions, Trigonometric Equations, Heights and Distances, Mathematical Reasoning, Linear Programming, Coordinate Geometry, Conic Sections

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

## Performance
- Optimized for rendering 90+ chapters
- Debounced localStorage writes
- Memoized components for efficient re-renders
- Bundle size: ~200KB gzipped (excluding PDF libraries)

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
MIT License - feel free to use this project for your studies!

## Acknowledgments
- Inspired by modern study tracking needs
- UI design influenced by shadcn/ui aesthetic
- Built for JEE aspirants by developers who understand the grind

## Support
For issues, questions, or suggestions, please open an issue on GitHub.

---

**Good luck with your JEE preparation! 🚀📚**
