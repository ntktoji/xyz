# Jai Air Cargo Private Limited: website, API and admin

- `web/`  Next.js 15 (App Router), Tailwind, Framer Motion, Lenis, React Three Fiber. Deploy to Vercel.
- `api/`  Express, Prisma, PostgreSQL, JWT. Deploy to Railway or Render.

## Run locally
1. Create a PostgreSQL database.
2. API:
   ```
   cd api && cp .env.example .env     # fill in DATABASE_URL, JWT_SECRET (32+ chars), ADMIN_PASSWORD (12+ chars)
   npm install
   npx prisma generate && npx prisma db push
   npm run seed                       # creates the admin user and demo shipment JAC102938475
   npm run dev                        # http://localhost:4000
   npm test
   ```
3. Web:
   ```
   cd web && cp .env.example .env.local
   npm install && npm run dev         # http://localhost:3000
   ```
Admin: `/admin/login` with ADMIN_EMAIL / ADMIN_PASSWORD. Delete the demo shipment before launch.

## Deploy
- **Database + API (Railway/Render):** root directory `api`, build `npm install && npx prisma generate && npx prisma db push`, start `npm start`. Set DATABASE_URL, JWT_SECRET, CORS_ORIGIN (your site URL), then run `npm run seed` once.
- **Web (Vercel):** root directory `web`. Set NEXT_PUBLIC_API_URL (API URL), NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_WHATSAPP.

## Before launch
Edit `web/lib/site.js` (phone, email, address, hours, map, social) and replace the bracketed text on Home and About (testimonials, founder message, timeline, statistics). Privacy and Terms are templates: have a lawyer review them.

## API
Public: `GET /api/track/:number`, `POST /api/inquiries`, `POST /api/applications` (careers). Admin (Bearer token): `POST /api/admin/login`, `GET /api/admin/stats`, shipments CRUD at `/api/admin/shipments`, `GET /api/admin/shipments.csv`, inquiries at `/api/admin/inquiries`, applications at `/api/admin/applications`, users at `/api/admin/users` (ADMIN only).

Roles: ADMIN can do everything including deleting shipments and managing users. STAFF can view and update shipments, inquiries and applications.
