import { Link } from "react-router-dom"
import "../../styles/globals.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/images/Rolo Logo.jpeg" alt="Rolo Nepal" className="footer-logo" />
              <p className="footer-description">
                Crafting luxury through heritage. Each masterpiece embodies Nepalese artistry.
              </p>
            </div>
            <div>
              <h3 className="footer-section-title">Collections</h3>
              <ul className="footer-links">
                <li>
                  <Link to="#" className="footer-link">
                    Himalayan Collection
                  </Link>
                </li>
                <li>
                  <Link to="#" className="footer-link">
                    Royal Heritage
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="footer-section-title">Connect</h3>
              <div className="footer-contact">
                <p className="footer-contact-text">Kathmandu, Nepal</p>
                <p className="footer-contact-text">+977-1-4567890</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">© 2024 Rolo Nepal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer