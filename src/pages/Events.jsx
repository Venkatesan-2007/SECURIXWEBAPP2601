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

  return (
    <div className="page-section">
      <div className="page-section-content">
        <h2>Upcoming Events & <GradientText>Webinars</GradientText></h2>
        <p className="section-description">
          Join our training sessions, webinars, and conferences to stay updated with the latest cybersecurity trends and best practices.
        </p>

        <div style={{ backgroundColor: "#f8f9fa", padding: "40px", borderRadius: "12px", marginBottom: "60px" }}>
          <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#333" }}>
            We regularly organize industry-leading events, training programs, and conferences to help professionals and organizations stay ahead of cybersecurity threats. Whether you are a developer, security professional, or business executive, our events provide valuable insights and networking opportunities.
          </p>
        </div>

        <h3 style={{ marginBottom: "40px" }}>Featured Events</h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
          {events.map((event, index) => (
            <div key={index} style={{ padding: "30px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "white", transition: "all 0.3s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "15px" }}>
                <h4 style={{ color: "#0f172a", margin: "0" }}>{event.title}</h4>
                <span style={{ backgroundColor: "#e74c3c", color: "white", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>{event.type}</span>
              </div>
              <p style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>{event.description}</p>
              <div style={{ borderTop: "1px solid #eee", paddingTop: "15px", marginTop: "15px" }}>
                <p style={{ color: "#e74c3c", fontSize: "14px", fontWeight: "600", margin: "5px 0" }}>📅 {event.date}</p>
                <p style={{ color: "#666", fontSize: "14px", margin: "5px 0" }}>⏰ {event.time}</p>
              </div>
              <button style={{ marginTop: "15px", padding: "10px 20px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", width: "100%" }}>Register Now</button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "80px" }}>
          <h3 style={{ marginBottom: "40px" }}>Event Categories</h3>
          <div className="grid-4" style={{ gap: "30px" }}>
            <div style={{ padding: "30px", border: "1px solid #e0e0e0", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "15px" }}>🎓</div>
              <h4>Training Programs</h4>
              <p style={{ fontSize: "14px", color: "#666" }}>Hands-on technical training for security professionals</p>
            </div>
            <div style={{ padding: "30px", border: "1px solid #e0e0e0", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "15px" }}>📹</div>
              <h4>Webinars</h4>
              <p style={{ fontSize: "14px", color: "#666" }}>Online sessions with industry experts and thought leaders</p>
            </div>
            <div style={{ padding: "30px", border: "1px solid #e0e0e0", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "15px" }}>🏢</div>
              <h4>Conferences</h4>
              <p style={{ fontSize: "14px", color: "#666" }}>Large-scale events with keynotes, workshops, and networking</p>
            </div>
            <div style={{ padding: "30px", border: "1px solid #e0e0e0", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "15px" }}>🎯</div>
              <h4>Workshops</h4>
              <p style={{ fontSize: "14px", color: "#666" }}>Focused sessions on specific security topics and tools</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
