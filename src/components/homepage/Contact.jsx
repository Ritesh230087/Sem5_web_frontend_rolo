import React from "react";
import { Phone, Mail, Clock, MessageCircle, Headphones } from "lucide-react";
import './Contact.css';

const ContactUs = () => {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Get in Touch</h1>
            <div className="hero-divider"></div>
            <p className="hero-description">
              We'd love to hear from you. Reach out to us for inquiries about our heritage collection or custom orders.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Connect With Us */}
            <div className="connect-card">
              <div className="card-content">
                <h3 className="connect-title">Connect With Us</h3>
                <div className="connect-center">
                  <div className="connect-icon">
                    <MessageCircle className="icon" />
                  </div>
                  <h4 className="connect-subtitle">We're Here to Help</h4>
                  <p className="connect-description">
                    Discover the beauty of authentic Nepalese craftsmanship. Our team is ready to assist you in
                    finding the perfect heritage piece.
                  </p>
                </div>

                <div className="connect-options">
                  <div className="option-card">
                    <Phone className="option-icon" />
                    <h5 className="option-title">Call Us</h5>
                    <p className="option-text">Direct consultation</p>
                  </div>
                  <div className="option-card">
                    <Mail className="option-icon" />
                    <h5 className="option-title">Email Us</h5>
                    <p className="option-text">Quick response</p>
                  </div>
                </div>

                <div className="connect-cta">
                  <button className="cta-button">View Our Collection</button>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="info-card">
              <div className="card-content">
                <h3 className="info-title">Contact Information</h3>
                <div className="info-list">
                  <div className="info-item">
                    <Phone className="info-icon" />
                    <div className="info-details">
                      <h4 className="info-label">Phone</h4>
                      <p className="info-value">+977-1-4441234</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <Mail className="info-icon" />
                    <div className="info-details">
                      <h4 className="info-label">Email</h4>
                      <p className="info-value">hello@rolo.com.np</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <Clock className="info-icon" />
                    <div className="info-details">
                      <h4 className="info-label">Business Hours</h4>
                      <p className="info-value">
                        Monday - Saturday: 9:00 AM - 6:00 PM
                        <br />
                        Sunday: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2 className="services-title">How We Can Help</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-content">
                <div className="service-icon">
                  <MessageCircle className="icon" />
                </div>
                <h3 className="service-title">Product Inquiries</h3>
                <p className="service-description">
                  Learn more about our authentic Nepalese crafts, materials, and the stories behind each piece.
                </p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-content">
                <div className="service-icon">
                  <MessageCircle className="icon" />
                </div>
                <h3 className="service-title">Custom Orders</h3>
                <p className="service-description">
                  Commission unique pieces tailored to your preferences, crafted by our skilled artisans.
                </p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-content">
                <div className="service-icon">
                  <Headphones className="icon" />
                </div>
                <h3 className="service-title">Support</h3>
                <p className="service-description">
                  Get assistance with orders, shipping, care instructions, and any other questions you may have.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
