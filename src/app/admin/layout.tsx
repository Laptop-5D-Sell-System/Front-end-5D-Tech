'use client';

import * as React from 'react';
import NavLinks from '@/components/nav-links';
import MobileNavLinks from '@/components/mobile-nav-links'; 
import { ThemeProvider } from '@/components/ui/theme-provider';
// import { ModeToggle } from '@/components/mode';
import DropdownAvatar from '@/components/dropdown-avatar';
import '../globals.css';
import AppProvider from '@/components/app-provider';

export default function Layout({
    children,
}: Readonly<{
    children?: React.ReactNode;
}>) {
    // Track and apply initial theme to prevent flashing
    const [mounted, setMounted] = React.useState(false);
    
    React.useEffect(() => {
        setMounted(true);
        
        // Apply data-theme attribute to html element based on local storage
        const savedTheme = localStorage.getItem('theme') || 'system';
        const htmlElement = document.documentElement;
        
        if (savedTheme === 'dark' || 
            (savedTheme === 'system' && 
             window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }, []);

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`flex min-h-screen w-full flex-col bg-muted/40 transition-colors duration-300 ${!mounted ? 'opacity-0' : 'opacity-100'}`}>
                <AppProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange={false}
                        storageKey="theme"
                    >
                        <NavLinks />
                        <div className="flex sm:gap-4 sm:py-4 sm:pl-14 w-full">
                            <header className="sticky top-0 z-30 flex items-center border-b border-border px-4 sm:static w-full">
                                <div className="sm:hidden flex items-center">
                                    <MobileNavLinks />
                                </div>
                                
                                <div className="ml-auto flex items-center gap-4">
                                    {/* <ModeToggle /> */}
                                    <DropdownAvatar />
                                </div>
                            </header>
                        </div>
                        <main className="flex-1 px-4 sm:px-6 md:px-8">
                            {children}
                        </main>
                    </ThemeProvider>
                </AppProvider>
            </body>
        </html>
    );
}