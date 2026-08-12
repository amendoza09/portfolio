// Run by the "Update Goodreads Currently Reading" GitHub Action. Fetches the
// public "currently-reading" shelf RSS feed and writes it to
// src/data/goodreadsCurrentlyReading.json. No auth needed — Goodreads shelf
// RSS feeds are public for public profiles.

const fs = require("fs");
const path = require("path");

const GOODREADS_USER_ID = "174960982";
const FEED_URL = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=currently-reading`;

function extractTag(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`));
  return match ? match[1].trim() : "";
}

async function main() {
  const res = await fetch(FEED_URL);
  if (!res.ok) {
    throw new Error(`Goodreads feed fetch failed: ${res.status} ${await res.text()}`);
  }

  const xml = await res.text();
  const items = xml
    .split("<item>")
    .slice(1)
    .map((chunk) => chunk.split("</item>")[0]);

  const books = items.map((item) => ({
    title: extractTag(item, "title"),
    author: extractTag(item, "author_name"),
    image: extractTag(item, "book_large_image_url") || extractTag(item, "book_image_url"),
    link: extractTag(item, "link"),
  }));

  const outPath = path.join(__dirname, "..", "src", "data", "goodreadsCurrentlyReading.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(books, null, 2)}\n`);
  console.log(`Wrote ${books.length} books to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
