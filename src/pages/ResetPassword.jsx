import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePasswordReset } from '../hooks/usePasswordReset';
import './AuthForm.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();
    const { loading, error, successMessage, handleResetPassword, setError } = usePasswordReset();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        const success = await handleResetPassword(token, password);
        if (success) {
            setTimeout(() => navigate('/login'), 3000);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Create New Password</h2>
                <p>Your new password must be different from previous ones.</p>
                
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {successMessage && (
                  <div className="success-message">
                      <p>{successMessage}</p>
                      <p>Redirecting to login...</p>
                  </div>
                )}
                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="auth-button" disabled={loading || successMessage}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;