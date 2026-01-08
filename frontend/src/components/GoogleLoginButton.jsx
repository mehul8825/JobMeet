import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';

export const GoogleLoginButton = ({ role = 'CANDIDATE' }) => {
    const [loading, setLoading] = useState(false);
    const { googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        try {
            // credentialResponse.credential contains the ID token
            const result = await googleLogin(credentialResponse.credential, role);

            if (result.success) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Google login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        console.error('Google login failed');
        setLoading(false);
    };

    return (
        <div className="w-full" style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                size="large"
                text="continue_with"
                shape="rectangular"
                logo_alignment="left"
            />
        </div>
    );
};
