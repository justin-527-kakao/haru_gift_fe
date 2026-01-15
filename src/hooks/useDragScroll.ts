// src/hooks/useDragScroll.ts
import { useRef, useEffect, useCallback } from 'react';

export const useDragScroll = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velX = useRef(0);
  const momentumID = useRef<number | null>(null);

  // 관성 스크롤 (momentum)
  const momentum = useCallback(() => {
    if (!ref.current) return;

    ref.current.scrollLeft += velX.current;
    velX.current *= 0.95; // 감속

    if (Math.abs(velX.current) > 0.5) {
      momentumID.current = requestAnimationFrame(momentum);
    }
  }, []);

  const stopMomentum = useCallback(() => {
    if (momentumID.current) {
      cancelAnimationFrame(momentumID.current);
      momentumID.current = null;
    }
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    stopMomentum();
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = ref.current.scrollLeft;
    velX.current = 0;
    ref.current.style.cursor = 'grabbing';
    ref.current.style.scrollBehavior = 'auto';
  }, [stopMomentum]);

  const handleMouseUp = useCallback(() => {
    if (!ref.current) return;
    isDragging.current = false;
    ref.current.style.cursor = 'grab';

    // 관성 스크롤 시작
    if (Math.abs(velX.current) > 1) {
      momentumID.current = requestAnimationFrame(momentum);
    }
  }, [momentum]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !ref.current) return;
    e.preventDefault();

    const x = e.pageX;
    const walk = x - startX.current;

    // 속도 계산 (관성용)
    velX.current = (scrollLeft.current - walk) - ref.current.scrollLeft;

    ref.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current && ref.current) {
      isDragging.current = false;
      ref.current.style.cursor = 'grab';

      // 관성 스크롤 시작
      if (Math.abs(velX.current) > 1) {
        momentumID.current = requestAnimationFrame(momentum);
      }
    }
  }, [momentum]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.style.cursor = 'grab';

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      stopMomentum();
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseDown, handleMouseUp, handleMouseMove, handleMouseLeave, stopMomentum]);

  return ref;
};
