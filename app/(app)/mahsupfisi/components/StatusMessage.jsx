"use client";

export default function StatusMessage({ status }) {
  if (!status?.message) {
    return null;
  }

  return (
    <p
      className={`rounded-lg border px-3 py-2 text-sm ${
        status.type === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200"
          : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-950/40 dark:text-rose-200"
      }`}
      role="status"
      aria-live="polite"
    >
      {status.message}
    </p>
  );
}
