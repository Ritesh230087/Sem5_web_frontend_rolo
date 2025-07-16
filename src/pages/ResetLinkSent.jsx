import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthForm.css';

const ResetLinkSent = () => {
    const location = useLocation();
    const email = location.state?.email || 'your email';

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="confirmation-icon success">✓</div>
                <h2>Check Your Email</h2>
                <p>We've sent a password reset link to <br/><strong>{email}</strong></p>
                
                <div className="info-box">
                  <p>Click the link in the email to create a new password. If you don't see it, be sure to check your spam folder.</p>
                </div>

                <div className="auth-link">
                    <Link to="/login">Back to Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetLinkSent;