import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/brand-mark";
import LegalShell from "@/components/legal-shell";
import LegalSection from "@/components/legal-section";
import LegalToc from "@/components/legal-toc";
import {
  ArrowIcon,
  BookIcon,
  ChatIcon,
  PersonIcon,
  ShieldIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Terms of Service — Thābit",
  description:
    "The terms that govern your use of Thābit, published by DeenTeachings LLP.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service — Thābit",
    description:
      "The terms that govern your use of Thābit, published by DeenTeachings LLP.",
    url: "/terms",
    siteName: "Thābit",
  },
};

// Source of truth: ~/thabit/legal/terms-of-service.md. Keep this page in step
// with it word for word.
const SECTIONS = [
  { id: "what-thabit-is", title: "What Thābit is" },
  { id: "eligibility", title: "Eligibility" },
  { id: "your-account", title: "Your account" },
  { id: "sakinah", title: "Sakinah, the AI companion" },
  { id: "dua-together", title: "Du'ā Together: community rules" },
  { id: "acceptable-use", title: "Acceptable use" },
  { id: "your-content", title: "Your content" },
  { id: "premium", title: "Premium subscription" },
  { id: "third-party", title: "Third-party services" },
  { id: "warranties", title: "Disclaimer of warranties" },
  { id: "liability", title: "Limitation of liability" },
  { id: "crisis", title: "Crisis and emergencies" },
  { id: "termination", title: "Termination" },
  { id: "governing-law", title: "Governing law" },
  { id: "changes", title: "Changes to these Terms" },
  { id: "contact", title: "Contact" },
];

// Each line is a sentence quoted from the terms below.
const IN_SHORT = [
  { href: "#sakinah", text: "Sakinah is an AI, not a person.", Icon: ChatIcon },
  { href: "#your-content", text: "Anything you write in the App remains yours.", Icon: BookIcon },
  { href: "#dua-together", text: "We have zero tolerance for objectionable content or abusive users.", Icon: ShieldIcon },
  { href: "#termination", text: "Deletion is immediate and permanent.", Icon: PersonIcon },
];

