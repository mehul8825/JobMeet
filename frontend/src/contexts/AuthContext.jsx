
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch current user on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await authService.getCurrentUser();
                setUser(userData);
            } catch (error) {
                // User not authenticated, that's okay
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            setUser(response.user);
            toast.success('Login successful!');
            return { success: true, user: response.user };
        } catch (error) {
            const message = error.response?.data?.error || error.response?.data?.email?.[0] || 'Login failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const signup = async (data) => {
        try {
            const response = await authService.signup(data);
            setUser(response.user);
            toast.success('Account created successfully!');
            return { success: true, user: response.user };
        } catch (error) {
            const errors = error.response?.data || {};
            const message = errors.error || errors.email?.[0] || errors.password?.[0] || 'Signup failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            toast.success('Logged out successfully');
            return { success: true };
        } catch (error) {
            toast.error('Logout failed');
            return { success: false };
        }
    };

    const googleLogin = async (accessToken, role) => {
        try {
            const response = await authService.googleLogin(accessToken, role);
            setUser(response.user);
            toast.success(response.is_new_user ? 'Account created successfully!' : 'Login successful!');
            return { success: true, user: response.user };
        } catch (error) {
            const message = error.response?.data?.error || 'Google login failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        googleLogin,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
