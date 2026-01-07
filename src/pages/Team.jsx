import React, { useState, useEffect } from "react";
import { GradientText } from "../components/TextReveal";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const defaultTeam = [
  {
    name: 'Rajesh Kumar',
    position: 'Chief Security Officer',
    bio: '15+ years in cybersecurity with experience at Fortune 500 companies'
  },
  {
    name: 'Priya Sharma',
    position: 'Lead Security Architect',
    bio: 'Certified in CISSP, AWS, and cloud security practices'
  },
  {
    name: 'Amit Patel',
    position: 'Penetration Testing Lead',
    bio: 'Certified ethical hacker with extensive penetration testing experience'
  },
  {
    name: 'Sarah Williams',
    position: 'Incident Response Manager',
    bio: 'Specialized in breach investigation and incident response'
  },
  {
    name: 'Michael Chen',
    position: 'IoT Security Specialist',
    bio: 'Expert in IoT forensics and embedded systems security'
  },
  {
    name: 'Ananya Singh',
    position: 'Training & Consulting Lead',
    bio: 'Develops and delivers customized security training programs'
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

  return (
    <div className="page-section">
      <div className="page-section-content">
        <h2>Our Expert <GradientText>Team</GradientText></h2>
        
        <p className="section-description">
          Meet the certified security professionals and ethical hackers shaping a secure digital world. Our team brings decades of combined experience from leading global organizations.
        </p>

        {/* Team Overview */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '40px', borderRadius: '12px', marginBottom: '60px' }}>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
            Our diverse team of security professionals includes certified ethical hackers, system architects, forensic investigators, and security consultants. We are committed to staying at the forefront of cybersecurity innovation and best practices.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {team.map((member, index) => (
            <div key={index} style={{ padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: 'white', transition: 'all 0.3s ease' }}>
              {member.image ? (
                <img src={member.image} alt={member.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px' }} />
              ) : (
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e74c3c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', marginBottom: '20px' }}>
                  {member.name.charAt(0)}
                </div>
              )}
              <h4 style={{ color: '#0f172a', marginBottom: '5px' }}>{member.name}</h4>
              <p style={{ color: '#e74c3c', fontWeight: '600', fontSize: '14px', marginBottom: '10px' }}>{member.position || member.role}</p>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>{member.bio}</p>
            </div>
          ))}
        </div>

        {/* Why Our Team */}
        <div style={{ marginTop: '80px' }}>
          <h3 style={{ marginBottom: '40px' }}>Why Our Team Stands Out</h3>
          <div className="grid-3" style={{ gap: '30px' }}>
            <div style={{ padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>🎓</div>
              <h4>Certified Professionals</h4>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>CISSP, CEH, OSCP, and other industry-recognized certifications</p>
            </div>
            <div style={{ padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>🚀</div>
              <h4>Latest Technologies</h4>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Always updated with the latest security tools and methodologies</p>
            </div>
            <div style={{ padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>🤝</div>
              <h4>Client-Focused</h4>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Dedicated to understanding and solving your unique security challenges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
