import { Router } from "express";
import { chatWithAI } from "../services/ai.js";

const router = Router();

// Chat endpoint for interactions
router.post("/", async (req, res) => {
  const { userId, message, history } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const aiResponse = await chatWithAI(userId || "default_user", message, history || []);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: "The AI brain is currently recalibrating. Please try again." });
  }
});

export default router;
