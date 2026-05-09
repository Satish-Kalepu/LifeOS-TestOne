import { GoogleGenAI, Tool, Type, FunctionDeclaration } from "@google/genai";
import { adminDb } from "../lib/firebase-admin.js";

// Note: Although the skill suggests calling from frontend, we are using a backend helper for now
// to handle database interactions securely until we can move the entire loop to the client.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const saveToMemory: FunctionDeclaration = {
  name: "saveToMemory",
  description: "Save important personal information (health, financial, life events) to the long-term memory system.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      content: { type: Type.STRING, description: "The important fact or log entry to remember." },
      importance: { type: Type.NUMBER, description: "Value from 0 to 1 indicating how critical this is." },
      tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Categories like 'health', 'finance', 'family'." }
    },
    required: ["content", "importance"]
  }
};

const getRecentLogs: FunctionDeclaration = {
  name: "getRecentLogs",
  description: "Retrieve the most recent activity logs for the user.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      limit: { type: Type.NUMBER, description: "Number of logs to retrieve" }
    }
  }
};

const createTask: FunctionDeclaration = {
  name: "createTask",
  description: "Create a new reminder or task for the user.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      dueDate: { type: Type.STRING, description: "ISO date string" }
    },
    required: ["title", "dueDate"]
  }
};

const tools: Tool[] = [
  {
    functionDeclarations: [saveToMemory, getRecentLogs, createTask]
  }
];

const SYSTEM_INSTRUCTION = `You are LifeOS, a highly intelligent personal assistant. 
Your goal is to act as a second brain for the user. 
When the user tells you something significant (medical events, financial data, recurring habits, family details), use the 'saveToMemory' tool.
Do NOT save trivial chat messages. Only save items that have long-term value for retrieval or analysis.
Be proactive but concise. Remember context using retrieved memories.`;

export async function chatWithAI(userId: string, message: string, history: any[] = []) {
  // Simple retrieval: Fetch latest 20 important memories for context
  const memorySnapshot = await adminDb
    .collection("users")
    .doc(userId)
    .collection("memories")
    .orderBy("importance", "desc")
    .limit(20)
    .get();
  
  const memories = memorySnapshot.docs.map(d => d.data().content).join("\n- ");
  
  const dynamicContext = `
  ADDITIONAL PERSONAL CONTEXT (From User's Second Brain):
  - ${memories}
  `;

  const contents = history.map(h => ({
    role: h.role === "ai" ? "model" : "user",
    parts: [{ text: h.content }]
  }));
  contents.push({ role: "user", parts: [{ text: message }] });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION + dynamicContext,
      tools
    }
  });

  let call = response.functionCalls?.[0];
  let currentContents = [...contents, { role: "model", parts: response.candidates[0].content.parts }];

  // Tool Handling Loop
  while (call) {
    let functionResponse: any;

    if (call.name === "saveToMemory") {
      const { content, importance, tags } = call.args as any;
      try {
        await adminDb
          .collection("users")
          .doc(userId)
          .collection("memories")
          .add({
            content,
            importance: importance || 0.5,
            tags: tags || [],
            createdAt: Date.now()
          });
        functionResponse = { status: "success", message: "Saved to long-term memory." };
      } catch (err) {
        functionResponse = { status: "error", message: "Failed to save memory." };
      }
    } else if (call.name === "getRecentLogs") {
      const { limit } = call.args as any;
      const snapshot = await adminDb.collection("users").doc(userId).collection("logs").limit(limit || 5).get();
      functionResponse = { logs: snapshot.docs.map(d => d.data()) };
    } else if (call.name === "createTask") {
      const { title, dueDate } = call.args as any;
      await adminDb.collection("users").doc(userId).collection("tasks").add({
        title,
        dueDate: new Date(dueDate).getTime(),
        isCompleted: false,
        createdAt: Date.now()
      });
      functionResponse = { status: "success", task: title };
    }

    currentContents.push({
      role: "user",
      parts: [{
        functionResponse: {
          name: call.name,
          response: functionResponse
        }
      }]
    });

    const nextResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: currentContents,
      config: {
        tools
      }
    });

    call = nextResponse.functionCalls?.[0];
    currentContents.push({ role: "model", parts: nextResponse.candidates[0].content.parts });
    
    if (!call) return nextResponse.text;
  }

  return response.text;
}

export async function generateEmbedding(text: string) {
  const result = await ai.models.embedContent({
    model: "gemini-embedding-2-preview",
    contents: [{ parts: [{ text }] }]
  });
  return result.embeddings;
}

