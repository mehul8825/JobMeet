import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import toast from 'react-hot-toast';
import { Mail, Loader2, CheckCircle } from 'lucide-react';

export default function PasswordReset() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authService.requestPasswordReset(email);
            setSent(true);
            toast.success('Password reset email sent!');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to send reset email');
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
                    <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email address and we'll send you a reset link
                    </CardDescription>
                </CardHeader>

                {!sent ? (
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
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
                                {loading ? 'Sending...' : 'Send Reset Link'}
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
                        <h3 className="text-lg font-semibold mb-2">Check your email</h3>
                        <p className="text-muted-foreground mb-6">
                            We've sent a password reset link to <strong>{email}</strong>
                        </p>
                        <Button asChild className="w-full">
                            <Link to="/login">Back to Login</Link>
                        </Button>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}
