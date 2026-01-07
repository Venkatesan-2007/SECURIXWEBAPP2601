import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  if (location.pathname === '/admin-dashboard') {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <img 
              src="/src/assets/Logo.png" 
              alt="Securix Logo" 
              onError={(e) => {
                e.target.style.display = 'none';
                const textSpan = document.createElement('span');
                textSpan.className = 'logo-text';
                textSpan.textContent = 'SECURIX';
                e.target.parentNode.insertBefore(textSpan, e.target);
              }}
            />
            <span className="logo-sub">SERVICE</span>
          </div>
          <div className="footer-tagline">Scan • Connect • Grow</div>
        </div>
        
        <div className="footer-content">
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Security Assessment</li>
              <li>Cloud Security</li>
              <li>IoT Forensics</li>
              <li>Incident Response</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Our Team</li>
              <li>Projects</li>
              <li>Careers</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>contact@securix.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Security Hotline</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            © 2026 Securix Service — All Rights Reserved.
          </div>
          <div className="footer-motto">
            Cybersecurity is a Shared Responsibility
          </div>
        </div>
      </div>
    </footer>
  );
}