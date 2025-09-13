import type { Metadata } from "next";
import "./globals.css";
import NavbarClient from "./components/NavbarClient";
import FooterClient from "./components/FooterClient";
import ProvidersClient from "./components/ProviderClients";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foodpanda",
  description: "Restaurant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProvidersClient>
          <NavbarClient />
          <main>{children}</main>
          <FooterClient />
        </ProvidersClient>
      </body>
    </html>
  );
}
