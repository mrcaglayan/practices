"use client";

import { useState } from "react";

export default function MahsupFisiPage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      amount: formData.get("amount"),
      userId: formData.get("userId"),
    };

    try {
      const response = await fetch("/api/mahsupfisi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();


      if (!response.ok) {
        setStatus({
          type: "error",
          message: data?.error || "Failed to save item.",
        });
        return;
      }

      setStatus({ type: "success", message: "Item saved." });
      event.currentTarget.reset();
      console.log(event.currentTarget);
    } catch (error) {
      console.error("Submit failed:", error);
      setStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-full rounded-3xl border border-dashed border-slate-200/70 bg-white/60 p-10 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950">
      <div className="max-w-xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Mahsup Fişi
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add a name and amount, then submit.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Item name"
              className="w-full rounded-lg border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="userId"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              User ID
            </label>
            <input
              id="userId"
              name="userId"
              type="number"
              step="1"
              min="1"
              required
              placeholder="1"
              className="w-full rounded-lg border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          {status?.message ? (
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
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </section>
  );
}
