import Link from "next/link";
import { Home, User } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-slate-200/70 bg-white/80 p-6 text-slate-900 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950 dark:text-slate-100">
        <div className="mb-10 flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          My App
        </div>

        <nav className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            <User className="h-4 w-4" />
            About
          </Link>
        </nav>

        <div className="mt-auto flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>v1.0.0</span>
          <ThemeToggle />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-10">{children}</main>
    </div>
  );
}
