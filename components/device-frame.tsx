import Image from "next/image";

type DeviceFrameProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function DeviceFrame({
  src,
  alt,
  className = "",
  priority = false,
}: DeviceFrameProps) {
  return (
    <div className={`device-frame ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={560}
        height={1217}
        priority={priority}
        unoptimized
        className="device-screen"
      />
    </div>
  );
}
