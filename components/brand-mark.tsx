// The Thābit mark (public/logo-black.png) as vector: a diamond over three
// crescents, drawn in currentColor so it follows the theme. Each crescent is
// two circular arcs traced from the 512px logo (outer r 184.6, inner r 212.5).
const CRESCENT_TOPS = [189, 248, 308];

export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="96 118 320 278"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M256 129.5 L287.5 160 L256 190.5 L224.5 160 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {CRESCENT_TOPS.map((y) => (
        <path
          key={y}
          d={`M106 ${y} A184.6 184.6 0 0 0 406 ${y} A212.5 212.5 0 0 1 106 ${y} Z`}
        />
      ))}
    </svg>
  );
}
