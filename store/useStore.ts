import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Post, NewPost } from "@/types";

interface DashboardState {
  // Users
  users: User[];
  setUsers: (users: User[]) => void;

  // Posts
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: NewPost) => void;
  localPosts: Post[];

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  postsPerPage: number;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      users: [],
      setUsers: (users) => set({ users }),

      posts: [],
      setPosts: (posts) => set({ posts }),
      localPosts: [],
      addPost: (newPost: NewPost) => {
        const allPosts = [...get().posts, ...get().localPosts];
        const maxId = allPosts.reduce((max, p) => Math.max(max, p.id), 0);
        const post: Post = {
          ...newPost,
          id: maxId + 1,
        };
        set((state) => ({ localPosts: [...state.localPosts, post] }));
      },

      searchQuery: "",
      setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),

      currentPage: 1,
      setCurrentPage: (currentPage) => set({ currentPage }),
      postsPerPage: 5,
    }),
    {
      name: "dashboard-storage",
      partialize: (state) => ({ localPosts: state.localPosts }),
    }
  )
);
