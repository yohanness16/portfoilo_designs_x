---
name: Color & Depth Strategy
description: Color palette approach for enhancing 3D depth perception in the portfolio
type: reference
---

## Depth-Driven Color Strategy

### Background Layers (Farthest)
- Darkest tones: `bg-slate-950` or `bg-zinc-950`
- Subtle gradient mesh using CSS `radial-gradient` for ambient depth
- Low opacity (0.1-0.3) to avoid competing with content

### Mid-Ground (Content Cards)
- `bg-slate-900/80` with `backdrop-blur-xl`
- Border: `border-slate-700/50` with subtle glow on hover
- Gradient overlays: `from-slate-800/50 to-slate-900/50`

### Foreground (Interactive Elements)
- Accent gradient: `from-violet-500 to-fuchsia-500` (primary CTA)
- Secondary: `from-cyan-400 to-blue-500` (links, highlights)
- Text: `text-slate-100` primary, `text-slate-400` secondary

### 3D Element Colors
- Floating shapes: use accent colors at 20-40% opacity
- Add `box-shadow` with accent color for glow effect
- Specular highlights on 3D meshes: white at 10-20% opacity

### Dynamic Lighting
- Shadows get lighter/darker based on "elevation" (translateZ)
- Hover states: increase glow intensity, shift gradient angle
- Scroll-linked: background gradient shifts hue subtly (0-30deg range)

### Contrast Ratios
- All text must meet WCAG AA (4.5:1 minimum)
- Large text (18px+): 3:1 minimum
- Interactive elements: visible focus ring with accent color
