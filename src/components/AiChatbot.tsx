import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, X, Sparkles, User, AlertCircle } from "lucide-react";
import { API_BASE_URL } from "../config";

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
      content:
        "Hi! I am Ubaise Assistant, Mohammed Ubaise's digital avatar. Feel free to ask me anything about my mobile development skills, projects, or how we can collaborate!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Reset error when closed
  useEffect(() => {
    if (!isOpen) setError(null);
  }, [isOpen]);

  // Map any error situation to a clean, short user-facing string
  const resolveErrorMessage = (err: any, status?: number): string => {
    if (err?.name === "TypeError" || err?.message?.toLowerCase().includes("failed to fetch") || err?.message?.toLowerCase().includes("networkerror")) {
      return "No connection to the server. Check your internet and try again.";
    }
    if (err?.name === "AbortError") {
      return "The request timed out. Please try again.";
    }
    if (status === 429) {
      return "The AI assistant has reached its daily usage limit. Try again tomorrow or email ubaiseap35@gmail.com directly.";
    }
    if (status === 503) {
      return "The AI assistant is temporarily busy. Please try again in a few seconds.";
    }
    if (err?.message && !err.message.startsWith("{") && err.message.length < 300) {
      return err.message;
    }
    return "Something went wrong. Please try again or contact Mohammed Ubaise directly.";
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newMsg: Message = { role: "user", content: text };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000); // 20s timeout

    let status: number | undefined;

    try {
      let res: Response;
      try {
        res = await fetch(`${API_BASE_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
          signal: controller.signal,
        });
      } catch (networkErr: any) {
        throw { _network: true, name: networkErr.name, message: networkErr.message };
      } finally {
        clearTimeout(timeout);
      }

      status = res.status;

      let data: any;
      try {
        data = await res.json();
      } catch {
        // Response body not valid JSON
        throw { message: "Unexpected response from server. Please try again." };
      }

      if (!res.ok) {
        // Server sent a clean error string — use it if it looks safe
        const serverMsg = typeof data?.error === "string" && !data.error.startsWith("{") && data.error.length < 400
          ? data.error
          : resolveErrorMessage({}, status);
        throw { message: serverMsg, _status: status };
      }

      if (!data?.text) {
        throw { message: "No response received from the assistant. Please try again." };
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text },
      ]);

    } catch (err: any) {
      console.error("Chat Error:", err);
      const finalStatus = err?._status ?? status;
      setError(resolveErrorMessage(err, finalStatus));
    } finally {
      setIsLoading(false);
    }
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
                    Online &amp; Ready
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
              >
                <X size={13} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-grow overflow-y-auto px-5 py-4 space-y-4 flex flex-col scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
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
                    className={`rounded-2xl px-4 py-3 text-xs sm:text-xs leading-relaxed text-left font-sans ${msg.role === "user"
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
                    onClick={() => handleSendMessage(sug)}
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
