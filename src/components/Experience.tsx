import { motion } from "motion/react";
import { Briefcase, Calendar, CheckCircle2, Sparkles, Shield, Cpu, ExternalLink } from "lucide-react";
import { TimelineEvent } from "../types";

const experienceData: TimelineEvent[] = [
  {
    id: "aventus",
    role: "Flutter Developer",
    company: "Aventus Informatics",
    duration: "2024 - Present",
    responsibilities: [
      "Architected and deployed high-performance production cross-platform mobile applications for iOS and Android environments leveraging Flutter and Dart ecosystems.",
      "Engineered robust architectures using BLoC and Provider patterns to completely isolate business logic from presentation layers, increasing codebase maintainability.",
      "Designed clean repository abstraction modules to consume complex RESTful APIs, securing robust model type-safety and offline-resilient caching workflows.",
      "Implemented real-time chat, instant push notifications, and live status tracking modules using WebSockets and Cloud Firestore, substantially boosting active user engagement and lowering latency.",
      "Offloaded resource-heavy data serialization pipelines onto Dart Isolates, resolving UI frame drops and ensuring high-performance execution.",
      "Hardened security barriers using native permission handlers, hardware-level biometric authentication protocols, and robust DRM layout constraints (screenshot/screen-recording blocks).",
      "Successfully configured, compiled, and deployed 5+ apps to production tracks on Google Play Console and App Store Connect, reducing app-rejection delays through continuous pre-release verification.",
      "Maintained source control integrity through git branch configurations and collaborative workflows in close partnership with UI/UX designers, backend squads, and QA leads."
    ],
    techUsed: [
      "Flutter", "Dart", "BLoC", "Provider", "REST APIs", "WebSockets", "Firebase", "Dart Isolates", "Biometrics", "DRM Protection", "Google Play Console", "App Store Connect"
    ]
  }
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 relative bg-zinc-950 border-t border-zinc-900/60"
    >
      {/* Background abstract glowing node */}
      <div className="absolute top-[30%] left-[15%] w-96 h-96 rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5" />
            Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Professional Experience
          </h2>
          <div className="h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 w-24 mt-4" />
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-zinc-900 ml-4 sm:ml-6 pl-8 sm:pl-10 space-y-12">
          
          {experienceData.map((exp, idx) => (
            <motion.div
              key={exp.id}
              className="relative group text-left"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Timeline dot element with pulsing state */}
              <div className="absolute -left-[45px] sm:-left-[49px] top-1.5 flex items-center justify-center">
                <div className="w-[18px] h-[18px] rounded-full bg-zinc-950 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-400/20">
                  <div className="w-[6px] h-[6px] rounded-full bg-cyan-400 animate-ping absolute" />
                  <div className="w-[6px] h-[6px] rounded-full bg-cyan-400" />
                </div>
              </div>

              {/* Company banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight flex items-center gap-2">
                    {exp.role}
                    <span className="text-zinc-650 font-normal">|</span>
                    <span className="text-cyan-450 hover:text-cyan-400 cursor-pointer transition-colors">
                      {exp.company}
                    </span>
                  </h3>
                  
                  {/* Location label */}
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-zinc-500 font-mono tracking-wider uppercase">
                    <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                    {exp.duration}
                  </div>
                </div>

                <span className="text-[10px] font-mono tracking-widest uppercase bg-cyan-950/60 text-cyan-400 border border-cyan-900/60 px-3 py-1 rounded-full w-fit">
                  Full-Time Role
                </span>
              </div>

              {/* Sub-grid of highlighted architectural achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-zinc-900/40 border border-zinc-850 p-5 rounded-2xl flex items-start gap-4">
                  <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-rose-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">
                      Advanced Mobile Defenses
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Implemented custom method channel locks blocking screen recording, screenshot caching, and rooted execution in critical payment & live class modules.
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-850 p-5 rounded-2xl flex items-start gap-4">
                  <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-cyan-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">
                      Multi-threaded Processing
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Resolved visual rendering bottlenecks by delegating JSON deserialization and database synchronization tasks to parallel Dart Isolates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bulleted list of core responsibilities */}
              <div className="space-y-4 mb-8">
                <h4 className="text-xs font-semibold text-zinc-550 uppercase tracking-widest font-mono">
                  Operational Contributions & Scope
                </h4>
                
                <div className="grid grid-cols-1 gap-3">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-4 bg-zinc-900/20 dark:bg-zinc-900/10 border border-zinc-850/40 rounded-xl hover:border-zinc-800/80 transition-colors flex items-start gap-3.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-zinc-350 leading-relaxed font-sans font-medium">
                        {resp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies deployed in this role */}
              <div>
                <h4 className="text-xs font-semibold text-zinc-550 uppercase tracking-widest font-mono mb-3">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {exp.techUsed?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[10px] font-mono bg-zinc-950 dark:bg-zinc-900/40 border border-zinc-850 text-zinc-400 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
          
        </div>

      </div>
    </section>
  );
}
