import { motion } from "motion/react";
import { BookOpen, GraduationCap, School, Landmark } from "lucide-react";
import { EducationItem } from "../types";

const educationItems: EducationItem[] = [
  {
    id: "fsd",
    degree: "Full Stack Development Course",
    institution: "First Logic Institute of Technology",
    duration: "Professional Specialization",
    details: "Practiced standard full-stack constructs, micro-framework triggers, API endpoints modeling, database migrations, and structural interface development.",
  },
  {
    id: "bcom",
    degree: "Bachelor of Commerce (B.Com) - Computer Application",
    institution: "University of Calicut",
    duration: "2020 - 2023",
    details: "Acquired critical foundational concepts in software tools, digital accounting architectures, data structuring principles, and database management engines.",
  },
  {
    id: "hse",
    degree: "Higher Secondary Education (Computer Commerce)",
    institution: "ISS Senior Secondary School (CBSE)",
    duration: "Secondary Education (Schooling Class XII)",
    details: "Studied fundamental programming logic paradigms, computer systems business structures, and information technology frameworks.",
  },
];

export default function Education() {
  const getIcon = (id: string) => {
    switch (id) {
      case "bcom":
        return <Landmark className="w-5 h-5 text-cyan-400" />;
      case "fsd":
        return <GraduationCap className="w-5 h-5 text-violet-400" />;
      default:
        return <School className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section
      id="education"
      className="py-24 relative bg-zinc-950 border-t border-zinc-900/60"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-[20%] w-80 h-80 bg-cyan-600/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-[10%] w-80 h-80 bg-violet-600/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 animate-fade-in">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            Accreditation
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Education & Academy
          </h2>
          <div className="h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 w-32 mt-4" />
        </div>

        {/* Education Item Grid */}
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {educationItems.map((item, idx) => (
            <motion.div
              key={item.id}
              className="bg-zinc-900/40 border border-zinc-850 hover:border-zinc-750 p-6 sm:p-8 rounded-3xl backdrop-blur-xl transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row gap-6 text-left group"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-violet-500/5 blur-[20px] pointer-events-none" />

              {/* Institution Academic Icon */}
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-2xl w-fit h-fit shrink-0 group-hover:border-zinc-700/80 transition-colors">
                {getIcon(item.id)}
              </div>

              {/* Detail texts */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 mb-2">
                  <h3 className="text-lg sm:text-xl font-sans font-bold text-white tracking-tight leading-tight">
                    {item.degree}
                  </h3>
                  
                  {/* Timeline Badge */}
                  <span className="text-[10px] font-mono tracking-wider uppercase bg-zinc-950 border border-zinc-850 text-zinc-400 px-3 py-1 rounded-full w-fit">
                    {item.duration}
                  </span>
                </div>

                <div className="text-sm font-mono text-cyan-400 pb-3 border-b border-zinc-850/60 mb-3 font-semibold">
                  {item.institution}
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-medium">
                  {item.details}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
