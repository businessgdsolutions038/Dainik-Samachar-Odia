'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { alternateLocalePath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/en';

export function LanguageSwitcher({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname() || `/${locale}`;
  const target: Locale = locale === 'en' ? 'or' : 'en';
  return (
    <Link
      href={alternateLocalePath(pathname, target)}
      hrefLang={target}
      lang={target}
      aria-label={dict.ui.switchLanguageLabel}
      className="inline-flex h-10 items-center border border-ink-900 px-4 text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    >
      {dict.ui.switchLanguage}
    </Link>
  );
}
