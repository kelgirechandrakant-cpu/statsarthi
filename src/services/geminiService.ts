import { GoogleGenAI, Chat, Type } from "@google/genai";
import { Message, ExamTopic, QuizQuestion, QuizResult } from "../types/coding";

export class GeminiService {
  private ai: GoogleGenAI | null = null;
  private chatInstance: Chat | null = null;
  private currentPdfData: string | null = null;

  private getAI(): GoogleGenAI {
    if (!this.ai) {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY || localStorage.getItem('gemini_api_key') || '';
      if (!apiKey) {
        console.warn("No Gemini API key found in VITE_GEMINI_API_KEY or localStorage.");
      }
      this.ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
    }
    return this.ai;
  }

  public setApiKey(key: string) {
    localStorage.setItem('gemini_api_key', key);
    this.ai = new GoogleGenAI({ apiKey: key });
    this.chatInstance = null;
  }

  public async createChat(history: Message[] = [], pdfData?: string) {
    this.currentPdfData = pdfData || null;
    const ai = this.getAI();
    
    let formattedHistory: any[] = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    if (pdfData) {
      const match = pdfData.match(/^data:(application\/pdf);base64,(.*)$/);
      if (match) {
        formattedHistory.unshift({
          role: 'user',
          parts: [
            { text: "Here are my study notes/syllabus. Please base all future answers, hints, and code practice exclusively on this material." },
            { inlineData: { data: match[2], mimeType: match[1] } }
          ]
        });
        formattedHistory.splice(1, 0, {
          role: 'model',
          parts: [{ text: "Understood. I have reviewed your notes and will restrict my teaching and problem generation to the scope and patterns covered in this material." }]
        });
      }
    }

    const chatConfig: any = {
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are EduResources AI, an expert Software Engineering & Coding Tutor specializing in interactive practice (Coddy/LeetCode style), system design, and programming languages. 
        Your goal is to help students write clean, efficient code, understand complex algorithms, and master their course curriculum.
        
        Guidelines:
        1. Always be encouraging, patient, and pedagogical.
        2. When a student asks about a coding problem or gets a syntax error, provide guided hints instead of the full solution immediately.
        3. Use Markdown for formatting (bolding key terms, using code blocks with syntax highlighting).
        4. Focus on time and space complexity (Big O notation) when discussing algorithms.
        5. If a student submits an image of code or a math equation, analyze it step-by-step and use KaTeX math formatting if needed.`,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    };

    if (formattedHistory.length > 0) {
      chatConfig.history = formattedHistory;
    }

    this.chatInstance = ai.chats.create(chatConfig);
  }

  public async sendMessageStream(
    message: string, 
    imageData: string | undefined, 
    onChunk: (chunk: string) => void,
    mode: 'standard' | 'analogy' | 'step_by_step' | 'exam_precision' = 'standard'
  ) {
    if (!this.chatInstance) {
      await this.createChat();
    }

    try {
      let promptPrefix = "";
      if (mode === 'analogy') {
        promptPrefix = "[Understand-Anything Mode: 👶 Feynman / Analogy Mode. Please explain the following concept, problem, or code using intuitive, relatable real-world analogies suitable for a 5-year-old or beginner, avoiding dry technical jargon initially before gently bridging to the technical truth.]\n\n";
      } else if (mode === 'step_by_step') {
        promptPrefix = "[Understand-Anything Mode: 🔍 Step-by-Step Execution Trace. Please break down the following concept, math proof, or code line-by-line, showing exact memory/variable changes or step-by-step mathematical logic clearly numbered.]\n\n";
      } else if (mode === 'exam_precision') {
        promptPrefix = "[Understand-Anything Mode: 🎓 University Exam Precision Mode. Please give the formal academic definition, key bullet points, theorems/complexity proofs, and high-yield scoring keywords tailored for scoring 100% on a university engineering exam.]\n\n";
      }

      let messageContent: any[] = [{ text: promptPrefix + message }];
      
      if (imageData) {
        const match = imageData.match(/^data:(image\/\w+);base64,(.*)$/);
        if (match) {
          messageContent.push({ inlineData: { data: match[2], mimeType: match[1] } });
        }
      }

      const result = await this.chatInstance!.sendMessageStream({ message: messageContent });
      let fullText = "";
      
      for await (const chunk of result) {
        const textChunk = chunk.text || "";
        fullText += textChunk;
        onChunk(textChunk);
      }
      
      return fullText;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }

  public async generateNotebookLMPodcast(pdfData?: string): Promise<string> {
    const ai = this.getAI();
    const promptText = `Generate a captivating, engaging 2-person educational podcast script (Audio Overview style, inspired by Google NotebookLM) based on the provided study notes/syllabus.
    
    Host 1 (Alex): An enthusiastic, curious engineering student who asks insightful questions and reacts naturally.
    Host 2 (Dr. Sam): A friendly, brilliant professor who explains complex topics with crystal clarity and real-world intuition.
    
    Format the output in clean Markdown with **Alex:** and **Dr. Sam:** dialogue turns. Cover the highest-yield concepts, key definitions, and practical intuition from the material. If no PDF is attached, generate a sample engaging discussion about Computer Science & Software Engineering foundations.`;

    let contents: any[] = [{ text: promptText }];
    if (pdfData || this.currentPdfData) {
      const activeData = pdfData || this.currentPdfData;
      if (activeData) {
        const match = activeData.match(/^data:(application\/pdf);base64,(.*)$/);
        if (match) {
          contents.push({ inlineData: { data: match[2], mimeType: match[1] } });
        }
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: { temperature: 0.8 }
    });
    return response.text || "Failed to generate podcast script.";
  }

  public async generateDeepDiveGuide(pdfData?: string): Promise<string> {
    const ai = this.getAI();
    const promptText = `Create a comprehensive **Deep-Dive Study Guide & PYQ Predictor** (inspired by Google NotebookLM synthesis) based on the provided syllabus or notes.
    
    Please structure your response into these exact Markdown sections:
    ### 🎯 1. Executive Topic Summary
    A concise overview of the core subject and its practical engineering importance.
    
    ### 🔑 2. Core Definitions & Key Formulas / Syntax
    The must-memorize definitions, mathematical equations (formatted in KaTeX $...$ or $$...$$), or critical code patterns.
    
    ### 🔮 3. High-Yield PYQ Prediction Matrix
    List the top 3 to 5 most likely exam questions derived from these notes, complete with expected point values and grading criteria.
    
    ### 💡 4. Common Student Pitfalls & Pro Tips
    Where students typically lose marks on this topic and how to avoid those mistakes.`;

    let contents: any[] = [{ text: promptText }];
    if (pdfData || this.currentPdfData) {
      const activeData = pdfData || this.currentPdfData;
      if (activeData) {
        const match = activeData.match(/^data:(application\/pdf);base64,(.*)$/);
        if (match) {
          contents.push({ inlineData: { data: match[2], mimeType: match[1] } });
        }
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: { temperature: 0.7 }
    });
    return response.text || "Failed to generate study guide.";
  }

  public async generateSocraticFAQ(pdfData?: string): Promise<string> {
    const ai = this.getAI();
    const promptText = `Generate a **High-Yield Socratic FAQ & Flashcard Matrix** based on the provided syllabus document or topic notes.
    
    Format each item clearly:
    ### ❓ Q1: [Thought-provoking concept question]
    **💡 Socratic Hint:** A guided question to make the student think before checking the answer.
    **✅ Master Answer:** The precise, full-credit explanation with key terms bolded.
    **🏷️ Difficulty:** \`Easy\` | \`Medium\` | \`Hard\`
    
    Generate at least 5 distinct, high-impact Q&A pairs covering the breadth of the material.`;

    let contents: any[] = [{ text: promptText }];
    if (pdfData || this.currentPdfData) {
      const activeData = pdfData || this.currentPdfData;
      if (activeData) {
        const match = activeData.match(/^data:(application\/pdf);base64,(.*)$/);
        if (match) {
          contents.push({ inlineData: { data: match[2], mimeType: match[1] } });
        }
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: { temperature: 0.7 }
    });
    return response.text || "Failed to generate FAQ matrix.";
  }

  public async generateQuizQuestion(topic: ExamTopic | string, subTopic?: string, pdfData?: string): Promise<QuizQuestion> {
    const ai = this.getAI();
    const topicText = `${topic}${subTopic ? ` (specifically focusing on: ${subTopic})` : ''}`;
    const promptText = `Generate a LeetCode-style coding problem for a student practicing ${topicText}. 
    ${pdfData ? "The problem MUST be strictly based on the concepts, patterns, and code covered in the provided PDF notes." : "The problem should be challenging but approachable (Medium difficulty)."}
    Do NOT include the solution.`;

    let contents: any[] = [{ text: promptText }];
    
    if (pdfData) {
      const match = pdfData.match(/^data:(application\/pdf);base64,(.*)$/);
      if (match) {
        contents.push({ inlineData: { data: match[2], mimeType: match[1] } });
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            problemStatement: { type: Type.STRING },
            exampleInputOutput: { type: Type.STRING, description: "Examples formatted in markdown, e.g. Input: ... Output: ..." },
            startingCode: { type: Type.STRING, description: "A class or function signature to get the student started." }
          },
          required: ["id", "title", "problemStatement", "exampleInputOutput", "startingCode"]
        }
      }
    });

    try {
      return JSON.parse(response.text || "{}") as QuizQuestion;
    } catch (error) {
      console.error("Failed to parse quiz question:", error);
      throw new Error("Failed to generate a valid coding problem.");
    }
  }

  public async evaluateAnswer(question: QuizQuestion | { title: string; problemStatement?: string; question?: string; example?: string }, userAnswer: string): Promise<QuizResult> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert code reviewer and tutor. A student has submitted code for the following problem:
      
      Problem Title: ${question.title || (question as any).question}
      Description: ${(question as any).problemStatement || (question as any).question}
      Examples: ${(question as any).exampleInputOutput || (question as any).example || ''}
      
      Student's Code:
      \`\`\`
      ${userAnswer}
      \`\`\`
      
      Evaluate the student's code. Does it correctly solve the problem? Are there syntax errors or major inefficiencies?
      Provide constructive feedback and a brief explanation of the optimal approach.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN, description: "True if the code correctly solves the problem or is conceptually very close." },
            feedback: { type: Type.STRING, description: "A short, encouraging 1-sentence feedback (e.g., 'Great job! Your logic is correct.')" },
            explanation: { type: Type.STRING, description: "A detailed explanation of issues found, space/time complexity, and the optimal solution." }
          },
          required: ["isCorrect", "feedback", "explanation"]
        }
      }
    });

    try {
      return JSON.parse(response.text || "{}") as QuizResult;
    } catch (error) {
      console.error("Failed to parse evaluation:", error);
      throw new Error("Failed to evaluate the answer.");
    }
  }
  // ==========================================
  // NEW STATSARTHI METHODS (MoSPI SIH26101)
  // ==========================================

  public async createStatSarthiChat(history: Message[] = [], pdfData?: string): Promise<void> {
    this.currentPdfData = pdfData || null;
    const ai = this.getAI();
    
    let formattedHistory: any[] = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    if (pdfData) {
      const match = pdfData.match(/^data:(application\/pdf);base64,(.*)$/);
      if (match) {
        formattedHistory.unshift({
          role: 'user',
          parts: [
            { text: "Here are the training materials/document. Please base all future answers and MCQs on this material." },
            { inlineData: { data: match[2], mimeType: match[1] } }
          ]
        });
        formattedHistory.splice(1, 0, {
          role: 'model',
          parts: [{ text: "Understood. I have reviewed the document and will use it as the source of truth for our session." }]
        });
      }
    }

    const systemInstruction = `You are StatSarthi AI, an expert Training Advisor for the Ministry of Statistics and Programme Implementation (MoSPI) and NSSTA (National Statistical Systems Training Academy).
    You help MoSPI officials (ISS, SSS cadre) identify skill gaps, recommend iGOT Karmayogi training, and generate assessments.
  
    Guidelines:
    1. Use formal, professional language appropriate for government officials.
    2. Heavily reference real MoSPI operations: NSSO, NSO, PLFS (Periodic Labour Force Survey), ASI (Annual Survey of Industries), CPI (Consumer Price Index), and HCES (Household Consumption Expenditure Survey).
    3. Reference modern initiatives: transitioning from CAPI (Computer Assisted Personal Interviewing) to cloud-based systems, maintaining Data Quality via SQAF (Statistical Quality Assessment Framework), and capacity building via NSSTA.
    4. Support 4 competency domains:
       - Statistical: Survey Design, Sampling, National Accounts, Price Statistics, Labour Statistics
       - Technical: Python, R, SQL, CAPI, GIS, AI/ML, Cloud Computing (MeghRaj)
       - Digital Governance: Cybersecurity, Data Privacy, Digital Public Infrastructure
       - Behavioural: Leadership, Ethics, Change Management
    5. When grading assessments, map scores to FRAC levels (1: Aware, 2: Apply, 3: Advise, 4: Expert, 5: Ustad).`;

    const chatConfig: any = {
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    };

    if (formattedHistory.length > 0) {
      chatConfig.history = formattedHistory;
    }

    this.chatInstance = ai.chats.create(chatConfig);
  }

  public async generateDiagnosticQuestions(
    competencyArea: string,
    subCompetencies: string[],
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    count: number = 5,
    language: string = 'English',
    profileContext?: any
  ): Promise<any[]> {
    const ai = this.getAI();
    const promptText = `You are generating diagnostic assessment questions for officials in India's
