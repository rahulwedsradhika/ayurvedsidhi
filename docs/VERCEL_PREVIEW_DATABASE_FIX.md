# Vercel 35-Test Developer Preview (Read-only Bridge)

## Confirmed root cause

The original Vercel deployment built only client/ (Vite), while /api/quizzes
and /api/quizzes/:id were implemented in a separate local Express server on
port 5000. The Vite dev proxy does not exist in production builds, so the
35-test preview cannot fetch its data on Vercel.

The repository schema file (server/src/db/schema.sql) is SQLite DDL, not
a PostgreSQL schema or complete SQL data dump. The actual records are in
server/data/ayurquest.db.

## Preview-only remediation

The preview branch introduces read-only Vercel functions:
- GET /api/health (counts to validate actual SQLite contents)
- GET /api/quizzes and GET /api/tests
- GET /api/quizzes/:id and GET /api/tests/:id
- GET /api/dashboard (minimal preview-only header metadata)

All endpoints query the Git-tracked SQLite database, included as
client/api/_data/ayurquest.db by pointing to the same existing Git blob.
No synthetic MCQs are generated. The database is read-only, and the
function rejects production deployments using VERCEL_ENV.

Expected counts **must be verified from /api/health** rather than trusting
the existing hard-coded 35 / 4200 preview labels.

## Limitations

This is *not* a Supabase connection or migration. It does not deploy the
local Express API, save test attempts, authenticate users, manage memberships,
or expose lectures/courses not backed by the SQLite test database. It is
intentionally limited to a protected Vercel preview so paid test answers
are not inadvertently made public. Review licensing and access controls
before considering any release.

## Dedicated Supabase migration (separate task)

1. Select an appropriate **new Supabase project**, not the existing wedding
   site database. Confirm organization and project-cost quote before creation.
2. Convert SQLite DDL to PostgreSQL DDL and create RLS-safe tables.
3. Import actual records from server/data/ayurquest.db (not just schema.sql).
4. Verify the actual counts and all 35 series IDs, 120 questions per test,
   foreign-key integrity and stable question order.
5. Add server-side Supabase queries to Vercel functions with secret credentials
   managed in Vercel Preview environment, not exposed to the Vite client.
6. Enforce authentication, paid access and publisher/content rights.
7. Only then replace the read-only preview bridge and consider production.
