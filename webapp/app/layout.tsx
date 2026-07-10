import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "EdigDaya — EdigDev",
  description:
    "Platform keterlibatan masyarakat dalam berkoperasi — Hackathon Digital Cooperatives Expo 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <nav className="nav">
          <span className="brand">EdigDaya</span>
          <Link href="/">Beranda</Link>
          <Link href="/koperasi">Dashboard Koperasi</Link>
          <Link href="/dashboard">Dashboard Nasional</Link>
          <Link href="/registrasi">Registrasi Terpandu</Link>
          <Link href="/erat">e-RAT</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
