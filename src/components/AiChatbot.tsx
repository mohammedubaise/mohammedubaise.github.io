import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, X, Sparkles, BrainCircuit, Bot, User, AlertCircle, Key } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "What is your experience with Flutter?",
  "Tell me about PrivateClubWorld.",
  "Do you know BLoC or Provider?",
  "How can I contact you?",
];

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I am Ubaise Assistant, Mohammed Ubaise's digital avatar. Feel free to ask me anything about my mobile development skills, projects, or how we can collaborate!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Custom API key input for local testing fallback
  const [localApiKey, setLocalApiKey] = useState(() => localStorage.getItem("local_gemini_key") || "");
  const [showKeyInput, setShowKeyInput] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Reset error when toggled
  useEffect(() => {
    if (!isOpen) setError(null);
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newMsg: Message = { role: "user", content: text };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // If user supplied their own key locally, send it in headers
      if (localApiKey.trim()) {
        headers["x-gemini-key"] = localApiKey;
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to retrieve response from server.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text },
      ]);
    } catch (err: any) {
      console.error("Chat Error:", err);
      setError(err.message || "Something went wrong. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("local_gemini_key", localApiKey);
    setShowKeyInput(false);
    setError(null);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("local_gemini_key");
    setLocalApiKey("");
    setError(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* 1. CHAT PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[360px] max-w-[calc(100vw-2rem)] h-[520px] rounded-3xl border border-zinc-800 bg-[#090d16]/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden mb-4 select-text"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-zinc-850/80 bg-zinc-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="/profile.jpg"
                    alt="Ubaise"
                    className="w-9 h-9 rounded-xl object-cover border border-white/10 shadow-lg"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#090d16]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-sans font-bold text-white tracking-tight flex items-center gap-1">
                    Ubaise Assistant
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                  </span>
                  <span className="text-[9px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
                    Online & Ready
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                {/* Local API Key Settings Button */}
                <button
                  onClick={() => setShowKeyInput(!showKeyInput)}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    localApiKey
                      ? "border-emerald-500/30 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-900/30"
                      : "border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                  }`}
                  title={localApiKey ? "Gemini Key Saved (Local)" : "Set Custom Gemini Key"}
                >
                  <Key size={13} />
                </button>
                
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* API Key Modal Overlay inside panel */}
            <AnimatePresence>
              {showKeyInput && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute inset-x-0 top-[69px] bg-[#090d16] border-b border-zinc-850 p-4 z-20 text-left font-sans text-xs"
                >
                  <h4 className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
                    <Key size={12} className="text-cyan-400" />
                    Local Testing Fallback
                  </h4>
                  <p className="text-zinc-400 text-[10px] leading-relaxed mb-3">
                    If `GEMINI_API_KEY` is not defined in your server environment, you can input your key below to save it in browser storage.
                  </p>
                  <form onSubmit={handleSaveApiKey} className="flex gap-2 mb-2">
                    <input
                      type="password"
                      placeholder="Paste Gemini API Key..."
                      value={localApiKey}
                      onChange={(e) => setLocalApiKey(e.target.value)}
                      className="flex-grow bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-[11px] text-zinc-300 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[10px] font-bold rounded-lg uppercase cursor-pointer"
                    >
                      Save
                    </button>
                  </form>
                  {localApiKey && (
                    <button
                      onClick={handleClearApiKey}
                      className="text-[9px] text-rose-400 hover:underline font-mono"
                    >
                      Clear Saved Key
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Messages Body */}
            <div className="flex-grow overflow-y-auto px-5 py-4 space-y-4 flex flex-col scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
                  }`}
                >
                  {/* Avatar bubble */}
                  {msg.role === "user" ? (
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border border-zinc-800 bg-zinc-900 text-cyan-400 shadow-md">
                      <User size={12} />
                    </div>
                  ) : (
                    <img
                      src="/profile.jpg"
                      alt="Ubaise"
                      className="w-6 h-6 rounded-lg object-cover border border-white/5 shadow-md shrink-0"
                    />
                  )}
                  
                  {/* Bubble text */}
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs sm:text-xs leading-relaxed text-left font-sans ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-lg shadow-blue-500/5"
                        : "bg-zinc-900/80 border border-zinc-850/60 text-zinc-300 rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Loader */}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] self-start">
                  <img
                    src="/profile.jpg"
                    alt="Ubaise"
                    className="w-6 h-6 rounded-lg object-cover border border-white/5 shadow-md shrink-0 animate-pulse"
                  />
                  <div className="bg-zinc-900/80 border border-zinc-850/60 rounded-2xl rounded-tl-none px-4 py-3.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="p-3 bg-rose-950/40 border border-rose-900/60 rounded-2xl text-left text-[11px] text-rose-400 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <div>
                    <span className="font-semibold block mb-0.5">Connection Error</span>
                    {error}
                    {!localApiKey && (
                      <button
                        onClick={() => {
                          setShowKeyInput(true);
                          setError(null);
                        }}
                        className="block mt-1.5 text-cyan-400 hover:underline font-mono text-[9px] uppercase tracking-wider"
                      >
                        Enter Key Manually
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Invisible anchor for auto-scroll */}
              <div ref={chatEndRef} />
            </div>

            {/* Floating Suggestions */}
            {messages.length === 1 && (
              <div className="px-5 py-2.5 flex flex-wrap gap-1.5 border-t border-zinc-900 bg-zinc-950/20">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSuggestionClick(sug)}
                    className="text-[10px] text-left text-zinc-400 hover:text-cyan-400 bg-zinc-900/40 border border-zinc-850/60 hover:border-cyan-500/30 px-2.5 py-1 rounded-xl transition-all cursor-pointer font-sans"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-4 border-t border-zinc-850/80 bg-zinc-900/20 flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask about Ubaise's experience..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-grow bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder:text-zinc-650 focus:outline-none focus:border-cyan-500 font-sans transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:opacity-95 text-white active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={13} className="text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CHAT TRIGGER FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full bg-gradient-to-tr from-cyan-600 via-indigo-600 to-violet-600 text-white shadow-xl hover:shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer border border-white/10 z-50 relative group flex items-center justify-center w-14 h-14"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Chat with Ubaise's Assistant"
      >
        {/* Ring glow effect */}
        <span className="absolute inset-0 rounded-full border border-cyan-400 opacity-20 group-hover:scale-110 transition-transform duration-300" />
        
        {isOpen ? (
          <X size={20} className="text-white" />
        ) : (
          <div className="relative w-11 h-11">
            <img
              src="/profile.jpg"
              alt="Ubaise"
              className="w-full h-full rounded-full object-cover border border-white/10"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-indigo-900" />
          </div>
        )}
      </motion.button>
      
    </div>
  );
}
