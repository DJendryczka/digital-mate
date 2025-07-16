import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Mate",
  description: "Your personal life assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow p-4">
          <nav className="max-w-4xl mx-auto flex justify-between">
            <span className="text-xl font-bold text-blue-600">
              Digital Mate
            </span>
            <div className="space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/tasks" className="text-gray-700 hover:text-blue-600">
                Tasks
              </Link>
              <Link
                href="/calendar"
                className="text-gray-700 hover:text-blue-600"
              >
                Calendar
              </Link>
              <Link
                href="/reminders"
                className="text-gray-700 hover:text-blue-600"
              >
                Reminders
              </Link>
            </div>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
