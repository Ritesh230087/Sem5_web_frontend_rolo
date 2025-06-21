import { LoginForm } from "../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Logo Section */}
        <div className="logo-container">
          <img src="/images/Rolo Logo.jpeg" alt="ROLO Logo" className="logo" />
        </div>

        {/* Login Card */}
        <div className="auth-card">
          <div className="tab-navigation">
            <div className="tab-button active">Login</div>
          </div>

          <div className="form-container">
            <LoginForm />
          </div>
        </div>

        {/* Brand Tagline */}
        <p className="brand-tagline">
          A Tapestry of Nepalese Heritage • Crafted In Nepal
        </p>

        {/* Register Link */}
        <div className="nav-links">
          <p className="nav-text">
            Don't have an account? {" "}
            <a href="/register" className="nav-link">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}