Official Statistical System (MoSPI/NSO). These are working professionals,
not students — questions must reflect real tasks they perform, not abstract
textbook scenarios.

${profileContext ? `OFFICIAL PROFILE CONTEXT:
- Cadre/Role: ${profileContext.cadre}
- Department: ${profileContext.department}
- Current Assignment: ${profileContext.currentAssignment}
- Experience: ${profileContext.experience}
- Education: ${profileContext.educationalQualifications}
(Tailor the scenarios in the questions to fit this official's specific department and current assignment where possible.)\n` : ''}
Competency Area: "${competencyArea}"
Sub-competencies to cover: ${subCompetencies.join(", ")}
Target Difficulty: ${difficulty}
Target Language: ${language} (Ensure the entire output, including questions, options, and explanations, is translated perfectly into ${language})

MANDATORY GROUNDING RULES:
1. Every question MUST be set in the context of a real MoSPI survey or
   statistical product: PLFS, ASI, CPI/WPI/CFPI, National Accounts (GDP/GVA),
   or CAPI-based field data collection. Do not invent generic scenarios
   (e.g. marbles in a bag, dice rolls, abstract shop inventory) — reframe the
   same underlying concept using real terminology instead.
2. Use only real terminology that MoSPI officials actually use:
   FSU, UFS block, rotational panel, Census/Sample sector, NIC classification,
   WPR, LFPR, UR, CWS, Usual Status (PS/PS+SS), GDP vs GVA, base year,
   CPI (Rural/Urban/Combined), CFPI, HCES, COICOP, CAPI, SQAF (Statistical Quality Assessment Framework).
