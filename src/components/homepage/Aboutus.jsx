import React from "react";
import { Heart, Users, Globe, Award } from "lucide-react";
import { Link } from "react-router-dom";
import "./Aboutus.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Our Story</h1>
            <div className="hero-divider"></div>
            <p className="hero-description">
              A journey through the rich tapestry of Nepalese heritage, where ancient traditions meet contemporary
              elegance
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-text">
              <h2 className="mission-title">Our Mission</h2>
              <p className="mission-paragraph">
                At Rolo, we are dedicated to preserving and celebrating the extraordinary craftsmanship of Nepal. Each
                piece in our collection tells a story of generations of artisans who have passed down their skills
                through centuries of tradition.
              </p>
              <p className="mission-paragraph">
                We believe that every handcrafted item carries the soul of its creator and the essence of Nepalese
                culture. Our mission is to bring these authentic treasures to the world while supporting the communities
                that create them.
              </p>
            </div>
            <div className="mission-visual">
              <div className="values-grid">
                <div className="value-item">
                  <Heart className="value-icon" />
                  <h3 className="value-title">Passion</h3>
                  <p className="value-text">For authentic craftsmanship</p>
                </div>
                <div className="value-item">
                  <Users className="value-icon" />
                  <h3 className="value-title">Community</h3>
                  <p className="value-text">Supporting local artisans</p>
                </div>
                <div className="value-item">
                  <Globe className="value-icon" />
                  <h3 className="value-title">Heritage</h3>
                  <p className="value-text">Preserving traditions</p>
                </div>
                <div className="value-item">
                  <Award className="value-icon" />
                  <h3 className="value-title">Quality</h3>
                  <p className="value-text">Exceptional standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values">
        <div className="container">
          <h2 className="values-title">Our Values</h2>
          <div className="values-cards">
            <div className="value-card">
              <div className="card-content">
                <h3 className="card-title">Authenticity</h3>
                <p className="card-description">
                  Every piece is genuinely crafted in Nepal using traditional methods passed down through generations.
                </p>
              </div>
            </div>
            <div className="value-card">
              <div className="card-content">
                <h3 className="card-title">Sustainability</h3>
                <p className="card-description">
                  We work directly with artisan communities, ensuring fair trade practices and sustainable livelihoods.
                </p>
              </div>
            </div>
            <div className="value-card">
              <div className="card-content">
                <h3 className="card-title">Excellence</h3>
                <p className="card-description">
                  We maintain the highest standards of quality while honoring the traditional craftsmanship techniques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Experience the Heritage</h2>
            <p className="cta-description">
              Discover our carefully curated collection of authentic Nepalese crafts and become part of our story.
            </p>
            <div className="cta-button-container">
              <button className="cta-button">Shop Collection</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
