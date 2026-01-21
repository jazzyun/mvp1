import { Deal } from '@/types/deal';

export const mockDeals: Deal[] = [
  {
    id: '1',
    brandName: 'Glossier',
    brandKey: 'glossier',
    channel: 'instagram_dm',
    offeredAmount: 2000,
    offeredDetails: '1 Reel',
    contentTypeKey: 'one_reel',
    receivedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    priority: 'high',
    risks: [
      { type: 'secondary_usage', description: 'Secondary usage rights included' },
      { type: 'payment_terms', description: 'Net 60 payment terms' },
    ],
    status: 'new',
    hasContract: true,
    contract: {
      summary: 'Contract for Instagram Reel creation for Glossier new product launch campaign. Requesting product unboxing and review content.',
      deliverables: [
        'Instagram Reel x1 (60 seconds or less)',
        'Include product unboxing scene',
        'Genuine usage review',
      ],
      payment: {
        amount: '$2,000',
        method: 'Bank transfer',
        timing: 'Net 60 (within 60 days after content approval)',
        riskLevel: 'medium',
      },
      timeline: {
        contentDeadline: 'February 15, 2024',
        reviewPeriod: '5 business days',
        campaignPeriod: 'February 20, 2024 ~ March 20, 2024',
      },
      usageRights: [
        {
          label: 'Usage Period',
          value: '1 year',
          riskLevel: 'low',
        },
        {
          label: 'Secondary Usage',
          value: 'Can be used on brand SNS and ad materials',
          riskLevel: 'high',
          warning: 'May be used in ads without additional compensation',
        },
        {
          label: 'Edit Rights',
          value: 'Brand can edit content',
          riskLevel: 'medium',
          warning: 'Original content may be modified',
        },
      ],
      restrictions: [
        'No promotion of competing products during contract period',
        'Content cannot be deleted (for 1 year)',
        'No modifications without prior approval',
      ],
      aiNotes: [
        '💰 Net 60 payment terms are longer than industry average (Net 30). Negotiation recommended.',
        '⚠️ Secondary usage rights are included, allowing use in advertising. Consider negotiating additional fees.',
        '✅ 1 year usage period is reasonable.',
      ],
    },
    hasGuidelines: true,
    guidelines: [
      {
        category: 'Content Requirements',
        requirements: [
          'Instagram Reel format (60 seconds or less)',
          'Include product unboxing + usage scene',
          'Film in natural lighting',
        ],
      },
      {
        category: 'Required Mentions',
        requirements: [
          '@glossier tag required',
          '#GlossierPartner hashtag',
          'Mention product name accurately',
        ],
      },
      {
        category: 'Prohibited Items',
        requirements: [
          'No competitor product exposure',
          'No exaggerated effect claims',
          'No political/religious statements',
        ],
      },
    ],
    requiresPerformance: true,
    conversation: {
      brandEmail: 'partnerships@glossier.com',
      channel: 'instagram_dm',
      messages: [
        {
          id: 'm1',
          sender: 'brand',
          senderName: 'Glossier Team',
          content: 'Hi! This is Glossier ✨\n\nWe\'re looking for creators to join our new product launch campaign. Would you be interested in collaborating?',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
          id: 'm2',
          sender: 'creator',
          senderName: 'Me',
          content: 'Hi! Thank you for reaching out :)\nCould you share more details about the campaign?',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        },
        {
          id: 'm3',
          sender: 'brand',
          senderName: 'Glossier Team',
          content: 'Sure! This is a promotional campaign for our new skincare line.\n\nWe\'d like to request 1 Instagram Reel, and the proposed amount is $2,000.\n\nIf you\'re interested, we\'ll send you the contract!',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          id: 'm4',
          sender: 'brand',
          senderName: 'Glossier Team',
          content: 'Attached is the contract. Please review!',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
          hasAttachment: true,
          attachmentType: 'contract',
          attachmentName: 'Glossier_Contract_2024.pdf',
        },
      ],
    },
    brandProfile: {
      logo: '💄',
      industry: 'Beauty & Skincare',
      description: 'Glossier is a beauty brand based on the "Skin First, Makeup Second" philosophy. Targeting millennials and Gen Z, they offer minimal and natural beauty products.',
      founded: '2014',
      headquarters: 'New York, USA',
      socialFollowers: {
        instagram: '2.8M',
        youtube: '120K',
        tiktok: '850K',
      },
      recentNews: [
        {
          title: 'Glossier Announces Full-Scale Entry into Korean Market',
          source: 'Beauty Korea',
          date: '2024.01.15',
          sentiment: 'positive',
        },
        {
          title: 'Enters TOP 10 Global Beauty Brand Sales Rankings',
          source: 'Forbes',
          date: '2024.01.10',
          sentiment: 'positive',
        },
        {
          title: 'New Skincare Line Launch Planned',
          source: 'Allure',
          date: '2024.01.05',
          sentiment: 'neutral',
        },
      ],
      creatorReviews: {
        avgRating: 4.2,
        totalReviews: 156,
        paymentSpeed: 'average',
        communicationRating: 4.5,
        reuseProbability: '78%',
      },
      aiRecommendation: {
        shouldCollaborate: true,
        reasons: [
          'Globally recognized beauty brand, great for portfolio',
          'Creator rating 4.2/5 is good',
          'Korean market entry means more future collaboration opportunities',
        ],
        warnings: [
          'Net 60 payment terms - negotiation recommended',
          'Secondary usage rights clause requires attention',
        ],
      },
    },
  },
  {
    id: '2',
    brandName: 'Nike',
    brandKey: 'nike',
    channel: 'email',
    offeredAmount: 5000,
    offeredDetails: '1 YouTube video + 3 Instagram Stories',
    contentTypeKey: 'youtube_and_stories',
    receivedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    priority: 'high',
    risks: [
      { type: 'unlimited_period', description: 'Unlimited usage period' },
    ],
    status: 'new',
    hasContract: true,
    contract: {
      summary: 'Nike new sneaker campaign. Requesting product promotion through YouTube review video and Instagram Stories.',
      deliverables: [
        'YouTube video x1 (8-12 minutes)',
        'Instagram Stories x3',
        'Product wearing and exercise scenes',
      ],
      payment: {
        amount: '$5,000',
        method: 'Bank transfer',
        timing: 'Net 30 (within 30 days after content posting)',
        riskLevel: 'low',
      },
      timeline: {
        contentDeadline: 'February 28, 2024',
        reviewPeriod: '7 business days',
        campaignPeriod: 'March 1, 2024 ~ April 30, 2024',
      },
      usageRights: [
        {
          label: 'Usage Period',
          value: 'Unlimited (perpetual)',
          riskLevel: 'high',
          warning: 'Content may be used permanently. Additional negotiation recommended.',
        },
        {
          label: 'Secondary Usage',
          value: 'None',
          riskLevel: 'low',
        },
        {
          label: 'Edit Rights',
          value: 'Not allowed',
          riskLevel: 'low',
        },
      ],
      restrictions: [
        'No competing brand collaborations for 6 months',
        'Content cannot be deleted without permission',
      ],
      aiNotes: [
        '🚨 Unlimited usage period is a very unfavorable condition. Negotiate to 1-2 years.',
        '✅ Net 30 payment terms are appropriate.',
        '⚠️ 6-month competitor collaboration ban clause exists. May affect other sports brand deals.',
      ],
    },
    hasGuidelines: true,
    guidelines: [
      {
        category: 'YouTube Video',
        requirements: [
          'Video length: 8-12 minutes',
          'Minimum 3 minutes of product wearing scenes',
          'Must film during exercise/activity',
        ],
      },
      {
        category: 'Instagram Story',
        requirements: [
          'Upload 3 consecutive stories',
          'Include swipe up link',
          'Upload within 24 hours',
        ],
      },
      {
        category: 'Branding',
        requirements: [
          'Nike logo clearly visible',
          '"Just Do It" slogan can be used',
          '@nike tag required',
        ],
      },
    ],
    requiresPerformance: true,
    conversation: {
      brandEmail: 'creator.marketing@nike.com',
      channel: 'email',
      messages: [
        {
          id: 'n1',
          sender: 'brand',
          senderName: 'Nike Marketing',
          content: 'Hello,\n\nThis is the Nike Marketing team.\n\nWe are looking for creators to participate in our upcoming new product launch campaign. We think your channel would be a great fit for our brand.\n\nPlease reply if interested.\n\nThank you.',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          id: 'n2',
          sender: 'creator',
          senderName: 'Me',
          content: 'Hello,\n\nThank you for reaching out. Could you please share more details about the campaign?\n\nThank you.',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
        },
        {
          id: 'n3',
          sender: 'brand',
          senderName: 'Nike Marketing',
          content: 'Hello,\n\nThank you for your reply!\n\nThis campaign is for a new running shoe launch.\n\nRequirements:\n- YouTube review video x1 (8-12 minutes)\n- Instagram Stories x3\n\nProposed amount: $5,000\n\nPlease review the attached contract and let us know if you have any questions.',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          hasAttachment: true,
          attachmentType: 'contract',
          attachmentName: 'Nike_Creator_Agreement.pdf',
        },
      ],
    },
    brandProfile: {
      logo: '👟',
      industry: 'Sportswear & Athletic',
      description: 'Nike is the world\'s largest sportswear company, famous for the "Just Do It" slogan. Through innovative sneakers and sportswear, they inspire athletes and consumers worldwide.',
      founded: '1964',
      headquarters: 'Oregon, USA',
      socialFollowers: {
        instagram: '306M',
        youtube: '1.9M',
        tiktok: '5.2M',
      },
      recentNews: [
        {
          title: 'Nike Confirmed as Official 2024 Paris Olympics Sponsor',
          source: 'Sports Business Journal',
          date: '2024.01.18',
          sentiment: 'positive',
        },
        {
          title: 'Announces Expansion of Sustainable Materials Usage',
          source: 'Reuters',
          date: '2024.01.12',
          sentiment: 'positive',
        },
        {
          title: 'Plans Store Restructuring in Some Regions',
          source: 'Bloomberg',
          date: '2024.01.08',
          sentiment: 'negative',
        },
      ],
      creatorReviews: {
        avgRating: 4.6,
        totalReviews: 523,
        paymentSpeed: 'fast',
        communicationRating: 4.3,
        reuseProbability: '85%',
      },
      aiRecommendation: {
        shouldCollaborate: true,
        reasons: [
          'World\'s largest sports brand - extremely high portfolio value',
          'Creator rating 4.6/5 is excellent',
          'Fast payment (Net 30)',
          '85% re-collaboration rate indicates high long-term partnership potential',
        ],
        warnings: [
          'Unlimited usage period clause must be negotiated',
          '6-month competitor collaboration ban requires attention',
        ],
      },
    },
  },
  {
    id: '3',
    brandName: 'Local Cafe Brand',
    brandKey: 'local_cafe',
    channel: 'instagram_dm',
    offeredAmount: 300,
    offeredDetails: 'Product sponsorship + small fee',
    contentTypeKey: 'product_sponsorship',
    receivedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    risks: [],
    status: 'new',
    hasContract: false,
    hasGuidelines: false,
    guidelines: [],
    requiresPerformance: false,
    conversation: {
      brandEmail: 'localcafe_official',
      channel: 'instagram_dm',
      messages: [
        {
          id: 'c1',
          sender: 'brand',
          senderName: 'Local Cafe',
          content: 'Hi! We\'d like to propose a promotional collaboration for our cafe ☕\nWe offer product sponsorship + a small fee~',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
      ],
    },
    brandProfile: {
      logo: '☕',
      industry: 'Food & Beverage',
      description: 'A specialty coffee shop located in Seongsu-dong. Popular for their in-house roasted beans and signature desserts, with aesthetic interior design that makes it a hotspot for millennials and Gen Z.',
      founded: '2022',
      headquarters: 'Seoul, Korea',
      socialFollowers: {
        instagram: '15K',
      },
      recentNews: [
        {
          title: 'Selected as TOP 10 Hotspot Cafe in Seongsu-dong',
          source: 'Seoul Economy',
          date: '2024.01.10',
          sentiment: 'positive',
        },
      ],
      creatorReviews: {
        avgRating: 3.8,
        totalReviews: 12,
        paymentSpeed: 'slow',
        communicationRating: 3.5,
        reuseProbability: '42%',
      },
      aiRecommendation: {
        shouldCollaborate: false,
        reasons: [
          'Local recognition as Seongsu-dong hotspot',
          'Good for aesthetic content creation',
        ],
        warnings: [
          'Proposed amount is low ($300)',
          'Creator rating 3.8/5 is somewhat low',
          'Slow payment speed - be cautious',
          'Re-collaboration rate 42% is on the lower side',
          'No contract - difficult to protect in case of disputes',
        ],
      },
    },
  },
  {
    id: '4',
    brandName: 'Samsung Electronics',
    brandKey: 'samsung',
    channel: 'email',
    offeredAmount: 8000,
    offeredDetails: 'Galaxy product review video',
    contentTypeKey: 'galaxy_review',
    receivedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    priority: 'high',
    risks: [
      { type: 'unlimited_revisions', description: 'Unlimited revision requests' },
      { type: 'secondary_usage_ad', description: 'Can be used as ad material' },
    ],
    status: 'new',
    hasContract: true,
    contract: {
      summary: 'Product review video production contract for Samsung Galaxy new product launch. Requesting detailed feature introduction and real usage review.',
      deliverables: [
        'YouTube review video x1 (10-15 minutes)',
        'Include product unboxing',
        'Introduce at least 3 key features',
        'Demonstrate real usage scenarios',
      ],
      payment: {
        amount: '$8,000',
        method: 'Bank transfer',
        timing: 'Net 45 (within 45 days after final approval)',
        riskLevel: 'low',
      },
      timeline: {
        contentDeadline: 'Product launch D-3',
        reviewPeriod: '3 business days (expedited review)',
        campaignPeriod: 'Product launch ~ 3 months',
      },
      usageRights: [
        {
          label: 'Usage Period',
          value: '2 years',
          riskLevel: 'low',
        },
        {
          label: 'Secondary Usage',
          value: 'Can be used as ad material (TV, digital)',
          riskLevel: 'high',
          warning: 'Additional fee negotiation needed if used for TV ads.',
        },
        {
          label: 'Edit Rights',
          value: 'Unlimited revision requests allowed',
          riskLevel: 'high',
          warning: 'No limit on revisions - may lead to excessive revision requests.',
        },
      ],
      restrictions: [
        'No comparison mentions with other smartphone products',
        'No pre-launch information disclosure (NDA)',
        'Must remain confidential until designated launch date',
      ],
      aiNotes: [
        '💰 $8,000 is appropriate, but recommend negotiating to $10,000+ if ad material usage rights are included.',
        '🚨 Unlimited revisions is a risk. Negotiate to limit to maximum 3 revisions.',
        '⚠️ Separate fee negotiation needed for TV ad usage.',
        '✅ 2 year usage period is reasonable.',
      ],
    },
    hasGuidelines: true,
    guidelines: [
      {
        category: 'Video Structure',
        requirements: [
          'Start with product unboxing',
          'Introduce at least 3 key features',
          'Demonstrate real usage scenarios',
          'No comparison mentions with other products',
        ],
      },
      {
        category: 'Technical Requirements',
        requirements: [
          '4K resolution filming',
          'Include product close-up shots',
          'Galaxy logo must be visible',
        ],
      },
      {
        category: 'Upload Schedule',
        requirements: [
          'Upload on product launch D-3',
          'Apply changes after pre-review',
          'Insert purchase link in pinned comment',
        ],
      },
    ],
    requiresPerformance: true,
    conversation: {
      brandEmail: 'creator.partnership@samsung.com',
      channel: 'email',
      messages: [
        {
          id: 's1',
          sender: 'brand',
          senderName: 'Samsung Mobile',
          content: 'Hello,\n\nThis is the Samsung Electronics Mobile Marketing team.\n\nWe would like to request a review video for our upcoming Galaxy new product.\n\nWe think your tech review content would be a great fit for our product.\n\nPlease let us know if interested and we\'ll share more details.\n\nThank you.',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
        {
          id: 's2',
          sender: 'creator',
          senderName: 'Me',
          content: 'Hello,\n\nThank you for the proposal! Please share the details and terms.',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        },
        {
          id: 's3',
          sender: 'brand',
          senderName: 'Samsung Mobile',
          content: 'Thank you for the quick reply!\n\n[Campaign Overview]\n- Product: Galaxy S24 Ultra\n- Content: YouTube review video (10-15 minutes)\n- Amount: $8,000\n- Schedule: Upload on product launch D-3\n\nAttached are the detailed contract and guidelines.\nPlease review and let us know if you have any questions.',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          hasAttachment: true,
          attachmentType: 'contract',
          attachmentName: 'Samsung_Creator_Contract.pdf',
        },
        {
          id: 's4',
          sender: 'brand',
          senderName: 'Samsung Mobile',
          content: 'Also attaching the guidelines document.',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 5 * 60 * 1000),
          hasAttachment: true,
          attachmentType: 'file',
          attachmentName: 'Galaxy_S24_Review_Guidelines.pdf',
        },
      ],
    },
    brandProfile: {
      logo: '📱',
      industry: 'Consumer Electronics',
      description: 'Samsung Electronics is one of the world\'s largest electronics manufacturers, offering innovative products in smartphones, TVs, home appliances, and more. The Galaxy series is a globally beloved smartphone brand.',
      founded: '1969',
      headquarters: 'Suwon, Korea',
      socialFollowers: {
        instagram: '95M',
        youtube: '8.2M',
        tiktok: '3.1M',
      },
      recentNews: [
        {
          title: 'Galaxy S24 Series AI Features Significantly Enhanced',
          source: 'The Verge',
          date: '2024.01.17',
          sentiment: 'positive',
        },
        {
          title: 'Wins Multiple CES 2024 Innovation Awards',
          source: 'TechCrunch',
          date: '2024.01.10',
          sentiment: 'positive',
        },
        {
          title: 'Maintains #1 Global Smartphone Market Share',
          source: 'IDC',
          date: '2024.01.05',
          sentiment: 'positive',
        },
      ],
      creatorReviews: {
        avgRating: 4.4,
        totalReviews: 892,
        paymentSpeed: 'average',
        communicationRating: 4.0,
        reuseProbability: '72%',
      },
      aiRecommendation: {
        shouldCollaborate: true,
        reasons: [
          'Global Top electronics brand - high portfolio value',
          'Creator rating 4.4/5 is good',
          'Proposed amount $8,000 is appropriate',
          'Helps increase brand awareness as a tech reviewer',
        ],
        warnings: [
          'Unlimited revisions clause must be negotiated',
          'Additional fee negotiation recommended if ad material usage rights included',
          'NDA clause prevents sharing pre-launch information',
        ],
      },
    },
  },
  {
    id: '5',
    brandName: 'Sephora',
    brandKey: 'sephora',
    channel: 'email',
    offeredAmount: 3500,
    offeredDetails: '2 Reels + 1 Tutorial',
    contentTypeKey: 'reels_and_tutorial',
    receivedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    priority: 'medium',
    risks: [
      { type: 'secondary_usage', description: 'Secondary usage rights included' },
    ],
    status: 'new',
    hasContract: true,
    contract: {
      summary: 'Sephora holiday campaign featuring new makeup collection. Requesting tutorial and product showcase.',
      deliverables: [
        'Instagram Reels x2 (30-60 seconds each)',
        'Full tutorial video (5-8 minutes)',
        'Before/after transformations',
      ],
      payment: {
        amount: '$3,500',
        method: 'Bank transfer',
        timing: 'Net 30 (within 30 days after content posting)',
        riskLevel: 'low',
      },
      timeline: {
        contentDeadline: 'February 10, 2024',
        reviewPeriod: '5 business days',
        campaignPeriod: 'February 14, 2024 ~ March 14, 2024',
      },
      usageRights: [
        {
          label: 'Usage Period',
          value: '6 months',
          riskLevel: 'low',
        },
        {
          label: 'Secondary Usage',
          value: 'Can be used on brand website and email marketing',
          riskLevel: 'medium',
          warning: 'May appear in Sephora marketing materials',
        },
      ],
      restrictions: [
        'No competitor product mentions for 30 days',
        'Must use provided product samples',
      ],
      aiNotes: [
        '✅ Payment terms and amount are fair for deliverables.',
        '⚠️ Secondary usage includes email marketing - consider if this affects your rate.',
        '✅ 6 month usage period is reasonable.',
      ],
    },
    hasGuidelines: true,
    guidelines: [
      {
        category: 'Content Style',
        requirements: [
          'Clean, well-lit beauty content',
          'Show product application techniques',
          'Include product swatches on skin',
        ],
      },
      {
        category: 'Branding',
        requirements: [
          '@sephora tag required',
          '#SephoraPartner hashtag',
          'Mention product names accurately',
        ],
      },
    ],
    requiresPerformance: true,
    brandProfile: {
      logo: '💋',
      industry: 'Beauty Retail',
      description: 'Sephora is a leading beauty retailer offering a wide selection of makeup, skincare, and fragrance products from prestigious brands worldwide.',
      founded: '1969',
      headquarters: 'Paris, France',
      socialFollowers: {
        instagram: '21M',
        youtube: '1.2M',
        tiktok: '3.8M',
      },
      recentNews: [
        {
          title: 'Sephora Expands Clean Beauty Selection',
          source: 'WWD',
          date: '2024.01.12',
          sentiment: 'positive',
        },
      ],
      creatorReviews: {
        avgRating: 4.3,
        totalReviews: 445,
        paymentSpeed: 'fast',
        communicationRating: 4.2,
        reuseProbability: '68%',
      },
      aiRecommendation: {
        shouldCollaborate: true,
        reasons: [
          'Premium beauty retailer with high brand recognition',
          'Fair payment for deliverables',
          'Good creator reviews',
        ],
        warnings: [
          'Secondary usage clause needs review',
        ],
      },
    },
  },
  {
    id: '6',
    brandName: 'Spotify',
    brandKey: 'spotify',
    channel: 'instagram_dm',
    offeredAmount: 4500,
    offeredDetails: '1 YouTube Video + Stories',
    contentTypeKey: 'youtube_and_stories',
    receivedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    priority: 'high',
    risks: [],
    status: 'new',
    hasContract: true,
    contract: {
      summary: 'Spotify Wrapped campaign collaboration. Showcasing your music listening habits and favorite features.',
      deliverables: [
        'YouTube video x1 (8-12 minutes)',
        'Instagram Stories x5 showing your Wrapped',
        'Authentic reaction to your stats',
      ],
      payment: {
        amount: '$4,500',
        method: 'Bank transfer',
        timing: 'Net 15 (within 15 days after content posting)',
        riskLevel: 'low',
      },
      timeline: {
        contentDeadline: 'December 5, 2024',
        reviewPeriod: '3 business days',
        campaignPeriod: 'December 1, 2024 ~ December 31, 2024',
      },
      usageRights: [
        {
          label: 'Usage Period',
          value: '1 year',
          riskLevel: 'low',
        },
        {
          label: 'Secondary Usage',
          value: 'None',
          riskLevel: 'low',
        },
      ],
      restrictions: [
        'No competing music streaming service mentions',
      ],
      aiNotes: [
        '✅ Excellent payment terms - Net 15 is very fast.',
        '✅ No secondary usage - great for your rights.',
        '✅ Fun, creative content opportunity.',
      ],
    },
    hasGuidelines: true,
    guidelines: [
      {
        category: 'Content Focus',
        requirements: [
          'Show genuine reaction to Wrapped stats',
          'Highlight favorite features',
          'Share personal music journey',
        ],
      },
    ],
    requiresPerformance: false,
    brandProfile: {
      logo: '🎵',
      industry: 'Music Streaming',
      description: 'Spotify is the world\'s largest music streaming platform with millions of songs and podcasts available to listeners worldwide.',
      founded: '2006',
      headquarters: 'Stockholm, Sweden',
      socialFollowers: {
        instagram: '28M',
        youtube: '35M',
        tiktok: '8.5M',
      },
      recentNews: [
        {
          title: 'Spotify Wrapped 2024 Features AI DJ',
          source: 'TechCrunch',
          date: '2024.01.08',
          sentiment: 'positive',
        },
      ],
      creatorReviews: {
        avgRating: 4.7,
        totalReviews: 312,
        paymentSpeed: 'fast',
        communicationRating: 4.6,
        reuseProbability: '82%',
      },
      aiRecommendation: {
        shouldCollaborate: true,
        reasons: [
          'Top-tier brand with excellent creator reviews',
          'Fast payment (Net 15)',
          'No secondary usage rights - great terms',
          'Fun, engaging content opportunity',
        ],
        warnings: [],
      },
    },
  },
  {
    id: '7',
    brandName: 'Zara',
    brandKey: 'zara',
    channel: 'email',
    offeredAmount: null,
    offeredDetails: 'Product gifting + potential paid collab',
    contentTypeKey: 'product_gifting',
    receivedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    priority: 'low',
    risks: [
      { type: 'other', description: 'No guaranteed payment' },
    ],
    status: 'new',
    hasContract: false,
    hasGuidelines: false,
    guidelines: [],
    requiresPerformance: false,
    conversation: {
      brandEmail: 'influencers@zara.com',
      channel: 'email',
      messages: [
        {
          id: 'z1',
          sender: 'brand',
          senderName: 'Zara PR Team',
          content: 'Hi!\n\nWe love your style and would love to send you some pieces from our new collection. If it goes well, we\'d love to discuss a paid collaboration for our spring campaign.\n\nLet us know if you\'re interested!',
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        },
      ],
    },
    brandProfile: {
      logo: '👗',
      industry: 'Fast Fashion',
      description: 'Zara is a Spanish fast fashion retailer known for trendy, affordable clothing and rapid product turnover.',
      founded: '1975',
      headquarters: 'A Coruna, Spain',
      socialFollowers: {
        instagram: '59M',
        tiktok: '7.2M',
      },
      recentNews: [
        {
          title: 'Zara Launches Sustainable Collection',
          source: 'Vogue Business',
          date: '2024.01.14',
          sentiment: 'positive',
        },
      ],
      creatorReviews: {
        avgRating: 3.5,
        totalReviews: 89,
        paymentSpeed: 'slow',
        communicationRating: 3.2,
        reuseProbability: '35%',
      },
      aiRecommendation: {
        shouldCollaborate: false,
        reasons: [
          'Large fashion brand with good exposure',
        ],
        warnings: [
          'No guaranteed payment - only product gifting',
          'Lower creator ratings (3.5/5)',
          'Slow payment history when paid',
          'Consider requesting paid terms upfront',
        ],
      },
    },
  },
];

export function getTodayDealsCount(deals: Deal[]): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return deals.filter(deal => {
    const dealDate = new Date(deal.receivedAt);
    dealDate.setHours(0, 0, 0, 0);
    return dealDate.getTime() === today.getTime() || deal.status === 'new';
  }).length;
}
