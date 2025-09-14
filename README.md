# ICN – Fullstack Todo List with OpenAI Integration

A fullstack take-home built with:

- **Frontend**: Next.js 14 (App Router) + TypeScript + Zustand + React Hook Form
- **Backend**: NestJS 10 + Prisma + JWT (Passport) + OpenAI API
- **Database**: PostgreSQL
- **Bonus**: Dockerfiles + docker-compose, basic tests

## Features
- Register/Login (JWT)
- CRUD Todo (title, description, status)
- Generate 3 task suggestions from OpenAI based on user input (e.g., “learn programming”)
- Protected routes on backend; guarded UI on frontend
- State management with Zustand

---

## Quick Start (Local without Docker)

### 1) Requirements
- Node.js v18+
- pnpm (or npm/yarn)
- PostgreSQL running locally (or Docker)
- OpenAI API key

### 2) Backend
```bash
cd backend
cp .env.example .env
# Edit .env: DATABASE_URL, JWT_SECRET, OPENAI_API_KEY, FRONTEND_ORIGIN
pnpm install
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm start:dev
```

### 3) Frontend
```bash
cd frontend
cp .env.example .env.local
# Edit NEXT_PUBLIC_API_URL to backend URL, e.g. http://localhost:4000
pnpm install
pnpm dev
```

Login/Register at `/register` or `/login`, then access `/dashboard`.

---

## Run with Docker
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
# Fill .env files accordingly

docker compose up --build
```
- Frontend → http://localhost:3000
- Backend  → http://localhost:4000
- Postgres  → localhost:5432 (user: postgres / password: postgres)

---

## Tech Notes
- Prisma schema defines `User` and `Todo` with relations. Passwords are hashed (bcrypt).
- JWT strategy protects `/todos/*` and `/ai/suggest`.
- CORS configured for the frontend origin.
- Basic tests (sample) are included for backend auth service.
- Code is organized by module in NestJS and by feature in Next.js.

---

## API Overview

- `POST /auth/register` → { email, password, name }
- `POST /auth/login` → { email, password } → { access_token }
- `GET /todos` → list of the current user's todos
- `POST /todos` → { title, description? }
- `PATCH /todos/:id` → { title?, description?, done? }
- `DELETE /todos/:id`
- `POST /ai/suggest` → { prompt: string } → [string, string, string]

**Authorization**: `Authorization: Bearer <token>`

---

## Testing
```bash
cd backend
pnpm test
```

---

## Deployment
- Frontend: deploy to Vercel (set `NEXT_PUBLIC_API_URL` env to backend URL).
- Backend: deploy to Render/VPS; set `PORT`, `DATABASE_URL`, `JWT_SECRET`, `OPENAI_API_KEY`, and CORS origin(s).

Good luck! 🚀


## Local PostgreSQL (password 753159)
- Set `DATABASE_URL=postgresql://postgres:753159@localhost:5432/icn?schema=public`
- Create DB once if needed:
```sql
CREATE DATABASE icn;
```
