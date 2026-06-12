import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Sparkles } from "lucide-react";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const navLinks = [
  { label: "Intro", id: "hero" },
  { label: "About", id: "about" },
  { label: "Tech Stack", id: "tech" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({
  theme,
  toggleTheme,
  activeSection,
  scrollToSection,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Is Scrolled State
      setIsScrolled(window.scrollY > 40);

      // 2. Scroll Progress Percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-zinc-900 z-[99]" id="scroll-progress">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-zinc-950/80 dark:bg-zinc-950/70 border-b border-zinc-800/40 backdrop-blur-xl"
            : "py-5 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo / Personal Branding */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg group-hover:rotate-6 transition-transform duration-300">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center font-mono font-bold text-white text-[17px] tracking-tighter">
                MU
              </div>
            </div>
            <div>
              <span className="block font-sans font-semibold text-white tracking-tight leading-none group-hover:text-cyan-400 transition-colors">
                Mohammed Ubaise
              </span>
              <span className="text-[10px] font-mono text-zinc-500 block tracking-wider uppercase mt-0.5">
                Flutter Developer
              </span>
            </div>
          </button>

          {/* Desktop Navigation Link Cluster */}
          <nav className="hidden md:flex items-center gap-7 bg-zinc-900/30 border border-zinc-800/60 rounded-full px-6 py-2 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-xs font-mono tracking-tight uppercase relative py-1 hover-link cursor-pointer transition-colors duration-200 ${
                    isActive ? "text-cyan-400" : "text-zinc-450 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-cyan-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Theme Switcher & Contact Button */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950 dark:bg-zinc-900/40 text-zinc-400 hover:text-white hover:scale-105 transition-all duration-150 cursor-pointer"
              title={theme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Quick Contact Accent Link */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono uppercase bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 text-white transition-all duration-200 cursor-pointer"
            >
              Hire Me
              <Sparkles size={12} className="text-cyan-400 animate-pulse" />
            </button>

            {/* Hamburger Mobile controls */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950 dark:bg-zinc-900/40 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </header>

      {/* Screen-height overlay mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-zinc-950 flex flex-col pt-24 px-8 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Visual particle grid divider inside menu */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.05),transparent)] pointer-events-none" />

            <div className="flex flex-col gap-6 relative z-10">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setTimeout(() => scrollToSection(link.id), 200);
                    }}
                    className={`text-2xl font-semibold tracking-tight text-left py-2 border-b border-zinc-900/80 transition-colors ${
                      isActive ? "text-cyan-400" : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Resume button & Contacts info inside slide page */}
            <div className="mt-auto mb-10 relative z-10 flex flex-col gap-4">
              <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest text-center">
                Let's stay connected
              </p>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTimeout(() => scrollToSection("contact"), 200);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-mono text-white bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                Hire Mohammed Ubaise
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
