"use client";

import { useState } from "react";

function StatusMessage({ status }) {
  if (!status?.message) {
    return null;
  }

  const baseClasses =
    "rounded-lg border px-3 py-2 text-sm " +
    (status.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200"
      : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-950/40 dark:text-rose-200");

  return (
    <p className={baseClasses} role="status" aria-live="polite">
      {status.message}
    </p>
  );
}

export default function LoginPage() {
  const [registerStatus, setRegisterStatus] = useState(null);
  const [loginStatus, setLoginStatus] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setRegisterLoading(true);
    setRegisterStatus(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setRegisterStatus({
          type: "error",
          message: data?.error || "Registration failed.",
        });
        return;
      }

      setRegisterStatus({
        type: "success",
        message: "Account created. You can log in now.",
      });
      event.currentTarget.reset();
    } catch (error) {
      setRegisterStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginLoading(true);
    setLoginStatus(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setLoginStatus({
          type: "error",
          message: data?.error || "Login failed.",
        });
        return;
      }

      setLoginStatus({
        type: "success",
        message: data?.message || "Login successful.",
      });
      event.currentTarget.reset();
    } catch (error) {
      setLoginStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-5xl space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
            Welcome
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Register or log in to access your account.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950">
            <div className="mb-6 space-y-2">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Create account
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                New here? Register in a minute.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleRegister}>
              <div className="space-y-2">
                <label
                  htmlFor="register-name"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Name
                </label>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="register-email"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Email
                </label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="register-password"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Password
                </label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  required
                  placeholder="Create a password"
                  className="w-full rounded-lg border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <StatusMessage status={registerStatus} />

              <button
                type="submit"
                disabled={registerLoading}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {registerLoading ? "Creating..." : "Register"}
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950">
            <div className="mb-6 space-y-2">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Sign in
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Welcome back. Enter your credentials.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label
                  htmlFor="login-email"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Your password"
                  className="w-full rounded-lg border border-slate-200/70 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <StatusMessage status={loginStatus} />

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                {loginLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
