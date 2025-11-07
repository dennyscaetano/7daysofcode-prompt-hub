import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const apiKey = process.env.GOOGLE_GENAI_API_KEY;
if (!apiKey) {
	throw new Error("Missing GOOGLE_GENAI_API_KEY environment variable");
}
const genAI = new GoogleGenerativeAI(apiKey);

router.post("/api/v1/chat", async (req, res) => {
	try {
		const { prompt } = req.body;
		if (!prompt) {
			return res.status(400).json({ error: "Prompt é obrigatório." });
		}
		const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
		const result = await model.generateContent(prompt);
		res.json({ result });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		res.status(500).json({ error: "Erro ao gerar conteúdo.", details: errorMessage });
	}
});

export default router;