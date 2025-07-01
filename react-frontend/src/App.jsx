import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    fetch('/api/home', { credentials: 'include' })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setAuthChecked(true));
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={!authChecked ? null : user ? <Navigate to="/home" /> : <Login onLogin={setUser} />}
      />
      <Route
        path="/signup"
        element={!authChecked ? null : user ? <Navigate to="/home" /> : <Signup onSignup={setUser} />}
      />
      <Route
        path="/home"
        element={!authChecked ? null : user ? <Home user={user} /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
