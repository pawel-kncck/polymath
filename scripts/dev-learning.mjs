import { randomBytes } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { resolve } from "node:path";

// A database-free, localhost-only preview. These defaults are never persisted
// and the preview page itself returns 404 in a production build.
const subject = process.argv[2] === "biology" ? "biology" : "geography";
const port = process.env.PORT || "3000";
if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535) {
  throw new Error("PORT must be between 1 and 65535");
}
const env = {
  ...process.env,
  NODE_ENV: "development",
  AUTH_SECRET: process.env.AUTH_SECRET || randomBytes(32).toString("hex"),
  AUTH_URL: `http://127.0.0.1:${port}`,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://preview:preview@127.0.0.1:5432/polymath_preview",
};
const generated = spawnSync(
  process.execPath,
  [resolve("node_modules/prisma/build/index.js"), "generate"],
  { env, stdio: "inherit" },
);
if (generated.status !== 0) process.exit(generated.status ?? 1);
console.log(`${subject} preview: http://127.0.0.1:${port}/dev/${subject}`);
const server = spawn(
  process.execPath,
  [
    resolve("node_modules/next/dist/bin/next"),
    "dev",
    "--hostname",
    "127.0.0.1",
    "--port",
    port,
  ],
  { env, stdio: "inherit" },
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.kill(signal));
server.on("exit", (code) => process.exit(code ?? 0));
