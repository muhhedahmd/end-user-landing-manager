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

```
end-user/
├── app/                          # Next.js App Router
│   └── [locale]/                # Locale-based routing
│       ├── (home-page)/         # Home page route group
│       ├── (routes)/            # Feature routes
│       ├── layout.tsx           # Root layout
│       └── globals.css          # Global styles
│
├── composnents/                 # Main components (note typo in original)
│   ├── AchiveMents/            # Achievement section
│   ├── contact/                # Contact form
│   ├── Footer/                 # Site footer
│   ├── Header/                 # Site header/navigation
│   ├── Hero/                   # Hero section
│   ├── Loaders/                # Loading components
│   ├── locale/                 # Language switcher
│   ├── Reusabale/              # Reusable components
│   ├── scroll/                 # Scroll components
│   └── SlideShow/              # Slideshow system
│
├── components/ui/               # shadcn/ui components
│   ├── button.tsx
│   ├── sheet.tsx
│   ├── skeleton.tsx
│   └── switch.tsx
│
├── context/                     # React Context providers
│   └── MainLoaderTimeLine.tsx
│
├── hooks/                       # Custom React hooks
│   ├── useBreakPoint.tsx
│   ├── UseGsapLenis.tsx
│   └── useScrollTriggerReady.tsx
│
├── lib/                         # Utilities & helpers
│   ├── actions/                # Server actions
│   ├── messages/               # Translation files
│   ├── analytic-client.ts
│   ├── blurhash.ts
│   ├── i18n.ts
│   └── utils.ts
│
├── providers/                   # Provider components
│   └── analytic-provider.tsx
│
├── types/                       # TypeScript definitions
│   ├── schema.ts
│   ├── services.ts
│   └── slideShows.ts
│
└── public/                      # Static assets
    └── *.svg                    # SVG icons
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

#### 1. Layout Components (`composnents/`)

**Header** (`Header/`)
- `header.tsx` - Server component with data fetching
- `header-client.tsx` - Client component with interactivity
- `HeaderAniamtion.tsx` - GSAP animations

**Footer** (`Footer/`)
- `Footer.tsx` - Site footer with links and info

**Hero** (`Hero/`)
- `Hero.tsx` - Main hero component
- `Hero-varanices.tsx` - Hero variants/types
- `Loading-hero.tsx` - Loading state
- `hero-error.tsx` - Error state
- `_comp/clientHeroVarients.tsx` - Client-side variants
- `_comp/heroAnamation.tsx` - Hero animations

#### 2. Feature Components

**Achievements** (`AchiveMents/`)
- `Achivements.tsx` - Main achievements section
- `AchiveCard.tsx` - Individual achievement card
- `loader-achivements.tsx` - Loading skeleton

**Contact** (`contact/`)
- `ContactForm.tsx` - Contact form component
- `SectionVisibilityContext.tsx` - Visibility tracking

**SlideShow** (`SlideShow/`)

The slideshow system is the most complex component with multiple composition types:

```
SlideShow/
├── SlideShow.tsx                    # Main slideshow wrapper
├── _comp/
│   ├── CardProd/                    # Production card components
│   │   ├── client.tsx              # Client-side card logic
│   │   ├── project.tsx             # Project cards
│   │   ├── service.tsx             # Service cards
│   │   ├── teamMemeber.tsx         # Team member cards
│   │   ├── testimonals.tsx         # Testimonial cards
│   │   └── generic/                # Generic compositions
│   │       ├── coverFlow.tsx       # 3D coverflow effect
│   │       ├── cube.tsx            # Cube rotation effect
│   │       ├── filmStrap.tsx       # Film strip layout
│   │       ├── Marquee.tsx         # Auto-scrolling marquee
│   │       ├── Parallax.tsx        # Parallax scrolling
│   │       └── Single.tsx          # Single slide display
│   │
│   ├── expermintal/                # Experimental compositions
│   │   ├── coverflowComposition.tsx
│   │   ├── cubeComposition.tsx
│   │   ├── marqueeComposition.tsx
│   │   └── singleComposition.tsx
│   │
│   ├── SlideShowCard.tsx           # Individual slide card
│   ├── SlideShowCardClient.tsx     # Client-side card
│   ├── SlideShowCards.tsx          # Cards container
│   ├── slideShowHeader.tsx         # Slideshow header
│   ├── PaggintionSlideshows.tsx    # Pagination controls
│   ├── RenderSlide.tsx             # Slide renderer
│   ├── TypeToRender.tsx            # Type-based rendering
│   ├── TypToRenderProd.tsx         # Production type rendering
│   ├── SlidesLoader.tsx            # Loading state
│   ├── CompositionPreviw.tsx       # Composition preview
│   └── services/
│       └── slideShowService.ts     # Slideshow data service
```

#### 3. Reusable Components (`Reusabale/`)

**Image Components**
- `ImageWithBlurHash.tsx` - Server component with BlurHash
- `ClientImageWithBlurHash.tsx` - Client component with BlurHash

**Utility Components**
- `toggleTheme.tsx` - Theme switcher
- `switchLang.tsx` - Language switcher
- `DarkShema.tsx` - Dark mode schema
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
import { useTranslations } from 'next-intl';

function Component() {
  const t = useTranslations('namespace');
  return <h1>{t('key')}</h1>;
}
```

