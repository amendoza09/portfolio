// Run by the "Update Spotify Top 10" GitHub Action. Fetches the current
// top 10 tracks and writes them to src/data/spotifyTopTen.json.

require("dotenv").config();

const fs = require("fs");
const path = require("path");

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
  console.error("Missing SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, or SPOTIFY_REFRESH_TOKEN env vars.");
  process.exit(1);
}

async function getAccessToken() {
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.access_token;
}

async function getTopTracks(accessToken) {
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Top tracks fetch failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.items.map((track, index) => ({
    rank: index + 1,
    track: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    url: track.external_urls.spotify,
  }));
}

async function main() {
  const accessToken = await getAccessToken();
  const topTracks = await getTopTracks(accessToken);

  const outPath = path.join(__dirname, "..", "src", "data", "spotifyTopTen.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(topTracks, null, 2)}\n`);
  console.log(`Wrote ${topTracks.length} tracks to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
