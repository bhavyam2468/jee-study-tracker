# 🚀 Quick Start Guide

## First Time Setup

1. **Open Terminal** in VSCode (View → Terminal or Ctrl+`)

2. **Navigate to project folder:**
   ```bash
   cd jee-study-tracker
   ```

3. **Install dependencies** (only needed once):
   ```bash
   npm install
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   - The terminal will show: `Local: http://localhost:5173/`
   - Click the link or open `http://localhost:5173/` in your browser

## Daily Development

```bash
# Start server
cd jee-study-tracker
npm run dev

# Stop server (in terminal)
Ctrl+C
```

## Important Notes

- **Don't use "Go Live" extension** - This is a React app, not static HTML
- Server must be running to see changes
- Changes auto-reload when you save files
- Keep terminal open while developing

## Configuration

Edit default subjects/chapters in:
```
src/config/appConfig.ts
```

## Building for Production

```bash
npm run build
npm run preview
```

The built files will be in `dist/` folder.