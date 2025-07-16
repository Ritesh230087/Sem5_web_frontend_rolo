import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../../hooks/useLoginUser";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();
  const { mutate, isLoading } = useLoginUser();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData
    //   , {
    //   onSuccess: () => {
    //     navigate("/home");
    //   }
    // }
  );
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="input-group">
        <label htmlFor="email" className="label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="input"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="password" className="label">Password</label>
        <div className="password-container">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="input password-input"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
          <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="remember-container">
        <div className="checkbox-group">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            className="checkbox"
            checked={formData.rememberMe}
            onChange={handleInputChange}
          />
          <label htmlFor="rememberMe" className="checkbox-label">Remember me</label>
        </div>
        <a href="/forgot-password" className="forgot-link">Forgot password?</a>
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary">
        {isLoading ? (
          <>
            <div className="spinner animate-spin"></div>
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}
