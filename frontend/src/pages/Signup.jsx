import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import { Mail, Lock, User, Phone, Loader2 } from '../lucide-react';
import toast from 'react-hot-toast';

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
        fullName: '',
        phone: '',
        role: 'CANDIDATE',
    });
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.password2) {
            toast.error("Passwords don't match");
            return;
        }

        setLoading(true);

        const result = await signup(formData);

        setLoading(false);

        if (result.success) {
            navigate('/dashboard');
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
                    <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your details to get started
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-2 py-3">
                        <div className="space-y-1">
                            <Label htmlFor="fullName" className="text-xs">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="pl-9 h-8 text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="email" className="text-xs">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-9 h-8 text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <Label htmlFor="phone" className="text-xs">Phone</Label>
                                <div className="relative">
                                    <Phone className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+1 234..."
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="pl-9 h-8 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="role" className="text-xs">Role</Label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    required
                                >
                                    <option value="CANDIDATE">Candidate</option>
                                    <option value="HOST">Host</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password" className="text-xs">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-9 h-8 text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password2" className="text-xs">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                                <Input
                                    id="password2"
                                    name="password2"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password2}
                                    onChange={handleChange}
                                    className="pl-9 h-8 text-sm"
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2 pb-4">

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create account'}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <GoogleLoginButton role={formData.role} />

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
