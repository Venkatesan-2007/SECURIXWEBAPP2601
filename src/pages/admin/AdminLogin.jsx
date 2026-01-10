import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAdminLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminLogged) {
      navigate('/admin-dashboard');
    }
  }, [isAdminLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        setEmail('');
        setPassword('');
        navigate('/admin-dashboard');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-background"></div>
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <span className="admin-login-logo">🛡️</span>
            <h1>Administrator Access</h1>
            <p>Enter your credentials to manage the Securix platform.</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Admin Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <div className="error-message">
                <span>⚠️</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="btn-primary"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Authenticating...
                </>
              ) : (
                'Unlock Dashboard'
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <p>
              For authorized personnel only. All access is logged and monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}