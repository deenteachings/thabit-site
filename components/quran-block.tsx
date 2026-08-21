export default function QuranBlock() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center sm:py-32">
        <p className="section-label mb-10">Why we built this</p>
        <p
          dir="rtl"
          lang="ar"
          className="arabic text-[20px] leading-[42px] text-primary"
        >
          ما يُصِيبُ الْمُسْلِمَ مِنْ نَصَبٍ وَلَا وَصَبٍ وَلَا هَمٍّ وَلَا
          حُزْنٍ وَلَا أَذًى وَلَا غَمٍّ حَتَّى الشَّوْكَةِ يُشَاكُهَا إِلَّا
          كَفَّرَ اللَّهُ بِهَا مِنْ خَطَايَاهُ
        </p>
        <span
          className="mx-auto mt-10 block w-7 border-t border-border-strong"
          aria-hidden="true"
        />
        <p className="mt-8 text-balance text-[16px] italic leading-relaxed text-secondary">
          &ldquo;No fatigue, nor disease, nor sorrow, nor sadness, nor hurt,
          nor distress befalls a Muslim — not even the prick of a thorn —
          except that Allah expiates some of his sins for it.&rdquo;
        </p>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-tertiary">
          Sahih al-Bukhari 5641 · Sahih Muslim 2573
        </p>
      </div>
    </section>
  );
}
