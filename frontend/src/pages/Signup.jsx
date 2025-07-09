const GoogleIcon = () => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
    alt="Google"
    width="20"
    height="20"
    style={{ marginRight: '10px' }}
  />
);

const GitHubIcon = () => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
    alt="GitHub"
    width="20"
    height="20"
    style={{ marginRight: '10px' }}
  />
);
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import './AuthForm.custom.css';



const Signup = ({ onSignup }) => {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', captcha: '' });
  const navigate = useNavigate();
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
    setError('');
    setSuccess('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const { confirmPassword, ...submitForm } = form;
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(submitForm),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setSuccess(data.message || 'Signup successful! Please log in.');
      setForm({ email: '', password: '', confirmPassword: '', captcha: '' });
      setTimeout(() => {
        navigate('/login');
      }, 1200);
      fetch('/api/captcha').then(res => res.text()).then(setCaptchaSvg);
    } else {
      setError(data.error || 'Signup failed');
      fetch('/api/captcha').then(res => res.text()).then(setCaptchaSvg);
    }
  };



  return (
    <div className="auth-form-container">
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Create a Password" value={form.password} onChange={handleChange} required />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Re-enter your Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

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
        <div className="signup-or-oauth">
          <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
          {/* <div className="or-divider"><span>OR</span></div> */}
          <div className="oauth-buttons">
            <button
              type="button"
              className="oauth-btn google"
              onClick={() => window.location.href = '/api/auth/google'}
            >
              <GoogleIcon />
              <span>Sign up with Google</span>
            </button>
            <button
              type="button"
              className="oauth-btn github"
              onClick={() => window.location.href = '/api/auth/github'}
            >
              <GitHubIcon />
              <span>Sign up with GitHub</span>
            </button>
          </div>
        </div>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;
