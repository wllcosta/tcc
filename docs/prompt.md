**Visão Geral**
- Este guia explica como editar o prompt usado para gerar a documentação de código e por que usamos JavaScript (`.js`) no módulo compartilhado.
- Arquivo principal: `server/generate.js`

**Onde Editar**
- Abra `server/generate.js:1` e localize a função `generateDocumentation({ projectName, context, code, apiKey })`.
- O prompt é montado na constante `prompt` dentro dessa função.

**Como Atualizar o Prompt**
- Ajuste o texto da variável `prompt` para refletir o tom, o nível de detalhe e a estrutura desejados.
- Exemplo de alterações úteis:
  - Incluir seções fixas (Resumo, Como funciona, Principais funções, Limitações)
  - Pedir bullets curtos e títulos em maiúsculas
  - Solicitar linguagem mais simples ou mais técnica
- Após editar, salve e teste:
  - Local: `npm run dev:local` e faça `POST http://localhost:3000/api/generate`
  - Produção: `POST https://SEU-PROJ.vercel.app/api/generate`

**Boas Práticas de Prompt**
- Seja específico sobre o objetivo e o formato da resposta.
- Evite pedir descrição linha a linha; foque em propósito e fluxos principais.
- Peça concisão primeiro; aumente a verbosidade apenas quando necessário.
- Mantenha o idioma consistente (ex.: português).

**Trocar o Modelo**
- O modelo é definido em `getGenerativeModel({ model: 'gemini-1.5-flash' })` dentro de `server/generate.js:1`.
- Possíveis valores (dependem do acesso da sua conta): `gemini-1.5-flash`, `gemini-1.5-pro`, etc.
- Modelos mais fortes custam mais e podem responder mais devagar.

**Por Que `server/generate.js` é JavaScript e não TypeScript?**
- **Compatibilidade direta**: o mesmo módulo é consumido por dois contextos distintos sem transpilar: a função serverless (`api/generate.ts`, que roda via Vercel) e o servidor local (`scripts/local-api.mjs`, Node ESM). Em JS puro evitamos ajustes de build, tsconfig e path aliases para o runtime local.
- **Menos atrito no dev**: não precisamos de um passo de compilação separado para os scripts de desenvolvimento local, mantendo o fluxo `npm run dev:local` simples e rápido.
- **Tipagem onde importa**: o restante do app é TypeScript (React/Vite). Nesta camada fina de servidor, os ganhos de TS não compensam a complexidade extra no ambiente misto (Serverless + Node ESM) durante o desenvolvimento.

Se desejar migrar para TypeScript no futuro:
- Crie um passo de build para `server/` (ex.: `tsup` ou `tsc -p` dedicado) e referencie os arquivos compilados em `api/` e `scripts/`.
- Ajuste imports ESM/CJS conforme o destino (Vercel/Node) para manter compatibilidade.

**Checklist de Teste após editar o prompt**
- [ ] Local: `npm run dev:local` inicia sem erros.
- [ ] POST local retorna `200` com campo `text`.
- [ ] Deploy na Vercel finaliza sem erros de build.
- [ ] Produção responde `200` e o texto reflete as mudanças do prompt.

