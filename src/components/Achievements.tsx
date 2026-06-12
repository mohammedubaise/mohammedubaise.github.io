import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Trophy, Send, Terminal, Smartphone, Radio, Settings2, Sparkles } from "lucide-react";
import { AchievementItem } from "../types";

const items: AchievementItem[] = [
  {
    id: "exp",
    exponent: true,
    value: "2",
    label: "Years Experience",
    description: "Architecting, testing, and scaling reactive cross-platform systems.",
  },
  {
    id: "apps",
    exponent: true,
    value: "5",
    label: "Apps Published",
    description: "Production releases active on Google Play Store & Apple App Store.",
  },
  {
    id: "sdks",
    exponent: false,
    value: "12",
    label: "SDK Integrations",
    description: "Seamless hooks into Stripe Connect, Razorpay, ZegoCloud, and Maps.",
  },
  {
    id: "deploy",
    exponent: false,
    value: "100",
    label: "% Deploy Track",
    description: "End-to-end mobile application releases with zero build rejections.",
  },
];

const checklistAchievements = [
  { text: "Real-Time Application Development (WebSockets, Firebase, Firestore, streams)", icon: <Radio className="w-4 h-4 text-cyan-400" /> },
  { text: "End-to-End Mobile Lifecycle Management (Store credentials, provisioning, build signatures)", icon: <Settings2 className="w-4 h-4 text-violet-400" /> },
  { text: "Enterprise Architecture Deployment (Decoupled repositories, abstraction contracts)", icon: <Terminal className="w-4 h-4 text-emerald-400" /> }
];

function AnimatedCounter({ value, start }: { value: string; start: boolean }) {
  const [currentVal, setCurrentVal] = useState(0);
  const target = parseInt(value, 10);

  useEffect(() => {
    if (!start || isNaN(target)) return;

    let startTime: number | null = null;
    const duration = 1200; // ms

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / duration, 1);
      
      // East out formula
      const easeVal = progressPercent === 1 ? 1 : 1 - Math.pow(2, -10 * progressPercent);
      const val = Math.floor(easeVal * target);
      
      setCurrentVal(val);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCurrentVal(target);
      }
    };

    requestAnimationFrame(animate);
  }, [start, target]);

  if (isNaN(target)) {
    return <span>{value}</span>;
  }
  return <span>{currentVal}</span>;
}

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="py-24 relative bg-zinc-950 border-t border-zinc-900/60"
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(99,102,241,0.04),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" />
            Accolades
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Key Achievements & Qualifications
          </h2>
          <div className="h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 w-32 mt-4" />
        </div>

        {/* Big Counter Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              className="bg-zinc-900/40 border border-zinc-850 p-6 sm:p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden group text-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-violet-500/5 blur-[25px] pointer-events-none" />

              {/* Stat number with layout transition */}
              <div className="text-4xl sm:text-5xl font-sans font-extrabold text-white tracking-tighter mb-2">
                <AnimatedCounter value={item.value} start={isInView} />
                {item.exponent && <span className="text-cyan-450 text-3xl font-semibold">+</span>}
              </div>

              {/* Title label */}
              <h3 className="text-sm font-mono tracking-tight text-zinc-300 font-semibold mb-2">
                {item.label}
              </h3>

              {/* Small detail phrase */}
              <p className="text-[11px] sm:text-xs text-zinc-500 leading-normal font-sans font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bulleted Achievements lists with icons */}
        <div className="max-w-3xl mx-auto bg-zinc-900/20 border border-zinc-900 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
          <h3 className="text-xs font-semibold text-zinc-500 font-mono uppercase tracking-widest text-center mb-6 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Core Deployment Competencies
          </h3>

          <div className="flex flex-col gap-4">
            {checklistAchievements.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 text-left p-3.5 rounded-xl border border-zinc-900/40 bg-zinc-950/20">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg shrink-0">
                  {item.icon}
                </div>
                <span className="text-xs sm:text-sm text-zinc-300 font-sans font-semibold">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
