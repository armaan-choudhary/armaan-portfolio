# Technical Requirements Document (TRD)

## 1. System Architecture & Stack

| Component | Recommended Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | React (Vite) | Fast HMR, zero-config setup, ideal for SPA portfolios without needing SSR/SSG complexity. |
| **Styling** | Vanilla CSS / CSS Modules | Full control for brutalist aesthetics (hard shadows, custom grid backgrounds, masking) without utility-class bloat. |
| **Animations** | Framer Motion | Ideal for handling the "sticker" pop-ins, page transitions, and complex interactive hover states required by the maximalist theme. |
| **Content Management** | Local JSON / Markdown + Vite `import.meta.glob` | Simple file-based content for project case studies; no external CMS or MDX compiler needed. |
| **Form Handling** | Formspree / Netlify Forms | Serverless form submission to avoid building a custom backend. |
| **Hosting & Deployment** | Netlify / Vercel (Static) | Free tier, CI/CD from Git, edge caching for static assets. |

## 2. Technical Implementation Details

### 2.1. Styling the "Scrapbook" Aesthetic (Vanilla CSS)
* **Hard Shadows:** `box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);` — avoid soft blurs.
* **Borders:** Thick, solid borders `border: 3px solid #000000;`.
* **Background Pattern:** Implement the dotted grid using a CSS `radial-gradient` on a pseudo-element (`::before`) on the root layout wrapper.
* **Rotations:** Use CSS custom properties for randomized rotations (e.g., `--rotate: -2deg; transform: rotate(var(--rotate));`).
* **CSS Variables:** Define the design tokens (colors, shadows, fonts) in `:root` for global consistency.

### 2.2. Image Optimization
* Use Vite's `import.meta.glob` or direct `import` for images to get hashed filenames and optimal bundling.
* Serve images in WebP/AVIF via Vite plugins (`vite-plugin-imagemin` or similar) during build.
* Implement native lazy loading (`loading="lazy"`) and `srcset`/`sizes` attributes manually for responsive images.

### 2.3. Data Structure (Project Schema)
Example JSON structure for project data (`src/data/projects.json`):
```json
{
  "title": "Zola Sky System",
  "slug": "zola-sky-system",
  "category": "Web Development",
  "thumbnail": "/images/zola-thumb.jpg",
  "techStack": ["React", "Node.js", "MongoDB"]
}
```

### 2.4. Routing
* Use `react-router-dom` for client-side routing (`/`, `/work`, `/work/:slug`, `/about-contact`).

## 3. Security & Performance
* **Form Security:** Implement basic honeypot field or reCAPTCHA v3 on the contact form to prevent spam.
* **Lighthouse Targets:** Aim for 90+ in Performance, Accessibility, Best Practices, and SEO.
* **Bundle Size:** Keep dependencies minimal; avoid heavy UI libraries. Tree-shake Framer Motion imports.