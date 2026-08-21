import Logo from "@/components/logo";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2.5 text-[16px] font-semibold tracking-tight text-primary">
          <Logo className="h-7 w-auto" />
          Thābit
        </div>
        <nav
          aria-label="Social"
          className="flex flex-wrap items-center justify-center gap-6 text-[13px] font-medium text-secondary"
        >
          <a
            href="https://instagram.com/deenteachings"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            @deenteachings
          </a>
          <a
            href="https://instagram.com/dropyourdua"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            @DropYourDua
          </a>
          <a
            href="mailto:hello@thabitapp.com"
            className="transition-colors hover:text-primary"
          >
            hello@thabitapp.com
          </a>
        </nav>
        <p className="text-[12px] text-tertiary">
          © 2026 Thābit. Sahih sources only. Made with intention.
        </p>
      </div>
    </footer>
  );
}
