# MERN Authentication

This project contains a Node.js/Express/MongoDB backend and a React (Vite) frontend for authentication with email/password and OAuth (Google, GitHub). Both apps run separately.

## 📁 Folder Structure
```
├── client/ # React frontend
│ ├── public/ # React public assets
│ └── src/ # React source code
│ ├── components/ # Reusable components (forms, navbar, etc.)
│ ├── pages/ # Login, Signup, Home pages
│ ├── App.js # Main app component
│ ├── index.js # React DOM renderer
│ └── styles/ # CSS modules or global styles
├── models/ # Mongoose schemas and auth logic
│ ├── auth.js # Signup/login logic with bcrypt
│ └── user.js # User schema (email, password, OAuth fields)
├── routes/ # Express route handlers
│ └── authRoutes.js # Handles login, signup, logout, home, captcha, etc.
├── src/ # Express app entry point and server logic
│ ├── index.js # Main Express server setup
│ └── passportConfig.js # Passport.js strategy setup for Google & GitHub
├── .env # Environment variables (API keys, secrets, etc.)
├── package.json # Server dependencies and scripts
├── client/package.json # React app dependencies and scripts
└── package-lock.json # Server install lockfile
```

---

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

---

## 🛠️ Tech Stack

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="24"/> **Node.js** & <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" width="24"/> **Express.js**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="24"/> **MongoDB** & <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" alt="Mongoose" width="24"/> **Mongoose**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="24"/> **React** (frontend UI)
- <img src="https://vitejs.dev/logo.svg" alt="Vite" width="24"/> **Vite** (lightning-fast frontend tooling for React)
- <img src="https://github.com/patil-prajwal/Tech-Stack-Icons/blob/main/Icons/passport.svg" alt="Passport.js" width="24"/> **Passport.js** (local, Google, GitHub strategies)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="npm" width="24"/> **bcrypt** (password hashing)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="npm" width="24"/> **express-session** (session management)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="npm" width="24"/> **svg-captcha** (CAPTCHA images)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="npm" width="24"/> **express-rate-limit** (rate limiting)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" width="24"/> **CSS Modules** or TailwindCSS (optional)

---

## 📸 Screenshots

Login Page: 

![Login Page Screenshot](https://github.com/user-attachments/assets/17a83faf-cacc-4c25-a88c-63d3684bfc86)

Signup Page:

![Signup Page Screenshot](https://github.com/user-attachments/assets/6638ffe3-b708-41c7-a6e2-3474b5db4f86)

---

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

## 📝 License

MIT License. See [LICENSE](LICENSE) for details.
