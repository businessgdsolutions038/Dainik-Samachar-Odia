import '../globals.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import localFont from 'next/font/local';
import { getDictionary, isLocale, locales } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/site';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';

// Fonts are bundled with the site (no Google Fonts request at build or run time).
const serif = localFont({
  src: [
    { path: '../fonts/newsreader.woff2', weight: '200 800', style: 'normal' },
    { path: '../fonts/newsreader-italic.woff2', weight: '200 800', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
});
const sans = localFont({
  src: '../fonts/source-sans-3.woff2',
  weight: '200 900',
  variable: '--font-sans',
  display: 'swap',
});
const odia = localFont({
  src: '../fonts/noto-sans-oriya.woff2',
  weight: '100 900',
  variable: '--font-odia',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en';
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.seo.homeTitle, template: `%s | ${dict.brand.name}` },
    description: dict.seo.homeDescription,
    applicationName: dict.brand.name,
    themeColor: '#b5161c',
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable} ${odia.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.ui.skipToContent}
        </a>
        <SiteHeader locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}
