// // src/pages/ChatEditPage.tsx
// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Send, Star, MapPin } from 'lucide-react';
// import type { Place } from '../types';

// const ChatEditPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPlace = location.state?.place as Place; // 이전 페이지에서 넘겨받은 장소

//   const [input, setInput] = useState('');
//   const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai'; text?: string; cards?: any[] }[]>([
//     { type: 'ai', text: `${currentPlace?.category} 장소가 마음에 안 드시나요? 원하시는 분위기나 메뉴를 말씀해주세요!` }
//   ]);
//   const [isTyping, setIsTyping] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // 스크롤 자동 이동
//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chatHistory, isTyping]);

//   const handleSend = () => {
//     if (!input.trim()) return;

//     // 1. 유저 메시지 추가
//     setChatHistory(prev => [...prev, { type: 'user', text: input }]);
//     setInput('');
//     setIsTyping(true);

//     // 2. AI 응답 (더미 데이터)
//     setTimeout(() => {
//       setIsTyping(false);
//       setChatHistory(prev => [
//         ...prev,
//         { 
//           type: 'ai', 
//           text: `"${input}" 의견을 반영해서 새로운 곳을 찾아봤어요. 여긴 어때요?`,
//           cards: [
//             {
//               id: 'new_1',
//               name: '도취하녹식당',
//               desc: '고즈넉한 한옥에서 즐기는 정갈한 한정식',
//               img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=400&auto=format&fit=crop',
//               tags: ['분위기깡패', '데이트']
//             },
//             {
//               id: 'new_2',
//               name: '서촌 계단집',
//               desc: '신선한 해산물이 가득한 찐맛집',
//               img: 'https://images.unsplash.com/photo-1621857007652-32f5059d044f?q=80&w=400&auto=format&fit=crop',
//               tags: ['웨이팅필수', '소주도둑']
//             }
//           ]
//         }
//       ]);
//     }, 1500);
//   };

//   const goToDetail = (newPlace: any) => {
//     // 상세 페이지로 이동 (현재 수정 중인 원본 장소 ID도 같이 넘김)
//     navigate('/place-detail', { 
//       state: { 
//         originalPlaceId: currentPlace.id, // 이걸 알아야 나중에 교체함
//         newPlaceData: newPlace 
//       } 
//     });
//   };

//   if (!currentPlace) return <div>잘못된 접근입니다.</div>;

//   return (
//     <div className="flex flex-col h-full bg-white relative">
//       {/* 1. 상단 헤더 & 현재 장소 정보 */}
//       <div className="bg-white border-b border-gray-100 z-10">
//         <div className="h-14 flex items-center px-4">
//           <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>
//           <span className="font-bold text-lg ml-2">변경하기</span>
//         </div>
        
//         {/* 현재 장소 요약 카드 */}
//         <div className="px-4 pb-4">
//           <div className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
//             <img src={currentPlace.imageUrl} className="w-16 h-16 rounded-lg object-cover" />
//             <div>
//               <span className="text-xs text-gray-500 font-bold">{currentPlace.category}</span>
//               <h3 className="font-bold text-gray-800">{currentPlace.name}</h3>
//               <p className="text-xs text-gray-400 mt-1 line-clamp-1">{currentPlace.intro}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. 채팅 영역 */}
//       <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4 pb-20">
//         {chatHistory.map((msg, idx) => (
//           <div key={idx} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
            
//             {/* 텍스트 말풍선 */}
//             {msg.text && (
//               <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed shadow-sm ${
//                 msg.type === 'user' 
//                   ? 'bg-black text-white rounded-l-xl rounded-tr-xl rounded-br-sm' 
//                   : 'bg-white text-black border border-gray-200 rounded-r-xl rounded-tl-xl rounded-bl-sm'
//               }`}>
//                 {msg.text}
//               </div>
//             )}

//             {/* 추천 장소 카드 (AI만) */}
//             {msg.cards && (
//               <div className="flex gap-3 mt-3 overflow-x-auto w-full pb-2 px-1 snap-x">
//                 {msg.cards.map((card: any) => (
//                   <div 
//                     key={card.id} 
//                     onClick={() => goToDetail(card)}
//                     className="min-w-[200px] bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 cursor-pointer active:scale-95 transition-transform snap-center"
//                   >
//                     <div className="h-28 bg-gray-200 relative">
//                       <img src={card.img} className="w-full h-full object-cover" />
//                       <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full">
//                         추천
//                       </div>
//                     </div>
//                     <div className="p-3">
//                       <h4 className="font-bold text-sm mb-1">{card.name}</h4>
//                       <p className="text-xs text-gray-500 line-clamp-1 mb-2">{card.desc}</p>
//                       <div className="flex gap-1">
//                         {card.tags.map((t: string) => (
//                           <span key={t} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">#{t}</span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}

//         {isTyping && (
//           <div className="flex items-center gap-1 ml-2">
//             <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
//             <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></span>
//             <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></span>
//           </div>
//         )}
//         <div ref={scrollRef} />
//       </div>