3. If a question involves a specific figure (e.g. a base year, a rotation
   percentage, a threshold), only use one confirmed in this list. If unsure
   of a specific number, phrase the question conceptually instead of
   inventing a plausible-sounding statistic.
4. Match question difficulty and framing to the competencyArea and
   domainId passed in.
5. Do not fabricate MoSPI figures, dates, or results beyond what's listed
   above. If the concept being tested doesn't map cleanly to a real MoSPI
   process, it's acceptable to write a general statistics question WITHOUT
   dressing it up in fake MoSPI-specific detail.

Generate exactly ${count} questions matching the required JSON schema strictly.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ text: promptText }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Exactly 4 options" },
              correctIndex: { type: Type.INTEGER, description: "0-3 index of the correct option" },
              competencyArea: { type: Type.STRING },
              subCompetency: { type: Type.STRING },
              bloomsLevel: { type: Type.STRING, enum: ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'] },
              difficulty: { type: Type.STRING },
              explanation: { type: Type.STRING, description: "Why the correct answer is correct and others are wrong." }
            },
            required: ["id", "question", "options", "correctIndex", "competencyArea", "subCompetency", "bloomsLevel", "difficulty", "explanation"]
          }
        }
      }
    });

    try {
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Failed to parse diagnostic questions:", error);
      throw new Error("Failed to generate valid diagnostic questions.");
    }
  }

  public async generateMCQsFromDocument(
    fileData: string,
    mimeType: string,
    options: {
      count: number;
      difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
      bloomsLevels: string[];
      competencyArea?: string;
      language?: string;
    }
  ): Promise<any[]> {
    const ai = this.getAI();
    const targetLanguage = options.language || 'English';
    const promptText = `Generate ${options.count} multiple-choice questions based strictly on the provided document.
    
    Configuration:
    - Target Difficulty: ${options.difficulty}
    - Allowed Bloom's Levels: ${options.bloomsLevels.join(", ")}
    - Target Language: ${targetLanguage} (Ensure the entire output, including questions, options, and explanations, is translated perfectly into ${targetLanguage})
    ${options.competencyArea ? `- Competency Area Focus: ${options.competencyArea}` : ""}
    
    Ensure questions are clear, unambiguous, and test actual understanding rather than just trivia.
    
    [CRITICAL - UNDERSTAND-ANYTHING MODE]:
    For the \`beginnerExplanation\` field, use the Feynman Technique. Explain the concept using an intuitive, highly relatable real-world analogy suitable for a non-technical beginner. This will be shown to the official if they get the question wrong.`;

    let contents: any[] = [
      { text: promptText },
      { inlineData: { data: fileData, mimeType: mimeType } }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING, description: "Formal, technical explanation of the correct answer." },
              beginnerExplanation: { type: Type.STRING, description: "Feynman/Analogy mode explanation for a beginner who got it wrong." },
              bloomsLevel: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              sourceReference: { type: Type.STRING, description: "A brief quote or section title from the doc where the answer is found." }
            },
            required: ["id", "question", "options", "correctIndex", "explanation", "beginnerExplanation", "bloomsLevel", "difficulty", "sourceReference"]
          }
        }
      }
    });

    try {
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Failed to parse MCQs:", error);
      throw new Error("Failed to generate valid MCQs from the document.");
    }
  }

  public async evaluateCompetency(
    questions: any[],
    userAnswers: number[],
    competencyArea: string
  ): Promise<any> {
    const ai = this.getAI();
    
    // Calculate raw score first to pass to AI
    let correctCount = 0;
    const answeredDetails = questions.map((q, idx) => {
      const isCorrect = userAnswers[idx] === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        question: q.question,
        subCompetency: q.subCompetency,
        bloomsLevel: q.bloomsLevel,
        isCorrect
      };
    });
    
    const rawScore = Math.round((correctCount / questions.length) * 100);

    const promptText = `Evaluate the user's competency in "${competencyArea}" based on their quiz performance.
    
    Raw Score: ${rawScore}% (${correctCount}/${questions.length} correct)
    
    Question Breakdown:
    ${JSON.stringify(answeredDetails, null, 2)}
    
    Map their performance to the FRAC 5-level scale (1: Aware, 2: Apply, 3: Advise, 4: Expert, 5: Ustad).
    Provide strengths, weaknesses, and actionable recommendations.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ text: promptText }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            competencyArea: { type: Type.STRING },
            score: { type: Type.INTEGER, description: "0-100 score" },
            level: { type: Type.INTEGER, description: "1-5 FRAC level" },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["competencyArea", "score", "level", "strengths", "weaknesses", "recommendations"]
        }
      }
    });

    try {
      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Failed to parse evaluation:", error);
      throw new Error("Failed to evaluate competency.");
    }
  }
  public async askTrainingAdvisor(
    message: string,
    profile: any,
    gapReport: any,
    history: { role: 'user' | 'model'; content: string }[]
  ): Promise<string> {
    const ai = this.getAI();
    
    let formattedHistory: any[] = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const systemInstruction = `You are StatSarthi AI, an expert Training Advisor for the Ministry of Statistics and Programme Implementation (MoSPI) and a senior faculty member at NSSTA.
    You are speaking with a government official (ISS/SSS cadre). Their profile and current FRAC competency gap report are provided below.
    Use this context to answer their questions about what they should learn next, how to close their gaps, or clarify specific statistical concepts they struggle with.
    
    CRITICAL DOMAIN KNOWLEDGE:
    - Ground your advice in real MoSPI operations: NSSO, NSO, PLFS (Labour Force), ASI (Industries), CPI (Inflation/Prices), and HCES (Consumption).
    - If they ask about data collection, reference CAPI (Computer Assisted Personal Interviewing) tablets, which have replaced paper schedules across MoSPI's major field surveys.
    - If they ask about cloud/hosting infrastructure, reference MeghRaj (India's Government Cloud initiative) as the real production hosting context. Do not state a specific confirmed link between CAPI devices and MeghRaj unless that detail is independently verified.
    - If they ask about data quality, reference SQAF (Statistical Quality Assessment Framework).
    - Keep your answers highly professional, concise, encouraging, and tailored to their specific MoSPI cadre.
    - Always recommend courses from NSSTA or iGOT Karmayogi if relevant to their gaps.

--- USER CONTEXT ---
Profile: ${JSON.stringify(profile)}
Gap Report: ${JSON.stringify(gapReport)}
--------------------`;

    const chatConfig: any = {
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    };

    if (formattedHistory.length > 0) {
      chatConfig.history = formattedHistory;
    }

    try {
      const chat = ai.chats.create(chatConfig);
      const response = await chat.sendMessage({ message });
      return response.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Failed to get advisor response:", error);
      return "I'm currently unable to connect to the training advisory service. Please check your API key or network connection.";
    }
  }
}

export const geminiService = new GeminiService();
