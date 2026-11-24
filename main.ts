// main.ts — Two Days of Quiet Dread entry.
//
// Reads entry.txt next to this file and writes it to
// $MAKEFUN_OUTPUT_DIR/entry.txt (or ./out/entry.txt when the env var
// is not set). The entry must stay within the 1-140 character gate
// (a single line approving a PR with quiet existential dread).
// A small guard below fails fast if entry.txt is empty or over the
// 140-character limit, so a broken entry is never copied to output.
// Paths are resolved via import.meta.url so the program works no
// matter which directory the grader runs it from. stdout stays
// empty: nothing is printed.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "entry.txt"), "utf8");
if (entry.trim().length === 0 || entry.length > 140) {
  throw new Error("entry.txt must be 1-140 characters");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry);
