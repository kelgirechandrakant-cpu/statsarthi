# StatSarthi - AI-Powered Capacity Building Ecosystem
**Smart India Hackathon 2026 | Problem Statement: SIH26101 (MoSPI)**

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28.svg)](https://firebase.google.com/)
[![Gemini](https://img.shields.io/badge/Google-Gemini_2.5_Flash-blue.svg)](https://deepmind.google/technologies/gemini/)

## Overview
StatSarthi is an AI-driven competency intelligence platform built for the **Ministry of Statistics & Programme Implementation (MoSPI)**. It profiles government officials, diagnoses highly specific statistical skill gaps, and recommends personalized training pathways using the official iGOT Karmayogi and NSSTA frameworks.

## ?? The X-Factor: Live MoSPI MCP Integration
Unlike generic AI wrappers, StatSarthi connects directly to the live MoSPI statistical backend via the **Model Context Protocol (MCP)**. 
- **Real-Time Data Injection:** The AI dynamically fetches live datasets (like the latest **Consumer Price Index** or **Periodic Labour Force Survey** data).
- **Data-Driven Quizzes:** The platform uses this real-time government data to generate hyper-contextualized, math-intensive quiz questions to test statistical competency.

## ?? Core Features
1. **Dynamic Profiling & Diagnostics**: Maps user skills to the official 5-level FRAC proficiency scale (Aware -> Apply -> Advise -> Expert -> Ustad).
2. **Personalized Learning Pathways**: Automatically maps identified competency gaps to official NSSTA (TPAC) training programs and Sunbird/iGOT architectural content.
3. **AI Quiz Generator**: Upload training PDFs and let Gemini 2.5 Flash generate zero-hallucination, localized MCQs mapped to Bloom's Taxonomy.
4. **Admin Analytics**: Real-time heat maps of national competency gaps for data-driven MoSPI deployment and promotion decisions.

## ??? Tech Stack
- **Frontend Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui, Recharts
- **Database & Auth**: Firebase Cloud (Auth, Firestore)
- **AI Engine**: Google Gemini 2.5 Flash API (@google/genai)
- **Data Gateway**: Model Context Protocol (MCP)

## ?? Local Development Setup

1. **Clone the repository:**
   `ash
   git clone https://github.com/kelgirechandrakant-cpu/statsarthi.git
   cd statsarthi
   `

2. **Install dependencies:**
   `ash
   npm install
   `

3. **Configure Environment Variables:**
   Create a .env file in the project root. You will need Firebase credentials and a Gemini API Key:
   `env
   VITE_FIREBASE_API_KEY="your_firebase_api_key"
   VITE_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
   VITE_FIREBASE_PROJECT_ID="your_firebase_project_id"
   VITE_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
   VITE_FIREBASE_APP_ID="your_firebase_app_id"
   VITE_GEMINI_API_KEY="your_gemini_api_key"
   `

4. **Start the Development Server:**
   `ash
   npm run dev
   `
   Open http://localhost:8080 in your browser.

## ??? Security & Privacy
- **Client-Side Document Processing**: Uploaded PDFs for quiz generation are processed entirely in the browser (via base64) and sent securely to the LLM. No sensitive government documents are permanently stored in a database.
- **Firebase Security Rules**: Role-based access control enforces that officials can only read/write their own gap reports.

---
*Built with ?? for the Smart India Hackathon 2026*
