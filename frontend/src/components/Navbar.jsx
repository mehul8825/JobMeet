
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Moon, Sun, User, Settings, LogOut, Home } from 'lucide-react';

export const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutDialog(true);
    };

    const confirmLogout = async () => {
        await logout();
        window.location.href = '/';
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container-custom flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center"
                    onClick={(e) => {
                        if (window.location.pathname === '/') {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }}
                >
                    <span className="logo-text">
                        <span className="logo-part-1 palette-5">Job</span>
                        <span className="logo-part-2 palette-5">Meet</span>
                    </span>
                </Link>

                {/* Navigation Links & Actions */}
                <div className="flex items-center gap-4">
                    {/* About Link - Only show on home page */}
                    {window.location.pathname === '/' && (
                        <button
                            onClick={() => {
                                document.getElementById('about')?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center'
                                });
                            }}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:block"
                        >
                            About
                        </button>
                    )}

                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="rounded-full"
                    >
                        {theme === 'light' ? (
                            <Moon className="h-5 w-5" />
                        ) : (
                            <Sun className="h-5 w-5" />
                        )}
                    </Button>

                    {/* User Menu or Auth Buttons */}
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-10 w-10 rounded-full p-0 hover:ring-2 hover:ring-primary/20 hover:bg-muted/50 transition-all"
                                >
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-primary/20 text-primary font-semibold border border-primary/30">
                                            {getInitials(user?.full_name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal p-4">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarFallback className="bg-primary/20 text-primary font-semibold border border-primary/30">
                                                {getInitials(user?.full_name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col space-y-1.5 flex-1">
                                            <p className="text-sm font-semibold leading-none">{user?.full_name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user?.email}
                                            </p>
                                            <div className="inline-flex items-center gap-1.5 mt-1">
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                                                    {user?.role === 'HOST' ? '🎯 Host' : '👤 Candidate'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="p-1">
                                    <DropdownMenuItem asChild>
                                        <Link to="/dashboard" className="cursor-pointer flex items-center px-3 py-2.5 rounded-md hover:bg-muted/80 transition-colors">
                                            <Home className="mr-3 h-4 w-4" />
                                            <span className="font-medium">Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/settings" className="cursor-pointer flex items-center px-3 py-2.5 rounded-md hover:bg-muted/80 transition-colors">
                                            <Settings className="mr-3 h-4 w-4" />
                                            <span className="font-medium">Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </div>
                                <DropdownMenuSeparator />
                                <div className="p-1">
                                    <DropdownMenuItem
                                        onClick={handleLogoutClick}
                                        className="cursor-pointer flex items-center px-3 py-2.5 rounded-md text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
                                    >
                                        <LogOut className="mr-3 h-4 w-4" />
                                        <span className="font-medium">Log out</span>
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild>
                            <Link to="/signup">Get Started</Link>
                        </Button>
                    )}
                </div>
            </div>

            {/* Logout Confirmation Dialog */}
            <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You'll need to sign in again to access your account.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmLogout} className="bg-destructive hover:bg-destructive/90">
                            Log Out
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </nav>
    );
};
