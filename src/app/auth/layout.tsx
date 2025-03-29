import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import '@/app/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

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
    title: 'Đăng nhập',
};

export default function LoginLayout({
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
                <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />
            </head>
            <body className={`${montserrat.variable} antialiased`}>
                <CartProvider>
                    <Header />
                    <div className="main" style={{ marginTop: '116px' }}></div>
                    {children}
                    <Footer />
                </CartProvider>
            </body>
        </html>
    );
}
