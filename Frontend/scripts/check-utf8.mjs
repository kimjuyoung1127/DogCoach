import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const decoder = new TextDecoder("utf-8", { fatal: true });

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".css",
  ".scss",
  ".html",
  ".yml",
  ".yaml",
  ".txt",
  ".env",
]);

const IGNORE_DIRS = new Set([
  ".next",
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
]);

const rootDir = process.cwd();
const invalidFiles = [];

function walk(dirPath) {
  const entries = readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    const relativePath = fullPath.slice(rootDir.length + 1);

    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        walk(fullPath);
      }
      continue;
    }

    const ext = extname(entry.name).toLowerCase();
    if (!TEXT_EXTENSIONS.has(ext)) continue;

    const stat = statSync(fullPath);
    if (stat.size === 0) continue;

    const bytes = readFileSync(fullPath);
    try {
      decoder.decode(bytes);
    } catch {
      invalidFiles.push(relativePath);
    }
  }
}

walk(rootDir);

if (invalidFiles.length > 0) {
  console.error("Invalid UTF-8 files detected:");
  for (const file of invalidFiles) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log("UTF-8 check passed.");
