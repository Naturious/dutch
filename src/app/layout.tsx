import type { Metadata } from "next";
import Link from "next/link";
import GlobalShortcuts from "@/components/GlobalShortcuts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nederlandse Grammatica Oefenen",
  description: "Leer Nederlandse grammatica met interactieve oefeningen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased min-h-screen">
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-bold text-blue-700 hover:text-blue-800 transition-colors"
            >
              Nederlandse Grammatica
            </Link>
            <Link
              href="/"
              className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
            >
              Alle oefeningen
            </Link>
          </div>
        </nav>
        <GlobalShortcuts />
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
