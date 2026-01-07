import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(password);
      if (result.success) {
        setPassword('');
        navigate('/admin-dashboard');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-wrapper">
        <div className="login-background">
          <div className="login-particle p1"></div>
          <div className="login-particle p2"></div>
          <div className="login-particle p3"></div>
        </div>

        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <span className="lock-icon">🔐</span>
            </div>
            <h1>SECURIX Admin</h1>
            <p className="login-subtitle">Secure Access Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="password">Admin Password</label>
              <div className="password-input-wrapper">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="password-input"
                  autoComplete="off"
                  required
                />
                <div className="input-border"></div>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="login-button"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Authenticating...
                </>
              ) : (
                <>
                  <span>🔓</span> Unlock Admin Panel
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="security-note">
              🛡️ This is a secured access point. Only authorized administrators can proceed.
            </p>
          </div>
        </div>

        <div className="security-features">
          <div className="feature">
            <span className="feature-icon">🔒</span>
            <p>Password Protected</p>
          </div>
          <div className="feature">
            <span className="feature-icon">⏱️</span>
            <p>Auto Logout</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <p>Full Control</p>
          </div>
        </div>
      </div>
    </div>
  );
}
