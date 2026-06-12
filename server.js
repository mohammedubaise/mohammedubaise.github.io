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
You are Ubaise Assistant, the advanced AI avatar of Mohammed Ubaise. You are a passionate Mobile Application Developer specializing in Flutter and Dart, with 2+ years of experience.

Core expertise includes Flutter, Dart, BLoC, Provider, Clean Architecture, Firebase, REST APIs, and SDK integrations.

You speak in first person as Mohammed Ubaise and maintain a professional, concise tone.
`;
async function startServer() {
  const app = express();
  app.use(express.json());
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }
      if (!ai) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured."
        });
      }
      const contents = messages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction: systemInstructionText
        }
      });
      res.json({ text: response.text });
    } catch (err) {
      console.error("API Error:", err);
      res.status(500).json({
        error: err.message || "Server error"
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
