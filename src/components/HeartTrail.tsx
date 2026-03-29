import { useEffect, useRef, useCallback } from "react";

const HeartTrail = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<HTMLSpanElement[]>([]);
  const maxHearts = 20;

  const createHeart = useCallback((x: number, y: number) => {
    const container = containerRef.current;
    if (!container) return;

    const heart = document.createElement("span");
    const size = 12 + Math.random() * 18;
    const colors = ["hsl(340,65%,65%)", "hsl(280,40%,75%)", "hsl(20,80%,80%)", "hsl(340,60%,50%)"];
    heart.textContent = "❤";
    heart.style.cssText = `
      position: fixed; left: ${x - size / 2}px; top: ${y - size / 2}px;
      font-size: ${size}px; color: ${colors[Math.floor(Math.random() * colors.length)]};
      pointer-events: none; z-index: 9999;
      transition: all 1s ease-out; opacity: 1;
    `;
    container.appendChild(heart);
    heartsRef.current.push(heart);

    requestAnimationFrame(() => {
      heart.style.opacity = "0";
      heart.style.transform = `translateY(-${30 + Math.random() * 40}px) scale(0.3) rotate(${Math.random() * 60 - 30}deg)`;
    });

    setTimeout(() => {
      heart.remove();
      heartsRef.current = heartsRef.current.filter((h) => h !== heart);
    }, 1000);

    if (heartsRef.current.length > maxHearts) {
      const oldest = heartsRef.current.shift();
      oldest?.remove();
    }
  }, []);

  useEffect(() => {
    let throttle = false;
    const handler = (e: MouseEvent) => {
      if (throttle) return;
      throttle = true;
      setTimeout(() => (throttle = false), 50);
      createHeart(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [createHeart]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50" />;
};

export default HeartTrail;
