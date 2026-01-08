import React, { useState, useEffect } from "react";
import { GradientText } from "../components/TextReveal";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const defaultEvents = [
  {
    date: "Jan 15, 2026",
    title: "Cloud Security Essentials Webinar",
    description: "Learn best practices for securing cloud infrastructure and applications",
    type: "Webinar",
    time: "2:00 PM IST"
  },
  {
    date: "Jan 22, 2026",
    title: "Advanced Penetration Testing Workshop",
    description: "Hands-on training for professional penetration testers",
    type: "Workshop",
    time: "10:00 AM IST"
  },
  {
    date: "Feb 05, 2026",
    title: "IoT Security Conference",
    description: "Industry leaders discuss IoT security challenges and solutions",
    type: "Conference",
    time: "9:00 AM IST"
  },
  {
    date: "Feb 12, 2026",
    title: "Incident Response Training",
    description: "Prepare your team for real-world security incidents",
    type: "Training",
    time: "3:00 PM IST"
  },
  {
    date: "Feb 20, 2026",
    title: "GDPR Compliance Masterclass",
    description: "Understand and implement GDPR compliance requirements",
    type: "Webinar",
    time: "4:00 PM IST"
  },
  {
    date: "Mar 05, 2026",
    title: "Security Summit 2026",
    description: "Annual cybersecurity summit with keynote speakers and networking",
    type: "Conference",
    time: "9:00 AM IST"
  }
];

export default function Events() {
  const [events, setEvents] = useState(defaultEvents);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/events`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setEvents(data);
          }
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '120px 0' }}>
        Loading events...
      </div>
    );
  }

  return (
    <div className="events-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '60vh', background: 'var(--light-gray)' }}>
        <div className="page-container">
          <div className="hero-content" style={{ maxWidth: '900px' }}>
            <h1 className="hero-title">
              Upcoming <span style={{ color: 'var(--primary)' }}>Events</span>
            </h1>
            <p className="hero-description">
              Join our training sessions, webinars, and conferences to stay updated with the latest cybersecurity trends and best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="services-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-subtitle">Our Events</div>
            <h2>Featured Events</h2>
          </div>
          <div className="services-grid">
            {events.map((event, index) => (
              <div key={index} className="service-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>{event.title}</h3>
                  <span className="project-badge" style={{ backgroundColor: 'var(--primary)' }}>{event.type}</span>
                </div>
                <p>{event.description}</p>
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <p style={{ color: 'var(--medium-gray)', margin: 0 }}>📅 {event.date}</p>
                  <p style={{ color: 'var(--medium-gray)', margin: '0.5rem 0 0' }}>⏰ {event.time}</p>
                </div>
                <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>Register Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories Section */}
      <section className="projects-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-subtitle">Categories</div>
            <h2>Event Categories</h2>
          </div>
          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div className="service-card">
              <div className="service-icon">🎓</div>
              <h3>Training Programs</h3>
              <p>Hands-on technical training for security professionals.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📹</div>
              <h3>Webinars</h3>
              <p>Online sessions with industry experts and thought leaders.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Conferences</h3>
              <p>Large-scale events with keynotes, workshops, and networking.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎯</div>
              <h3>Workshops</h3>
              <p>Focused sessions on specific security topics and tools.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
