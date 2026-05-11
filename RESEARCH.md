# 2.5D Portfolio Research Report

**Date:** 2026-05-10
**Purpose:** Guide architecture and implementation decisions for a Next.js 2.5D portfolio

---

## 1. Design Patterns & Layout Structures

### What Top Portfolios Do

Analysis of Awwwards-winning portfolios (Simonholm.studio, Studio Namma, Obys, paodao.fr, T11) reveals consistent patterns:

**Layered Depth Architecture:**
- **Z-axis depth layering** is the core 2.5D technique -- multiple visual planes at different `translateZ` values create perceived depth during scroll
- **Foreground/background differential speeds** -- backgrounds scroll slower than foreground content, producing parallax depth
- **Fullscreen sections with smooth transitions** -- each section occupies 100vh, with layered elements transitioning at different rates
- **Interactive elements responding to scroll position** -- elements rotate, scale, or reveal based on scroll progress

**Recommended Layout Structure:**
```
Hero Section (100vh)
  - Background layer (slowest parallax, translateZ: -2px)
  - Midground layer (medium parallax, translateZ: -1px)
  - Foreground content (normal scroll, translateZ: 0)
  - Floating UI elements (fastest, translateZ: +1px)

Project Sections (100vh each)
  - 3D card reveals on scroll into view
  - Horizontal scroll subsections for project galleries
  - Stacked card layouts with depth offset

About/Contact Section
  - Layered text with parallax displacement
  - Subtle 3D tilt on interactive elements
```

**Key CSS Pattern for 2.5D Layers:**
```css
.parallax-container {
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.parallax-layer {
  position: absolute;
  inset: 0;
}

.layer-back {
  transform: translateZ(-2px) scale(3);
}

.layer-mid {
  transform: translateZ(-1px) scale(2);
}

.layer-front {
  transform: translateZ(0);
}
```

The `scale()` factor compensates for the visual size reduction caused by `translateZ` -- the formula is `scale = 1 + (translateZ * -1) / perspective`.

---

## 2. Animation & Transition Techniques

### GSAP ScrollTrigger vs Framer Motion vs CSS Scroll-Driven Animations

**GSAP ScrollTrigger** (Recommended for complex sequences):
- **Best for:** Horizontal scroll sections, complex multi-step scroll timelines, frame-accurate control
- **Key features:** Scrubbing (link animations to scroll), pinning (lock elements between scroll positions), snap (snap to progress values), `containerAnimation` for non-native scroll
- **Performance:** Pre-calculates start/end positions, debounced scroll events, syncs with `requestAnimationFrame`, no scroll-jacking
- **Pattern:**
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.layer-back', {
      y: -200,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  });
  return () => ctx.revert();
}, []);
```

**Framer Motion** (Recommended for React-native integration):
- **Best for:** Declarative scroll-driven effects, parallax, progress-based reveals, sticky animations
- **Key hooks:** `useScroll` (returns scrollX/Y progress 0-1), `useTransform` (maps progress to CSS values), `useSpring` (smooth interpolation)
- **Pattern:**
```tsx
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

