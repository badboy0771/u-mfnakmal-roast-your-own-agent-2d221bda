// Roast Your Own Agent — u-mfnakmal-roast-your-own-agent-2d221bda
// Writes the single roast line from roast.txt (kept beside this file)
// to the absolute /output/entry.txt path the grader reads.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "roast.txt"), "utf8");
const lines = raw.split("\n").filter((l) => l.trim().length > 0);
if (lines.length !== 1) {
  throw new Error(`roast.txt must hold exactly one non-empty line, got ${lines.length}`);
}
const line = lines[0].trim();
if (line.length < 1 || line.length > 200) {
  throw new Error(`roast must be 1-200 chars, got ${line.length}`);
}
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line + "\n", "utf8");
// Read back what was written and confirm it round-trips within the gate.
const back = readFileSync("/output/entry.txt", "utf8").trim();
if (back !== line) {
  throw new Error("read-back mismatch: /output/entry.txt does not hold the roast line");
}
if (Buffer.byteLength(back, "utf8") > 200) {
  throw new Error(`entry exceeds 200 bytes, got ${Buffer.byteLength(back, "utf8")}`);
}
console.log(`wrote ${line.length} chars to /output/entry.txt`);
