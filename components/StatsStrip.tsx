type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "60", label: "Minute strategy call" },
  { value: "7", label: "Day starter plan" },
  { value: "300+", label: "Lessons & templates" }
];

export default function StatsStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center justify-between border border-black/10 bg-white px-4 py-5"
        >
          <div className="text-3xl font-semibold text-ink">{stat.value}</div>
          <div className="ml-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
            <span className="h-2 w-2 rounded-sm bg-accent" />
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