return <motion.div style={{ y, opacity }} />;
```

**CSS Scroll-Driven Animations** (Emerging, limited browser support):
- **Best for:** Simple scroll-linked effects without JS, hardware-accelerated via native `ScrollTimeline`
- **Properties:** `scroll-timeline`, `animation-timeline`, `view-timeline`
- **Limitation:** "Limited availability" -- not Baseline, doesn't work in all major browsers
- **Pattern:**
```css
.container {
  scroll-timeline: --timeline y;
}
.animated {
  animation: rotate 1ms linear;
  animation-timeline: --timeline;
}
```

**React Three Fiber** (For true 3D elements):
- **Best for:** Interactive 3D objects, shader-based effects, immersive scenes
- **Ecosystem:** `@react-three/drei` provides Float, MeshReflectorMaterial, Environment, ContactShadows, Sparkles, Stars, Text3D, Billboard
- **Pattern:** Use `useFrame` hook for render-loop animations, combine with GSAP or Framer Motion for scroll-linked 3D

### Recommendation

**Use a hybrid approach:**
1. **GSAP ScrollTrigger** for the main scroll-driven parallax system and horizontal scroll sections
2. **Framer Motion** for component-level animations (reveals, hover states, micro-interactions)
3. **CSS `animation-timeline`** as progressive enhancement for simple effects where supported
4. **React Three Fiber** sparingly -- for hero section 3D elements or interactive project showcases

---

## 3. Tech Stack Recommendations

### Optimal Stack for Next.js 2.5D Portfolio

| Layer | Recommendation | Rationale |
|-------|---------------|-----------|
| **Framework** | Next.js 15+ (App Router) | Server components, font optimization, image optimization |
| **Primary Animation** | GSAP ScrollTrigger + Framer Motion | GSAP for scroll orchestration, FM for React-native animations |
| **3D** | React Three Fiber + Drei | Declarative 3D in React, rich helper ecosystem |
| **Smooth Scroll** | Lenis | Industry standard for buttery smooth scroll, pairs with GSAP |
| **Styling** | Tailwind CSS v4 + CSS variables | Utility-first for layout, CSS variables for theming |
| **Typography** | `next/font` (variable fonts) | Zero layout shift, self-hosted, optimal loading |
| **3D Helpers** | @react-three/drei | Float, Environment, ContactShadows, Text3D |
| **State** | Zustand (if needed) | Lightweight, works well with R3F |

### Why Not Other Options?

- **Three.js alone (no R3F):** Imperative code doesn't integrate well with React's declarative model; R3F provides hooks like `useFrame` and `useThree`
- **CSS 3D transforms alone:** Limited to simple layering; can't handle complex scroll-linked sequences or interactive 3D
- **Styled-components:** Tailwind v4 is faster for utility-first styling; CSS variables handle theming more cleanly
- **Pure Framer Motion for scroll:** Lacks the precision of GSAP's scrub/pin/snap system for complex scroll choreography

### Key Integration Pattern

```tsx
// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

// components/LenisProvider.tsx
'use client';
import { ReactLenis } from '@studio-freight/react-lenis';

export function LenisProvider({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      {children}
    </ReactLenis>
  );
}
```

---

## 4. Color Schemes & Typography Trends

### Color Trends 2025-2026

**Dark Mode (Dominant for Developer Portfolios):**
- **Background:** Off-black `#0a0a0f` or `#121212` (never pure black)
- **Surface:** Dark grays `#1a1a2e`, `#16213e` with subtle gradient shifts
- **Text:** Off-white `#e4e4e7` (not pure white), muted `#a1a1aa` for secondary
- **Accent:** Single vibrant color -- electric blue (`#3b82f6`), purple (`#8b5cf6`), or coral (`#f97316`)
- **Glassmorphism:** `backdrop-filter: blur(12px)` with `background: rgba(255,255,255,0.05)` and subtle borders

**Gradient Meshes:**
- Large, soft gradient blobs as background elements (radial gradients with `blur`)
- Used behind hero text or as section dividers
- Colors: deep purples, midnight blues, warm oranges at low opacity (10-20%)

