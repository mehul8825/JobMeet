import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Navbar } from '../components/Navbar';
import { Video, Code, Shield, Clock, Users2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-background via-background to-muted/30">
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                </div>

                <div className="container-custom px-4 w-full py-12">
                    <div className="max-w-6xl mx-auto">
                        {/* Main Content */}
                        <div className="text-center mb-16 relative z-10">
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-foreground mb-6">
                                Conduct Professional
                                <br />
                                <span className="text-primary">Technical Interviews</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
                                Real-time video interviews with collaborative code editor,
                                live whiteboarding, and comprehensive assessment tools.
                            </p>

                            {/* CTA Buttons */}
                            {!isAuthenticated && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        size="lg"
                                        asChild
                                        className="bg-primary hover:bg-primary/90 text-lg px-10 py-6"
                                    >
                                        <Link to="/signup">Get Started</Link>
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Feature Highlights Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto relative z-10">
                            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                                <Video className="h-8 w-8 text-primary mb-3" />
                                <h3 className="font-semibold text-foreground mb-1">HD Video</h3>
                                <p className="text-sm text-muted-foreground">WebRTC powered</p>
                            </div>
                            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                                <Code className="h-8 w-8 text-primary mb-3" />
                                <h3 className="font-semibold text-foreground mb-1">Live Coding</h3>
                                <p className="text-sm text-muted-foreground">Real-time collaboration</p>
                            </div>
                            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                                <Shield className="h-8 w-8 text-primary mb-3" />
                                <h3 className="font-semibold text-foreground mb-1">Anti-Cheat</h3>
                                <p className="text-sm text-muted-foreground">Focus tracking</p>
                            </div>
                            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                                <CheckCircle2 className="h-8 w-8 text-primary mb-3" />
                                <h3 className="font-semibold text-foreground mb-1">Assessment</h3>
                                <p className="text-sm text-muted-foreground">MCQ & Coding tests</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Key Features */}
            <section className="py-20 px-4 bg-muted/30">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                            Core Features
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Everything you need for effective technical interviews
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <FeatureCard
                            icon={<Video className="h-8 w-8" />}
                            title="HD Video Conferencing"
                            description="WebRTC-powered crystal clear video and audio communication"
                        />
                        <FeatureCard
                            icon={<Code className="h-8 w-8" />}
                            title="Live Code Editor"
                            description="Real-time collaborative coding with syntax highlighting"
                        />
                        <FeatureCard
                            icon={<Shield className="h-8 w-8" />}
                            title="Anti-Cheat System"
                            description="Focus tracking and copy-paste prevention mechanisms"
                        />
                        <FeatureCard
                            icon={<Clock className="h-8 w-8" />}
                            title="Session Recording"
                            description="Full interview playback and code execution history"
                        />
                        <FeatureCard
                            icon={<Users2 className="h-8 w-8" />}
                            title="Multi-User Support"
                            description="Multiple interviewers with synchronized controls"
                        />
                        <FeatureCard
                            icon={<CheckCircle2 className="h-8 w-8" />}
                            title="Assessment Tools"
                            description="MCQ tests and coding challenges with auto-grading"
                        />
                    </div>
                </div>
            </section>
            {/* About Section */}
            <section id="about" className="py-20 px-4">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                            About JobMeet
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Your complete solution for modern technical interviews
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-3 text-foreground">Our Mission</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    JobMeet is dedicated to revolutionizing the technical interview process by providing
                                    a comprehensive platform that brings together cutting-edge technology and intuitive design.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3 text-foreground">What We Offer</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    We provide HD video conferencing, real-time collaborative code editing, live whiteboarding,
                                    and comprehensive assessment tools—all in one seamless platform designed to help you find
                                    the best talent efficiently.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all">
                                <h4 className="text-xl font-bold mb-2 text-foreground">For Interviewers</h4>
                                <p className="text-muted-foreground">
                                    Create, manage, and conduct professional technical interviews with powerful tools
                                    for assessment and collaboration.
                                </p>
                            </div>
                            <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all">
                                <h4 className="text-xl font-bold mb-2 text-foreground">For Candidates</h4>
                                <p className="text-muted-foreground">
                                    Showcase your skills in a fair, transparent interview environment with all the
                                    tools you need to succeed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 bg-muted/30">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                            How It Works
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Simple process from setup to completion
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <ProcessStep
                            number="1"
                            title="Create Session"
                            description="Host creates an interview session and shares the link with candidates"
                        />
                        <ProcessStep
                            number="2"
                            title="Conduct Interview"
                            description="Use video, code editor, and whiteboard for technical assessment"
                        />
                        <ProcessStep
                            number="3"
                            title="Review & Evaluate"
                            description="Access recorded session and assessment results for decision making"
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="about" className="border-t border-border bg-muted/30">
                <div className="container-custom px-4 py-16">
                    <div className="grid md:grid-cols-2 gap-12 mb-12">
                        {/* Brand Section */}
                        <div className="space-y-4">
                            <div className="logo-text-footer">
                                <span className="logo-footer-1 palette-5">Job</span>
                                <span className="logo-footer-2 palette-5">Meet</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                                Professional technical interview platform designed to streamline your hiring process with real-time collaboration tools.
                            </p>
                        </div>

                        {/* About Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground">About</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                JobMeet provides HD video conferencing, collaborative code editing, and comprehensive assessment tools
                                to help companies find the best talent efficiently.
                            </p>
                        </div>


                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-border pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-muted-foreground">
                                © 2026 JobMeet Interview Platform. All rights reserved.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Developed with by <span className="text-primary font-medium">Mehul Mistry</span>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="p-8 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
            <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
}

function ProcessStep({ number, title, description }) {
    return (
        <div className="text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary text-primary text-2xl font-bold">
                {number}
            </div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}
