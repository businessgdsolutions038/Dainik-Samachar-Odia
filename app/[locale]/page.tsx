import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale, pathFor } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Masthead } from '@/components/site/masthead';
import { FrontPageArt } from '@/components/site/front-page-art';
import { ButtonLink, Container, SectionHeading } from '@/components/site/ui';
import { EnquiryForm } from '@/components/site/enquiry-form';
import { Placeholder } from '@/components/site/placeholder';

export function generateMetadata({ params }: { params: { locale: string } }) {
  return buildMetadata(isLocale(params.locale) ? params.locale : 'en', 'home');
}

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);
  const h = dict.home;

  return (
    <>
      {/* 1. Hero: the masthead leads, then the introduction */}
      <section aria-labelledby="hero-title" className="bg-paper-50">
        <Masthead dict={dict} as="p" />
        <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="flex items-center gap-3 text-base font-semibold text-brand-600">
              <span aria-hidden="true" className="h-0.5 w-8 bg-brand-600" />
              {h.hero.eyebrow}
            </p>
            <h1 id="hero-title" className="mt-4 text-4xl font-semibold sm:text-5xl lg:text-[3.4rem] lg:leading-[1.12]">
              {h.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">{h.hero.body}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href={pathFor(locale, 'about')}>{h.hero.primaryCta}</ButtonLink>
              <ButtonLink href={pathFor(locale, 'advertise')} variant="outline">
                {h.hero.secondaryCta}
              </ButtonLink>
            </div>
            <p className="mt-8 font-serif text-xl italic text-ink-800">{dict.brand.tagline}</p>
          </div>
          <FrontPageArt label={h.hero.caption} />
        </Container>
      </section>

      {/* 2. About */}
      <section aria-labelledby="about-title" className="border-t border-ink-900 bg-paper-100 py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div id="about-title">
            <SectionHeading eyebrow={h.about.eyebrow} title={h.about.title} />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-800">
            <p>{h.about.body}</p>
            <p className="border-l-4 border-gold-500 bg-white p-4 text-base text-ink-700">{h.about.secondary}</p>
            <Link className="inline-block font-semibold text-brand-600 underline underline-offset-4" href={pathFor(locale, 'about')}>
              {dict.ui.learnMore}
            </Link>
          </div>
        </Container>
      </section>

      {/* 3. Vision and mission */}
      <section aria-labelledby="vm-title" className="bg-white py-16 sm:py-24">
        <Container>
          <h2 id="vm-title" className="sr-only">{h.visionMission.title}</h2>
          <SectionHeading eyebrow={h.visionMission.eyebrow} title={h.visionMission.title} />
          <div className="mt-12 grid gap-0 border-y border-ink-900 md:grid-cols-2">
            <article className="py-8 md:border-r md:border-ink-900 md:pr-10">
              <h3 className="text-2xl font-semibold text-brand-700">{h.visionMission.visionTitle}</h3>
              <p className="mt-4 font-serif text-xl leading-relaxed text-ink-900">{h.visionMission.visionBody}</p>
            </article>
            <article className="border-t border-ink-900 py-8 md:border-t-0 md:pl-10">
              <h3 className="text-2xl font-semibold text-brand-700">{h.visionMission.missionTitle}</h3>
              <p className="mt-4 font-serif text-xl leading-relaxed text-ink-900">{h.visionMission.missionBody}</p>
            </article>
          </div>
        </Container>
      </section>

      {/* 4. Masthead showcase */}
      <section aria-labelledby="masthead-title" className="bg-ink-900 py-16 text-white sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <SectionHeading eyebrow={h.masthead.eyebrow} title={h.masthead.title} tone="light" />
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-100">{h.masthead.body}</p>
              <Link className="mt-6 inline-block font-semibold text-white underline underline-offset-4" href={pathFor(locale, 'publication')}>
                {dict.nav.publication}
              </Link>
            </div>
            <div>
              <div className="bg-paper-50 p-3 sm:p-5">
                <Masthead dict={dict} size="compact" as="h2" />
              </div>
              <p className="mt-3 text-sm text-ink-300">{h.masthead.nameplateCaption}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Reach */}
      <section aria-labelledby="reach-title" className="bg-paper-100 py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow={h.reach.eyebrow} title={h.reach.title} />
              <p className="mt-5 text-lg leading-relaxed text-ink-800">{h.reach.body}</p>
              <div className="mt-7">
                <ButtonLink href={pathFor(locale, 'reach')} variant="outline">
                  {h.reach.cta}
                </ButtonLink>
              </div>
            </div>
            <ul className="grid gap-px border border-ink-900 bg-ink-900 sm:grid-cols-2">
              {dict.reach.cards.map((c) => (
                <li key={c.title} className="bg-paper-50 p-5">
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-ink-700">{c.body}</p>
                  <p className="mt-3">
                    <Placeholder>{dict.ui.toBeConfirmed}</Placeholder>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 6. Editorial values */}
      <section aria-labelledby="values-title" className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow={h.values.eyebrow} title={h.values.title} />
          <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {h.values.items.map((v) => (
              <div key={v.title} className="border-l-4 border-brand-600 pl-5">
                <dt className="font-serif text-2xl font-semibold">{v.title}</dt>
                <dd className="mt-2 text-lg leading-relaxed text-ink-700">{v.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 7. Advertise */}
      <section aria-labelledby="advertise-title" className="bg-brand-700 py-16 text-white sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading eyebrow={h.advertiseTeaser.eyebrow} title={h.advertiseTeaser.title} tone="light" />
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90">{h.advertiseTeaser.body}</p>
            <div className="mt-8">
              <ButtonLink href={pathFor(locale, 'advertise')} variant="light">
                {h.advertiseTeaser.cta}
              </ButtonLink>
            </div>
          </div>
          <ul className="divide-y divide-white/30 border-y border-white/30">
            {dict.advertise.opportunities.map((o) => (
              <li key={o.title} className="py-4 text-lg font-semibold">
                {o.title}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8. Contact */}
      <section id="contact" aria-labelledby="contact-title" className="bg-paper-100 py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow={h.contactTeaser.eyebrow} title={h.contactTeaser.title} />
            <p className="mt-5 text-lg leading-relaxed text-ink-800">{h.contactTeaser.body}</p>
          </div>
          <div className="border border-ink-900 bg-white p-6 sm:p-8">
            <EnquiryForm kind="contact" locale={locale} dict={dict} />
          </div>
        </Container>
      </section>
    </>
  );
}
