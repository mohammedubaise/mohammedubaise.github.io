import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Phone, Mail, Github, Linkedin, MessageSquare, Check, Sparkles } from "lucide-react";
import { API_BASE_URL } from "../config";

export default function Contact() {
  // Form submission states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to send the message. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 relative bg-zinc-950 border-t border-zinc-900/60"
    >
      {/* Background Neon Spans */}
      <div className="absolute bottom-0 right-[15%] w-96 h-96 bg-cyan-600/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-violet-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* BIG GLOWING CTA HEADER SECTION */}
        <div className="w-full text-center py-16 px-6 sm:px-12 bg-gradient-to-br from-indigo-950/40 via-violet-950/20 to-zinc-950/60 border border-zinc-800/80 rounded-3xl relative overflow-hidden backdrop-blur-xl mb-20 group">
          {/* Subtle neon accents */}
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-violet-500/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />

          {/* Action text */}
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4 flex items-center gap-1.5 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Vision & Collaboration
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight mb-6">
              Let's Build Something <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">Amazing Together</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans mb-8">
              Available for full-time engineering capacities in high-caliber mobile applications, cross-platform UI systems architecture, and specialized SDK integrations.
            </p>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-chatbot"));
              }}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-150 text-zinc-950 font-mono text-xs tracking-wider uppercase font-semibold flex items-center gap-2 active:scale-95 transition-transform cursor-pointer"
            >
              Start Conversation
              <Send size={12} className="text-zinc-950" />
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            Connect
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Contact Channels
          </h2>
          <div className="h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 w-24 mt-4" />
        </div>

        {/* Split Grid: Left Details & External CTAs vs Right in-page Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT CHANNELS AND ACTION BUTTONS */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight mb-2">
                Mohammed Ubaise
              </h3>
              <p className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
                Mobile Application Developer (Flutter)
              </p>
            </div>

            {/* Structured Card Items */}
            <div className="flex flex-col gap-3.5 mt-2">
              {[
                { label: "Phone & Mobile", value: "+91 9633027889", href: "tel:+919633027889", icon: <Phone className="w-4 h-4 text-cyan-400" /> },
                { label: "Official Email", value: "ubaiseap35@gmail.com", href: "mailto:ubaiseap35@gmail.com", icon: <Mail className="w-4 h-4 text-violet-400" /> },
                { label: "GitHub Profile", value: "github.com/mohammedubaise", href: "https://github.com/mohammedubaise", icon: <Github className="w-4 h-4 text-zinc-300" /> },
                { label: "LinkedIn Workspace", value: "linkedin.com/in/mohammedubaise", href: "https://linkedin.com/in/mohammedubaise", icon: <Linkedin className="w-4 h-4 text-blue-400" /> },
              ].map((channel, cIdx) => (
                <a
                  key={cIdx}
                  href={channel.href}
                  className="p-4 bg-zinc-900/40 border border-zinc-850 hover:border-zinc-700 rounded-2xl flex items-center gap-4 transition-all hover:-translate-y-0.5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="p-2.5 bg-zinc-950 border border-zinc-805 rounded-xl">
                    {channel.icon}
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">
                      {channel.label}
                    </span>
                    <span className="text-sm text-zinc-200 font-sans font-semibold leading-none">
                      {channel.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* QUICK ACTIONS BUTTON BAR */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <a
                href="https://wa.me/919633027889"
                className="py-3 px-4 rounded-xl font-mono text-xs text-white bg-[#25D366] hover:bg-[#20ba59] font-medium text-center tracking-tight flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Me
              </a>
              <a
                href="mailto:ubaiseap35@gmail.com"
                className="py-3 px-4 rounded-xl font-mono text-xs text-zinc-950 bg-white hover:bg-neutral-150 font-medium text-center tracking-tight flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                Send Email
              </a>
            </div>
          </div>

          {/* RIGHT SIDE CONTACT FORM */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900/50 border border-zinc-850 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden text-left">
              <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
                In-Page Message Transmitter
              </h3>
              <p className="text-xs text-zinc-500 font-sans leading-relaxed mb-6 border-b border-zinc-850/60 pb-3">
                Send a secure, direct metadata transmission. Response intervals average under three hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono">
                
                {/* Input row Name / Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-zinc-550 uppercase tracking-wider font-semibold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Liam Johnson"
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-3 placeholder:text-zinc-600 text-xs text-zinc-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-zinc-550 uppercase tracking-wider font-semibold">
                      Digital Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. client@domain.com"
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-3 placeholder:text-zinc-600 text-xs text-zinc-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-zinc-550 uppercase tracking-wider font-semibold">
                    Purpose / Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mobile Application Engineering Consultation"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-3 placeholder:text-zinc-600 text-xs text-zinc-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans transition-colors"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                {/* Message Box */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-zinc-550 uppercase tracking-wider font-semibold">
                    Message Body *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your mobile architecture goals or project scope..."
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl p-4 placeholder:text-zinc-600 text-xs text-zinc-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans resize-none transition-colors"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Actions / Succes states */}
                <div className="flex flex-col gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl text-center text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform shadow-lg shadow-violet-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Transmitting..." : "Send Secure Message"}
                    <Send size={12} className="text-white" />
                  </button>

                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        className="p-3 bg-emerald-950/40 border border-emerald-900/60 text-emerald-400 rounded-xl text-center text-xs font-sans flex items-center justify-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <Check className="w-4 h-4 text-emerald-400" />
                        Transmission Successful! Mohammed will reach you shortly.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
