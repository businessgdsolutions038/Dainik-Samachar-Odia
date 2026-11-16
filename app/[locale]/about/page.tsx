import { notFound } from 'next/navigation';
import { getDictionary, isLocale, pathFor } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { ButtonLink, Container, PageIntro } from '@/components/site/ui';

export function generateMetadata({ params }: { params: { locale: string } }) {
  return buildMetadata(isLocale(params.locale) ? params.locale : 'en', 'about');
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);
  const a = dict.about;
  const blocks = [
    { t: a.purposeTitle, b: a.purposeBody },
    { t: a.visionTitle, b: a.visionBody },
    { t: a.missionTitle, b: a.missionBody },
  ];
  return (
    <>
      <PageIntro eyebrow={a.eyebrow} title={a.title} intro={a.intro} />
      <section className="bg-white py-14 sm:py-20">
        <Container className="space-y-10">
          {blocks.map((x) => (
            <article key={x.t} className="grid gap-4 border-t border-ink-900 pt-6 md:grid-cols-[0.5fr_1.5fr] md:gap-12">
              <h2 className="text-2xl font-semibold text-brand-700">{x.t}</h2>
              <p className="max-w-2xl font-serif text-xl leading-relaxed">{x.b}</p>
            </article>
          ))}
        </Container>
      </section>
      <section className="bg-paper-100 py-14 sm:py-20">
        <Container>
          <h2 className="text-3xl font-semibold">{a.valuesTitle}</h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-700">{a.valuesIntro}</p>
          <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {dict.home.values.items.map((v) => (
              <div key={v.title} className="border-l-4 border-brand-600 pl-5">
                <dt className="font-serif text-2xl font-semibold">{v.title}</dt>
                <dd className="mt-2 text-lg leading-relaxed text-ink-700">{v.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <section className="bg-ink-900 py-14 text-white sm:py-20">
        <Container className="max-w-4xl">
          <h2 className="text-2xl font-semibold">{a.commitmentTitle}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-100">{a.commitmentBody}</p>
          <div className="mt-8">
            <ButtonLink href={pathFor(locale, 'contact')} variant="light">{dict.nav.contact}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