const NOT = [
  "A replacement for professional mental-health care, therapy, or psychiatric support.",
  "A medical service or device. Nothing in the App is a diagnosis or treatment.",
  "A fatwa or religious-ruling authority. The App offers gentle reminders, not Islamic legal opinions.",
  'An emergency service. If you are in crisis, please use the resources under "Get Help" in the App or contact your local emergency number.',
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

export default function TermsPage() {
  return (
    <LegalShell current="terms">
      <section className="legal-hero" aria-labelledby="terms-title">
        <div className="legal-hero-inner">
          <div>
            <p className="legal-eyebrow">
              <BrandMark />
              Terms
            </p>
            <h1 id="terms-title">
              Terms of Service <em>— Thābit</em>
            </h1>
            <p className="legal-lede">
              These Terms govern your use of Thābit (&quot;the App&quot;),
              published by DeenTeachings LLP (&quot;we&quot;, &quot;us&quot;,
              &quot;our&quot;). By creating an account, you agree to these
              Terms. If you do not agree, do not use the App.
            </p>
            <p className="legal-meta">
              <span>
                Last updated:<strong>20 October 2026</strong>
              </span>
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
                      {text}
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
              Thābit is a faith-based emotional companion for Muslims who are
              hurting, grieving, anxious, or spiritually tired. It offers
              athkar, du&apos;ā, guided paths, meditation, audio, journaling,
              Du&apos;ā Together, and an AI companion called Sakinah.
            </p>
            <p>
              <strong>Thābit is not:</strong>
            </p>
            <ul className="terms-not">
              {NOT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>You agree that you understand these limits before using the App.</p>
          </Section>

          <Section index={1}>
            <p>
              You must be at least 13 years old to use Thābit. If you are under
              18, or under the age of majority where you live, you must have a
              parent or guardian&apos;s permission.
            </p>
          </Section>

          <Section index={2}>
            <p>
              You are responsible for keeping your password confidential and
              for activity under your account. If you suspect unauthorized
              access, change your password and contact us.
            </p>
          </Section>

          <Section index={3}>
            <p>
              Sakinah is an AI, not a person. It uses Anthropic&apos;s Claude
              API to write its replies. You acknowledge that:
            </p>
            <ul>
              <li>
                AI-generated content may be inaccurate, incomplete, or
                inappropriate for your situation. Use your judgment.
              </li>
              <li>
                We instruct Sakinah to cite only authentic sources, but no AI is
                infallible. If you are unsure whether a hadith or ayah Sakinah
                cites is authentic, please check with a qualified scholar.
              </li>
              <li>
                Your messages to Sakinah are processed by Anthropic, as
                described in our <Link href="/privacy">Privacy Policy</Link>.
              </li>
              <li>
                Sakinah is not a counselor, therapist, scholar, doctor, or
                emergency service.
              </li>
              <li>
                Free accounts can send 12 messages to Sakinah a day and Premium
                accounts 30 a day.
              </li>
            </ul>
          </Section>

          <Section index={4}>
            <p>
              Du&apos;ā Together shows the du&apos;ā requests you post to other
              Thābit users, without your name, so they can make du&apos;ā for
              you. We have{" "}
              <strong>
                zero tolerance for objectionable content or abusive users
              </strong>
              . When you post, you agree not to include:
            </p>
            <ul>
              <li>
                Hateful, harassing, threatening, sexual or violent content, or
                content that mocks any faith or people.
              </li>
              <li>
                Anything that identifies you or another person: names, phone
                numbers, emails, addresses, social media handles or links.
              </li>
              <li>Advertising, requests for money, or spam.</li>
              <li>Anything unlawful.</li>
            </ul>
            <p>
              Posts are screened automatically before they appear. Every
              request can be reported, and you can block the person who posted
              it so you never see their requests again. We review reports
              within 24 hours, remove content that breaks these rules, and
              remove people who post it from Du&apos;ā Together or from Thābit
              entirely.
            </p>
          </Section>

          <Section index={5}>
            <p>You agree not to:</p>
            <ul>
              <li>
                Use the App to harm yourself or others, or to encourage others
                to do so.
              </li>
              <li>
                Reverse-engineer the App or its server, or bypass its rate
                limits or security.
              </li>
              <li>
                Use the App in a way that places unreasonable load on our
                infrastructure.
              </li>
              <li>
                Impersonate another person or create accounts using false
                information.
              </li>
            </ul>
            <p>We may suspend or terminate accounts that violate these Terms.</p>
          </Section>

          <Section index={6}>
            <p>
              Anything you write in the App remains yours. We do not claim
              ownership.
            </p>
            <p>
              You give us a limited license to process your content only to
              provide the App&apos;s features: relaying your Sakinah message to
              the AI, showing your du&apos;ā request to other users in Du&apos;ā
              Together, screening it for safety, storing your progress, and
              keeping your sealed cloud copy if you turn it on. We never see
              your journal, Vault or notes. Your notes never leave your device;
              your journal and Vault stay there too unless you turn on the cloud
              copy, which is sealed on your phone before it leaves, so we cannot
              read it.
            </p>
          </Section>

          <Section index={7}>
            <p>
              Thābit Premium is an auto-renewing subscription. The price and
              period are shown in the App before you buy.
            </p>
            <ul>
              <li>
                Payment is charged to your Apple Account (or Google Play
                account) when you confirm the purchase.
              </li>
              <li>
                The subscription renews automatically unless you cancel it at
                least 24 hours before the end of the current period. Your
                account is charged for renewal within the 24 hours before the
                current period ends.
              </li>
              <li>
                You can manage or cancel the subscription in your Apple Account
                settings (or Google Play subscriptions). Deleting your Thābit
                account does not cancel it.
              </li>
              <li>
                If a free trial is offered, any unused part of the trial ends
                when you buy a subscription.
              </li>
            </ul>
            <p>
              On iOS, your use of the App is also governed by Apple&apos;s
              Licensed Application End User License Agreement:{" "}
              <a
                className="terms-url"
                href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              >
                https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
              </a>
            </p>
          </Section>

          <Section index={8}>
            <p>
              The App relies on services from Cloudflare, Anthropic,
              RevenueCat, Apple, Google, PostHog, AppsFlyer, Sentry and Expo,
              listed in our <Link href="/privacy">Privacy Policy</Link>. Their
              own terms apply to the data they process. We choose providers we
              believe handle data responsibly, but we are not responsible for
              their actions.
            </p>
          </Section>

          <Section index={9}>
            <p>
              The App is provided &quot;as is&quot; and &quot;as
              available&quot;. We do not warrant that the App will be
              uninterrupted, error-free, or free from harmful components, or
              that any particular spiritual or emotional outcome will result
              from using it.
            </p>
            <p>
              To the fullest extent permitted by law, we disclaim all
              warranties, express or implied, including merchantability,
              fitness for a particular purpose, and non-infringement.
            </p>
          </Section>

          <Section index={10}>
            <p>
              To the fullest extent permitted by law, neither DeenTeachings LLP
              nor its contributors shall be liable for indirect, incidental,
              special, consequential, or punitive damages arising from your use
              of the App, including emotional distress, loss of data, or
              reliance on AI-generated content.
            </p>
            <p>
              This limitation does not apply where prohibited by applicable law
              (for example, gross negligence or wilful misconduct).
            </p>
          </Section>

          <Section index={11}>
            <p className="policy-note">
              If you are in a mental health emergency or in immediate danger,{" "}
              <strong>
                please contact local emergency services or a crisis line
              </strong>
              . The App shows crisis resources under &quot;Get Help&quot; but is
              not itself an emergency service. Messages sent to Sakinah or
              posted in Du&apos;ā Together do not reach a human being in real
              time.
            </p>
          </Section>

          <Section index={12}>
            <p>
              You may delete your account at any time in Settings →
              &quot;Delete account&quot;, or without the App by emailing
              thabit@deenteachings.com from the email address on your account;
              we delete it within 7 days. Deletion is immediate and permanent,
              except as described in{" "}
              <a href="/privacy#our-server">Privacy Policy section 2</a>{" "}
              (analytics deletion takes up to 30 days, and a Du&apos;ā Together
              ban fingerprint is kept).
            </p>
            <p>
              We may suspend or terminate the App, your account, or specific
              features at any time. If we discontinue the App, we will give at
              least 30 days&apos; notice and a final opportunity to export your
              data.
            </p>
          </Section>

          <Section index={13}>
            <p>
              These Terms are governed by the laws of Nigeria, without regard to
              conflict-of-laws principles. Any dispute will be resolved in the
              courts of Lagos, Nigeria, except where local consumer-protection
              laws give you the right to pursue remedies in your own
              jurisdiction.
            </p>
          </Section>

          <Section index={14}>
            <p>
              We may update these Terms. If a change is material, we will show
              it in the App and update the date above. Continued use after a
              material change means you accept the new Terms. If you disagree,
              delete your account.
            </p>
          </Section>

          <Section index={15}>
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
              May Allah ﷻ accept this work as ṣadaqah jāriyah for Aisha
              Yahaya{" "}
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
