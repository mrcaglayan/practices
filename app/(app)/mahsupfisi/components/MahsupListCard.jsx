"use client";

import { useEffect, useState } from "react";
import StatusMessage from "./StatusMessage";

const MAHSUP_LIST_EVENT = "mahsup:list-updated";

export default function MahsupListCard() {
  const [status, setStatus] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const fetchItems = async (userIdValue) => {
    const parsedUserId = Number(userIdValue);
    if (!Number.isInteger(parsedUserId)) {
      setStatus({
        type: "error",
        message: "User ID is required to load items.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/mahsupfisi?userId=${encodeURIComponent(parsedUserId)}`
      );
      const data = await response.json();

      if (!response.ok) {
        setStatus({
          type: "error",
          message: data?.error || "Failed to load items.",
        });
        return;
      }

      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (error) {
      console.error("Mahsup list failed:", error);
      setStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/mahsupfisi?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus({
          type: "error",
          message: data?.error || "Failed to delete item.",
        });
        return;
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Mahsup delete failed:", error);
      setStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    }
  };

  useEffect(() => {
    const handler = (event) => {
      const incomingUserId = event?.detail;
      if (incomingUserId) {
        setUserId(String(incomingUserId));
        fetchItems(incomingUserId);
      }
    };

    window.addEventListener(MAHSUP_LIST_EVENT, handler);
    return () => window.removeEventListener(MAHSUP_LIST_EVENT, handler);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Mahsup Fisi - Items
      </h2>

      <div className="mt-4 flex items-center gap-3">
        <input
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          type="number"
          min="1"
          placeholder="User ID"
          className="w-28 rounded-lg border border-slate-200/70 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
        />
        <button
          type="button"
          onClick={() => fetchItems(userId)}
          disabled={!userId || loading}
          className="text-xs font-semibold text-blue-600 transition hover:text-blue-500 disabled:cursor-not-allowed disabled:text-slate-400 dark:text-blue-400"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      <StatusMessage status={status} />

      <div className="mt-4 space-y-2">
        {loading ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Loading items...
          </p>
        ) : items.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No items yet.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-white/70 px-3 py-2 text-sm text-slate-700 dark:border-slate-800/80 dark:bg-slate-900/60 dark:text-slate-200"
            >
              <span className="font-medium">{item.name}</span>
              <div className="flex items-center gap-3">
                <span>{item.amount}</span>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="text-xs font-semibold text-rose-600 transition hover:text-rose-500 dark:text-rose-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
