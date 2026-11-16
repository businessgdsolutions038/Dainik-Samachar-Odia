import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="font-serif text-4xl font-semibold">Page not found · ପୃଷ୍ଠା ମିଳିଲା ନାହିଁ</h1>
      <p className="mt-4 text-ink-500">This page does not exist. · ଏହି ପୃଷ୍ଠା ଉପଲବ୍ଧ ନାହିଁ।</p>
      <div className="mt-8 flex justify-center gap-4">
        <Link className="font-medium text-brand-600 underline underline-offset-4" href="/en">English</Link>
        <Link className="font-medium text-brand-600 underline underline-offset-4" href="/or">ଓଡ଼ିଆ</Link>
      </div>
    </div>
  );
}
