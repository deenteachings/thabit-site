// One numbered section of a legal document (/privacy, /terms). The number is
// shown as "01" and read out as "1." by screen readers.
export default function LegalSection({
  n,
  id,
  title,
  children,
}: {
  n: number;
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="policy-section legal-prose"
      aria-labelledby={`${id}-title`}
    >
      <h2 id={`${id}-title`}>
        <span aria-hidden="true">{String(n).padStart(2, "0")}</span>
        <span className="sr-only">{n}. </span>
        {title}
      </h2>
      {children}
    </section>
  );
}
