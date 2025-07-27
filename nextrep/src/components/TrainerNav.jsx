"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function TrainerNav() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="font-bold text-lg mb-4">Trainer Panel</h2>
      <ul className="space-y-2">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/dashboard/clients">Clients</Link></li>
      </ul>
      <div className="mt-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );
}
