const STATS = [
  { value: "35", label: "Sahih adhkar" },
  { value: "9", label: "Daily practices" },
  { value: "3", label: "Breath patterns" },
  { value: "1", label: "Listening companion" },
];

export default function Stats() {
  return (
    <section className="border-b border-border">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-12 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2">
            <dd className="tabular text-[22px] font-bold tracking-tight text-primary">
              {stat.value}
            </dd>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-tertiary">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
