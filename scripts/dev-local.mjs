import { spawn } from "node:child_process";

function run(cmd, args, name) {
  const child = spawn(cmd, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  child.on("error", (err) => {
    if (err.code === "ENOENT" && name === "vercel") {
      console.log("[dev-local] vercel CLI não encontrada. Tentando via npx...");
      const npx = process.platform === "win32" ? "npx.cmd" : "npx";
      const alt = spawn(npx, ["vercel", "dev", "--listen", "3000"], {
        stdio: "inherit",
        shell: true,
      });
      child.pid = alt.pid;
    } else {
      console.error(`[dev-local] Erro ao iniciar ${name}:`, err.message);
      process.exit(1);
    }
  });

  return child;
}

const nodeCmd = process.platform === "win32" ? "node.exe" : "node";
const api = run(nodeCmd, ["scripts/local-api.mjs"], "local-api");

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
const vite = spawn(npmCmd, ["run", "dev"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

let exiting = false;
function shutdown(code = 0) {
  if (exiting) return;
  exiting = true;
  if (vite && vite.pid) {
    try {
      vite.kill("SIGTERM");
    } catch {}
  }
  if (api && api.pid) {
    try {
      api.kill("SIGTERM");
    } catch {}
  }
  process.exit(code);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

vite.on("exit", (code) => {
  console.log(`[dev-local] vite finalizado com código ${code}`);
  shutdown(code || 0);
});
api.on("exit", (code) => {
  console.log(`[dev-local] local-api finalizado com código ${code}`);
  shutdown(code || 0);
});

console.log("[dev-local] Iniciando: local API (3000) + vite (8080)");
console.log("[dev-local] Acesse http://localhost:8080 (proxy /api -> :3000)");
