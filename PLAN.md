# La Bella Aesthetics — Projektplan

**Premium-Website + Admin-Dashboard für ein Ästhetik-/Kosmetikstudio in München**

> Status: Planungsdokument · Stand: 2026-05-30 · Greenfield (leeres Verzeichnis)

---

## 1. Kontext & Ziel

La Bella Aesthetics ist ein Premium-Ästhetikstudio in München. Es gibt noch keinen Code — die Screenshots dienen als Design-Vorlage (dunkles Luxus-Theme, Gold-Akzente, elegante Serifen-Typografie).

**Ziel:** Eine vollständige, zweisprachige (DE/EN) Marketing-Website mit echtem Online-Buchungssystem, Online-Zahlung (Anzahlung), Kundenkonten und Newsletter — plus ein Admin-Dashboard, über das das Studio Termine, Kunden, Behandlungen, Inhalte (Blog/Galerie), Bewertungen und Statistiken selbst verwaltet.

**Markenwirkung:** elegant, feminin, ruhig, hochwertig — Gold auf nahezu Schwarz, viel Weißraum, dezente Animationen. Vertrauen (medizinische Standards, Zertifizierungen) ist ein zentrales Conversion-Element.

---

## 2. Tech-Stack (bestätigte Entscheidungen)

| Bereich | Wahl |
|---|---|
| Framework | **Next.js 15** (App Router, React Server Components) |
| Sprache | **TypeScript** |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) + shadcn/ui (restyled) |
| Animation | **Framer Motion** |
| Datenbank | **PostgreSQL** (gehostet bei **Neon**) |
| ORM | **Prisma** |
| Auth | **Auth.js (NextAuth v5)** — Rollen: CUSTOMER / STAFF / ADMIN |
| i18n | **next-intl** — DE (Standard) + EN |
| Zahlung | **Stripe** (Payment Element, Anzahlung) |
| E-Mail | **Resend + React Email** (transaktional + Newsletter) |
| Uploads | **Vercel Blob** (Galerie/Blog-Bilder) |
| Charts | **Recharts** (ggf. Tremor) |
| Rich-Text | **Tiptap** |
| Tabellen | **TanStack Table** |
| Kalender (Admin) | **FullCalendar** (Resource-Timeline) |
| Validierung | **Zod** (geteilt: Formular + Server Action) |
| Datum/Zeit | **Luxon** (DST-sicher, Europe/Berlin) |
| Tests | **Vitest** (Unit) + **Playwright** (E2E) |
| Hosting | **Vercel** (+ Vercel Cron) |

---

## 3. Design-System (UI)

Einzige Quelle der Wahrheit: `app/globals.css` mit Tailwind v4 `@theme`. Erzeugt automatisch Utilities wie `bg-bg-base`, `text-gold`, `font-display`, `rounded-pill`, `shadow-gold-glow`.

### 3.1 Farbpalette

**Hintergründe (warmes Anthrazit, nicht kaltes Schwarz):**

| Token | Hex | Einsatz |
|---|---|---|
| `bg-base` | `#0B0A09` | Seitenhintergrund (warmes Fast-Schwarz) |
| `bg-surface` | `#13110F` | Karten, abgesetzte Sektionen |
| `bg-elevated` | `#1C1916` | Hover-Karten, Popover, Modal |
| `bg-overlay` | `rgba(8,7,6,0.72)` | Modal-Scrim |

**Gold / Champagner:**

| Token | Hex | Einsatz |
|---|---|---|
| `gold` | `#C9A24B` | Primärakzent — Logo, Buttons, Icons |
| `gold-bright` | `#E7C778` | Hover/aktiv, Gradient-Top |
| `gold-muted` | `#9C7E3A` | Deaktiviert, dezente Ränder (nur große Schrift) |
| `gold-soft` | `rgba(201,162,75,0.12)` | Getönte Flächen, Hover, Focus-Halo |
| `champagne` | `#EAD9B0` | Gold-getönter Text auf Dunkel |

Optionaler Premium-Gradient (Buttons/Wordmark): `linear-gradient(135deg, #E7C778 0%, #C9A24B 45%, #9C7E3A 100%)`.

**Text:**

| Token | Hex | Kontrast auf `bg-base` | Einsatz |
|---|---|---|---|
| `text-heading` | `#F6F1E7` | ~16:1 | Überschriften |
| `text-body` | `#D6CFC4` | ~11:1 | Fließtext |
| `text-muted` | `#9A938A` | ~5:1 (AA) | Sekundär/Captions |
| `text-on-gold` | `#1A1714` | ~9:1 auf Gold | Text auf Gold-Buttons |

**Ränder:** `border-subtle` `rgba(234,217,176,0.08)` · `border-default` `rgba(234,217,176,0.16)` · `border-gold` `rgba(201,162,75,0.45)`.
**Semantisch (entsättigt):** `success #5FA07A` · `error #C0584F` · `info #6E8BA6` · `focus #E7C778`.

### 3.2 Typografie

- **Display/Überschriften → Cormorant Garamond** (Weights 400/500/600, oft *italic* für das Gold-Highlight-Wort im Hero). Ruhig, boutiquehaft, feminin.
- **Body/UI → Inter** (latin + **latin-ext** für Umlaute), eine Sans für alles Nicht-Display.
- Laden via `next/font/google` (selbst-gehostet → DSGVO-konform, kein Google-CDN), `display: swap`, CSS-Vars `--font-display` / `--font-sans`.

**Type-Scale (fluid via `clamp()`):** `display-xl` (Hero-H1) → `display-lg` → `h2` → `h3` → `body-lg` (Lead) → `body` (lh 1.7) → `caption`. **`overline`**: UPPERCASE, `letter-spacing 0.2em`, Gold — die „Eyebrow"-Labels über jeder Sektion (z. B. „UNSERE DIENSTLEISTUNGEN"). Fließtext auf ~68ch begrenzen.

