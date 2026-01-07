import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Sample case studies - these can be replaced/managed via admin panel
  const defaultProjects = [
    {
      id: 1,
      name: "Financial Services Security Upgrade",
      client: "Leading Financial Institution",
      description: "Implemented comprehensive security infrastructure including penetration testing, compliance audit, and security awareness training for a major financial services provider.",
      results: ["100% vulnerability remediation", "PCI DSS Compliance Achieved", "Zero security incidents in 12 months"],
      technologies: ["Penetration Testing", "Compliance Audit", "Security Training", "Infrastructure Hardening"],
      category: "Financial"
    },
    {
      id: 2,
      name: "E-Commerce Platform Hardening",
      client: "Global Retail Brand",
      description: "Secured high-traffic e-commerce platform with comprehensive security assessment, code review, and deployment of WAF and DDoS protection systems.",
      results: ["99.9% uptime maintained", "PCI DSS Level 1 Compliance", "40% reduction in security incidents"],
      technologies: ["Web Application Firewall", "DDoS Protection", "Code Security Review", "Compliance Audit"],
      category: "E-Commerce"
    },
    {
      id: 3,
      name: "Cloud Migration & Security",
      client: "SaaS Technology Company",
      description: "Guided secure cloud migration to AWS with infrastructure as code, IAM configuration, and continuous security monitoring implementation.",
      results: ["60% cost reduction", "Full encryption implementation", "Real-time threat detection"],
      technologies: ["AWS", "Infrastructure as Code", "IAM", "Cloud Security Monitoring"],
      category: "Cloud"
    },
    {
      id: 4,
      name: "IoT Device Security Framework",
      client: "Smart Manufacturing Facility",
      description: "Implemented comprehensive IoT security framework with device hardening, network segmentation, and forensic analysis capabilities.",
      results: ["100+ devices secured", "Real-time monitoring deployed", "Zero compromised devices"],
      technologies: ["IoT Forensics", "Device Hardening", "Network Segmentation", "Analytics"],
      category: "IoT"
    },
    {
      id: 5,
      name: "Healthcare Data Protection",
      client: "Regional Hospital Network",
      description: "Secured sensitive patient data with HIPAA-compliant infrastructure, encryption at rest and in transit, and comprehensive access controls.",
      results: ["HIPAA compliant", "Patient data fully encrypted", "Zero breaches recorded"],
      technologies: ["HIPAA Compliance", "Data Encryption", "Access Control", "Audit Logging"],
      category: "Healthcare"
    },
    {
      id: 6,
      name: "Government Agency Incident Response",
      client: "Federal Government Agency",
      description: "Rapid incident response and forensic investigation following cyber attack, with complete breach analysis and remediation.",
      results: ["Attack contained in 2 hours", "Full forensic analysis completed", "Systems restored and hardened"],
      technologies: ["Incident Response", "Digital Forensics", "Threat Analysis", "System Recovery"],
      category: "Government"
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/projects`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setProjects(data);
          } else {
            setProjects(defaultProjects);
          }
        } else {
          setProjects(defaultProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="page-section project-hero">
        <div className="page-container">
          <h1>Our Portfolio & Case Studies</h1>
          <p className="section-description">
            Explore successful security assessments, applications developments, and security implementations across industries
          </p>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="page-section projects-grid-section">
        <div className="page-container">
          <div className="projects-grid">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={project.id || index} className="project-detail-card">
                  <div className="project-header">
                    <span className="project-category">{project.category || "Case Study"}</span>
                    <h3>{project.name}</h3>
                    <p className="project-client">Client: {project.client}</p>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  {project.results && project.results.length > 0 && (
                    <div className="project-results">
                      <h4>Key Results</h4>
                      <ul>
                        {project.results.map((result, idx) => (
                          <li key={idx}>✓ {result}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="project-technologies">
                      <h4>Technologies Used</h4>
                      <div className="tech-tags">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-projects-placeholder">
                <p>
                  Featured projects and case studies coming soon! See how we help businesses secure their digital assets.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="page-section projects-cta">
        <div className="page-container">
          <h2>Ready to Start Your Security Journey?</h2>
          <p>Contact our experts for a customized security assessment</p>
          <button className="cta-button primary" onClick={() => navigate('/contact')}>Schedule Consultation</button>
        </div>
      </section>
    </>
  );

}
