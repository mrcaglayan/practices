"use client";

import { useState } from "react";
import StatusMessage from "./StatusMessage";

const TEDIYE_LIST_EVENT = "tediye:list-updated";

export default function TediyeFormCard() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      amount: formData.get("amount"),
      userId: formData.get("userId"),
    };

    try {
      const response = await fetch("/api/tediye", {
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
      form.reset();
      window.dispatchEvent(
        new CustomEvent(TEDIYE_LIST_EVENT, { detail: payload.userId })
      );
    } catch (error) {
      console.error("Tediye submit failed:", error);
      setStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Tediye Fisi - Inputs
      </h2>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="tediye-name"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Name
          </label>
          <input
            id="tediye-name"
            name="name"
            type="text"
            required
            placeholder="Item name"
            className="w-full rounded-lg border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="tediye-amount"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Amount
          </label>
          <input
            id="tediye-amount"
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
            htmlFor="tediye-userId"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            User ID
          </label>
          <input
            id="tediye-userId"
            name="userId"
            type="number"
            step="1"
            min="1"
            required
            placeholder="1"
            className="w-full rounded-lg border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        <StatusMessage status={status} />

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
