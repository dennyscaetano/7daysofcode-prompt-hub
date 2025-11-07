import express from "express";
import { generateGeminiContent } from "../third-party/gemini";

const router = express.Router();

router.post("/api/v1/chat", async (req, res) => {
	try {
		const { prompt } = req.body;
		if (!prompt) {
			return res.status(400).json({ error: "Prompt é obrigatório." });
		}
		const result = await generateGeminiContent(prompt);
		res.json({ result });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		res.status(500).json({ error: "Erro ao gerar conteúdo.", details: errorMessage });
	}
});

export default router;
