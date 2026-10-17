import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/brand-mark";
import LegalShell from "@/components/legal-shell";
import LegalSection from "@/components/legal-section";
import LegalToc from "@/components/legal-toc";
import {
  ArrowIcon,
  ChatIcon,
  PhoneIcon,
  ShieldIcon,
  SparkleIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Privacy Policy — Thābit",
  description:
    "What data Thābit collects, why, where it goes, how long it is kept, and what you can do about it.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — Thābit",
    description:
      "What data Thābit collects, why, where it goes, how long it is kept, and what you can do about it.",
    url: "/privacy",
    siteName: "Thābit",
  },
};

// Source of truth: ~/thabit/legal/privacy-policy.md. Keep this page in step
// with it word for word; App Review reads it.
const SECTIONS = [
  { id: "on-your-phone", title: "What stays on your phone" },
  { id: "our-server", title: "What our server keeps" },
  { id: "sakinah", title: "Sakinah, the AI companion" },
  { id: "analytics", title: "Analytics, attribution and crash reports" },
  { id: "processors", title: "Who processes data for us" },
  { id: "your-rights", title: "Your choices and rights" },
  { id: "children", title: "Children" },
  { id: "security", title: "Security" },
  { id: "transfers", title: "International transfers" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact" },
];

// Each line is a sentence quoted from the policy below.
const IN_SHORT = [
  { href: "#on-your-phone", text: "Most of what you put into Thābit never leaves your device", Icon: PhoneIcon },
  { href: "#sakinah", text: "We do not store your Sakinah conversations on our server", Icon: ChatIcon },
  { href: "#analytics", text: "We do not show ads", Icon: SparkleIcon },
  { href: "#processors", text: "We do not sell your data", Icon: ShieldIcon },
];

const SERVER_DATA: [string, string, string][] = [
  ["Email address, and your name if you give one", "Your account, sign-in, password reset and account emails", "Until you delete your account"],
  ["Password", "Sign-in. Stored only as a salted hash, never in plain text", "Until you delete your account"],
  ["Sign-in sessions, including the IP address and device user agent of each session", "Keeping you signed in securely, and spotting misuse", "Until the session expires, you sign out, or you delete your account"],
  ["Reminder preferences, time zone and language", "Sending your reminders at the right local time", "Until you delete your account"],
  ["Push notification token", "Sending the notifications you turned on", "Until it stops working, you turn notifications off, or you delete your account"],
  ["Subscription status", "Unlocking Premium", "Until you delete your account"],
  ["Du'ā Together requests you post", "Showing your request to other Muslims so they can make du'ā for you", "Removed automatically 48 hours after posting, or when you delete your account"],
  ["Reports you make about a du'ā, and people you block", "Keeping Du'ā Together safe", "Until you delete your account"],
  ["If an account is banned from Du'ā Together: a one-way, keyed fingerprint of its email address and of any Google or Apple sign-in linked to it", "Stopping a ban from being avoided by signing up again. The fingerprint cannot be turned back into the email address and is used for nothing else", "Kept after the account is deleted; removed if the ban is lifted"],
  ["Automatic safety screening of du'ā text", "Stopping harmful posts before anyone sees them", "30 days"],
  ["A record that a du'ā contained crisis language (your account id and the time, not the text)", "Making sure crisis resources are shown", "30 days"],
  ["Daily message counters", "Applying the daily Sakinah limit", "About 2 days"],
];

const PROCESSORS: [string, string][] = [
  ["Cloudflare, Inc.", "Our server, database, audio delivery and account emails"],
  ["Anthropic PBC", "Writing Sakinah's replies"],
  ["RevenueCat, Inc.", "Managing your subscription, linked to your account id"],
  ["Apple Inc. and Google LLC", "Payments through the App Store or Google Play; Sign in with Apple; Sign in with Google"],
  ["PostHog, Inc.", "Product analytics"],
  ["AppsFlyer Ltd.", "Install attribution"],
  ["Functional Software, Inc. (Sentry)", "Crash reports"],
  ["650 Industries, Inc. (Expo)", "Delivering push notifications"],
];

function Section({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const { id, title } = SECTIONS[index];
  return (
    <LegalSection n={index + 1} id={id} title={title}>
      {children}
    </LegalSection>
  );
}

export default function PrivacyPage() {
  return (
    <LegalShell current="privacy">
      <section className="legal-hero" aria-labelledby="privacy-title">
        <div className="legal-hero-inner">
          <div>
            <p className="legal-eyebrow">
              <BrandMark />Privacy
            </p>
            <h1 id="privacy-title">
              Privacy Policy <em>— Thābit</em>
            </h1>
            <p className="legal-lede">
              Thābit (&quot;the App&quot;) is published by DeenTeachings LLP
              (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). This policy
              explains what data the App collects, why, where it goes, how long
              it is kept, and what you can do about it.
            </p>
            <p className="legal-lede">
              We want you to feel safe using Thābit. We collect as little as we
              can, keep as much as we can on your own phone, and never sell
              your data to anyone.
            </p>
            <p className="legal-meta">
              <span>
                Last updated:<strong>16 October 2026</strong>
              </span>
              <span>(applies to Thābit 1.1.0 and later)</span>
            </p>
          </div>

          <div className="legal-arch">
            <span className="legal-arch-word arabic" aria-hidden="true">
              ثابت
            </span>
            <nav className="legal-arch-card" aria-label="In short">
              <p>In short</p>
              <ul>
                {IN_SHORT.map(({ href, text, Icon }) => (
                  <li key={href}>
                    <a href={href}>
                      <Icon />
                      {text}.
                      <ArrowIcon />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <div className="policy-layout">
        <LegalToc sections={SECTIONS} />

        <article className="policy-doc">
          <Section index={0}>
            <p>Most of what you put into Thābit never leaves your device:</p>
            <ul>
              <li>
                Journal entries, voice journal transcripts, mood check-ins,
                habits, athkar and dhikr progress, path progress, sleep logs,
                letters, names you wish to remember, notes, your Sakinah
                conversation history and your onboarding answers.
              </li>
              <li>
                <strong>The Vault.</strong> Kept on your device only, encrypted
                with XChaCha20-Poly1305 under a key generated on your device.
              </li>
              <li>
                <strong>Her Days.</strong> If you turn this on, the dates are
                stored on your device only. They are never sent to our server,
                to analytics, to crash reporting, or included in an export.
              </li>
              <li>
                <strong>Sleep data from Apple Health or Health Connect.</strong>{" "}
                If you choose &quot;Import from Apple Health&quot; (iOS) or
                &quot;Import from Health Connect&quot; (Android), the App reads
                your sleep records on your device to fill in a 1 to 5
                sleep-quality score. Raw sleep samples are never stored or sent
                anywhere. Only the score is saved, on your device. Thābit never
                writes to Apple Health or Health Connect.
              </li>
              <li>
                <strong>Voice.</strong> When you speak a journal entry or a
                message to Sakinah, speech is turned into text on your device.
                The audio itself is never uploaded.
              </li>
              <li>
                <strong>Face ID / fingerprint.</strong> The journal lock uses
                your phone&apos;s own biometric system. We never receive
                biometric data.
              </li>
            </ul>
          </Section>

          <Section index={1}>
            <p>Our server runs on Cloudflare. It holds only the following:</p>
            <div className="legal-table">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Data</th>
                    <th scope="col">Why</th>
                    <th scope="col">How long</th>
                  </tr>
                </thead>
                <tbody>
                  {SERVER_DATA.map(([data, why, howLong]) => (
                    <tr key={data}>
                      <td>{data}</td>
                      <td data-label="Why">{why}</td>
                      <td data-label="How long">{howLong}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="policy-note">
              <strong>Du&apos;ā Together is visible to other users.</strong>{" "}
              The text of a du&apos;ā request you post is shown to other Thābit
              users, without your name or email. Please do not include anything
              that identifies you or anyone else. You can report any request
              you see and block the person who posted it. We review reports and
              remove content, and accounts, that break our{" "}
              <Link href="/terms">Terms</Link>.
            </p>
          </Section>

          <Section index={2}>
            <p>
              Sakinah is an AI, not a person. Before your first message, the
              App asks your permission to send your messages to Anthropic.
            </p>
            <ul>
              <li>
                When you send a message (typed, or spoken and turned into text
                on your device), the message and the recent conversation are
                sent through our server to{" "}
                <strong>Anthropic&apos;s Claude API</strong>, which writes the
                reply.
              </li>
              <li>
                <strong>
                  We do not store your Sakinah conversations on our server.
                </strong>{" "}
                Your conversation history stays on your device, and you can
                clear it in the App at any time.
              </li>
              <li>
                Anthropic deletes API inputs and outputs within 30 days of
                receipt, and under Anthropic&apos;s Commercial Terms
                &quot;Anthropic may not train models on Customer Content from
                Services.&quot;
              </li>
              <li>
                If a reply seems wrong or harmful, long-press it to report it to
                us.
              </li>
            </ul>
          </Section>

          <Section index={3}>
            <ul>
              <li>
                <strong>Product analytics (PostHog).</strong> We record which
                screens and features are used (for example &quot;opened a
                path&quot; or &quot;finished athkar&quot;) so we can improve the
                App. These events are linked to your account id. They never
                contain your journal, your messages, your du&apos;ā text, your
                mood, your Her Days dates or your health data, and we do not
                record visits to screens about crisis, grief, loss, anxiety,
                anger or finding a therapist.
              </li>
              <li>
                <strong>Install attribution (AppsFlyer).</strong> When the App
                is first opened, AppsFlyer tells us which campaign or link
                brought you, if any. AppsFlyer uses your IP address to work out
                the country you installed from. On iOS we use AppsFlyer&apos;s
                strict mode, which does not collect the advertising identifier
                (IDFA). We do not track you across other companies&apos; apps
                or websites.
              </li>
              <li>
                <strong>Crash reports (Sentry).</strong> If the App crashes we
                receive a stack trace and basic device information (device
                model, OS version, app version). Your identity is removed before
                a report is sent, and reports never include your journal,
                messages or du&apos;ā.
              </li>
            </ul>
            <p className="policy-note">
              We do not show ads. We do not sell or share your data for
              advertising, and we do not track you as Apple defines tracking.
            </p>
          </Section>

          <Section index={4}>
            <p>
              We share data only with these providers, only as needed to run
              the App:
            </p>
            <div className="legal-table">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Provider</th>
                    <th scope="col">What for</th>
                  </tr>
                </thead>
                <tbody>
                  {PROCESSORS.map(([provider, purpose]) => (
                    <tr key={provider}>
                      <td>{provider}</td>
                      <td data-label="What for">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Accounts created in Thābit 1.0 were held by Google Firebase. When
              you sign in to 1.1.0, your account moves to our Cloudflare server
              under the same account id.
            </p>
            <p>
              Each provider processes data under its own terms and privacy
              policy. We choose providers that give your data the same or equal
              protection as this policy. We do not sell your data, share it
              with advertisers, or give it to data brokers.
            </p>
          </Section>

          <Section index={5}>
            <p>In the App, at any time:</p>
            <ul>
              <li>
                <strong>Delete your account.</strong> Settings → &quot;Delete
                account&quot; permanently deletes your account and everything
                our server holds about you (account, sessions, preferences, push
                tokens, du&apos;ā requests, reports and blocks; only a Du&apos;ā
                Together ban fingerprint is kept, as described in section 2),
                and wipes the App&apos;s data on your phone. If you signed in
                with Apple, we also ask Apple to revoke Thābit&apos;s access to
                your Apple ID. Deleting your account does not cancel an App
                Store or Google Play subscription. Cancel that in your Apple
                Account or Google Play settings.
              </li>
              <li>
                <strong>Export your data.</strong> Settings → &quot;Export my
                data&quot; saves a JSON file of the App&apos;s data on your
                phone. For your privacy it leaves out your Sakinah
                conversations, Her Days, the Vault, your notes and your
                onboarding answers.
              </li>
              <li>
                <strong>Turn off notifications</strong>, each one separately, in
                Settings.
              </li>
              <li>
                <strong>Revoke permissions</strong> (microphone, speech
                recognition, Face ID, Apple Health or Health Connect,
                notifications) in your phone&apos;s settings. The App keeps
                working without them: you can type instead of speak, and rate
                your sleep by hand.
              </li>
            </ul>
            <p>
              You can also email{" "}
              <a href="mailto:thabit@deenteachings.com">
                <strong>thabit@deenteachings.com</strong>
              </a>{" "}
              to ask for a copy of the data our server holds, to have the
              analytics events linked to your account deleted, or about
              anything else in this policy. We answer within 30 days. If you
              live in the EU, UK or California, you have rights under GDPR, UK
              GDPR and the CCPA, including access, correction, deletion and
              objection, and you can complain to your local data-protection
              authority.
            </p>
          </Section>

          <Section index={6}>
            <p>
              Thābit is for people aged 13 and over. It is not directed at
              children under 13, and we do not knowingly collect data from
              them. If you believe a child under 13 has an account, email{" "}
              <a href="mailto:thabit@deenteachings.com">
                <strong>thabit@deenteachings.com</strong>
              </a>{" "}
              and we will delete it.
            </p>
          </Section>

          <Section index={7}>
            <p>
              All traffic between the App and our server uses HTTPS. Passwords
              are stored only as salted hashes. The Vault and journal backups on
              your phone are encrypted with XChaCha20-Poly1305. No system is
              perfectly secure; if a breach affects your data we will tell you
              without undue delay.
            </p>
          </Section>

          <Section index={8}>
            <p>
              Our providers operate globally, so data may be processed in the
              United States and other countries. Where the law requires it,
              these transfers rely on the providers&apos; standard contractual
              clauses or equivalent safeguards.
            </p>
          </Section>

          <Section index={9}>
            <p>
              If we change how we use your data, we will show the change in the
              App and update the date at the top. If you disagree with a
              change, you can delete your account.
            </p>
          </Section>

          <Section index={10}>
            <p>DeenTeachings LLP</p>
            <dl className="policy-contact">
              <div>
                <dt>Email:</dt>
                <dd>
                  <a href="mailto:thabit@deenteachings.com">
                    thabit@deenteachings.com
                  </a>
                </dd>
              </div>
              <div>
                <dt>Instagram:</dt>
                <dd>
                  <a
                    href="https://instagram.com/thethabitapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @thethabitapp
                  </a>
                </dd>
              </div>
            </dl>
          </Section>

          <aside className="policy-memorial">
            <span className="policy-memorial-mark" lang="ar" aria-hidden="true">
              رحمها الله
            </span>
            <p>
              This App is an act of ṣadaqah jāriyah for Aisha Yahaya{" "}
              <span className="arabic-inline" lang="ar">
                رحمها الله
              </span>
              .
            </p>
          </aside>
        </article>
      </div>
    </LegalShell>
  );
}
