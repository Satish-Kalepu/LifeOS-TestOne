import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import logsRouter from "./src/api/logs.js";
import memoryRouter from "./src/api/memory.js";
import tasksRouter from "./src/api/tasks.js";
import chatRouter from "./src/api/chat.js";
import familyRouter from "./src/api/family.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "LifeOS" });
  });

  app.use("/api/logs", logsRouter);
  app.use("/api/memory", memoryRouter);
  app.use("/api/tasks", tasksRouter);
  app.use("/api/chat", chatRouter);
  app.use("/api/family", familyRouter);

  // TODO: Add Modular Routes for Memory, Logs, Family, etc.

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LifeOS Backend running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
