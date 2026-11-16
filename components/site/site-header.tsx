import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/en';
import { Logo } from './logo';
import { SiteNav } from './site-nav';

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header className="relative z-40 border-b border-ink-900 bg-paper-50">
      <div className="bg-ink-900 text-white">
        <p className="mx-auto max-w-6xl px-5 py-1.5 text-center text-xs sm:px-8 sm:text-sm">
          {dict.ui.launchStatusLong}
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Logo locale={locale} />
        <SiteNav locale={locale} dict={dict} />
      </div>
    </header>
  );
}
