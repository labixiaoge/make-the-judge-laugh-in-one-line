// Make the Judge Laugh in One Line — make.fun bounty
// u-email-baru-make-the-judge-laugh-in-one-line-791ccb21
//
// Writes a single line of text (1-200 characters) to /output/entry.txt:
// one funny line, on any topic, built to make the judge laugh.
// Deterministic: the line is a fixed string; the program only validates
// its length and writes it out, so every run produces byte-identical output.
//
// Run: node main.ts [--output <dir>]

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MIN_CHARS = 1;
const MAX_CHARS = 200;
const ENTRY_FILE = "entry.txt";

// Output dir: --output <dir> wins, then $OUTPUT_DIR, then /output.
function resolveOutputDir(argv: string[]): string {
  const flag = argv.indexOf("--output");
  if (flag !== -1 && argv[flag + 1]) {
    return argv[flag + 1];
  }
  return process.env.OUTPUT_DIR ?? "/output";
}

const OUTPUT_DIR = resolveOutputDir(process.argv.slice(2));

const LINE =
  "I told my reflection we were doing great and it looked away — even my mirror has stopped pretending.";

// Count Unicode code points (not UTF-16 units) so the 1-200 character
// limit is measured the way a reader sees it.
function countChars(text: string): number {
  return [...text].length;
}

// The competition wants exactly one line: no newlines, no blank entry,
// and a length inside [MIN_CHARS, MAX_CHARS].
function validateLine(text: string): number {
  const chars = countChars(text);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  return chars;
}

function main(): void {
  const chars = validateLine(LINE);
  const outFile = join(OUTPUT_DIR, ENTRY_FILE);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(outFile, LINE, "utf8");
  console.log(`wrote ${chars} chars to ${outFile}`);
  console.log(LINE);
}

main();
