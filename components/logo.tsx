import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <h1 className="text-2xl font-bold">
        {"<"}
        <span style={{ color: "var(--color-accent)" }}>Choubari</span>
        {"/>"}
      </h1>
    </Link>
  );
}
