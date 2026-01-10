import React, { useState, useEffect } from "react";
import { GradientText, CounterNumber } from "../components/TextReveal";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function About() {
  const [aboutData, setAboutData] = useState({
    mainContent: 'SECURIX SERVICE is a premier cybersecurity and digital innovation company dedicated to protecting your digital assets and ensuring secure online environments. With a team of certified security professionals and a proven track record, we deliver enterprise-grade security solutions tailored to your business needs.',
    mission: 'To empower organizations with advanced cybersecurity solutions that enable them to Scan vulnerabilities, Connect with secure technologies, and Grow with confidence in the digital landscape.',
    vision: 'To be the trusted partner for organizations worldwide, setting industry standards for cybersecurity excellence, innovation, and client success through cutting-edge solutions and expert guidance.'
  });
  const [loading, setLoading] = useState(true);

  const coreValues = [
    { icon: '🛡️', title: 'Security First', desc: 'Every solution prioritizes protection and integrity of digital assets.' },
    { icon: '💡', title: 'Innovation', desc: 'Cutting-edge technologies and methodologies for evolving threats.' },
    { icon: '🤝', title: 'Partnership', desc: 'Collaborative approach to understand and solve your unique challenges.' },
    { icon: '📈', title: 'Growth', desc: 'Enabling your business to scale securely with confidence.' }
  ];

  const expertise = [
    { icon: '🔍', title: 'Web & Mobile App Development', desc: 'Secure, scalable applications built with security-first architecture. Enterprise-grade development with penetration testing and code reviews.' },
    { icon: '🔬', title: 'IoT Forensics & Security', desc: 'Advanced forensics for IoT devices and embedded systems security. Real-time monitoring and vulnerability assessment.' },
    { icon: '☁️', title: 'Cloud & Application Security', desc: 'Comprehensive security testing for cloud infrastructures and applications. Multi-cloud compliance and security audits.' },
    { icon: '🎓', title: 'Cybersecurity Training & Consulting', desc: 'Expert training and consulting to build security awareness in your organization. Customized programs for enterprise environments.' },
    { icon: '📊', title: 'Security Audits & Compliance', desc: 'ISO 27001, SOC 2, GDPR compliance assessments and implementation.' },
    { icon: '🚨', title: 'Incident Response', desc: '24/7 incident response and forensic investigation services.' }
  ];

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/about`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setAboutData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAbout();
  }, []);

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '120px 0' }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '60vh', background: 'var(--light-gray)'}}>
        <div className="page-container">
          <div className="hero-content" style={{ maxWidth: '900px' }}>
            <h1 className="hero-title">
              About <span style={{ color: 'var(--primary)'}}>SECURIX</span>
            </h1>
            <p className="hero-description">
              {aboutData.mainContent}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="services-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-subtitle">Our Purpose</div>
            <h2>Mission & Vision</h2>
          </div>
          <div className="mission-vision-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="service-card">
              <h3>Our Mission</h3>
              <p>{aboutData.mission}</p>
            </div>
            <div className="service-card">
              <h3>Our Vision</h3>
              <p>{aboutData.vision}</p>
            </div>
          </div>
        </div>
      </section>



      {/* Core Values Section */}
      <section className="services-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-subtitle">Our Principles</div>
            <h2>Core Values</h2>
          </div>
          <div className="services-grid">
            {coreValues.map((value, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="projects-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-subtitle">Our Skills</div>
            <h2>Areas of Expertise</h2>
          </div>
          <div className="services-grid">
            {expertise.map((exp, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{exp.icon}</div>
                <h3>{exp.title}</h3>
                <p>{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="cta-section">
        <div className="page-container">
          <div className="cta-content">
            <h2>Why Choose Securix?</h2>
            <div className="projects-grid" style={{ marginTop: '48px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <div className="project-card">
                <h4>✓ Expert Team</h4>
                <p>Certified security professionals with decades of combined experience.</p>
              </div>
              <div className="project-card">
                <h4>✓ Proven Track Record</h4>
                <p>Trusted by Fortune 500 companies and government agencies.</p>
              </div>
              <div className="project-card">
                <h4>✓ 24/7 Support</h4>
                <p>Round-the-clock monitoring and incident response.</p>
              </div>
              <div className="project-card">
                <h4>✓ Custom Solutions</h4>
                <p>Tailored security strategies designed for your industry.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
