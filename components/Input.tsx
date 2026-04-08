import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export default function Input({
  label,
  error,
  leftIcon,
  rightElement,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          {...props}
          className={[
            "w-full rounded-lg border bg-white dark:bg-slate-800",
            "text-slate-900 dark:text-slate-100",
            "placeholder:text-slate-400 dark:placeholder:text-slate-500",
            "transition-all duration-200",
            "py-2.5 text-sm",
            leftIcon ? "pl-10 pr-4" : "px-4",
            rightElement ? "pr-10" : "",
            error
              ? "border-red-400 dark:border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
              : "border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20",
            "outline-none",
            className,
          ].join(" ")}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, id, className = "", ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        {...props}
        className={[
          "w-full rounded-lg border bg-white dark:bg-slate-800",
          "text-slate-900 dark:text-slate-100",
          "placeholder:text-slate-400 dark:placeholder:text-slate-500",
          "transition-all duration-200 px-4 py-2.5 text-sm resize-y",
          "outline-none",
          error
            ? "border-red-400 dark:border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
            : "border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20",
          className,
        ].join(" ")}
      />
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}
