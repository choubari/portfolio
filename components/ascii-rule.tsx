/** Small static ASCII mark, used as a typographic sign-off. */
export function AsciiRule() {
  return (
    <pre
      aria-hidden="true"
      className="select-none font-mono text-[9px] leading-[1.1] text-[var(--accent-soft)]"
    >
{`   /\\
  /  \\
 |    |
 |____|
  /\\/\\`}
    </pre>
  );
}
