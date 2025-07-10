import React, { useState, useEffect } from 'react';
import './AuthForm.css';

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

const fakeCaptchaSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40">
    <rect width="120" height="40" fill="#eee" />
    <text x="10" y="25" font-size="16" fill="#888">1234</text>
  </svg>
`;

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '', captcha: '' });
  const [captchaSvg, setCaptchaSvg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isProd = import.meta.env.PROD;

  const fetchCaptcha = () => {
    if (isProd) {
      setCaptchaSvg(fakeCaptchaSvg);
    } else {
      fetch('/api/captcha')
        .then(res => res.text())
        .then(setCaptchaSvg);
    }
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

    if (isProd) {
      // Fake login for GitHub Pages (optional fallback)
      setTimeout(() => {
        setLoading(false);
        if (form.captcha === '1234') {
          onLogin({ email: form.email });
        } else {
          setError('Invalid CAPTCHA');
          fetchCaptcha();
        }
      }, 1000);
      return;
    }

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      onLogin(data.user);
    } else {
      setError(data.error || 'Login failed');
      fetchCaptcha();
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="password-input"
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
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      <button className="oauth-btn google" onClick={() => window.location.href = '/api/auth/google'}>
        <GoogleIcon />
        <span>Login with Google</span>
      </button>
      <button className="oauth-btn github" onClick={() => window.location.href = '/api/auth/github'}>
        <GitHubIcon />
        <span>Login with GitHub</span>
      </button>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
};

export default Login;
