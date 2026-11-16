import Image from 'next/image';
import Link from 'next/link';
import { pathFor, type Locale } from '@/lib/i18n/config';

export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link
      href={pathFor(locale)}
      aria-label="Dainika Samachar Odia"
      className="group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    >
      <Image
        src="/logo.png"
        alt="Dainika Samachar Odia"
        width={759}
        height={446}
        priority
        className="h-12 w-auto sm:h-14"
      />
    </Link>
  );
}
