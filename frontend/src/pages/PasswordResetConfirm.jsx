import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import toast from 'react-hot-toast';
import { Lock, Loader2, CheckCircle } from 'lucide-react';

export default function PasswordResetConfirm() {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== newPassword2) {
            toast.error("Passwords don't match");
            return;
        }

        setLoading(true);

        try {
            await authService.confirmPasswordReset(uid, token, newPassword, newPassword2);
            setSuccess(true);
            toast.success('Password reset successful!');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <span className="logo-text">
                            <span className="logo-part-1 palette-5">Job</span>
                            <span className="logo-part-2 palette-5">Meet</span>
                        </span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Set New Password</CardTitle>
                    <CardDescription className="text-center">
                        Enter your new password below
                    </CardDescription>
                </CardHeader>

                {!success ? (
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="pl-10"
                                        required
                                        minLength={8}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword2">Confirm New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="newPassword2"
                                        type="password"
                                        placeholder="••••••••"
                                        value={newPassword2}
                                        onChange={(e) => setNewPassword2(e.target.value)}
                                        className="pl-10"
                                        required
                                        minLength={8}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">
                                Remember your password?{' '}
                                <Link to="/login" className="text-primary hover:underline font-medium">
                                    Sign in
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                ) : (
                    <CardContent className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Password Reset Complete!</h3>
                        <p className="text-muted-foreground mb-6">
                            Your password has been successfully reset.
                        </p>
                        <Button asChild className="w-full">
                            <Link to="/login">Sign In</Link>
                        </Button>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}
