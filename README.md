# 7DaysOfCode - Prompt Hub

Prompt Hub é uma aplicação backend desenvolvida para gerenciar templates de prompts reutilizáveis em diversos serviços de Inteligência Artificial, como ChatGPT e Gemini. O projeto também integra a API do Gemini, permitindo testar e validar prompts diretamente pela plataforma.

## Tecnologias Utilizadas
- **Node.js** (v18.12.1)
- **TypeScript**
- **Express**

## Funcionalidades
- Gerenciamento de templates de prompts
- Integração com múltiplos serviços de IA (ChatGPT, Gemini)
- Testes e validação de prompts via API Gemini

## Pré-requisitos
- Node.js v18.12.1
- npm (gerenciador de pacotes do Node)

## Instalação
1. Clone o repositório:
	```bash
	git clone https://github.com/dennyscaetano/7daysofcode-prompt-hub.git
	cd 7daysofcode-prompt-hub
	```
2. Instale as dependências:
	```bash
	npm install
	```

## Configuração
- Configure as variáveis de ambiente necessárias para integração com a API Gemini em um arquivo `.env` na raiz do projeto:
  ```env
  GEMINI_API_KEY=your_gemini_api_key
  # Outras variáveis conforme necessário
  ```

## Execução
Para iniciar o servidor em ambiente de desenvolvimento:
```bash
npm run dev
```
Ou para rodar em produção:
```bash
npm start
```

O backend estará disponível em `http://localhost:3007` (ou porta configurada).

## Testando Prompts
- Utilize os endpoints da API para cadastrar, listar e testar templates de prompts.
- Para testar prompts diretamente na API Gemini, utilize o endpoint dedicado e forneça o template desejado.

## Boas Práticas
- Mantenha os templates organizados na pasta `resources/`.
- Documente novos endpoints e funcionalidades.
- Utilize TypeScript para garantir tipagem e segurança.
- Versione suas alterações utilizando Git e siga o fluxo de branches do projeto.

## Contribuição
1. Fork este repositório
2. Crie uma branch para sua feature: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'Minha feature'`
4. Push para o repositório: `git push origin minha-feature`
5. Abra um Pull Request

## Licença
Este projeto está sob a licença MIT.

---
Desafio realizado para o [7DaysOfCode](https://7daysofcode.io/)
