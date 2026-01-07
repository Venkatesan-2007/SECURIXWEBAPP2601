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
    return <div className="page-section"><div className="page-section-content" style={{ textAlign: 'center' }}>Loading...</div></div>;
  }

  return (
    <div className="page-section">
      <div className="page-section-content">
        <h2>About <GradientText>SECURIX SERVICE</GradientText></h2>
        
        <p className="section-description">
          {aboutData.mainContent || 'SECURIX SERVICE is a premier cybersecurity and digital innovation company dedicated to protecting your digital assets and ensuring secure online environments. With a team of certified security professionals and a proven track record, we deliver enterprise-grade security solutions tailored to your business needs.'}
        </p>

        {/* Mission & Vision Section */}
        <div className="mission-vision-grid">
          <div className="mission-card">
            <h3>Our Mission</h3>
            <p>{aboutData.mission || 'To empower organizations with advanced cybersecurity solutions that enable them to Scan vulnerabilities, Connect with secure technologies, and Grow with confidence in the digital landscape.'}</p>
          </div>
          <div className="vision-card">
            <h3>Our Vision</h3>
            <p>{aboutData.vision || 'To be the trusted partner for organizations worldwide, setting industry standards for cybersecurity excellence, innovation, and client success through cutting-edge solutions and expert guidance.'}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">
              <CounterNumber target={500} suffix="+" delay={0} />
            </div>
            <p className="stat-label">Security Projects Completed</p>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              <CounterNumber target={250} suffix="+" delay={1} />
            </div>
            <p className="stat-label">Enterprise Clients</p>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              <CounterNumber target={15} suffix="+" delay={2} />
            </div>
            <p className="stat-label">Years of Experience</p>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              <CounterNumber target={99.9} suffix="%" delay={3} />
            </div>
            <p className="stat-label">Client Satisfaction Rate</p>
          </div>
        </div>

        {/* Core Values */}
        <h3 style={{ marginTop: '80px', marginBottom: '40px' }}>Core Values</h3>
        <div className="services-cards-grid">
          {coreValues.map((value, index) => (
            <div key={index} className="card">
              <div>
                <h4 className="card-title">{value.icon} {value.title}</h4>
                <p className="card-description">{value.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Areas of Expertise */}
        <h3 style={{ marginTop: '80px', marginBottom: '40px' }}>Areas of Expertise</h3>
        <div className="services-cards-grid">
          {expertise.map((exp, index) => (
            <div key={index} className="card">
              <div>
                <h4 className="card-title">{exp.icon} {exp.title}</h4>
                <p className="card-description">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="why-choose-us" style={{ marginTop: '80px', padding: '60px 40px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '40px' }}>Why Choose Securix Service?</h3>
          <div className="grid-2" style={{ gap: '40px' }}>
            <div>
              <h4 style={{ color: '#0f172a', marginBottom: '15px' }}>✓ Expert Team</h4>
              <p>Certified security professionals with decades of combined experience in enterprise security solutions.</p>
            </div>
            <div>
              <h4 style={{ color: '#0f172a', marginBottom: '15px' }}>✓ Proven Track Record</h4>
              <p>Trusted by Fortune 500 companies and government agencies for critical security implementations.</p>
            </div>
            <div>
              <h4 style={{ color: '#0f172a', marginBottom: '15px' }}>✓ 24/7 Support</h4>
              <p>Round-the-clock monitoring and incident response to protect your business at all times.</p>
            </div>
            <div>
              <h4 style={{ color: '#0f172a', marginBottom: '15px' }}>✓ Custom Solutions</h4>
              <p>Tailored security strategies designed specifically for your industry and business requirements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
