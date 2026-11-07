# KALAKRITI (കലാരീതി / കലാകൃതി)
### Discover. Preserve. Showcase.
**A Community-Driven Cultural Discovery & Artist Showcase Platform for Thrissur District, Kerala, India**

---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Framework: Next.js 14+](https://img.shields.io/badge/Framework-Next.js%2014%2B-black.svg)](https://nextjs.org/)
[![Database: PostgreSQL + PostGIS](https://img.shields.io/badge/Database-PostgreSQL%2016%20%2B%20PostGIS-336791.svg)](https://postgis.net/)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript%205.4-blue.svg)](https://www.typescriptlang.org/)
[![Styling: Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC.svg)](https://tailwindcss.com/)

---

## 🏛️ About KALAKRITI

**Thrissur** is the official **Cultural Capital of Kerala**. From the magnificent *Thrissur Pooram* and rhythmic *Panchavadyam* to the ancient Sanskrit theatre of *Koodiyattam* at Kerala Kalamandalam, Thrissur is home to world-renowned heritage institutions, generational master craftsmen, temple muralists, and vibrant folk performers.

Yet, many traditional masters, handloom weavers (*Kuthampully*), and bell-metal casters (*Nadavaramba*) remain hidden behind commercial intermediaries, while cultural tourists and local enthusiasts struggle to find verified, authentic cultural happenings.

**KALAKRITI** bridges this divide:
1. **Discover:** Explore an interactive, geolocated cultural map of Thrissur featuring heritage monuments, active artisan studios, festival stages, and craft clusters.
2. **Preserve:** Access a living bilingual digital encyclopedia documenting traditional artforms, GI-tagged crafts, oral lineages, and audio pronunciation guides.
3. **Showcase:** Give local artisans, sculptors, and performers independent digital ateliers to showcase high-resolution portfolios, receive direct commission inquiries via WhatsApp, and host masterclass workshops.

---

## 📚 Complete Project Documentation

Before diving into code, review the complete architectural and operational specifications:

| Document | Purpose |
| :--- | :--- |
| 📋 [**PRD.md**](./PRD.md) | **Product Requirements Document:** User personas, functional epics, bilingual requirements, KPIs, and roadmap. |
| ⚙️ [**TRD.md**](./TRD.md) | **Technical Requirements Document:** Cloud-native architecture, Next.js 14 App Router, PostGIS queries, media pipeline, API specifications, and performance targets. |
| 🔀 [**App_flow.md**](./App_flow.md) | **Application Flow:** End-to-end user journeys (Explorer, Artisan, Organizer, Curator), state machines, and responsive layouts. |
| 🎨 [**Design.md**](./Design.md) | **UI/UX Design System:** "Keraliya Elegance meets Modern Minimalism" — color tokens (Terracotta, Kasavu Gold, Teak), typography (Malayalam & English), component guidelines, and accessibility standards. |
| 🗄️ [**database_schema.md**](./database_schema.md) | **Database Structure:** Complete PostgreSQL 16 + PostGIS schema, relational ER diagram, spatial index optimizations, and production-ready Prisma ORM models. |

---

## 🌐 Live Deployments & URLs

- **Public Live Website (Mobile & Desktop):** [https://kalakriti-thrissur-live.loca.lt](https://kalakriti-thrissur-live.loca.lt)
- **Admin Moderation Console:** [https://kalakriti-thrissur-live.loca.lt/#admin](https://kalakriti-thrissur-live.loca.lt/#admin)
- **Vercel Cloud Deployment & Claim URL:** [https://vercel.com/claim-deployment?code=ea6f96c3-a4e9-4179-80ad-114380664926](https://vercel.com/claim-deployment?code=ea6f96c3-a4e9-4179-80ad-114380664926)
  *(Claim this deployment directly to your Vercel account with 1 click to obtain your permanent `kalakriti.vercel.app` production domain).*

---

## 🛠️ Technology Stack

- **Frontend & Fullstack:** Next.js 14+ (App Router, Server Components & Server Actions), React 18/19, TypeScript
- **Styling & Components:** Tailwind CSS, Radix UI primitives (Shadcn/UI), Framer Motion, Lucide Icons
- **Database & Geospatial:** PostgreSQL 16 with **PostGIS 3.4+** extension for geospatial vector querying
- **ORM & Data Layer:** Prisma ORM with `@prisma/client` and custom PostGIS spatial functions
- **Authentication:** Auth.js (NextAuth v5) supporting Mobile Phone OTP (SMS) and Google OAuth
- **Interactive Maps:** MapLibre GL JS with OpenStreetMap vector tiles & custom Kerala cultural markers
- **Media Pipeline:** Cloudflare R2 / Cloudinary with client-side BlurHash generation and AVIF/WebP auto-transcoding
- **Caching & Rate Limiting:** Redis (Upstash) for spatial caching and sliding-window protection
- **Internationalization:** Bilingual English & Malayalam (മലയാളം) engine

---

## 🚀 Getting Started & Local Setup

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js:** `v18.18.0` or `v20.x+` (LTS recommended)
- **Package Manager:** `pnpm` (recommended), `npm`, or `yarn`
- **PostgreSQL Database:** PostgreSQL `15+` or `16+` with the `postgis` extension installed.
  - *Tip:* You can use a local Docker container or cloud providers like [Neon](https://neon.tech/) or [Supabase](https://supabase.com/) which come with PostGIS pre-enabled.

---

### 2. Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/your-org/kalakriti.git
cd kalakriti

# Install dependencies using pnpm
pnpm install
```

---

### 3. Environment Variables Configuration

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Configure your Supabase project credentials in `.env`:

```env
# Application URL
VITE_APP_URL="http://localhost:3000"

# Supabase Public API Configuration
# (Safe to expose in the frontend browser client - protected by Row Level Security)
VITE_SUPABASE_URL="https://your-project-ref.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-public-key"

# ⚠️ SECURITY NOTICE:
# NEVER place SUPABASE_SERVICE_ROLE_KEY or PostgreSQL database passwords in frontend code
# or in any VITE_ prefixed environment variables!
```

---

### 4. Supabase Database & Storage Setup

KALAKRITI comes with a complete PostgreSQL migration and seed script.

#### Step A: Run SQL Migrations
1. Go to your **[Supabase Project Dashboard](https://supabase.com/dashboard)**.
2. Navigate to the **SQL Editor**.
3. Open `supabase/migrations/20261107000000_kalakriti_schema.sql` and run the script. This creates:
   - Custom types: `user_role`, `moderation_status`, `event_status`, `taluk_enum`.
   - All 10 tables: `profiles`, `artists`, `cultural_listings`, `artwork_posts`, `cultural_events`, `categories`, `locations`, `contributions`, `moderation_logs`, `saved_items`.
   - Automatic user creation trigger on `auth.users`.
   - Row Level Security (RLS) policies enforcing that **only approved content is visible publicly**.
   - Storage bucket `kalakriti-media` with upload and access policies.

#### Step B: Populate Seed Data
In the **SQL Editor**, run `supabase/seed.sql`. This populates:
- 6 cultural categories.
- 6 Thrissur taluk hubs.
- 6 Living master artist profiles with authentic lineages.
- 15 Cultural listings covering heritage landmarks, craft clusters, and academies.

#### Step C: Create Your First Admin Account
You can configure an admin account using either of the two methods below:

**Method 1: Direct SQL Elevation (Recommended for Production)**
1. Sign up on KALAKRITI using the in-app **Login / Sign Up** modal with your email address (e.g. `admin@kalakriti.kerala.gov.in`).
2. Run this quick query in the Supabase **SQL Editor**:
```sql
UPDATE public.profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'admin@kalakriti.kerala.gov.in'
);
```

**Method 2: In-App Demo Evaluator Mode (Instant)**
1. Navigate to the Admin Console at [/#admin](https://kalakriti-thrissur.loca.lt/#admin).
2. Click the gold **"Enter as Demo Admin"** button to log in instantly with the pre-seeded Chief Curator credentials (`admin@kalakriti.kerala.gov.in`).

---

### 5. Start the Application

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Offline / Demo Resilience:**
> If Supabase credentials are not yet configured or in offline mode, KALAKRITI smoothly falls back to rich sample cultural data, allowing full evaluation of the interactive map, artist directory, community showcase, and cultural listings without any crashes.

---

### 6. Production Build

To verify and compile the production bundle:

```bash
npm run build
```


---

## 📂 Project Directory Structure

```text
kalakriti/
├── docs/                      # Architectural documentation
│   ├── PRD.md                 # Product Requirements Document
│   ├── TRD.md                 # Technical Requirements Document
│   ├── App_flow.md            # User Flows and State Machines
│   ├── Design.md              # UI/UX Design System & Tokens
│   └── database_schema.md     # PostgreSQL + PostGIS Schema
├── prisma/
│   ├── schema.prisma          # Prisma schema with PostGIS models
│   └── seed.ts                # Seed script with authentic Thrissur data
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Auth routes (Login, OTP verify)
│   │   ├── (public)/          # Public routes
│   │   │   ├── page.tsx       # Landing page (Hero, Pooram banner, Showcase)
│   │   │   ├── discover/      # Cultural knowledge base
│   │   │   ├── map/           # Fullscreen interactive Thrissur map
│   │   │   ├── artists/       # Artisan directory & profile pages
│   │   │   ├── events/        # Festival calendar & pooram timetable
│   │   │   └── heritage/      # Heritage locations & audio trails
│   │   ├── dashboard/         # Protected dashboards (Artist, Curator, Admin)
│   │   └── api/               # API route handlers (/api/v1/*)
│   ├── components/            # Reusable UI component library
│   │   ├── cultural/          # Kerala-themed components (KasavuBorder, LampBadge)
│   │   ├── map/               # MapLibre map canvas, markers & popup cards
│   │   ├── media/             # Artwork lightbox, audio pronunciation player
│   │   └── ui/                # Accessible Radix primitives
│   ├── lib/                   # Utility libraries (PostGIS helpers, formatting)
│   ├── styles/                # Global styles & Tailwind configuration
│   └── types/                 # Shared TypeScript interfaces
├── public/                    # Static assets, SVG cultural markers & audio samples
├── .env.example               # Environment variables template
├── package.json               # Dependencies and scripts
├── tailwind.config.ts         # Tailwind design tokens (Kasavu Gold, Teak, Terracotta)
└── tsconfig.json              # TypeScript configuration
```

---

## 🌐 Geospatial Features (Thrissur Coordinates)

Thrissur District spans coordinates `10.1500° N to 10.8200° N` and `75.9200° E to 76.6200° E`.

The platform implements native PostGIS queries for:
- **Radial Discovery:** Find all active master artisans and upcoming festivals within 5 km to 50 km of the user's location.
- **Cultural Circuits:** Follow curated heritage trails (e.g. *The Nila River Arts Trail*, *The Temple Mural & Bronze Trail*).
- **Sub-district (Taluk) Filtering:** Filter by `Thrissur`, `Mukundapuram`, `Kodungallur`, `Chavakkad`, `Chalakudy`, and `Thalapilly`.

---

## 🛡️ Moderation & Cultural Sanctity

To preserve cultural authenticity and prevent spam:
- **Heuristic Scanning:** Automated checks for spam keywords and low-quality media.
- **Curator Review Queue:** Traditional master verification requires proof of trade (Artisan Card, Akademi endorsement, or video portfolio).
- **Public Reporting:** Community members can flag inaccurate information or preservation concerns.

---

## 🤝 Contributing

We welcome contributions from cultural scholars, developers, and photographers passionate about Kerala's heritage. Please check our [Contributing Guidelines](./CONTRIBUTING.md) and adhere to our Cultural Code of Conduct.

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.
Cultural content and oral archives are preserved under Creative Commons Attribution-NonCommercial (CC BY-NC 4.0).

