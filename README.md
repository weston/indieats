# Feed the Ostrich 🦩

A delightful frontend-only toddler game designed for iPad Safari, iPhone, and desktop browsers.

## Features

- **Touch-first interactions** using Pointer Events
- **Responsive design** that scales beautifully on all devices
- **Forgiving gameplay** - no fail states, just fun
- **Large touch targets** (80-120px) perfect for little fingers
- **Accessibility support** including reduced motion preferences
- **Sound effects** with iOS audio unlock
- **No dependencies** beyond React and Vite

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The game will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Play

1. Food items will fall from the sky automatically
2. Drag any food item to the ostrich's mouth
3. When food gets close, the ostrich will open its mouth in anticipation
4. Release the food near the mouth to feed the ostrich
5. Watch the ostrich react with a happy bounce and sparkles!

## Technical Details

- Built with **Vite + React** for fast development
- Uses **Pointer Events API** for cross-platform touch/mouse support
- **Web Audio API** for sound generation (no external audio files)
- **SVG graphics** for crisp rendering at any size
- **CSS animations** with reduced motion support
- **Viewport units (vw/vh)** for responsive scaling

## Browser Support

- iPad Safari (primary target)
- iPhone Safari
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Touch and mouse interactions both supported

## Accessibility

- Respects `prefers-reduced-motion` media query
- Mute toggle for sound control
- Large touch targets for easy interaction
- No text UI - visual-only interface

## Game Design

- **No menus, no scores, no fail states** - just pure cause and effect
- **Calm pace** - food falls slowly, giving time to interact
- **Forgiving drop zones** - generous proximity detection
- **Delightful feedback** - sparkles, animations, and sounds
- **Auto-recycling** - food that falls off screen respawns

Enjoy feeding the ostrich! 🎮

