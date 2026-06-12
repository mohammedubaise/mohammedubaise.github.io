import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingTexts = [
  "Initializing Dart VM...",
  "Mounting Flutter elements...",
  "Deploying BLoC state mechanisms...",
  "Connecting WebSocket sockets...",
  "Integrating Material 3 tokens...",
  "Loading portfolio assets...",
  "Stabilizing hot reload engine...",
  "Mohammed Ubaise is online.",
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Progress increment interval
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Count up faster or slower in steps
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Cycle text based on progress thresholds
    const textStep = Math.floor(100 / loadingTexts.length);
    const index = Math.min(
      loadingTexts.length - 1,
      Math.floor(progress / textStep)
    );
    setTextIndex(index);

    if (progress === 100) {
      const timeout = setTimeout(() => {
        setShouldRender(false);
        onCompleteRef.current();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-zinc-950 font-sans select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Central content */}
          <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
            {/* Pulsing glow background */}
            <div className="absolute w-56 h-56 rounded-full bg-violet-600/10 blur-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* Circular progress loader */}
            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
              {/* Outer ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  className="stroke-zinc-800"
                  strokeWidth="2.5"
                  fill="none"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="40"
                  className="stroke-cyan-400"
                  strokeWidth="3.5"
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * progress) / 100}
                  strokeLinecap="round"
                />
              </svg>
              {/* Number display */}
              <div className="text-2xl font-mono font-medium text-white tracking-tighter">
                {progress}%
              </div>
            </div>

            {/* Title / Name */}
            <motion.h1
              className="text-lg font-semibold text-white tracking-widest uppercase mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Mohammed Ubaise
            </motion.h1>

            <motion.p
              className="text-xs text-cyan-400 tracking-widest font-mono uppercase mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Flutter Developer
            </motion.p>

            {/* Loading text with transition key */}
            <div className="h-6 overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={textIndex}
                  className="inline-block text-zinc-500 font-mono text-xs"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {loadingTexts[textIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Full-width bottom progress line as visual anchor */}
          <div className="absolute bottom-0 left-0 h-1 bg-zinc-900 w-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
