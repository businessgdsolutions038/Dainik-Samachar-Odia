import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Masthead } from '@/components/site/masthead';
import { Container, PageIntro } from '@/components/site/ui';
import { Placeholder } from '@/components/site/placeholder';

export function generateMetadata({ params }: { params: { locale: string } }) {
  return buildMetadata(isLocale(params.locale) ? params.locale : 'en', 'publication');
}

export default function PublicationPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDictionary(params.locale);
  const p = dict.publication;
  return (
    <>
      <PageIntro eyebrow={p.eyebrow} title={p.title} intro={p.intro} />
      <section className="bg-paper-50 py-10 sm:py-14">
        <Container>
          <h2 className="sr-only">{p.mastheadTitle}</h2>
          <div className="border border-ink-900 bg-paper-50 py-2">
            <Masthead dict={dict} as="p" />
          </div>
          <p className="mt-4 max-w-2xl text-ink-700">{p.mastheadBody}</p>
        </Container>
      </section>
      <section className="bg-white py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold">{p.statusTitle}</h2>
            <p className="mt-3 border-l-4 border-gold-500 bg-gold-100 p-4 text-lg text-ink-800">{p.statusBody}</p>
            <h2 className="mt-10 text-2xl font-semibold">{p.principlesTitle}</h2>
            <ul className="mt-4 space-y-3 text-lg text-ink-800">
              {p.principles.map((x) => (
                <li key={x} className="border-l-4 border-brand-600 pl-4">{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{p.detailsTitle}</h2>
            <dl className="mt-4 divide-y divide-ink-300 border-y border-ink-900">
              {p.details.map((d) => (
                <div key={d.label} className="grid grid-cols-[0.8fr_1.2fr] gap-4 py-3">
                  <dt className="font-semibold text-ink-700">{d.label}</dt>
                  <dd>
                    {d.value === 'To be confirmed' || d.value === dict.ui.toBeConfirmed ? (
                      <Placeholder>{dict.ui.toBeConfirmed}</Placeholder>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>
    </>
  );
}
