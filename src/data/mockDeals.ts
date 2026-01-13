import { Deal } from '@/types/deal';

export const mockDeals: Deal[] = [
  {
    id: '1',
    brandName: 'Glossier',
    channel: 'instagram_dm',
    offeredAmount: 2000,
    offeredDetails: 'Reel 1개',
    receivedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    priority: 'high',
    risks: [
      { type: 'secondary_usage', description: '2차 활용권 포함' },
      { type: 'payment_terms', description: 'Net 60 지급 조건' },
    ],
    status: 'new',
    hasContract: true,
    contract: {
      summary: 'Glossier 신제품 런칭 캠페인을 위한 Instagram Reel 제작 계약입니다. 제품 언박싱 및 사용 후기 컨텐츠를 요청하고 있습니다.',
      deliverables: [
        'Instagram Reel 1개 (60초 이내)',
        '제품 언박싱 장면 포함',
        '실제 사용 후기 멘트',
      ],
      payment: {
        amount: '$2,000',
        method: '계좌이체',
        timing: 'Net 60 (컨텐츠 승인 후 60일 이내)',
        riskLevel: 'medium',
      },
      timeline: {
        contentDeadline: '2024년 2월 15일',
        reviewPeriod: '영업일 기준 5일',
        campaignPeriod: '2024년 2월 20일 ~ 3월 20일',
      },
      usageRights: [
        {
          label: '사용 기간',
          value: '1년',
          riskLevel: 'low',
        },
        {
          label: '2차 활용',
          value: '브랜드 SNS 및 광고 소재 사용 가능',
          riskLevel: 'high',
          warning: '추가 보상 없이 광고에 사용될 수 있습니다',
        },
        {
          label: '수정 권한',
          value: '브랜드 측 편집 가능',
          riskLevel: 'medium',
          warning: '원본이 변형될 수 있습니다',
        },
      ],
      restrictions: [
        '계약 기간 내 경쟁사 제품 홍보 금지',
        '컨텐츠 삭제 불가 (1년간)',
        '사전 승인 없이 수정 불가',
      ],
      aiNotes: [
        '💰 Net 60 지급 조건은 업계 평균(Net 30)보다 깁니다. 협상을 권장합니다.',
        '⚠️ 2차 활용권이 포함되어 있어 광고 소재로 사용될 수 있습니다. 추가 비용 협상을 고려하세요.',
        '✅ 사용 기간 1년은 적정 수준입니다.',
      ],
    },
    hasGuidelines: true,
    guidelines: [
      {
        category: '컨텐츠 요구사항',
        requirements: [
          'Instagram Reel 형식 (60초 이내)',
          '제품 언박싱 + 사용 장면 포함',
          '자연광에서 촬영',
        ],
      },
      {
        category: '필수 멘션',
        requirements: [
          '@glossier 태그 필수',
          '#GlossierPartner 해시태그',
          '제품명 정확히 언급',
        ],
      },
      {
        category: '금지 사항',
        requirements: [
          '경쟁사 제품 노출 금지',
          '과장된 효과 주장 금지',
          '정치적/종교적 발언 금지',
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
          content: '안녕하세요! Glossier Korea입니다 ✨\n\n저희 신제품 런칭 캠페인에 함께해 주실 크리에이터를 찾고 있어요. 혹시 협업 가능하실까요?',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
          id: 'm2',
          sender: 'creator',
          senderName: 'Me',
          content: '안녕하세요! 연락 주셔서 감사합니다 :)\n어떤 캠페인인지 자세히 알 수 있을까요?',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        },
        {
          id: 'm3',
          sender: 'brand',
          senderName: 'Glossier Team',
          content: '네! 이번에 새로 출시되는 스킨케어 라인 홍보 캠페인이에요.\n\nInstagram Reel 1개 제작을 요청드리고 싶고, 제안 금액은 $2,000입니다.\n\n관심 있으시면 계약서 보내드릴게요!',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          id: 'm4',
          sender: 'brand',
          senderName: 'Glossier Team',
          content: '계약서 첨부드립니다. 검토 부탁드려요!',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
          hasAttachment: true,
          attachmentType: 'contract',
          attachmentName: 'Glossier_Contract_2024.pdf',
        },
      ],
    },
  },
  {
    id: '2',
    brandName: 'Nike Korea',
    channel: 'email',
    offeredAmount: 5000,
    offeredDetails: 'YouTube 영상 1개 + Instagram Story 3개',
    receivedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    priority: 'high',
    risks: [
      { type: 'unlimited_period', description: '사용 기간 무제한' },
    ],
    status: 'new',
    hasContract: true,
    contract: {
      summary: 'Nike 신제품 운동화 캠페인입니다. YouTube 리뷰 영상과 Instagram Story를 통한 제품 홍보를 요청합니다.',
      deliverables: [
        'YouTube 영상 1개 (8-12분)',
        'Instagram Story 3개',
        '제품 착용 및 운동 장면',
      ],
      payment: {
        amount: '$5,000',
        method: '계좌이체',
        timing: 'Net 30 (컨텐츠 게시 후 30일 이내)',
        riskLevel: 'low',
      },
      timeline: {
        contentDeadline: '2024년 2월 28일',
        reviewPeriod: '영업일 기준 7일',
        campaignPeriod: '2024년 3월 1일 ~ 4월 30일',
      },
      usageRights: [
        {
          label: '사용 기간',
          value: '무제한 (영구적)',
          riskLevel: 'high',
          warning: '컨텐츠가 영구적으로 사용될 수 있습니다. 추가 협상을 권장합니다.',
        },
        {
          label: '2차 활용',
          value: '없음',
          riskLevel: 'low',
        },
        {
          label: '수정 권한',
          value: '불가',
          riskLevel: 'low',
        },
      ],
      restrictions: [
        '6개월간 경쟁 브랜드 협업 금지',
        '컨텐츠 무단 삭제 금지',
      ],
      aiNotes: [
        '🚨 사용 기간 무제한은 매우 불리한 조건입니다. 1-2년으로 협상하세요.',
        '✅ Net 30 지급 조건은 적정합니다.',
        '⚠️ 6개월 경쟁사 협업 금지 조항이 있습니다. 다른 스포츠 브랜드 딜에 영향을 줄 수 있습니다.',
      ],
    },
    hasGuidelines: true,
    guidelines: [
      {
        category: 'YouTube 영상',
        requirements: [
          '영상 길이: 8-12분',
          '제품 착용 장면 최소 3분',
          '운동/활동 중 촬영 필수',
        ],
      },
      {
        category: 'Instagram Story',
        requirements: [
          '3개 스토리 연속 업로드',
          '스와이프 업 링크 포함',
          '24시간 내 업로드',
        ],
      },
      {
        category: '브랜딩',
        requirements: [
          'Nike 로고 선명하게 노출',
          '"Just Do It" 슬로건 사용 가능',
          '@nikekorea 태그 필수',
        ],
      },
    ],
    requiresPerformance: false,
    conversation: {
      brandEmail: 'creator.marketing@nike.com',
      channel: 'email',
      messages: [
        {
          id: 'n1',
          sender: 'brand',
          senderName: 'Nike Korea Marketing',
          content: '안녕하세요,\n\nNike Korea 마케팅팀입니다.\n\n다가오는 신제품 런칭 캠페인에 참여해 주실 크리에이터를 찾고 있습니다. 귀하의 채널이 저희 브랜드와 잘 맞을 것 같아 연락드립니다.\n\n관심 있으시면 회신 부탁드립니다.\n\n감사합니다.',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          id: 'n2',
          sender: 'creator',
          senderName: 'Me',
          content: '안녕하세요,\n\n연락 감사합니다. 어떤 캠페인인지 상세 내용 공유 부탁드립니다.\n\n감사합니다.',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
        },
        {
          id: 'n3',
          sender: 'brand',
          senderName: 'Nike Korea Marketing',
          content: '안녕하세요,\n\n회신 감사합니다!\n\n이번 캠페인은 새로운 러닝화 출시 관련입니다.\n\n요청 사항:\n- YouTube 리뷰 영상 1개 (8-12분)\n- Instagram Story 3개\n\n제안 금액: $5,000\n\n첨부된 계약서 검토 후 의견 주시면 감사하겠습니다.',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          hasAttachment: true,
          attachmentType: 'contract',
          attachmentName: 'Nike_Creator_Agreement.pdf',
        },
      ],
    },
  },
  {
    id: '3',
    brandName: 'Local Cafe Brand',
    channel: 'instagram_dm',
    offeredAmount: 300,
    offeredDetails: '제품 협찬 + 소정의 원고료',
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
          content: '안녕하세요! 저희 카페 홍보 협업 제안드려요 ☕\n제품 협찬 + 소정의 원고료 드립니다~',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
      ],
    },
  },
  {
    id: '4',
    brandName: 'Samsung Electronics',
    channel: 'email',
    offeredAmount: 8000,
    offeredDetails: 'Galaxy 제품 리뷰 영상',
    receivedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    priority: 'high',
    risks: [
      { type: 'unlimited_revisions', description: '수정 횟수 무제한' },
      { type: 'secondary_usage', description: '광고 소재 활용 가능' },
    ],
    status: 'new',
    hasContract: true,
    contract: {
      summary: 'Samsung Galaxy 신제품 런칭에 맞춘 제품 리뷰 영상 제작 계약입니다. 상세한 기능 소개와 실사용 리뷰를 요청합니다.',
      deliverables: [
        'YouTube 리뷰 영상 1개 (10-15분)',
        '제품 개봉기 포함',
        '주요 기능 3가지 이상 소개',
        '실제 사용 시나리오 시연',
      ],
      payment: {
        amount: '$8,000',
        method: '계좌이체',
        timing: 'Net 45 (최종 승인 후 45일 이내)',
        riskLevel: 'low',
      },
      timeline: {
        contentDeadline: '제품 출시일 D-3',
        reviewPeriod: '영업일 기준 3일 (빠른 검토)',
        campaignPeriod: '제품 출시일 ~ 3개월',
      },
      usageRights: [
        {
          label: '사용 기간',
          value: '2년',
          riskLevel: 'low',
        },
        {
          label: '2차 활용',
          value: '광고 소재 활용 가능 (TV, 디지털)',
          riskLevel: 'high',
          warning: 'TV 광고 포함 시 추가 비용 협상이 필요합니다.',
        },
        {
          label: '수정 권한',
          value: '무제한 수정 요청 가능',
          riskLevel: 'high',
          warning: '수정 횟수 제한이 없어 과도한 수정 요청이 있을 수 있습니다.',
        },
      ],
      restrictions: [
        '타사 스마트폰 제품 비교 언급 금지',
        '출시 전 정보 유출 금지 (NDA)',
        '지정된 출시일까지 비공개 유지',
      ],
      aiNotes: [
        '💰 $8,000은 적정 금액이나, 광고 소재 활용권 포함 시 $10,000+ 협상을 권장합니다.',
        '🚨 수정 횟수 무제한은 리스크입니다. 최대 3회로 제한 협상하세요.',
        '⚠️ TV 광고 활용 시 별도 비용 협상이 필요합니다.',
        '✅ 2년 사용 기간은 적정 수준입니다.',
      ],
    },
    hasGuidelines: true,
    guidelines: [
      {
        category: '영상 구성',
        requirements: [
          '제품 개봉기로 시작',
          '주요 기능 3가지 이상 소개',
          '실제 사용 시나리오 시연',
          '타사 제품 비교 언급 금지',
        ],
      },
      {
        category: '기술적 요구사항',
        requirements: [
          '4K 해상도 촬영',
          '제품 클로즈업 샷 포함',
          'Galaxy 로고 노출 필수',
        ],
      },
      {
        category: '업로드 일정',
        requirements: [
          '제품 출시일 D-3 업로드',
          '사전 검수 후 수정 반영',
          '고정 댓글에 구매 링크 삽입',
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
          content: '안녕하세요,\n\nSamsung Electronics 모바일 마케팅팀입니다.\n\n곧 출시 예정인 Galaxy 신제품 리뷰 영상 제작을 요청드리고자 연락드립니다.\n\n귀하의 테크 리뷰 콘텐츠가 저희 제품과 잘 맞을 것 같습니다.\n\n관심 있으시면 상세 내용 공유드리겠습니다.\n\n감사합니다.',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
        {
          id: 's2',
          sender: 'creator',
          senderName: 'Me',
          content: '안녕하세요,\n\n제안 감사합니다! 상세 내용과 조건 공유 부탁드립니다.',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        },
        {
          id: 's3',
          sender: 'brand',
          senderName: 'Samsung Mobile',
          content: '빠른 회신 감사합니다!\n\n[캠페인 개요]\n- 제품: Galaxy S24 Ultra\n- 컨텐츠: YouTube 리뷰 영상 (10-15분)\n- 금액: $8,000\n- 일정: 제품 출시 D-3 업로드\n\n상세 계약서와 가이드라인 첨부드립니다.\n검토 후 질문 있으시면 말씀해 주세요.',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          hasAttachment: true,
          attachmentType: 'contract',
          attachmentName: 'Samsung_Creator_Contract.pdf',
        },
        {
          id: 's4',
          sender: 'brand',
          senderName: 'Samsung Mobile',
          content: '추가로 가이드라인 문서도 첨부드립니다.',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 5 * 60 * 1000),
          hasAttachment: true,
          attachmentType: 'file',
          attachmentName: 'Galaxy_S24_Review_Guidelines.pdf',
        },
      ],
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