**Translation Files:**
```
lib/messages/
├── en.json    # English translations
└── ar.json    # Arabic translations
```

**Locale Switching:**
```typescript
// composnents/locale/switchLang.tsx
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
8. **Grid** - Grid-based layout

**Content Types:**
- **Services** - Company services
- **Projects** - Portfolio projects
- **Team Members** - Team profiles
- **Testimonials** - Client testimonials
- **Clients** - Client logos/info

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
SlideShow.tsx → TypeToRender → Composition Component

// 3. Display slides
Composition → SlideShowCard → Content Card
```

### 3. Image Optimization

**BlurHash Integration:**

```typescript
// lib/blurhash.ts
// Decodes BlurHash strings to canvas data URLs

// Usage:
import { ImageWithBlurHash } from '@/composnents/Reusabale/ImageWithBlurHash';

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

**Example Usage:**
```typescript
// Hero animation
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function HeroAnimation() {
  useGSAP(() => {
    gsap.from('.hero-element', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2
    });
  });
}
```

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
  .h-screen-safe { height: 100vh; }
}
```

**Responsive Patterns:**
- Mobile-first approach
- Container queries
- Dynamic viewport units
- Touch-optimized interactions

### 6. Dark Mode

**Implementation:**

```typescript
// composnents/toggleTheme.tsx
// Theme toggle component

// composnents/DarkShema.tsx
// Dark mode schema/configuration
```

**Features:**
- System preference detection
- Manual toggle
- Persistent preference (localStorage)
- Smooth transitions
- Component-level theming

---

## Internationalization (i18n)

### Configuration

**Setup** (`lib/i18n.ts`):
```typescript
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}));
```

### Translation Files Structure

**English** (`lib/messages/en.json`):
```json
{
  "common": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "contact": "Contact"
  },
  "hero": {
    "title": "Welcome to Our Company",
    "subtitle": "We Build Amazing Things"
  },
  "services": {
    "title": "Our Services",
    "viewAll": "View All Services"
  }
}
```

**Arabic** (`lib/messages/ar.json`):
```json
{
  "common": {
    "home": "الرئيسية",
    "about": "عن الشركة",
    "services": "خدماتنا",
    "contact": "اتصل بنا"
  },
  "hero": {
    "title": "مرحباً بكم في شركتنا",
    "subtitle": "نحن نبني أشياء مذهلة"
  }
}
```

### Usage in Components

