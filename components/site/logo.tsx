import Link from 'next/link';
import { pathFor, type Locale } from '@/lib/i18n/config';

export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link href={pathFor(locale)} className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2">
      <span
        aria-hidden="true"
        lang="or"
        className="flex h-11 w-11 shrink-0 items-center justify-center bg-brand-600 font-odia text-2xl font-extrabold leading-none text-white"
      >
        ଦ
      </span>
      <span className="flex flex-col leading-tight">
        <span lang="or" className="font-odia text-lg font-extrabold text-ink-900 sm:text-xl">
          ଦୈନିକ ସମାଚାର ଓଡ଼ିଆ
        </span>
        <span className="font-serif text-sm italic text-ink-700">Dainik Samachar Odia</span>
      </span>
    </Link>
  );
}
