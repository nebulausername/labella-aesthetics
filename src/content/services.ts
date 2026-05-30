import type { Localized } from '@/lib/i18n-content';

export interface ProcessStep {
  title: Localized;
  text: Localized;
}

export interface FaqEntry {
  q: Localized;
  a: Localized;
}

export interface ServiceCategory {
  key: string;
  name: Localized;
}

export interface Service {
  slug: string;
  /** Key into `serviceIcons` (lib/service-icons.ts). */
  icon: string;
  categoryKey: string;
  featured?: boolean;
  name: Localized;
  tagline: Localized;
  description: Localized;
  benefits: Localized[];
  process: ProcessStep[];
  durationMinutes: number;
  priceFromCents: number;
  depositCents: number;
  faq: FaqEntry[];
}

export const serviceCategories: ServiceCategory[] = [
  { key: 'gesicht', name: { de: 'Gesichtsbehandlungen', en: 'Facial Treatments' } },
  { key: 'antiaging', name: { de: 'Anti-Aging & Regeneration', en: 'Anti-Aging & Regeneration' } },
  { key: 'laser', name: { de: 'Laser & Haarentfernung', en: 'Laser & Hair Removal' } },
];

export const services: Service[] = [
  {
    slug: 'signature-facial',
    icon: 'sparkles',
    categoryKey: 'gesicht',
    featured: true,
    name: { de: 'Signature Facial', en: 'Signature Facial' },
    tagline: { de: 'Tiefenreinigung & Glow', en: 'Deep cleanse & glow' },
    description: {
      de: 'Eine maßgeschneiderte Gesichtsbehandlung, die reinigt, nährt und revitalisiert. Wir analysieren deine Haut und kombinieren sanftes Peeling, hochwirksame Seren und eine entspannende Massage für einen sofort sichtbaren Glow.',
      en: 'A tailored facial that cleanses, nourishes and revitalises. We analyse your skin and combine gentle exfoliation, high-performance serums and a relaxing massage for an instantly visible glow.',
    },
    benefits: [
      { de: 'Reinere, klarere Haut', en: 'Cleaner, clearer skin' },
      { de: 'Sofortiger Frische-Effekt', en: 'Instant fresh-faced effect' },
      { de: 'Auf deinen Hauttyp abgestimmt', en: 'Matched to your skin type' },
      { de: 'Tiefenentspannende Gesichtsmassage', en: 'Deeply relaxing facial massage' },
    ],
    process: [
      {
        title: { de: 'Analyse & Reinigung', en: 'Analysis & cleanse' },
        text: { de: 'Wir bestimmen deinen Hauttyp und reinigen die Haut porentief.', en: 'We assess your skin type and deep-cleanse the skin.' },
      },
      {
        title: { de: 'Peeling & Wirkstoffe', en: 'Exfoliation & actives' },
        text: { de: 'Sanftes Peeling und individuell gewählte Wirkstoff-Seren.', en: 'Gentle exfoliation and individually chosen active serums.' },
      },
      {
        title: { de: 'Massage & Pflege', en: 'Massage & care' },
        text: { de: 'Entspannende Massage und abschließende Pflege mit SPF.', en: 'Relaxing massage and a final layer of care with SPF.' },
      },
    ],
    durationMinutes: 60,
    priceFromCents: 8900,
    depositCents: 3000,
    faq: [
      {
        q: { de: 'Für welchen Hauttyp ist die Behandlung geeignet?', en: 'Which skin type is this suitable for?' },
        a: { de: 'Für alle Hauttypen – wir passen Produkte und Intensität individuell an.', en: 'For all skin types – we adapt the products and intensity individually.' },
      },
      {
        q: { de: 'Wie oft sollte ich eine Behandlung machen?', en: 'How often should I book a treatment?' },
        a: { de: 'Für ein optimales Hautbild empfehlen wir alle 4–6 Wochen.', en: 'For optimal results we recommend every 4–6 weeks.' },
      },
    ],
  },
  {
    slug: 'hydrafacial',
    icon: 'droplets',
    categoryKey: 'gesicht',
    featured: false,
    name: { de: 'HydraFacial', en: 'HydraFacial' },
    tagline: { de: 'Hydratation in mehreren Schritten', en: 'Multi-step hydration' },
    description: {
      de: 'Die patentierte HydraFacial-Methode reinigt, peelt, extrahiert und spendet intensiv Feuchtigkeit – alles in einer Behandlung und ganz ohne Ausfallzeit. Ideal für einen strahlenden Teint vor besonderen Anlässen.',
      en: 'The patented HydraFacial method cleanses, exfoliates, extracts and deeply hydrates – all in one treatment and with no downtime. Perfect for a radiant complexion before special occasions.',
    },
    benefits: [
      { de: 'Intensive Feuchtigkeitsversorgung', en: 'Intense hydration' },
      { de: 'Verfeinertes Hautbild', en: 'Refined skin texture' },
      { de: 'Keine Ausfallzeit', en: 'No downtime' },
      { de: 'Sofort strahlender Teint', en: 'Instantly radiant complexion' },
    ],
    process: [
      {
        title: { de: 'Reinigung & Peeling', en: 'Cleanse & peel' },
        text: { de: 'Sanfte Tiefenreinigung und Erneuerung der Hautoberfläche.', en: 'Gentle deep-cleansing and resurfacing of the skin.' },
      },
      {
        title: { de: 'Extraktion', en: 'Extraction' },
        text: { de: 'Schmerzfreie Ausreinigung der Poren per Vortex-Technologie.', en: 'Pain-free pore extraction using vortex technology.' },
      },
      {
        title: { de: 'Hydratation', en: 'Hydration' },
        text: { de: 'Auffüllen mit Antioxidantien und Hyaluron-Boostern.', en: 'Replenishing with antioxidants and hyaluronic boosters.' },
      },
    ],
    durationMinutes: 45,
    priceFromCents: 12900,
    depositCents: 3000,
    faq: [
      {
        q: { de: 'Ist die Behandlung unangenehm?', en: 'Is the treatment uncomfortable?' },
        a: { de: 'Nein, die meisten empfinden sie als angenehm und entspannend.', en: 'No, most clients find it pleasant and relaxing.' },
      },
      {
        q: { de: 'Kann ich danach Make-up tragen?', en: 'Can I wear make-up afterwards?' },
        a: { de: 'Ja, die Haut ist sofort gesellschaftsfähig – ganz ohne Rötungen.', en: 'Yes, your skin is ready to go straight away – without redness.' },
      },
    ],
  },
  {
    slug: 'microneedling',
    icon: 'waves',
    categoryKey: 'antiaging',
    featured: false,
    name: { de: 'Microneedling', en: 'Microneedling' },
    tagline: { de: 'Kollagen-Boost für straffe Haut', en: 'Collagen boost for firmer skin' },
    description: {
      de: 'Feinste Nadeln regen die natürliche Kollagenproduktion an und verbessern Hautstruktur, Narben und feine Linien. Eine effektive Anti-Aging-Methode für ein sichtbar verfeinertes, straffes Hautbild.',
      en: 'Ultra-fine needles stimulate natural collagen production and improve skin texture, scarring and fine lines. An effective anti-aging method for a visibly refined, firmer complexion.',
    },
    benefits: [
      { de: 'Angeregte Kollagenbildung', en: 'Stimulated collagen production' },
      { de: 'Verfeinerte Poren & Narben', en: 'Refined pores & scars' },
      { de: 'Straffere Haut', en: 'Firmer skin' },
      { de: 'Gleichmäßigerer Teint', en: 'More even complexion' },
    ],
    process: [
      {
        title: { de: 'Vorbereitung', en: 'Preparation' },
        text: { de: 'Reinigung und Auftragen einer betäubenden Creme für deinen Komfort.', en: 'Cleansing and a numbing cream for your comfort.' },
      },
      {
        title: { de: 'Microneedling', en: 'Microneedling' },
        text: { de: 'Präzise Behandlung der Zielzonen mit medizinischem Pen.', en: 'Precise treatment of target areas with a medical pen.' },
      },
      {
        title: { de: 'Beruhigung', en: 'Soothing' },
        text: { de: 'Abschließendes Serum und beruhigende Maske.', en: 'A final serum and a soothing mask.' },
      },
    ],
    durationMinutes: 60,
    priceFromCents: 14900,
    depositCents: 5000,
    faq: [
      {
        q: { de: 'Habe ich danach Ausfallzeit?', en: 'Is there any downtime?' },
        a: { de: 'Leichte Rötungen für 24–48 Stunden sind normal und klingen schnell ab.', en: 'Mild redness for 24–48 hours is normal and fades quickly.' },
      },
      {
        q: { de: 'Wie viele Sitzungen sind sinnvoll?', en: 'How many sessions are recommended?' },
        a: { de: 'Für beste Ergebnisse empfehlen wir 3–4 Sitzungen im Abstand von 4 Wochen.', en: 'For best results we recommend 3–4 sessions, 4 weeks apart.' },
      },
    ],
  },
  {
    slug: 'prp-vampir-lifting',
    icon: 'syringe',
    categoryKey: 'antiaging',
    featured: true,
    name: { de: 'PRP Vampir-Lifting', en: 'PRP Vampire Lifting' },
    tagline: { de: 'Regeneration mit körpereigenem Plasma', en: 'Regeneration with your own plasma' },
    description: {
      de: 'Beim PRP-Lifting nutzen wir das regenerative Potenzial deines eigenen Blutplasmas. Die enthaltenen Wachstumsfaktoren regen Zellerneuerung und Kollagenbildung an – für eine natürlich verjüngte, frische Ausstrahlung.',
      en: 'PRP lifting harnesses the regenerative potential of your own blood plasma. Its growth factors stimulate cell renewal and collagen production – for a naturally rejuvenated, fresh appearance.',
    },
    benefits: [
      { de: '100 % körpereigen & natürlich', en: '100% your own & natural' },
      { de: 'Verbesserte Hautqualität', en: 'Improved skin quality' },
      { de: 'Natürliche Verjüngung', en: 'Natural rejuvenation' },
      { de: 'Auch für empfindliche Haut', en: 'Also for sensitive skin' },
    ],
    process: [
      {
        title: { de: 'Blutentnahme', en: 'Blood draw' },
        text: { de: 'Eine kleine Menge Blut wird schonend entnommen.', en: 'A small amount of blood is gently drawn.' },
      },
      {
        title: { de: 'Aufbereitung', en: 'Processing' },
        text: { de: 'Das Plasma wird in der Zentrifuge aufbereitet.', en: 'The plasma is prepared in a centrifuge.' },
      },
      {
        title: { de: 'Anwendung', en: 'Application' },
        text: { de: 'Das aktivierte Plasma wird gezielt in die Haut eingebracht.', en: 'The activated plasma is applied precisely into the skin.' },
      },
    ],
    durationMinutes: 75,
    priceFromCents: 24900,
    depositCents: 5000,
    faq: [
      {
        q: { de: 'Ist die Behandlung sicher?', en: 'Is the treatment safe?' },
        a: { de: 'Da nur körpereigenes Material verwendet wird, sind Unverträglichkeiten praktisch ausgeschlossen.', en: 'As only your own material is used, intolerances are practically impossible.' },
      },
      {
        q: { de: 'Wann sehe ich Ergebnisse?', en: 'When will I see results?' },
        a: { de: 'Erste Effekte nach 2–3 Wochen, das volle Ergebnis nach einigen Sitzungen.', en: 'First effects after 2–3 weeks, full results after a few sessions.' },
      },
    ],
  },
  {
    slug: 'laser-haarentfernung',
    icon: 'zap',
    categoryKey: 'laser',
    featured: true,
    name: { de: 'Laser-Haarentfernung', en: 'Laser Hair Removal' },
    tagline: { de: 'Dauerhaft glatte Haut', en: 'Permanently smooth skin' },
    description: {
      de: 'Mit modernster Lasertechnologie entfernen wir unerwünschte Härchen dauerhaft und nahezu schmerzfrei. Geeignet für nahezu alle Haut- und Haartypen – für ein langfristig glattes, gepflegtes Hautgefühl.',
      en: 'Using state-of-the-art laser technology we remove unwanted hair permanently and virtually pain-free. Suitable for almost all skin and hair types – for a long-lasting smooth, well-groomed feel.',
    },
    benefits: [
      { de: 'Dauerhafte Haarreduktion', en: 'Permanent hair reduction' },
      { de: 'Nahezu schmerzfrei', en: 'Virtually pain-free' },
      { de: 'Schluss mit Rasur & Reizungen', en: 'No more shaving & irritation' },
      { de: 'Schnelle Behandlung', en: 'Quick treatment' },
    ],
    process: [
      {
        title: { de: 'Beratung & Test', en: 'Consultation & test' },
        text: { de: 'Hautanalyse und Testimpuls zur optimalen Einstellung.', en: 'Skin analysis and a test pulse for optimal settings.' },
      },
      {
        title: { de: 'Laserbehandlung', en: 'Laser treatment' },
        text: { de: 'Präzise Behandlung der gewünschten Zonen mit Kühlung.', en: 'Precise treatment of the desired areas with cooling.' },
      },
      {
        title: { de: 'Nachsorge', en: 'Aftercare' },
        text: { de: 'Beruhigende Pflege und individuelle Nachsorge-Tipps.', en: 'Soothing care and personalised aftercare tips.' },
      },
    ],
    durationMinutes: 30,
    priceFromCents: 5900,
    depositCents: 2000,
    faq: [
      {
        q: { de: 'Wie viele Sitzungen brauche ich?', en: 'How many sessions do I need?' },
        a: { de: 'Üblicherweise 6–10 Sitzungen, abhängig von Körperzone und Haartyp.', en: 'Typically 6–10 sessions, depending on the area and hair type.' },
      },
      {
        q: { de: 'Worauf muss ich vorher achten?', en: 'What should I keep in mind beforehand?' },
        a: { de: 'Bitte die Zone rasieren und vorher nicht in die Sonne / ins Solarium.', en: 'Please shave the area and avoid sun / tanning beforehand.' },
      },
    ],
  },
  {
    slug: 'faltenbehandlung',
    icon: 'heartpulse',
    categoryKey: 'antiaging',
    featured: false,
    name: { de: 'Faltenbehandlung', en: 'Wrinkle Treatment' },
    tagline: { de: 'Natürlich glatte Haut', en: 'Naturally smooth skin' },
    description: {
      de: 'Sanfte, ärztlich durchgeführte Faltenbehandlungen mit Hyaluron oder muskelentspannenden Wirkstoffen. Wir setzen auf ein natürliches Ergebnis, das deine Züge betont – niemals überzeichnet.',
      en: 'Gentle, medically performed wrinkle treatments with hyaluronic acid or muscle-relaxing agents. We focus on a natural result that enhances your features – never overdone.',
    },
    benefits: [
      { de: 'Geglättete Mimikfalten', en: 'Smoothed expression lines' },
      { de: 'Natürliches Ergebnis', en: 'Natural result' },
      { de: 'Ärztlich durchgeführt', en: 'Performed by a doctor' },
      { de: 'Kurze Behandlungsdauer', en: 'Short treatment time' },
    ],
    process: [
      {
        title: { de: 'Ärztliche Beratung', en: 'Medical consultation' },
        text: { de: 'Ausführliche Aufklärung und individuelle Planung.', en: 'Thorough consultation and individual planning.' },
      },
      {
        title: { de: 'Behandlung', en: 'Treatment' },
        text: { de: 'Präzise Anwendung mit feinsten Nadeln.', en: 'Precise application with the finest needles.' },
      },
      {
        title: { de: 'Nachsorge', en: 'Aftercare' },
        text: { de: 'Verhaltenstipps und Kontrolltermin nach Bedarf.', en: 'Aftercare advice and a check-up if needed.' },
      },
    ],
    durationMinutes: 30,
    priceFromCents: 19900,
    depositCents: 5000,
    faq: [
      {
        q: { de: 'Sieht das Ergebnis natürlich aus?', en: 'Will the result look natural?' },
        a: { de: 'Ja, unser Anspruch ist ein dezentes, natürliches Ergebnis.', en: 'Yes, our aim is a subtle, natural-looking result.' },
      },
      {
        q: { de: 'Wie lange hält das Ergebnis?', en: 'How long does the result last?' },
        a: { de: 'Je nach Behandlung und Stoffwechsel etwa 4–9 Monate.', en: 'Depending on the treatment and metabolism, around 4–9 months.' },
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}

export function getRelatedServices(slug: string, limit = 3): Service[] {
  const current = getService(slug);
  if (!current) return services.slice(0, limit);
  return services
    .filter((s) => s.slug !== slug && s.categoryKey === current.categoryKey)
    .concat(services.filter((s) => s.slug !== slug && s.categoryKey !== current.categoryKey))
    .slice(0, limit);
}
