import { motion } from "motion/react";
import { Sparkles, Terminal, ShieldAlert, Cpu, Heart, Database, Layout } from "lucide-react";

const specialities = [
  "Flutter & Dart Frameworks",
  "BLoC & Provider State Management",
  "Biometric & Hardware Authentication",
  "Interactive Rive & Lottie Animations",
  "WebSockets & Real-Time Syncing",
  "Optimized Data Serialization & Isolates",
];

const timelineCards = [
  {
    phase: "Systems & Architecture",
    tagline: "Solid Foundation",
    description: "Designing decoupled, testable systems through Clean Architecture, Repository Patterns, and robust dependency injection structures using GetIt.",
    icon: <Terminal className="w-5 h-5 text-cyan-400" />,
    gradient: "from-blue-600/20 to-cyan-500/10 border-blue-500/30",
  },
  {
    phase: "Security & Optimization",
    tagline: "High Reliability",
    description: "Formulating screenshot/screen-recording guards, DRM lockouts, biometric logins, and multi-threaded data mapping via Dart Isolates.",
    icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
    gradient: "from-rose-600/20 to-amber-500/10 border-rose-500/30",
  },
  {
    phase: "Store Lifecycle",
    tagline: "Continuous Delivery",
    description: "Spearheading Google Play Console and App Store Connect tracks, handling provisioning patterns, testbeds, and production delivery.",
    icon: <Cpu className="w-5 h-5 text-violet-400" />,
    gradient: "from-violet-600/20 to-purple-500/10 border-violet-500/30",
  },
];

export default function AboutMe() {
  return (
    <section
      id="about"
      className="py-24 relative bg-zinc-950 border-t border-zinc-900/60"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Designing Native Excellence
          </h2>
          <div className="h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 w-24 mt-4" />
        </div>

        {/* About Info Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Column A: Primary Bio Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h3 className="text-2xl font-sans font-semibold text-white tracking-tight mb-6">
              I am a Flutter Developer with 2+ years of hands-on experience designing, developing, and deploying scalable mobile applications.
            </h3>
            
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6 font-sans">
              Specialized in high-performance cross-platform rendering for mobile operating systems, I translate complex backend endpoints into modular, offline-resilient UI component models. My development mindset centers on isolating business logic completely from presentation tiers to guarantee clean maintainability and ease of feature extensions.
            </p>

            <span className="text-xs font-semibold text-zinc-500 font-mono uppercase tracking-widest mb-4 block">
              Core Architectural Competencies:
            </span>

            {/* List of competencies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left mb-8">
              {specialities.map((spec, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-zinc-300 font-sans font-medium">
                    {spec}
                  </span>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              With <strong>5+ published production applications</strong> across Google Play Store and Apple App Store, I am well-versed in handling release procedures, managing provisioning profiles, setting up live WebSocket triggers, and deploying secure payment hubs.
            </p>
          </div>

          {/* Column B: Right Illustration Frame */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-zinc-900/60 border border-zinc-850 p-6 sm:p-8 rounded-3xl relative overflow-hidden text-left backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/5 blur-[40px] pointer-events-none" />
              
              <h4 className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-6 flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5" />
                Technical Approach
              </h4>

              <div className="flex flex-col gap-6">
                {[
                  { label: "Dart State Stream", detail: "BLoC & Provider stream isolation layers." },
                  { label: "Hardware Bridges", detail: "Biometrics, security guards, custom methods." },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-2 border-b border-zinc-850/60 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                      <span>{item.label}</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-sans">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Timeline cards representing keys of professional expertise */}
        <h3 className="text-xs font-mono text-zinc-550 uppercase tracking-widest text-center mt-6 mb-8">
          Guiding Development Philosophies
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {timelineCards.map((card, i) => (
            <motion.div
              key={card.phase}
              className={`bg-gradient-to-tr ${card.gradient} border rounded-2.5xl p-6 sm:p-8 text-left transition-transform hover:-translate-y-1 duration-300 backdrop-blur-xl`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl w-fit mb-5">
                {card.icon}
              </div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                {card.tagline}
              </span>
              <h4 className="text-lg font-sans font-semibold text-white tracking-tight mb-3">
                {card.phase}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans font-medium">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
