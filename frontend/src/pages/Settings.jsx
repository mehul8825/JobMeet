import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import toast from 'react-hot-toast';
import { User, Lock, Settings as SettingsIcon, Moon, Sun } from 'lucide-react';

export default function Settings() {
    const { user } = useAuth();
    const { theme, toggleTheme, isDark } = useTheme();
    const [profile, setProfile] = useState({
        fullName: user?.full_name || '',
        phone: user?.phone || '',
    });

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        // TODO: Implement profile update API call
        toast.success('Profile updated successfully!');
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        // TODO: Implement password change API call
        toast.success('Password changed successfully!');
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container-custom px-4 py-8 max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <SettingsIcon className="h-8 w-8" />
                        Settings
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your account settings and preferences
                    </p>
                </div>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile">
                            <User className="h-4 w-4 mr-2" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="security">
                            <Lock className="h-4 w-4 mr-2" />
                            Security
                        </TabsTrigger>
                        <TabsTrigger value="preferences">
                            <SettingsIcon className="h-4 w-4 mr-2" />
                            Preferences
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Update your personal information and contact details
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleProfileUpdate} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            value={profile.fullName}
                                            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            value={user?.email}
                                            disabled
                                            className="bg-muted"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Email cannot be changed
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            placeholder="Phone Number"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Role</Label>
                                        <div className="px-3 py-2 rounded-md border bg-muted">
                                            {user?.role === 'HOST' ? '🎯 Host (Interviewer)' : '👤 Candidate (Interviewee)'}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Role cannot be changed
                                        </p>
                                    </div>

                                    <Button type="submit">Save Changes</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle>Change Password</CardTitle>
                                <CardDescription>
                                    Update your password to keep your account secure
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePasswordChange} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <Input
                                            id="currentPassword"
                                            type="password"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    <Button type="submit">Update Password</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Preferences Tab */}
                    <TabsContent value="preferences">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance & Preferences</CardTitle>
                                <CardDescription>
                                    Customize your experience
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Theme</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Choose between light and dark mode
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {isDark ? (
                                            <Moon className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Sun className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <Switch
                                            checked={isDark}
                                            onCheckedChange={toggleTheme}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive email updates about your interviews
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Browser Notifications</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Get notified in your browser
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
