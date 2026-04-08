"use client";

import { useState } from "react";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
  isLocal?: boolean;
}

export default function PostCard({ post, isLocal = false }: PostCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <article
        onClick={() => setIsOpen(true)}
        className={[
          "bg-white dark:bg-slate-800 rounded-2xl border p-7 transition-all duration-300 cursor-pointer group",
          "flex flex-col items-center justify-center text-center",
          "hover:-translate-y-1 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md hover:shadow-primary/5",
          isLocal
            ? "border-b-4 border-b-primary border-slate-200 dark:border-slate-700"
            : "border-slate-200 dark:border-slate-700",
        ].join(" ")}
      >
        {/* Header row */}
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <span className="text-xs font-mono font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1 rounded-md">
            #{post.id}
          </span>
          {isLocal && (
            <span className="text-[11px] font-bold text-primary bg-primary-light dark:bg-primary/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
              New
            </span>
          )}
        </div>

        {/* Post content preview */}
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 capitalize leading-snug mb-3 max-w-[90%] mx-auto group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <div 
          className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 [&>p]:inline"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
        
        <div className="mt-4 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          Read full post
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </article>

      {/* Full Post Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 dark:bg-slate-900/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-xs font-mono font-medium text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-700 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600">
                    Post #{post.id}
                  </span>
                  {isLocal && (
                    <span className="text-[11px] font-bold text-primary bg-primary-light dark:bg-primary/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Author
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 capitalize leading-snug tracking-tight">
                  {post.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto bg-white dark:bg-slate-800">
              <div 
                className="text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed [&_p]:mb-4 [&_strong]:text-slate-900 dark:[&_strong]:text-slate-100 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:text-slate-900 dark:[&_h1]:text-slate-100 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:text-slate-900 dark:[&_h2]:text-slate-100 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-600 dark:[&_blockquote]:text-slate-400"
                dangerouslySetInnerHTML={{ __html: post.body }} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
