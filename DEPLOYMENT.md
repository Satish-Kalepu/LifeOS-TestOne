# LifeOS Production Deployment Guide

## 1. Environment Setup
Create a `.env` file based on `.env.example`. You will need:
- `GEMINI_API_KEY`: From Google AI Studio.
- `VITE_FIREBASE_CONFIG`: The JSON object from your Firebase console.
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to your Firebase service account JSON.

## 2. Infrastructure (GCP)
- **Cloud Run**: Host the Node.js/Express backend.
- **Firebase Hosting**: Host the React/Vite frontend.
- **Firestore**: Unified NoSQL database + "Cheap RAG" search.
- **Secret Manager**: Securely store your API keys.

## 3. Database Sync
- Use the provided `firestore.rules` to secure your data.
- The `firebase-blueprint.json` acts as your source of truth for the document structure.

## 4. Mobile App (Flutter)
- Run `flutter pub get` in `apps/mobile`.
- Configure `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) in the respective platform folders.
- Use `firebase_auth` and `cloud_firestore` packages for real-time sync.

## 5. Deployment Pipeline (GitHub Actions)
```yaml
# Example CI/CD snippet
name: Deploy LifeOS
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Cloud Run
        run: gcloud run deploy lifeos-backend --source .
```
