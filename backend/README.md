# Backend - Fullstack Authentication

## Features
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

## Folder Structure
- models/: Mongoose models (user, auth)
- public/: Static files (style.css)
- routes/: Express routes (authRoutes.js)
- views/: EJS templates (for reference)
- src/: Main server code (index.js)

## Getting Started
1. Install dependencies:
   ```cmd
   npm install
   ```
2. Set up a `.env` file with your MongoDB URI and OAuth credentials.
3. Start the server:
   ```cmd
   npm start
   ```

The backend runs on port 5000 by default. Update as needed.

---

See the main README for fullstack instructions.
