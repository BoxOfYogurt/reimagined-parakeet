import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { ApplicationLayout } from "@/library";
import Link from "next/link";
import { BottomDecoration } from "@/components";

const DMSans = localFont({
  src: "./dm-sans-normal.woff2",
  variable: "--font-dm-sans",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Novacare technical assignment",
  description:
    "The Novacare technical assignment project, built with Next.js and Contentful.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className={`${DMSans.variable} antialiased min-h-screen`}>
        <header className="h-header-height py-5">
          <ApplicationLayout>
            <div className="relative inline-block">
              <h1 className="typography-heading-base-bold sm:typography-heading-lg-bold">
                Novacare
              </h1>
              <Link href="/" className="before:absolute before:inset-0">
                <span className="sr-only">Gå til forsiden</span>
              </Link>
            </div>
            <p className="typography-sm-regular text-subtle">Task Assignment</p>
          </ApplicationLayout>
        </header>
        <main className="relative min-h-content-height pb-10">
          {children}
          <div className="absolute inset-x-0 bottom-0">
            <BottomDecoration />
          </div>
        </main>
        <footer className="py-5 bg-surface-brand-sunken">
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
