import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, Sparkles, Filter, Briefcase, Trophy, GraduationCap, Phone, BrainCircuit } from "lucide-react";

// Components
import LoadingScreen from "./components/LoadingScreen";
import FloatingParticles from "./components/FloatingParticles";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import SkillRadar from "./components/SkillRadar";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import ProjectCard from "./components/ProjectCard";
import Achievements from "./components/Achievements";
import Education from "./components/Education";
import Contact from "./components/Contact";
import AiChatbot from "./components/AiChatbot";

import { Project } from "./types";

const projectsList: Project[] = [
  {
    id: "pcw",
    title: "PrivateClubWorld & PlatinumClubNet",
    subtitle: "User & Admin Applications",
    description: "Premium hospitality and networking platform connecting members to 1800+ global private clubs. Integrated synchronized membership billing matrices and geo-fenced map queries.",
    techStack: ["Flutter", "Dart", "Provider", "WebSockets", "Stripe SDK", "Google Maps API", "SharedPreferences"],
    features: [
      "Multi-tiered membership subscription contracts",
      "Stripe Connect secure payout rails",
      "Real-time customer-service duplex WebSockets",
      "Geo-location maps and regional check-in queries",
      "Extensive administrative operations dashboards"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    category: "enterprise"
  },
  {
    id: "taskde",
    title: "Taskde (Buyer Application)",
    subtitle: "On-demand Service Marketplace",
    description: "Localized service marketplace connecting buyers and vendors. Features encrypted VoIP calling and secure milestone-based digital escrows.",
    techStack: ["Flutter", "Firebase", "Provider", "Razorpay", "PhonePe", "ZegoCloud SDK"],
    features: [
      "Real-time bid placement and negotiation engines",
      "Fully encrypted ZegoCloud VoIP voice streams",
      "Escrow-protected digital wallet milestones",
      "Payment gateway integration (Razorpay & PhonePe)",
      "Dynamic background geolocated maps listing"
    ],
    image: "https://images.unsplash.com/photo-1521791136364-728a4a394316?auto=format&fit=crop&w=800&q=80",
    category: "ecommerce"
  },
  {
    id: "stpauls",
    title: "St. Paul's Student & Tutor",
    subtitle: "Virtual Classroom Hub",
    description: "Secure, content-protected dual-app virtual classroom solution. Tutors manage interactive live streams while students consume modules protected by DRM blocks.",
    techStack: ["Flutter", "Dart", "BLoC", "Zoom SDK", "Firebase Auth/FCM", "Chewie", "Razorpay"],
    features: [
      "Automated Zoom SDK live stream controllers",
      "Chewie media playbacks with local buffering",
      "Hardware DRM screenshot & screen-record blockers",
      "Push messaging triggers via Firebase FCM",
      "Dual application profile management models"
    ],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    category: "education"
  },
  {
    id: "fizzmo",
    title: "Fizzmo",
    subtitle: "Gamified Childhood Learning App",
    description: "An interactive gamified behavioral intelligence tracking tool designed for children and parents. Developed fluid 2D vector layouts and complex drag-and-drop mechanics.",
    techStack: ["Flutter", "Rive Animations", "Text-to-Speech (TTS)", "In-App Purchases", "Firebase"],
    features: [
      "Fluid 2D vector layouts with complex drag-drop mechanics",
      "Offline-resilient progress storage and caching",
      "Secure App Store / Play Store subscription payments",
      "Text-to-Speech narrative reinforcement systems",
      "Dynamic multi-profile child analytics boards"
    ],
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80",
    category: "gamified"
  },
  {
    id: "shuk",
    title: "Shuk",
    subtitle: "E-commerce Checkout Rails",
    description: "Engineered high-conversion responsive e-commerce checkout paths for community-driven transactions.",
    techStack: ["Flutter", "Dart", "RESTful APIs", "Shared Preferences"],
    features: [
      "High-conversion secure checkout pathways",
      "Real-time transaction tracking integration",
      "Offline-resilient local checkout preferences"
    ],
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    category: "ecommerce"
  }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("hero");
  const [projectFilter, setProjectFilter] = useState<"all" | "enterprise" | "ecommerce" | "education" | "gamified">("all");
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  // Toggle Theme Utility
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (next === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
      return next;
    });
  };

  // Section observer for Navigation highlight
  useEffect(() => {
    const handleScroll = () => {
      setIsBackToTopVisible(window.scrollY > 500);

      const sections = ["hero", "about", "tech", "experience", "projects", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter projects helper
  const filteredProjects = projectsList.filter((proj) => {
    if (projectFilter === "all") return true;
    return proj.category === projectFilter;
  });

  return (
    <div className={`min-h-screen text-white select-none ${theme === "dark" ? "bg-zinc-950" : "bg-neutral-50 text-zinc-900"}`}>
      
      {/* Custom Mouse Cursor (2026 aim-reticle design with neon indicators) */}
      <CustomCursor />

      {/* Futuristic count-up Loading Overlay */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* Page Canvas Particles layer (Subtle - Disabled to prevent layout thrashing on mousemove) */}
      {/* <FloatingParticles theme={theme} /> */}

      {!loading && (
        <div className="relative z-10 flex flex-col min-h-screen">
          
          {/* Header & Sticky Nav overlay */}
          <Navbar
            theme={theme}
            toggleTheme={toggleTheme}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
          />

          {/* Main sections container */}
          <main className="flex-grow">
            
            {/* 1. INTRO / HERO SECTION */}
            <Hero scrollToSection={scrollToSection} />

            {/* 2. ABOUT ME SECTION */}
            <AboutMe />

            {/* 3. EXPERIENCE SECTION */}
            <Experience />

            {/* 4. SKILL RADAR INTERACTIVE MODULE */}
            <section className="py-24 relative bg-zinc-950 border-t border-zinc-900/60">
              <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                  <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-1">
                    <BrainCircuit className="w-3.5 h-3.5" />
                    Insight Model
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
                    Interactive Capability Matrix
                  </h2>
                  <div className="h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 w-32 mt-4" />
                </div>

                <div className="max-w-4xl mx-auto">
                  <SkillRadar />
                </div>
              </div>
            </section>

            {/* 5. TECH STACK LABELS */}
            <TechStack />

            {/* 6. PROJECTS SECTION (SHOWCASE + FILTERING) */}
            <section
              id="projects"
              className="py-24 relative bg-zinc-950 border-t border-zinc-900/60"
            >
              <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                
                {/* Section Title */}
                <div className="flex flex-col items-center text-center mb-12">
                  <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" />
                    Portfolio
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
                    Featured Mobile Formulations
                  </h2>
                  <div className="h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 w-32 mt-4" />
                </div>

                {/* PROJECT FILTERING BUTTON CLUSTERS */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-2xl mx-auto">
                  {[
                    { id: "all", label: "All Formulations" },
                    { id: "enterprise", label: "Enterprise & Hospitality" },
                    { id: "ecommerce", label: "Marketplace & FinTech" },
                    { id: "education", label: "Virtual Classrooms" },
                    { id: "gamified", label: "Child Gamified" }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setProjectFilter(btn.id as any)}
                      className={`px-4 py-2 text-xs font-mono tracking-tight rounded-xl border transition-all cursor-pointer ${
                        projectFilter === btn.id
                          ? "bg-zinc-900 border-zinc-700/80 text-cyan-400 font-semibold"
                          : "bg-zinc-950/20 border-zinc-900/65 text-zinc-550 hover:text-white"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                {/* Animated project list grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="h-full"
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

              </div>
            </section>

            {/* 7. ACHIEVEMENTS & COUNTERS */}
            <Achievements />

            {/* 8. EDUCATION TIMELINE CARDS */}
            <Education />

            {/* 9. CONTACT FORM & CTA */}
            <Contact />

          </main>

          {/* Footer Area */}
          <footer className="bg-zinc-950 border-t border-zinc-900 py-10 text-center relative z-10 font-mono text-[11px] text-zinc-650 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full px-6 sm:px-8">
            <p className="font-sans font-medium text-zinc-600">
              © {new Date().getFullYear()} Mohammed Ubaise. Manufactured for high availability.
            </p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="https://github.com/mohammedubaise" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                GitHub Pipeline
              </a>
              <span className="text-zinc-800">•</span>
              <a href="https://linkedin.com/in/mohammedubaise" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                LinkedIn Workspace
              </a>
            </div>
          </footer>

          {/* Sizable Back To Top Circle button */}
          <AnimatePresence>
            {isBackToTopVisible && (
              <motion.button
                onClick={() => scrollToSection("hero")}
                className="fixed bottom-24 right-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-cyan-400 hover:text-white hover:border-zinc-700 active:scale-95 transition-all shadow-xl z-50 cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                title="Back to top"
              >
                <ArrowUp size={16} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* AI Chatbot Assistant */}
          <AiChatbot />

        </div>
      )}
    </div>
  );
}
