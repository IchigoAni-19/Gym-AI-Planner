<div align="center">

<img src="public/gym.png" width="88" height="88" alt="GymAI logo" />

# GymAI

### AI-powered personalized gym training plans, built in seconds.

<p>
  <a href="https://gym-ai-f9c2avfagfepd8cv.indiasouthcentral-01.azurewebsites.net">
    <img src="https://img.shields.io/badge/Live%20Demo-Open%20App-2563EB?style=for-the-badge&logo=microsoftazure&logoColor=white" alt="Open live demo" />
  </a>
</p>

<p>
  <a href="https://github.com/IchigoAni-19/Gym-AI-Planner">GitHub</a>
  &nbsp;&middot;&nbsp;
  <a href="https://hub.docker.com/r/patelharsh19/gym-ai">Docker Hub</a>
  &nbsp;&middot;&nbsp;
  <a href="https://github.com/IchigoAni-19/Gym-AI-Planner/issues">Report a bug</a>
  &nbsp;&middot;&nbsp;
  <a href="https://github.com/IchigoAni-19/Gym-AI-Planner/issues">Request a feature</a>
</p>

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 6" />
  <img src="https://img.shields.io/badge/Node.js-22-5FA04E?style=flat-square&logo=node.js&logoColor=white" alt="Node.js 22" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL on Neon" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma 7" />
  <img src="https://img.shields.io/badge/Docker-Multi--stage-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Azure-App%20Service-0078D4?style=flat-square&logo=microsoftazure&logoColor=white" alt="Azure App Service" />
  <img src="https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?style=flat-square&logo=githubactions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/License-MIT-22C55E?style=flat-square" alt="MIT License" />
</p>

</div>

---

## Overview

GymAI is a full-stack web application for generating structured, personalized gym programs with AI. Users answer a short questionnaire covering goals, experience, schedule, equipment, and limitations. GymAI turns that context into a complete weekly plan with exercises, sets, reps, rest periods, RPE targets, alternatives, and progression guidance.

Plans are persisted in PostgreSQL and versioned on every regeneration, so users can iterate without losing their previous training history. The responsive interface supports both light and dark themes and is designed for quick scanning on desktop and mobile.

## Features

### AI plan generation

- OpenRouter integration with `openai/gpt-4o-mini` as the default model.
- Structured JSON output mapped into a stable training-plan schema.
- Configurable model selection through `OPENROUTER_MODEL`.
- Deterministic fallback plan when the AI key is unavailable or generation fails.

### Smart onboarding

- Goal: bulk, cut, recomp, strength, or endurance.
- Experience: beginner, intermediate, or advanced.
- Training frequency from 2 to 6 days per week.
- Session duration from 30 to 90 minutes.
- Full gym, home gym, or dumbbell-only equipment options.
- Full-body, upper/lower, push/pull/legs, or AI-selected split.
- Optional injury and limitation notes included in the generation prompt.

### Training dashboard

- Weekly schedule cards organized by training day and focus.
- Exercise tables with sets, reps, rest, and color-coded RPE badges.
- Exercise notes and alternatives.
- Program overview with goal, frequency, split, and plan version.
- Progression strategy guidance.
- One-click regeneration with persistent versioning.

### Authentication and account controls

- Neon Auth integration.
- Google OAuth and email/password authentication.
- Protected onboarding and plan views.
- Account settings and sign-out controls.

### UI and experience

- Light and dark themes with CSS custom properties and persisted preference.
- Responsive layout for desktop and mobile.
- Tailwind CSS v4 utilities, Lucide icons, and accessible form controls.
- API error states surfaced directly in the onboarding workflow.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS v4, React Router 7 |
| UI | Radix UI primitives, Lucide React, CSS custom properties |
| Authentication | Neon Auth, Google OAuth, email/password |
| Backend | Node.js, Express 5, TypeScript, `tsx` |
| Database | PostgreSQL on Neon Serverless |
| ORM | Prisma 7 with `@prisma/adapter-pg` |
| AI | OpenRouter API, OpenAI SDK, `openai/gpt-4o-mini` |
| Delivery | Docker multi-stage build, GitHub Actions, Docker Hub, Azure App Service for Containers |

## How It Works

```mermaid
flowchart LR
  U([User]) --> AUTH[Neon Auth<br/>Google OAuth or email/password]
  AUTH --> ONBOARD[Smart onboarding<br/>goals, schedule, equipment, limitations]
  ONBOARD --> API[Express API<br/>validation and orchestration]
  API --> AI[OpenRouter<br/>gpt-4o-mini]
  API --> DB[(Neon PostgreSQL<br/>profiles and versioned plans)]
  AI --> NORMALIZE[Plan normalization<br/>structured JSON + fallback]
  NORMALIZE --> DB
  DB --> DASH[React dashboard<br/>weekly schedule and progression]

  classDef client fill:#dbeafe,stroke:#2563eb,color:#0f172a,stroke-width:2px
  classDef service fill:#ede9fe,stroke:#7c3aed,color:#1e1b4b,stroke-width:2px
  classDef data fill:#dcfce7,stroke:#16a34a,color:#14532d,stroke-width:2px
  class U,AUTH,ONBOARD,DASH client
  class API,AI,NORMALIZE service
  class DB data
```

