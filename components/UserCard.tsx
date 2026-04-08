"use client";

import Link from "next/link";
import { User } from "@/types";
import Button from "@/components/Button";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-5 hover:-translate-y-1 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-primary-light dark:bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
            {user.name}
          </h2>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
          <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <title>Email</title>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
          <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <title>Company</title>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
          <span className="truncate">{user.company.name}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-1 mt-auto">
        <Link href={`/users/${user.id}`} className="block">
          <Button variant="primary" size="md" className="w-full">
            View Posts
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Button>
        </Link>
      </div>
    </div>
  );
}
