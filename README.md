# Armaan's Digital Scrapbook & Portfolio

A tactile, physically-inspired creative portfolio and case study engine built with React, Vite, and Framer Motion. 

This project rejects generic templates in favor of a curated, studio-journal aesthetic. Think corkboards, printed photograph borders, torn paper, chalkboard texture, spring physics animations, and archival project dossiers.

## Tech Stack
- **Core Framework:** React 18 + Vite 5
- **Routing:** React Router v6
- **Animations:** Framer Motion (`AnimatePresence`, spring physics, swipe gestures)
- **Styling:** CSS Modules (Scrapbook Design Tokens, zero framework bloat)
- **Icons:** Lucide React

## Key Features & Layouts

### 📌 The Project Board (Featured & Supporting Works)
- **Scrapbook Project Wall**: Curated project cards pinned to a corkboard texture with masking tape, paper clips, reference notes, and worn paper edges.
- **Centerpiece Display**: Highlighted project card featuring printed photograph borders, red marker category tags, yellow highlighter summary borders, live links, and open case file actions.
- **Calm, Float Hover Physics**: Subtle float-up lift (`translateY(-5px)`) and gentle depth shadows without harsh scaling.

### 🖼️ Interactive Slide Viewer & Lightbox Carousel
- **Filmstrip Thumbnail Tray**: Interactive bottom filmstrip allowing quick slide switching.
- **Spring Slide Physics**: `AnimatePresence` directional slide transitions with spring physics.
- **Touch & Drag Swipe Support**: Native drag gestures for mobile & desktop slide inspection.
- **Archival Exhibit Captions**: Full-width exhibit labels (`[EXHIBIT 01]`) and keyboard shortcuts (`←`, `→`, `ESC`).

### 📁 Case Study Dossiers
- **Custom AI Travel Assistant & Theme Integration**: Dedicated technical case studies detailing Google Gemini 2.5 Flash LLM integration, custom HTML whitelist sanitizers, REST API architecture, and SPA page routing (`Swup.js` & `Lenis Scroll`).
- **Consistent Physical Surfaces**: Structured flow across dark desk hero, notebook paper overview, lined paper implementation steps, and challenge scrap cards.

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Design Principles
- **Physicality over Generic Templates:** Elements feature printed photo borders, realistic drop shadows, taped edges, and organic angles.
- **Micro-interactions:** Heavy use of spring physics to simulate tactile paper items placed on a workspace desk.
- **60fps Performance:** Optimized CSS gradients and lightweight DOM structures for fluid scrolling across mobile and desktop.
