import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { locales, pageSlugs, pathFor } from '@/lib/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['home', ...pageSlugs] as const;
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteConfig.url}${pathFor(locale, page)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === 'home' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.url}${pathFor(l, page)}`])
        ),
      },
    }))
  );
}
