// server.ts
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var isProd = process.env.NODE_ENV === "production";
var port = process.env.PORT || 3e3;
var apiKey = process.env.GEMINI_API_KEY || "";
var ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
var systemInstructionText = `
You are Ubaise Assistant, the advanced AI avatar of Mohammed Ubaise. You are a passionate Mobile Application Developer specializing in Flutter and Dart, with 2+ years of hands-on experience designing, developing, and deploying scalable mobile apps.

Here is essential information about Mohammed Ubaise:

- **Core Bio**: Detail-oriented, results-driven Flutter Developer. Focus on high-performance rendering, offline-resilient UI, and decoupling business logic from presentation (Clean Architecture, BLoC, Provider).
- **Employment**: Currently working as a Flutter Developer at Aventus Informatics (2024\u2013Present).
- **Official Contact Channels**:
  - Email: ubaiseap35@gmail.com
  - Phone/WhatsApp: +91 9633027889
  - GitHub: github.com/mohammedubaise
  - LinkedIn: linkedin.com/in/mohammedubaise
- **Languages**: Native Malayalam, Advanced English.
- **Core Architectural Competencies**: Flutter & Dart, BLoC & Provider State Management, Clean Architecture (TDD), Repository Pattern, Dependency Injection (GetIt), Layer Isolation, Biometric & Hardware Authentication, Rive & Lottie animations, WebSockets & Real-Time Syncing, Dart Isolates for zero frame drops.
- **Databases**: Firebase Firestore, SharedPreferences, Local Caching, Hive, SQLite.
- **SDK Integrations**: Stripe Connect Payments, Razorpay Checkout Hub, PhonePe SDK, ZegoCloud VoIP Engine, Zoom SDK Live Stream, Google Maps APIs.
- **Projects**:
  1. **PrivateClubWorld & PlatinumClubNet**: User & Admin apps. Hospitality & networking platform connecting members to 1800+ global private clubs. Stripe Connect secure payouts, real-time WebSockets, geo-fencing.
  2. **Taskde (Buyer App)**: Localized service marketplace. ZegoCloud VoIP voice streams, escrow-protected digital wallet milestones, Razorpay/PhonePe.
  3. **St. Paul's Student & Tutor**: Dual-app virtual classroom. Zoom SDK live stream, Chewie media playback, hardware DRM screenshot/record blockers.
  4. **Fizzmo**: Gamified childhood learning app. Rive 2D animations, offline caching, App Store/Play Store subscriptions, Text-to-Speech.
  5. **Shuk**: E-commerce checkout rails. High-conversion checkout.
- **Education**:
  - Bachelor of Commerce (B.Com) - Computer Application from Calicut University.
  - Fullstack Development Course from First Logic Institute of Technology.
- **Achievements**: 5+ published applications in App Store & Google Play Store.
- **Personality**: Professional, friendly, tech-savvy, and concise. Speak in the first person ("I", "my") as if you are Mohammed Ubaise. Answer questions directly, highlight engineering skills, and guide the conversation toward potential job opportunities, hiring, or collaboration. Avoid generic filler. Keep responses engaging and reasonably brief. Always refer to yourself as Ubaise Assistant and never as Ubaise AI.
`;
async function startServer() {
  const app = express();
  app.use(express.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  function classifyError(err) {
    const msg = (err?.message || "").toLowerCase();
    const code = err?.code || err?.status || "";
    if (msg.includes("429") || msg.includes("quota") || msg.includes("resource_exhausted") || String(code) === "429") return "quota";
    if (msg.includes("503") || msg.includes("unavailable") || msg.includes("high demand") || String(code) === "503") return "overload";
    return "other";
  }
  async function generateWithFallback(contents) {
    const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
    for (const model of models) {
      for (let attempt = 0; attempt <= 2; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents,
            config: { systemInstruction: systemInstructionText }
          });
          return response.text;
        } catch (err) {
          const type = classifyError(err);
          if (type === "quota") {
            throw Object.assign(new Error("quota"), { type: "quota" });
          }
          if (type === "overload") {
            if (attempt < 2) {
              await new Promise((r) => setTimeout(r, (attempt + 1) * 1200));
              continue;
            }
            break;
          }
          throw err;
        }
      }
    }
    throw Object.assign(new Error("overload"), { type: "overload" });
  }
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }
      if (!ai) {
        return res.status(500).json({ error: "AI service is not configured on the server." });
      }
      const contents = messages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));
      const text = await generateWithFallback(contents);
      res.json({ text });
    } catch (err) {
      console.error("API Error:", err?.message || err);
      if (err?.type === "quota" || classifyError(err) === "quota") {
        return res.status(429).json({
          error: "The AI assistant has reached its daily usage limit. Please try again tomorrow or contact Mohammed Ubaise directly at ubaiseap35@gmail.com"
        });
      }
      if (err?.type === "overload" || classifyError(err) === "overload") {
        return res.status(503).json({
          error: "The AI assistant is temporarily busy. Please try again in a few seconds."
        });
      }
      res.status(500).json({
        error: "Something went wrong. Please try again or contact Mohammed Ubaise directly."
      });
    }
  });
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }
      const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        console.log("--- Contact Form Submission (Simulated) ---");
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Subject: ${subject || "None"}`);
        console.log(`Message: ${message}`);
        console.log("-------------------------------------------");
        return res.json({ success: true, message: "Simulated submission successful (Web3Forms Key not set)." });
      }
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          subject: subject || "New Contact Form Submission",
          message
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        res.json({ success: true });
      } else {
        console.error("Web3Forms Error:", data);
        res.status(500).json({ error: data.message || "Failed to submit form to email service." });
      }
    } catch (err) {
      console.error("Contact Form Error:", err);
      res.status(500).json({ error: err.message || "An error occurred while sending message." });
    }
  });
  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== "true"
      },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api/")) return next();
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
