import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoaderIcon } from 'lucide-react';

const LoadingContext = createContext();

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within LoadingProvider');
    }
    return context;
};

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingDelay, setLoadingDelay] = useState(null);

    const startLoading = (delay = 300) => {
        const timeout = setTimeout(() => {
            setIsLoading(true);
        }, delay);
        setLoadingDelay(timeout);
    };

    const stopLoading = () => {
        if (loadingDelay) {
            clearTimeout(loadingDelay);
            setLoadingDelay(null);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        return () => {
            if (loadingDelay) {
                clearTimeout(loadingDelay);
            }
        };
    }, [loadingDelay]);

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
            {isLoading && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <LoaderIcon
                            role="status"
                            aria-label="Loading"
                            className="h-12 w-12 animate-spin text-primary"
                        />
                        <p className="text-lg font-medium text-foreground">Loading...</p>
                    </div>
                </div>
            )}
        </LoadingContext.Provider>
    );
};
