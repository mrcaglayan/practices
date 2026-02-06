import MahsupFormCard from "./components/MahsupFormCard";
import MahsupListCard from "./components/MahsupListCard";
import TediyeFormCard from "./components/TediyeFormCard";
import TediyeListCard from "./components/TediyeListCard";

export default function MahsupFisiPage() {
  return (
    <section className="min-h-full rounded-3xl border border-dashed border-slate-200/70 bg-white/60 p-10 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Mahsup Fisi
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add items and review them in the cards below.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <MahsupFormCard />
          <MahsupListCard />
          <TediyeFormCard />
          <TediyeListCard />
        </div>
      </div>
    </section>
  );
}
