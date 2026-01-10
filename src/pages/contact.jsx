import React, { useState } from "react";
import { GradientText } from "../components/TextReveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse({
          type: "success",
          message: data.message || "Thank you for contacting us! Our team will reach out within 24 hours.",
        });
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      } else {
        setResponse({
          type: "error",
          message: data.error || "Failed to submit your request",
        });
      }
    } catch (error) {
      setResponse({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section contact-hero-section">
        <div className="page-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="hero-description">
              Connect with our cybersecurity experts. We're here to discuss your security needs and help you build a secure digital future.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="services-section contact-section">
        <div className="page-container">
          <div className="section-header">
            <div className="section-subtitle">Contact Us</div>
            <h2>We're Here to Help</h2>
          </div>
          <div className="services-grid contact-grid">
            {/* Contact Info */}
            <div className="service-card contact-info-card">
              <h3>Contact Information</h3>
              <div className="contact-detail">
                <h4>📧 Email</h4>
                <p><a href="mailto:care.securix@gmail.com" className="link-primary">care.securix@gmail.com</a></p>
              </div>
              <div className="contact-detail">
                <h4>📞 Phone</h4>
                <p><a href="tel:+917598557161" className="link-primary">+91 759-855-7161</a></p>
              </div>
              <div className="contact-detail">
                <h4>⏰ Response Time</h4>
                <p>We typically respond within 24 hours during business days.</p>
              </div>
              <div className="contact-socials">
                <h4>🔗 Follow Us</h4>
                <div className="social-icons">
                  <a href="https://www.instagram.com/_securix_" target="_blank" rel="noreferrer" title="Instagram">
                    <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="social-icon" />
                  </a>
                  <a href="https://wa.me/917010000000?text=Hello%20Securix%20Service" target="_blank" rel="noreferrer" title="WhatsApp">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="social-icon" />
                  </a>
                  <a href="https://www.linkedin.com/company/securix-service/about/" target="_blank" rel="noreferrer" title="LinkedIn">
                    <img src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" alt="LinkedIn" className="social-icon" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="service-card contact-form-card">
              <h3>Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 1234567890"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your requirements..."
                    rows="5"
                    className="form-control"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Submitting..." : "Send Message"}
                </button>
                {response && (
                  <div className={`response-message ${response.type}`}>
                    {response.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
