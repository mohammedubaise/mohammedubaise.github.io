import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, Lock, CheckCircle2 } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAppleDevice, setIsAppleDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.navigator) {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const platform = window.navigator.platform?.toLowerCase() || "";
      
      const isIOS = /ipad|iphone|ipod/.test(userAgent) || (platform === "macintel" && window.navigator.maxTouchPoints > 1);
      const isMac = /macintel|macintosh|macpascal|macppc|macos/.test(userAgent) || platform.indexOf("mac") !== -1;
      
      setIsAppleDevice(isIOS || isMac);
    }
  }, []);

  const isStoreReleased = !["shuk", "prep", "taskde"].includes(project.id);
  const releaseStatusText = isStoreReleased 
    ? (isAppleDevice ? "Released to App Store" : "Released to Play Store")
    : "Not Published to Stores";


  return (
    <motion.div
      className="relative flex flex-col h-full bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl group transition-all duration-300 hover:border-cyan-500/20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect behind card on Hover */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" 
      />

      {/* Card Header Section - Styled Secure Code Placeholder for Enterprise NDA Projects */}
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#060b16] to-[#030610] border-b border-white/5 flex flex-col justify-between p-6 relative group select-none">
        {/* Soft custom grid pattern to emulate high-end editor console */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
        
        {/* Blur lighting orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-cyan-500/5 blur-xl rounded-full" />
        
        {/* Top bar */}
        <div className="relative z-10 flex justify-between items-center w-full">
          <span className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest backdrop-blur-md bg-black/40 border border-white/10 text-cyan-400 rounded-full flex items-center gap-1.5 font-bold">
            <Shield className="w-3 h-3" />
            Proprietary Enterprise
          </span>
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
            PROD://{project.id}
          </span>
        </div>

        {/* Center icon */}
        <div className="relative z-10 flex flex-col items-center justify-center my-2 text-center">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 shadow-xl group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-colors"
          >
            <Lock className="w-4.5 h-4.5" />
          </motion.div>
          <span className="text-[9px] font-mono text-zinc-400 mt-2.5 font-semibold tracking-wider uppercase">
            Internal Production Systems Only
          </span>
        </div>

        {/* Footer indicators */}
        <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-zinc-550">
          <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-md border border-white/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
            NDA / Closed-Source
          </span>
          <span className="uppercase tracking-widest text-[9px] text-zinc-600 font-bold">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="flex flex-col flex-grow p-6 sm:p-8">
        {/* Project Title and subtitle */}
        <div className="mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-all duration-200">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-xs font-mono text-zinc-500 mt-0.5 uppercase tracking-wider">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Formatted overview description */}
        <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-sans">
          {project.description}
        </p>

        {/* Key Features List */}
        <div className="mb-6 flex-grow">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono mb-3">
            Core Mechanics
          </h4>
          <ul className="space-y-2">
            {project.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-sans font-medium">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stacks pill container */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider font-mono mb-3">
            Tech Infrastructure
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-[10px] font-mono bg-zinc-950 border border-white/5 text-zinc-400 rounded-md transition-colors duration-200 group-hover:border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive card actions restricted for corporate confidentiality */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs tracking-wider uppercase font-semibold">
            <Lock className="w-3.5 h-3.5 text-cyan-400/80" />
            Proprietary Codebase
          </div>
          {isStoreReleased ? (
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#22d3ee] bg-cyan-400/10 px-2.5 py-1 rounded-full border border-cyan-400/20 font-bold">
              {releaseStatusText}
            </span>
          ) : (
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 bg-zinc-900/60 px-2.5 py-1 rounded-full border border-zinc-700/30 font-bold">
              {releaseStatusText}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
