import Image from "next/image";

/** Company mark, falling back to a monogram when there is no logo file. */
export function CompanyLogo({
  name,
  logo,
  size = 36,
}: {
  name: string;
  logo?: string;
  size?: number;
}) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-sm bg-white object-contain p-0.5 ring-1 ring-[var(--rule)]"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="mono flex shrink-0 items-center justify-center rounded-sm bg-white uppercase text-[var(--muted)] ring-1 ring-[var(--rule)]"
      style={{ width: size, height: size }}
    >
      {name.slice(0, 2)}
    </span>
  );
}
