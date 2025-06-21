import { RegisterForm } from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Logo Section */}
        <div className="logo-container">
          <img src="/images/Rolo Logo.jpeg" alt="ROLO Logo" className="logo" />
        </div>

        {/* Register Card */}
        <div className="auth-card">
          <div className="tab-navigation">
            <div className="tab-button active">Create Account</div>
          </div>

          <div className="form-container">
            <RegisterForm />
          </div>
        </div>

        {/* Brand Tagline */}
        <p className="brand-tagline">
          A Tapestry of Nepalese Heritage • Crafted In Nepal
        </p>

        {/* Login Link */}
        <div className="nav-links">
          <p className="nav-text">
            Already have an account?{" "}
            <a href="/login" className="nav-link">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
