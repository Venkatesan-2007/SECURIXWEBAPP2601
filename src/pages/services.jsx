import React, { useState, useEffect, useRef } from "react";
import { GradientText } from "../components/TextReveal";
import { useTiltEffect } from "../hooks/useMagneticHover";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const defaultServices = [
  {
    icon: '🌐',
    name: 'Web & Mobile Application Development',
    description: 'Build secure, scalable applications with security embedded from the ground up.',
    highlights: ['Secure Architecture Design', 'Code Security Reviews', 'Penetration Testing', 'DevSecOps Integration'],
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    icon: '🔬',
    name: 'IoT Forensics & Security',
    description: 'Advanced forensics and security solutions for IoT devices and embedded systems.',
    highlights: ['Device Analysis', 'Vulnerability Assessment', 'Real-time Monitoring', 'Forensic Investigation'],
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    icon: '☁️',
    name: 'Cloud & Application Security',
    description: 'Comprehensive security testing and compliance for cloud infrastructures.',
    highlights: ['Cloud Audits', 'API Security', 'Container Security', 'Compliance Management'],
    imageUrl: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    icon: '🎓',
    name: 'Cybersecurity Training & Consulting',
    description: 'Expert consulting and customized training programs for your organization.',
    highlights: ['Security Awareness', 'Threat Modeling', 'Policy Development', 'Expert Guidance'],
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    icon: '🚨',
    name: 'Incident Response & Forensics',
    description: '24/7 incident response and digital forensics for security breaches.',
    highlights: ['Emergency Response', 'Investigation', 'Evidence Collection', 'Recovery Support'],
    imageUrl: 'https://images.unsplash.com/photo-1585029193856-23846ac1645a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    icon: '📋',
    name: 'Compliance & Audits',
    description: 'ISO 27001, SOC 2, GDPR, and other compliance certifications.',
    highlights: ['Compliance Assessment', 'Gap Analysis', 'Remediation Planning', 'Certification Support'],
    imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

function ServiceCard({ service }) {
  const ref = useTiltEffect(8);

  return (
    <div ref={ref} className="service-card" style={{ cursor: 'pointer' }}>
      <img src={service.imageUrl} alt={service.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--border-radius-md)' }} />
      <div style={{ padding: '1.5rem' }}>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <ul style={{ fontSize: '14px', color: '#555', lineHeight: '1.8', listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          {(service.highlights || []).map((highlight, i) => (
            <li key={i} style={{ marginBottom: '4px' }}>✓ {highlight}</li>
          ))}
        </ul>
      </div>
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
            setServices(data.map(s => ({...s, imageUrl: defaultServices.find(ds => ds.name === s.name)?.imageUrl || ''})));
          }
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '120px 0' }}>
        Loading services...
      </div>
    );
  }

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '60vh', background: 'var(--light-gray)' }}>
        <div className="page-container">
          <div className="hero-content" style={{ maxWidth: '900px' }}>
            <h1 className="hero-title">
              Our <span style={{ color: 'var(--primary)' }}>Services</span>
            </h1>
            <p className="hero-description">
              Enterprise-grade cybersecurity solutions tailored to your business needs and industry requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-subtitle">Our Offerings</div>
            <h2>Comprehensive Security Solutions</h2>
            <p className="section-description">
              From development to deployment and beyond, we provide end-to-end security solutions with expert support at every stage.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Delivery Model Section */}
      <section className="projects-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-subtitle">Our Process</div>
            <h2>Service Delivery Model</h2>
          </div>
          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)'}}>
            <div className="service-card">
              <div className="service-icon">1</div>
              <h3>Assessment</h3>
              <p>Comprehensive evaluation of your current security posture, identifying risks and vulnerabilities.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">2</div>
              <h3>Implementation</h3>
              <p>Strategic deployment of security solutions with minimal disruption to your operations.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">3</div>
              <h3>Monitoring & Support</h3>
              <p>Ongoing monitoring, maintenance, and 24/7 support to ensure continuous protection.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
