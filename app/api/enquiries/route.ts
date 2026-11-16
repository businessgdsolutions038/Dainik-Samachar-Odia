import { NextResponse } from 'next/server';

import { enquirySchema } from '@/lib/validation/enquiry';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

const MIN_FILL_MS = 3000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

// Basic per-address limit (best effort: resets when the server restarts).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function tooManyRequests(request: Request): boolean {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

export async function POST(request: Request) {
  if (tooManyRequests(request)) {
    return NextResponse.json({ error: 'rateLimited' }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? 'form');
      if (!fields[field]) fields[field] = issue.message;
    }
    return NextResponse.json({ error: 'validation', fields }, { status: 400 });
  }

  const data = parsed.data;
  if (data.website) return NextResponse.json({ ok: true });
  const age = Date.now() - data.startedAt;
  if (age < MIN_FILL_MS || age > MAX_FORM_AGE_MS) {
    return NextResponse.json({ error: 'rateLimited' }, { status: 429 });
  }

  try {
    const { error } = await getSupabaseAdmin()
      .from('enquiries')
      .insert({
        kind: data.kind,
        locale: data.locale,
        name: data.name,
        organisation: data.organisation ?? null,
        email: data.email,
        phone: data.phone ?? null,
        requirement: data.requirement ?? null,
        message: data.message,
      });

    if (error) {
      console.error('Enquiry insert failed', error.message);
      return NextResponse.json({ error: 'server' }, { status: 500 });
    }
  } catch (err) {
    console.error('Enquiry handler failed', err);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
