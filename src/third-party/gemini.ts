import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateGeminiContent(prompt: string): Promise<any> {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GOOGLE_GENAI_API_KEY environment variable");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  return await model.generateContent(prompt);
}
