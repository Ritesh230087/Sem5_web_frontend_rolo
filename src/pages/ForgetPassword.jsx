// src/pages/ForgotPassword.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePasswordReset } from '../hooks/usePasswordReset';
import './AuthForm.css'; 

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { loading, error, handleForgotPassword } = usePasswordReset();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await handleForgotPassword(email);
        if (success) {
            navigate('/reset-link-sent', { state: { email } });
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Forgot Password</h2>
                <p>Enter your email and we'll send a reset link.</p>
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="auth-button" disabled={loading}>
                    {loading ? 'Sending Link...' : 'Send Reset Link'}
                </button>

                <div className="auth-link">
                    <Link to="/login">Back to Sign In</Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;