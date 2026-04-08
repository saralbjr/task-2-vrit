"use client";

import { useEffect, useMemo, useState } from "react";
import { useDashboardStore } from "@/store/useStore";
import { fetchUsers } from "@/lib/api";
import UserCard from "@/components/UserCard";
import SearchBar from "@/components/SearchBar";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "@/components/StatusComponents";

export default function UsersClient() {
  const { users, setUsers, searchQuery, setSearchQuery } = useDashboardStore();
  const [apiIsLoading, setApiIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setError(null);
      })
      .catch(() => setError("Failed to load users. Please try again."))
      .finally(() => setApiIsLoading(false));
  }, [setUsers]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  return (
    <main>
      <PageHeader
        title="User Directory"
        subtitle="Browse all users and explore their posts"
      >
        {!apiIsLoading && !error && (
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            {filteredUsers.length}{" "}
            {filteredUsers.length === 1 ? "user" : "users"}
          </span>
        )}
      </PageHeader>

      {/* Search */}
      <div className="mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* States */}
      {apiIsLoading && <LoadingState />}
      {!apiIsLoading && error && <ErrorState message={error} />}

      {!apiIsLoading && !error && filteredUsers.length === 0 && (
        <EmptyState
          title="No users found"
          description={`No users match "${searchQuery}". Try a different name or email.`}
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </Button>
          }
        />
      )}

      {/* Grid */}
      {!apiIsLoading && !error && filteredUsers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </main>
  );
}
