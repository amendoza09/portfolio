// One-time local helper to obtain a Spotify refresh token.
//
// 1. Create an app at https://developer.spotify.com/dashboard and add the
//    redirect URI below (or set SPOTIFY_REDIRECT_URI to match one you add).
// 2. Run:
//      SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-get-tokens.js
//    Visit the printed URL, log in, and approve access.
// 3. The redirect will land on a page that fails to load — that's expected.
//    Copy the `code` value from the browser's address bar, then run:
//      SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy SPOTIFY_AUTH_CODE=zzz node scripts/spotify-get-tokens.js
// 4. Save the printed refresh token as the SPOTIFY_REFRESH_TOKEN GitHub secret.

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI, SPOTIFY_AUTH_CODE } = process.env;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.");
  process.exit(1);
}

const redirectUri = SPOTIFY_REDIRECT_URI || "http://127.0.0.1:8888/callback";

async function main() {
  if (!SPOTIFY_AUTH_CODE) {
    const url = new URL("https://accounts.spotify.com/authorize");
    url.searchParams.set("client_id", SPOTIFY_CLIENT_ID);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("scope", "user-top-read");

    console.log("1. Make sure this exact redirect URI is registered on your Spotify app:");
    console.log(`   ${redirectUri}`);
    console.log("\n2. Visit this URL, log in, and approve access:\n");
    console.log(url.toString());
    console.log("\n3. You'll land on a page that fails to load — that's fine.");
    console.log("   Copy the `code` value from the browser's address bar, then rerun with:");
    console.log(`   SPOTIFY_AUTH_CODE="<code>" node scripts/spotify-get-tokens.js\n`);
    return;
  }

  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: SPOTIFY_AUTH_CODE,
      redirect_uri: redirectUri,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Token exchange failed:", data);
    process.exit(1);
  }

  console.log("\nSave this as the SPOTIFY_REFRESH_TOKEN GitHub secret:\n");
  console.log(data.refresh_token);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
