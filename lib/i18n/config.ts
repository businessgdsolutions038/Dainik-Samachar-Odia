import { en, type Dictionary } from './en';
import { or } from './or';

export const locales = ['en', 'or'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const dictionaries: Record<Locale, Dictionary> = { en, or };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const pageSlugs = [
  'about',
  'publication',
  'reach',
  'advertise',
  'contact',
  'privacy',
] as const;

export type PageSlug = (typeof pageSlugs)[number] | 'home';

export function pathFor(locale: Locale, page: PageSlug = 'home'): string {
  return page === 'home' ? `/${locale}` : `/${locale}/${page}`;
}

export function alternateLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split('/');
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = target;
    return segments.join('/') || `/${target}`;
  }
  return `/${target}`;
}
