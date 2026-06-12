export const API_BASE_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "" // Dev: same-origin (Vite proxies to Express on 3000)
    : "https://mohammedubaise-github-io.onrender.com"; // Production Render backend
