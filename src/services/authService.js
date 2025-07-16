import { loginUserApi, registerUserApi } from "../api/authApi";

export const registerUserService = async (formData) => {
    try {
        const response = await registerUserApi(formData)
        return response.data
    } catch (err) {
        throw err.response?.data || { message: "Registration Failed" }
    }
}

export const loginUserService = async (formData) => {
    try {
        const response = await loginUserApi(formData)
        return response.data
    } catch (err) {
        throw err.response?.data || { message: "Login Failed" }
    }
}

/**
 * @param {string} email 
 */
export const forgotPasswordService = async (email) => {
    try {
        const response = await sentResetLinkApi({ email });
        return { success: true, message: response.data.message };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "An error occurred while sending the email." };
    }
};

/**
 * @param {string} token 
 * @param {string} password 
 */
export const resetPasswordService = async (token, password) => {
    try {
        const response = await resetPasswordApi(token, { password });
        return { success: true, message: response.data.message };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Invalid or expired token. Please try again." };
    }
};