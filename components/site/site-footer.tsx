import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/en';
import { siteConfig } from '@/lib/site';
import { Logo } from './logo';
import { Placeholder } from './placeholder';

const socialIcons = { facebook: Facebook, x: Twitter, instagram: Instagram, youtube: Youtube } as const;
const socialNames = { facebook: 'Facebook', x: 'X', instagram: 'Instagram', youtube: 'YouTube' } as const;

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const tbc = dict.ui.toBeConfirmed;
  const address = siteConfig.address[locale];
  const socials = (Object.keys(siteConfig.social) as (keyof typeof siteConfig.social)[]).filter(
    (k) => siteConfig.social[k]
  );
  const navPages = ['home', 'about', 'publication', 'reach', 'advertise', 'contact'] as const;

  return (
    <footer className="border-t-[3px] border-ink-900 bg-ink-900 text-ink-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <div className="inline-block bg-paper-50 p-3">
            <Logo locale={locale} />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">{dict.footer.description}</p>
          <p className="mt-4 font-serif text-base italic text-white">{dict.brand.tagline}</p>
        </div>

        <nav aria-label={dict.ui.footerNavigation}>
          <h2 className="font-serif text-lg font-semibold text-white">{dict.footer.navTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navPages.map((p) => (
              <li key={p}>
                <Link className="text-ink-300 underline-offset-4 hover:text-white hover:underline" href={pathFor(locale, p)}>
                  {dict.nav[p]}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-serif text-lg font-semibold text-white">{dict.footer.legalTitle}</h2>
          <ul className="mt-4 text-sm">
            <li>
              <Link className="text-ink-300 underline-offset-4 hover:text-white hover:underline" href={pathFor(locale, 'privacy')}>
                {dict.nav.privacy}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-serif text-lg font-semibold text-white">{dict.ui.footerContact}</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-ink-300">{dict.contact.emailLabel}</dt>
              <dd>
                {siteConfig.email ? (
                  <a className="text-white underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                ) : (
                  <Placeholder>{tbc}</Placeholder>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-ink-300">{dict.contact.phoneLabel}</dt>
              <dd>
                {siteConfig.phone ? (
                  <a className="text-white underline underline-offset-4" href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>
                    {siteConfig.phone}
                  </a>
                ) : (
                  <Placeholder>{tbc}</Placeholder>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-ink-300">{dict.contact.addressLabel}</dt>
              <dd>{address ? <span className="text-white">{address}</span> : <Placeholder>{tbc}</Placeholder>}</dd>
            </div>
          </dl>

          <h2 className="mt-8 font-serif text-lg font-semibold text-white">{dict.ui.footerFollow}</h2>
          {socials.length > 0 ? (
            <ul className="mt-4 flex gap-3">
              {socials.map((k) => {
                const Icon = socialIcons[k];
                return (
                  <li key={k}>
                    <a
                      href={siteConfig.social[k]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={socialNames[k]}
                      className="flex h-10 w-10 items-center justify-center border border-ink-500 text-white hover:bg-brand-600"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-ink-300">{dict.footer.socialNote}</p>
          )}
        </div>
      </div>
      <div className="border-t border-ink-700">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-ink-300 sm:px-8 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {dict.ui.copyright}. {dict.ui.rights}
          </p>
          <p>{dict.ui.footerNotice}</p>
        </div>
      </div>
    </footer>
  );
}
