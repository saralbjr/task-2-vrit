// Loading States
export function LoadingState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 gap-4"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-10 h-10 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-primary animate-spin" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        Loading users...
      </p>
    </div>
  );
}

export function LoadingPostsState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 gap-4"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-10 h-10 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-primary animate-spin" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        Loading posts...
      </p>
    </div>
  );
}

// Error State
interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 gap-3 text-center"
      role="alert"
    >
      <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 dark:text-red-400">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
        Something went wrong
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        {message ?? "An unexpected error occurred. Please try again."}
      </p>
    </div>
  );
}

// Empty State
interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
        {icon ?? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        )}
      </div>
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{title}</p>
      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
