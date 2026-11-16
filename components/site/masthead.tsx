import type { Dictionary } from '@/lib/i18n/en';

/**
 * The Odia nameplate: the one signature element of the site.
 * Red band, large Odia script, flanked by two "ears" and closed with a double rule,
 * as on a printed front page. The ears only carry facts we can stand behind.
 */
export function Masthead({
  dict,
  size = 'hero',
  as: Heading = 'p',
}: {
  dict: Dictionary;
  size?: 'hero' | 'compact';
  as?: 'h1' | 'h2' | 'p';
}) {
  const big = size === 'hero';
  return (
    <div className="bg-paper-50 text-ink-900">
      <div className="bg-brand-600 text-white">
        <div className={`mx-auto grid max-w-6xl grid-cols-1 items-center gap-y-3 px-5 py-6 sm:px-8 ${big ? 'md:grid-cols-[1fr_auto_1fr] md:gap-x-8' : ''}`}>
          {big && <div className="hidden border-l-2 border-white/60 pl-3 text-sm leading-snug md:block">
            <span className="block font-semibold">{dict.ui.launchStatus}</span>
            <span className="block text-white/80">{dict.home.hero.badge}</span>
          </div>}
          <Heading
            lang="or"
            className={`text-center font-odia font-extrabold leading-[1.35] tracking-normal ${
              big
                ? 'text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]'
                : 'whitespace-nowrap text-[1.7rem] sm:text-4xl lg:text-[2.7rem]'
            }`}
          >
            ଦୈନିକ ସମାଚାର ଓଡ଼ିଆ
          </Heading>
          {big && <div className="hidden border-r-2 border-white/60 pr-3 text-right text-sm leading-snug md:block">
            <span className="block font-semibold">{dict.ui.frequencyLabel}</span>
            <span className="block text-white/80">{dict.ui.toBeConfirmed}</span>
          </div>}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mt-3 border-t-[3px] border-ink-900" />
        <div className="mt-[3px] border-t border-ink-900" />
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 text-sm">
          <span className="font-serif text-lg font-semibold italic">{'Dainik Samachar Odia'}</span>
          <span className="text-ink-700">{dict.brand.descriptor}</span>
        </div>
        <div className="border-t border-ink-900" />
      </div>
    </div>
  );
}