### 3.3 Spacing / Radius / Schatten

- Sektions-Rhythmus: `--space-section-y: clamp(5rem, 10vw, 9rem)`; Container `max-w-[1280px]`, Inhalt `max-w-[1120px]`, Gutter `px-6 md:px-10`.
- Radius: `sm 4px` (Inputs), `md 8px` (Karten), `lg 16px` (Modals/Media), `pill 9999px` (Gold-CTA).
- Schatten dezent; „Lift" entsteht durch **Gold-Glow** + helleres Surface: `shadow-gold-glow: 0 0 0 1px rgba(201,162,75,.35), 0 8px 30px rgba(201,162,75,.18)`. Bilder mit Bottom-Scrim für Lesbarkeit.

### 3.4 Komponenten-Bibliothek

**Ansatz:** **shadcn/ui** als zugängliche Radix-Primitive (Dialog, Accordion, Toast/Sonner, Dropdown, Tooltip) — eingecheckt und auf die Tokens umgestylt. Marken-spezifische Teile (Hero, ServiceCard, TestimonialCard, SectionHeading) handgebaut.

Zu bauen: **Button** (primary Gold / secondary Outline / ghost, CVA), **Header/Nav** (sticky, transparent → solid beim Scrollen, Gold-Wordmark, animierter Underline, Sprach-Switch, Mobile-Drawer), **Footer** (4 Spalten + NAP + Öffnungszeiten + Rechtliches), **Card**, **Section + SectionHeading** (erzwingt Rhythmus + Eyebrow-Pattern), **Input/Textarea/Select/Field** (mit react-hook-form + Zod), **Badge**, **Accordion (FAQ)**, **TestimonialCard**, **ServiceCard** (dünnes Gold-Line-Icon via lucide-react), **Modal/Dialog**, **Toast (Sonner)**, **LocaleSwitcher**, **ImageUploader**, **RichTextEditor/Renderer**.

### 3.5 Motion & Animationen

Framer Motion mit wiederverwendbaren Wrappern (`<FadeIn>`, `<Reveal>`, `<Stagger>`); einfache Hovers via CSS. **Langsam, weich, minimal.**

- Hero-Reveal beim Laden (Eyebrow → H1 → Subtitle → CTA, Stagger ~100 ms, ease `[0.22,1,0.36,1]`); Portrait fade + sanfter Scale 1.04→1, Gold-Glow atmet ein.
- Scroll-Reveal (`whileInView`, `once`) für Sektionen/Karten; Service-Karten gestaffelt.
- Nav-Hintergrund-Crossfade, Underline-Draw, Button-Hover (Scale 1.02 + Gold-Glow), Accordion-Höhe + Icon-Rotation, Testimonials-/Galerie-Carousel (Embla), Before/After-Slider, Count-up-Zähler.
- **Vermeiden:** Parallax-Overload, Bounce-Springs, große Slide-ins, Blinken.

### 3.6 Barrierefreiheit (WCAG 2.1 AA · relevant wg. BFSG)

- Gold `#C9A24B` auf `bg-base` ≈ **7.5:1** (AAA für Text) ✔; `gold-muted` nur für Ränder/große Schrift (nicht Body).
- Sichtbarer Focus-Ring (`focus #E7C778`, 2px + offset), niemals entfernen; Skip-to-content; semantische Landmarks; ein `<h1>` pro Seite.
- `prefers-reduced-motion` respektieren (Hook + globales CSS-Backstop); Autoplay/Count-ups deaktivieren.
- `<html lang>` pro Locale; sinnvolle, übersetzte `alt`-Texte; Formular-Labels + `aria-describedby` für Fehler; Touch-Targets ≥ 44px.

---

## 4. Seitenstruktur (Sitemap)

Locale-Routing via next-intl, **`localePrefix: 'as-needed'`** → Deutsch unter `/`, Englisch unter `/en/...`. Alle öffentlichen Routen unter `app/[locale]/`.

**Öffentlich:**
- `/` — Home
- `/behandlungen` (`/en/treatments`) — Übersicht + `/behandlungen/[slug]` Detailseiten (Facials, PRP/Microneedling, Laser-Therapie, Botox, Filler …)
- `/ueber-uns` (`/about`), `/team`
- `/galerie` (`/gallery`) — Vorher/Nachher (rechtskonform)
- `/blog` + `/blog/[slug]`
- `/preise` (`/pricing`) — Preise („ab"/auf Anfrage, HWG-konform)
- `/kontakt` (`/contact`) — Formular + Anfahrt/Karte (erst nach Cookie-Consent laden)
- `/termin` (`/booking`) — Buchungs-Wizard + `/booking/confirmation/[id]`
- Konto: `/account` (Übersicht, Buchungen, Profil, Einstellungen) hinter Login
- Auth: `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email`
- Utility: `/danke`, `404`, `500`

**Rechtlich (in DE Pflicht, aus jedem Footer erreichbar):**
- `/impressum` (Pflicht, §5 DDG) · `/datenschutz` (DSGVO-Pflicht) · `/agb` (empfohlen wg. Buchungen) · `/widerruf` (falls Gutscheine/Produkte online verkauft)
- **Cookie-Banner / Consent (TTDSG/DSGVO):** granulares Opt-in (Akzeptieren/Ablehnen/Einstellungen), keine vorausgewählten Boxen, Skripte (Maps, Analytics) erst nach Einwilligung laden.

**Germany-spezifisch:** Fonts selbst hosten (next/font), Google Maps erst nach Consent / „Klick zum Laden", **HWG** bei Vorher/Nachher-Bildern und Heilversprechen beachten (Rechts-Review), Datenschutz-Checkbox auf allen Formularen.

---

## 5. Homepage-Aufbau (Section-by-Section)

Jede Sektion in `<Section>` mit Scroll-Reveal; `bg-base`/`bg-surface` dezent abwechselnd.

1. **Header** — transparent über Hero, solid beim Scrollen.
2. **Hero** — `min-h-[88vh]`, 2-spaltig: links Eyebrow + H1 „ENTDECKE DEINE WAHRE SCHÖNHEIT" (Highlight in Gold-Italic) + Subtitle „Premium Ästhetik-Behandlungen in München" + Gold-CTA „JETZT BUCHEN" + Sekundär-CTA; rechts Porträt mit Gold-Glow + Scrim (`next/image priority`).
3. **Trust/USP-Bar** — schmale Leiste: „Zertifizierte Spezialistinnen", „Medizinische Standards", „2.000+ zufriedene Kundinnen", „Zentral in München".
4. **Dienstleistungen** — Eyebrow + H2 + 3–6 ServiceCards (Gold-Line-Icon, Titel, Kurzbeschreibung) → „Alle Behandlungen ansehen".
5. **Über-uns-Teaser** — 2-spaltig, Bild + Story + Gold-Check-Bullets.
6. **Galerie-/Vorher-Nachher-Teaser** — Bildstreifen oder Slider → „Zur Galerie".
7. **Ablauf (How-it-works)** — 01 Beratung → 02 Plan → 03 Behandlung → 04 Nachsorge (Gold-Ziffern).
8. **Kundenbewertungen** — TestimonialCards / Embla-Carousel + Gesamt-Sterne.
9. **Buchungs-CTA-Band** — hoher Kontrast, zentrierte Serifen-Headline + große Gold-CTA + Telefon.
10. **FAQ** — Accordion (5–8 Q&A) + `FAQPage` JSON-LD.
11. **Footer** + Cookie-Banner + (mobil) schwebender „Termin buchen"-Button.

---

## 6. Buchungssystem (Kernfunktion)

Grundregeln: **Alle Zeitstempel in UTC speichern** (`Timestamptz`), Geschäftslogik in **Europe/Berlin** (DST-sicher via Luxon). Arbeitszeiten/Öffnungszeiten als **Minuten-seit-Mitternacht** (Wall-Clock), nicht als Datum gebunden. Geld in **Cent (Int)**.

### 6.1 Datenmodell (Auszug — vollständig in §9)

`ServiceCategory`, `Service` (Dauer, Puffer, Preis, Anzahlung), `StaffMember`, `StaffService` (M:N: wer kann was), `StaffWorkingHours` (wochentag-basiert, Minuten), `StaffTimeOff` (UTC-Span), `StudioHours` + `StudioClosure`, `BookingSettings` (Vorlaufzeit, max. Vorausbuchung, Slot-Granularität, Storno-Frist), `Booking`, `Customer`.

Wichtig: `Booking.endTime` **inkl. Puffer** → Überschneidungs-Checks werden zur simplen Intervall-Überlappung; `serviceEndTime` separat für die Anzeige. Schlüssel-Index: `@@index([staffMemberId, startTime, endTime])`.

### 6.2 Verfügbarkeits-Algorithmus

Für `serviceId` + optional `staffMemberId` + `date` (Berlin-Kalendertag) freie Startzeiten berechnen. Ein Slot `[start, start+dauer+puffer)` ist buchbar, wenn **alle** Bedingungen gelten:

1. innerhalb **Studio-Öffnungszeiten** des Wochentags (nicht in `StudioClosure`),
2. innerhalb **Mitarbeiter-Arbeitszeiten**,
3. keine Überschneidung mit bestehenden Buchungen (Status PENDING_PAYMENT/CONFIRMED, puffer-inklusiv),
4. keine Überschneidung mit Time-off,
5. **Vorlaufzeit** (`start >= now + leadTime`, z. B. 2 h),
6. **max. Vorausbuchung** (z. B. 90 Tage),
7. auf **Granularitäts-Raster** (z. B. 15 min).

Ablauf: Arbeitsblöcke ∩ Öffnungszeiten → in UTC umrechnen (TZ-aware!) → Busy-Intervalle (Buchungen ∪ TimeOff ∪ Closures) mergen → Kandidaten auf dem Raster generieren und gegen Busy testen. **„Egal welche:in"** = Slots aller fähigen Mitarbeiter:innen vereinigen; Zuweisung **innerhalb der Transaktion** beim Einbuchen (Last-Balancing, Tie-break `sortOrder`).

**Doppelbuchung verhindern (2 Ebenen):**
- **A (Pflicht):** Insert in **Serializable**-Transaktion mit Re-Check der Überlappung + 1 Retry.
- **B (empfohlen, Backstop):** PostgreSQL **`btree_gist` EXCLUDE**-Constraint auf `(staffMemberId, tstzrange(startTime,endTime))` gefiltert auf aktive Status — via handgeschriebene SQL-Migration. Macht Überlappung physisch unmöglich.

### 6.3 Buchungs-Flow (Kunde)

URL-getriebener Wizard (`/booking?step=...`), Server als Wahrheit für Verfügbarkeit:

1. **Behandlung wählen** (RSC liest aktive Services).
2. **Mitarbeiter:in** wählen oder „keine Präferenz" (gefiltert via `StaffService`).
3. **Datum & Uhrzeit** — Monatskalender + Slot-Chips; `GET /api/availability` (cachebar, read-only), Anzeige in „Münchner Zeit (MEZ/MESZ)".
4. **Daten/Login** — Gast (Name, E-Mail, Tel., Einwilligungen) oder Konto; GDPR-/AGB-Checkboxen.
5. **Anzahlung zahlen** — Server Action `createBooking`: in Serializable-TX Slot re-validieren, Staff auflösen, `Booking` als **PENDING_PAYMENT** anlegen (= kurzer Hold), Stripe-PaymentIntent (Anzahlung) erstellen → Payment Element. **Webhook ist autoritativ** (nicht der Client-Redirect).
6. **Bestätigung** — Zusammenfassung + `.ics` + Storno-Policy; pollt Status, falls Webhook noch nicht durch.

**Hold-Ablauf:** unbezahlte PENDING_PAYMENT nach ~15 min freigeben (Query-Filter + Cron `release-holds`).

**API-Übersicht:** `GET /api/availability` (Route Handler), `createBooking`/`cancelBooking`/`rescheduleBooking` (Server Actions), `POST /api/stripe/webhook` (Route Handler, raw body), Cron-Routen.

### 6.4 Stornierung & Umbuchung

Aus `BookingSettings.cancellationCutoffHrs` (Standard **24 h**).

- **Kunde, außerhalb Frist (≥24 h):** CANCELLED + **volle Rückerstattung** der Anzahlung (Stripe-Refund), Slot frei.
- **Kunde, innerhalb Frist (<24 h):** CANCELLED, **Anzahlung verfällt** (Sinn der Anzahlung).
- **Studio storniert:** immer volle Rückerstattung.
- **No-Show:** Admin setzt NO_SHOW, Anzahlung verfällt.
- **Umbuchung:** neue Buchung mit Slot-Re-Check in **einer** Transaktion, alte → CANCELLED, **Anzahlung wird übertragen** (kein neuer Charge). Außerhalb Frist frei; innerhalb Frist nur telefonisch.
- Storno-Frist als Snapshot am Buchungszeitpunkt mitspeichern (Verbraucherrecht).

### 6.5 E-Mails & Erinnerungen

Buchungsbestätigung (bei `payment_intent.succeeded` bzw. sofort ohne Anzahlung), Erinnerung 24 h vorher, Stornierung, Umbuchung, optional Zahlung-fehlgeschlagen + Admin-Alert. Alle **idempotent** (Guard-Spalten `confirmationSentAt`/`reminderSentAt`).

**Vercel Cron** (`vercel.json`): `send-reminders` stündlich (CONFIRMED, 23–24 h vor Start, Guard), `release-holds` alle 5 min. Mit `CRON_SECRET` absichern. SPF/DKIM/DMARC für Zustellbarkeit.

### 6.6 Risiken / Edge-Cases (im Bau beachten)

Concurrency/Doppelbuchung (→ §6.2 A+B), DST/Timezone (nur TZ-aware Konvertierung, nie Server-Local), Stripe Client-vs-Webhook-Divergenz (Webhook autoritativ, Idempotenz via `StripeEvent`), Puffer halb-offene Intervalle `[start,end)`, Arbeitszeit-Änderungen kollidieren mit Bestands-Buchungen (warnen, nie auto-stornieren), Studio- vs. Staff-Zeiten (Schnittmenge), DSGVO-Löschung (Soft-Anonymisierung statt Hard-Delete wg. Buchhaltung), Raum/Geräte-Ressource (z. B. nur 1 Laser) = bekannte Limitation für v1, ggf. später `Resource`-Modell.

---

## 7. Admin-Dashboard

Internes Tool, **nicht** unter `[locale]` (Sprache als User-Präferenz-Toggle). Shell: linke Sidebar + Topbar (Sprache, User-Menü, Suche). RSC-first, Mutationen via Server Actions, Listen via `<DataTable>`.

### 7.1 Screens

| Route | Screen | Inhalt |
|---|---|---|
| `/admin` | **Dashboard** | KPI-Karten (heutige Termine, Wochenumsatz, Auslastung %, offene Bewertungen, neue Kunden), kommende Termine, Umsatz-Sparkline |
| `/admin/bookings` | **Termine — Kalender** | Tag/Woche/Mitarbeiter-Resource-Ansicht, Farbe nach Status |
| `/admin/bookings/list` | **Termine — Liste** | Filter/Sortierung, CSV-Export |
| `/admin/bookings/[id]` | **Termin-Detail** | Status ändern, Umbuchen, Refund auslösen, interne Notizen, Bestätigung erneut senden |
| `/admin/bookings/new` | **Manuelle Buchung** | Telefon-Buchung (nutzt dieselbe Slot-Logik) |
| `/admin/customers` + `/[id]` | **Kunden (CRM)** | Liste/Segmente/LTV; Profil mit Historie, Ausgaben, No-Shows, Tags, Newsletter-Status |
| `/admin/services` + `/[id]` + `/categories` | **Behandlungen** | CRUD (DE+EN), Kategorie, Dauer, Preis, **Anzahlung**, fähige Mitarbeiter, Bild, Slug, Reihenfolge |
| `/admin/staff` + `/[id]` | **Mitarbeiter** | Profil (Bio DE/EN, Foto), **Arbeitszeiten**, **Service-Zuweisung**, Urlaub/Time-off |
| `/admin/blog` + `/[id]` | **Blog** | Tiptap-Editor, Entwurf/Geplant/Veröffentlicht, SEO-Felder, OG-Bild |
| `/admin/gallery` + `/[albumId]` | **Galerie** | Alben, Vorher/Nachher-Paare hochladen, Captions, **Einwilligungs-Flag**, Reihenfolge |
| `/admin/reviews` | **Bewertungen** | Moderation (PENDING/APPROVED/REJECTED), antworten, auf Homepage hervorheben |
| `/admin/newsletter` + `/campaigns` + `/[id]` | **Newsletter** | Abonnenten (Opt-in-Status), Kampagnen-Composer (DE/EN), Testversand, senden |
| `/admin/statistics` | **Statistiken** | Umsatzverlauf, Auslastung/Mitarbeiter, beliebteste Behandlungen, Funnel, Storno-/No-Show-Quote (Recharts) |
| `/admin/settings` | **Einstellungen** | Studio-Infos, **Öffnungszeiten**, Buchungsregeln (Vorlauf/Puffer/Storno-Frist), Anzahlungs-Defaults, **Rechtstexte** (DE+EN) |

### 7.2 Bibliotheken

Charts **Recharts** (ggf. Tremor für KPI-Karten) · Rich-Text **Tiptap** (JSON in DB, beim Input mit DOMPurify sanitizen) · Tabellen **TanStack Table** · Kalender **FullCalendar** (Resource-Timeline). Schwere Admin-Libs via `dynamic(..., { ssr:false })` lazy-laden → kein Einfluss auf das öffentliche Bundle.

---

## 8. Technische Architektur

### 8.1 Projektstruktur (verkürzt)

```
src/
  middleware.ts                 # next-intl + Auth-Gate (admin/account)
  i18n/{routing,request,navigation}.ts
  app/
    [locale]/
      layout.tsx                # <html lang>, NextIntlProvider, Fonts, Header/Footer, Cookie, Toaster
      (marketing)/...           # home, treatments, about, team, gallery, blog, reviews, contact, (legal)
      (booking)/booking/...     # Wizard + confirmation
      (account)/account/...     # geschützt: CUSTOMER
      (auth)/...                # login/register/reset/verify
    (admin)/admin/...           # geschützt: ADMIN/STAFF (nicht locale-scoped)
    api/
      auth/[...nextauth]/route.ts
      availability/route.ts     # read-only Verfügbarkeit
      stripe/webhook/route.ts   # raw body, signaturgeprüft, idempotent
      cron/{reminders,cleanup}/route.ts
      upload/route.ts           # Vercel-Blob-Token
      newsletter/confirm/route.ts
    sitemap.ts · robots.ts · manifest.ts
  actions/                      # Server Actions (auth, booking, account, admin/*, newsletter)
  lib/                          # db, auth, auth-guards, stripe, resend, env(zod), seo, dates(tz), i18n-content, rate-limit
  components/{ui,marketing,booking,account,admin,shared}
  schemas/                      # Zod (geteilt Client+Action)
  types/next-auth.d.ts
prisma/{schema.prisma, seed.ts, migrations/}
messages/{de.json, en.json}
emails/                         # React Email Templates
vercel.json                     # Cron-Schedules
```

**Konventionen:** Server Actions zentral in `src/actions/` (Muster: `'use server'` → `requireX()`-Guard → Zod-Parse → Mutation → `revalidate*` → typed `{ ok, data|error }`). `lib/` = Singletons/Infra, `schemas/` = Validierungs-Verträge.

### 8.2 Authentifizierung & Rollen

**Auth.js (NextAuth v5)**, **JWT-Strategie** (Rolle im Token → kein DB-Hit in Middleware). Provider: **Credentials** (Passwort gehasht mit argon2/bcrypt) + optional **Google** (Kunden). Modelle: `User` (role: CUSTOMER/STAFF/ADMIN, preferredLocale), `Account`, `Session`, `VerificationToken` (eigener Verify-/Reset-Flow via React Email).

**Vertrag zum Buchungs-Modell:** `Customer.userId` → `User.id` (nullable, unique) → Gast-Buchung möglich, später per E-Mail verknüpfen. `StaffMember.userId` optional.

**Schutz in 3 Ebenen:** Middleware (grobe UX-Weiterleitung) → Layout-Guard `requireAdmin()`/`requireCustomer()` (autoritativ, serverseitig) → **Server-Action-Guard pro Mutation** (echte Sicherheitsgrenze). Rate-Limiting (Upstash) auf Login/Register/Booking/Contact.

### 8.3 Internationalisierung (DE/EN)

**next-intl**, `defaultLocale: 'de'`, `localePrefix: 'as-needed'`. Message-Dateien namespaced (`common`, `nav`, `home`, `booking`, `account`, `auth`, `emails`, `admin`). Typed Messages (Compile-Fehler bei fehlenden Keys), CI-Check gegen Key-Drift.

**DB-Inhalte übersetzen:** **JSON-Felder `{ de, en }`** (jsonb) statt Übersetzungstabelle (bei 2 Locales schlanker, kein N+1). Helper `pickLocale(field, locale, fallback='de')`. Slugs: ein kanonischer Slug initial (YAGNI). Admin-Editoren zeigen DE/EN nebeneinander.

> *Trade-off:* JSON hat schwächere Typsicherheit als gepaarte Spalten (`nameDe`/`nameEn`) — wir kapseln das mit einem getypten `pickLocale`-Helper. Bei künftig >2 Locales → Migration auf Translation-Tabelle, isoliert hinter dem Helper.

### 8.4 Stripe (Anzahlung)

Anzahlung (konfigurierbar je Service, z. B. 30 € oder 30 %) bei Buchung. **PaymentIntent**-Flow: Booking als PENDING_PAYMENT (Hold) → PaymentIntent mit `metadata.bookingId` + Idempotenz-Key → Payment Element (SCA/3DS via Stripe). **Webhook** `src/app/api/stripe/webhook/route.ts` (`runtime: 'nodejs'`, **raw body**, Signatur, Idempotenz via `StripeEvent`): `payment_intent.succeeded` → CONFIRMED + Bestätigungsmail; `payment_failed` → Retry bis Hold abläuft; `charge.refunded` → Refund spiegeln. Refund-on-Cancel je Policy. Test-Keys in Preview, Live in Production.

### 8.5 E-Mail & Newsletter

**Resend + React Email**; `lib/resend.ts` → typed `sendEmail({ to, template, props, locale })`. Transaktional: Bestätigung, Erinnerung, Storno, Umbuchung, Verify, Reset. **Newsletter mit Double-Opt-in (DSGVO-Pflicht):** `NewsletterSubscriber` (PENDING→CONFIRMED→UNSUBSCRIBED, confirmToken, Consent-Zeitstempel als Nachweis), Bestätigungslink → `/api/newsletter/confirm`, jede Mail mit 1-Klick-Abmeldung. `Campaign` (Subject/Content als `{de,en}`, DRAFT/SENT) — Versand an CONFIRMED, gechunkt. Reminder via Vercel Cron.

### 8.6 Datei-/Bild-Uploads

**Vercel Blob** (nativ zu Vercel): `api/upload/route.ts` gibt Upload-Token aus (Session = ADMIN/STAFF, nur Bilder, Größenlimit), Client lädt direkt hoch, URL via Action speichern. Rendering via **`next/image`** (responsive `sizes`, AVIF/WebP, `remotePatterns` für Blob- + Google-Avatar-Host). Galerie-Bilder: `consent`-Flag Pflicht vor Veröffentlichung.

### 8.7 SEO & Performance

`generateMetadata` pro Route (lokalisiert) + zentral `lib/seo.ts` (Title-Template, Canonical, OG, **hreflang** `de`/`en` + `x-default` — wichtig wegen `as-needed`). **JSON-LD:** site-weit `MedicalBusiness`/`BeautySalon` (NAP, `openingHoursSpecification`, geo, sameAs), `Service` auf Detailseiten, `BlogPosting`, `Review`/`AggregateRating` (nur approved), `BreadcrumbList`. Dynamische `sitemap.ts` (statisch + DB-Inhalte, per-Locale `alternates`) + `robots.ts` (admin/account/api disallow). **CWV:** Marketing als static/ISR + Tag-Revalidation, `next/font` selbst-gehostet, `next/image` mit Dimensionen (CLS≈0), Client-JS minimal, Admin-Libs lazy.

---

## 9. Konsolidiertes Datenmodell (Prisma)

> Konventionen: UTC-Timestamps (`@db.Timestamptz(3)`), Geld in Cent (`Int`), übersetzbare Texte als `Json {de,en}`, Soft-State via `active`.

```prisma
// ---- Enums ----
enum Role            { CUSTOMER STAFF ADMIN }
enum StaffRole       { PRACTITIONER ADMIN RECEPTION }
enum Weekday         { MON TUE WED THU FRI SAT SUN }
enum BookingStatus   { PENDING_PAYMENT CONFIRMED CANCELLED COMPLETED NO_SHOW }
enum PaymentStatus   { REQUIRES_PAYMENT SUCCEEDED FAILED REFUNDED PARTIALLY_REFUNDED }
enum PaymentKind     { DEPOSIT FULL }
enum SubscriberStatus{ PENDING CONFIRMED UNSUBSCRIBED }

// ---- Auth / Identität ----
model User {
  id              String   @id @default(cuid())
  email           String   @unique
  emailVerified   DateTime?
  passwordHash    String?
  name            String?
  image           String?
  role            Role     @default(CUSTOMER)
  preferredLocale String   @default("de")
  accounts        Account[]
  sessions        Session[]
  customer        Customer?
  staffMember     StaffMember?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  @@index([role])
}
model Account { /* Auth.js Adapter: provider, tokens, @@unique([provider, providerAccountId]) */ }
model Session { /* Auth.js Adapter */ }
model VerificationToken { identifier String; token String @unique; type String; expires DateTime; @@unique([identifier, token]) }

model Customer {
  id        String  @id @default(cuid())
  userId    String? @unique
  user      User?   @relation(fields: [userId], references: [id], onDelete: SetNull)
  firstName String
  lastName  String
  email     String
  phone     String?
  locale    String  @default("de")
  notes     String?
  marketingConsent Boolean @default(false)
  bookings  Booking[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([email])
}

// ---- Katalog ----
model ServiceCategory {
  id   String @id @default(cuid())
  slug String @unique
  name        Json   // { de, en }
  description Json?
  sortOrder Int  @default(0)
  active   Boolean @default(true)
  services Service[]
}
model Service {
  id   String @id @default(cuid())
  slug String @unique
  name        Json
  description  Json?
  durationMinutes Int
  bufferMinutes   Int @default(0)
  priceCents      Int
  depositCents    Int @default(0)
  currency        String @default("EUR")
  categoryId  String
  category    ServiceCategory @relation(fields: [categoryId], references: [id])
  imageUrl    String?
  sortOrder   Int @default(0)
  active      Boolean @default(true)
  staffServices StaffService[]
  bookings      Booking[]
  @@index([categoryId, active])
}

// ---- Personal ----
model StaffMember {
  id     String @id @default(cuid())
  userId String? @unique
  user   User?  @relation(fields: [userId], references: [id], onDelete: SetNull)
  firstName String
  lastName  String
  role   StaffRole @default(PRACTITIONER)
  bio    Json?     // { de, en }
  photoUrl String?
  sortOrder Int @default(0)
  active Boolean @default(true)
  staffServices StaffService[]
  workingHours  StaffWorkingHours[]
  timeOff       StaffTimeOff[]
  bookings      Booking[]
}
model StaffService {
  staffMemberId String
  serviceId     String
  staffMember StaffMember @relation(fields: [staffMemberId], references: [id], onDelete: Cascade)
  service     Service     @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  @@id([staffMemberId, serviceId])
  @@index([serviceId])
}
model StaffWorkingHours {
  id String @id @default(cuid())
  staffMemberId String
  staffMember StaffMember @relation(fields: [staffMemberId], references: [id], onDelete: Cascade)
  weekday Weekday
  startMinute Int   // 540 = 09:00 (Europe/Berlin Wall-Clock)
  endMinute   Int
  effectiveFrom DateTime? @db.Date
  effectiveTo   DateTime? @db.Date
  @@index([staffMemberId, weekday])
}
model StaffTimeOff {
  id String @id @default(cuid())
  staffMemberId String
  staffMember StaffMember @relation(fields: [staffMemberId], references: [id], onDelete: Cascade)
  startTime DateTime @db.Timestamptz(3)
  endTime   DateTime @db.Timestamptz(3)
  reason String?
  @@index([staffMemberId, startTime, endTime])
}

// ---- Studio-Konfiguration ----
model StudioHours   { id String @id @default(cuid()); weekday Weekday @unique; isOpen Boolean @default(true); startMinute Int; endMinute Int }
model StudioClosure { id String @id @default(cuid()); startTime DateTime @db.Timestamptz(3); endTime DateTime @db.Timestamptz(3); reason String?; @@index([startTime, endTime]) }
model BookingSettings {
  id String @id @default("default")
  leadTimeMinutes Int @default(120)
  maxAdvanceDays  Int @default(90)
  slotGranularityMin Int @default(15)
  cancellationCutoffHrs Int @default(24)
  timezone String @default("Europe/Berlin")
  updatedAt DateTime @updatedAt
}

// ---- Buchung & Zahlung ----
model Booking {
  id String @id @default(cuid())
  customerId String;     customer Customer @relation(fields: [customerId], references: [id])
  serviceId  String;     service  Service  @relation(fields: [serviceId], references: [id])
  staffMemberId String;  staffMember StaffMember @relation(fields: [staffMemberId], references: [id])
  startTime      DateTime @db.Timestamptz(3)
  endTime        DateTime @db.Timestamptz(3)  // inkl. Puffer (für Overlap-Checks)
  serviceEndTime DateTime @db.Timestamptz(3)  // ohne Puffer (Anzeige)
  status BookingStatus @default(PENDING_PAYMENT)
  priceCents Int
  depositCents Int
  currency String @default("EUR")
  paymentStatus PaymentStatus @default(REQUIRES_PAYMENT)  // denormalisiert für schnelle Queries
  cancellationCutoffHrsSnapshot Int
  notesCustomer String?
  notesInternal String?
  confirmedAt DateTime?
  cancelledAt DateTime?
  confirmationSentAt DateTime?
  reminderSentAt     DateTime?
  rescheduledFromId String? @unique
  rescheduledFrom Booking? @relation("Reschedule", fields: [rescheduledFromId], references: [id])
  rescheduledTo   Booking? @relation("Reschedule")
  payment Payment?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([staffMemberId, startTime, endTime])
  @@index([status, startTime])
  @@index([customerId, startTime])
}
model Payment {
  id String @id @default(cuid())
  bookingId String @unique
  booking   Booking @relation(fields: [bookingId], references: [id])
  stripePiId String @unique
  amount Int
  currency String @default("eur")
  kind PaymentKind
  status PaymentStatus @default(REQUIRES_PAYMENT)
  refundedAmount Int @default(0)
  stripeRefundId String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
model StripeEvent { id String @id; type String; processedAt DateTime @default(now()) }  // Webhook-Idempotenz

// ---- Inhalte ----
model BlogPost {
  id String @id @default(cuid())
  slug String @unique
  title Json; excerpt Json?; body Json   // { de, en }, body = Tiptap-JSON
  coverImage String?
  status String @default("DRAFT")          // DRAFT | SCHEDULED | PUBLISHED
  publishedAt DateTime?
  authorId String?
  seoTitle Json?; seoDescription Json?
  createdAt DateTime @default(now()); updatedAt DateTime @updatedAt
}
model GalleryAlbum {
  id String @id @default(cuid())
  slug String @unique
  title Json
  serviceId String?
  published Boolean @default(false)
  order Int @default(0)
  images GalleryImage[]
}
model GalleryImage {
  id String @id @default(cuid())
  albumId String; album GalleryAlbum @relation(fields: [albumId], references: [id], onDelete: Cascade)
  beforeUrl String; afterUrl String
  caption Json?
  consent Boolean @default(false)   // dokumentierte Einwilligung Pflicht
  order Int @default(0)
}
model Review {
  id String @id @default(cuid())
  customerId String?
  authorName String
  rating Int                          // 1..5
  text Json
  status String @default("PENDING")   // PENDING | APPROVED | REJECTED
  featured Boolean @default(false)
  reply Json?
  createdAt DateTime @default(now())
}

// ---- Newsletter ----
model NewsletterSubscriber {
  id String @id @default(cuid())
  email String @unique
  status SubscriberStatus @default(PENDING)
  locale String @default("de")
  confirmToken String? @unique
  source String?
  confirmedAt DateTime?; unsubscribedAt DateTime?
  createdAt DateTime @default(now())
}
model Campaign {
  id String @id @default(cuid())
  subject Json; content Json   // { de, en }
  status String @default("DRAFT")   // DRAFT | SENDING | SENT
  audience String @default("CONFIRMED")
  sentAt DateTime?
  createdAt DateTime @default(now())
}
```

Zusätzlich: handgeschriebene SQL-Migration für den **`btree_gist` EXCLUDE**-Constraint auf `Booking` (siehe §6.2 B).

---

## 10. Rechtliches (DACH / DSGVO) — von Anfang an einbauen

- **Impressum** (Pflicht, §5 DDG), **Datenschutzerklärung** (DSGVO), **AGB**, ggf. **Widerruf** — aus jedem Footer in „zwei Klicks" erreichbar.
- **Cookie-Consent** (TTDSG): granular, Skripte erst nach Einwilligung. **Fonts selbst hosten**. **Google Maps** erst nach Consent / „Klick zum Laden".
- **HWG** (Heilmittelwerbegesetz): Vorsicht bei Vorher/Nachher-Bildern medizinischer Eingriffe und Heilversprechen → Rechts-Review vor Launch.
- **Datenschutz-Checkbox** + Datenminimierung auf allen Formularen; Consent-Zeitstempel speichern; **Recht auf Löschung** via Soft-Anonymisierung (Buchungs-/Buchhaltungspflichten beachten).
- **BFSG**: WCAG 2.1 AA von Beginn an anstreben.

*(Rechtstexte sollten final juristisch geprüft werden — der Plan stellt die technische Grundlage.)*

---

## 11. Umgebungsvariablen & Deployment

`.env` (validiert via `lib/env.ts` mit Zod, server vs. `NEXT_PUBLIC_*`):

```
DATABASE_URL / DIRECT_URL            # Neon: pooled für App, direct für migrate
AUTH_SECRET / AUTH_URL / AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET
STRIPE_SECRET_KEY / NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY / STRIPE_WEBHOOK_SECRET
RESEND_API_KEY / EMAIL_FROM
BLOB_READ_WRITE_TOKEN
CRON_SECRET
UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_DEFAULT_LOCALE=de
```

**Deployment:** Vercel (App + Cron) + **Neon** (Postgres, Branch-DB pro Preview). Prisma: pooled `DATABASE_URL` (PgBouncer) für App, `DIRECT_URL` für Migrationen. Stripe/Resend Test-Keys in Preview, Live in Production. `prisma migrate deploy` im Build-Step. SPF/DKIM/DMARC + Domain einrichten.

---

## 12. Umsetzungs-Roadmap (Meilensteine)

- **M0 — Fundament:** Next.js 15 + TS + Tailwind v4, ESLint/Prettier, `lib/env`, `lib/db`, Neon verbinden, Basis-Schema (User/Account/Session/Verification) + erste Migration + Seed (Admin). next-intl + `[locale]`-Layout + DE/EN-Skelett. Design-Tokens (`globals.css`), Fonts, `Button`/`Section`. Hello-World auf Vercel.
- **M1 — Auth & Konten:** Auth.js (Credentials + Google), Rollen, Guards, Middleware, Auth-Seiten, E-Mail-Verify + Passwort-Reset, `(account)`-Shell, Rate-Limiting.
- **M2 — Admin-Shell + Content-CRUD:** `(admin)`-Layout + `requireAdmin`, Sidebar, DataTable. CRUD: **Services + Kategorien**, **Staff** (Arbeitszeiten, Zuweisung), **Settings** (Öffnungszeiten, Rechtstexte), **Blog** (Tiptap), **Galerie** (Blob). JSON-i18n-Pattern + `pickLocale`.
- **M3 — Öffentliche Website:** Home + alle Marketing-Seiten + Rechtsseiten, lokalisierte DB-Inhalte, SEO-Layer (Metadata, Sitemap, Robots, JSON-LD, hreflang), Newsletter-Anmeldung (Double-Opt-in).
- **M4 — Buchungs-Flow:** Verfügbarkeits-Engine + `(booking)`-Wizard, `createBooking` (PENDING_PAYMENT), Buchungshistorie im Konto.
- **M5 — Stripe:** Payment-Modell, PaymentIntent, Payment Element, **Webhook** (→ CONFIRMED), Idempotenz, Refund-on-Cancel, `release-holds`-Cron, Bestätigungsmail via Webhook.
- **M6 — Betrieb:** Reminder-Cron, Newsletter-Kampagnen, **Statistiken** (Recharts), Bewertungs-Moderation + öffentliche `AggregateRating`.
- **M7 — Härten & Launch:** Playwright-E2E (Buchung mit Test-Karte 4242…, Auth, i18n, Newsletter-Opt-in), Vitest (Actions/Webhook/`availability`/`pickLocale`/tz), A11y- & Performance-Audit, Security-Review (Action-Guards, Webhook-Secret, CRON_SECRET, Rate-Limits), Live-Keys, Production-Neon, DNS + DKIM, finale SEO-Prüfung.

---

## 13. Testing & Verifikation

- **Unit (Vitest):** `lib/availability` (Slot-Generierung, DST-Fälle, Überlappung), `pickLocale`, tz-Helper, SEO-Builder, Stripe-Betragsmathematik, Webhook-Handler (gemockte Events).
- **E2E (Playwright):** Buchungs-Happy-Path inkl. Stripe-Test-Karte, Register/Verify/Login, Admin-Statuswechsel, Locale-Switch, Newsletter-Double-Opt-in — gegen geseedete Ephemeral-DB.
- **Manuell:** `npm run dev`, Buchung von Slot-Auswahl bis Bestätigungsmail durchspielen; Stripe-Webhook via `stripe listen`/`stripe trigger`; Admin-CRUD prüfen; Lighthouse/CWV + Kontrast-Check (Gold-auf-Dunkel); Doppelbuchungs-Test (zwei parallele Buchungen auf denselben Slot → einer scheitert sauber).

---

## 14. Offene Punkte / zu bestätigen

1. **Behandlungs-Liste & Preise** — welche Behandlungen genau (Facials, PRP, Laser, Botox, Filler …), Dauer, Preise, Anzahlungs-Höhe?
2. **Studio-Stammdaten** — Adresse, Öffnungszeiten, Telefon, Mitarbeiter:innen (Namen/Bios/Fotos) für Seed/Impressum.
3. **Blog-Quelle** — wie geplant Tiptap im Admin (statt externes CMS)? ✔ vorgeschlagen.
4. **Anzahlungs-Logik** — fixer Betrag oder Prozent je Behandlung? Storno-Frist 24 h ok?
5. **Markenassets** — finales Logo (Wordmark + Emblem), Schriftwahl Cormorant vs. Playfair (Empfehlung: Cormorant), echte Fotos/Porträts.
6. **Domain & E-Mail-Absender** (für DKIM/SPF), Google-Login gewünscht?
7. **Vorher/Nachher** — rechtlich heikel (HWG): mit echten Einwilligungen oder erst zurückstellen?

---

*Nächster Schritt nach Freigabe: Meilenstein 0 (Projekt-Scaffold) aufsetzen.*
