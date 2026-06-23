import { PortfolioItem, JournalArticle, Testimonial } from './types';

// Curated selection of high-society luxury imagery from Unsplash matching dark charcoal/gold/lime aesthetic
export const images = {
  heroWedding: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1600',
  heroDecor: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600',
  champagneLuxury: 'https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?auto=format&fit=crop&q=80&w=1200',
  brandPartner1: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=600', // Elite venue
  founderMelanie: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800', // Refined expert planner
  corporateLuxury: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
  glamEvents: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
  weddingInspirations: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=1200',
  bespokePavilions: 'https://images.unsplash.com/photo-1505232458627-a72726f5b712?auto=format&fit=crop&q=80&w=1200'
};

export const trustedBrands = [
  { name: 'Vogue Weddings', country: 'UK' },
  { name: 'Tatler Elite', country: 'Europe' },
  { name: 'Harrods Premium', country: 'London' },
  { name: 'The Savoy Hotel', country: 'London' },
  { name: 'Blenheim Palace', country: 'Oxfordshire' },
  { name: 'Cliveden House', country: 'Berkshire' }
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'portfolio-1',
    title: 'A Midsummer Castle Romance',
    category: 'Weddings',
    location: 'Blenheim Palace, UK',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200',
    subtitle: 'Classic Grace Redefined',
    description: 'An ethereal multi-day forest styling featuring floating crystal structures and thousands of hand-sourced white peonies.'
  },
  {
    id: 'portfolio-2',
    title: 'The Obsidian Runway gala',
    category: 'Events',
    location: 'Battersea Power Station, London',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
    subtitle: 'High-Impact Creative Agency Design',
    description: 'An immersive product reveal combining interactive ambient mapping, fluid reactive displays, and bespoke neon elements.'
  },
  {
    id: 'portfolio-3',
    title: 'Chateau de Chantilly Soirée',
    category: 'Weddings',
    location: 'Chantilly, France',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    subtitle: 'European Aristocracy Styling',
    description: 'A weekend of gilded custom banquet settings, candlelight chandeliers, and bespoke opera symphony serenades.'
  },
  {
    id: 'portfolio-4',
    title: 'Aura Technology Gala',
    category: 'Events',
    location: 'The Shard, London',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    subtitle: 'VIP Launch & Experience',
    description: 'Sleek dark architecture paired with customized spatial coordinates, custom ambient structures, and panoramic views.'
  },
  {
    id: 'portfolio-5',
    title: 'Cliveden House Gilded Nuptials',
    category: 'Weddings',
    location: 'Berkshire, UK',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200',
    subtitle: 'Stately Heritage Splendor',
    description: 'Bespoke hand-crafted gold-engraved tables, a glass canopy cathedral structure, and midnight fireworks show.'
  },
  {
    id: 'portfolio-6',
    title: 'BFI Film Awards Celebration',
    category: 'Events',
    location: 'Westminster, London',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
    subtitle: 'Private Afterparty Lounge',
    description: 'Deep crimson and charcoal luxury lounges, velvet drapes, and customized ambient dynamic light sculptures.'
  }
];

export const journalArticles: JournalArticle[] = [
  {
    id: 'art-1',
    title: 'Refining the Art of Multi-Day Planning',
    category: 'Expert Planning',
    date: 'June 18, 2026',
    readTime: '6 Min Read',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Deep-dive into scheduling state affairs, logistics corridors, and orchestrating multiple high-production events across a single destination wedding weekend.',
    content: [
      'Multi-day events require a departure from typical timeline constraints. By designing the journey in movements—an intimate welcome reception, the stately main event, and a bespoke recovery brunch—guests experience a narrative development rather than a single peak.',
      'The logistics corridor between international arrivals and private estate checkpoints must remain completely transparent. We handle flight manifest integrations, personalized greeting fleets, and round-the-clock conceirge operations to keep high-society travelers comfortable.'
    ]
  },
  {
    id: 'art-2',
    title: 'The Rise of Immersive Tech in Luxury Events',
    category: 'Design Trends',
    date: 'May 29, 2026',
    readTime: '4 Min Read',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    excerpt: 'How spatial coordinates, responsive WebGL ambient screens, and quiet lasers are transforming royal ballrooms and historic sites.',
    content: [
      'Today, luxury clients seek experiences that are deeply sensory. Standard flower configurations are now paired with customized 3D spatial mapping projection on chateau walls, mimicking structural change over time or starry seasons.',
      'Integrating progressive electronics requires a delicate touch. The equipment must remain entirely hidden. Our builders embed trackers into floral installations and under dark silk tablecloths so interactions feel magic, rather than technical.'
    ]
  },
  {
    id: 'art-3',
    title: 'Sourcing Gilded Glassware & Bespoke Linen',
    category: 'Curation',
    date: 'April 14, 2026',
    readTime: '5 Min Read',
    image: 'https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Melanie Helen details her journeys across Italy, France, and Belgium to commission family-owned weavers and glassmakers.',
    content: [
      'The tactile sense is immediate. When guests sit down, the feel of the linen determines their mood. We travel to traditional weavers in Flanders to customize triple-threaded heavy weave table draperies that puddle perfectly on marble floors.',
      'Our gold-rimmed crystal collections are produced exclusively in Murano. Each piece is hand-blown and individually initialled with the host initials in pure karat gold leaf, establishing an unparalleled standard of event personalization.'
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    author: 'Lady Charlotte & Sir William',
    role: 'Bespoke Wedding Clients',
    quote: "Melanie Helen did not simply plan our three-day chateau wedding; she curated a timeless chapter of our lives. From the secret string quartet to the midnight garden illuminations, every movement was flawless.",
    venue: 'Blenheim Palace, UK'
  },
  {
    author: 'Chief Brand Officer, Zenith Group',
    role: 'Corporate Gala Showcase',
    quote: "Cranberry Blue integrated our vision with astonishing spatial precision. They created a fluid, architectural world where our clients felt deeply engaged, secure, and pampered. Undisputed masterbuilders.",
    venue: 'Battersea Power Station, London'
  },
  {
    author: 'H.R.H. Princess Amara of Monaco',
    role: 'Social Soirée Celebration',
    quote: "No detail was overlooked. The quiet confidence and deep database of elite suppliers that Cranberry Blue commands enabled us to sit back entirely, knowing perfection was guaranteed.",
    venue: 'Private Chateau, French Riviera'
  }
];
