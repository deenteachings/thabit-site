import Link from "next/link";
import Logo from "@/components/logo";

const NAV_LINKS = [
  { href: "#practices", label: "Inside" },
  { href: "#screens", label: "Screens" },
  { href: "#about", label: "About" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight text-primary"
        >
          <Logo className="h-7 w-auto" />
          Thābit
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
          href="#download"
          className="rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-text transition-opacity hover:opacity-80"
        >
          Get the app
        </a>
      </nav>
    </header>
  );
}
