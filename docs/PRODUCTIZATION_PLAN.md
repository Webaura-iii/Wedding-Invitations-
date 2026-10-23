# Webaura Wedding Invitations — Productization Plan

## Product goal

Turn the current luxury Muslim wedding invitation into a repeatable service that Webaura can configure, preview, publish, and hand over to many couples without editing the source code for every order.

The current repository is the **invitation experience/template**, not yet a complete multi-client SaaS. The existing React experience should be preserved: the wax-sealed envelope, white-rose/ivory aesthetic, English/Urdu/Arabic language switcher, countdown, calendar link, venue map, and closing dua.

## Product modes

1. **Public invitation** — a unique, shareable URL for guests; published data is read-only.
2. **Couple preview** — draft changes can be reviewed before publication; never expose the editor to guests.
3. **Webaura operator workspace** — create an invitation, assign its owner, update event details, preview all three languages, publish/unpublish, and copy the guest link.
4. **Couple self-service (later phase)** — optional account and explicitly scoped permissions; do not make it a prerequisite for the first service launch.

## Recommended stack

- Frontend: existing React 19 + TypeScript + Vite + Tailwind CSS.
- Hosting: Vercel.
- Data/authentication: Firebase Authentication + Cloud Firestore.
- Public URL: `https://<domain>/<slug>` or `?invite=<slug>` during the first migration. Prefer a path-based slug once routing and Vercel rewrites are configured.
- Media: Firebase Storage only for uploaded, approved couple photos/assets. Keep the default invitation assets local.
- Source control: feature branches and pull requests; never commit service-account credentials or private keys.

## Invitation record

Each invitation should have a stable ID, URL slug, status, owner UID, created/updated timestamps, and a complete localized content document. Localized fields must contain English, Urdu, and Arabic values. Store the event's ISO timestamp together with an IANA timezone (for example, `Asia/Kolkata`); do not infer a timezone from the visitor's browser.

Suggested record shape:

```ts
type Language = 'en' | 'ur' | 'ar';
type LocalizedText = Record<Language, string>;
type InvitationStatus = 'draft' | 'published' | 'archived';

interface InvitationRecord {
  id: string;
  slug: string;
  ownerUid: string;
  status: InvitationStatus;
  groom: { name: LocalizedText; parents?: LocalizedText };
  bride: { name: LocalizedText; parents?: LocalizedText };
  nameOrder: 'groom_first' | 'bride_first';
  initials: string;
  eventDateTimeISO: string;
  timeZone: string;
  nikah: {
    title: LocalizedText;
    dayAndDate: LocalizedText;
    time: LocalizedText;
    venueName: LocalizedText;
    venueAddress: LocalizedText;
    cityCountry: LocalizedText;
    mapQuery: string;
  };
  dressCode?: LocalizedText;
  duaText?: LocalizedText;
  createdAt: unknown;
  updatedAt: unknown;
  publishedAt?: unknown;
}
```

## Security model (non-negotiable)

- Every write must be authenticated and restricted to the invitation owner or an explicitly authorized Webaura operator.
- Public guests may read **published** invitation documents only; guests must never read drafts, owner profiles, billing records, or other invitations.
- Never trust a client-supplied `ownerUid`, role, status, or slug uniqueness check. Validate ownership and allowed fields in Firestore rules and trusted server-side code.
- Do not ship Firebase Admin SDK credentials in Vite variables or browser bundles. Only Firebase web configuration belongs in client environment variables; Firestore rules remain the authorization boundary.
- Rate-limit or otherwise protect invitation creation and publishing through trusted server code before accepting public self-service.
- Avoid collecting guest data or RSVP information until its retention, consent, and access model is defined.

A starter rules file is provided in `firestore.rules`. Review it against the final collection layout before enabling production data. Security rules should be tested with the Firebase Emulator Suite before launch.

## Phased delivery

### Phase 1 — Product foundation (this branch)
- Document the product model, client onboarding checklist, data contract, security boundaries, and launch gates.
- Preserve the current invitation template and its visual identity.
- Identify demo-only functionality so it is not mistaken for a real client dashboard.

### Phase 2 — Firebase-backed invitation loading
- Add Firebase web SDK and validated environment configuration.
- Load published invitations by slug; show a graceful not-found/unpublished state.
- Separate invitation content from UI components and localize every client-editable field.
- Keep a local demo fixture for development, but never silently show sample couple details for an unknown production slug.

### Phase 3 — Webaura operator workspace
- Firebase Authentication for staff.
- Invitation list, create/edit form, slug validation, three-language preview, draft/publish/archive actions.
- Firestore rules + emulator tests. Operator access must be enforced server-side/rules-side, not merely hidden in UI.

### Phase 4 — Client handover and polish
- Mobile, keyboard, screen-reader, RTL and reduced-motion testing.
- Verify image licensing, custom fonts, date/time and calendar behavior.
- Add Open Graph/social preview metadata per invitation.
- Add deployment preview checks and production smoke tests.

### Phase 5 — Commercial features (only after core reliability)
- Optional RSVP, guest list, payment/subscription, analytics and client accounts.
- Define privacy, retention, deletion, support and billing policies before collecting additional personal data.

## Definition of done for a paid invitation

- A unique URL opens the correct published couple's content on another device without relying on localStorage.
- English, Urdu and Arabic show consistent names, family text, event date, venue, dress code and dua.
- Unknown, draft, archived and deleted slugs never fall back to another couple's data.
- Guests cannot access the editor or unpublished information.
- Calendar download uses the intended event timezone and correct start/end time.
- Mobile and desktop flows work, including opening and resealing the invitation.
- Build, type checks, rules tests and a production smoke test pass.
- Webaura can unpublish the invitation and handle a correction request.

## Current known gaps

The current app initializes from `initialWeddingConfig` and stores customizations in browser `localStorage`. That is suitable for a single-device demo, but not for sharing a client's edits with guests. The floating customizer is a preview tool, not authentication-protected administration. These must be replaced or explicitly disabled for production guest links during Phase 2/3.

The current calendar export uses `toISOString()` but emits date-time values without a UTC marker/timezone definition. Correct this and test the exported `.ics` file before treating calendar support as production-ready.
