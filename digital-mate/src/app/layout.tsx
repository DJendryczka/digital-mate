import "./globals.css";
import { Home, CheckSquare, Calendar, Bell, CloudSun } from "lucide-react";
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
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="w-16 bg-white border-r shadow flex flex-col items-center py-4 space-y-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              <Home size={24} />
            </Link>
            <Link href="/tasks" className="text-gray-600 hover:text-blue-600">
              <CheckSquare size={24} />
            </Link>
            <Link
              href="/calendar"
              className="text-gray-600 hover:text-blue-600"
            >
              <Calendar size={24} />
            </Link>
            <Link
              href="/reminders"
              className="text-gray-600 hover:text-blue-600"
            >
              <Bell size={24} />
            </Link>
            <Link href="/weather" className="text-gray-600 hover:text-blue-600">
              <CloudSun size={24} />
            </Link>
          </aside>

          {/* Główna treść */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
