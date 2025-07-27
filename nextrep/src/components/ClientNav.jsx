"use client";

import Link from "next/link";

export default function ClientNav() {
  return (
    <nav className="bg-green-700 text-white px-6 py-3 flex justify-between">
      <div className="flex gap-4">
        <Link href="/client" className="hover:underline">My Plans</Link>
        <Link href="/client/progress" className="hover:underline">Progress</Link>
      </div>
      <Link href="/sign-out" className="hover:underline text-red-300">Sign Out</Link>
    </nav>
  );
}
