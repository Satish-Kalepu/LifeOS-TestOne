import { Router } from "express";
import { adminDb } from "../lib/firebase-admin.js";

const router = Router();

router.get("/", async (req, res) => {
  const { userId } = req.query;
  try {
    const snapshot = await adminDb
      .collection("users")
      .doc(userId as string)
      .collection("logs")
      .orderBy("timestamp", "desc")
      .limit(50)
      .get();
    
    const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

router.post("/", async (req, res) => {
  const { userId, type, content, metadata } = req.body;
  try {
    const docRef = await adminDb
      .collection("users")
      .doc(userId)
      .collection("logs")
      .add({
        type,
        content,
        metadata: metadata || {},
        timestamp: Date.now()
      });
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create log" });
  }
});

export default router;
