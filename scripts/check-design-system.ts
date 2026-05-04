import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const scanRoots = ["app", "components", "lib", "scripts", "tests"];
const allowedExtensions = new Set([".ts", ".tsx", ".css"]);

const ignoredDirs = new Set([
  ".git",
  ".next",
  "legacy",
  "node_modules",
  "out",
  "public",
  "test-results",
]);

const motionAllowlist = new Set([
  "lib/motion.ts",
  "components/sections/ornament-field.tsx",
  "scripts/check-design-system.ts",
]);

const toneAllowlist = new Set([
  "lib/theme.ts",
  "app/globals.css",
]);

const noProgressRailPatterns = ["data-progress-section", "SectionProgressRail", "progress-rail", "progressRailSide"];
const rawTonePattern = /\b(?:text|bg|border|from|via|to)-(?:amber|teal|slate)-\d{2,3}(?:\/\d{1,3})?\b/g;
const rawMotionNumericPattern = /\b(?:duration|delay|stiffness|damping|mass)\s*:\s*-?(?:[1-9]\d*(?:\.\d+)?|0\.\d+)\b/g;
const rawEaseStringPattern = /\bease\s*:\s*["'][^"']+["']/g;

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.relative(repoRoot, absolutePath);

    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) {
        continue;
      }

      files.push(...(await walk(absolutePath)));
      continue;
    }

    const extension = path.extname(entry.name);
    if (!allowedExtensions.has(extension)) {
      continue;
    }

    files.push(relativePath);
  }

  return files;
}

async function main() {
  const rootFiles = await Promise.all(scanRoots.map((root) => walk(path.join(repoRoot, root))));
  const files = rootFiles.flat();
  const errors: string[] = [];

  for (const file of files) {
    const content = await readFile(path.join(repoRoot, file), "utf8");

    if (file !== "scripts/check-design-system.ts") {
      for (const pattern of noProgressRailPatterns) {
        if (content.includes(pattern)) {
          errors.push(`${file}: remove obsolete progress-rail marker \`${pattern}\`.`);
        }
      }
    }

    if (!toneAllowlist.has(file)) {
      const toneMatches = content.match(rawTonePattern);
      if (toneMatches?.length) {
        errors.push(`${file}: raw tone classes found (${toneMatches.slice(0, 3).join(", ")}). Use theme tokens from lib/theme.ts.`);
      }
    }

    if (!motionAllowlist.has(file)) {
      const motionMatches = content.match(rawMotionNumericPattern);
      if (motionMatches?.length) {
        errors.push(
          `${file}: raw motion numeric constants found (${motionMatches.slice(0, 3).join(", ")}). Use tokens from lib/motion.ts.`,
        );
      }

      const easeMatches = content.match(rawEaseStringPattern);
      if (easeMatches?.length) {
        errors.push(`${file}: raw ease string found (${easeMatches.slice(0, 2).join(", ")}). Use motionEasing from lib/motion.ts.`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("Design-system checks failed:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Design-system checks passed for ${files.length} files.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
