export type Category = 'TUTTI' | 'VIRALI' | 'NEWS' | 'VIDEO' | 'CULTURA' | 'SPORT' | 'SPETTACOLO' | 'CURIOSITÀ';
export type Province = 'Tutte' | 'Palermo' | 'Catania' | 'Messina' | 'Siracusa' | 'Ragusa' | 'Trapani' | 'Agrigento' | 'Enna' | 'Caltanissetta';
export type TimeFilter = 'OGGI' | 'ULTIME 24H' | 'ULTIMA SETTIMANA';
export type FeedTab = 'ULTIME' | 'VIRALI' | 'PER TE';

export interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  province: Province;
  image: string;
  date: string;
  timestamp: string; // e.g., '10 min fa', '2 ore fa'
  views: number; // e.g., 125500
  viewsFormatted: string; // e.g., '125K'
  platform?: 'TikTok' | 'Instagram' | 'YouTube' | 'Web' | 'Telegram';
  duration?: string;
  badge?: 'VIRALE' | 'TRENDING' | 'VIDEO' | 'NEWS' | 'NUOVO' | 'ESCLUSIVA';
  author: string;
  originalSource?: {
    name: string;
    url: string;
  };
  isHeroFeature?: boolean;
}
