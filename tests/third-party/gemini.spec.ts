import { generateGeminiContent } from '../../src/third-party/gemini';

jest.mock('../../src/third-party/gemini');
const mockedGenerateGeminiContent = generateGeminiContent as jest.Mock;

describe('generateGeminiContent', () => {
	it('deve retornar o resultado do modelo Gemini', async () => {
		mockedGenerateGeminiContent.mockResolvedValue({ result: 'mocked response' });
		const result = await generateGeminiContent('Olá Gemini!');
		expect(result).toEqual({ result: 'mocked response' });
	});

	it('deve lançar erro se o modelo falhar', async () => {
		mockedGenerateGeminiContent.mockRejectedValue(new Error('Falha na API'));
		await expect(generateGeminiContent('erro')).rejects.toThrow('Falha na API');
	});
});
