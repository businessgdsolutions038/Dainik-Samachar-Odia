/** Marks information that has not been verified yet, so it is easy to find and replace later. */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span
      data-placeholder="true"
      className="inline-block border border-dashed border-gold-500 bg-gold-100 px-2 py-0.5 text-sm text-gold-700"
    >
      {children}
    </span>
  );
}
