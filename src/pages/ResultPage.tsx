// src/pages/ResultPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItinerary } from '../context/ItineraryContext';
import { useDragScroll } from '../hooks/useDragScroll';
import { X, Star, Calendar, RefreshCw, MapPin } from 'lucide-react';

const ResultPage = () => {
  const navigate = useNavigate();
  const { itinerary, letter, setLetter } = useItinerary();

  // 드래그 스크롤 refs
  const cardScrollRef = useDragScroll<HTMLDivElement>();
  const mapCardScrollRef = useDragScroll<HTMLDivElement>();

  // 뷰 모드: 'cards' (기본 두 카드) vs 'map' (지도 + 장소 리스트)
  const [viewMode, setViewMode] = useState<'cards' | 'map'>('cards');

  // 편지 초기값 설정 (itinerary의 finalLetter가 있고 letter가 비어있으면)
  useEffect(() => {
    if (itinerary?.finalLetter && !letter) {
      setLetter(itinerary.finalLetter);
    }
  }, [itinerary?.finalLetter]);

  // 현재 선택된 장소 인덱스 (지도 뷰에서)
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(0);

  if (!itinerary) return <div className="p-10 text-center">데이터가 없습니다 :(</div>;

  // 코스 카드 클릭 → 지도 뷰로 전환
  const handleCourseCardClick = () => {
    setViewMode('map');
  };

  // 지도 뷰에서 뒤로가기 → 카드 뷰로
  const handleBackToCards = () => {
    setViewMode('cards');
  };

  return (
    <div className="flex flex-col h-full bg-white relative">

      {/* 헤더 */}
      <div className="h-14 flex items-center justify-center px-4 border-b border-gray-100 bg-white sticky top-0 z-20 relative">
        <button
          onClick={() => viewMode === 'map' ? handleBackToCards() : navigate('/')}
          className="absolute left-4 p-1"
        >
          <X className="w-6 h-6 text-black" />
        </button>
        <span className="font-bold text-lg">하루선물</span>
      </div>

      {/* ========== 기본 뷰: 두 개의 카드 ========== */}
      {viewMode === 'cards' && (
        <div className="flex-1 flex flex-col">

          {/* 카드 컨테이너 - 가로 스크롤 (스크롤바 숨김, 드래그 가능) */}
          <div
            ref={cardScrollRef}
            className="flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide cursor-grab flex items-center"
          >
            <div className="flex px-4 gap-4" style={{ width: 'max-content' }}>

              {/* 1. 코스 카드 */}
              <div
                onClick={handleCourseCardClick}
                className="w-[80vw] max-w-[340px] h-[50vh] bg-gray-100 rounded-2xl overflow-hidden relative cursor-pointer snap-center flex-shrink-0 shadow-lg active:scale-[0.98] transition-transform"
              >
                {/* 배경 이미지 */}
                <img
                  src={itinerary.places[0]?.imageUrl || 'https://images.unsplash.com/photo-1583307687252-4013d6a99284?q=80&w=800'}
                  alt="course"
                  className="w-full h-full object-cover"
                />

                {/* 하단 그라데이션 + 텍스트 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  {/* 진행 바 */}
                  <div className="w-12 h-1 bg-red-500 rounded-full mb-4" />

                  <h2 className="text-white text-xl font-bold leading-tight mb-2">
                    {itinerary.theme || '특별한 날'}의<br/>
                    조용한 {itinerary.places[0]?.location?.split(' ')[0] || '서촌'} 나들이
                  </h2>
                  <p className="text-white/80 text-sm leading-relaxed">
                    함께여서 더 의미 있는,<br/>
                    낭만이고 소박한 {itinerary.targetName}과의 하루
                  </p>
                </div>
              </div>

              {/* 2. 편지 카드 */}
              <div className="w-[80vw] max-w-[340px] h-[50vh] bg-gray-50 rounded-2xl p-6 snap-center flex-shrink-0 shadow-lg flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {itinerary.targetName}에게
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  소중한 하루에 대한 설명과 마음이 담긴 편지를 작성해보세요
                </p>

                {/* 편지 입력 영역 */}
                <textarea
                  value={letter}
                  onChange={(e) => setLetter(e.target.value)}
                  placeholder="여기에 마음을 담아 편지를 써보세요..."
                  className="flex-1 w-full bg-white border border-gray-200 rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300 leading-relaxed"
                />
              </div>

            </div>
          </div>

          {/* 하단 버튼 영역 */}
          <div className="p-4 pb-8 flex gap-3 border-t border-gray-100">
            <button
              onClick={() => alert('저장되었습니다!')}
              className="flex-1 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl text-base hover:bg-gray-200 transition-colors"
            >
              저장하기
            </button>
            <button
              onClick={() => alert('선물하기 기능은 준비중입니다!')}
              className="flex-1 py-4 bg-kakao-yellow text-black font-bold rounded-xl text-base hover:bg-yellow-400 transition-colors"
            >
              선물하기
            </button>
          </div>
        </div>
      )}

      {/* ========== 지도 뷰: 지도 + 하단 카드 (floating) ========== */}
      {viewMode === 'map' && (
        <div className="flex-1 relative">

          {/* 지도 영역 (더미) - 전체 화면 */}
          <div className="absolute inset-0 bg-gray-200 overflow-hidden">
            {/* 실제 지도 대신 더미 이미지 */}
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop"
              alt="map placeholder"
              className="w-full h-full object-cover opacity-30"
            />

            {/* 지도 위 마커들 (더미 위치) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                {itinerary.places.map((place, idx) => {
                  // 마커 위치 (더미로 원형 배치)
                  const angle = (idx / itinerary.places.length) * 2 * Math.PI - Math.PI / 2;
                  const radius = 80;
                  const x = 50 + Math.cos(angle) * radius / 2;
                  const y = 50 + Math.sin(angle) * radius / 2;

                  return (
                    <div
                      key={place.id}
                      onClick={() => setSelectedPlaceIndex(idx)}
                      className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-all ${
                        selectedPlaceIndex === idx
                          ? 'bg-blue-500 text-white scale-125 shadow-lg'
                          : 'bg-white text-blue-500 border-2 border-blue-500 shadow-md'
                      }`}
                      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      {idx + 1}
                    </div>
                  );
                })}

                {/* 경로선 (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                  {itinerary.places.map((_, idx) => {
                    if (idx === itinerary.places.length - 1) return null;

                    const angle1 = (idx / itinerary.places.length) * 2 * Math.PI - Math.PI / 2;
                    const angle2 = ((idx + 1) / itinerary.places.length) * 2 * Math.PI - Math.PI / 2;
                    const radius = 80;

                    const x1 = 128 + Math.cos(angle1) * radius;
                    const y1 = 128 + Math.sin(angle1) * radius;
                    const x2 = 128 + Math.cos(angle2) * radius;
                    const y2 = 128 + Math.sin(angle2) * radius;

                    return (
                      <line
                        key={idx}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#8B5CF6"
                        strokeWidth="3"
                        strokeDasharray="8,4"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* 지도 안내 텍스트 */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} className="text-blue-500" />
                <span>장소를 탭해서 상세 정보를 확인하세요</span>
              </div>
            </div>
          </div>

          {/* 하단 장소 카드 - 횡스크롤 (floating) */}
          <div className="absolute bottom-4 left-0 right-0 px-2 z-10">
            <div
              ref={mapCardScrollRef}
              className="overflow-x-auto snap-x snap-mandatory scrollbar-hide cursor-grab py-2"
            >
              <div className="flex gap-3 px-2" style={{ width: 'max-content' }}>
                {itinerary.places.map((place, index) => (
                  <div
                    key={place.id}
                    onClick={() => setSelectedPlaceIndex(index)}
                    className={`w-[280px] bg-white rounded-xl p-3 snap-center flex-shrink-0 transition-all cursor-pointer shadow-xl ${
                      selectedPlaceIndex === index
                        ? 'ring-2 ring-blue-500'
                        : 'border border-gray-100'
                    }`}
                  >
                    {/* 카드 상단: 번호 + 이름 + 카테고리 */}
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-md flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <h4 className="font-bold text-gray-900 truncate text-sm">{place.name}</h4>
                          <span className="text-[10px] text-gray-400 flex-shrink-0">{place.category}</span>
                        </div>

                        {/* 별점 + 리뷰 */}
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-red-500 font-bold text-xs">{place.rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={10}
                                className={i < Math.floor(place.rating) ? 'text-red-500 fill-red-500' : 'text-gray-200'}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400">리뷰 {place.reviewCount}</span>
                        </div>
                      </div>
                    </div>

                    {/* 주소 + 상태 */}
                    <div className="text-[10px] text-gray-500 mb-2 truncate">
                      {place.location} · <span className="text-green-500">영업중</span>
                    </div>

                    {/* 버튼 그룹 */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('예약 기능은 준비중입니다!');
                        }}
                        className="flex-1 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 flex justify-center items-center gap-1 transition-colors"
                      >
                        <Calendar size={14} className="text-gray-400" />
                        예약
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/chat-edit', { state: { place } });
                        }}
                        className="flex-1 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 flex justify-center items-center gap-1 transition-colors"
                      >
                        <RefreshCw size={14} className="text-gray-400" />
                        변경
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ResultPage;
