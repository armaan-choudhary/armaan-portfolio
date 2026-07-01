# Armaan's Digital Scrapbook

A brutalist, physically-inspired portfolio built with React, Vite, and Framer Motion. 

This project rejects the ultra-clean, minimalist web in favor of a messy, engineered, tactile aesthetic. Think corkboards, torn paper, blackboards, heavy physics-based spring animations, and gritty textures.

## Tech Stack
- **Framework:** React + Vite
- **Animations:** Framer Motion
- **Styling:** Pure CSS Modules (No Tailwind)
- **Icons:** Lucide React

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Design Philosophy
- **Physicality over Polish:** Elements have realistic shadows, taped edges, and chaotic rotations.
- **Micro-interactions:** Heavy use of `staggerChildren` and `type: "spring"` to simulate items being aggressively tossed or slapped onto a desk.
- **Performance First:** Originally used SVG `feTurbulence` for textures, but refactored to use purely CSS `radial-gradient` and `linear-gradient` to ensure buttery smooth 60fps scrolling.

## Sections
- **Hero:** Parallax diagonal striped watermark tracking the cursor, with a staggered spring-slam entrance.
- **Selected Works:** A classic corkboard with Polaroid cards pinned at random angles.
- **Journal / About:** A physical desk setup with a taped photograph and a handwritten notebook.
- **Arsenal (Skills):** A massive dark-green chalkboard with violently torn paper scraps pinned to it.
- **Contact:** A "Wanted!" flyer with interactive tear-off contact tabs for mobile and desktop.
