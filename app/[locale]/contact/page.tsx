import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { Container, PageIntro } from '@/components/site/ui';
import { EnquiryForm } from '@/components/site/enquiry-form';
import { Placeholder } from '@/components/site/placeholder';

export function generateMetadata({ params }: { params: { locale: string } }) {
  return buildMetadata(isLocale(params.locale) ? params.locale : 'en', 'contact');
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);
  const c = dict.contact;
  const tbc = <Placeholder>{dict.ui.toBeConfirmed}</Placeholder>;
  return (
    <>
      <PageIntro eyebrow={c.eyebrow} title={c.title} intro={c.intro} />
      <section className="bg-paper-100 py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold">{c.detailsTitle}</h2>
            <dl className="mt-5 divide-y divide-ink-300 border-y border-ink-900">
              <div className="py-4"><dt className="font-semibold text-ink-700">{c.emailLabel}</dt><dd className="mt-1">{siteConfig.email ? <a className="text-brand-600 underline underline-offset-4" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> : tbc}</dd></div>
              <div className="py-4"><dt className="font-semibold text-ink-700">{c.phoneLabel}</dt><dd className="mt-1">{siteConfig.phone ? <a className="text-brand-600 underline underline-offset-4" href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a> : tbc}</dd></div>
              <div className="py-4"><dt className="font-semibold text-ink-700">{c.addressLabel}</dt><dd className="mt-1">{siteConfig.address[locale] || tbc}</dd></div>
            </dl>
          </div>
          <div className="border border-ink-900 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">{c.formTitle}</h2>
            <p className="mb-6 mt-2 text-ink-700">{c.formIntro}</p>
            <EnquiryForm kind="contact" locale={locale} dict={dict} />
          </div>
        </Container>
      </section>
    </>
  );
}
