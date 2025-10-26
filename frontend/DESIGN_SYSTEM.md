# AI Literacy Academy - Design System Documentation

## 🎨 Glassmorphism / Modern Tech Design

This document outlines the complete visual design system for the AI Literacy Academy platform. The design has been completely transformed from a Duolingo-style playful aesthetic to a premium, modern, glassmorphism-inspired interface.

---

## Design Philosophy

**Style:** Glassmorphism / Modern Tech
**Inspiration:** Apple's design language, Stripe, Linear, iOS frosted glass
**Goal:** Create a premium, professional, visually stunning educational platform that feels cutting-edge and trustworthy.

---

## Color Palette

### Primary Colors
- **Electric Blue** `#3B82F6` - Primary actions, CTAs, highlights
- **Light Blue** `#60A5FA` - Hover states, accents
- **Dark Blue** `#2563EB` - Gradient endings, darker states

### Accent Colors
- **Cyan** `#06B6D4` - Secondary accents, gradient variety
- **Purple** `#8B5CF6` - Tertiary accents, visual interest
- **Pink** `#EC4899` - Special highlights

### Semantic Colors
- **Success** `#10B981` - Completed lessons, success states
- **Success Light** `#34D399` - Success gradients
- **Warning** `#F59E0B` - Tips, warnings, special notes
- **Error** `#EF4444` - Error states, bad examples

### Background Gradient
- **Deep Navy** `#0F172A` → `#1E293B` → `#334155`
- Applied as: `linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)`
- **Fixed attachment** for parallax effect

### Glass Effect Colors
- **Glass White** `rgba(255, 255, 255, 0.05)` - Base glass card
- **Glass White Hover** `rgba(255, 255, 255, 0.08)` - Hover state
- **Glass Border** `rgba(255, 255, 255, 0.1)` - Standard borders
- **Glass Border Strong** `rgba(255, 255, 255, 0.2)` - Emphasized borders

### Text Colors
- **Primary** `rgba(255, 255, 255, 0.95)` - Headlines, important text
- **Secondary** `rgba(255, 255, 255, 0.7)` - Body text, descriptions
- **Tertiary** `rgba(255, 255, 255, 0.5)` - Placeholders, subtle text

---

## Typography

### Font Family
- **Primary:** Inter (weights: 300, 400, 500, 600, 700, 800, 900)
- **Monospace:** JetBrains Mono, Fira Code, Courier New
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif

### Type Scale
| Element | Size (Desktop) | Size (Mobile) | Weight |
|---------|---------------|---------------|--------|
| Hero H1 | 4rem (64px) | 2.5rem (40px) | 900 |
| Hero H2 | 4.5rem (72px) | 2.2rem (35px) | 900 |
| Section H2 | 3rem (48px) | 2rem (32px) | 900 |
| Section H3 | 2rem (32px) | 1.5rem (24px) | 800 |
| Card Title | 1.5rem (24px) | 1.35rem (22px) | 700 |
| Body | 1rem (16px) | 1rem (16px) | 400 |
| Small | 0.875rem (14px) | 0.875rem (14px) | 400 |

### Typography Features
- **Fluid sizing** using `clamp()` for responsive scaling
- **Tight letter-spacing** (-0.01em to -0.04em) for modern look
- **Line height:** 1.6-1.8 for body text, 1.1-1.2 for headlines
- **Font smoothing:** Anti-aliased for crisp rendering

---

## Spacing System

Based on **8px** increments for consistency:

```css
--spacing-xs: 0.5rem;     /* 8px */
--spacing-sm: 1rem;       /* 16px */
--spacing-md: 1.5rem;     /* 24px */
--spacing-lg: 2rem;       /* 32px */
--spacing-xl: 3rem;       /* 48px */
--spacing-2xl: 4rem;      /* 64px */
--spacing-3xl: 6rem;      /* 96px */
--spacing-4xl: 8rem;      /* 128px */
```

### Common Padding Values
- **Cards:** 2.5rem (40px)
- **Buttons:** 1.25rem × 3.5rem (20px × 56px)
- **Sections:** 4rem - 6rem vertical (64px - 96px)

