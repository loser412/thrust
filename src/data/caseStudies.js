export const CASE_STUDIES = [
  {
    index: '01',
    id: 'property-masters',
    title: 'Property Masters',
    client: 'Property Masters',
    industry: 'Real Estate',
    summary: 'Australian real-estate platform with live CRM-driven listings and agent workflows.',
    details: 'Built a clean lead-generation platform for Property Masters, connecting their CRM to the website so listings and agent notes update automatically. The result is a faster buyer experience, smarter property discovery, and an easy admin flow for the sales team.',
    tags: ['React', 'Node.js', 'API', 'CRM'],
    metric: 'Real-time listings',
    year: '2024',
    accent: '#4A6B2F',
    image: '/icons/property masters.png',
    imageAlt: 'Property Masters logo',
    screenshots: [
      '/devpage/propertymsters/image1.png',
      '/devpage/propertymsters/image2.png',
      '/devpage/propertymsters/image3.png',
    ],
    testimonial: {
      quote: 'The new site instantly improved lead quality and made our agents more efficient.',
      author: 'CEO, Property Masters',
    },
    milestones: [
      { date: '2023-09', label: 'Discovery' },
      { date: '2023-11', label: 'Design' },
      { date: '2024-02', label: 'Launch' },
    ],
    stats: [
      { label: 'Faster listings', value: 3.2, suffix: 's' },
      { label: 'Lead conversion', value: 22, suffix: '%' },
    ],
  },
  {
    index: '02',
    id: 'ayurveda-organics',
    title: 'Ayurveda Organics',
    client: 'Ayurveda Organics',
    industry: 'E‑Commerce',
    summary: 'E‑commerce platform with login, payments and multi‑country support.',
    details: 'Delivered a full e-commerce experience with account login, secure checkout, and multi-country support for local pricing and shipping. The platform helps Ayurveda Organics serve customers across Australia and beyond with tailored checkout flows and regional currency handling.',
    tags: ['React', 'Stripe', 'E-commerce', 'International'],
    metric: 'Global-ready',
    year: '2024',
    accent: '#79C0FF',
    image: '/icons/ayurveda organics.png',
    imageAlt: 'Ayurveda Organics logo',
    screenshots: [
      '/devpage/ayurveda organics/image1.png',
      '/devpage/ayurveda organics/image.png',
      '/devpage/ayurveda organics/image2.png',
      '/devpage/ayurveda organics/image3.png',
    ],
    testimonial: {
      quote: 'The checkout and multi-currency flow made international growth straightforward.',
      author: 'Founder, Ayurveda Organics',
    },
    milestones: [
      { date: '2023-06', label: 'Discovery' },
      { date: '2023-09', label: 'Platform' },
      { date: '2024-01', label: 'Go-live' },
    ],
    stats: [
      { label: 'International regions', value: 6, suffix: '' },
      { label: 'Checkout speed', value: 1.1, suffix: 's' },
    ],
  },
];

export default CASE_STUDIES;

