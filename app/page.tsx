import type { Metadata } from "next";
import { fetchUsers } from "@/lib/api";
import UsersClient from "./UsersClient";

export const metadata: Metadata = {
  title: "User Directory - Task 2",
  description:
    "Browse all users, filter by name or email, and explore their posts in this modern dashboard.",
};

// Server Component — fetches users via SSR
export default async function HomePage() {
  // Pre-fetch on server for SSR (data is also refetched on client via useEffect for reactivity)
  try {
    await fetchUsers();
  } catch {
    // Client handles error state gracefully
  }

  return <UsersClient />;
}
