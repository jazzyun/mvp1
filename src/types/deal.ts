export type DealPriority = 'high' | 'medium' | 'low';
export type DealChannel = 'instagram_dm' | 'email' | 'whatsapp' | 'other';
export type DealStatus = 'new' | 'in_progress' | 'responded' | 'closed';

export interface ContractRisk {
  type: 'secondary_usage' | 'secondary_usage_ad' | 'unlimited_period' | 'unlimited_revisions' | 'payment_terms' | 'other';
  description: string;
}

export interface Guideline {
  category: string;
  requirements: string[];
}

export type RiskLevel = 'high' | 'medium' | 'low';

export interface ContractTerm {
  label: string;
  value: string;
  riskLevel?: RiskLevel;
  warning?: string;
}

export interface ContractDetails {
  summary: string;
  deliverables: string[];
  payment: {
    amount: string;
    method: string;
    timing: string;
    riskLevel?: RiskLevel;
  };
  timeline: {
    contentDeadline: string;
    reviewPeriod: string;
    campaignPeriod: string;
  };
  usageRights: ContractTerm[];
  restrictions: string[];
  aiNotes: string[];
}

export interface Deal {
  id: string;
  brandName: string;
  brandKey?: string;
  channel: DealChannel;
  offeredAmount: number | null;
  offeredDetails: string;
  contentTypeKey?: string;
  receivedAt: Date;
  priority: DealPriority;
  risks: ContractRisk[];
  status: DealStatus;
  hasContract: boolean;
  contract?: ContractDetails;
  hasGuidelines: boolean;
  guidelines: Guideline[];
  requiresPerformance: boolean;
  conversation?: Conversation;
  brandProfile?: BrandProfile;
}

export interface DealCardAction {
  type: 'reply' | 'review_contract' | 'send_performance';
  label: string;
  enabled: boolean;
}

export interface ConversationMessage {
  id: string;
  sender: 'brand' | 'creator';
  senderName: string;
  content: string;
  timestamp: Date;
  hasAttachment?: boolean;
  attachmentType?: 'contract' | 'image' | 'file';
  attachmentName?: string;
}

export interface Conversation {
  brandEmail: string;
  channel: DealChannel;
  messages: ConversationMessage[];
}

export interface BrandNews {
  title: string;
  source: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface BrandProfile {
  logo: string;
  industry: string;
  description: string;
  founded: string;
  headquarters: string;
  socialFollowers: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  recentNews: BrandNews[];
  creatorReviews: {
    avgRating: number;
    totalReviews: number;
    paymentSpeed: 'fast' | 'average' | 'slow';
    communicationRating: number;
    reuseProbability: string;
  };
  aiRecommendation: {
    shouldCollaborate: boolean;
    reasons: string[];
    warnings: string[];
  };
}
