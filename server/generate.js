import { GoogleGenAI } from "@google/genai";

export async function generateDocumentation({
  projectName,
  context,
  code,
  apiKey,
}) {
  console.log(apiKey);

  if (!apiKey) throw new Error("Missing GOOGLE_API_KEY");
  if (!projectName || (!context && !code)) {
    const e = new Error("Campos obrigatórios ausentes");
    e.code = "BAD_REQUEST";
    throw e;
  }

  const genAI = new GoogleGenAI({ apiKey });

  const prompt = `
        Você é um assistente técnico focado em documentar arquivos *do ponto de vista de negócio*.
        Seu objetivo é produzir UMA documentação concisa e útil, preenchendo o template abaixo.
        Não descreva o código passo a passo; extraia *propósito, regras, entradas/saídas, decisões, integrações* e *riscos de segurança*.

        # ENTRADAS
        - Caminho do arquivo (se houver): (não identificado no upload)
        - Nome do sistema/projeto: ${projectName || "Não informado"}
        - Contexto adicional: ${context || "Não informado"}
        - Conteúdo do arquivo (texto/código completo):
        <<<CODE_OR_TEXT_START
        ${code}
        CODE_OR_TEXT_END>>>

        # COMO EXTRAIR (análise cética, baseada em evidências do conteúdo)
        1) *Propósito*: infira “o que resolve” em linguagem de negócio. Use nomes de classes/funções, endpoints, queries e eventos como pistas.
        2) *Regras principais*: liste normas de negócio implicadas (elegibilidade, políticas, cálculos, tolerâncias). Nomeie de forma curta (“Regra 1…”, “Regra 2…”).
        3) *Entradas/Saídas*: derive tipos/campos/unidades e pré/pós-condições. Prefira “contrato” a detalhes de implementação.
        4) *Decisões tomadas*: identifique escolhas relevantes (algoritmo, cache, consistência, arredondamento, idempotência) e a justificativa provável.
        5) *Conexões*: mapeie dependências externas (APIs, DB, filas, caches, feature flags), efeitos colaterais (evento X, tabela Y).
        6) *Segurança (risco)*: aponte riscos observáveis ou prováveis, classificando por **Probabilidade** e **Impacto** (Baixa/Média/Alta) com *evidências no arquivo*.
        7) *Exemplos*: proponha 1–3 casos simples coerentes com regras/contratos.
        8) *Observações finais*: riscos residuais, exceções e lacunas.

        # CONSTRANGIMENTOS
        - Seja objetivo e abrangente.
        - Não copie o código; *não explique função por função*.
        - Se algo não puder ser inferido, escreva “(não identificado no arquivo)”.
        - Produza somente o documento final; *não mostre suas etapas de raciocínio*.

        # SAÍDA — FORMATO OBRIGATÓRIO
        # Doc do Arquivo

        - *Sistema/Projeto:* ${projectName || "Não informado"}
        - *Contexto:* ${context || "Não informado"}
        - *Arquivo:* (não identificado no upload)
        - *Responsável:* (não identificado no arquivo)
        - *Última atualização:* ${new Date().toISOString().split("T")[0]}


        ## O que esse arquivo resolve?
        {{2–4 linhas com problema/resultado de negócio}}

        ## Regras principais
        - *Regra 1:* {{descrição objetiva}}
        - *Regra 2:* {{descrição objetiva}}
        - *Regra 3 (opcional):* {{…}}

        ## Como entra e como sai
        - *Entradas:* {{campos, tipos/unidades, pré-condições}}
        - *Saídas:* {{campos, tipos/unidades, pós-condições}}

        ## Decisões tomadas
        {{1–3 bullets com decisão + motivo (simplicidade/auditoria/desempenho/compatibilidade)}}

        ## Conexões com outros lugares
        - {{API/DB/fila/cache/flag}} — {{uso resumido}}
        - Efeitos colaterais: {{eventos/logs/escritas}} (se houver)

        ## Riscos de segurança (observados ou plausíveis)
        | Risco | Categoria | Evidência no arquivo | Prob. | Impacto | Mitigação sugerida |
        |------|-----------|----------------------|-------|---------|--------------------|
        | {{R1}} | {{ex.: Validação/Injection}} | {{onde/por quê}} | {{B/M/A}} | {{B/M/A}} | {{ação objetiva}} |
        | {{R2}} | {{ex.: AuthZ/IDOR}} | {{onde/por quê}} | {{B/M/A}} | {{B/M/A}} | {{ação objetiva}} |

        *Notas de segurança:*  
        - Dados sensíveis/PII: {{identificados?}}  
        - Segredos em código: {{sim/não}}  
        - Dependências críticas: {{lista curta se visível}}

        ## Exemplos de uso
        | Caso | Entrada | O que acontece | Resultado |
        |------|---------|----------------|-----------|
        | C1   | {{…}}   | {{Regra X}}    | {{…}}     |
        | C2   | {{…}}   | {{Regra Y}}    | {{…}}     |

        ## Observações finais
        - {{riscos/exceções residuais}}
        - {{lacunas conhecidas}}
        - {{ideias futuras}}

        # CHECK RÁPIDO
        - Propósito é de *negócio*, não “como o código faz”.
        - Regras são claras e acionáveis.
        - Entradas/Saídas têm *pré/pós-condições* quando possível.
        - Conexões e efeitos colaterais relevantes foram mapeados.
        - *Riscos de segurança* possuem evidência e *mitigação objetiva*.
        - Exemplos coerentes que podem virar testes.
        `;

const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash", 
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const text = response.output_text ?? response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return text.trim();
}
