# Dainika Samachar Odia: corporate website

English at `/en`, Odia at `/or`. Seven pages: Home, About Us, Our Publication, Our Reach, Advertise With Us, Contact Us, Privacy Policy.

## Where to change things (no coding needed for the first two)
- **Phone, email, address, social links:** `lib/site.ts`. Empty values show a "To be confirmed" tag on the site. Fill them in only once verified.
- **All wording, English and Odia:** `lib/i18n/en.ts` and `lib/i18n/or.ts`. Keep both files in step.
- **Odia nameplate:** `components/site/masthead.tsx`.

## Enquiry forms
Both forms save to a Supabase table called `enquiries` (created by `supabase/migrations/…sql`).
Add these three settings on Vercel (Project Settings → Environment Variables); see `.env.example`:
`NEXT_PUBLIC_SITE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
Keep the service-role key secret. It is only used on the server.

Spam protection: hidden trap field, minimum fill time, per-address limit, server-side validation.

## Not built (Phase 1 exclusions)
No news listings, ticker, RSS, CMS, video, accounts or payments.
