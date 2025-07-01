import React, { useState, useEffect } from 'react';
import './AuthForm.css';

const getStrength = password => {
  let score = 0;
  if (password.length > 7) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const Signup = ({ onSignup }) => {
  const [form, setForm] = useState({ email: '', password: '', captcha: '' });
  const [captchaSvg, setCaptchaSvg] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fetchCaptcha = () => {
    fetch('/api/captcha')
      .then(res => res.text())
      .then(setCaptchaSvg);
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setSuccess(data.message || 'Signup successful! Please log in.');
      setForm({ email: '', password: '', captcha: '' });
      fetch('/api/captcha').then(res => res.text()).then(setCaptchaSvg);
    } else {
      setError(data.error || 'Signup failed');
      fetch('/api/captcha').then(res => res.text()).then(setCaptchaSvg);
    }
  };

  const strength = getStrength(form.password);
  const strengthColors = ['#d9534f', '#f0ad4e', '#5bc0de', '#28a745'];

  return (
    <div className="auth-form-container">
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <div className="password-strength-container">
          <div
            className="password-strength-bar"
            style={{
              width: `${(strength / 4) * 100}%`,
              backgroundColor: strength > 0 ? strengthColors[strength - 1] : 'transparent',
            }}
          />
        </div>
        <div className="captcha-container">
          <div className="captcha-img" dangerouslySetInnerHTML={{ __html: captchaSvg }} />
          <button type="button" className="captcha-reload-btn" onClick={fetchCaptcha}>
            &#x21bb;
          </button>
        </div>
        <input
          name="captcha"
          type="text"
          placeholder="CAPTCHA"
          value={form.captcha}
          onChange={handleChange}
          required
          className="captcha-input"
        />
        <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;
