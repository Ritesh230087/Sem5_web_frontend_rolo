import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../../hooks/useRegisterUser"; 
import { useRegisterUser as useRegisterUserTan } from "../../hooks/useRegisterUserTan";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const navigate = useNavigate();
  const { register, isLoading } = useRegisterUser();
  const registerMutation = useRegisterUserTan(); 

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("You must agree to the terms.");
      return;
    }

    registerMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Registration successful!");
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error?.message || "Registration failed");
      },
    });

  };

  return (
    <form onSubmit={handleSubmit} className="form form-register">
      <div className="input-row">
        <div className="input-group">
          <label htmlFor="firstName" className="label">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="input"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName" className="label">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="input"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last name"
            required
          />
        </div>
      </div>

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
            placeholder="Create a password"
            required
          />
          <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="confirmPassword" className="label">Confirm Password</label>
        <div className="password-container">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className="input password-input"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            required
          />
          <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="terms-container">
        <input
          id="agreeToTerms"
          name="agreeToTerms"
          type="checkbox"
          className="terms-checkbox"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="agreeToTerms" className="terms-label">
          I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>.
        </label>
      </div>

      <button type="submit" disabled={isLoading || registerMutation.isLoading} className="btn btn-primary">
        {isLoading || registerMutation.isLoading ? (
          <>
            <div className="spinner animate-spin"></div>
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </button>
    </form>
  );
}
