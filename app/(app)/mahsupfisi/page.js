"use client";

import { useState } from "react";

function StatusMessage({ status }) {
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

export default function MahsupFisiPage() {
  const [mahsupStatus, setMahsupStatus] = useState(null);
  const [mahsupLoading, setMahsupLoading] = useState(false);
  const [mahsupItems, setMahsupItems] = useState([]);
  const [mahsupListLoading, setMahsupListLoading] = useState(false);
  const [mahsupUserId, setMahsupUserId] = useState("");
  const [tediyeStatus, setTediyeStatus] = useState(null);
  const [tediyeLoading, setTediyeLoading] = useState(false);
  const [tediyeItems, setTediyeItems] = useState([]);
  const [tediyeListLoading, setTediyeListLoading] = useState(false);
  const [tediyeUserId, setTediyeUserId] = useState("");

  const fetchMahsupItems = async (userIdValue) => {
    const parsedUserId = Number(userIdValue);
    if (!Number.isInteger(parsedUserId)) {
      setMahsupStatus({
        type: "error",
        message: "User ID is required to load items.",
      });
      return;
    }

    setMahsupListLoading(true);
    try {
      const response = await fetch(
        `/api/mahsupfisi?userId=${encodeURIComponent(parsedUserId)}`
      );
      const data = await response.json();

      if (!response.ok) {
        setMahsupStatus({
          type: "error",
          message: data?.error || "Failed to load items.",
        });
        return;
      }

      setMahsupItems(Array.isArray(data.items) ? data.items : []);
    } catch (error) {
      console.error("Mahsup list failed:", error);
      setMahsupStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setMahsupListLoading(false);
    }
  };

  const fetchTediyeItems = async (userIdValue) => {
    const parsedUserId = Number(userIdValue);
    if (!Number.isInteger(parsedUserId)) {
      setTediyeStatus({
        type: "error",
        message: "User ID is required to load items.",
      });
      return;
    }

    setTediyeListLoading(true);
    try {
      const response = await fetch(
        `/api/tediye?userId=${encodeURIComponent(parsedUserId)}`
      );
      const data = await response.json();

      if (!response.ok) {
        setTediyeStatus({
          type: "error",
          message: data?.error || "Failed to load items.",
        });
        return;
      }

      setTediyeItems(Array.isArray(data.items) ? data.items : []);
    } catch (error) {
      console.error("Tediye list failed:", error);
      setTediyeStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setTediyeListLoading(false);
    }
  };

  const handleMahsupSubmit = async (event) => {
    event.preventDefault();
    setMahsupLoading(true);
    setMahsupStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const userIdValue = formData.get("userId");
    const payload = {
      name: formData.get("name"),
      amount: formData.get("amount"),
      userId: userIdValue,
    };

    try {
      const response = await fetch("/api/mahsupfisi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setMahsupStatus({
          type: "error",
          message: data?.error || "Failed to save item.",
        });
        return;
      }

      setMahsupStatus({ type: "success", message: "Item saved." });
      setMahsupUserId(userIdValue);
      await fetchMahsupItems(userIdValue);
      form.reset();
    } catch (error) {
      console.error("Mahsup submit failed:", error);
      setMahsupStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setMahsupLoading(false);
    }
  };

  const handleMahsupDelete = async (id) => {
    try {
      const response = await fetch(`/api/mahsupfisi?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        setMahsupStatus({
          type: "error",
          message: data?.error || "Failed to delete item.",
        });
        return;
      }

      setMahsupItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Mahsup delete failed:", error);
      setMahsupStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    }
  };

  const handleTediyeSubmit = async (event) => {
    event.preventDefault();
    setTediyeLoading(true);
    setTediyeStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const userIdValue = formData.get("userId");
    const payload = {
      name: formData.get("name"),
      amount: formData.get("amount"),
      userId: userIdValue,
    };

    try {
      const response = await fetch("/api/tediye", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setTediyeStatus({
          type: "error",
          message: data?.error || "Failed to save item.",
        });
        return;
      }

      setTediyeStatus({ type: "success", message: "Item saved." });
      setTediyeUserId(userIdValue);
      await fetchTediyeItems(userIdValue);
      form.reset();
    } catch (error) {
      console.error("Tediye submit failed:", error);
      setTediyeStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setTediyeLoading(false);
    }
  };

  const handleTediyeDelete = async (id) => {
    try {
      const response = await fetch(`/api/tediye?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        setTediyeStatus({
          type: "error",
          message: data?.error || "Failed to delete item.",
        });
        return;
      }

      setTediyeItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Tediye delete failed:", error);
      setTediyeStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    }
  };

  return (
    <section className="min-h-full rounded-3xl border border-dashed border-slate-200/70 bg-white/60 p-10 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Mahsup Fisi
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add a name and amount, then submit.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Mahsup Fisi
            </h2>
            <form className="mt-4 space-y-4" onSubmit={handleMahsupSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="mahsup-name"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Name
                </label>
                <input
                  id="mahsup-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Item name"
                  className="w-full rounded-lg border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="mahsup-amount"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Amount
                </label>
                <input
                  id="mahsup-amount"
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
                  htmlFor="mahsup-userId"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  User ID
                </label>
                <input
                  id="mahsup-userId"
                  name="userId"
                  type="number"
                  step="1"
                  min="1"
                  required
                  placeholder="1"
                  className="w-full rounded-lg border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <StatusMessage status={mahsupStatus} />

              <button
                type="submit"
                disabled={mahsupLoading}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {mahsupLoading ? "Saving..." : "Save"}
              </button>
            </form>

            <div className="mt-6 border-t border-slate-200/70 pt-4 dark:border-slate-800/80">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Saved items
                </h3>
                <button
                  type="button"
                  onClick={() => fetchMahsupItems(mahsupUserId)}
                  disabled={!mahsupUserId || mahsupListLoading}
                  className="text-xs font-semibold text-blue-600 transition hover:text-blue-500 disabled:cursor-not-allowed disabled:text-slate-400 dark:text-blue-400"
                >
                  {mahsupListLoading ? "Loading..." : "Refresh"}
                </button>
              </div>

              <div className="mt-3 space-y-2">
                {mahsupListLoading ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Loading items...
                  </p>
                ) : mahsupItems.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    No items yet.
                  </p>
                ) : (
                  mahsupItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-white/70 px-3 py-2 text-sm text-slate-700 dark:border-slate-800/80 dark:bg-slate-900/60 dark:text-slate-200"
                    >
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center gap-3">
                        <span>{item.amount}</span>
                        <button
                          type="button"
                          onClick={() => handleMahsupDelete(item.id)}
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
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Tediye Fisi
            </h2>
            <form className="mt-4 space-y-4" onSubmit={handleTediyeSubmit}>
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

              <StatusMessage status={tediyeStatus} />

              <button
                type="submit"
                disabled={tediyeLoading}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                {tediyeLoading ? "Saving..." : "Save"}
              </button>
            </form>

            <div className="mt-6 border-t border-slate-200/70 pt-4 dark:border-slate-800/80">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Saved items
                </h3>
                <button
                  type="button"
                  onClick={() => fetchTediyeItems(tediyeUserId)}
                  disabled={!tediyeUserId || tediyeListLoading}
                  className="text-xs font-semibold text-blue-600 transition hover:text-blue-500 disabled:cursor-not-allowed disabled:text-slate-400 dark:text-blue-400"
                >
                  {tediyeListLoading ? "Loading..." : "Refresh"}
                </button>
              </div>

              <div className="mt-3 space-y-2">
                {tediyeListLoading ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Loading items...
                  </p>
                ) : tediyeItems.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    No items yet.
                  </p>
                ) : (
                  tediyeItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-white/70 px-3 py-2 text-sm text-slate-700 dark:border-slate-800/80 dark:bg-slate-900/60 dark:text-slate-200"
                    >
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center gap-3">
                        <span>{item.amount}</span>
                        <button
                          type="button"
                          onClick={() => handleTediyeDelete(item.id)}
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
          </div>
        </div>
      </div>
    </section>
  );
}
