import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

const categoryColor: Record<string, string> = {
  enterprise: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  ecommerce:  "text-violet-400 bg-violet-400/10 border-violet-400/20",
  education:  "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  kids:       "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const colorClass = categoryColor[project.category] ?? "text-zinc-400 bg-zinc-800 border-zinc-700";

  return (
    <motion.div
      className="relative flex flex-col h-full bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl group transition-all duration-300 hover:border-cyan-500/20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

      <div className="flex flex-col flex-grow p-6 sm:p-8">

        {/* Category badge + title */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border mb-3 ${colorClass}`}>
            {project.category}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-200">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-xs font-mono text-zinc-500 mt-0.5 uppercase tracking-wider">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Short description */}
        <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-sans">
          {project.description}
        </p>

        {/* Key features */}
        <div className="mb-6 flex-grow">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono mb-3">
            Key Features
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

        {/* Tech pills */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-[10px] font-mono bg-zinc-950 border border-white/5 text-zinc-400 rounded-md group-hover:border-white/10 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