## Architecture

GymAI is deployed as a monolithic production container:

1. **Frontend build:** Vite compiles the React application into static assets.
2. **Backend build:** TypeScript compiles the Express server and Prisma generates the database client.
3. **Production image:** Express serves the compiled React application and owns the `/api` routes.
4. **Database:** Prisma connects to PostgreSQL hosted by Neon.
5. **AI:** The backend calls OpenRouter and normalizes the model response before persistence.

This keeps the deployed application behind one origin while preserving a clean frontend/backend boundary during development.

### Production topology

```mermaid
flowchart TB
  subgraph CLIENT[Client Access Layer]
    BROWSER[Desktop or mobile browser]
    LIVE[Azure HTTPS endpoint]
    LOCAL[Local Vite development server]
  end

  subgraph AZURE[Azure App Service for Containers]
    CONTAINER[GymAI monolithic container]
    STATIC[Express static file server<br/>compiled React frontend]
    ROUTES[Express REST API<br/>/api/profile and /api/plan]
  end

  subgraph SERVICES[External Services]
    AUTH[Neon Auth<br/>Google OAuth + email/password]
    AI[OpenRouter API<br/>gpt-4o-mini]
    DB[(Neon Serverless PostgreSQL)]
  end

  BROWSER --> LIVE
  LOCAL --> CONTAINER
  LIVE --> CONTAINER
  CONTAINER --> STATIC
  CONTAINER --> ROUTES
  ROUTES --> AUTH
  ROUTES --> AI
  ROUTES --> DB

  classDef edge fill:#dbeafe,stroke:#2563eb,color:#0f172a,stroke-width:2px
  classDef app fill:#ede9fe,stroke:#7c3aed,color:#1e1b4b,stroke-width:2px
  classDef cloud fill:#dcfce7,stroke:#16a34a,color:#14532d,stroke-width:2px
  class BROWSER,LIVE,LOCAL edge
  class CONTAINER,STATIC,ROUTES app
  class AUTH,AI,DB cloud
```

## Project Structure

```text
gym-planner-ai/
├── src/                              # React frontend
│   ├── assets/                       # Frontend assets
│   ├── components/
│   │   ├── layout/                   # Navbar and theme controls
│   │   ├── plan/                     # Training plan display
│   │   └── ui/                       # Shared form and surface components
│   ├── context/                      # Auth and theme providers/hooks
│   ├── lib/                          # API and Neon Auth clients
│   ├── pages/                        # Home, auth, onboarding, account, plan
│   ├── types/                        # Frontend domain types
│   ├── App.tsx                       # Router and application shell
│   └── index.css                     # Global theme tokens and base styles
├── server/
│   ├── src/
│   │   ├── lib/                      # AI, Prisma, and validation helpers
│   │   ├── routes/                   # Profile and plan endpoints
│   │   └── index.ts                  # Express bootstrap and static serving
│   ├── prisma/schema.prisma          # Database schema
│   ├── generated/prisma/             # Generated Prisma client
│   ├── types/                        # Server domain types
│   └── package.json                  # Backend scripts and dependencies
├── public/                           # Public assets and production frontend
├── dockerfile                        # Multi-stage production image
├── .dockerignore                     # Docker build exclusions
├── vite.config.ts                    # Vite config and API proxy
├── package.json                      # Frontend scripts and dependencies
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 22 or newer.
- A PostgreSQL database, preferably a Neon project.
- A Neon Auth project.
- An OpenRouter API key for live AI generation. It is optional during development because GymAI has a fallback generator.

### Clone and install

```bash
git clone https://github.com/IchigoAni-19/Gym-AI-Planner.git
cd Gym-AI-Planner

npm install
cd server
npm install
cd ..
```

### Configure the database

```bash
cd server
npx prisma generate
npx prisma migrate deploy
cd ..
```

For local development without migrations, `npx prisma db push` can be used instead.

### Run locally

Start both the Vite frontend and Express backend from the repository root:

```bash
npm run dev
```

| Service | URL |
| --- | --- |
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:3001` |

The Vite development server proxies `/api` requests to Express. To run the backend separately:

```bash
cd server
npm run dev:server
```

## Environment Variables

### Frontend `.env`

```env
VITE_NEON_AUTH_URL=https://your-neon-project.neon.tech/auth

# Leave empty to use the same-origin /api path through Vite or production Express.
# Set this when running the frontend against a separately hosted backend.
VITE_API_URL=
```

### Backend `server/.env`

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Optional. The deterministic fallback generator is used when this is absent.
OPEN_ROUTER_KEY=sk-or-v1-your-key
OPENROUTER_MODEL=openai/gpt-4o-mini

