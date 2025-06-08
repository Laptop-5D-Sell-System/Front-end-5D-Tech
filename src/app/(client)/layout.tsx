import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


import { CartProvider } from '@/context/CartContext';
import { ToastContainer } from 'react-toastify';
import ChatBot from '@/components/chat-bot';


// const geistSans = Geist({
//     variable: '--font-geist-sans',
//     subsets: ['latin'],
// });

const montserrat = Montserrat({
    variable: '--font-montserrat',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

// const geistMono = Geist_Mono({
//     variable: '--font-geist-mono',
//     subsets: ['latin'],
// });

export const metadata: Metadata = {
    title: '5D - Tech',
};

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />
                <title>{`${metadata.title}`}</title>
            </head>
            <body className={`${montserrat.variable}`}>

                <CartProvider>
                    <Header />
                    <div className="main" style={{ marginTop: '116px' }}></div>
                    {children}
                    <ChatBot />
                    <Footer />
                    <ToastContainer position="top-right" autoClose={3000} />
                </CartProvider>

            </body>
        </html>
    );
}
