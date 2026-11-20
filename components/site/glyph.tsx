import { GLYPHS, type GlyphName } from "@/components/site/glyph-paths";

// One of the app's Phosphor icons. Decorative unless given a label.
export default function Glyph({
  name,
  className,
  label,
}: {
  name: GlyphName;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {GLYPHS[name].map((d) => (
        <path key={d.slice(0, 24)} d={d} />
      ))}
    </svg>
  );
}
