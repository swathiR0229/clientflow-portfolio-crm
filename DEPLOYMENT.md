# Deployment Guide (Project1)

## Option A: Render (Web Service)
1. Push this folder to a GitHub repository.
2. Create a new Web Service on Render.
3. Build command: `npm install`
4. Start command: `npm start`
5. Environment variables:
   - `PORT` = `10000` (or leave default if Render sets it)
   - `ADMIN_TOKEN` = strong random value

## Important for SQLite
- SQLite is file-based (`contact.db`), so data may reset on redeploy unless persistent disk is configured.
- For serious production usage, move to Postgres/MySQL.

## Option B: Railway
1. Create project from GitHub repo.
2. Add env var `ADMIN_TOKEN`.
3. Deploy with default Node start command.

## Post-Deploy Validation
1. `GET /api/health` returns `{ "status": "ok" }`
2. Submit contact form from `/`
3. Open `/admin.html` and verify new lead appears
