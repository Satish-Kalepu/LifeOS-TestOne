# LifeOS: MVP Architecture (Simple & Cheap)

For the next 12-24 months (or first 10k users), we prioritize $0 infrastructure costs and simplicity over high-performance sub-second vector search.

### 1. Database: Firestore ONLY
We use Firestore for everything. It is reliable, has a generous free tier, and requires zero maintenance.

### 2. Semantic Search: The "Context Injunction" Strategy
Because Gemini 1.5 Flash has a **1 million token context window**, we do not need a Vector DB yet.
- **How it works**: Before sending your message to Gemini, we perform a "Full Text Query" of your last 50 memories/logs.
- **Why**: It is faster to implement, 100% free on Firestore, and avoids the complexity of embedding generation/management on the backend.

### 3. Scaling Path (The "Production Grade" Move)
When the user's memory count exceeds 5,000 nodes, we will implement:
1. **pgvector on Cloud SQL**: Move memory nodes to high-performance SQL.
2. **Vertex AI Matching Engine**: For billion-scale vector retrieval.
3. **Redis Cache**: For real-time state management.

### 4. Removed Components
- **Twilio**: We will use Push Notifications (FCM) first ($0) instead of paid SMS/Call bots.
- **pgvector**: Removed to eliminate DB hosting fees.
