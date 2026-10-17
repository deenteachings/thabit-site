import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/brand-mark";
import LegalShell from "@/components/legal-shell";
import {
  ArrowIcon,
  CardIcon,
  ChatIcon,
  HeartIcon,
  MailIcon,
  PersonIcon,
  PlusIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Thābit Support",
  description:
    "Thābit app support — FAQ, account help, refunds, and contact information.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "Thābit Support",
    description:
      "Thābit app support — FAQ, account help, refunds, and contact information.",
    url: "/support",
    siteName: "Thābit",
  },
};

// Answers are word for word from the Thābit 1.1.0 support page
// (~/Downloads/deenteachings-site-update/thabit-support/index.html).
const GROUPS = [
  {
    id: "subscription",
    title: "Subscription & refunds",
    Icon: CardIcon,
    items: [
      {
        q: "How do I cancel my subscription?",
        a: (
          <>
            <p>
              Thābit Premium is managed through your Apple App Store
              subscription settings:
            </p>
            <ol>
              <li>Open the Settings app on your iPhone</li>
              <li>Tap your name at the top</li>
              <li>Tap Subscriptions</li>
              <li>Find Thābit Premium and tap Cancel Subscription</li>
            </ol>
            <p>
              You can also manage this directly from the App Store app → your
              profile → Subscriptions.
            </p>
            <p>
              Cancellation takes effect at the end of your current billing
              period. You will retain Premium access until then.
            </p>
          </>
        ),
      },
      {
        q: "Can I get a refund?",
        a: (
          <>
            <p>
              Refunds are handled by Apple, not by us directly. To request a
              refund:
            </p>
            <ol>
              <li>
                Go to{" "}
                <a href="https://reportaproblem.apple.com">
                  reportaproblem.apple.com
                </a>
              </li>
              <li>Sign in with your Apple ID</li>
              <li>
                Find your Thābit Premium purchase and select &quot;Request a
                refund&quot;
              </li>
            </ol>
            <p>
              We do not have the ability to issue refunds from our side, but
              Apple&apos;s process is straightforward.
            </p>
          </>
        ),
      },
      {
        q: "My purchase isn't working / I paid but features are still locked.",
        a: (
          <p>
            First, try force-quitting the app and reopening it. If that does
            not help, go to Settings → Restore Purchases. If the issue
            continues, email us with the email address associated with your
            account and an approximate timestamp of your purchase.
          </p>
        ),
      },
    ],
  },
  {
    id: "account",
    title: "Your account & data",
    Icon: PersonIcon,
    items: [
      {
        q: "How do I delete my account?",
        a: (
          <p>
            Open Thābit → Settings → scroll to the bottom → Delete Account.
            This permanently deletes your account and everything our server
            holds about you, and wipes the app&apos;s data on your phone. It
            cannot be undone. Deleting your account does not cancel a Thābit
            Premium subscription: cancel that in your Apple Account settings
            (Settings → your name → Subscriptions) or in Google Play
            subscriptions.
          </p>
        ),
      },
      {
        q: "What data does Thābit collect?",
        a: (
          <p>
            Very little. Your journal entries are stored on your device, not on
            our servers. We collect your email address for authentication.
            Sakinah conversations pass through our server to reach the AI, but
            we do not store conversation logs. See our full privacy policy at{" "}
            <Link href="/privacy">/privacy</Link>.
          </p>
        ),
      },
    ],
  },
  {
    id: "app",
    title: "Sakinah & content",
    Icon: ChatIcon,
    items: [
      {
        q: "Sakinah is not responding / returning errors.",
        a: (
          <p>
            Sakinah may occasionally be unavailable due to high demand or
            maintenance. The app will show a gentle error message when this
            happens. Please try again in a few minutes. If the issue persists
            for more than a few hours, email us.
          </p>
        ),
      },
      {
        q: "I found a hadith that seems incorrect.",
        a: (
          <p>
            Thank you for bringing this to our attention. We take the
            authenticity of every narration extremely seriously. Please email
            us the details (the exact wording and where you saw it) and we will
            investigate immediately and issue a fix. Email:{" "}
            <a href="mailto:salaam@deenteachings.com">
              <strong>salaam@deenteachings.com</strong>
            </a>
          </p>
        ),
      },
    ],
  },
];

const JUMPS = [
  ...GROUPS.map(({ id, title, Icon }) => ({ id, title, Icon })),
  { id: "care", title: "Therapy & medical care", Icon: HeartIcon },
  { id: "contact", title: "Another question", Icon: MailIcon },
];

export default function SupportPage() {
  return (
    <LegalShell current="support">
      <section className="legal-hero" aria-labelledby="support-title">
        <div className="legal-hero-inner">
          <div>
            <p className="legal-eyebrow">
              <BrandMark />Thābit Support
            </p>
            <h1 id="support-title">
              We are here to <em>help.</em>
            </h1>
            <p className="legal-salam">As-Salāmu &apos;Alaykum.</p>
            <p className="legal-lede">
              This is a small team building for the sake of Allah, and every
              message reaches a real person.
            </p>
          </div>

          <div className="legal-arch">
            <span className="legal-arch-word arabic" aria-hidden="true">
              ثابت
            </span>
            <nav className="legal-arch-card" aria-label="Support topics">
              <p>Jump to</p>
              <ul>
                {JUMPS.map(({ id, title, Icon }) => (
                  <li key={id}>
                    <a href={`#${id}`}>
                      <Icon />
                      {title}
                      <ArrowIcon />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <div className="legal-wrap">
        {GROUPS.map(({ id, title, Icon, items }) => (
          <section
            key={id}
            id={id}
            className="faq-group"
            aria-labelledby={`${id}-title`}
          >
            <div className="faq-group-head">
              <Icon />
              <h2 id={`${id}-title`}>{title}</h2>
              <p>
                {items.length} {items.length === 1 ? "question" : "questions"}
              </p>
            </div>
            <div className="faq-list">
              {items.map(({ q, a }) => (
                <details key={q} className="faq">
                  <summary>
                    {q}
                    <PlusIcon />
                  </summary>
                  <div className="faq-body">{a}</div>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section id="care" className="care-callout" aria-labelledby="care-title">
          <HeartIcon />
          <div>
            <h2 id="care-title">
              Is Thābit a substitute for therapy or medical care?
            </h2>
            <p>
              No. Thābit is a spiritual and emotional companion — it is not a
              medical device, not a substitute for professional mental health
              care, and not a crisis intervention service. If you are in
              immediate danger or having thoughts of harming yourself, please
              call your local emergency services or crisis hotline immediately.
              You matter, and there are people who can help right now.
            </p>
          </div>
        </section>
      </div>

      <section
        id="contact"
        className="contact-band"
        aria-labelledby="contact-title"
      >
        <div className="contact-band-inner">
          <p className="legal-eyebrow">
            <BrandMark />Contact
          </p>
          <h2 id="contact-title">I have another question.</h2>
          <p>
            Email us at salaam@deenteachings.com. We respond within 24 hours,
            usually sooner. We&apos;d love to hear from you.
          </p>
          <div className="contact-actions">
            <a href="mailto:salaam@deenteachings.com" className="contact-primary">
              <MailIcon />
              salaam@deenteachings.com
            </a>
            <a
              href="https://instagram.com/deenteachings"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-secondary"
            >
              Instagram: @deenteachings
            </a>
          </div>
        </div>
      </section>
    </LegalShell>
  );
}
