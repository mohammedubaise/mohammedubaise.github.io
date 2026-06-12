import { motion } from "motion/react";
import { Cpu, Layers, Database, Puzzle, Film, Sliders } from "lucide-react";
import { SkillGroup } from "../types";

const skillsData: SkillGroup[] = [
  {
    id: "core",
    categoryName: "Core Technologies",
    iconName: "Cpu",
    skills: [
      "Flutter",
      "Dart",
      "BLoC State Management",
      "Provider Model",
      "Firebase Suite",
      "RESTful Integrations",
      "WebSocket streams",
      "JSON Serialization",
    ],
  },
  {
    id: "architecture",
    categoryName: "Architecture",
    iconName: "Layers",
    skills: [
      "Repository Pattern",
      "Dependency Injection (GetIt)",
      "MVC Structure",
      "Clean Architecture (TDD)",
      "Layer Isolation",
    ],
  },
  {
    id: "storage",
    categoryName: "Databases & Storage",
    iconName: "Database",
    skills: [
      "Firebase Firestore",
      "SharedPreferences Engine",
      "Local Storage Caching",
      "Secure Hive / SQLite",
    ],
  },
  {
    id: "sdks",
    categoryName: "SDK Integrations",
    iconName: "Puzzle",
    skills: [
      "Stripe Connect Payments",
      "Razorpay checkout Hub",
      "PhonePe SDK",
      "ZegoCloud VoIP Engine",
      "Zoom SDK Live Stream",
      "Google Maps APIs",
    ],
  },
  {
    id: "multimedia",
    categoryName: "Multimedia & UI Integrations",
    iconName: "Film",
    skills: [
      "Rive Fluid Animations",
      "Lottie Renderers",
      "Chewie Video Engine",
      "Just Audio Playlist",
      "Dynamic Custom Painters",
    ],
  },
  {
    id: "tools",
    categoryName: "DevOps & Tools",
    iconName: "Sliders",
    skills: [
      "GitHub & Actions",
      "GitLab CI Runners",
      "VS Code Setup",
      "Android Studio Profilers",
      "Google Play Console",
      "App Store Connect",
    ],
  },
];

export default function TechStack() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Cpu":
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-violet-400" />;
      case "Database":
        return <Database className="w-5 h-5 text-blue-400" />;
      case "Puzzle":
        return <Puzzle className="w-5 h-5 text-emerald-400" />;
      case "Film":
        return <Film className="w-5 h-5 text-rose-400" />;
      default:
        return <Sliders className="w-5 h-5 text-amber-500" />;
    }
  };

  const getGradientBorder = (name: string) => {
    switch (name) {
      case "Cpu":
        return "hover:border-cyan-500/40";
      case "Layers":
        return "hover:border-violet-500/40";
      case "Database":
        return "hover:border-blue-500/40";
      case "Puzzle":
        return "hover:border-emerald-500/40";
      case "Film":
        return "hover:border-rose-500/40";
      default:
        return "hover:border-amber-500/40";
    }
  };

  return (
    <section
      id="tech"
      className="py-24 relative bg-zinc-950 border-t border-zinc-900/65"
    >
      {/* Visual background accents */}
      <div className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-96 h-96 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
            Skillsets
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Comprehensive Tech Stack & Ecosystems
          </h2>
          <div className="h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 w-32 mt-4" />
        </div>

        {/* Core Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillsData.map((group, idx) => {
            const isLatestLine = Math.floor(idx / 3) === 1;
            return (
              <motion.div
                key={group.id}
                className={`bg-zinc-900/40 dark:bg-zinc-900/20 border border-zinc-850 p-6 sm:p-8 rounded-3xl backdrop-blur-xl transition-all duration-300 ${getGradientBorder(
                  group.iconName
                )} group relative overflow-hidden flex flex-col`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                {/* Decorative card particle block on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Card Title Box */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl">
                    {getIcon(group.iconName)}
                  </div>
                  <h3 className="font-sans font-semibold text-lg text-white tracking-tight">
                    {group.categoryName}
                  </h3>
                </div>

                {/* Inner skills list of pills */}
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs text-zinc-300 bg-zinc-950 border border-zinc-850 hover:border-zinc-700 hover:text-white rounded-xl font-sans font-medium transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
