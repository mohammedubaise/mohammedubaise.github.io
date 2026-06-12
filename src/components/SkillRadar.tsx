import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Axis {
  label: string;
  value: number; // out of 100
  detail: string;
  color: string;
}

const radarAxes: Axis[] = [
  {
    label: "Flutter & Dart",
    value: 98,
    detail: "Advanced Widget Trees, Custom Painters, Isolates, Platform Channels, ScreenUtil & Material 3 integration.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    label: "State Management",
    value: 95,
    detail: "Production BLoC & Provider architectures, stream optimization, reactivity, event-driven state triggers.",
    color: "from-purple-500 to-pink-500",
  },
  {
    label: "Architecture",
    value: 92,
    detail: "Clean Architecture, Layered Folders, Repository Pattern, Dependency Injection (GetIt), MVC structures.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    label: "API / WebSockets",
    value: 90,
    detail: "Complex RESTful contracts, live duplex WebSockets streams, offline-resilient local caching, data serializers.",
    color: "from-cyan-400 to-teal-400",
  },
  {
    label: "Cloud & SDKs",
    value: 88,
    detail: "Firebase Firestore, Authentication, Stripe Connect subscriptions, ZegoCloud VoIP, Razorpay/PhonePe API.",
    color: "from-orange-500 to-amber-400",
  },
  {
    label: "Deploy / Lifecycle",
    value: 85,
    detail: "Google Play Console, App Store Connect, automated CI/CD tracks, provisioning profiles, store publishing pipeline.",
    color: "from-emerald-400 to-teal-500",
  },
];

export default function SkillRadar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Geometry Constants
  const size = 320;
  const center = size / 2;
  const radius = size * 0.4; // 128 max radius

  // Calculate coordinates for a given axis index, value (0-100) and maxRadius
  const getCoordinates = (index: number, val: number, maxRad = radius) => {
    const angle = (Math.PI * 2 / radarAxes.length) * index - Math.PI / 2;
    const distance = (val / 100) * maxRad;
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance,
    };
  };

  // Outer concentric polygons (Grid Lines)
  const gridLevels = [25, 50, 75, 100];
  const gridPaths = gridLevels.map((level) => {
    return radarAxes
      .map((_, i) => {
        const { x, y } = getCoordinates(i, level);
        return `${x},${y}`;
      })
      .join(" ");
  });

  // Main skill profile polygon path
  const skillPoints = radarAxes.map((axis, i) => {
    const { x, y } = getCoordinates(i, axis.value);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 bg-zinc-900/50 dark:bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group">
      {/* Background soft glow patterns */}
      <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-cyan-500/5 blur-[50px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full bg-violet-500/5 blur-[50px] pointer-events-none" />

      {/* SVG Axis chart */}
      <div className="relative w-[320px] h-[320px] shrink-0" id="radar-chart">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full select-none">
          {/* Radial Axis Grids */}
          {gridPaths.map((pathStr, i) => (
            <polygon
              key={i}
              points={pathStr}
              fill="none"
              className="stroke-zinc-800"
              strokeWidth="1"
              strokeDasharray={i === 3 ? "0" : "4 4"}
            />
          ))}

          {/* Concentric Grid levels */}

          {/* Radial axis skeleton lines */}
          {radarAxes.map((_, i) => {
            const outerPoint = getCoordinates(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={outerPoint.x}
                y2={outerPoint.y}
                className="stroke-zinc-800/60"
                strokeWidth="1"
              />
            );
          })}

          {/* Main filled Skill polygon with premium gradients */}
          <defs>
            <radialGradient id="poly-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.15)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.3)" />
            </radialGradient>
          </defs>

          {/* Animated Area and Stroke */}
          <polygon
            points={skillPoints}
            fill="url(#poly-grad)"
            className="stroke-violet-500 transition-all duration-300 pointer-events-none"
            strokeWidth="2"
          />

          {/* Visual indicators for currently selected element */}
          {hoveredIndex !== null && (
            <polygon
              points={gridPaths[3]}
              fill="none"
              className="stroke-cyan-500/10"
              strokeWidth="1.5"
            />
          )}

          {/* Interactive node dots on the outer periphery */}
          {radarAxes.map((axis, i) => {
            const { x, y } = getCoordinates(i, axis.value);
            const isHovered = hoveredIndex === i;
            return (
              <g key={i} className="cursor-pointer">
                {/* Large transparent hover target area */}
                <circle
                  cx={x}
                  cy={y}
                  r="16"
                  fill="transparent"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                {/* Visual core node dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? "6" : "4"}
                  className={`transition-all duration-200 ${
                    isHovered
                      ? "fill-cyan-400 stroke-cyan-200 shadow-lg shadow-cyan-500/50"
                      : "fill-violet-400 stroke-zinc-950"
                  }`}
                  strokeWidth="1.5"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            );
          })}

          {/* Core center dot */}
          <circle cx={center} cy={center} r="3" className="fill-zinc-700" />

          {/* Axis Labels */}
          {radarAxes.map((axis, i) => {
            const labelDist = radius + 22; // push labels further out
            const angle = (Math.PI * 2 / radarAxes.length) * i - Math.PI / 2;
            const lx = center + Math.cos(angle) * labelDist;
            const ly = center + Math.sin(angle) * labelDist;

            // Align text anchor to avoid clipping
            let textAnchor = "middle";
            if (Math.cos(angle) > 0.2) textAnchor = "start";
            if (Math.cos(angle) < -0.2) textAnchor = "end";

            const isHovered = hoveredIndex === i;

            return (
              <text
                key={i}
                x={lx}
                y={ly + 4}
                textAnchor={textAnchor}
                className={`text-[10px] sm:text-[11px] font-mono tracking-tighter cursor-pointer transition-all duration-200 ${
                  isHovered ? "fill-cyan-400 font-bold" : "fill-zinc-400"
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {axis.label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Detail description card */}
      <div className="flex-1 w-full flex flex-col justify-center min-h-[160px] md:pl-4 border-t md:border-t-0 md:border-l border-zinc-800/80 pt-6 md:pt-0 md:h-[220px]">
        <AnimatePresence mode="wait">
          {hoveredIndex === null ? (
            <motion.div
              key="default"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-2"
            >
              <div className="text-zinc-500 text-xs font-mono tracking-wider uppercase">
                Interactive Skill Matrix
              </div>
              <h3 className="text-xl font-sans font-semibold text-white tracking-tight">
                Engineering Spectrum
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
                Mohammed Ubaise has 2+ years of hands-on experience designing, developing, and deploying scalable mobile applications using Flutter & Dart.
              </p>
              <p className="text-xs text-cyan-400/80 font-mono mt-2 animate-pulse">
                ✦ Hover over the chart vertices to drill down.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={hoveredIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-2"
            >
              <h3 className="text-xl font-sans font-semibold text-white tracking-tight">
                {radarAxes[hoveredIndex].label}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
                {radarAxes[hoveredIndex].detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
