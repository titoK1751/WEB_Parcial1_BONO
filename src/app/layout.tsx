import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/shared/ui/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parcial 1 - Bono",
  description: "Aplicacion de propiedades hecha para un bono de ISIS3710 - Programacion con Tecnologias Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const routes = [
    { name: "Propiedades" , path: ""},
    { name: "Mapa", path: "mapa"}
  ]

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header routes = {routes}/>
        {children}
      </body>
    </html>
  );
}
