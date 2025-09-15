// api/generate.ts
import { IncomingMessage, ServerResponse } from "http";
import { generateDocumentation } from "../server/generate.js";

type JsonData = Record<string, unknown>;

function sendJson(res: ServerResponse, status: number, data: JsonData) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.end(JSON.stringify(data));
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
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
    const chunks: Uint8Array[] = [];
    await new Promise<void>((resolve, reject) => {
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => resolve());
      req.on("error", reject);
    });

    let parsed: { projectName?: string; context?: string; code?: string } = {};
    try {
      const raw = Buffer.concat(chunks).toString("utf8");
      parsed = raw ? JSON.parse(raw) : {};
    } catch {
      return sendJson(res, 400, { error: "Invalid JSON" });
    }

    const { projectName, context, code } = parsed;

    try {
      const text = await generateDocumentation({
        projectName,
        context,
        code,
        apiKey,
      });
      return sendJson(res, 200, { text });
    } catch (e: unknown) {
      interface ErrorWithCode extends Error {
        code?: string;
      }

      if ((e as ErrorWithCode).code === "BAD_REQUEST") {
        return sendJson(res, 400, {
          error:
            "Campos obrigatórios ausentes: informe o nome do projeto e contexto ou código.",
        });
      }

      if (e instanceof Error && e.message.includes("Missing GOOGLE_API_KEY")) {
        return sendJson(res, 500, {
          error: "Missing GOOGLE_API_KEY on server",
        });
      }
    }
  } catch (error) {
    console.error("/api/generate error:", error);
    return sendJson(res, 500, { error: "Falha ao gerar a documentação." });
  }
}
