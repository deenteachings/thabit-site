export default function Hadith() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
        <p className="section-label mb-10">Why we built this</p>
        <blockquote className="text-balance">
          <p className="text-[22px] font-medium leading-relaxed tracking-tight text-primary sm:text-[26px]">
            &ldquo;No fatigue, nor disease, nor sorrow, nor sadness, nor hurt,
            nor distress befalls a Muslim — not even the prick of a thorn —
            except that Allah expiates some of his sins for it.&rdquo;
          </p>
          <footer className="mt-8 text-[13px] font-medium tracking-wide text-tertiary">
            Sahih al-Bukhari 5641
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