PORT=3001
BASE_URL=http://localhost:3001
```

<details>
<summary><strong>Production configuration</strong></summary>

In production, configure secrets through Azure App Settings and GitHub Actions Secrets rather than committing `.env` files. At minimum, provide `DATABASE_URL`, `VITE_NEON_AUTH_URL`, and the OpenRouter key when live AI generation is required.

</details>

## Docker Deployment

The repository includes a three-stage Docker build:

| Stage | Responsibility |
| --- | --- |
| `frontend-build` | Installs root dependencies and builds the React app with Vite |
| `backend-build` | Installs server dependencies, generates Prisma, and compiles TypeScript |
| `production` | Copies the compiled server, generated client, Prisma files, and frontend assets into a lean runtime image |

Build and run locally:

```bash
docker build -f dockerfile -t gym-ai-planner:latest .
docker run --rm \
  --env-file server/.env \
  -p 8080:8080 \
  gym-ai-planner:latest
```

Open `http://localhost:8080` after the container starts. Express serves the frontend and API from the same container.

The published image is available at:

```text
patelharsh19/gym-ai:latest
```

## CI/CD Pipeline

The deployment flow is designed around a push to `main`:

```mermaid
flowchart LR
  PUSH([git push origin main]) --> WORKFLOW[GitHub Actions<br/>deploy.yml]

  subgraph BUILD[Continuous Integration]
    CHECKOUT[Checkout source]
    INSTALL[Install root + server dependencies]
    VERIFY[Lint and build]
    IMAGE[Build multi-stage Docker image]
    CHECKOUT --> INSTALL --> VERIFY --> IMAGE
  end

  WORKFLOW --> CHECKOUT
  IMAGE --> LOGIN[Docker Hub login<br/>GitHub Actions secret]
  LOGIN --> PUBLISH[Push<br/>patelharsh19/gym-ai:latest]

  subgraph DEPLOY[Continuous Delivery]
    AZURE[Azure App Service for Containers]
    RESTART[Pull latest image<br/>zero-downtime restart]
    AZURE --> RESTART
  end

  PUBLISH --> AZURE
  RESTART --> LIVE([Live GymAI application])

  SECRETS[(GitHub Actions Secrets<br/>Azure App Settings)] -. runtime configuration .-> AZURE

  classDef trigger fill:#fef3c7,stroke:#d97706,color:#78350f,stroke-width:2px
  classDef build fill:#dbeafe,stroke:#2563eb,color:#0f172a,stroke-width:2px
  classDef deploy fill:#ede9fe,stroke:#7c3aed,color:#1e1b4b,stroke-width:2px
  classDef success fill:#dcfce7,stroke:#16a34a,color:#14532d,stroke-width:2px
  classDef secret fill:#fee2e2,stroke:#dc2626,color:#7f1d1d,stroke-width:2px
  class PUSH trigger
  class WORKFLOW,CHECKOUT,INSTALL,VERIFY,IMAGE,LOGIN,PUBLISH build
  class AZURE,RESTART deploy
  class LIVE success
  class SECRETS secret
```

Environment secrets are stored in GitHub Actions Secrets and Azure App Settings. The production container receives runtime configuration without embedding credentials in the image.

## API Reference

### `POST /api/profile`

Creates or updates a user's fitness profile.

```json
{
  "userId": "00000000-0000-0000-0000-000000000000",
  "goal": "bulk",
  "experience": "intermediate",
  "daysPerWeek": 4,
  "sessionLength": 60,
  "equipment": "full_gym",
  "injuries": "mild shoulder limitation",
  "preferredSplit": "upper_lower"
}
```

Success response:

```json
{ "success": true }
```

### `POST /api/plan/generate`

Generates and persists a new version for a user with a saved profile.

```json
{ "userId": "00000000-0000-0000-0000-000000000000" }
```

Success response:

```json
{
  "id": "plan-uuid",
  "version": 2,
  "createdAt": "2026-09-11T12:00:00.000Z"
}
```

### `GET /api/plan/current?userId=<uuid>`

Returns the latest saved plan and its structured JSON payload.

<details>
<summary><strong>Example response</strong></summary>

```json
{
  "id": "plan-uuid",
  "userId": "user-uuid",
  "planJson": {
    "overview": {
      "goal": "Build muscle and gain size",
      "frequency": "4 days per week",
      "split": "Upper/Lower",
      "notes": "Train with consistent technique and recovery."
    },
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
    "progression": "Increase load after completing the top of the rep range."
  },
  "planText": "{...}",
  "version": 2,
  "createdAt": "2026-09-11T12:00:00.000Z"
}
```

</details>

## Screenshots

> Add product screenshots or a short GIF here.
>
> Suggested captures: onboarding questionnaire, generated plan dashboard, light theme, dark theme, and Google sign-in.

## Roadmap

- [ ] Workout logging and completed-session tracking
- [ ] Progress charts for volume and strength trends
- [ ] Exercise library with technique guidance
- [ ] Plan export to PDF
- [ ] Push notifications and workout reminders
- [ ] Community features and plan sharing
- [ ] React Native mobile application

## License

GymAI is distributed under the MIT License.

<div align="center">

Built for lifters who train with intent.

</div>
