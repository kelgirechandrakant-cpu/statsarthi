import { GoogleGenAI, Type } from "@google/genai";
import { mospiGraphReport } from "../data/graphData";

// Ranked by your preference for GraphRAG
const GEMINI_MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite"
];

const GEMINI_API_KEYS = [
  import.meta.env.VITE_GEMINI_API_KEY,
  import.meta.env.VITE_GEMINI_API_KEY_1,
  import.meta.env.VITE_GEMINI_API_KEY_2,
  import.meta.env.VITE_GEMINI_API_KEY_3,
  import.meta.env.VITE_GEMINI_API_KEY_4,
  import.meta.env.VITE_GEMINI_API_KEY_5,
  localStorage.getItem('gemini_api_key')
].filter(Boolean) as string[];

const cooldowns = new Map<string, number>();
const KEY_COOLDOWN_MS = 60000;

export function sanitizePromptPII(prompt: string): string {
  if (!prompt) return prompt;
  const phoneRegex = /(?:\+91|0)?[7-9]\d{9}/g;
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const employeeIdRegex = /\b(?:EMP|ID|ISS|SSS)-?\d+\b/gi;
  return prompt
    .replace(phoneRegex, "[REDACTED_PHONE]")
    .replace(emailRegex, "[REDACTED_EMAIL]")
    .replace(employeeIdRegex, "[REDACTED_EMPID]");
}

