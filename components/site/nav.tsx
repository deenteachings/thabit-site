import Link from "next/link";
import BrandMark from "@/components/brand-mark";
import Glyph from "@/components/site/glyph";
import { LANGUAGES } from "@/components/site/i18n/types";

export type NavLink = { href: string; label: string; current?: boolean };

// One header for every Thābit page: the mark, a few quiet links, the language
// menu and, where the page has words for it, the one filled action.
export default function Nav({
  links,
  cta = "#download",
  ctaLabel = "Get the app",
  lang = "en",
  skipLabel = "Skip to content",
}: {
  links: NavLink[];
  cta?: string;
  /** Pass null where the page has no approved words for it. */
  ctaLabel?: string | null;
  lang?: string;
  skipLabel?: string;
}) {
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  return (
    <header className="site-nav">
      <a className="skip" href="#main">
        {skipLabel}
      </a>
      <nav aria-label="Main" className="site-nav-inner">
        <Link href={current.href} className="site-brand">
          <BrandMark className="site-brand-mark" />
          Thābit
        </Link>
        <div className="site-nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={l.current ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <details className="lang-menu">
          <summary aria-label={`Language: ${current.native}`}>
            <Glyph name="globe@light" className="lang-menu-icon" />
            <span className="lang-menu-code">{current.code.toUpperCase()}</span>
          </summary>
          <ul>
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <a href={l.href} lang={l.code} hrefLang={l.code} aria-current={l.code === lang ? "true" : undefined}>
                  {l.native}
                </a>
              </li>
            ))}
          </ul>
        </details>
        {ctaLabel && (
          <Link href={cta} className="btn btn-ink site-nav-cta">
            {ctaLabel}
          </Link>
        )}
      </nav>
    </header>
  );
}
