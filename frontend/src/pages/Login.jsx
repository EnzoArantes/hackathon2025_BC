import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../utils/api';
import { setAuthentication, isAuthenticated } from '../utils/auth';
import '../styles/style.css';
import '../styles/auth-style.css';

function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to home
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const showLogin = () => {
    setIsLoginForm(true);
    setLoginError('');
    setRegisterError('');
  };

  const showRegister = () => {
    setIsLoginForm(false);
    setLoginError('');
    setRegisterError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.username || !loginData.password) {
      setLoginError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      const { ok, data } = await login(loginData.username, loginData.password);

      if (ok) {
        console.log('Login successful:', data);
        setAuthentication(loginData.username);
        navigate('/');
      } else {
        setLoginError(data.error || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Connection error. Make sure the backend is running at http://127.0.0.1:8000');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!registerData.username || !registerData.password || !registerData.confirmPassword) {
      setRegisterError('Please fill in all fields');
      return;
    }

    if (registerData.username.length < 3) {
      setRegisterError('Username must be at least 3 characters');
      return;
    }

    if (registerData.password.length < 6) {
      setRegisterError('Password must be at least 6 characters');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setRegisterError('');

    try {
      const { ok, data } = await register(registerData.username, registerData.password);

      if (ok) {
        console.log('Registration successful:', data);
        setAuthentication(registerData.username);

        // Show success briefly then redirect
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setRegisterError(data.error || 'Registration failed. Username may already exist.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError('Connection error. Make sure the backend is running at http://127.0.0.1:8000');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Header */}
      <header className="auth-header">
        <h1>🎓 AI Literacy Academy</h1>
        <p className="tagline">Master AI in 15 Minutes</p>
      </header>

      {/* Auth Box */}
      <div className="auth-box">
        {/* Toggle Buttons */}
        <div className="auth-toggle">
          <button
            className={`tab-button ${isLoginForm ? 'active' : ''}`}
            onClick={showLogin}
          >
            Login
          </button>
          <button
            className={`tab-button ${!isLoginForm ? 'active' : ''}`}
            onClick={showRegister}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        <form
          className={`auth-form ${isLoginForm ? 'active' : ''}`}
          onSubmit={handleLoginSubmit}
        >
          <h2>Welcome Back! 👋</h2>
          <p className="form-subtitle">Continue your AI learning journey</p>

          <div className="form-group">
            <label htmlFor="loginUsername">Username</label>
            <input
              type="text"
              id="loginUsername"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              required
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input
              type="password"
              id="loginPassword"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {loginError && (
            <div className="error-message">{loginError}</div>
          )}

          <button
            type="submit"
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in' : 'Login →'}
          </button>

          <p className="form-footer">
            Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); showRegister(); }}>Sign up here</a>
          </p>
        </form>

        {/* Register Form */}
        <form
          className={`auth-form ${!isLoginForm ? 'active' : ''}`}
          onSubmit={handleRegisterSubmit}
        >
          <h2>Join the Academy! 🚀</h2>
          <p className="form-subtitle">Start learning AI literacy today</p>

          <div className="form-group">
            <label htmlFor="registerUsername">Username</label>
            <input
              type="text"
              id="registerUsername"
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              required
              placeholder="Choose a username"
              autoComplete="username"
              minLength="3"
            />
            <small>At least 3 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="registerPassword">Password</label>
            <input
              type="password"
              id="registerPassword"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              required
              placeholder="Create a password"
              autoComplete="new-password"
              minLength="6"
            />
            <small>At least 6 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              required
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
          </div>

          {registerError && (
            <div className="error-message">{registerError}</div>
          )}

          <button
            type="submit"
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account' : 'Create Account →'}
          </button>

          <p className="form-footer">
            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); showLogin(); }}>Login here</a>
          </p>
        </form>
      </div>

      {/* Features Preview */}
      <div className="features-preview">
        <h3>What You'll Learn</h3>
        <div className="feature-grid">
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <p>Write effective AI prompts</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📝</span>
            <p>Master context & specificity</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔍</span>
            <p>Think critically about AI</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚖️</span>
            <p>Use AI ethically</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="auth-footer">
        <p>Built at BC Horizons Hackathon 2025</p>
        <p>Empowering responsible AI use 🚀</p>
      </footer>
    </div>
  );
}

export default Login;
