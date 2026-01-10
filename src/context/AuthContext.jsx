import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

const ADMIN_EMAIL = 'admin@securix.com'; // Example admin email
const ADMIN_PASSWORD = 'secur@x';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export function AuthProvider({ children }) {
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Load initial state from localStorage
  useEffect(() => {
    const checkAuth = () => {
      const savedAuth = localStorage.getItem('adminAuth');
      const savedTime = localStorage.getItem('adminAuthTime');
      
      console.log('Checking auth - savedAuth:', savedAuth, 'savedTime:', savedTime);
      
      if (savedAuth === 'true' && savedTime) {
        const timeDiff = Date.now() - parseInt(savedTime);
        if (timeDiff < SESSION_TIMEOUT) {
          console.log('Auth valid, setting isAdminLogged to true');
          setIsAdminLogged(true);
          setLastActivity(Date.now());
          return;
        } else {
          // Session expired
          console.log('Session expired');
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminAuthTime');
        }
      }
      console.log('Auth check complete, setting isAdminLogged to false');
      setIsAdminLogged(false);
    };

    checkAuth();

    // Listen for storage changes from other tabs/windows (like admin app redirect)
    const handleStorageChange = () => {
      console.log('Storage changed, rechecking auth');
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case of same-tab redirect
    const interval = setInterval(() => {
      const savedAuth = localStorage.getItem('adminAuth');
      if (savedAuth === 'true') {
        checkAuth();
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Monitor activity and auto-logout on timeout
  useEffect(() => {
    if (!isAdminLogged) return;

    const handleActivity = () => {
      setLastActivity(Date.now());
      localStorage.setItem('adminAuthTime', Date.now().toString());
    };

    const checkTimeout = setInterval(() => {
      if (Date.now() - lastActivity > SESSION_TIMEOUT) {
        logout();
      }
    }, 60000); // Check every minute

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      clearInterval(checkTimeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [isAdminLogged, lastActivity]);

  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdminLogged(true);
      setLastActivity(Date.now());
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminAuthTime', Date.now().toString());
      return { success: true, message: 'Login successful!' };
    }
    return { success: false, message: 'Invalid email or password. Access denied!' };
  };

  const logout = () => {
    setIsAdminLogged(false);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminAuthTime');
  };

  const value = {
    isAdminLogged,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
