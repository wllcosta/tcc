// Vercel Serverless Function to proxy Gemini requests without exposing the API key
import { generateDocumentation } from "../server/generate.js";

function sendJson(res: any, status: number, data: any) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.end(JSON.stringify(data));
}

export default async function handler(req: any, res: any) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.end();
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;

    // Parse raw body as JSON
    const chunks: any[] = [];
    await new Promise<void>((resolve, reject) => {
      req.on("data", (c: any) => chunks.push(c));
      req.on("end", () => resolve());
      req.on("error", reject);
    });
    let parsed: any = {};
    try {
      const raw = Buffer.concat(chunks).toString("utf8");
      parsed = raw ? JSON.parse(raw) : {};
    } catch {
      return sendJson(res, 400, { error: "Invalid JSON" });
    }

    const { projectName, context, code } = parsed;
    try {
      const text = await generateDocumentation({ projectName, context, code, apiKey });
      return sendJson(res, 200, { text });
    } catch (e: any) {
      if (e?.code === 'BAD_REQUEST') {
        return sendJson(res, 400, {
          error:
            "Campos obrigatórios ausentes: informe o nome do projeto e contexto ou código.",
        });
      }
      if (String(e?.message || '').includes('Missing GOOGLE_API_KEY')) {
        return sendJson(res, 500, { error: "Missing GOOGLE_API_KEY on server" });
      }
      throw e;
    }
  } catch (error: any) {
    console.error("/api/generate error:", error);
    return sendJson(res, 500, { error: "Falha ao gerar a documentação." });
  }
}
