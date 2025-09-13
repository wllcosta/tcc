import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateDocumentation({ projectName, context, code, apiKey }) {
  if (!apiKey) throw new Error('Missing GOOGLE_API_KEY');
  if (!projectName || (!context && !code)) {
    const e = new Error('Campos obrigatórios ausentes');
    e.code = 'BAD_REQUEST';
    throw e;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Você é um assistente que gera documentação de código em português.\n` +
    `Explique de forma geral o que o código faz, sem detalhar linha por linha.\n\n` +
    `Nome do Projeto: ${projectName}\n` +
    `Contexto: ${context || 'Não informado'}\n` +
    `Código:\n${code}\n\n` +
    `Responda resumidamente, focando na função principal do código e nos componentes importantes.`;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  return text;
}

