import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `
Você é um Arquiteto de Software e Analista de Negócios. 
Sua tarefa é documentar arquivos de código focando estritamente no VALOR DE NEGÓCIO e REGRAS.
- Use tom técnico e objetivo.
- Não explique o código linha a linha.
- Siga rigorosamente o template Markdown fornecido.
- Se uma informação não estiver clara no código, escreva "(não identificado)".
`;

export async function generateDocumentation({
  projectName,
  context,
  code,
  apiKey,
}) {
  if (!apiKey) throw new Error("Missing GOOGLE_API_KEY");

  if (!projectName || (!context && !code)) {
    const error = new Error("Required fields are missing");
    error.code = "BAD_REQUEST";
    throw error;
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  const generationConfig = {
    temperature: 0.2,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const prompt = `
        # ENTRADAS
        - Sistema: ${projectName || "Não informado"}
        - Contexto: ${context || "Não informado"}
        - Conteúdo:
        <<<CODE_START
        ${code}
        CODE_END>>>

        # SAÍDA — FORMATO OBRIGATÓRIO (Markdown)
        # Doc do Arquivo
        - Sistema/Projeto: ${projectName}
        - Data: ${new Date().toISOString().split("T")[0]}

        ## O que esse arquivo resolve?
        {{Resumo de negócio}}

        ## Regras principais
        - *Regra 1:* {{descrição}}

        ## Como entra e como sai
        - *Entradas:* {{campos e condições}}
        - *Saídas:* {{campos e condições}}

        ## Riscos de segurança
        | Risco | Categoria | Evidência | Prob. | Impacto | Mitigação |
        |------|-----------|-----------|-------|---------|-----------|
        | {{R1}} | {{Cat}} | {{Evid}} | {{B/M/A}} | {{B/M/A}} | {{Ação}} |

        ## Exemplos de uso
        | Caso | Entrada | Resultado |
        |------|---------|-----------|
        | C1 | {{...}} | {{...}} |
  `;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate documentation via Gemini API");
  }
}
