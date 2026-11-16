import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { Container, PageIntro } from '@/components/site/ui';
import { EnquiryForm } from '@/components/site/enquiry-form';

export function generateMetadata({ params }: { params: { locale: string } }) {
  return buildMetadata(isLocale(params.locale) ? params.locale : 'en', 'advertise');
}

export default function AdvertisePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);
  const a = dict.advertise;
  return (
    <>
      <PageIntro eyebrow={a.eyebrow} title={a.title} intro={a.intro} />
      <section className="bg-white py-14 sm:py-20">
        <Container>
          <h2 className="text-3xl font-semibold">{a.opportunitiesTitle}</h2>
          <ul className="mt-8 grid gap-px border border-ink-900 bg-ink-900 sm:grid-cols-2">
            {a.opportunities.map((o) => (
              <li key={o.title} className="bg-paper-50 p-7">
                <h3 className="text-xl font-semibold text-brand-700">{o.title}</h3>
                <p className="mt-2 text-ink-700">{o.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink-700"><strong>{a.rateTitle}.</strong> {a.rateBody}</p>
        </Container>
      </section>
      <section id="enquiry" className="bg-paper-100 py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold">{a.formTitle}</h2>
            <p className="mt-4 text-lg text-ink-800">{a.formIntro}</p>
          </div>
          <div className="border border-ink-900 bg-white p-6 sm:p-8">
            <EnquiryForm kind="advertising" locale={locale} dict={dict} />
          </div>
        </Container>
      </section>
    </>
  );
}
