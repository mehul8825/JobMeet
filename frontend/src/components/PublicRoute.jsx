import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from './ui/spinner';

export const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner className="h-12 w-12 text-primary" />
            </div>
        );
    }

    if (isAuthenticated) {
        // Redirect authenticated users to dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};
