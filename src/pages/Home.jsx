import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CurrentTime from "../components/CurrentTime";

export default function Home() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleElements, setVisibleElements] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleElements((prev) => ({
            ...prev,
            [entry.target.dataset.animate]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    observerRef.current = observer;

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const observer = observerRef.current;
    if (!observer) return;

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const services = [
    {
      id: 1,
      icon: "🔍",
      title: "Security Assessment",
      description: "Comprehensive vulnerability analysis and security audits for enterprise systems.",
      tags: ["Audit", "Compliance", "Analysis"],
      color: "#00C896"
    },
    {
      id: 2,
      icon: "🛡️",
      title: "Web & Mobile Security",
      description: "Secure development lifecycle and penetration testing for modern applications.",
      tags: ["Penetration", "SDLC", "Testing"],
      color: "#00C896"
    },
    {
      id: 3,
      icon: "☁️",
      title: "Cloud Security",
      description: "AWS, Azure, and GCP security configuration with continuous monitoring.",
      tags: ["Cloud", "AWS", "Monitoring"],
      color: "#00C896"
    },
    {
      id: 4,
      icon: "📱",
      title: "IoT Forensics",
      description: "Advanced forensic analysis for IoT devices and industrial networks.",
      tags: ["Forensics", "IoT", "Analysis"],
      color: "#00C896"
    },
    {
      id: 5,
      icon: "🎓",
      title: "Expert Training",
      description: "Security awareness programs and technical training for teams.",
      tags: ["Training", "Workshops", "Awareness"],
      color: "#00C896"
    },
    {
      id: 6,
      icon: "🚨",
      title: "Incident Response",
      description: "24/7 emergency response and comprehensive breach management.",
      tags: ["Response", "24/7", "Management"],
      color: "#00C896"
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Financial Services Security",
      client: "Leading Financial Institution",
      description: "Implemented comprehensive security infrastructure including penetration testing, compliance audit, and security awareness training.",
      tags: ["Compliance", "Infrastructure", "Training"],
      stats: { threats: "+94%", response: "-72%" },
      color: "#00C896",
      rgb: "0, 200, 150"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      client: "Global Retail Brand",
      description: "Secured web application with comprehensive security assessment, code review, and deployment of WAF protection.",
      tags: ["Web Security", "PCI DSS", "DDoS"],
      stats: { threats: "+89%", response: "-68%" },
      color: "#00C896",
      rgb: "0, 200, 150"
    },
    {
      id: 3,
      title: "Cloud Migration & Security",
      client: "SaaS Technology Company",
      description: "Guided secure cloud migration with infrastructure as code, IAM configuration, and continuous security monitoring.",
      tags: ["Cloud", "AWS", "DevSecOps"],
      stats: { threats: "+91%", response: "-75%" },
      color: "#00C896",
      rgb: "0, 200, 150"
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="page-container">
          <div className="hero-content">
            <div className="hero-tagline" data-animate="tagline">
              <span>ADVANCED</span>
              <span className="divider">•</span>
              <span>PROACTIVE</span>
              <span className="divider">•</span>
              <span>SECURE</span>
            </div>
            
            <h1 className="hero-title" data-animate="title">
              Defend Your Digital<br />
              <span style={{ color: '#00C896' }}>Infrastructure</span>
            </h1>
            
            <p className="hero-description" data-animate="description">
              We deliver enterprise-grade cybersecurity solutions that prevent, detect, 
              and respond to threats in real-time. Your security is our mission.
            </p>
            
            <div className="hero-stats" data-animate="stats">
              <div className="stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-card">
                <div className="stat-number">250+</div>
                <div className="stat-label">Global Clients</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-card">
                <div className="stat-number time-display">
                  <CurrentTime />
                </div>
                <div className="stat-label">Real-time Monitoring</div>
              </div>
            </div>
            
            <div className="hero-actions" data-animate="actions">
              <button 
                className="btn-primary"
                onClick={() => navigate('/contact')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Start Security Audit
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate('/services')}
              >
                View All Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="page-container">
          <div className="section-header" data-animate="services-header">
            <div className="section-subtitle">Our Expertise</div>
            <h2>Comprehensive Security Solutions</h2>
            <p className="section-description">
              End-to-end cybersecurity services tailored to protect your digital assets
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`service-card ${visibleElements[`service-${index}`] ? 'visible' : ''}`}
                data-animate={`service-${index}`}
                style={{
                  '--card-color': service.color,
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth/2) * 0.005}deg) rotateX(${(mousePosition.y - window.innerHeight/2) * -0.005}deg)`
                }}
              >
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-tags">
                  {service.tags.map((tag, idx) => (
                    <span key={idx}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="page-container">
          <div className="section-header" data-animate="projects-header">
            <div className="section-subtitle">Case Studies</div>
            <h2>Security Success Stories</h2>
            <p className="section-description">
              Real-world implementations delivering measurable security improvements
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`project-card ${visibleElements[`project-${index}`] ? 'visible' : ''}`}
                data-animate={`project-${index}`}
                style={{
                  '--project-color': project.color,
                  '--project-rgb': project.rgb
                }}
              >
                <div className="project-badge">
                  Case Study
                </div>
                <div className="project-client">
                  {project.client}
                </div>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
                
                <div className="project-stats">
                  <div className="stat">
                    <div className="stat-label">Threats Blocked</div>
                    <div className="stat-value">{project.stats.threats}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Response Time</div>
                    <div className="stat-value">{project.stats.response}</div>
                  </div>
                </div>
                
                <button 
                  className="btn-outline"
                  onClick={() => navigate('/projects')}
                >
                  View Full Report
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="page-container">
          <div 
            className={`cta-content ${visibleElements['cta'] ? 'visible' : ''}`}
            data-animate="cta"
          >
            <h2>Ready to Transform Your Security?</h2>
            <p className="cta-description">
              Schedule a free security consultation with our experts and receive 
              a personalized threat assessment report.
            </p>
            
            <div className="cta-actions">
              <button 
                className="btn-primary"
                onClick={() => navigate('/contact')}
              >
                Schedule Consultation
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate('/projects')}
              >
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}