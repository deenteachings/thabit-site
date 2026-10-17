import Link from "next/link";
import BrandMark from "@/components/brand-mark";
import Footer from "@/components/footer";
import "@/app/home.css";
import "@/app/legal.css";

const LINKS = [
  { href: "/support", label: "Support", key: "support" },
  { href: "/privacy", label: "Privacy", key: "privacy" },
  { href: "/terms", label: "Terms", key: "terms" },
] as const;

// Shared frame for /support, /privacy and /terms: the home page's palette,
// header and footer. The header keeps SiteNav's shape (brand, links, button)
// so the home.css header rules apply unchanged.
export default function LegalShell({
  current,
  children,
}: {
  current: (typeof LINKS)[number]["key"];
  children: React.ReactNode;
}) {
  return (
    <div className="thabit-home thabit-legal">
      <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight text-primary"
          >
            <BrandMark className="thabit-nav-mark" />
            Thābit
          </Link>
          <div className="legal-nav-links">
            {LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                aria-current={current === link.key ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/#download"
            className="rounded-full bg-action px-5 py-2.5 text-[13px] font-semibold text-action-text transition-opacity hover:opacity-80"
          >
            Get the app
          </Link>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
