const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-2.5-flash";

// Generic helper: send a prompt to Gemini and return plain text
const generateContent = async (prompt) => {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });
  return response.text;
};

// Generic helper: ask Gemini for strict JSON and parse it safely
const generateJSON = async (prompt) => {
  const jsonPrompt = `${prompt}\n\nRespond ONLY with valid JSON. Do not include markdown fences, backticks, or any explanation text.`;
  const raw = await generateContent(jsonPrompt);
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};

const generateSummary = async (content) => {
  return generateContent(
    `Summarize the following study material into a clear, concise summary suitable for quick exam revision:\n\n${content}`
  );
};

const generateFlashcards = async (content, count = 10) => {
  return generateJSON(
    `Create ${count} flashcards from the following study material. Return a JSON array of objects, each with "question" and "answer" fields.\n\nStudy material:\n${content}`
  );
};

const generateQuiz = async (content, count = 10) => {
  return generateJSON(
    `Create a ${count}-question multiple-choice quiz from the following study material. Return a JSON array of objects, each with "question", "options" (array of 4 strings), and "correctAnswer" fields.\n\nStudy material:\n${content}`
  );
};

const generateStudyPlan = async (content, examDate, preferences = "") => {
  return generateContent(
    `Create a personalized, day-by-day study plan for a student preparing based on the material below. The exam date is ${examDate}. Preferences/constraints: ${preferences}.\n\nStudy material:\n${content}`
  );
};

module.exports = {
  generateSummary,
  generateFlashcards,
  generateQuiz,
  generateStudyPlan,
};
