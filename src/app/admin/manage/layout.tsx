"use client";

import * as React from "react";
import DropdownAvatar from "../../../components/dropdown-avatar";
// import NavLinks from "../nav-links";
import { ThemeProvider } from "../../../components/ui/theme-provider";
import MobileNavLinks from "@/components/mobile-nav-links";
import { ModeToggle } from "@/components/mode";

export default function Layout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>)
 {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen w-full flex-col bg-muted/40">
        {/* <NavLinks /> */}
        {children}

        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background px-4 sm:static">
            <div className="flex items-center gap-4">
            <MobileNavLinks />
            
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
      </body>
    </html>
  );
}
