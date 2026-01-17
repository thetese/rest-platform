import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-sm text-slate-500">Restaurant Management Platform</p>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/" className="hover:text-blue-600">Dashboard</Link>
            <Link href="/pos" className="hover:text-blue-600">POS</Link>
            <Link href="/kds" className="hover:text-blue-600">Kitchen</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-6">{children}</main>
    </div>
  );
}
