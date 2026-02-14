type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "30", label: "Minute call" },
  { value: "70+", label: "Partners" },
  { value: "300+", label: "Clients helped" }
];

export default function StatsStrip() {
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-h-[88px] items-center justify-between border border-black/10 bg-white px-4 py-5"
          >
            <div className="text-3xl font-semibold text-ink">{stat.value}</div>
            <div className="ml-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
              <span className="h-2 w-2 rounded-sm bg-accent" />
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <div className="overflow-hidden border border-black/10 bg-white">
        <div className="marquee whitespace-nowrap px-4 py-3 text-xs uppercase tracking-[0.25em] text-muted">
          <span>TD Bank</span>
          <span className="mx-6 text-accent">•</span>
          <span>Equitable</span>
          <span className="mx-6 text-accent">•</span>
          <span>BMO</span>
          <span className="mx-6 text-accent">•</span>
          <span>RBC</span>
          <span className="mx-6 text-accent">•</span>
          <span>Manulife</span>
          <span className="mx-6 text-accent">•</span>
          <span>CIBC</span>
        </div>
      </div>
    </div>
  );
}
