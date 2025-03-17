import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import '../globals.css';
import HeaderAdmin from '@/components/HeaderAdmin';
import SlidebarAdmin from '@/components/SlidebarAdmin';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const montserrat = Montserrat({
    variable: '--font-montserrat',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Admin 5D - Tech',
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{`${metadata.title}`}</title>
            </head>
            <body className={`${montserrat.variable} antialiased`}>{children}</body>
        </html>
    );
}
