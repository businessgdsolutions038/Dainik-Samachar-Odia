import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import { getDictionary, locales, pathFor, type Locale, type PageSlug } from '@/lib/i18n/config';

const descriptionKey = {
  home: 'homeDescription',
  about: 'aboutDescription',
  publication: 'publicationDescription',
  reach: 'reachDescription',
  advertise: 'advertiseDescription',
  contact: 'contactDescription',
  privacy: 'privacyDescription',
} as const;

export function buildMetadata(locale: Locale, page: PageSlug): Metadata {
  const dict = getDictionary(locale);
  const description = dict.seo[descriptionKey[page]];
  const title = page === 'home' ? dict.seo.homeTitle : dict.nav[page];
  const path = pathFor(locale, page);

  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = pathFor(l, page);
  languages['x-default'] = pathFor('en', page);

  return {
    title: page === 'home' ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages },
    openGraph: {
      type: 'website',
      siteName: dict.brand.name,
      title: page === 'home' ? title : `${title} | ${dict.brand.name}`,
      description,
      url: path,
      locale: locale === 'or' ? 'or_IN' : 'en_IN',
      alternateLocale: locale === 'or' ? ['en_IN'] : ['or_IN'],
      images: [{ url: '/og.png', width: 1200, height: 630, alt: dict.brand.name }],
    },
    twitter: { card: 'summary_large_image', images: ['/og.png'] },
  };
}

export const siteUrl = siteConfig.url;
