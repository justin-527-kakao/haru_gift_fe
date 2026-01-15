// src/mockData.ts
import type { Place } from './types';

// ✅ 실제 작동하는 Unsplash 고화질 이미지로 교체 완료
export const MOCK_DB: Record<string, Partial<Place>[]> = {
  '식사': [
    { 
      name: '토속촌 삼계탕', 
      intro: '진한 국물의 서울 3대 삼계탕', 
      // 뜨끈한 국물 요리 이미지
      imageUrl: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?q=80&w=400&auto=format&fit=crop', 
      rating: 4.5, 
      location: '서촌' 
    },
    { 
      name: '도취하녹식당', 
      intro: '분위기 좋은 한옥 다이닝', 
      // 한옥 처마가 보이는 감성 이미지
      imageUrl: 'https://images.unsplash.com/photo-1583307687252-4013d6a99284?q=80&w=400&auto=format&fit=crop', 
      rating: 4.8, 
      location: '서촌' 
    },
    { 
      name: '서촌 계단집', 
      intro: '줄서서 먹는 해산물 맛집', 
      // 신선한 해산물/조개구이 느낌
      imageUrl: 'https://images.unsplash.com/photo-1615141982880-19ed7e6656fa?q=80&w=400&auto=format&fit=crop', 
      rating: 4.6, 
      location: '서촌' 
    },
    { 
      name: '칸다소바', 
      intro: '꾸덕한 마제소바의 정석', 
      // 먹음직스러운 면 요리
      imageUrl: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=400&auto=format&fit=crop', 
      rating: 4.4, 
      location: '서촌' 
    },
  ],
  '카페': [
    { 
      name: '스태픽스', 
      intro: '탁 트인 마당이 있는 뷰맛집', 
      // 야외 테라스 카페 느낌
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop', 
      rating: 4.7, 
      location: '서촌' 
    },
    { 
      name: 'mk2', 
      intro: '미니멀한 감성의 핫플', 
      // 깔끔한 화이트톤 카페 내부
      imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=400&auto=format&fit=crop', 
      rating: 4.3, 
      location: '서촌' 
    },
    { 
      name: '아키비스트', 
      intro: '아인슈페너가 기가 막힌 곳', 
      // 크림이 올라가 있는 커피
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400&auto=format&fit=crop', 
      rating: 4.8, 
      location: '서촌' 
    },
  ],
  '문화': [
    { 
      name: '대림미술관', 
      intro: '감각적인 현대 미술 전시', 
      // 미술관 내부/전시품
      imageUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3969105?q=80&w=400&auto=format&fit=crop', 
      rating: 4.6, 
      location: '통의동' 
    },
    { 
      name: '그라운드시소', 
      intro: '인생샷 건지는 미디어 아트', 
      // 화려한 빛/미디어 아트 느낌
      imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop', 
      rating: 4.7, 
      location: '서촌' 
    },
    { 
      name: 'CGV', 
      intro: '영화는 팝콘 맛이지', 
      // 영화관 좌석 또는 팝콘
      imageUrl: 'https://images.unsplash.com/photo-1489599848415-31a647338ad6?q=80&w=400&auto=format&fit=crop', 
      rating: 4.2, 
      location: '대학로' 
    },
  ],
  '숙소': [
    { 
      name: '서촌 영락재', 
      intro: '프라이빗한 독채 한옥 스테이', 
      // 한옥 문살/전통 느낌
      imageUrl: 'https://images.unsplash.com/photo-1593179243227-1830502213a4?q=80&w=400&auto=format&fit=crop', 
      rating: 4.9, 
      location: '누하동' 
    },
    { 
      name: '보안스테이', 
      intro: '갤러리 위에서 하룻밤', 
      // 아늑하고 깔끔한 침실
      imageUrl: 'https://images.unsplash.com/photo-1505691938204-540eb8357ac4?q=80&w=400&auto=format&fit=crop', 
      rating: 4.5, 
      location: '통의동' 
    },
  ]
};

// 랜덤으로 하나 뽑는 함수 (기존 유지)
export const getRandomPlace = (categoryType: string): Partial<Place> => {
  const pool = MOCK_DB[categoryType] || MOCK_DB['식사']; 
  return pool[Math.floor(Math.random() * pool.length)];
};