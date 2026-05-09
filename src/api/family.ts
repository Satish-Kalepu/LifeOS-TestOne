import { Router } from "express";
import { adminDb } from "../lib/firebase-admin.js";

const router = Router();

// Get the household data for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userDoc = await adminDb.collection("users").doc(userId).get();
    const householdId = userDoc.data()?.householdId;

    if (!householdId) {
      return res.json({ household: null });
    }

    const householdDoc = await adminDb.collection("households").doc(householdId).get();
    res.json({ id: householdId, ...householdDoc.data() });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch family data" });
  }
});

// Update permissions for a family member
router.post("/permissions", async (req, res) => {
  const { householdId, targetUserId, permissions } = req.body;
  try {
    const householdRef = adminDb.collection("households").doc(householdId);
    const household = await householdRef.get();
    
    if (!household.exists) return res.status(404).json({ error: "Household not found" });

    const members = household.data()?.members || [];
    const updatedMembers = members.map((m: any) => 
      m.userId === targetUserId ? { ...m, permissions } : m
    );

    await householdRef.update({ members: updatedMembers });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update permissions" });
  }
});

export default router;
