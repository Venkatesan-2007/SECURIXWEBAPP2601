import React, { useState, useEffect } from "react";
import { GradientText } from "../components/TextReveal";
import { useTiltEffect } from "../hooks/useMagneticHover";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const defaultServices = [
  {
    icon: '🌐',
    name: 'Web & Mobile Application Development',
    description: 'Build secure, scalable applications with security embedded from the ground up.',
    highlights: ['Secure Architecture Design', 'Code Security Reviews', 'Penetration Testing', 'DevSecOps Integration']
  },
  {
    icon: '🔬',
    name: 'IoT Forensics & Security',
    description: 'Advanced forensics and security solutions for IoT devices and embedded systems.',
    highlights: ['Device Analysis', 'Vulnerability Assessment', 'Real-time Monitoring', 'Forensic Investigation']
  },
  {
    icon: '☁️',
    name: 'Cloud & Application Security',
    description: 'Comprehensive security testing and compliance for cloud infrastructures.',
    highlights: ['Cloud Audits', 'API Security', 'Container Security', 'Compliance Management']
  },
  {
    icon: '🎓',
    name: 'Cybersecurity Training & Consulting',
    description: 'Expert consulting and customized training programs for your organization.',
    highlights: ['Security Awareness', 'Threat Modeling', 'Policy Development', 'Expert Guidance']
  },
  {
    icon: '🚨',
    name: 'Incident Response & Forensics',
    description: '24/7 incident response and digital forensics for security breaches.',
    highlights: ['Emergency Response', 'Investigation', 'Evidence Collection', 'Recovery Support']
  },
  {
    icon: '📋',
    name: 'Compliance & Audits',
    description: 'ISO 27001, SOC 2, GDPR, and other compliance certifications.',
    highlights: ['Compliance Assessment', 'Gap Analysis', 'Remediation Planning', 'Certification Support']
  }
];

/**
 * Service Card component with tilt effect
 */
function ServiceCard({ service, index }) {
  const ref = useTiltEffect(8);

  return (
    <div key={index} ref={ref} className="service-card" style={{ cursor: 'pointer', padding: '30px', minHeight: '280px' }}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>{service.icon || '🔒'}</div>
      <h3 className="service-name" style={{ marginBottom: '15px' }}>{service.name}</h3>
      <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '15px' }}>{service.description}</p>
      <ul style={{ fontSize: '14px', color: '#555', lineHeight: '1.8' }}>
        {(service.highlights || []).map((highlight, i) => (
          <li key={i}>✓ {highlight}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Services() {
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/services`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setServices(data);
          }
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        // Use default services on error
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  if (loading) {
    return <div className="page-section"><div className="page-section-content" style={{ textAlign: 'center' }}>Loading services...</div></div>;
  }

  return (
    <div className="page-section">
      <div className="page-section-content">
        <h2>Our <GradientText>Services</GradientText></h2>
        
        <p className="section-description">
          Enterprise-grade cybersecurity solutions tailored to your business needs and industry requirements
        </p>

        {/* Service Overview */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '40px', borderRadius: '12px', marginBottom: '60px' }}>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
            Our comprehensive security services help organizations identify vulnerabilities, implement protective measures, and maintain a robust security posture. From development to deployment and beyond, we provide end-to-end security solutions with expert support at every stage.
          </p>
        </div>
        
        <div className="services-cards-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Service Delivery Model */}
        <div style={{ marginTop: '80px' }}>
          <h3 style={{ marginBottom: '40px' }}>Our Service Delivery Model</h3>
          <div className="grid-3" style={{ gap: '40px' }}>
            <div style={{ padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '15px' }}>1. Assessment</h4>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Comprehensive evaluation of your current security posture, identifying risks and vulnerabilities.</p>
            </div>
            <div style={{ padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '15px' }}>2. Implementation</h4>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Strategic deployment of security solutions with minimal disruption to your operations.</p>
            </div>
            <div style={{ padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '15px' }}>3. Monitoring & Support</h4>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Ongoing monitoring, maintenance, and 24/7 support to ensure continuous protection.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
