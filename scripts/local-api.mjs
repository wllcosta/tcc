import http from "node:http";
import { URL } from "node:url";
import fs from "node:fs";
import path from "node:path";
import { generateDocumentation } from "../server/generate.js";

function loadEnv() {
  const env = { ...process.env };
  const files = [".env"];
  for (const file of files) {
    try {
      const p = path.resolve(process.cwd(), file);
      if (!fs.existsSync(p)) continue;
      const content = fs.readFileSync(p, "utf8");
      for (const line of content.split(/\r?\n/)) {
        if (!line || line.trim().startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq === -1) continue;
        const key = line.slice(0, eq).trim();
        let val = line.slice(eq + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (!(key in env)) env[key] = val;
      }
    } catch {}
  }
  return env;
}

const ENV = loadEnv();
const PORT = Number(process.env.PORT || 3000);

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
}

function notFound(res) {
  sendJson(res, 404, { error: "Not found" });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);

    if (req.method === "OPTIONS") {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      });
      return res.end();
    }

    if (url.pathname !== "/api/generate") {
      return notFound(res);
    }
    if (req.method !== "POST") {
      return sendJson(res, 405, { error: "Method not allowed" });
    }

    const apiKey = ENV.GOOGLE_API_KEY;
    if (!apiKey) {
      return sendJson(res, 500, {
        error: "Missing GOOGLE_API_KEY for local server",
      });
    }

    const chunks = [];
    let size = 0;
    await new Promise((resolve, reject) => {
      req.on("data", (c) => {
        size += c.length;
        if (size > 1_000_000) {
          reject(new Error("Payload too large"));
          req.destroy();
          return;
        }
        chunks.push(c);
      });
      req.on("end", resolve);
      req.on("error", reject);
    });

    let body = {};
    try {
      body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    } catch {
      return sendJson(res, 400, { error: "Invalid JSON" });
    }

    const { projectName, context, code } = body;
    if (!projectName || (!context && !code)) {
      return sendJson(res, 400, {
        error: "Informe projectName e contexto ou code.",
      });
    }

    const text = await generateDocumentation({
      projectName,
      context,
      code,
      apiKey,
    });
    return sendJson(res, 200, { text });
  } catch (err) {
    console.error("[local-api] error:", err);
    return sendJson(res, 500, { error: "Falha ao gerar a documentação" });
  }
});

server.listen(PORT, () => {
  console.log(`[local-api] Listening on http://localhost:${PORT}`);
});
