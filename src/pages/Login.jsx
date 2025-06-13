"use client"

import { useState } from "react"
import { LoginForm } from "../components/auth/LoginForm"
import { RegisterForm } from "../components/auth/RegisterForm"

export default function Login() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Logo Section */}
        <div className="logo-container">
          <img src="/images/Rolo Logo.jpeg" alt="ROLO Logo" className="logo" />
        </div>

        {/* Auth Card */}
        <div className="auth-card">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === "login" ? "active" : "inactive"}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`tab-button ${activeTab === "register" ? "active" : "inactive"}`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* Form Content */}
          <div className="form-container">{activeTab === "login" ? <LoginForm /> : <RegisterForm />}</div>
        </div>

        {/* Brand Tagline */}
        <p className="brand-tagline">A Tapestry of Nepalese Heritage • Crafted In Nepal</p>

        {/* Navigation Links */}
        <div className="nav-links">
          {activeTab === "login" ? (
            <p className="nav-text">
              Don't have an account?{" "}
              <button onClick={() => setActiveTab("register")} className="nav-link">
                Sign up here
              </button>
            </p>
          ) : (
            <p className="nav-text">
              Already have an account?{" "}
              <button onClick={() => setActiveTab("login")} className="nav-link">
                Sign in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
