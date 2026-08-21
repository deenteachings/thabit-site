import Link from "next/link";

const NAV_LINKS = [
  { href: "#inside", label: "Inside the app" },
  { href: "#about", label: "About" },
  { href: "#download", label: "Get it" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Link
          href="/"
          className="flex items-baseline gap-2.5 text-[17px] font-semibold tracking-tight text-primary"
        >
          Thābit
          <span className="arabic text-lg font-bold" aria-hidden="true">
            ثابت
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-secondary transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <a
          href="https://instagram.com/deenteachings"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-text transition-opacity hover:opacity-80"
        >
          Follow the journey
        </a>
      </nav>
    </header>
  );
}