**Server Components:**
```typescript
import { getTranslations } from 'next-intl/server';

async function ServerComponent() {
  const t = await getTranslations('namespace');
  return <h1>{t('key')}</h1>;
}
```

**Client Components:**
```typescript
'use client';
import { useTranslations } from 'next-intl';

function ClientComponent() {
  const t = useTranslations('namespace');
  return <h1>{t('key')}</h1>;
}
```

### RTL Support

**Automatic Direction:**
```typescript
// Layout automatically applies dir="rtl" for Arabic
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

**RTL-Aware Styles:**
```css
/* Use logical properties */
.element {
  margin-inline-start: 1rem;  /* left in LTR, right in RTL */
  padding-inline-end: 2rem;    /* right in LTR, left in RTL */
}
```

---

## State Management

### Context Providers

**Main Loader Context** (`context/MainLoaderTimeLine.tsx`):
```typescript
// Manages global loading timeline
// Controls page transition animations
```

**Section Visibility Context** (`composnents/contact/SectionVisibilityContext.tsx`):
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
    gsap.from('.element', {
      scrollTrigger: {
        trigger: '.element',
        start: 'top center',
        end: 'bottom center',
        scrub: true
      },
      opacity: 0,
      y: 100
    });
  }, []);
}
```

### Smooth Scrolling

**Component** (`composnents/scroll/smoothScrolling.tsx`):
```typescript
// Wraps app with Lenis smooth scroll
// Provides smooth, natural scrolling experience
// Configurable easing and duration
```

### Animation Patterns

**Stagger Children** (`app/[locale]/(routes)/about/_comp/stagger-children.tsx`):
```typescript
// Animates children elements in sequence
// Creates cascading entrance effect
```

**Animation Wrapper** (`app/[locale]/(routes)/about/_comp/animation-wrapper.tsx`):
```typescript
// Wraps content with animation logic
// Triggers on viewport intersection
```

---

## Image Optimization

### BlurHash Implementation

**Utility** (`lib/blurhash.ts`):
```typescript
export function decodeBlurHash(
  blurHash: string,
  width: number,
  height: number
): string {
  // Decodes BlurHash to canvas
  // Returns data URL for placeholder
}
```

**Server Component** (`composnents/Reusabale/ImageWithBlurHash.tsx`):
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

**Client Component** (`composnents/Reusabale/ClientImageWithBlurHash.tsx`):
```typescript
'use client';
// Same as above but for client components
```

### Image Loading Strategy

1. **BlurHash placeholder** displays immediately
2. **Low-quality image** loads and fades in
3. **Full-quality image** replaces when ready
4. **Lazy loading** for off-screen images

---

## Analytics Integration

### Client-Side Tracking

**Analytics Client** (`lib/analytic-client.ts`):
```typescript
export const analytics = {
  pageView: (path: string) => {
    // Send page view event
  },
  
  trackEvent: (event: string, data: any) => {
    // Send custom event
  },
  
  startSession: () => {
    // Initialize session
  }
};
```

### Provider Integration

**Provider** (`providers/analytic-provider.tsx`):
```typescript
'use client';

export function AnalyticProvider({ children }) {
  useEffect(() => {
    // Track page views
    // Send session data
    // Track interactions
  }, []);
  
  return <>{children}</>;
}
```

### Events Tracked

- Page views
- Session duration
- Click events
- Form submissions
- Scroll depth
- Device type
- Referrer
- Geographic location

---

## API Integration

### Server Actions

**Slideshows** (`lib/actions/slideShows.ts`):
```typescript
'use server';

export async function getSlideShows(type: string) {
  const response = await fetch(`${API_URL}/slideshows/type/${type}`);
  return response.json();
}

export async function getSlideShowBySlug(slug: string) {
  const response = await fetch(`${API_URL}/slideshows/slug/${slug}`);
  return response.json();
}
```

**Slides** (`lib/actions/slides.ts`):
```typescript
'use server';

export async function getSlides(slideshowId: string) {
  const response = await fetch(`${API_URL}/slideshows/${slideshowId}/slides`);
  return response.json();
}
```

