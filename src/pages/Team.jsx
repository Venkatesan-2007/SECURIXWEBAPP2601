import React, { useState, useEffect } from "react";
import { GradientText } from "../components/TextReveal";
import Roadmap from '../components/Roadmap';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const defaultTeam = [
  {
    name: 'M. Hajmal rfan',
    position: 'Founder',
    bio: 'Vision, strategy, and long-term direction.'
  },
  {
    name: 'D. Venkatesh',
    position: 'Co-Founder',
    bio: 'Strategic support, growth planning, and operational alignment.'
  },
  {
    name: 'Hari Haran J',
    position: 'CEO',
    bio: 'Business leadership, execution, and expansion.'
  },
  {
    name: 'Gayathri',
    position: 'Co-CEO',
    bio: 'Shared leadership, decision-making, and organizational growth.'
  },
  {
    name: 'Krithik Raj',
    position: 'CTO',
    bio: 'Technology vision, architecture, and innovation.'
  },
  {
    name: 'Kirubakaran',
    position: 'COO',
    bio: 'Operations, delivery excellence, and process management.'
  },
  {
    name: 'Mohamed Yasin J',
    position: 'HR',
    bio: 'Talent, culture, and people operations.'
  },
  {
    name: 'Yogeshwaran S',
    position: 'Social Media Handling',
    bio: 'Brand visibility, engagement, and digital strategy.'
  },
  {
    name: 'Jagadeesh A',
    position: 'Lead UI/UX Designer',
    bio: 'User-first design, experience, and interface clarity.'
  },
  {
    name: 'Sanjay M',
    position: 'Animation Designer',
    bio: 'Motion design and visual storytelling.'
  },
  {
    name: 'Venkatesh D',
    position: 'Senior Developer',
    bio: 'Secure, scalable, high-performance development.'
  },
  {
    name: 'Jegan',
    position: 'Development Head',
    bio: 'Technical leadership and project execution.'
  },
  {
    name: 'Pravin P',
    position: 'Frontend Developer',
    bio: 'Responsive, modern, and performance-driven UI.'
  },
];

const roadmapItems = [
  {
    year: '2023',
    title: 'Company Foundation',
    description: 'Securix was founded with the mission to provide top-tier cybersecurity solutions.'
  },
  {
    year: '2024',
    title: 'Expansion of Services',
    description: 'Expanded our services to include IoT forensics and cloud security.'
  },
  {
    year: '2025',
    title: 'First 100 Clients',
    description: 'Reached a milestone of serving over 100 enterprise clients globally.'
  },
  {
    year: '2026',
    title: 'Future Vision',
    description: 'Continuing to innovate and lead the cybersecurity industry with cutting-edge solutions.'
  }
];

export default function Team() {
  const [team, setTeam] = useState(defaultTeam);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/team`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setTeam(data);
          }
        }
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '120px 0' }}>
        Loading team data...
      </div>
    );
  }

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '60vh', background: 'var(--light-gray)' }}>
        <div className="page-container">
          <div className="hero-content" style={{ maxWidth: '900px' }}>
            <h1 className="hero-title">
              Meet Our Expert <span style={{ color: 'var(--primary)' }}>Team</span>
            </h1>
            <p className="hero-description">
              Meet the certified security professionals and ethical hackers shaping a secure digital world. Our team brings decades of combined experience from leading global organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="services-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-subtitle">Our Leadership</div>
            <h2>The Minds Behind Securix</h2>
            <p className="section-description">
              Dedicated to innovation, integrity, and securing your digital future.
            </p>
          </div>
          <div className="services-grid">
            {team.map((member, index) => (
              <div key={index} className="service-card">
                {member.image ? (
                  <img src={member.image} alt={member.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px' }} />
                ) : (
                  <div className="service-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
                    {member.name.charAt(0)}
                  </div>
                )}
                <h3>{member.name}</h3>
                <p style={{ color: 'var(--medium-gray)', marginBottom: '10px' }}>{member.position}</p>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Team Stands Out Section */}
      <section className="projects-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-subtitle">Our Edge</div>
            <h2>Why Our Team Stands Out</h2>
          </div>
          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="service-card">
              <div className="service-icon">🎓</div>
              <h3>Certified Professionals</h3>
              <p>CISSP, CEH, OSCP, and other industry-recognized certifications.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🚀</div>
              <h3>Latest Technologies</h3>
              <p>Always updated with the latest security tools and methodologies.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🤝</div>
              <h3>Client-Focused</h3>
              <p>Dedicated to understanding and solving your unique security challenges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="services-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-subtitle">Our Journey</div>
            <h2>Company Roadmap</h2>
          </div>
          <Roadmap items={roadmapItems} />
        </div>
      </section>
    </div>
  );
}
