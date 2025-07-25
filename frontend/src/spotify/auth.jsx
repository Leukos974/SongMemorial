import { sha256 } from 'js-sha256';

const clientId = import.meta.env.VITE_SPOTIFY_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || 'http://localhost:3000/api/spotify/callback';

function generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }


const sha256_hash = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    // return window.crypto.subtle.digest('SHA-256', data)
    return sha256(data);
}


const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

export const getSpotifyAuthUrl = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = sha256.array(codeVerifier);
  const codeChallenge = base64encode(hashed);

  // Stocker le verifier dans localStorage
  localStorage.setItem('spotify_code_verifier', codeVerifier);

  const scope = 'playlist-modify-private playlist-modify-public user-read-private user-read-email';
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const params = {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};
