
import { fontVariables } from '@/src/utils/font';
import { ReactNode, Suspense } from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <Suspense>

      
            <main className="bg-background-5">{children}</main>
       
  
        </Suspense>
      </body>
    </html>
  );
}
