# Car Booking & Dealership Platform

A full-stack car dealership application for browsing inventory, comparing vehicles, booking test drives, and submitting customer feedback. Built with a **NestJS** backend and a **React + Vite** frontend.

## Features

### Car Catalog
- Browse all available cars with images, make, model, year, and price
- View detailed car information on individual car pages
- Search and filter cars by make, year, and other criteria (API)
- Side-by-side car comparison to evaluate specs and pricing

### User Authentication
- User registration and login with JWT-based authentication
- Protected routes for authenticated features
- User profile management (API)

### Test Drive Booking
- Schedule test drives with customer name, email, phone, and preferred date
- View available time slots based on business hours (9:00 AM – 5:00 PM)
- Booking duration between 30 and 120 minutes
- Admin endpoints to manage and confirm bookings

### Feedback System
- Submit ratings and comments for cars and test drives
- View feedback by car or user
- Average rating calculation per vehicle

### Admin & API
- RESTful API for users, cars, bookings, and feedback
- Role-based access for admin-only endpoints
- Car image uploads served from `/uploads`
- Database seed scripts for sample car data and images

## Tech Stack

| Layer    | Technologies                                      |
|----------|---------------------------------------------------|
| Frontend | React 18, Vite, React Router, Tailwind CSS, Axios |
| Backend  | NestJS, Mongoose, Passport JWT, Multer          |
| Database | MongoDB (dual connections for users & cars)       |

## Project Structure

```
servicecomponent/
├── car booking test/
│   ├── backend/          # NestJS API server
│   │   ├── src/
│   │   │   ├── car/              # Car inventory module
│   │   │   ├── user/             # Auth & user management
│   │   │   ├── book-test-drive/  # Test drive bookings
│   │   │   ├── feedback/         # Customer feedback
│   │   │   └── seed/             # Database seed scripts
│   │   ├── uploads/              # Car image storage
│   │   └── API_DOCUMENTATION.md  # Full API reference
│   └── frontend/         # React SPA
│       └── src/
│           ├── pages/            # CarList, Booking, Compare, etc.
│           ├── components/       # Navbar, ProtectedRoute
│           └── contexts/         # AuthContext
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- npm (included with Node.js)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd servicecomponent
```

### 2. Backend setup

```bash
cd "car booking test/backend"
npm install
```

Create your environment file from the example:

```bash
cp .env.example .env
```

Edit `.env` and set your values:

| Variable    | Description                                      |
|-------------|--------------------------------------------------|
| `DB`        | MongoDB URI for users, bookings, and feedback    |
| `CARS_DB`   | MongoDB URI for the car inventory database       |
| `PORT`      | API server port (default: `3000`)              |
| `JWT_SECRET`| Secret key for signing JWT tokens                |

Seed the database with sample cars (optional):

```bash
npm run seed:cars
npm run seed:images
```

Start the backend:

```bash
# Development (with hot reload)
npm run start:dev

# Production
npm run build
npm run start:prod
```

The API runs at **http://localhost:3000**.

### 3. Frontend setup

Open a new terminal:

```bash
cd "car booking test/frontend"
npm install
npm run dev
```

The frontend runs at **http://localhost:5173**.

### 4. Verify everything works

1. Open http://localhost:5173 in your browser
2. Browse the car catalog on the home page
3. Register an account via **Sign Up**, then log in
4. Compare cars, book a test drive, or leave feedback

## API Documentation

Full endpoint reference is available in [`car booking test/backend/API_DOCUMENTATION.md`](car%20booking%20test/backend/API_DOCUMENTATION.md).

Base URL: `http://localhost:3000`

Protected routes require:

```
Authorization: Bearer <your_jwt_token>
```

## Available Scripts

### Backend (`car booking test/backend`)

| Command              | Description                    |
|----------------------|--------------------------------|
| `npm run start:dev`  | Start dev server with watch    |
| `npm run build`      | Compile TypeScript to `dist/`  |
| `npm run start:prod` | Run compiled production build  |
| `npm run seed:cars`  | Seed car inventory             |
| `npm run seed:images`| Seed car images                |
| `npm run test`       | Run unit tests                 |

### Frontend (`car booking test/frontend`)

| Command           | Description              |
|-------------------|--------------------------|
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

## Environment Notes

- The backend uses **two MongoDB connections**: one for users/bookings/feedback and one dedicated to the car catalog.
- CORS is configured for `http://localhost:5173` in `backend/src/main.ts`. Update this if your frontend runs on a different port or domain.
- Never commit `.env` files. Use `.env.example` as a template.

## License

UNLICENSED — private project.
