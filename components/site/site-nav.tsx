'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { pathFor, pageSlugs, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/en';
import { LanguageSwitcher } from './language-switcher';

const navPages = ['home', 'about', 'publication', 'reach', 'advertise', 'contact'] as const;

export function SiteNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const links = navPages.map((page) => {
    const href = pathFor(locale, page);
    const active = pathname === href;
    return { page, href, active, label: dict.nav[page] };
  });

  return (
    <>
      <nav aria-label={dict.ui.mainNavigation} className="hidden items-center gap-1 lg:flex">
        {links.map((l) => (
          <Link
            key={l.page}
            href={l.href}
            aria-current={l.active ? 'page' : undefined}
            className={`px-3 py-2 text-[0.95rem] font-medium transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
              l.active ? 'border-b-2 border-brand-600 text-brand-600' : 'border-b-2 border-transparent text-ink-800'
            }`}
          >
            {l.label}
          </Link>
        ))}
        <span className="ml-3">
          <LanguageSwitcher locale={locale} dict={dict} />
        </span>
      </nav>

      <div className="flex items-center gap-2 lg:hidden">
        <LanguageSwitcher locale={locale} dict={dict} />
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? dict.ui.closeMenu : dict.ui.openMenu}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center border border-ink-900 text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label={dict.ui.mobileNavigation}
          className="absolute inset-x-0 top-full border-b border-t border-ink-900 bg-paper-50 shadow-lg lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-5 py-2 sm:px-8">
            {links.map((l) => (
              <li key={l.page} className="border-b border-ink-100 last:border-0">
                <Link
                  href={l.href}
                  aria-current={l.active ? 'page' : undefined}
                  className={`block py-3 text-base font-medium ${l.active ? 'text-brand-600' : 'text-ink-900'}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
