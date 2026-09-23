# Windows / VS Code Setup

Open the `Mrs-Miracle` folder in VS Code.

## 1. Install dependencies
Open a new PowerShell terminal:

```powershell
npm install
npm run install:all
```

If the root `concurrently` install is skipped, run the two apps separately:

```powershell
cd backend
npm install
npm run dev
```

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

## 2. PostgreSQL
Create a database named `mrs_miracle`, then run:

```powershell
psql -U postgres -d mrs_miracle -f backend/db/schema.sql
node backend/db/seed.js
```

If `psql` is not in PATH, use pgAdmin Query Tool and execute `schema.sql`, then run the seed command from the backend environment after dependencies are installed.

## 3. Environment
Copy `backend/.env.example` to `backend/.env` and change `DATABASE_URL` and `JWT_SECRET`.
Copy `frontend/.env.example` to `frontend/.env` if you change the API URL.

## 4. Admin
URL: `http://localhost:5173/admin/login`
Seed login:
- Email: `admin@mrsmiracle.com`
- Password: `Admin@12345`

Change this password before production launch.