---

## Border Radius

Smooth, modern rounded corners throughout:

```css
--radius-sm: 0.5rem;      /* 8px */
--radius-md: 0.75rem;     /* 12px */
--radius-lg: 1rem;        /* 16px */
--radius-xl: 1.25rem;     /* 20px */
--radius-2xl: 1.5rem;     /* 24px */
--radius-full: 9999px;    /* Perfect circles */
```

---

## Glassmorphism Effects

### Core Glass Card
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1.5px solid rgba(255, 255, 255, 0.1);
border-radius: 1.5rem;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
```

### Gradient Border Effect
Applied on hover for interactive cards:
```css
.card::before {
    background: linear-gradient(135deg, #3B82F6, #06B6D4, #8B5CF6);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
}
```

---

## Shadows

### Color-Tinted Shadows
Creating depth with colored shadows that match the brand:

- **Blue Shadows:**
  - Small: `0 4px 12px rgba(59, 130, 246, 0.15)`
  - Medium: `0 8px 24px rgba(59, 130, 246, 0.2)`
  - Large: `0 12px 32px rgba(59, 130, 246, 0.25)`
  - XL: `0 20px 48px rgba(59, 130, 246, 0.3)`

- **Green Shadows:**
  - Small: `0 4px 12px rgba(16, 185, 129, 0.15)`
  - Medium: `0 8px 24px rgba(16, 185, 129, 0.2)`

- **Dark Shadow:** `0 8px 32px rgba(0, 0, 0, 0.4)`

---

## Animations & Micro-Interactions

### Timing Functions
- **Standard:** `cubic-bezier(0.4, 0, 0.2, 1)` - Smooth ease-out
- **Bounce:** `cubic-bezier(0.68, -0.55, 0.265, 1.55)` - Playful pop

### Common Animations

#### Fade In Up
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

#### Shimmer Effect
```css
@keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
}
```

#### Float
```css
@keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
}
```

### Interactive States
- **Hover:** `translateY(-4px)` lift with scale(1.02)
- **Active:** `translateY(-2px)` or `translateY(0)`
- **Transition Duration:** 300-400ms for smoothness

---

## Component Specifications

### Buttons

#### Primary Button
```css
background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
padding: 1.25rem 3.5rem;
border-radius: 1rem;
font-weight: 700;
box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2), 0 0 24px rgba(59, 130, 246, 0.3);
```

**Hover:** Lift + glow effect
**Shine Effect:** Animated gradient sweep on hover

#### Secondary Button
```css
background: transparent;
color: #60A5FA;
border: 2px solid #3B82F6;
```

### Cards

#### Glass Card
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px);
border: 1.5px solid rgba(255, 255, 255, 0.1);
border-radius: 1.5rem;
padding: 2.5rem 2rem;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
```

**Hover State:**
- Transform: `translateY(-8px) scale(1.02)`
- Border: Gradient animation
- Shadow: Color-tinted glow

### Form Inputs
```css
background: rgba(255, 255, 255, 0.05);
border: 1.5px solid rgba(255, 255, 255, 0.1);
padding: 1rem 1.25rem;
border-radius: 0.75rem;
```

**Focus State:**
```css
border-color: #3B82F6;
background: rgba(255, 255, 255, 0.08);
box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
```

---

## Layout System

### Max Widths
- **Content:** 1280px
- **Lesson Content:** 900px
- **Auth Forms:** 480px

### Grid Systems
- **Module Cards:** `repeat(auto-fit, minmax(280px, 1fr))`
- **Feature Grid:** 2 columns (1 on mobile)
- **Element Grid:** `repeat(auto-fit, minmax(250px, 1fr))`

### Breakpoints
- **Desktop:** 1024px+
- **Tablet:** 768px - 1023px
- **Mobile:** < 768px
- **Small Mobile:** < 480px

---

## Special Visual Effects

### Background Effects
1. **Fixed Gradient Background**
2. **Radial Gradient Orbs** (Blue, Purple, Cyan)
3. **Subtle Noise Texture** (3% opacity)
4. **Parallax Effect** via `background-attachment: fixed`

