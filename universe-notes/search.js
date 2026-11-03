import { readFile } from "node:fs/promises";

const query = process.argv[2]?.trim();

if (!query) {
  console.error("Usage: npm run search -- <word>");
  process.exitCode = 1;
} else {
  const notes = JSON.parse(
    await readFile(new URL("./notes/keynote-highlights.json", import.meta.url), "utf8"),
  );
  const searchTerm = query.toLowerCase();

  for (const { topic, title, summary } of notes.highlights) {
    if (
      title.toLowerCase().includes(searchTerm) ||
      summary.toLowerCase().includes(searchTerm)
    ) {
      console.log(`${topic}: ${title}`);
      console.log(summary);
      console.log();
    }
  }
}
