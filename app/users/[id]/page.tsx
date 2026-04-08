import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchUsers } from "@/lib/api";
import UserPostsClient from "./UserPostsClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const users = await fetchUsers();
    const user = users.find((u) => u.id === Number(id));
    if (!user) return { title: "User Not Found" };
    return {
      title: `${user.name}'s Posts | UserDash`,
      description: `View all posts by ${user.name} from ${user.company.name}.`,
    };
  } catch {
    return { title: "User Posts | UserDash" };
  }
}

// Server Component — SSR user fetch
export default async function UserPostsPage({ params }: Props) {
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId)) notFound();

  const users = await fetchUsers();
  const user = users.find((u) => u.id === userId);

  if (!user) notFound();

  return <UserPostsClient user={user} userId={userId} />;
}
