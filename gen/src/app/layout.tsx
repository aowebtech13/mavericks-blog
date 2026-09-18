import SmoothScrollProvider from '@/src/components/animation/smooth-scroll';
import Footer from '@/src/components/shared/layout/footer/footer';
import Navbar from '@/src/components/shared/layout/navbar/navbar';
import { ReactNode, Suspense } from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-system antialiased">
        <Suspense>
          <SmoothScrollProvider>
            <Navbar />
            <main className="bg-background-5">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </Suspense>
      </body>
    </html>
  );
}
