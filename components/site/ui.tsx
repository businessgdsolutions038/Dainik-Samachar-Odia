import Link from 'next/link';

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'light';
}) {
  const styles = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-600',
    outline: 'border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white focus-visible:ring-ink-900',
    light: 'bg-white text-brand-700 hover:bg-paper-200 focus-visible:ring-white',
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center px-7 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles}`}
    >
      {children}
    </Link>
  );
}

/** Heading block used at the top of every section. The small red label is plain text with a short rule. */
export function SectionHeading({
  eyebrow,
  title,
  tone = 'dark',
  as: H = 'h2',
}: {
  eyebrow?: string;
  title: string;
  tone?: 'dark' | 'light';
  as?: 'h1' | 'h2';
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className={`flex items-center gap-3 text-base font-semibold ${tone === 'light' ? 'text-white/90' : 'text-brand-600'}`}>
          <span aria-hidden="true" className={`h-0.5 w-8 ${tone === 'light' ? 'bg-white/70' : 'bg-brand-600'}`} />
          {eyebrow}
        </p>
      )}
      <H className={`mt-3 text-3xl font-semibold sm:text-4xl ${tone === 'light' ? 'text-white' : 'text-ink-900'}`}>{title}</H>
    </div>
  );
}

export function PageIntro({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="border-b border-ink-900 bg-paper-100">
      <Container className="py-14 sm:py-20">
        <SectionHeading eyebrow={eyebrow} title={title} as="h1" />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">{intro}</p>
      </Container>
    </section>
  );
}
