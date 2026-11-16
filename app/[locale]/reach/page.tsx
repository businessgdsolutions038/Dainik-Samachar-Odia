import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Container, PageIntro } from '@/components/site/ui';
import { Placeholder } from '@/components/site/placeholder';

export function generateMetadata({ params }: { params: { locale: string } }) {
  return buildMetadata(isLocale(params.locale) ? params.locale : 'en', 'reach');
}

export default function ReachPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDictionary(params.locale);
  const r = dict.reach;
  return (
    <>
      <PageIntro eyebrow={r.eyebrow} title={r.title} intro={r.intro} />
      <section className="bg-white py-14 sm:py-20">
        <Container>
          <ul className="grid gap-px border border-ink-900 bg-ink-900 sm:grid-cols-2">
            {r.cards.map((c) => (
              <li key={c.title} className="bg-paper-50 p-7">
                <h2 className="text-xl font-semibold">{c.title}</h2>
                <p className="mt-2 text-ink-700">{c.body}</p>
                <p className="mt-4">
                  <Placeholder>{dict.ui.toBeConfirmed}</Placeholder>
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="border-l-4 border-gold-500 bg-gold-100 p-5">
              <h2 className="text-xl font-semibold">{r.statusTitle}</h2>
              <p className="mt-2 text-ink-800">{r.statusBody}</p>
            </div>
            <div className="border border-dashed border-ink-500 p-5">
              <h2 className="text-xl font-semibold">{r.mapTitle}</h2>
              <p className="mt-2 text-ink-700">{r.mapBody}</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
