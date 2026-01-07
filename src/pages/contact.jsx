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
    <div className="page-section">
      <div className="page-section-content">
        <h2>Get in <GradientText>Touch</GradientText></h2>
        <p className="section-description">Connect with our cybersecurity experts. We're here to discuss your security needs and help you build a secure digital future.</p>

        <div className="grid-2" style={{ gap: '60px', marginTop: '60px' }}>
          {/* Contact Info */}
          <div>
            <h3 style={{ marginBottom: '30px' }}>Contact Information</h3>
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ color: '#0f172a', marginBottom: '8px' }}>📧 Email</h4>
              <p><a href="mailto:care.securix@gmail.com" style={{ color: '#e74c3c', textDecoration: 'none' }}>care.securix@gmail.com</a></p>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ color: '#0f172a', marginBottom: '8px' }}>📞 Phone</h4>
              <p><a href="tel:+917598557161" style={{ color: '#e74c3c', textDecoration: 'none' }}>+91 759-855-7161</a></p>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ color: '#0f172a', marginBottom: '8px' }}>⏰ Response Time</h4>
              <p>We typically respond within 24 hours during business days</p>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ color: '#0f172a', marginBottom: '15px' }}>🔗 Follow Us</h4>
              <div style={{ display: 'flex', gap: '15px' }}>
                <a href="https://www.instagram.com/_securix_" target="_blank" rel="noreferrer" title="Instagram" style={{ display: 'inline-block' }}>
                  <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style={{ width: '32px', height: '32px' }} />
                </a>
                <a href="https://wa.me/917010000000?text=Hello%20Securix%20Service" target="_blank" rel="noreferrer" title="WhatsApp" style={{ display: 'inline-block' }}>
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" style={{ width: '32px', height: '32px' }} />
                </a>
                <a href="https://www.linkedin.com/company/securix-service/about/" target="_blank" rel="noreferrer" title="LinkedIn" style={{ display: 'inline-block' }}>
                  <img src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" alt="LinkedIn" style={{ width: '32px', height: '32px' }} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
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
                style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e0e0e0', fontSize: '14px', width: '100%' }}
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
                style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e0e0e0', fontSize: '14px', width: '100%' }}
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
                style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e0e0e0', fontSize: '14px', width: '100%' }}
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
                style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e0e0e0', fontSize: '14px', width: '100%' }}
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
                style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e0e0e0', fontSize: '14px', width: '100%', fontFamily: 'inherit' }}
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn" style={{ backgroundColor: '#e74c3c', color: 'white', padding: '12px 30px', borderRadius: '6px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: '600', width: '100%' }}>
              {loading ? "Submitting..." : "Send Message"}
            </button>

            {response && (
              <div className={`response-message ${response.type}`} style={{ padding: '15px', borderRadius: '6px', marginTop: '15px', backgroundColor: response.type === 'success' ? '#d4edda' : '#f8d7da', color: response.type === 'success' ? '#155724' : '#721c24', border: `1px solid ${response.type === 'success' ? '#c3e6cb' : '#f5c6cb'}` }}>
                {response.message}
              </div>
            )}
          </form>
        </div>

        {/* CTA Section */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '60px 40px', borderRadius: '12px', marginTop: '80px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '15px' }}>Ready to Secure Your Business?</h3>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>Let's start your security journey with a consultation from our experts.</p>
        </div>
      </div>
    </div>
  );
}
