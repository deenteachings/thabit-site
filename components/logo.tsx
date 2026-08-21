import Image from "next/image";

export default function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <>
      <Image
        src="/logo-black.png"
        alt="Thābit"
        width={512}
        height={512}
        priority
        className={`${className} dark:hidden`}
      />
      <Image
        src="/logo-white.png"
        alt="Thābit"
        width={512}
        height={512}
        priority
        className={`${className} hidden dark:block`}
      />
    </>
  );
}
