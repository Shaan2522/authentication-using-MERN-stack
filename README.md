# MERN Authentication

This project contains a Node.js/Express/MongoDB backend and a React (Vite) frontend for authentication with email/password and OAuth (Google, GitHub). Both apps run separately.

## Backend
- Express.js server
- MongoDB for user storage
- Email/password signup & login
- Google & GitHub OAuth (Passport.js)
- Session-based auth (express-session, connect-mongo)
- Password hashing (bcrypt)
- svg-captcha for CAPTCHA
- Real-time backend form validation
- Protected routes
- Error/success messages
- CORS/proxy ready for React frontend

## Frontend
- Vite + React
- Email/password login/signup
- Google & GitHub OAuth buttons
- Password strength meter
- Show/hide password toggle
- Popup messages for errors/success
- Session-based auth (check session via backend)
- svg-captcha on login/signup
- Real-time validation with visual cues
- Protected routes (dashboard/home)
- Modern CSS styling

## Running the Apps

### Backend
1. `cd backend`
2. Install dependencies: `npm install`
3. Start server: `npm start`

### Frontend
1. `cd react-frontend`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

The frontend is configured to proxy API requests to the backend.

---

See each folder's README for more details.
