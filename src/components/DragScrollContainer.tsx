// src/components/DragScrollContainer.tsx
import { useRef, type ReactNode, type MouseEvent } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const DragScrollContainer = ({ children, className = '' }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velX = useRef(0);
  const animationId = useRef<number | null>(null);

  const momentum = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft += velX.current;
    velX.current *= 0.95;
    if (Math.abs(velX.current) > 0.5) {
      animationId.current = requestAnimationFrame(momentum);
    }
  };

  const stopMomentum = () => {
    if (animationId.current) {
      cancelAnimationFrame(animationId.current);
      animationId.current = null;
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!containerRef.current) return;
    stopMomentum();
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = containerRef.current.scrollLeft;
    velX.current = 0;
    containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    if (!containerRef.current) return;
    isDragging.current = false;
    containerRef.current.style.cursor = 'grab';
    if (Math.abs(velX.current) > 1) {
      animationId.current = requestAnimationFrame(momentum);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = x - startX.current;
    velX.current = (scrollLeft.current - walk) - containerRef.current.scrollLeft;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging.current && containerRef.current) {
      isDragging.current = false;
      containerRef.current.style.cursor = 'grab';
      if (Math.abs(velX.current) > 1) {
        animationId.current = requestAnimationFrame(momentum);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`cursor-grab select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default DragScrollContainer;