### Proxy Configuration

**Proxy** (`proxy.ts`):
```typescript
// Configures API proxy for development
// Handles CORS and authentication
// Routes requests to backend
```

### API Calling Pattern

**In Server Components:**
```typescript
async function Page() {
  const data = await getSlideShows('services');
  return <Component data={data} />;
}
```

**In Client Components:**
```typescript
'use client';
import { useState, useEffect } from 'react';

function Component() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    getSlideShows('services').then(setData);
  }, []);
  
  return data ? <Display data={data} /> : <Loading />;
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

### Navigation Components

**Header Navigation** (`composnents/Header/header.tsx`):
```typescript
// Main navigation with locale-aware links
// Mobile menu with sheet component
// Active link highlighting
```

**Link Usage:**
```typescript
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Nav() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  
  return (
    <Link href={`/${locale}/about`}>
      About
    </Link>
  );
}
```

### Layout Hierarchy

```
app/[locale]/layout.tsx              # Root layout
├── (home-page)/page.tsx            # Home page
└── (routes)/
    ├── about/layout.tsx            # About layout
    │   └── page.tsx                # About page
    ├── services/layout.tsx         # Services layout
    │   └── page.tsx                # Services page
    └── team/layout.tsx             # Team layout
        └── page.tsx                # Team page
```

---

## Styling System

### Tailwind CSS Configuration

**Config** (`tailwind.config.js` - implied):
```javascript
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './composnents/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Custom theme extensions
    }
  }
}
```

### Global Styles

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

@layer components {
  /* Component styles */
}

@layer utilities {
  /* Utility classes */
}
```

**Height Breakpoints** (`app/[locale]/heightBreakPoints.css`):
```css
/* Viewport height utilities */
@media (min-height: 400px) {
  .min-h-screen-xs { min-height: 100vh; }
}

@media (min-height: 600px) {
  .min-h-screen-sm { min-height: 100vh; }
}

@media (min-height: 800px) {
  .min-h-screen-md { min-height: 100vh; }
}
```

### Component Styling Patterns

**Using Tailwind:**
```typescript
function Component() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary">
        Title
      </h1>
    </div>
  );
}
```

**Using CSS Modules** (if needed):
```typescript
import styles from './component.module.css';

function Component() {
  return <div className={styles.container}>Content</div>;
}
```

---

## Hooks & Utilities

### Custom Hooks

#### 1. `useBreakPoint`

**File:** `hooks/useBreakPoint.tsx`

```typescript
export function useBreakPoint() {
  const [breakpoint, setBreakpoint] = useState<string>('desktop');
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint('mobile');
      else if (width < 1024) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return breakpoint;
}
```

**Usage:**
```typescript
function ResponsiveComponent() {
  const breakpoint = useBreakPoint();
  
  return (
    <div>
      {breakpoint === 'mobile' ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

#### 2. `useGsapLenis`

**File:** `hooks/UseGsapLenis.tsx`

```typescript
export function useGsapLenis(options?: LenisOptions) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options
    });
    
    // Connect to GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    return () => {
      lenis.destroy();
    };
  }, []);
}
```

**Usage:**
```typescript
function App() {
  useGsapLenis({
    duration: 1.5,
    smoothTouch: true
  });
  
  return <Content />;
}
```

#### 3. `useScrollTriggerReady`

**File:** `hooks/useScrollTriggerReady.tsx`

```typescript
export function useScrollTriggerReady() {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Wait for page load and images
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return isReady;
}
```

**Usage:**
```typescript
function AnimatedSection() {
  const isReady = useScrollTriggerReady();
  
  useEffect(() => {
    if (!isReady) return;
    
    gsap.from('.element', {
      scrollTrigger: {
        trigger: '.element',
        start: 'top center'
      },
      opacity: 0
    });
  }, [isReady]);
}
```

### Utility Functions

**Utils** (`lib/utils.ts`):
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
  delay: number
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
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
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
NEXT_PUBLIC_API_URL=http://localhost:5000/api

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

### Development Workflow

1. **Start dev server**: `npm run dev`
2. **Make changes**: Edit files in `app/`, `composnents/`, etc.
3. **Hot reload**: Changes reflect immediately
4. **Test**: Check in browser
5. **Lint**: Run `npm run lint`
6. **Build**: Test production build with `npm run build`

### Adding New Pages

**Create page file:**
```typescript
// app/[locale]/(routes)/new-page/page.tsx
export default function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
}
```

**Add translations:**
```json
// lib/messages/en.json
{
  "newPage": {
    "title": "New Page",
    "description": "Page description"
  }
}
```

**Add navigation:**
```typescript
// composnents/Header/header.tsx
<Link href={`/${locale}/new-page`}>
  {t('navigation.newPage')}
