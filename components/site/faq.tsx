import Link from "next/link";
import Glyph from "@/components/site/glyph";

// Answers in the store listing's own words (2.0.0, English), with the
// Support page for the step-by-step ones.
const QA: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is Thābit free?",
    a: (
      <>
        Free members can send 12 messages to Sakinah a day, five paths are fully
        free, and day one of every path is free. Thābit Premium, a monthly
        auto-renewing subscription, opens every path beyond day one, the full
        Solace library, 30 Sakinah messages a day and more habits.
      </>
    ),
  },
  {
    q: "Is Sakinah a person, a scholar or a therapist?",
    a: (
      <>
        Sakinah is an AI, not a person; Anthropic&apos;s Claude writes each
        answer. It replies gently, grounded in the Qur&apos;an and authentic
        Sunnah, and never pretends to be a scholar, a therapist or an emergency
        service. Long-press any reply to report it.
      </>
    ),
  },
  {
    q: "Are the hadith authentic?",
    a: (
      <>
        Every hadith we cite is graded Sahih, or Hasan for a few athkar, and
        every source is named; we never use weak or fabricated narrations.
      </>
    ),
  },
  {
    q: "Who can read my journal?",
    a: (
      <>
        Write or speak your entries, and lock the journal with Face ID. Lock any
        entry, and its words are sealed on your device. The cloud copy is
        optional and sealed on your phone first, so we cannot read it. The{" "}
        <Link href="/privacy">Privacy Policy</Link> has the details.
      </>
    ),
  },
  {
    q: "Which languages does Thābit speak?",
    a: <>English, Arabic, Urdu, Indonesian, Turkish, French and Spanish, with full right-to-left layouts.</>,
  },
  {
    q: "What is Her Days?",
    a: (
      <>
        During your period, prayer habits step aside quietly instead of showing
        as missed, and your streaks wait for you.
      </>
    ),
  },
  {
    q: "Is Thābit a replacement for therapy?",
    a: (
      <>
        Thābit is not a substitute for medical or mental-health care. If you are
        in danger, please contact the emergency services where you are. Get Help
        puts crisis lines and independent Muslim counselling organisations one
        tap away.
      </>
    ),
  },
  {
    q: "How do I cancel Premium or delete my account?",
    a: (
      <>
        <Link href="/support">Support</Link> walks through both, for iPhone and
        Android, including how to{" "}
        <Link href="/support#delete-account">delete your account</Link>.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <section id="faq" className="chapter field-paper" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="faq-head">
          <p className="micro" data-reveal>
            Questions
          </p>
          <h2 id="faq-title" className="display display-sm" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
            Before you
            <span className="accent">begin.</span>
          </h2>
          <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
            Anything else, write to us at{" "}
            <a href="mailto:thabit@deenteachings.com">thabit@deenteachings.com</a>.
          </p>
        </div>
        <div className="faq-list" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
          {QA.map(({ q, a }) => (
            <details key={q} className="qa">
              <summary>
                {q}
                <Glyph name="arrow-right" className="qa-icon" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
