import api from './api';

/**
 * Authentication service for all auth-related API calls
 */

export const authService = {
    /**
     * User signup
     */
    async signup(data) {
        const response = await api.post('/api/auth/signup/', {
            email: data.email,
            password: data.password,
            password2: data.password2,
            full_name: data.fullName,
            role: data.role,
            phone: data.phone || '',
        });
        return response.data;
    },

    /**
     * User login
     */
    async login(email, password) {
        const response = await api.post('/api/auth/login/', {
            email,
            password,
        });
        return response.data;
    },

    /**
     * User logout
     */
    async logout() {
        const response = await api.post('/api/auth/logout/');
        return response.data;
    },

    /**
     * Get current authenticated user
     */
    async getCurrentUser() {
        const response = await api.get('/api/auth/user/');
        return response.data;
    },

    /**
     * Request password reset
     */
    async requestPasswordReset(email) {
        const response = await api.post('/api/auth/password-reset/', {
            email,
        });
        return response.data;
    },

    /**
     * Confirm password reset with token
     */
    async confirmPasswordReset(uid, token, newPassword, newPassword2) {
        const response = await api.post('/api/auth/password-reset/confirm/', {
            uid,
            token,
            new_password: newPassword,
            new_password2: newPassword2,
        });
        return response.data;
    },

    /**
     * Google OAuth login
     */
    async googleLogin(accessToken, role = 'CANDIDATE') {
        const response = await api.post('/api/auth/google/', {
            access_token: accessToken,
            role,
        });
        return response.data;
    },
};
