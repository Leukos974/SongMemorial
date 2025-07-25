require('dotenv').config();
const fetch = require('node-fetch');


exports.handleSpotifyCallback = (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('Missing code');
  }
  // Redirige vers front en lui passant le code
  res.redirect(`http://localhost:5173/spotify/success?code=${code}`);
};


exports.exchangeToken = async (req, res) => {
  const { code, codeVerifier } = req.body;
  console.log('📩 Exchange token called with:', { code, codeVerifier });

  if (!code || !codeVerifier) {
    return res.status(400).json({ error: 'Missing code or codeVerifier' });
  }

  const payload = new URLSearchParams({
    client_id: process.env.SPOTIFY_ID,
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    code_verifier: codeVerifier,
  });
  
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Spotify responded with error:', errorData);
      return res.status(response.status).json({ error: errorData.error_description || 'Unknown error from Spotify' });
    }

    const data = await response.json();
    console.log('✅ Spotify token response:', data);

    return res.status(200).json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    });
  } catch (error) {
    console.error('❌ Exchange token fetch error:', error);
    return res.status(500).json({
      error: 'Token exchange failed',
      detail: error.message,
    });
  }
};