import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 32, stiffness: 280, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on mobile/tablet or touch devices
    const checkDevice = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(hasTouch || window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    // Listen for hover interactions
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== "function") {
        setIsHovering(false);
        return;
      }
      
      const hasHoverTarget = 
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".hover-link") ||
        target.closest("[role='button']") ||
        (target.style && target.style.cursor === "pointer");

      if (hasHoverTarget) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", moveCursor, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeaveWindow);
      document.addEventListener("mouseenter", handleMouseEnterWindow);
      window.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      window.removeEventListener("resize", checkDevice);
      if (!isMobile) {
        window.removeEventListener("mousemove", moveCursor);
        document.removeEventListener("mouseleave", handleMouseLeaveWindow);
        document.removeEventListener("mouseenter", handleMouseEnterWindow);
        window.removeEventListener("mouseover", handleMouseOver);
      }
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer interactive ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-violet-500/40 flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering ? "rgba(34, 211, 238, 0.8)" : "rgba(139, 92, 246, 0.4)",
          backgroundColor: isHovering ? "rgba(34, 211, 238, 0.05)" : "transparent",
          boxShadow: isHovering ? "0 0 15px rgba(34, 211, 238, 0.2)" : "none",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
      >
        {/* Futuristic target reticle corners (aiming indicators for 2026 tech design) */}
        {isHovering && (
          <div className="absolute inset-0 rounded-full animate-spin-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-cyan-400" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-cyan-400" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-2 bg-cyan-400" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-2 bg-cyan-400" />
          </div>
        )}
      </motion.div>

      {/* Inner glowing pointer dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: isHovering ? "#a78bfa" : "#22d3ee",
          boxShadow: isHovering 
            ? "0 0 12px #a78bfa, 0 0 4px #a78bfa" 
            : "0 0 10px #22d3ee, 0 0 3px #22d3ee",
          scale: isHovering ? 1.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </>
  );
}