**Key CSS Pattern:**
```css
:root {
  --bg-primary: #0a0a0f;
  --bg-surface: rgba(255, 255, 255, 0.03);
  --text-primary: #e4e4e7;
  --text-secondary: #a1a1aa;
  --accent: #8b5cf6;
  --accent-glow: rgba(139, 92, 246, 0.3);
  --border-subtle: rgba(255, 255, 255, 0.08);
}

.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Typography Trends

**Font Pairings That Work:**
1. **Geist + Geist Mono** (Vercel's fonts) -- clean, modern, excellent for dev portfolios
2. **Inter + JetBrains Mono** -- highly readable, developer-familiar
3. **Clash Display + Satoshi** -- bold display + clean body, trendy in 2025
4. **Custom variable font** (e.g., `--font-main` via `next/font/local`) for unique identity

**Best Practices:**
- Use **variable fonts** exclusively -- single file, infinite weight/width variations
- Load via `next/font` for zero layout shift and self-hosting
- **Fluid typography** with `clamp()`:
```css
h1 { font-size: clamp(2.5rem, 6vw + 1rem, 6rem); }
h2 { font-size: clamp(1.5rem, 3vw + 0.5rem, 3.5rem); }
p  { font-size: clamp(1rem, 1vw + 0.75rem, 1.25rem); }
```
- **Large, bold headlines** (4-6rem) with tight letter-spacing for hero sections
- **Monospace accents** for labels, tags, and technical details
- `mix-blend-mode: overlay` for text on gradient/photo backgrounds

### Visual Effects in Vogue

- **Glassmorphism** via `backdrop-filter: blur()` -- use sparingly, watch Firefox quirks with `position: sticky`
- **Gradient text** via `background-clip: text` with `color: transparent`
- **Subtle noise texture** overlay (SVG filter or tiny PNG at 2-3% opacity) for depth
- **Glow effects** via `box-shadow` with accent color at low spread
- **Grain + vignette** overlays for cinematic feel

---

## 5. Performance Best Practices

### The Rendering Pipeline

The pixel pipeline has five stages: **JavaScript > Style > Layout > Paint > Composite**.

**Only `transform` and `opacity` skip straight to Composite.** Everything else triggers earlier, more expensive stages.

### Properties Ranked by Cost

| Cost | Properties | Pipeline Stages |
|------|-----------|----------------|
| **Cheapest** | `transform`, `opacity` | Composite only |
| **Moderate** | `filter`, `backdrop-filter` | Paint + Composite |
| **Expensive** | `background-color`, `box-shadow`, `border-radius` | Paint |
| **Most Expensive** | `width`, `height`, `top`, `left`, `margin`, `padding` | Layout + Paint + Composite |

### 60fps Rules

1. **Only animate `transform` and `opacity`** -- these are GPU-composited
2. **Use `will-change: transform`** sparingly and intentionally -- hints the browser to create a compositor layer, but overuse consumes video memory
3. **Batch DOM reads and writes** -- avoid layout thrashing (reading layout properties after writing to DOM forces synchronous reflow)
4. **Use `requestAnimationFrame`** -- never use `setTimeout`/`setInterval` for animations
5. **Debounce scroll handlers** -- GSAP ScrollTrigger does this automatically
6. **Use `content-visibility: auto`** for off-screen sections to skip rendering
7. **Lazy-load 3D scenes** -- only mount R3F Canvas when in/near viewport

### Parallax-Specific Gotchas

- **iOS Safari:** `background-attachment: fixed` doesn't work; use `position: fixed` on layers instead
- **Scroll jacking:** Never prevent default scroll behavior; use `scrub` in GSAP instead
- **Too many layers:** Each parallax layer adds a compositor layer; keep to 3-5 max
- **Images in parallax:** Use `will-change: transform` on animated image containers, not the images themselves
- **Font rendering during scroll:** Can cause jank; use `font-display: swap` and preload critical fonts

### Reduced Motion (Accessibility)

**This is non-negotiable.** Always respect `prefers-reduced-motion`.

**CSS Pattern:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**JavaScript Pattern:**
```tsx
const prefersReducedMotion = usePrefersReducedMotion();

// In components:
<motion.div
  animate={prefersReducedMotion ? {} : { y: [0, -20, 0] }}
/>

// With GSAP:
useEffect(() => {
  ScrollTrigger.config({ autoSleep: 60 });
  if (prefersReducedMotion) {
    gsap.globalTimeline.timeScale(0); // Freeze all GSAP animations
  }
}, [prefersReducedMotion]);
```

**Key Principles:**
- **Replace, don't just remove** -- swap motion-heavy animations with opacity fades
- **Test on real devices** -- enable reduced motion in OS settings and verify
- **Vestibular triggers** -- scaling and panning large objects can cause physical discomfort; always provide alternatives

### Performance Checklist

- [ ] All animations use only `transform` and `opacity`
- [ ] `will-change` applied intentionally, removed after animation completes
- [ ] GSAP ScrollTrigger used for scroll orchestration (built-in debouncing)
- [ ] Lenis smooth scroll with `lerp: 0.1` for balance of smoothness and responsiveness
- [ ] R3F Canvas uses `frameloop="demand"` and `performance={{ min: 0.5 }}`
- [ ] Images use `next/image` with `priority` for above-the-fold, `loading="lazy"` otherwise
- [ ] Fonts loaded via `next/font` with `display: "swap"` and `preload: true`
- [ ] `prefers-reduced-motion` respected at both CSS and JS levels
- [ ] Lighthouse performance score target: 90+ on desktop, 70+ on mobile
- [ ] Test on mid-range Android devices (not just MacBook Pro)

---

## Summary of Recommendations

### Architecture Decision Record

1. **Scroll System:** GSAP ScrollTrigger as the primary scroll orchestration engine, with Lenis for smooth scroll
2. **Component Animations:** Framer Motion for React-native animations (reveals, hovers, micro-interactions)
3. **3D Elements:** React Three Fiber + @react-three/drei for hero section and interactive project cards
4. **Styling:** Tailwind CSS v4 for layout + CSS custom properties for theming (dark mode default)
5. **Typography:** `next/font` with Geist (body) + Geist Mono (accents), fluid sizing via `clamp()`
6. **Color:** Dark mode with off-black background, single vibrant accent, glassmorphism for cards
7. **Performance:** Animate only `transform`/`opacity`, respect `prefers-reduced-motion`, lazy-load 3D
8. **Accessibility:** Reduced motion support at both CSS and JS levels, WCAG AA contrast ratios

### Suggested File Structure

```
app/
  layout.tsx          # Root layout with fonts, Lenis provider
  page.tsx            # Main page composing all sections
  globals.css         # Theme variables, reduced-motion overrides
