import { LoginForm } from "../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="logo-container">
          <img src="/images/Rolo Logo.jpeg" alt="ROLO Logo" className="logo" />
        </div>

        <div className="auth-card">
          <div className="tab-navigation">
            <div className="tab-button active">Login</div>
          </div>

          <div className="form-container">
            <LoginForm />
          </div>
        </div>

        <p className="brand-tagline">
          A Tapestry of Nepalese Heritage • Crafted In Nepal
        </p>

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