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
  ["Reports you make about a du'ā", "Keeping Du'ā Together safe", "30 days after the report is decided (30 days after the du'ā expires if it never is), or when you delete your account"],
  ["People you block", "Keeping Du'ā Together safe", "Until you delete your account"],
  ["A reported du'ā and its case: the du'ā's words, the reports and the decision", "Reviewing the report", "30 days after the case is decided, or when you delete your account"],
  ["Record of reminders sent: your account id, the kind of reminder and when it was sent", "Not sending the same reminder twice", "30 days"],
  ["That you agreed to the Du'ā Together community rules, and when", "Showing the rules once, before your first post, on every phone you use", "Until you delete your account"],
  ["If you delete your account: your account id, kept only while we delete the usage analytics linked to it", "Before your account is deleted, the App sends the analytics it is still holding, stops collecting, and afterwards discards anything left. We then ask our analytics provider (PostHog) to delete your analytics three times: at once, a day later and a week later", "Removed once those requests are done, and never kept more than 30 days after you delete your account"],
  ["A Sakinah reply you report: the reply's text (up to 1,000 characters), the reason you chose, and your account id. Never your own messages", "Reviewing the reply and making Sakinah safer", "30 days, or until you delete your account"],
  ["If an account is banned from Du'ā Together: a one-way, keyed fingerprint of its email address and of any Google or Apple sign-in linked to it", "Stopping a ban from being avoided by signing up again. The fingerprint cannot be turned back into the email address and is used for nothing else", "Kept after the account is deleted; removed if the ban is lifted"],
  ["Automatic safety screening of du'ā text", "Stopping harmful posts before anyone sees them", "30 days"],
  ["A record that a du'ā contained crisis language (your account id and the time, not the text)", "Making sure crisis resources are shown", "30 days"],
  ["Daily message counters", "Applying the daily Sakinah limit", "About 2 days"],
  ["Your cloud copy, only if you turn it on: sealed documents and voice notes that no one but you can open, and for each one its size and when it last changed", "Keeping your journal and what you choose safe across your phones", "Until you turn it off or delete your account"],
];

const PROCESSORS: [string, string][] = [
  ["Cloudflare, Inc.", "Our server, database, audio delivery, account emails and your encrypted cloud copy"],
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
                Last updated:<strong>20 October 2026</strong>
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
            <p>
              Most of what you put into Thābit never leaves your device. The
              one exception is the cloud copy, which is off until you turn it
              on, and even then leaves your phone only sealed so that we cannot
              read it (see <a href="#cloud-copy">Your cloud copy</a> below):
            </p>
            <ul>
              <li>
                Journal entries, voice notes, mood check-ins, habits, athkar
                and dhikr progress, path progress, sleep logs,
                letters, names you wish to remember, notes, your Sakinah
                conversation history and your onboarding answers.
              </li>
              <li>
                <strong>The Vault.</strong> Encrypted on your device with
                XChaCha20-Poly1305, under a key generated on your device. If you
                turn on the cloud copy, it also keeps a sealed copy of your
                locked entries.
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
                <strong>Voice.</strong> A voice message to Sakinah is turned
                into text on your device, and only that text is sent, like a
                typed message; its audio is never sent to us or to anyone else.
                Voice notes in your journal and voice memories in the grief
                companion stay on your device unless you turn on the cloud copy,
                which seals them on your phone first so that we cannot hear them
                (see <a href="#cloud-copy">Your cloud copy</a> below).
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
            <h3 id="cloud-copy">Your cloud copy</h3>
            <p>
              The cloud copy is optional and off until you turn it on in
              Settings → &quot;Cloud copy&quot;. It keeps a copy of your journal
              (including archived and locked entries), your letters, your loved
              ones, the grief companion (the name, the days walked and your
              voice memories), your mood log, your check-ins, and the voice
              notes they hold. It never holds Her Days, your Sakinah
              conversations, your health data or your onboarding answers.
            </p>
            <ul>
              <li>
                <strong>Only you can open it.</strong> Everything is sealed on
                your phone with XChaCha20-Poly1305 before it is sent, under a key
                made on your phone and kept in its secure storage (the Keychain
                on iOS, the Keystore on Android). The key is shown to you once
                as a recovery code, and again in Settings behind your
                phone&apos;s lock. We never receive the key or the code, so we
                cannot read your copy, and we cannot recover it or reset the
                code for you. If you lose the code and every phone that holds
                the key, no one can open the copy; &quot;Start fresh&quot;
                deletes it and begins a new one.
              </li>
              <li>
                <strong>What our server can see.</strong> That you have a copy,
                which kinds of data it holds (for example &quot;journal&quot; or
                &quot;letters&quot;), how large each part is, when it last
                changed, and the random file names of your voice notes. Never
                their words or sound.
              </li>
              <li>
                <strong>Where it is kept.</strong> In private Cloudflare storage
                that is never public, up to about 500 MB per account.
              </li>
              <li>
                <strong>Signing out</strong> clears the copied data from your
                phone; with the cloud copy on, it first checks that your cloud
                copy holds all of it. If another account signs in on the same
                phone, the App shows it nothing of yours until it signs in to
                your account or removes your data, and its cloud copy never
                takes your data.
              </li>
              <li>
                <strong>Turning it off</strong> (Settings → &quot;Cloud
                copy&quot; → &quot;Turn off cloud copy&quot;) deletes the copy
                from our server. What is on your phone stays.
              </li>
            </ul>
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
                clear it in the App at any time. The one exception is a reply
                you report: that reply, with the reason you chose, is kept for
                30 days so we can review it (see below).
              </li>
              <li>
                Anthropic deletes API inputs and outputs within 30 days of
                receipt, and under Anthropic&apos;s Commercial Terms
                &quot;Anthropic may not train models on Customer Content from
                Services.&quot;
              </li>
              <li>
                If a reply seems wrong or harmful, long-press it to report it to
                us in the app. Only that reply and the reason you choose are sent
                to our server, never your own messages; we keep the report for
                30 days (see section 2).
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
                (IDFA). On Android it does not collect the advertising ID or the
                app set ID, and AppsFlyer is not started when the App is opened
                by a sign-in or password-reset link; on iOS those links are not
                passed to it. We do not track you across other companies&apos;
                apps or websites.
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
                tokens, your cloud copy, du&apos;ā requests, reports and blocks,
                Sakinah reports; only a Du&apos;ā Together ban fingerprint is
                kept, as described in section 2), and the usage analytics linked
                to it, and wipes the App&apos;s data on your phone. If you signed in
                with Apple, we also ask Apple to revoke Thābit&apos;s access to
                your Apple ID. Deleting your account does not cancel an App
                Store or Google Play subscription. Cancel that in your Apple
                Account or Google Play settings.
              </li>
              <li>
                <strong>Without the App</strong>, email
                thabit@deenteachings.com from the email address on your account;
                we delete it within 7 days (
                <a href="https://thabitapp.com/support#delete-account">
                  https://thabitapp.com/support#delete-account
                </a>
                ).
              </li>
              <li>
                <strong>Turn off the cloud copy.</strong> Settings → &quot;Cloud
                copy&quot; → &quot;Turn off cloud copy&quot; deletes your copy
                from our server at once; anything a deletion could not remove
                straight away is removed by our hourly clean-up. Your phone keeps
                everything.
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
              your phone are encrypted with XChaCha20-Poly1305. Your cloud copy
              is sealed on your phone with XChaCha20-Poly1305 before it is sent,
              under a key only your phones hold, so a breach of our server would
              expose no words of it. No system is
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