components/
  Hero/
    HeroSection.tsx   # 3D scene + parallax layers
    FloatingElements.tsx
  Projects/
    ProjectCard3D.tsx # 3D tilt card with R3F
    ProjectGrid.tsx
  About/
    AboutSection.tsx  # Layered parallax text
  UI/
    GlassCard.tsx     # Glassmorphism card component
    GradientText.tsx  # Gradient text with blend modes
hooks/
  useScrollProgress.ts
  useMousePosition.ts
  usePrefersReducedMotion.ts
lib/
  gsap.ts             # GSAP ScrollTrigger setup
  lenis.ts            # Lenis configuration
```

---

## Sources

- Awwwards Portfolio Category -- awwwards.com/websites/portfolio/
- GSAP ScrollTrigger Documentation -- gsap.com/docs/v3/Plugins/ScrollTrigger/
- Framer Motion Scroll Animations -- motion.dev/motion/scroll-animations/
- React Three Fiber -- github.com/pmndrs/react-three-fiber
- @react-three/drei -- github.com/pmndrs/drei
- CSS Scroll-Driven Animations (MDN) -- developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline
- prefers-reduced-motion (MDN) -- developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- CSS Rendering Pipeline -- web.dev/rendering-performance/
- Next.js Font Optimization -- nextjs.org/docs/app/getting-started/fonts
- CSS-Tricks: Fluid Typography -- css-tricks.com/snippets/css/fluid-typography/
- CSS-Tricks: Dark Mode -- css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/
- Josh Comeau: Hardware-Accelerated CSS -- joshwcomeau.com/animation/css-transitions/
- MDN: mix-blend-mode -- developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
- Tailwind CSS Animation Utilities -- tailwindcss.com/docs/animation

## Implementation Notes (2026-05-11)

### Completed Features
- 3D parallax hero with multi-layer scroll depth
- GSAP ScrollTrigger integration for scroll-linked animations
- Framer Motion page transitions with multiple variants
- 3D card tilt with glare effect and spring physics
- Cursor glow with idle detection
- Magnetic button with proximity attraction
- Scroll progress indicator with spring interpolation
- Animated text with word/character-level reveal
- Reveal sections with configurable direction and threshold
- Floating shapes with WebGL and CSS fallback
- Responsive header with active section tracking
- Contact form with success feedback
- Experience timeline in about section
- Featured project badges
- Footer navigation links
- Comprehensive accessibility (reduced motion, ARIA, focus management)
- Performance optimizations (RAF-based hooks, throttled events, lazy loading)
- Error boundaries for WebGL components
- TypeScript type definitions for all animation variants

### Performance Considerations
- RAF-based mouse/scroll tracking for 60fps animations
- Throttled event listeners for non-critical updates
- Lazy-loaded Three.js canvas to reduce initial bundle
- DPR capping at 1.5x for WebGL rendering
- Low-power device detection for graceful degradation
- Passive event listeners throughout

### Accessibility
- prefers-reduced-motion respected in every component
- ARIA labels on progress bars and interactive elements
- Focus-visible outlines for keyboard navigation
- Screen-reader only utility class
- Semantic HTML structure (main, section, nav, header, footer)
