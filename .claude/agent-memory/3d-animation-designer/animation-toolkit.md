---
name: Animation Toolkit & Patterns
description: Core animation patterns, libraries, and techniques for the 2.5D portfolio project
type: reference
---

## Libraries to Use
- **GSAP + ScrollTrigger**: Multi-layer parallax, scroll-triggered reveals, complex timelines
- **Framer Motion**: Page transitions (AnimatePresence), 3D card tilts, micro-interactions
- **React Three Fiber (R3F)**: Floating 3D background elements / particle field
- **CSS 3D Transforms**: Lightweight 3D effects without JS overhead

## Key Patterns

### Multi-Layer Parallax
- Use GSAP ScrollTrigger with `data-speed` attributes on layers
- Background layers move slowest (0.2x), foreground fastest (1.5x)
- Apply `will-change: transform` and use `translate3d()` for GPU acceleration

### 3D Card Tilt
- Track mouse position relative to card center
- Map cursor offset to rotateX (-15deg to +15deg) and rotateY (-15deg to +15deg)
- Add `transform-style: preserve-3d` and `perspective: 1000px` on parent
- Use spring physics (Framer Motion) for smooth return-to-center

### Scroll-Triggered Reveals
- Sections start with `opacity: 0, scale: 0.95, translateY: 60px`
- Animate to `opacity: 1, scale: 1, translateY: 0` on viewport entry
- Stagger children with 100ms delays
- Use `ScrollTrigger.batch()` for performance

### Page Transitions
- Framer Motion `AnimatePresence` with `mode="wait"`
- Exit: fade out + slight scale down (0.98) over 0.3s
- Enter: fade in + slide up 20px over 0.4s with ease-out

### Floating 3D Background
- R3F with `@react-spring/three` for spring-animated meshes
- Low-poly geometric shapes (icosahedrons, octahedrons, toruses)
- Subtle rotation + floating animation with `useFrame`
- Keep polygon count low for performance

### Micro-interactions
- Buttons: scale(1.05) on hover with spring stiffness=300, damping=20
- Links: animated underline that slides in from left
- Magnetic cursor: track mouse, apply subtle translate to element (max 10px)
- Scroll progress: fixed top bar, scaleX driven by scroll position

## Performance Rules
- Always use `transform` and `opacity` — never animate layout properties
- Apply `will-change: transform` before animation, remove after
- Use `requestAnimationFrame` for custom JS animations
- Throttle scroll handlers to 16ms (60fps)
- Lazy-load R3F canvas with `next/dynamic` and `ssr: false`

## Accessibility
- Wrap all animations in `@media (prefers-reduced-motion: reduce)` fallbacks
- When reduced motion is preferred: disable parallax, use simple fades only
- Ensure all interactive elements remain keyboard-navigable
- Test with screen readers — decorative elements get `aria-hidden="true"`
