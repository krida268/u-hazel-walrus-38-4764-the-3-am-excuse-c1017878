// The 3 AM Excuse — make.fun bounty entry.
// One line, in the voice of a hardware wallet refusing to sign at 3 AM.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "Denied. It's 3 AM and my secure element just filed a noise complaint against you.";

// Gate: 1 to 200 characters, UTF-8 text, not only whitespace.
// The joke turns on the hour itself: the secure element — the chip that
// holds the keys — treats a 3 AM signing request as a noise violation.
if (ENTRY.length < 1 || ENTRY.length > 200 || !ENTRY.trim()) {
  throw new Error(`entry length ${ENTRY.length} outside gate 1-200`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

const target = process.argv[2] ?? "/output";
const outPath = target.endsWith(".txt") ? target : join(target, "entry.txt");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${outPath} (${ENTRY.length} characters)`);
