import Link from "next/link";
import BrandMark from "@/components/brand-mark";

export type NavLink = { href: string; label: string; current?: boolean };

// One header for every Thābit page: the mark, a few quiet links, and the one
// filled action. Square, hairline below, the page colour under glass.
export default function Nav({
  links,
  cta = "#download",
}: {
  links: NavLink[];
  cta?: string;
}) {
  return (
    <header className="site-nav">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <nav aria-label="Main" className="site-nav-inner">
        <Link href="/" className="site-brand">
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
        <Link href={cta} className="btn btn-ink site-nav-cta">
          Get the app
        </Link>
      </nav>
    </header>
  );
}
