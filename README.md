# End-User Frontend Documentation - Next.js Application

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [App Directory Structure](#app-directory-structure)
5. [Components Architecture](#components-architecture)
6. [Features & Functionality](#features--functionality)
7. [Internationalization (i18n)](#internationalization-i18n)
8. [State Management](#state-management)
9. [Animations & Interactions](#animations--interactions)
10. [Image Optimization](#image-optimization)
11. [Analytics Integration](#analytics-integration)
12. [API Integration](#api-integration)
13. [Routing & Navigation](#routing--navigation)
14. [Styling System](#styling-system)
15. [Hooks & Utilities](#hooks--utilities)
16. [Setup & Installation](#setup--installation)
17. [Development Guide](#development-guide)
18. [Production Deployment](#production-deployment)

---

## Project Overview

A modern, high-performance Next.js 14+ application serving as the public-facing website for a software company. The application features:

- **Multi-language Support**: English and Arabic with RTL support
- **Advanced Animations**: GSAP-powered smooth animations
- **Dynamic Slideshows**: Multiple composition types (Carousel, Cube, Parallax, etc.)
- **Image Optimization**: BlurHash integration for progressive loading
- **Analytics Tracking**: Comprehensive visitor and interaction tracking
- **Responsive Design**: Mobile-first approach with breakpoint management
- **Dark Mode**: Theme switching with persistence
- **Smooth Scrolling**: Lenis-powered smooth scroll experience

---

## Technology Stack

### Core Framework

- **Next.js 14+** - React framework with App Router
- **React 18+** - UI library
- **TypeScript** - Type safety

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library
- **Custom CSS** - Height breakpoints and global styles

### Animations

- **GSAP (GreenSock)** - Professional-grade animations
- **Lenis** - Smooth scrolling library
- **Framer Motion** (implied) - React animation library

### Internationalization

- **next-intl** - Next.js internationalization
- **JSON translation files** - Language resources

### Image Processing

- **BlurHash** - Progressive image loading
- **Next/Image** - Optimized image component

### State & Context

- **React Context API** - Global state management
- **Custom Hooks** - Reusable logic

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## Project Structure

This is the exact full directory tree of the application:

```text
end-user/
├── app/
│   └── [locale]/
│       ├── (home-page)/
│       │   └── page.tsx
│       ├── (routes)/
│       │   ├── about/
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   └── _comp/
│       │   │       ├── animation-wrapper.tsx
│       │   │       └── stagger-children.tsx
│       │   ├── services/
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   └── comp/
│       │   │       ├── AllServices.tsx
│       │   │       ├── Fetchers.tsx
│       │   │       ├── FloatServiceDialog.tsx
│       │   │       ├── ServiceHoverCard.tsx
│       │   │       ├── ServiceTable.tsx
│       │   │       └── serviceAniamtion.tsx
│       │   ├── team/
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   └── _comp/
│       │   │       ├── HeroTeam.tsx
│       │   │       └── TeamSectionCard.tsx
│       │   └── test/
│       │       └── page.tsx
│       ├── globals.css
│       ├── heightBreakPoints.css
│       └── layout.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       └── switch.tsx
├── context/
│   └── MainLoaderTimeLine.tsx
├── custom-components/
│   ├── Achievements/
│   │   ├── AchievementCard.tsx
│   │   ├── Achievements.tsx
│   │   └── loader-achievements.tsx
│   ├── DarkSchema.tsx
│   ├── Footer/
│   │   └── Footer.tsx
│   ├── Header/
│   │   ├── HeaderAnimation.tsx
│   │   ├── header-client.tsx
│   │   └── header.tsx
│   ├── Hero/
│   │   ├── Hero.tsx
│   │   ├── HeroVariants.tsx
│   │   ├── Loading-hero.tsx
│   │   ├── _comp/
│   │   │   ├── ClientHeroVariants.tsx
│   │   │   └── HeroAnimation.tsx
│   │   └── hero-error.tsx
│   ├── Loaders/
│   │   └── MainLoader.tsx
│   ├── Reusable/
│   │   ├── ClientImageWithBlurHash.tsx
│   │   └── ImageWithBlurHash.tsx
│   ├── SlideShow/
│   │   ├── SlideShow.tsx
│   │   └── _comp/
│   │       ├── CardProd/
│   │       │   ├── client.tsx
│   │       │   ├── generic/
│   │       │   │   ├── Marquee.tsx
│   │       │   │   ├── Parallax.tsx
│   │       │   │   ├── Single.tsx
│   │       │   │   ├── coverFlow.tsx
│   │       │   │   ├── cube.tsx
│   │       │   │   └── filmStrap.tsx
│   │       │   ├── project.tsx
│   │       │   ├── service.tsx
│   │       │   ├── teamMemeber.tsx
│   │       │   └── testimonals.tsx
│   │       ├── CompositionPreview.tsx
│   │       ├── PaginationSlideshows.tsx
│   │       ├── RenderSlide.tsx
│   │       ├── SlideShowCard.tsx
│   │       ├── SlideShowCardClient.tsx
│   │       ├── SlideShowCards.tsx
│   │       ├── SlidesLoader.tsx
│   │       ├── TypeToRenderProd.tsx
│   │       ├── experimental/
│   │       │   ├── ExpermintalParallax.tsx
│   │       │   ├── ExpermintalParallaxContainer.tsx
│   │       │   ├── coverflowComposition.tsx
│   │       │   ├── cubeComposition.tsx
│   │       │   ├── marqueeComposition.tsx
│   │       │   └── singleComposition.tsx
│   │       ├── services/
│   │       │   └── slideShowService.ts
│   │       └── slideShowHeader.tsx
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   └── SectionVisibilityContext.tsx
│   ├── locale/
│   │   └── switchLang.tsx
│   ├── scroll/
│   │   └── smoothScrolling.tsx
│   └── toggleTheme.tsx
├── hooks/
│   ├── UseGsapLenis.tsx
│   ├── useBreakPoint.tsx
│   └── useScrollTriggerReady.tsx
├── lib/
│   ├── actions/
│   │   ├── slideShows.ts
│   │   └── slides.ts
│   ├── analytic-client.ts
│   ├── blurhash.ts
│   ├── i18n.ts
│   ├── messages/
│   │   ├── ar.json
│   │   └── en.json
│   └── utils.ts
├── providers/
│   └── analytic-provider.tsx
└── types/
    ├── schema.ts
    ├── services.ts
    └── slideShows.ts
```

---

## App Directory Structure

### Routing Architecture

The app uses Next.js 14 App Router with locale-based routing:

```
app/
└── [locale]/                    # Dynamic locale segment (en/ar)
    ├── layout.tsx              # Root layout with providers
    ├── globals.css             # Global styles
    ├── heightBreakPoints.css   # Responsive height utilities
    │
    ├── (home-page)/            # Route group for home
    │   └── page.tsx            # Home page component
    │
    └── (routes)/               # Route group for features
        ├── about/              # About page
        │   ├── layout.tsx      # About layout
        │   ├── page.tsx        # About content
        │   └── _comp/          # About components
        │       ├── animation-wrapper.tsx
        │       └── stagger-children.tsx
        │
        ├── services/           # Services page
        │   ├── layout.tsx
        │   ├── page.tsx
        │   └── comp/
        │       ├── AllServices.tsx
        │       ├── Fetchers.tsx
        │       ├── FloatServiceDialog.tsx
        │       ├── serviceAnimation.tsx
        │       ├── ServiceHoverCard.tsx
        │       └── ServiceTable.tsx
        │
        ├── team/               # Team page
        │   ├── layout.tsx
        │   ├── page.tsx
        │   └── _comp/
        │       ├── HeroTeam.tsx
        │       └── TeamSectionCard.tsx
        │
        └── test/               # Test/development page
            └── page.tsx
```

### Route Groups

**Route Groups** (folders with parentheses) organize routes without affecting the URL:

- `(home-page)` - Home page at root (`/`)
- `(routes)` - Feature pages (`/about`, `/services`, `/team`)

### Locale Routing

The `[locale]` dynamic segment enables multi-language routing:

- `/en` - English version
- `/ar` - Arabic version

All routes are automatically prefixed with the locale.

---

## Components Architecture

### Component Organization

Components are organized by feature and reusability:

#### 1. Layout Components (`custom-components/`)

**Header** (`Header/`)

- `header.tsx` - Server component with data fetching
- `header-client.tsx` - Client component with interactivity
- `HeaderAnimation.tsx` - GSAP animations

**Footer** (`Footer/`)

- `Footer.tsx` - Site footer with links and info

**Hero** (`Hero/`)

- `Hero.tsx` - Main hero component
- `HeroVariants.tsx` - Hero variants/types
- `Loading-hero.tsx` - Loading state
- `hero-error.tsx` - Error state
- `_comp/ClientHeroVariants.tsx` - Client-side variants
- `_comp/HeroAnimation.tsx` - Hero animations

#### 2. Feature Components

**Achievements** (`Achievements/`)

- `Achievements.tsx` - Main achievements section
- `AchievementCard.tsx` - Individual achievement card
- `loader-achievements.tsx` - Loading skeleton

**Contact** (`contact/`)

- `ContactForm.tsx` - Contact form component
- `SectionVisibilityContext.tsx` - Visibility tracking

**SlideShow** (`SlideShow/`)

The slideshow system is the most complex component with multiple composition types. See the project tree for details.

#### 3. Reusable Components (`Reusable/`)

**Image Components**

- `ImageWithBlurHash.tsx` - Server component with BlurHash
- `ClientImageWithBlurHash.tsx` - Client component with BlurHash

**Utility Components**

- `toggleTheme.tsx` - Theme switcher
- `switchLang.tsx` - Language switcher
- `DarkSchema.tsx` - Dark mode schema
- `smoothScrolling.tsx` - Smooth scroll wrapper

#### 4. UI Components (`components/ui/`)

shadcn/ui components:

- `button.tsx` - Button component
- `sheet.tsx` - Sheet/drawer component
- `skeleton.tsx` - Loading skeleton
- `switch.tsx` - Toggle switch

---

## Features & Functionality

### 1. Multi-Language Support (i18n)

**Implementation:**

```typescript
// lib/i18n.ts
// Configures next-intl with locales and default locale

// Usage in components:
export const dictionaries = {
  en: () => import("./messages/en.json").then((m) => m.default),
  ar: () => import("./messages/ar.json").then((m) => m.default),
};
```

**Translation Files:**

```
lib/messages/
├── en.json    # English translations
└── ar.json    # Arabic translations
```

**Locale Switching:**

```typescript
// custom-components/locale/switchLang.tsx
// Provides language switcher component
```

**Features:**

- Automatic locale detection
- URL-based locale routing (`/en`, `/ar`)
- RTL support for Arabic
- Translation file organization by namespace

### 2. Slideshow System

**Composition Types:**

1. **Single** - Display one slide at a time
2. **Carousel** - Classic horizontal carousel
3. **Cube** - 3D cube rotation effect
4. **Coverflow** - 3D coverflow (Apple-style)
5. **Parallax** - Parallax scrolling effect
6. **Marquee** - Auto-scrolling infinite loop
7. **Film Strip** - Film strip layout

**Content Types:**

- **Services** - Company services
- **Projects** - Portfolio projects
- **Team Members** - Team profiles
- **Testimonials** - Client testimonials

**Features:**

- Dynamic composition switching
- Pagination controls
- Auto-play functionality
- Touch/swipe support
- Responsive layouts
- Loading states
- Error handling

**Data Flow:**

```typescript
// 1. Fetch slideshow data
lib/actions/slideShows.ts → API

// 2. Render slideshow
SlideShow.tsx → TypeToRenderProd → Composition Component

// 3. Display slides
Composition → SlideShowCard → Content Card
```

### 3. Image Optimization

**BlurHash Integration:**

```typescript
// lib/blurhash.ts
// Decodes BlurHash strings to canvas data URLs

// Usage:
import { ImageWithBlurHash } from '@/custom-components/Reusable/ImageWithBlurHash';

<ImageWithBlurHash
  src="/image.jpg"
  blurHash="LKO2?U%2Tw=w]~RBVZRi};RPxuwH"
  alt="Description"
  width={800}
  height={600}
/>
```

**Features:**

- Progressive image loading
- BlurHash placeholder generation
- Next/Image optimization
- Lazy loading
- Responsive images

### 4. Animations

**GSAP Integration:**

```typescript
// hooks/UseGsapLenis.tsx
// Provides GSAP and Lenis integration

// hooks/useScrollTriggerReady.tsx
// Manages ScrollTrigger setup
```

**Animation Patterns:**

1. **Page Transitions**
   - Smooth fade-in on mount
   - Stagger animations for lists

2. **Scroll Animations**
   - Parallax effects
   - Reveal on scroll
   - Progress indicators

3. **Interactive Animations**
   - Hover effects
   - Click animations
   - Cursor followers

### 5. Responsive Design

**Breakpoint Hook:**

```typescript
// hooks/useBreakPoint.tsx
// Provides current breakpoint state

const breakpoint = useBreakPoint();
// Returns: 'mobile' | 'tablet' | 'desktop' | 'wide'
```

**Height Breakpoints:**

```css
/* app/[locale]/heightBreakPoints.css */
/* Custom utilities for height-based responsive design */

@media (min-height: 600px) {
  .h-screen-safe {
    height: 100vh;
  }
}
```

**Responsive Patterns:**

- Mobile-first approach
- Container queries
- Dynamic viewport units
- Touch-optimized interactions

---

## State Management

### Context Providers

**Main Loader Context** (`context/MainLoaderTimeLine.tsx`):

```typescript
// Manages global loading timeline
// Controls page transition animations
```

**Section Visibility Context** (`custom-components/contact/SectionVisibilityContext.tsx`):

```typescript
// Tracks component visibility for analytics
// Manages scroll-based interactions
```

### Analytics Provider

**Analytics Provider** (`providers/analytic-provider.tsx`):

```typescript
// Wraps app with analytics tracking
// Sends page view events
// Tracks user interactions
```

**Analytics Client** (`lib/analytic-client.ts`):

```typescript
// Client-side analytics utilities
// Sends events to backend
// Tracks sessions and page views
```

---

## Animations & Interactions

### GSAP Setup

**Hook** (`hooks/UseGsapLenis.tsx`):

```typescript
export function useGsapLenis() {
  // Initializes GSAP
  // Sets up Lenis smooth scrolling
  // Configures ScrollTrigger
  // Returns cleanup function
}
```

**Usage:**

```typescript
function AnimatedComponent() {
  useGsapLenis();

  useEffect(() => {
    gsap.from(".element", {
      scrollTrigger: {
        trigger: ".element",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
      opacity: 0,
      y: 100,
    });
  }, []);
}
```

### Smooth Scrolling

**Component** (`custom-components/scroll/smoothScrolling.tsx`):

```typescript
// Wraps app with Lenis smooth scroll
// Provides smooth, natural scrolling experience
// Configurable easing and duration
```

---

## Image Optimization

### BlurHash Implementation

**Utility** (`lib/blurhash.ts`):

```typescript
export function decodeBlurHash(
  blurHash: string,
  width: number,
  height: number,
): string {
  // Decodes BlurHash to canvas
  // Returns data URL for placeholder
}
```

**Server Component** (`custom-components/Reusable/ImageWithBlurHash.tsx`):

```typescript
import Image from 'next/image';
import { decodeBlurHash } from '@/lib/blurhash';

export function ImageWithBlurHash({
  src,
  blurHash,
  alt,
  ...props
}) {
  const placeholder = decodeBlurHash(blurHash, 32, 32);

  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL={placeholder}
      {...props}
    />
  );
}
```

---

## API Integration

### Server Actions

**Slideshows** (`lib/actions/slideShows.ts`):

```typescript
"use server";

export async function getSlideShows(type: string) {
  const response = await fetch(`${API_URL}/slideshows/type/${type}`);
  return response.json();
}

export async function getSlideShowBySlug(slug: string) {
  const response = await fetch(`${API_URL}/slideshows/slug/${slug}`);
  return response.json();
}
```

---

## Routing & Navigation

### App Router Structure

**Dynamic Routing:**

```
/[locale]                 # Locale segment
/[locale]/about          # Static route
/[locale]/services       # Static route
/[locale]/team           # Static route
```

### Route Groups

**Home Page Group** `(home-page)`:

- URL: `/`
- Path: `app/[locale]/(home-page)/page.tsx`

**Routes Group** `(routes)`:

- URL: `/about`, `/services`, `/team`
- Path: `app/[locale]/(routes)/{route}/page.tsx`

---

## Styling System

### Tailwind CSS Configuration

**Global CSS** (`app/[locale]/globals.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Base styles */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... */
  }
}
```

---

## Hooks & Utilities

### Utility Functions

**Utils** (`lib/utils.ts`):

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date
export function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale).format(date);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
) {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
```

---

## Setup & Installation

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd end-user
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   # Create .env.local file
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   NEXT_PUBLIC_ANALYTICS_ENABLED=true
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Analytics
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# Features
NEXT_PUBLIC_ENABLE_ANIMATIONS=true
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

---

## Development Guide

### Project Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Performance Best Practices

1. **Use Server Components by default**
2. **Add 'use client' only when needed**
3. **Optimize images with next/image**
4. **Use BlurHash for progressive loading**
5. **Lazy load off-screen content**
6. **Code split with dynamic imports**
7. **Minimize client-side JavaScript**

---

## Production Deployment

### Build Process

```bash
# Build for production
npm run build

# Test production build locally
npm run start
```

### Deployment Platforms

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

**Last Updated**: February 2026  
**Version**: 1.0.0  
**Framework**: Next.js 14+