class GeminiService {
  /**
   * Resilient executor that cycles through keys and models using raw fetch
   * to perfectly bypass 503s and 429s as requested.
   */
  private executeResilient = async (prompt: string, systemInstruction?: string, isJson: boolean = false, schema?: any): Promise<string> => {
    if (GEMINI_API_KEYS.length === 0) throw new Error("No Gemini keys found.");

    const startIdx = Math.floor(Math.random() * GEMINI_API_KEYS.length);
    let lastError: any = null;

    for (const model of GEMINI_MODELS) {
      for (let i = 0; i < GEMINI_API_KEYS.length; i++) {
        const keyIdx = (startIdx + i) % GEMINI_API_KEYS.length;
        const apiKey = GEMINI_API_KEYS[keyIdx];
        const cooldownKey = `${model}_${keyIdx}`;

        const cooldownUntil = cooldowns.get(cooldownKey);
        if (cooldownUntil && Date.now() < cooldownUntil) {
          continue;
        }

        try {
          console.log(`[Resilient API] Trying model: ${model} with Key #${keyIdx + 1}`);
          
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 30000); // 20s aggressive failover
          
          const config: any = {};
          if (isJson) {
            config.responseMimeType = "application/json";
            if (schema) config.responseSchema = schema;
          }


          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              signal: controller.signal,
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: config,
                ...(systemInstruction ? { systemInstruction: { parts: [{ text: systemInstruction }] } } : {})
              })
            }
          );

          clearTimeout(timeout);
          const data = await response.json();

          if (!response.ok) {
            const code = data.error?.code || response.status;
            const msg = data.error?.message || "Unknown error";
            
            if (code === 503 || code === 429) {
              cooldowns.set(cooldownKey, Date.now() + KEY_COOLDOWN_MS);
              console.warn(`[Resilient API] Error ${code} on Key #${keyIdx + 1}. Cooldown for 60s.`);
              lastError = new Error(`${code}: ${msg}`);
              continue;
            }
            throw new Error(`Fatal API Error: ${code} - ${msg}`);
          }

          return data.candidates[0].content.parts[0].text;

        } catch (err: any) {
          if (err.name === 'AbortError') {
            console.warn(`[Resilient API] Timeout on Key #${keyIdx + 1}`);
            lastError = new Error("Timeout");
          } else {
            lastError = err;
          }
        }
      }
    }

    throw new Error(`All Gemini keys and models failed. Last error: ${lastError?.message}`);
  }

  public async generateBatchDiagnosticQuestions(
    competencyAreas: any[],
    difficulty: string,
    questionsPerArea: number,
    language: string,
    profileContext?: any
  ): Promise<any[]> {
    const totalQuestions = competencyAreas.length * questionsPerArea;
    const areasDescription = competencyAreas.map((area, i) => 
      `${i + 1}. "${area.name}" (id: "${area.id}")`
    ).join("\n");

    const promptText = `You are generating multiple-choice questions for Indian statistical officials.

[GraphRAG KNOWLEDGE GRAPH CONTEXT]
Here is the Graph Report:
${JSON.stringify(mospiGraphReport, null, 2)}
[/GraphRAG CONTEXT]

Generate exactly ${totalQuestions} questions covering these areas:
${areasDescription}

Difficulty: ${difficulty}
Language: ${language}`;

    const sanitizedPrompt = sanitizePromptPII(promptText);
    
    console.group("🛡️ PRIVACY SHIELD: Outgoing API Payload (generateBatchDiagnosticQuestions)");
    console.log("Payload:", sanitizedPrompt);
    console.groupEnd();

    const schema = {
      type: "ARRAY",
      description: "List of multiple choice questions",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING" },
          question: { type: "STRING" },
          options: { type: "ARRAY", items: { type: "STRING" } },
          correctIndex: { type: "INTEGER" },
          competencyArea: { type: "STRING" },
          subCompetency: { type: "STRING" },
          bloomsLevel: { type: "STRING" },
          difficulty: { type: "STRING" },
          explanation: { type: "STRING" }
        },
        required: ["id", "question", "options", "correctIndex", "competencyArea", "explanation", "difficulty"]
      }
    };

    const text = await this.executeResilient(sanitizedPrompt, "You are an expert MoSPI / NSSTA Assessor.", true, schema);
    try {
      return JSON.parse(text || "[]");
    } catch (e) {
      console.error("Failed to parse Gemini JSON output:", text);
      return [];
    }
  }

  public async generateMCQsFromDocument(
    fileData: string,
    mimeType: string,
    options: {
      count: number;
      difficulty: string;
      bloomsLevels: string[];
      competencyArea?: string;
      language?: string;
    }
  ): Promise<any[]> {
    const targetLanguage = options.language || 'English';
    const promptText = `Based strictly on the text provided below, generate ${options.count} multiple choice questions in ${targetLanguage}.
Difficulty: ${options.difficulty}

Source Text:
${fileData.substring(0, 4000)}`;

    const sanitizedPrompt = sanitizePromptPII(promptText);
    
    const schema = {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING" },
          question: { type: "STRING" },
          options: { type: "ARRAY", items: { type: "STRING" } },
          correctIndex: { type: "INTEGER" },
          competencyArea: { type: "STRING" },
          explanation: { type: "STRING" },
          difficulty: { type: "STRING" },
          sourceReference: { type: "STRING", description: "Quote from the source text" }
        },
        required: ["id", "question", "options", "correctIndex", "competencyArea", "explanation", "difficulty", "sourceReference"]
      }
    };

    const text = await this.executeResilient(sanitizedPrompt, "You are a testing expert.", true, schema);
    try {
      return JSON.parse(text || "[]");
    } catch (e) {
      console.error("Failed to parse Gemini JSON output:", text);
      return [];
    }
  }

  public async generateGraphRAGLearningPathway(gapReport: any): Promise<string> {
    const promptText = `
[GraphRAG KNOWLEDGE GRAPH CONTEXT]
Here is the Graph Report:
${JSON.stringify(mospiGraphReport, null, 2)}
[/GraphRAG CONTEXT]

The user has the following Gap Report:
${JSON.stringify(gapReport, null, 2)}

Using the GraphRAG Context, write a highly personalized, 2-paragraph learning pathway recommendation. 
Specifically mention the exact iGOT or NSSTA courses (found in the graph) that connect to their largest competency gaps.
Explain WHY these courses are structurally important. Format in Markdown.`;

    const sanitizedPrompt = sanitizePromptPII(promptText);
    return await this.executeResilient(sanitizedPrompt, "You are an expert MoSPI / NSSTA Career Counselor.");
  }

  public async askTrainingAdvisor(prompt: string): Promise<string> {
    const promptText = `User asks: ${prompt}
Use your knowledge of MoSPI, NSSTA, and iGOT Karmayogi to answer.`;
    return await this.executeResilient(sanitizePromptPII(promptText), "You are a helpful training advisor.");
  }
}

export const geminiService = new GeminiService();
