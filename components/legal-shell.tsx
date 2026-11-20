import Footer from "@/components/footer";
import Nav from "@/components/site/nav";
import "@/app/site.css";
import "@/app/legal.css";

const LINKS = [
  { href: "/support", label: "Support", key: "support" },
  { href: "/privacy", label: "Privacy", key: "privacy" },
  { href: "/terms", label: "Terms", key: "terms" },
] as const;

// Shared frame for /support, /privacy and /terms: the site's header and
// footer around a paper field. The legal text inside is checked word for word
// against ~/thabit/legal by scripts/check-legal-site.mjs, which ignores
// <header>, <nav> and <footer>; keep everything else on these pages in the
// documents.
export default function LegalShell({
  current,
  children,
}: {
  current: (typeof LINKS)[number]["key"];
  children: React.ReactNode;
}) {
  return (
    <div className="site thabit-legal field-paper">
      <Nav
        cta="/#download"
        links={LINKS.map((l) => ({ href: l.href, label: l.label, current: l.key === current }))}
      />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