//       {/* 3. 하단 입력창 */}
//       <div className="absolute bottom-0 w-full bg-white p-3 border-t border-gray-100">
//         <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
//           <input
//             type="text"
//             className="flex-1 bg-transparent outline-none text-sm p-1"
//             placeholder="바꾸고 싶은 조건을 입력하세요"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//           />
//           <button 
//             onClick={handleSend}
//             className={`p-2 rounded-full ${input.trim() ? 'bg-black text-white' : 'bg-gray-300 text-gray-500'}`}
//           >
//             <Send size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatEditPage;
// src/pages/ChatEditPage.tsx
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import type { Place } from '../types';
import { useItinerary, type ChatSessionMsg } from '../context/ItineraryContext';
import DragScrollContainer from '../components/DragScrollContainer';

const ChatEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { chatSessions, saveChatSession } = useItinerary(); // Context 사용
  
  const currentPlace = location.state?.place as Place;
  const scrollRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // ⭐️ 1. 초기 메시지 로드 (저장된 게 있으면 그거 쓰고, 없으면 기본 인사말)
  const [chatHistory, setChatHistory] = useState<ChatSessionMsg[]>(() => {
    if (currentPlace && chatSessions[currentPlace.id]) {
      return chatSessions[currentPlace.id];
    }
    return [{ type: 'ai', text: `${currentPlace?.category} 장소가 마음에 안 드시나요? 원하시는 분위기나 메뉴를 말씀해주세요!` }];
  });

  // ⭐️ 2. 채팅 내역이 변할 때마다 Context에 자동 저장
  useEffect(() => {
    if (currentPlace) {
      saveChatSession(currentPlace.id, chatHistory);
    }
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, currentPlace]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return; // 로딩 중이면 막음

    // 유저 메시지 추가
    setChatHistory(prev => [...prev, { type: 'user', text: input }]);
    const userInput = input; // 클로저 문제 방지용 복사
    setInput('');
    setIsTyping(true);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      setIsTyping(false);
      
      // 더미 카드 생성 로직 (입력값에 따라 살짝 다르게 주면 더 리얼함)
      setChatHistory(prev => [
        ...prev,
        { 
          type: 'ai', 
          text: `"${userInput}" 의견을 반영해서 새로운 곳을 찾아봤어요.`,
          cards: [
            {
              id: `new_${Date.now()}_1`,
              name: '추천 장소 A',
              desc: '요청하신 분위기에 딱 맞는 곳',
              img: 'https://source.unsplash.com/random/400x300/?restaurant',
              tags: ['추천', '핫플']
            },
            {
              id: `new_${Date.now()}_2`,
              name: '추천 장소 B',
              desc: '리뷰가 증명하는 찐맛집',
              img: 'https://source.unsplash.com/random/400x300/?cafe',
              tags: ['조용함', '감성']
            }
          ]
        }
      ]);
    }, 1500);
  };

  // ⭐️ 3. 한글 두 번 입력 방지 (isComposing)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return; // 조합 중이면 무시
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const goToDetail = (newPlace: any) => {
    navigate('/place-detail', { 
      state: { 
        originalPlaceId: currentPlace.id,
        newPlaceData: newPlace 
      } 
    });
  };

  if (!currentPlace) return <div>잘못된 접근입니다.</div>;

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* 헤더 생략 (기존과 동일) */}
      <div className="bg-white border-b border-gray-100 z-10">
         <div className="h-14 flex items-center px-4">
          <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>
          <span className="font-bold text-lg ml-2">변경하기</span>
        </div>
        {/* 장소 카드 UI (기존 동일) */}
         <div className="px-4 pb-4">
          <div className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <img src={currentPlace.imageUrl} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <span className="text-xs text-gray-500 font-bold">{currentPlace.category}</span>
              <h3 className="font-bold text-gray-800">{currentPlace.name}</h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-1">{currentPlace.intro}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 채팅 영역 */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4 pb-20">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
            {msg.text && (
              <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.type === 'user' 
                  ? 'bg-black text-white rounded-l-xl rounded-tr-xl rounded-br-sm' 
                  : 'bg-white text-black border border-gray-200 rounded-r-xl rounded-tl-xl rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
            )}
            {/* 카드 렌더링 부분 (드래그 스크롤) */}
            {msg.cards && (
              <DragScrollContainer className="flex gap-3 mt-3 overflow-x-auto w-full pb-2 px-1 snap-x scrollbar-hide">
                {msg.cards.map((card: any) => (
                  <div
                    key={card.id}
                    onClick={() => goToDetail(card)}
                    className="min-w-[200px] bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 cursor-pointer active:scale-95 transition-transform snap-center"
                  >
                    <div className="h-28 bg-gray-200 relative">
                      <img src={card.img} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full">추천</div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-sm mb-1">{card.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-1 mb-2">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </DragScrollContainer>
            )}
          </div>
        ))}
        {isTyping && (
           <div className="flex items-center gap-1 ml-2">
             <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
             <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></span>
             <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></span>
           </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* 입력창 */}
      <div className="absolute bottom-0 w-full bg-white p-3 border-t border-gray-100">
        <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-sm p-1"
            placeholder={isTyping ? "AI가 답변 중입니다..." : "바꾸고 싶은 조건을 입력하세요"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping} // ⭐️ 로딩 중 입력 비활성화
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`p-2 rounded-full transition-colors ${
              input.trim() && !isTyping ? 'bg-black text-white' : 'bg-gray-300 text-gray-500'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatEditPage;