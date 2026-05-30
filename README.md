# La Bella Aesthetics

Premium-Website + Admin-Dashboard für ein Ästhetik-/Kosmetikstudio in München.
Dunkles Luxus-Design (Gold auf Schwarz), zweisprachig (DE/EN).

> 📋 Der vollständige Projektplan steht in **[PLAN.md](PLAN.md)** (Design-System, Buchungssystem, Admin-Dashboard, Architektur, Roadmap M0–M7).

## Tech-Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · Framer Motion · lucide-react

## Setup

```bash
npm install
npm run dev
```

Dann [http://localhost:3000](http://localhost:3000) öffnen (Deutsch). Englisch: `/en`.

## Scripts

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Produktions-Build |
| `npm run start` | Produktionsserver |

## Projektstruktur

```
src/
  app/[locale]/        # lokalisierte Seiten (Layout + Home)
  components/
    ui/                # Design-System-Primitive (Button, Section)
    layout/            # Header, Footer, Sprach-Umschalter
    marketing/         # Homepage-Sektionen (Hero, Services, …)
    motion/            # Scroll-Animationen
  i18n/                # next-intl Routing/Request/Navigation
  lib/                 # Utilities (cn)
  middleware.ts        # Locale-Routing
messages/{de,en}.json  # Übersetzungen
src/app/globals.css    # Design-Tokens (@theme)
```

## Status

**Meilenstein 0 (Fundament)** ✅ — Scaffold, Design-System, zweisprachige Homepage.

Nächste Schritte (siehe PLAN.md): Datenbank (Prisma/Neon) + Auth → Admin-Dashboard → restliche Marketing-Seiten → Buchungssystem → Stripe → Betrieb/Statistiken.
