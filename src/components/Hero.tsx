import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Star, Smartphone, Award, Terminal, Github, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  // 3D tilt interactive card hook states
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;
    
    const x = e.clientX - rect.left - halfWidth;
    const y = e.clientY - rect.top - halfHeight;
    
    // Map bounds to tilt range between -12 and +12 degrees (with division-by-zero guards)
    const rx = halfHeight > 0 ? -(y / halfHeight) * 12 : 0;
    const ry = halfWidth > 0 ? (x / halfWidth) * 12 : 0;
    setTilt({ x: rx, y: ry });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#030712]"
    >
      {/* Premium Visual Accents */}
      <div className="absolute top-[15%] left-[5%] w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      {/* Behind everything, giant cut-off watermark header text like in the mock */}
      <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden">
        <h2 className="text-[12vw] font-black tracking-tighter text-white/[0.015] leading-none uppercase font-sans">
          FLUTTER DEVELOPER
        </h2>
      </div>

      {/* Grid Pattern layout */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* HERO LEFT CONTAINER: Information from CV & Screenshot layout */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          
          {/* Elegant pill-shaped badge as in the screenshot */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-purple-500/10 to-cyan-500/15 border border-cyan-500/20 rounded-full mb-6 shadow-sm shadow-cyan-500/5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Star className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
            <span className="text-[10px] font-mono font-semibold tracking-widest text-cyan-400 uppercase">
              ✦ Developer Portfolio
            </span>
          </motion.div>

          {/* Majestic display headers optimized for Poppins style */}
          <motion.div
            className="flex flex-col gap-1.5 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-extrabold text-white tracking-tight leading-[1.05] font-sans">
              Mohammed Ubaise
            </h1>
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.05] font-sans text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
              Flutter Developer
            </h2>
          </motion.div>

          {/* Subheading derived from CV content in sleek, modern font */}
          <motion.p
            className="text-sm sm:text-sm text-zinc-450 max-w-xl font-sans tracking-wide leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A detail-oriented and results-driven Flutter Developer with 2+ years of hands-on experience designing, building, and deploying scalable, high-performance cross-platform applications for iOS and Android. I specialize in architecting clean codebases utilizing BLoC and Provider state management patterns, integrating complex APIs, and implementing robust Firebase solutions.
          </motion.p>

          {/* Primary CTA outlined button mimicking screenshot */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3.5 rounded-full border border-white hover:border-cyan-400 hover:text-cyan-400 text-white font-mono uppercase text-xs tracking-widest font-semibold bg-transparent transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
            >
              ▷ CONTACT ME
            </button>
            
            <a
              href="mailto:ubaiseap35@gmail.com"
              className="px-6 py-3.5 rounded-full border border-dashed border-zinc-800 hover:border-zinc-650 text-zinc-400 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors duration-300"
            >
              Download CV
            </a>
          </motion.div>

          {/* Grid Stats Block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            {[
              { id: "exp", icon: <Star className="text-cyan-400 w-4 h-4" />, count: "2+ Years", label: "Experience" },
              { id: "pub", icon: <Smartphone className="text-violet-400 w-4 h-4" />, count: "5+ Published", label: "Apps Live" },
              { id: "os", icon: <Award className="text-blue-400 w-4 h-4" />, count: "15+ Mastered", label: "SDKs & APIs" },
              { id: "fit", icon: <Terminal className="text-rose-400 w-4 h-4" />, count: "Clean BLoC", label: "Architecture" },
            ].map((stat, i) => (
              <motion.div
                key={stat.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-start text-left backdrop-blur-xl relative overflow-hidden group/item"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + 0.1 * i }}
              >
                <div className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-850 mb-3 group-hover/item:border-zinc-700 transition-colors">
                  {stat.icon}
                </div>
                <div className="font-sans text-base font-bold text-white mb-0.5">
                  {stat.count}
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* HERO RIGHT CONTAINER: Floating 3D Portrait Card layout */}
        <div className="lg:col-span-5 flex items-center justify-center relative pt-20 lg:pt-0">
          
          {/* Giant glowing background spotlight matching screenshot */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 via-purple-600/10 to-transparent blur-[80px] pointer-events-none rounded-full" />


          {/* Interactive 3D Card with tilt physics */}
          <motion.div
            className="relative w-full max-w-[340px] aspect-[4/5] rounded-[36px] p-[1.5px] bg-gradient-to-b from-white/10 via-white/5 to-white/10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] z-10 transition-all duration-200 cursor-grab active:cursor-grabbing"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
              transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            {/* Solid Glassmorphism card frame inside */}
            <div className="w-full h-full bg-[#090d16]/95 rounded-[34px] overflow-hidden flex flex-col relative p-4 group">
              
              {/* Metallic background noise/grain overlay */}
              <div className="absolute inset-0 bg-neutral-950/[0.15] opacity-50 mix-blend-overlay pointer-events-none" />

              {/* Holographic light reflection cover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/0 via-cyan-400/5 to-purple-600/5 opacity-50 group-hover:opacity-80 transition-all duration-300 pointer-events-none" />

              {/* Image Frame with gradient borders and nice glow */}
              <div className="relative flex-grow w-full rounded-[28px] overflow-hidden bg-zinc-950 border border-white/5 shadow-inner">
                {/* Real photo-recreation of Mohammed Ubaise based on uploaded photo */}
                <img
                  src="/profile.jpg"
                  alt="Mohammed Ubaise - Flutter Developer"
                  className="w-full h-full object-cover select-none filter contrast-[1.08]"
                />

                {/* Cyber highlights / glowing borders on the photo */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#030712] via-transparent to-transparent pointer-events-none" />
                
                {/* Glowing neon edge accents */}
                <div className="absolute left-0 inset-y-0 w-[2px] bg-gradient-to-b from-cyan-400 via-transparent to-purple-600 opacity-60" />
                <div className="absolute right-0 inset-y-0 w-[2px] bg-gradient-to-t from-cyan-400 via-transparent to-purple-500 opacity-60" />
              </div>

              {/* Floating banner on top of the image as in the screenshot */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-[82%] bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl py-2 px-4 shadow-xl flex items-center justify-between">
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-[10px] font-sans font-bold text-white tracking-tight">Mohammed Ubaise</span>
                  <span className="text-[8px] font-mono text-cyan-400 font-semibold tracking-wider">Aventus Informatics</span>
                </div>
                <div className="flex items-center gap-1.5 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest font-bold">LIVE</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

