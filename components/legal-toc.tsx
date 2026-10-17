"use client";

import { useEffect, useState } from "react";

// Contents rail for the privacy policy and terms. Marks the section being
// read; without JavaScript it is still a plain list of anchor links.
export default function LegalToc({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // The first section (in document order) inside the reading band wins.
        const current = sections.find((s) => visible.has(s.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-120px 0px -55% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="policy-toc" aria-label="Contents">
      <p>Contents</p>
      <ol>
        {sections.map(({ id, title }, i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              {title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
