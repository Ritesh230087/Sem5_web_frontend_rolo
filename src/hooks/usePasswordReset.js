import { useState } from 'react';
import { forgotPasswordService, resetPasswordService } from '../services/authService';

export const usePasswordReset = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleForgotPassword = async (email) => {
        setLoading(true);
        setError(null);
        setSuccessMessage('');
        const result = await forgotPasswordService(email);
        setLoading(false);

        if (result.success) {
            setSuccessMessage(result.message);
            return true; 
        } else {
            setError(result.message);
            return false;
        }
    };

    const handleResetPassword = async (token, password) => {
        setLoading(true);
        setError(null);
        setSuccessMessage('');
        const result = await resetPasswordService(token, password);
        setLoading(false);

        if (result.success) {
            setSuccessMessage(result.message);
            return true;
        } else {
            setError(result.message);
            return false;
        }
    };

    return {
        loading,
        error,
        successMessage,
        handleForgotPassword,
        handleResetPassword,
        setError, 
    };
};