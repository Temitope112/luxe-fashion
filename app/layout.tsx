import type { Metadata } from "next";
import "./globals.css";

import NavbarWrapper from "./components/layout/navbar/NavbarWrapper";
import FooterWrapper from "./components/layout/FooterWrapper";

export const metadata: Metadata = {
  title: "LuxeStore",
  description: "Premium Fashion Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <NavbarWrapper />

        <main className="flex-1">
          {children}
        </main>

        <FooterWrapper />
      </body>
    </html>
  );
}