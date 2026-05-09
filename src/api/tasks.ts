import { Router } from "express";
import { adminDb } from "../lib/firebase-admin.js";

const router = Router();

router.get("/", async (req, res) => {
  const { userId } = req.query;
  try {
    const snapshot = await adminDb
      .collection("users")
      .doc(userId as string)
      .collection("tasks")
      .where("isCompleted", "==", false)
      .get();
    
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId, isCompleted } = req.body;
  try {
    await adminDb
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .doc(id)
      .update({ isCompleted });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

export default router;
