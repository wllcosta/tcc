import "dotenv/config";
import { IncomingMessage, ServerResponse } from "http";
import { generateDocumentation } from "../server/generate.js";

interface GenerateRequestBody {
  projectName?: string;
  context?: string;
  code?: string;
}

function sendJsonResponse(res: ServerResponse, status: number, data: object) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
}

async function parseBody(req: IncomingMessage): Promise<string> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (req.method === "OPTIONS") {
    return sendJsonResponse(res, 204, {});
  }

  if (req.method !== "POST") {
    return sendJsonResponse(res, 405, { error: "Método não permitido" });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error("ERRO: GOOGLE_API_KEY não encontrada no process.env");
      throw new Error("Missing GOOGLE_API_KEY");
    }

    const rawBody = await parseBody(req);
    const parsed: GenerateRequestBody = rawBody ? JSON.parse(rawBody) : {};
    const { projectName, context, code } = parsed;

    const text = await generateDocumentation({
      projectName,
      context,
      code,
      apiKey,
    });

    return sendJsonResponse(res, 200, { text });
  } catch (error: unknown) {
    console.error("Erro detalhado na API:", error);

    if (error instanceof Error) {
      const customError = error as Error & { code?: string };

      if (
        customError.code === "BAD_REQUEST" ||
        error.message.includes("missing")
      ) {
        return sendJsonResponse(res, 400, {
          error: "Campos obrigatórios ausentes: informe o projeto e o código.",
        });
      }

      if (error.message.includes("Missing GOOGLE_API_KEY")) {
        return sendJsonResponse(res, 500, {
          error: "Configuração de API Key ausente no servidor.",
        });
      }
    }

    return sendJsonResponse(res, 500, {
      error:
        "Falha interna ao processar a documentação. Verifique o console do servidor.",
    });
  }
}
