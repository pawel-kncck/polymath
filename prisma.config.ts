// dotenv is a devDependency. In production (Docker runner), env vars are
// injected by Coolify, so we don't need to load a .env file. The full
// node_modules overlay in the Dockerfile does include dotenv, but this guard
// keeps things safe if the image is ever slimmed down.
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("dotenv/config");
}
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
