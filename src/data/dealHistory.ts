export interface HistoricalDeal {
  id: string;
  brandName: string;
  brandLogo: string;
  amount: number;
  contentType: string;
  status: 'completed' | 'declined' | 'expired';
  completedAt: Date;
  channel: 'instagram_dm' | 'email' | 'whatsapp' | 'other';
  rating?: number;
  notes?: string;
}

export const dealHistory: HistoricalDeal[] = [
  {
    id: 'h1',
    brandName: 'Fenty Beauty',
    brandLogo: '💄',
    amount: 3500,
    contentType: '2 Reels + 1 Story',
    status: 'completed',
    completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    channel: 'email',
    rating: 5,
    notes: 'Great collaboration, fast payment',
  },
  {
    id: 'h2',
    brandName: 'Adidas',
    brandLogo: '👟',
    amount: 4200,
    contentType: '1 YouTube Video',
    status: 'completed',
    completedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    channel: 'email',
    rating: 4,
    notes: 'Required several revisions',
  },
  {
    id: 'h3',
    brandName: 'Dyson',
    brandLogo: '💨',
    amount: 6000,
    contentType: 'Product Review + Unboxing',
    status: 'completed',
    completedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    channel: 'instagram_dm',
    rating: 5,
    notes: 'Premium brand, professional team',
  },
  {
    id: 'h4',
    brandName: 'Unknown Startup',
    brandLogo: '🏢',
    amount: 500,
    contentType: '3 TikTok Videos',
    status: 'declined',
    completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    channel: 'instagram_dm',
    notes: 'Rate too low for deliverables',
  },
  {
    id: 'h5',
    brandName: 'Lululemon',
    brandLogo: '🧘',
    amount: 2800,
    contentType: '1 Reel',
    status: 'expired',
    completedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    channel: 'email',
    notes: 'Did not respond in time',
  },
  {
    id: 'h6',
    brandName: 'Apple',
    brandLogo: '🍎',
    amount: 15000,
    contentType: 'YouTube Integration',
    status: 'completed',
    completedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    channel: 'email',
    rating: 5,
    notes: 'Best collaboration experience',
  },
  {
    id: 'h7',
    brandName: 'Shein',
    brandLogo: '👗',
    amount: 800,
    contentType: 'Haul Video',
    status: 'declined',
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    channel: 'instagram_dm',
    notes: 'Brand values mismatch',
  },
  {
    id: 'h8',
    brandName: 'Spotify',
    brandLogo: '🎵',
    amount: 5500,
    contentType: '2 Instagram Posts + Story',
    status: 'completed',
    completedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    channel: 'email',
    rating: 4,
    notes: 'Good long-term potential',
  },
];

export function getDealHistoryStats(deals: HistoricalDeal[]) {
  const completed = deals.filter(d => d.status === 'completed');
  const totalEarnings = completed.reduce((sum, d) => sum + d.amount, 0);
  const avgRating = completed.filter(d => d.rating).reduce((sum, d) => sum + (d.rating || 0), 0) / completed.filter(d => d.rating).length;

  return {
    totalDeals: deals.length,
    completedDeals: completed.length,
    declinedDeals: deals.filter(d => d.status === 'declined').length,
    expiredDeals: deals.filter(d => d.status === 'expired').length,
    totalEarnings,
    avgRating: avgRating || 0,
  };
}
