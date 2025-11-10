import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home Energy Tracker",
  description: "Track and analyze your household energy consumption",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
