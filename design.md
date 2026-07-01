# Design Specification

## 1. Visual Direction
The design language is **Scrapbook Maximalism / Brutalism**. It relies on high contrast, overlapping elements, "tape" and "sticker" aesthetics, and a raw, unpolished, yet highly intentional and structured look.

## 2. Color Palette
A strict, high-impact color scheme to guide user attention.

* **Primary Black:** `#000000` (Used for heavy typography, thick borders, dark backgrounds for contrast sections, and hard drop shadows).
* **Background White:** `#FFFFFF` (Main canvas for content, polaroid borders, text inside black blocks).
* **Accent Yellow:** `#FFD700` (Used for highlights, "tape" pieces, CTA buttons, and sticky note backgrounds).
* **Grid Lines (Dark Grey):** `#333333` or `#222222` (Used for the subtle dot grid on the very back layer).

## 3. Typography
* **Headings (H1, H2, H3):** A heavy, condensed, sans-serif font (e.g., *Impact*, *Anton*, *Bebas Neue*, or a black weight of *Oswald*).
    * *Rule:* Always uppercase. Tight letter spacing.
* **Body Copy:** A highly legible, structured sans-serif (e.g., *Inter*, *Space Grotesk*, or *Helvetica Neue*).
* **Accents & Annotations:** A handwritten or marker-style font (e.g., *Permanent Marker* or *Caveat*) to simulate notes written directly on the scrapbook.

## 4. Core UI Elements & Motifs

### 4.1. Containers & Cards
* Thick black borders (`border: 3px solid black`).
* Hard, solid black drop shadows (e.g., `box-shadow: 6px 6px 0px black`).
* Slight, randomized rotations (e.g., tilted -2 degrees or +3 degrees) to feel organically placed.

### 4.2. Tape and Fasteners
* Yellow rectangular strips acting as "tape" holding down images.
* Placed at the corners or top-center of image containers.
* Should slightly overlap the image and the background.

### 4.3. Dividers
* Use dashed or dotted horizontal lines (`---`) rather than solid, clean lines.
* Occasionally use a thick, solid black block to separate major sections.

### 4.4. Buttons (CTAs)
* Inverted style: Black background, white heavy text.
* Hover state: Translate up slightly, expand the hard shadow, or invert colors to Yellow background with Black text.

## 5. Layout & Composition
* **Embrace Overlap:** Elements should intentionally break out of their grid cells. A sticky note might overlap a project image. Text might slightly cross over a border.
* **Background:** The lowest z-index layer should be a dark grey canvas with a lighter grey dotted pattern (like a cutting mat or dot-grid notebook).
