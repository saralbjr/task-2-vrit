"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Post } from "@/types";
import { fetchPostsByUser } from "@/lib/api";
import { useDashboardStore } from "@/store/useStore";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import AddPostForm from "@/components/AddPostForm";
import PageHeader from "@/components/PageHeader";
import {
  LoadingPostsState,
  ErrorState,
  EmptyState,
} from "@/components/StatusComponents";

interface UserPostsClientProps {
  user: User;
  userId: number;
}

export default function UserPostsClient({ user, userId }: UserPostsClientProps) {
  const {
    posts,
    setPosts,
    localPosts,
    currentPage,
    setCurrentPage,
    postsPerPage,
  } = useDashboardStore();
  const [apiIsLoading, setApiIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPostsByUser(userId)
      .then((data) => {
        setPosts(data);
        setError(null);
      })
      .catch(() => setError("Failed to load posts. Please try again."))
      .finally(() => setApiIsLoading(false));
    setCurrentPage(1);
  }, [userId, setPosts, setCurrentPage]);

  const userLocalPosts = localPosts.filter((p) => p.userId === userId);
  const allPosts: (Post & { isLocal?: boolean })[] = [
    ...userLocalPosts.map((p) => ({ ...p, isLocal: true })),
    ...posts,
  ];

  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <main>
      {/* Back link */}
      <Link
        href="/"
        id="back-to-users-link"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary font-medium transition-colors duration-200 mb-6"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Users
      </Link>

      {/* User profile banner */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8 flex items-center gap-5 shadow-sm">
        <div className="w-14 h-14 rounded-xl bg-primary-light dark:bg-primary/20 flex items-center justify-center text-primary font-bold text-lg shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {user.name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
            <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <title>Email</title>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {user.email}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <title>Company</title>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
              {user.company.name}
            </span>
          </div>
        </div>
      </div>

      {/* Posts header */}
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            Posts
            {!apiIsLoading && !error && (
              <span className="text-base font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                {allPosts.length}
              </span>
            )}
          </span>
        }
      >
        <AddPostForm userId={userId} />
      </PageHeader>

      {/* States */}
      {apiIsLoading && <LoadingPostsState />}
      {!apiIsLoading && error && <ErrorState message={error} />}

      {!apiIsLoading && !error && allPosts.length === 0 && (
        <EmptyState
          title="No posts yet"
          description="Be the first to add a post for this user!"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          }
        />
      )}

      {/* Posts list */}
      {!apiIsLoading && !error && paginatedPosts.length > 0 && (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {paginatedPosts.map((post) => (
              <PostCard
                key={`${post.isLocal ? "local" : "api"}-${post.id}`}
                post={post}
                isLocal={post.isLocal}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </main>
  );
}