</Link>
```

### Adding New Components

**Create component file:**
```typescript
// composnents/FeatureName/Component.tsx
export function Component() {
  return <div>Content</div>;
}
```

**Export from index (optional):**
```typescript
// composnents/FeatureName/index.ts
export { Component } from './Component';
```

**Use in page:**
```typescript
import { Component } from '@/composnents/FeatureName';

export default function Page() {
  return <Component />;
}
```

### Styling Guidelines

1. **Use Tailwind utilities first**
2. **Create component classes for reusable patterns**
3. **Use CSS modules for complex components**
4. **Follow BEM naming for CSS classes**
5. **Use theme variables for colors**

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
npm start
```

### Deployment Platforms

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Other Platforms

**Docker:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Build and run:**
```bash
docker build -t end-user .
docker run -p 3000:3000 end-user
```

### Environment Configuration

**Production .env:**
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NODE_ENV=production
```

### Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test all pages in production mode
- [ ] Verify API connections
- [ ] Check analytics integration
- [ ] Test on multiple devices
- [ ] Verify locale switching works
- [ ] Check image optimization
- [ ] Test animations performance
- [ ] Verify SEO meta tags
- [ ] Check accessibility (a11y)
- [ ] Test dark mode
- [ ] Verify smooth scrolling
- [ ] Check responsive layouts
- [ ] Test form submissions
- [ ] Verify error boundaries

### Performance Optimization

1. **Enable compression**
2. **Configure CDN for static assets**
3. **Optimize images in cloud storage**
4. **Enable HTTP/2**
5. **Set proper cache headers**
6. **Minimize bundle size**
7. **Use edge functions when possible**

---

## Troubleshooting

### Common Issues

**Issue: Animations not working**
```typescript
// Solution: Check GSAP initialization
useGsapLenis();

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);
```

**Issue: Locale not switching**
```typescript
// Solution: Verify locale in URL
const pathname = usePathname();
console.log('Current locale:', pathname.split('/')[1]);
```

**Issue: Images not loading**
```typescript
// Solution: Check image paths and BlurHash
<ImageWithBlurHash
  src="/correct/path/to/image.jpg"
  blurHash="validBlurHashString"
  alt="Description"
/>
```

**Issue: Build errors**
```bash
# Solution: Clear cache and rebuild
rm -rf .next
npm run build
```

---

## Best Practices

### Code Organization
- Group related components by feature
- Use index files for exports
- Keep components small and focused
- Separate client and server logic

### Performance
- Use Server Components by default
- Lazy load heavy components
- Optimize images with BlurHash
- Minimize client-side JavaScript
- Use React.memo for expensive renders

### Accessibility
- Use semantic HTML
- Add proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

### SEO
- Use next/head for meta tags
- Add structured data
- Optimize page titles
- Create descriptive URLs
- Add alt text to images

---

**Last Updated**: February 2026  
**Version**: 1.0.0  
**Framework**: Next.js 14+