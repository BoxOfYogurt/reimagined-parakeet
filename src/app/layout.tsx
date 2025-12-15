import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import { WaveBanner } from '@/app/_components';
import { ApplicationLayout } from '@/library';
import '@/styles/globals.css';

const DMSans = localFont({
  src: './_font/dm-sans-normal.woff2',
  variable: '--font-dm-sans',
  preload: true,
  fallback: ['Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Novacare technical assignment',
  description: 'The Novacare technical assignment project, built with Next.js and Contentful.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className={`${DMSans.variable} min-h-screen antialiased`}>
        <header className="h-dynamic-header-height">
          <ApplicationLayout width="large" className="h-full items-center">
            <div className="relative inline-block">
              <span className="typography-heading-base-bold sm:typography-heading-lg-bold">
                Novacare
              </span>
              <Link href="/" className="before:absolute before:inset-0">
                <span className="sr-only">go to startpage</span>
              </Link>
            </div>
            <p className="typography-sm-regular text-subtle">Task Assignment</p>
          </ApplicationLayout>
        </header>
        <main className="min-h-content-height relative pb-20 sm:pb-24">
          {children}
          <div className="absolute inset-x-0 bottom-0 h-24">
            <WaveBanner />
          </div>
        </main>
        <footer className="bg-bg-sunken py-5">
          <ApplicationLayout width="small">
            <p className="typography-sm-regular text-subtle text-center">
              Created by Mads Østrem - 2025
            </p>
          </ApplicationLayout>
        </footer>
      </body>
    </html>
  );
}
