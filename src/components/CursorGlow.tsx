import { useEffect, useState, useRef } from 'react';

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const pendingRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports hover (not touch)
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      pendingRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (pendingRef.current.x - prev.x) * 0.15,
        y: prev.y + (pendingRef.current.y - prev.y) * 0.15,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <div
      className="fixed pointer-events-none z-[100] transition-opacity duration-300"
      style={{
        left: position.x - 100,
        top: position.y - 100,
        width: 200,
        height: 200,
        opacity: isVisible ? 1 : 0,
        background:
          'radial-gradient(circle, rgba(212,168,83,0.08) 0%, rgba(78,205,196,0.04) 40%, transparent 70%)',
        willChange: 'transform',
        transform: 'translate3d(0,0,0)',
      }}
    />
  );
}
