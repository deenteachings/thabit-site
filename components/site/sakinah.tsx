import SakinahChat from "@/components/site/sakinah-chat";

// Copy: the store description's SAKINAH section, and the privacy policy for
// what the server keeps. Never "unlimited"; always plainly an AI.
const FACTS = [
  "Free members can send 12 messages a day, Premium members 30.",
  "Long-press any reply to report it.",
  "We do not store your Sakinah conversations on our server.",
];

export default function Sakinah() {
  return (
    <section id="sakinah" className="chapter field-ink" aria-labelledby="sakinah-title">
      <div className="wrap split">
        <div className="split-copy">
          <p className="micro" data-reveal>
            Sakinah, an AI companion who answers
          </p>
          <h2 id="sakinah-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
            Talk to
            <span className="accent">Sakinah.</span>
          </h2>
          <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
            Write what you cannot say out loud. Sakinah is an AI, not a person;
            Anthropic&apos;s Claude writes each answer. It replies gently,
            grounded in the Qur&apos;an and authentic Sunnah, and never pretends
            to be a scholar, a therapist or an emergency service.
          </p>
          <ul className="facts" data-reveal style={{ "--d": "165ms" } as React.CSSProperties}>
            {FACTS.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <figure className="split-stage" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
          <SakinahChat />
          <figcaption className="micro stage-caption">
            An example conversation, from our App Store screenshots
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
