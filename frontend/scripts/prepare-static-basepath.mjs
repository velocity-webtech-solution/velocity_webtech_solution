import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { basename, join } from "node:path";

const basePath = "velocity_webtech_solution";
const outputDir = join(process.cwd(), "out");
const basePathDir = join(outputDir, basePath);

if (!existsSync(outputDir)) {
  throw new Error("Static export folder not found. Run next build first.");
}

rmSync(basePathDir, { recursive: true, force: true });
mkdirSync(basePathDir, { recursive: true });

for (const entry of readdirSync(outputDir, { withFileTypes: true })) {
  if (entry.name === basePath) {
    continue;
  }

  cpSync(join(outputDir, entry.name), join(basePathDir, entry.name), {
    recursive: true,
  });
}

console.log(`Prepared static export for /${basename(basePathDir)}/`);
