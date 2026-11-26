// Make the Judge Laugh in One Line — make.fun bounty
// u-email-baru-make-the-judge-laugh-in-one-line-791ccb21
//
// Writes a single line of text (1-200 characters) to /output/entry.txt:
// one funny line, on any topic, built to make the judge laugh.
// Deterministic: the line is a fixed string; the program only validates
// its length and writes it out, so every run produces byte-identical output.
//
// Run: node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

const LINE =
  "I told my reflection we were doing great and it looked away — even my mirror has stopped pretending.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");
console.log(`wrote ${chars} chars to ${join(OUTPUT_DIR, "entry.txt")}`);
console.log(LINE);
