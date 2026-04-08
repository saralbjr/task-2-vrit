"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostFormValues } from "@/lib/schemas";
import { useDashboardStore } from "@/store/useStore";
import Button from "@/components/Button";
import Input from "@/components/Input";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface AddPostFormProps {
  userId: number;
}

export default function AddPostForm({ userId }: AddPostFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const addPost = useDashboardStore((s) => s.addPost);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const onSubmit = async (data: PostFormValues) => {
    addPost({ ...data, userId });
    setSubmitted(true);
    reset();
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <>
      <Button
        id="add-post-toggle-btn"
        variant="primary"
        size="md"
        onClick={() => setIsOpen(true)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Post
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 dark:bg-slate-900/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-2xl flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Create New Post
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              {submitted ? (
                <div
                  className="flex items-center justify-center gap-3 bg-primary-light dark:bg-primary/20 text-primary dark:text-blue-400 rounded-xl p-8 text-base font-medium border border-primary/20 animate-in zoom-in-95"
                  role="alert"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-primary dark:text-blue-400">Post published successfully!</span>
                </div>
              ) : (
                <form id="add-post-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                  {/* Title Field */}
                  <Input
                    id="post-title-input"
                    label="Title"
                    type="text"
                    placeholder="Enter post title..."
                    error={errors.title?.message}
                    {...register("title")}
                  />

                  {/* Rich Text Editor Field */}
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Body Content
                    </label>
                    <div className={`rounded-xl border ${errors.body ? "border-red-500" : "border-slate-200 dark:border-slate-700"} overflow-hidden bg-white dark:bg-slate-900 group transition-colors`}>
                      <Controller
                        name="body"
                        control={control}
                        render={({ field }) => (
                          <ReactQuill
                            theme="snow"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Write your post content here..."
                            className="bg-white dark:bg-slate-900 [&_.ql-toolbar]:bg-slate-50 dark:[&_.ql-toolbar]:bg-slate-800/50 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:!border-slate-200 dark:[&_.ql-toolbar]:!border-slate-700 [&_.ql-container]:border-none [&_.ql-container]:min-h-[220px] [&_.ql-editor]:text-slate-800 dark:[&_.ql-editor]:text-slate-200 [&_.ql-editor.ql-blank::before]:!text-slate-400 [&_.ql-editor.ql-blank::before]:!opacity-100 dark:[&_.ql-editor.ql-blank::before]:!text-slate-400 dark:[&_.ql-editor.ql-blank::before]:!opacity-100 dark:[&_.ql-stroke]:!stroke-slate-400 dark:[&_.ql-fill]:!fill-slate-400 dark:[&_.ql-picker]:!text-slate-300 transition-colors"
                          />
                        )}
                      />
                    </div>
                    {errors.body && (
                      <p className="text-xs font-medium text-red-500 mt-1.5">{errors.body.message}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-700/50 mt-8">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleClose}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      id="add-post-submit-btn"
                      type="submit"
                      variant="primary"
                      size="md"
                      loading={isSubmitting}
                      className="min-w-[120px]"
                    >
                      {isSubmitting ? "Publishing..." : "Publish Post"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
