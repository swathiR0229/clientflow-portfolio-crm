<<<<<<< HEAD
# Portfolio + Contact CRM

A portfolio website with a working lead-capture backend.
GitHub Profile: https://github.com/swathiR0229
Repository: https://github.com/swathiR0229/clientflow-portfolio-crm

## Features
- Responsive portfolio landing page for services and project highlights
- Contact form that saves leads into SQLite
- API validation for contact payloads
- Admin dashboard to view latest 100 inquiries
- Optional admin token protection for leads API

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: SQLite

## Project Structure
- `index.html` Portfolio landing page
- `style.css` Shared styles for portfolio and admin pages
- `script.js` Contact form submit logic
- `admin.html` Leads dashboard UI
- `admin.js` Loads and renders leads table
- `server.js` API server and SQLite integration
- `schema.sql` DB schema reference
- `DEPLOYMENT.md` Platform deployment checklist
- `TESTING.md` Manual/API testing guide
- `PORTFOLIO_COPY.md` Copy blocks for Upwork/Freelancer/GitHub

## API Endpoints
- `GET /api/health` health check
- `POST /api/contact` save inquiry
- `GET /api/messages` list latest 100 inquiries (requires `x-admin-token` header only if `ADMIN_TOKEN` is set)

## Local Setup
1. Open terminal in this folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) create `.env` from `.env.example` and set `ADMIN_TOKEN`.
4. Start server:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000`.

## Windows Note (SQLite native module)
If you run from Windows Node (`D:\...` paths), install dependencies in Windows terminal.
If you run from WSL/Linux, install dependencies in WSL. Do not mix environments for `node_modules`.

## Demo Flow
1. Submit inquiry in contact form on `/`.
2. Open `/admin.html`.
3. Click `Load Leads` to view saved inquiries.
4. If `ADMIN_TOKEN` is set, paste token before loading.

## Deploy Guidance
- Simple deployments: Render / Railway / Fly.io
- Ensure persistent disk is enabled if using SQLite in production
- Set environment variables:
  - `PORT`
  - `ADMIN_TOKEN`

## Why This Project Helps my Profile
- Demonstrates complete flow: UI -> API -> DB -> Admin view
- Shows practical client requirement handling (validation + lead tracking)
- Easy for recruiters/clients to run locally and evaluate quickly

## Screenshots To Add Before Publishing
- Homepage hero + services section
- Contact form success message
- Admin leads table with sample records
=======
# clientflow-portfolio-crm
>>>>>>> 64f741cbd04147f0789010b12b3b526dbcd58c33
