# **Documenta Aí – Projeto de TCC**

## 📌 Sobre o projeto
O **Documenta Aí** é um sistema desenvolvido como Trabalho de Conclusão de Curso (TCC) com o objetivo de **automatizar a documentação de código**.  
Ele utiliza inteligência artificial para gerar comentários técnicos, guias e documentação de forma rápida, padronizada e profissional, economizando tempo dos desenvolvedores.

---

## 🌐 Acesse o projeto
🔗 [Clique aqui para acessar o Documenta Aí](https://documenta-ai-theta.vercel.app/)  

---

## 🚀 Funcionalidades
- 📄 **Documentação Automática**: Geração de comentários e guias técnicos sem esforço manual.  
- ⚡ **Rápido e Eficiente**: Documentação pronta em minutos.  
- 🧠 **IA Inteligente**: Analisa o código e gera explicações contextuais e relevantes.  
- 🎯 **Profissionalismo**: Exportação com formatação clara e padronizada.  
- 🌍 **Suporte Multilíngue**: Funciona em diferentes linguagens de programação.  

---

## 🛠️ Tecnologias utilizadas
- **React** (com Vite e TypeScript)  
- **Tailwind CSS** (estilização)  
- **Shadcn-UI** (componentes)  

---

## 🔐 Como Protegemos a Chave da IA
- **Arquitetura**: o cliente React não acessa diretamente a API da Google. Ele chama a rota `/api/generate`, que roda no servidor.
- **Produção (Vercel)**: a rota é implementada em `api/generate.ts`. A chave é lida de `process.env.GOOGLE_API_KEY` e nunca vai para o navegador.
- **Desenvolvimento Local**: para simplificar testes, rodamos um servidor local leve em `scripts/local-api.mjs` expondo a mesma rota `/api/generate`. Ambos (prod e dev) compartilham a lógica central em `server/generate.js`.
- **Segredos**: defina `GOOGLE_API_KEY` apenas no servidor (Vercel ou `.env.local`). Nunca use prefixo `VITE_` para segredos.

Arquivos relevantes (clique para abrir):
- `src/components/DocumentationForm.tsx`
- `api/generate.ts`
- `server/generate.js`
- `scripts/local-api.mjs`
- `vite.config.ts`
- `vercel.json`

---

## ⚙️ Configuração Rápida
- **Variáveis**: copie `.env.example` para `.env.local` e preencha `GOOGLE_API_KEY`.
- **Ignorar segredos**: `.env` e `.env.*` estão no `.gitignore`.
- **Dependências**: `npm install`

---

## 💻 Desenvolvimento Local
- **Iniciar**: `npm run dev:local`
  - Sobe o Vite em `http://localhost:8080`.
  - Sobe a API local em `http://localhost:3000/api/generate`.
  - O Vite já proxia `/api` → `:3000` (veja `vite.config.ts`).
- **Testar via navegador**: use o app em `http://localhost:8080` normalmente.
- **Testar via Postman/curl**:
  - URL: `http://localhost:3000/api/generate` (ou `http://localhost:8080/api/generate` via proxy)
  - Método: `POST`
  - Headers: `Content-Type: application/json`
  - Body JSON exemplo:
    `{ "projectName": "Demo", "context": "Resumo...", "code": "function x(){return 1}" }`

---

## 🚀 Deploy na Vercel
- **Project Settings → Environment Variables**: adicione `GOOGLE_API_KEY` (Production / Preview / Development conforme necessário).
- **Framework Preset**: Vite (detectado automaticamente).
- **Arquivo de rotas**: `vercel.json` mantém `/api/*` (rewrites). Não há bloco `functions` para evitar conflitos de runtime legados.
- **Endpoint de produção**: `POST https://SEU-PROJ.vercel.app/api/generate`.

---

## 🔗 Contrato da API (`/api/generate`)
- **Método**: `POST`
- **Request JSON**:
  - `projectName: string` (obrigatório)
  - `context: string` (opcional)
  - `code: string` (opcional; um entre `context` ou `code` deve existir)
- **Responses**:
  - `200`: `{ text: string }` com a documentação gerada
  - `400`: `{ error: string }` campos obrigatórios ausentes/JSON inválido
  - `405`: `{ error: string }` método não permitido
  - `500`: `{ error: string }` erro interno ou falta de `GOOGLE_API_KEY`

---

## 🧩 Lógica Compartilhada da IA
- **Módulo único**: `server/generate.js` expõe `generateDocumentation({ projectName, context, code, apiKey })`.
- **Uso**:
  - Produção: `api/generate.ts` importa e usa o mesmo módulo.
  - Dev local: `scripts/local-api.mjs` importa e usa o mesmo módulo.
- Vantagem: um único ponto para ajustar o prompt/modelo, mantendo produção e dev sincronizados.
- Guia completo de como editar o prompt: veja `docs/prompt.md`.

---

## 🧪 Exemplos de Teste (curl)
- Sucesso:
  - `curl -X POST http://localhost:3000/api/generate -H "Content-Type: application/json" -d '{"projectName":"Demo","context":"A","code":"function x(){return 1}"}'`
- Produção:
  - `curl -X POST https://SEU-PROJ.vercel.app/api/generate -H "Content-Type: application/json" -d '{"projectName":"Demo","context":"A","code":"function x(){return 1}"}'`

---

## 🛡️ Por Que Isso é Seguro?
- O token fica somente no servidor (variável de ambiente) e nunca é empacotado pelo Vite.
- O cliente chama apenas `/api/generate`.
- Recomendado restringir a chave no console da Google (domínios permitidos e escopos).

---

## ❗ Erros Comuns e Soluções
- **405 Method Not Allowed**: use `POST`.
- **400 Invalid JSON**: verifique o corpo e o header `Content-Type`.
- **500 Missing GOOGLE_API_KEY**: defina a env na Vercel ou em `.env.local` no dev.
- **ECONNREFUSED :3000 no dev**: inicie `npm run dev:local`. Se a porta 3000 estiver ocupada, libere-a ou ajuste `scripts/local-api.mjs` e o proxy do `vite.config.ts`.
- **Erro de runtime legado na Vercel**: mantenha `vercel.json` sem o bloco `functions` para evitar o formato antigo.

## 👨‍💻 Autores
Projeto desenvolvido por **Willian Desplanches Costa e Isabelle Nunes da Silva** como parte do Trabalho de Conclusão de Curso – 2025.  

---

## 📜 Licença
© 2025 Documenta Aí. Todos os direitos reservados.  
