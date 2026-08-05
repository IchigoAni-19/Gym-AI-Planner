<div align="center">

<br />

<img src="public/gym.png" width="72" height="72" alt="GymAI Logo" />

# GymAI

### AI-powered personalized gym training plans — built in seconds.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://neon.tech)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=flat-square&logo=openai&logoColor=white)](https://openrouter.ai)
[![License](https://img.shields.io/badge/License-ISC-green?style=flat-square)](LICENSE)

<br />

[**Live Demo**](#) · [**Report a Bug**](#) · [**Request a Feature**](#)

<br />

</div>

---

## Overview

**GymAI** is a full-stack web application that generates personalized, structured gym training programs using AI. Answer a short questionnaire — your goals, experience, schedule, and equipment — and receive a complete weekly plan with exercises, sets, reps, rest periods, and RPE scores within seconds.

The app is designed with a clean, modern UI featuring dark/light mode, smooth animations, and a responsive layout built for both desktop and mobile lifters.

---

## Screenshots

> _Add screenshots or a GIF demo here_

---

## Features

### 🤖 AI Plan Generation
- Powered by **OpenRouter** (default model: `openai/gpt-4o-mini`)
- Structured JSON output with detailed plan schema validation
- Graceful **fallback plan generator** — the app keeps working even without an AI API key
- Configurable model via environment variable

### 🧠 Smart Onboarding
- Goal selection: **Bulk · Cut · Recomp · Strength · Endurance**
- Experience levels: **Beginner · Intermediate · Advanced**
- Sessions per week: **2 – 6 days**
- Session duration: **30 · 45 · 60 · 90 minutes**
- Equipment access: **Full Gym · Home Gym · Dumbbells Only**
- Training split preference: **Full Body · Upper/Lower · Push/Pull/Legs · AI Decides**
- Optional injury/limitation notes fed directly into the AI prompt

### 📋 Training Plan Dashboard
- Weekly schedule with per-day workout cards
- Exercise table: name · sets × reps · rest period · **RPE badge** (color-coded green/yellow/red)
- Exercise notes and alternatives per movement
- Program overview card: goal, frequency, split, version
- Progression strategy guidance
- **One-click plan regeneration** (versioned — never loses previous plans)

### 🔐 Authentication
- Powered by **Neon Auth** (`@neondatabase/neon-js`)
- Social login via **Google OAuth**
- Email/password support
- Session-based auth with secure cookie handling
- Protected routes with redirect-to-sign-in guards

### 🎨 UI / UX
- **Dark & Light mode** with smooth CSS transition (purple accent palette)
- Animated gradient text, floating orbs, grid backgrounds
- Scroll-reveal animations on all content sections
- Accessible — ARIA roles, keyboard navigation, `prefers-reduced-motion` support
- Built entirely with **Tailwind CSS v4** utility classes and custom CSS variables
- Component library using **Radix UI** primitives + **Lucide React** icons
- Toast notifications via **Sonner**

### ⚙️ Backend API
- **Express 5** REST API server
- `/api/profile` — upsert user fitness profile
- `/api/plan/generate` — generate and persist a new AI training plan
- `/api/plan/current` — fetch the latest plan for a user
- Input validation (UUID format, required fields)
- Plan versioning — each regeneration increments a version counter

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool & dev server |
| React Router DOM | 7 | Client-side routing |
| Tailwind CSS | 4 | Utility-first styling |
| Neon Auth (neon-js) | — | Authentication provider |
| Lucide React | latest | Icon set |
| Radix UI | — | Accessible component primitives |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | — | Runtime |
| Express | 5 | HTTP server |
| TypeScript | 7 | Type safety |
| tsx / nodemon | — | Dev server with hot reload |
| OpenAI SDK | 7 | AI API client (via OpenRouter) |
| CORS, cookie-parser | — | Middleware |

### Database & ORM
| Technology | Purpose |
|---|---|
| PostgreSQL (Neon) | Managed serverless Postgres |
| Prisma | ORM, schema management, migrations |
| `@prisma/adapter-pg` | Connection adapter |

### AI
| Service | Model | Purpose |
|---|---|---|
| OpenRouter | `openai/gpt-4o-mini` (default) | Training plan generation |

---

## Project Structure

```
gym-planner-ai/
├── src/                          # Frontend (React + TypeScript)
│   ├── assets/                   # Static assets
│   ├── components/
│   │   ├── layout/               # Navbar, ThemeToggle
│   │   ├── plan/                 # PlanDisplay, ExerciseRow, DayCard
│   │   └── ui/                   # Button, Card, Select, Textarea, Reveal
│   ├── context/                  # AuthContext, AuthProvider, ThemeContext
│   ├── lib/
│   │   ├── api.ts                # Typed API client (fetch wrapper)
│   │   └── auth.ts               # Neon auth client instance
│   ├── pages/
│   │   ├── Home.tsx              # Landing page (hero, features, CTA)
│   │   ├── Onboarding.tsx        # Fitness questionnaire + plan generation
│   │   ├── Profile.tsx           # Training plan dashboard
│   │   ├── Auth.tsx              # Sign in / sign up page
│   │   └── Account.tsx           # User settings
│   ├── types/index.ts            # Shared TypeScript interfaces
│   ├── App.tsx                   # Router setup, app shell
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles, CSS variables, animations
│
├── server/                       # Backend (Express + TypeScript)
│   ├── src/
│   │   ├── lib/
│   │   │   ├── ai.ts             # OpenRouter AI prompt + fallback plan
│   │   │   ├── prisma.ts         # Prisma client singleton
│   │   │   └── validation.ts     # UUID validation helper
│   │   ├── routes/
│   │   │   ├── plan.ts           # POST /generate, GET /current
│   │   │   └── profile.ts        # POST / (upsert profile)
│   │   └── index.ts              # Express app bootstrap
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   └── migrations/           # Migration history
│   ├── generated/prisma/         # Prisma generated client
│   ├── types/index.ts            # Shared server-side types
│   └── package.json
│
├── public/                       # Favicon, SVG icons
├── index.html                    # Vite HTML entry
├── vite.config.ts                # Vite config
├── tsconfig.app.json             # TS config (frontend)
└── package.json                  # Root scripts + dependencies
```

---

## Data Models

### `user_profiles`
| Column | Type | Description |
|---|---|---|
| `user_id` | UUID (PK) | Foreign key from auth provider |
| `goal` | VARCHAR(20) | `bulk` · `cut` · `recomp` · `strength` · `endurance` |
| `experience` | VARCHAR(20) | `beginner` · `intermediate` · `advanced` |
| `days_per_week` | INT | Number of training days (2–6) |
| `session_length` | INT | Session duration in minutes |
| `equipment` | VARCHAR(20) | `full_gym` · `home` · `dumbbells` |
| `injuries` | TEXT | Optional injury/limitation notes |
| `preferred_split` | VARCHAR(20) | `full_body` · `upper_lower` · `ppl` · `custom` |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

### `training_plans`
| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Auto-generated |
| `user_id` | UUID | Indexed foreign key |
| `plan_json` | JSONB | Full structured plan (overview, schedule, progression) |
| `plan_text` | TEXT | Serialized JSON string |
| `version` | INT | Auto-incremented per user |
| `created_at` | TIMESTAMPTZ | Creation timestamp |

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** database (or a [Neon](https://neon.tech) project — free tier works)
- **OpenRouter API key** (optional — app uses a fallback plan if not set)
- **Neon Auth** project (for authentication)

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/gym-planner-ai.git
cd "gym-planner-ai"
```

**2. Install frontend dependencies**

```bash
npm install
```

**3. Install server dependencies**

```bash
cd server
npm install
cd ..
```

---

### Environment Variables

**Frontend** — create `.env` in the project root:

```env
# Neon Auth public URL (required for authentication)
VITE_NEON_AUTH_URL=https://your-neon-project.neon.tech/auth

# Backend API base URL (empty = same-origin, or set to http://localhost:3001 for dev)
VITE_API_URL=http://localhost:3001
```

**Backend** — create `server/.env`:

```env
# PostgreSQL connection string
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# OpenRouter API key (leave blank to use the built-in fallback plan)
OPEN_ROUTER_KEY=sk-or-v1-...

# AI model override (optional, defaults to openai/gpt-4o-mini)
OPENROUTER_MODEL=openai/gpt-4o-mini

# Server port
PORT=3001

# Base URL for OpenRouter referer header
BASE_URL=http://localhost:3001
```

---

### Database Setup

```bash
cd server

# Apply migrations to your database
npx prisma migrate deploy

# Or push schema directly (dev only)
npx prisma db push
```

---

### Running Locally

From the project root — starts both frontend and backend concurrently:

```bash
npm run dev
```

| Service | URL |
|---|---|
| Frontend (Vite) | http://localhost:5173 |
| Backend (Express) | http://localhost:3001 |

To run them separately:

```bash
# Frontend only
npx vite

# Backend only
cd server && npm run dev:server
```

---

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Serve it with any static host (Vercel, Netlify, Cloudflare Pages, etc.).

---

## API Reference

### `POST /api/profile`

Save or update a user's fitness profile.

**Request body:**
```json
{
  "userId": "uuid",
  "goal": "bulk",
  "experience": "intermediate",
  "daysPerWeek": 4,
  "sessionLength": 60,
  "equipment": "full_gym",
  "injuries": "lower back issues",
  "preferredSplit": "upper_lower"
}
```

**Response:** `{ "success": true }`

---

### `POST /api/plan/generate`

Generate a new AI training plan for a user. Requires a saved profile.

**Request body:**
```json
{ "userId": "uuid" }
```

**Response:**
```json
{
  "id": "uuid",
  "version": 2,
  "createdAt": "2026-08-06T12:00:00.000Z"
}
```

---

### `GET /api/plan/current?userId=<uuid>`

Fetch the user's most recent training plan.

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "planJson": {
    "overview": { "goal": "...", "frequency": "...", "split": "...", "notes": "..." },
    "weeklySchedule": [
      {
        "day": "Monday",
        "focus": "Upper Body",
        "exercises": [
          {
            "name": "Bench Press",
            "sets": 4,
            "reps": "6-8",
            "rest": "2-3 min",
            "rpe": 8,
            "notes": "Control the descent",
            "alternatives": ["Dumbbell Press", "Machine Press"]
          }
        ]
      }
    ],
    "progression": "..."
  },
  "version": 2,
  "createdAt": "2026-08-06T12:00:00.000Z"
}
```

---

## Roadmap

- [ ] Workout logging / session tracking
- [ ] Progress charts (volume, strength trends)
- [ ] Exercise library with form guides
- [ ] Plan export to PDF
- [ ] Push notifications / workout reminders
- [ ] Community features and plan sharing
- [ ] Mobile app (React Native)

---

## Contributing

1. Fork the repository
2. Create a feature branch — `git checkout -b feat/your-feature`
3. Commit your changes — `git commit -m "feat: add your feature"`
4. Push to the branch — `git push origin feat/your-feature`
5. Open a Pull Request

Please open an issue first for significant changes.

---

## License

Distributed under the **ISC License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

Built for lifters who train with intent. 💪

</div>
