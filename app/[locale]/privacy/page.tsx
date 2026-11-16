import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Container, PageIntro } from '@/components/site/ui';

export function generateMetadata({ params }: { params: { locale: string } }) {
  return buildMetadata(isLocale(params.locale) ? params.locale : 'en', 'privacy');
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const p = getDictionary(params.locale).privacy;
  return (
    <>
      <PageIntro eyebrow={p.eyebrow} title={p.title} intro={p.intro} />
      <section className="bg-white py-14 sm:py-20">
        <Container className="max-w-3xl">
          <p className="mb-8 text-sm text-ink-500">{p.updated}</p>
          <div className="space-y-8">
            {p.sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-lg leading-relaxed text-ink-800">{s.body}</p>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
