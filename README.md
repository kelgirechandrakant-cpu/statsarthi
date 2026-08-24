# EduResources - Your Complete Study Resource Hub

EduResources is a modern, high-performance web platform designed to help students and developers master computer science concepts, access study notes, solve previous year questions (PYQs), submit assignments, and practice interactive coding challenges.

## Features

- **Study Hub & Notes Directory**: Access structured subject notes and downloadable resources across various academic terms.
- **Previous Year Questions (PYQs)**: Filter and practice real university exam questions with AI-powered pedagogical explanations.
- **Interactive Code Arena**: Practice C and Python programming with gamified LeetCode-style challenges, live execution engine, and an embedded AI Coding Mentor.
- **AI Study Assistant & Tutor**: Get step-by-step guidance, concept traces, and custom explanations tailored to your comprehension level (`Understand-Anything`).
- **User Dashboard & Analytics**: Track streak points, XP points, hearts/lives, and completed practice problems in real time.

## Tech Stack

- **Frontend Core**: React 18, TypeScript, Vite
- **Styling & UI**: Tailwind CSS, HSL Semantic Design Tokens, `shadcn/ui` components
- **State & Routing**: React Router v6, TanStack Query
- **Backend & AI Integration**: Supabase (Auth, Storage & Edge Functions), Google Gemini API (`@google/genai`)

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and `npm` installed locally.

### Installation & Local Development

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the project root containing your API keys (e.g., Supabase credentials or Gemini API key):
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:8080` in your browser to view the application.

4. **Build for Production:**
   ```bash
   npm run build
   ```
   The production-ready build artifacts will be generated in the `dist/` directory.

## License

This project is open-source and available for educational use.
