import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    navigate('/login');
    window.location.reload(); // Force reload to clear state
  };

  return (
    <div className="auth-form-container">
      <h1>Welcome, {user?.email || 'User'}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
