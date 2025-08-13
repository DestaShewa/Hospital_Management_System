A comprehensive, production-ready web application to streamline day‑to‑day hospital operations. It provides a seamless digital experience for Patients, Doctors, and Admins—from appointment booking to data visualization.



Note: Add a screenshot named hms-screenshot.png to your project root for the image above to render on GitHub.

✨ Features at a Glance

Role‑Based Access (RBAC): JWT‑secured auth for Patient, Doctor, Admin.

Polished UI/UX: Modern Tailwind UI, toast notifications, skeleton loaders, empty‑states, and error boundaries.

Responsive: Mobile‑first layouts that scale up to desktop gracefully.

Secure Uploads: Lab report upload (PDF/Image) with Multer → Cloudinary pipeline.

Data‑Driven Admin: Recharts‑powered stats + pie chart for role distribution.

👤 Patient

Browse doctor profiles and specialties

Book and manage appointments (date/time, reason)

See personal appointment history

👨‍⚕️ Doctor

View daily/weekly appointment schedule

Upload & manage patient lab reports (PDF/Image → Cloudinary)

View a list of assigned patients

🛠️ Admin

Dashboard KPIs (total patients, doctors, appointments)

Role distribution chart (interactive pie)

Doctor management: add, edit, list

🧱 Tech Stack

Frontend: React (Vite), Tailwind CSS, React Router, Recharts, React Hot ToastBackend: Node.js, Express.jsDatabase: MongoDB + MongooseAuth: JSON Web Tokens (JWT) + bcryptjsFile Storage: Cloudinary (via Multer)

📂 Monorepo Structure

root/
├─ client/               # React (Vite) frontend
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ hooks/
│  │  ├─ lib/
│  │  └─ services/      # API clients
│  └─ index.html
│
├─ server/               # Node/Express backend
│  ├─ src/
│  │  ├─ models/        # Mongoose schemas
│  │  ├─ routes/        # Express routers
│  │  ├─ controllers/
│  │  ├─ middleware/
│  │  ├─ utils/
│  │  └─ app.js
│  ├─ server.js
│  └─ .env               # see sample below
│
├─ hms-screenshot.png    # GitHub README image (add this)
└─ README.md

⚙️ Getting Started (Local)

1) Prerequisites

Node.js v16+

MongoDB (local) or a MongoDB Atlas connection string

Cloudinary account (for report uploads)

2) Clone & Install

# clone
git clone https://github.com/your-github-username/hospital-management-system.git
cd hospital-management-system

# backend
cd server
npm install
# create server/.env (see example below)
npm start   # or: npm run dev (if using nodemon)

# in a new terminal -> frontend
cd ../client
npm install
# create client/.env with: VITE_API_URL=http://localhost:5000
npm run dev

Frontend runs on http://localhost:5173 (Vite default). Backend runs on http://localhost:5000 unless changed.

🔐 Environment Variables

Create server/.env:

# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string

# JWT Secret Key
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary Credentials for file uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Optional
PORT=5000
CLIENT_ORIGIN=http://localhost:5173

Create client/.env:

VITE_API_URL=http://localhost:5000

🔀 Authentication & Roles

JWT issued on login/registration; stored in HTTP‑only cookie or memory (depending on your implementation).

Middleware protects routes and authorizes via req.user.role ∈ { PATIENT, DOCTOR, ADMIN }.

🧭 API Overview (sample)

Base URL defaults to http://localhost:5000/api.

Auth

POST /auth/register – create user (role required)

POST /auth/login – returns JWT

POST /auth/logout

Doctors

GET /doctors – list doctors

POST /doctors – Admin only add doctor

GET /doctors/:id – doctor profile

Appointments

POST /appointments – Patient books appointment

GET /appointments/me – my appointments (by role)

PATCH /appointments/:id/cancel

Reports

POST /reports/:patientId – Doctor uploads report (Multer→Cloudinary)

GET /reports/:patientId – list patient reports

Exact routes may differ; update to match your codebase.

🧪 Suggested NPM Scripts

server/package.json

{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "lint": "eslint ."
  }
}

client/package.json

{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}

🧰 Tooling & Quality

ESLint + Prettier: consistent code style

Error Handling: centralized error middleware

Security: helmet, strict CORS, rate‑limiting, strong password hashing (bcryptjs)

🚀 Deployment

Option A: Railway (Backend)

Push repo to GitHub

Create a new Railway project → Deploy from GitHub

Add Environment Variables from server/.env

Set Start Command: node server.js

Note the Public URL (e.g., https://api.example.railway.app)

Option B: Vercel (Frontend)

Import client/ in Vercel

Set VITE_API_URL to your Railway backend URL

Build Command: npm run build  •  Output Dir: dist

Tip: Enable CORS on the backend to allow the Vercel domain.

💾 Database Models (high‑level)

User: name, email, passwordHash, role, avatarUrl

Doctor: userId, specialty, yearsOfExperience, bio

Appointment: patientId, doctorId, datetime, reason, status

Report: patientId, doctorId, fileUrl, fileType, notes, createdAt

Add indexes for frequent queries (e.g., doctorId + datetime).

🙌 Contributing

Fork the repo & create a feature branch

Commit with clear messages

Open a PR with screenshots and a short description

🐛 Troubleshooting

CORS errors: confirm CLIENT_ORIGIN matches your frontend URL

Uploads fail: verify Cloudinary keys and Multer field names

JWT invalid: re‑check JWT_SECRET and cookie settings

Mongo connect error: ensure IP allowlist or correct Atlas URI

📜 License

Released under the MIT License. See LICENSE for details.

📎 Credits

Built with ❤️ using React, Express, MongoDB, Tailwind, and Cloudinary.

