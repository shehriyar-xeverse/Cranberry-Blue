export type ActiveTheme = 'gold' | 'lime';

export type PageId =
  | 'home'
  | 'weddings'
  | 'events'
  | 'portfolio'
  | 'journal'
  | 'about'
  | 'brochures'
  | 'contact';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Weddings' | 'Events';
  location: string;
  image: string;
  subtitle: string;
  description: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
}

export interface Testimonial {
  author: string;
  role: string;
  quote: string;
  venue: string;
}
