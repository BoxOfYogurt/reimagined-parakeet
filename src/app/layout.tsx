import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

const DMSans = localFont({
  src: "./dm-sans-normal.woff2",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently Asked Questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className={`${DMSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
