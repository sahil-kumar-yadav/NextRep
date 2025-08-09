// app/dashboard/layout.js
import Link from "next/link";
import { getDevUser } from "@/lib/getDevUser";

export default async function DashboardLayout({ children }) {
  // ✅ Don't hardcode role — makes it usable for both trainer/client views
  const user = await getDevUser();

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500">
        No user found. Please seed the database or log in.
      </div>
    );
  }

  // ✅ Config-based navigation for cleaner code
  const navLinks = {
    TRAINER: [
      { href: "/dashboard/trainer", label: "Trainer Home" },
      { href: "/dashboard/trainer/clients", label: "Manage Clients" },
      { href: "/dashboard/trainer/plans", label: "Plans" },
    ],
    CLIENT: [
      { href: "/dashboard/client", label: "Client Home" },
      { href: "/dashboard/client/progress", label: "My Progress" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-gray-100 border-b border-gray-300 p-4 flex flex-wrap items-center justify-between">
        <span className="text-sm text-gray-600 mb-2 sm:mb-0">
          Logged in as: <strong>{user.name}</strong> ({user.role})
        </span>
        <div className="space-x-4">
          {navLinks[user.role]?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-blue-600 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
