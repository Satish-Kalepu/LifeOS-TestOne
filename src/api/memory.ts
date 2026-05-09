import { Router } from "express";
import { adminDb } from "../lib/firebase-admin.js";

const router = Router();

router.get("/", async (req, res) => {
  const { userId } = req.query;
  try {
    const snapshot = await adminDb
      .collection("users")
      .doc(userId as string)
      .collection("memories")
      .orderBy("importance", "desc")
      .limit(20)
      .get();
    
    const memories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch memories" });
  }
});

router.post("/", async (req, res) => {
  const { userId, content, importance, tags } = req.body;
  try {
    const docRef = await adminDb
      .collection("users")
      .doc(userId)
      .collection("memories")
      .add({
        content,
        importance: importance || 0.5,
        tags: tags || [],
        createdAt: Date.now()
      });
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create memory" });
  }
});

export default router;
