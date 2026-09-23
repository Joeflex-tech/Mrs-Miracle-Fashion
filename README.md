# Mrs Miracle — Production E-commerce Build

A mobile-first Nigerian fashion e-commerce platform for Mrs Miracle. Bags and footwear are the primary categories; nightwear and underwear are secondary.

## Stack
- React + Vite
- React Router
- Node.js + Express
- PostgreSQL
- JWT admin authentication
- Local image upload abstraction (ready to swap to Cloudinary/S3)
- Paystack-ready online payment flow
- WhatsApp checkout and product inquiry

## Run
1. Open this folder in VS Code.
2. In the root terminal run `npm install`.
3. Run `npm run install:all`.
4. Create `backend/.env` from `backend/.env.example`.
5. Create PostgreSQL database `mrs_miracle`.
6. Run `psql -d mrs_miracle -f backend/db/schema.sql` and then `psql -d mrs_miracle -f backend/db/seed.sql`.
7. Run `npm run dev`.

Frontend: http://localhost:5173
Backend: http://localhost:5000
Admin: http://localhost:5173/admin/login

## Production notes
- Replace the local upload adapter with Cloudinary/S3 before launch.
- Add real Paystack keys and verify webhooks server-side.
- Change the seeded admin password immediately.
- Add real product photography supplied/approved by the client.
- Configure production CORS, HTTPS, backups and transactional email/SMS.