### Advanced Effects
- **Backdrop Blur:** 10-20px for glass effect
- **Drop Shadows:** Color-tinted for depth
- **Gradient Text:** Used for headlines
- **Glow Effects:** Colored halos around interactive elements

---

## Accessibility

### Contrast Ratios
- **White on Dark Blue:** 15.3:1 (AAA)
- **Secondary Text:** 10.2:1 (AAA)
- **Tertiary Text:** 6.8:1 (AA+)

### Features
- **Focus Visible:** 3px solid blue outline with 4px offset
- **Keyboard Navigation:** Full support
- **Reduced Motion:** All animations disabled via media query
- **Semantic HTML:** Proper heading hierarchy
- **ARIA Labels:** Where appropriate

---

## Performance Optimizations

### GPU Acceleration
```css
will-change: transform;
```
Applied to animated elements.

### Optimized Animations
- Use `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- `will-change` used sparingly

### Loading Strategy
- **Inter font:** Preconnected and display=swap
- **Critical CSS:** Inline design tokens
- **Lazy animations:** Triggered on scroll/interaction

---

## File Structure

```
frontend/src/styles/
├── style.css          # Home page, global styles
├── auth-style.css     # Login/signup page
├── lesson-style.css   # Lesson pages (all 4 lessons)
├── lesson-card.css    # Card states (locked/completed)
└── progress.css       # Progress bar, certification
```

---

## Before vs After

### Before (Duolingo Style)
- Bright, playful colors (Blue #1CB0F6, Green #58CC02, Yellow #FFC800)
- White backgrounds with colored accents
- Poppins font
- Flat design with 3D button shadows
- High saturation, energetic feel

### After (Glassmorphism)
- Deep gradient backgrounds (Navy → Slate)
- Frosted glass cards with blur effects
- Inter font (900 weight headlines)
- Smooth, elegant animations
- Premium, professional, cutting-edge feel

---

## Setup Instructions

### 1. Fonts
The Inter font is automatically loaded via Google Fonts CDN:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### 2. No Additional Dependencies
All effects are achieved with pure CSS3. No JavaScript libraries required for the visual design.

### 3. Browser Support
- **Backdrop Filter:** Requires modern browsers (Chrome 76+, Safari 9+, Firefox 103+)
- **CSS Grid:** All modern browsers
- **Gradient Text:** All modern browsers
- **Fallbacks:** Provided for older browsers

---

## Usage Examples

### Creating a Glass Card
```css
.my-card {
    background: var(--glass-white);
    backdrop-filter: blur(20px);
    border: 1.5px solid var(--glass-border);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow-dark);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.my-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-blue-md);
    border-color: var(--primary-blue);
}
```

### Gradient Text
```css
.gradient-heading {
    background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary-blue-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

### Button with Shine Effect
```css
.button {
    position: relative;
    overflow: hidden;
}

.button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
}

.button:hover::before {
    left: 100%;
}
```

---

## Maintenance Notes

### Color Changes
All colors are defined as CSS custom properties in `:root`. Update once, changes apply everywhere.

### Adding New Components
1. Use existing design tokens (spacing, radius, colors)
2. Follow glassmorphism pattern (blur + transparency)
3. Add smooth transitions (0.3-0.4s)
4. Include hover states with lift effect
5. Test on mobile breakpoints

### Performance Considerations
- Keep backdrop-filter usage reasonable (expensive on some devices)
- Test animations on lower-end devices
- Provide reduced-motion fallbacks
- Optimize for 60fps animations

---

## Credits & Inspiration

- **Apple Design Language** - Glassmorphism, premium feel
- **Stripe** - Gradient usage, smooth animations
- **Linear** - Clean, modern typography
- **iOS Frosted Glass** - Blur effects
- **Vercel** - Bold typography, clean layouts

---

**Last Updated:** December 2024
**Design Version:** 2.0 (Glassmorphism)
**Designer:** Claude AI (Anthropic)
