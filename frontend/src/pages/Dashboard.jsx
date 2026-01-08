import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from '../components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar, Video, Users, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    const { user } = useAuth();

    const isHost = user?.role === 'HOST';

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container-custom px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Welcome back, {user?.full_name?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        {isHost ? 'Manage your interviews and candidates' : 'View your upcoming interviews and assessments'}
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<Calendar className="h-5 w-5" />}
                        title={isHost ? "Scheduled Interviews" : "Upcoming Interviews"}
                        value="0"
                        description="This month"
                    />
                    <StatCard
                        icon={<Video className="h-5 w-5" />}
                        title={isHost ? "Active Sessions" : "Completed Sessions"}
                        value="0"
                        description="Total"
                    />
                    <StatCard
                        icon={<Users className="h-5 w-5" />}
                        title={isHost ? "Total Candidates" : "Interview Invites"}
                        value="0"
                        description="All time"
                    />
                    <StatCard
                        icon={<TrendingUp className="h-5 w-5" />}
                        title={isHost ? "Average Score" : "Your Average"}
                        value="N/A"
                        description="Last 30 days"
                    />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>{isHost ? 'Recent Interviews' : 'Your Recent Sessions'}</CardTitle>
                            <CardDescription>
                                {isHost ? 'View and manage your recent interview sessions' : 'Review your recent interview attempts'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12 text-muted-foreground">
                                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No interviews yet</p>
                                <p className="text-sm mt-2">
                                    {isHost ? 'Create your first interview session to get started' : 'You\'ll see your interviews here once scheduled'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {isHost ? (
                                    <>
                                        <QuickActionButton>Schedule Interview</QuickActionButton>
                                        <QuickActionButton>Create Assessment</QuickActionButton>
                                        <QuickActionButton>View Reports</QuickActionButton>
                                    </>
                                ) : (
                                    <>
                                        <QuickActionButton>View Schedule</QuickActionButton>
                                        <QuickActionButton>Practice Mode</QuickActionButton>
                                        <QuickActionButton>My Results</QuickActionButton>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Account Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Role:</span>
                                    <span className="font-medium">{isHost ? '🎯 Host' : '👤 Candidate'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Email:</span>
                                    <span className="font-medium text-xs">{user?.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Member since:</span>
                                    <span className="font-medium">
                                        {new Date(user?.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, title, value, description }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}

function QuickActionButton({ children }) {
    return (
        <button className="w-full text-left px-4 py-2 rounded-md border hover:bg-accent hover:text-accent-foreground transition-colors">
            {children}
        </button>
    );
}
