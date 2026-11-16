/*
# Create enquiries table for website contact and advertising forms

1. New Tables
- `enquiries`
  - `id` (uuid, primary key)
  - `kind` (text): either 'contact' (Contact Us form) or 'advertising' (Advertise With Us form)
  - `name` (text, required)
  - `organisation` (text, optional, used by advertising enquiries)
  - `email` (text, required)
  - `phone` (text, optional)
  - `requirement` (text, optional, advertising requirement category)
  - `message` (text, required)
  - `locale` (text): 'en' or 'or', the language the form was submitted in
  - `created_at` (timestamptz)

2. Security
- Row level security is enabled on `enquiries`.
- No anon or authenticated access: visitors cannot read, change or list enquiries directly from the browser.
- Only the server (service role) can insert, read, update and delete rows. The website's server-side form handler performs validation and spam checks before inserting.

3. Important Notes
- Length and format checks are enforced in the database as a second layer of validation.
- Submissions are stored for the publication team to review; no reader accounts are involved.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('contact', 'advertising')),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  organisation text CHECK (organisation IS NULL OR char_length(organisation) <= 160),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254 AND email LIKE '%_@_%.__%'),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 30),
  requirement text CHECK (requirement IS NULL OR char_length(requirement) <= 80),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 4000),
  locale text NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'or')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON enquiries FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON enquiries TO service_role;

DROP POLICY IF EXISTS "service_role_select_enquiries" ON enquiries;
CREATE POLICY "service_role_select_enquiries" ON enquiries FOR SELECT
TO service_role USING (true);

DROP POLICY IF EXISTS "service_role_insert_enquiries" ON enquiries;
CREATE POLICY "service_role_insert_enquiries" ON enquiries FOR INSERT
TO service_role WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_update_enquiries" ON enquiries;
CREATE POLICY "service_role_update_enquiries" ON enquiries FOR UPDATE
TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_delete_enquiries" ON enquiries;
CREATE POLICY "service_role_delete_enquiries" ON enquiries FOR DELETE
TO service_role USING (true);
