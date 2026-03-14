import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const BASE_SYSTEM_INSTRUCTION = `
You are an intelligent personal life assistant designed to help users organize their tasks, goals, emotions, and productivity.
Your responses should be clear, structured, and practical.
Your tone should be:
- supportive
- encouraging
- clear
- practical

Avoid overly long responses.
If information is missing, ask the user for clarification instead of guessing.

At the very end of every response, you MUST include:
1. One actionable suggestion that helps the user improve their productivity or well-being.
2. A Confidence Score (0-100%) based on available information.
`;

export const generateSmartPlan = async (userGoals: string, taskList: string, availableHours: string) => {
  const prompt = `
Create a clear daily schedule based on the user's goals and tasks.

User Goals:
${userGoals}

Tasks:
${taskList}

Available Time:
${availableHours}

Rules:
- Prioritize tasks based on:
  1. Deadlines
  2. Importance
  3. Estimated time required
  4. User goals
- Break large tasks into smaller steps
- Include short breaks
- Return the result in a structured list format

Output format:
Time | Task | Priority

Provide the response in the following sections:
1. Optimized Schedule
2. Key Insight
3. Productivity Tip
4. Explanation (briefly explain why the tasks were arranged in this order)
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { systemInstruction: BASE_SYSTEM_INSTRUCTION },
  });
  return response.text;
};

export const generateJournalReflection = async (journalText: string) => {
  const prompt = `
Analyze the user's journal entry and provide:

1. Mood detection
2. Key thoughts or concerns
3. Positive insights
4. One reflective question

Journal Entry:
${journalText}

Keep the response supportive and thoughtful.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { systemInstruction: BASE_SYSTEM_INSTRUCTION },
  });
  return response.text;
};

export const extractMemoryInfo = async (text: string) => {
  const prompt = `
Extract important information from the text.

Identify:
- Tasks
- Deadlines
- Events
- Goals

Text:
${text}

Return in JSON format.
Example Output
{
 "tasks": ["Finish project report"],
 "deadlines": ["March 25"],
 "events": ["Team meeting"],
 "goals": ["Improve coding skills"]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { 
      systemInstruction: BASE_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    },
  });
  return response.text;
};

export const generateIdeas = async (topic: string) => {
  const prompt = `
Generate 5 innovative ideas based on the topic below.

Topic:
${topic}

For each idea provide:
- Title
- Problem
- Solution
- Possible technologies
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { systemInstruction: BASE_SYSTEM_INSTRUCTION },
  });
  return response.text;
};

export const searchKnowledge = async (storedNotes: string, question: string) => {
  const prompt = `
Answer the user's question using the provided notes.

Notes:
${storedNotes}

Question:
${question}

Give a clear explanation.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { systemInstruction: BASE_SYSTEM_INSTRUCTION },
  });
  return response.text;
};

export const generateProductivityInsights = async (activityLog: string) => {
  const prompt = `
Analyze the user's activity data and provide insights.

Data:
${activityLog}

Provide:
1. Productivity patterns
2. Areas for improvement
3. Suggestions for better time management
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { systemInstruction: BASE_SYSTEM_INSTRUCTION },
  });
  return response.text;
};

export const generateSmartTasks = async (goal: string) => {
  const prompt = `
Convert the following goal into actionable tasks.

Goal:
${goal}

Create:
- Step-by-step tasks
- Estimated time for each
- Priority level
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { systemInstruction: BASE_SYSTEM_INSTRUCTION },
  });
  return response.text;
};
