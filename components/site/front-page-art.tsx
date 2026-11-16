/** Original illustration of a newspaper front page (no photographs, no invented headlines). */
export function FrontPageArt({ label }: { label: string }) {
  const lines = (n: number, x: number, y: number, w: number) =>
    Array.from({ length: n }, (_, i) => (
      <rect key={`${x}-${y}-${i}`} x={x} y={y + i * 9} width={i % 5 === 4 ? w * 0.6 : w} height="3" fill="#b8b8b5" />
    ));
  return (
    <figure className="relative mx-auto w-full max-w-md">
      <svg viewBox="0 0 360 460" role="img" aria-label={label} className="h-auto w-full drop-shadow-[8px_8px_0_rgba(22,22,21,0.12)]">
        <rect width="360" height="460" fill="#fffdf9" stroke="#161615" strokeWidth="2" />
        <rect x="14" y="14" width="332" height="62" fill="#b5161c" />
        <rect x="70" y="36" width="220" height="18" rx="2" fill="#fff" opacity="0.95" />
        <rect x="14" y="84" width="332" height="3" fill="#161615" />
        <rect x="14" y="90" width="332" height="1" fill="#161615" />
        <rect x="14" y="104" width="206" height="14" fill="#161615" />
        <rect x="14" y="124" width="150" height="14" fill="#161615" />
        <rect x="14" y="148" width="206" height="118" fill="#e8e1d1" />
        <path d="M14 266 L92 196 L140 236 L176 208 L220 266 Z" fill="#cdc4af" />
        <circle cx="178" cy="176" r="12" fill="#f5ecd7" />
        {lines(6, 14, 278, 206)}
        <rect x="232" y="104" width="1" height="338" fill="#161615" />
        <rect x="244" y="104" width="102" height="10" fill="#161615" />
        {lines(8, 244, 124, 102)}
        <rect x="244" y="208" width="102" height="10" fill="#b5161c" />
        {lines(9, 244, 228, 102)}
        <rect x="14" y="346" width="206" height="1" fill="#161615" />
        <rect x="14" y="358" width="120" height="10" fill="#161615" />
        {lines(7, 14, 376, 206)}
        <rect x="244" y="330" width="102" height="96" fill="none" stroke="#161615" strokeWidth="1" />
        {lines(5, 252, 342, 86)}
      </svg>
      <figcaption className="mt-4 border-l-2 border-brand-600 pl-3 text-sm text-ink-700">{label}</figcaption>
    </figure>
  );
}
