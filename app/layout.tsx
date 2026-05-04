import type { Metadata } from "next";
import { Lora, Syne } from "next/font/google";

import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tsa-inc.ca"),
  title: {
    default: "Traffic Survey Analysis Inc.",
    template: "%s | Traffic Survey Analysis Inc.",
  },
  description:
    "Traffic Survey Analysis Inc. delivers traffic monitoring and transportation data collection services across Canada.",
  applicationName: "TSA Inc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${lora.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-paper font-body text-ink antialiased">{children}</body>
    </html>
  );
}
