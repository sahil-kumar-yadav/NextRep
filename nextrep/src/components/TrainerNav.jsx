"use client";

import Link from "next/link";

export default function TrainerNav() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between">
      <div className="flex gap-4">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/dashboard/clients" className="hover:underline">Clients</Link>
      </div>
      <Link href="/sign-out" className="hover:underline text-red-400">Sign Out</Link>
    </nav>
  );
}
