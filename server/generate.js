import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateDocumentation({
  projectName,
  context,
  code,
  apiKey,
}) {
  if (!apiKey) throw new Error("Missing GOOGLE_API_KEY");
  if (!projectName || (!context && !code)) {
    const e = new Error("Campos obrigatórios ausentes");
    e.code = "BAD_REQUEST";
    throw e;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    `Você é um assistente que gera documentação de código em português.\n` +
    `ANTES de descrever a funcionalidade, indique OBRIGATORIAMENTE:\n` +
    `- Projeto: ${projectName || "Não informado"}\n` +
    `- Contexto: ${context || "Não informado"}\n\n` +
    `Agora, explique de forma geral o que o código faz, sem detalhar linha por linha, e foque na função principal e nos componentes importantes.\n\n` +
    `Código:\n${code}\n\n` +
    `Responda resumidamente, incluindo o nome do projeto e contexto no início da resposta.`;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  return text;
}
