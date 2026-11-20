import Image from "next/image";

// A plain iPhone frame around a 2.0 screen render (440 x 956 pt, drawn at
// 660 x 1434 px). The screens themselves are square-cornered; only the glass
// and bezel round, as the hardware does.
export default function Phone({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-glass">
        <Image
          src={src}
          alt={alt}
          width={660}
          height={1434}
          priority={priority}
          unoptimized
          sizes="(max-width: 640px) 70vw, 330px"
        />
        <span className="phone-island" aria-hidden="true" />
      </div>
    </div>
  );
}
