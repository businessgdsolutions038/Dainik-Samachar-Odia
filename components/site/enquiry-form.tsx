'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/en';
import { advertisingRequirements } from '@/lib/validation/enquiry';

type Kind = 'contact' | 'advertising';
type Status = 'idle' | 'sending' | 'success' | 'error';

const fieldClass =
  'mt-1.5 block w-full border border-ink-500 bg-white px-3 py-2.5 text-base text-ink-900 placeholder:text-ink-300 focus-visible:border-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 aria-[invalid=true]:border-destructive';

export function EnquiryForm({ kind, locale, dict }: { kind: Kind; locale: Locale; dict: Dictionary }) {
  const f = dict.form;
  const advertising = kind === 'advertising';
  const startedAt = useRef<number>(0);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const msg = (code?: string) => (code && (f.errors as Record<string, string>)[code]) || f.errors.generic;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const text = (k: string) => String(data.get(k) ?? '');

    setStatus('sending');
    setErrors({});
    setFormError('');

    const payload = {
      kind,
      locale,
      name: text('name'),
      organisation: advertising ? text('organisation') : undefined,
      email: text('email'),
      phone: text('phone'),
      requirement: advertising && text('requirement') ? text('requirement') : undefined,
      message: text('message'),
      website: text('website'),
      startedAt: startedAt.current,
    };

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        form.reset();
        setStatus('success');
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (res.status === 400 && body?.fields) {
        setErrors(body.fields);
      } else {
        setFormError(msg(res.status === 429 ? 'rateLimited' : 'generic'));
      }
      setStatus('error');
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setFormError(msg('network'));
      setStatus('error');
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="border-l-4 border-success bg-white p-6">
        <h3 className="font-serif text-2xl font-semibold">{f.successTitle}</h3>
        <p className="mt-2 text-ink-700">{f.successBody}</p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus('idle');
          }}
          className="mt-5 text-sm font-semibold text-brand-600 underline underline-offset-4"
        >
          {f.sendAnother}
        </button>
      </div>
    );
  }

  const hasFieldErrors = Object.keys(errors).length > 0;
  const idp = `${kind}-`;

  const Field = ({ name, label, children }: { name: string; label: string; children: React.ReactNode }) => (
    <div>
      <label htmlFor={idp + name} className="block text-sm font-semibold text-ink-900">
        {label}
      </label>
      {children}
      {errors[name] && (
        <p id={`${idp}${name}-error`} className="mt-1.5 text-sm font-medium text-destructive">
          {msg(errors[name])}
        </p>
      )}
    </div>
  );

  const aria = (name: string) => ({
    id: idp + name,
    name,
    'aria-invalid': errors[name] ? (true as const) : undefined,
    'aria-describedby': errors[name] ? `${idp}${name}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={status === 'sending'}>
      <div ref={summaryRef} tabIndex={-1} role="alert" className="outline-none">
        {(hasFieldErrors || formError) && (
          <p className="border-l-4 border-destructive bg-white p-3 text-sm font-medium text-destructive">
            {formError || f.summaryTitle}
          </p>
        )}
      </div>

      <Field name="name" label={f.labels.name}>
        <input {...aria('name')} type="text" autoComplete="name" required maxLength={120} placeholder={f.placeholders.name} className={fieldClass} />
      </Field>

      {advertising && (
        <Field name="organisation" label={f.labels.organisation}>
          <input {...aria('organisation')} type="text" autoComplete="organization" maxLength={160} placeholder={f.placeholders.organisation} className={fieldClass} />
        </Field>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="email" label={f.labels.email}>
          <input {...aria('email')} type="email" autoComplete="email" required maxLength={254} placeholder={f.placeholders.email} className={fieldClass} />
        </Field>
        <Field name="phone" label={f.labels.phone}>
          <input {...aria('phone')} type="tel" autoComplete="tel" maxLength={30} placeholder={f.placeholders.phone} className={fieldClass} />
        </Field>
      </div>

      {advertising && (
        <Field name="requirement" label={f.labels.requirement}>
          <select {...aria('requirement')} defaultValue="" className={fieldClass}>
            <option value="">{f.labels.requirementPlaceholder}</option>
            {advertisingRequirements.map((r) => (
              <option key={r} value={r}>
                {f.requirements[r]}
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field name="message" label={f.labels.message}>
        <textarea {...aria('message')} rows={6} required minLength={10} maxLength={4000} placeholder={f.placeholders.message} className={fieldClass} />
      </Field>

      {/* Spam trap: hidden from people and screen readers; bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={idp + 'website'}>Website</label>
        <input id={idp + 'website'} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex h-12 items-center justify-center bg-brand-600 px-8 text-base font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? f.labels.submitting : f.labels.submit}
      </button>
    </form>
  );
}
