'use client';

import * as React from 'react';
import NavLinks from '@/components/nav-links';
import MobileNavLinks from '@/components/mobile-nav-links';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ModeToggle } from '@/components/mode';
import DropdownAvatar from '@/components/dropdown-avatar';
import '../globals.css';
import AppProvider from '@/components/app-provider';

export default function Layout({
    children,
}: Readonly<{
    children?: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="flex min-h-screen w-full flex-col bg-muted/40">
            <AppProvider>

                <NavLinks />

                    <div className="flex sm:gap-4 sm:py-4 sm:pl-14 w-full">
                        <header className="sticky top-0 z-30 flex items-center border-b  px-4 sm:static w-full">
                            <div className="sm:hidden flex items-center">
                                <MobileNavLinks />
                            </div>

                            <div className="ml-auto flex items-center gap-4">
                                <ThemeProvider
                                    attribute="class"
                                    defaultTheme="system"
                                    enableSystem
                                    disableTransitionOnChange
                                >
                                    <ModeToggle />
                                </ThemeProvider>
                                <DropdownAvatar />
                            </div>
                        </header>
                    </div>
                    {children}
                </AppProvider>
            </body>
        </html>
    );
}
