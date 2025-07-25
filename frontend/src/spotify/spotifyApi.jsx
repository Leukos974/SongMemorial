async function getSpotifyProfile() {
    const token = localStorage.getItem('spotify_access_token');
    if (!token)
        throw new Error('Missing token in GetProfile');

    const res = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error.message || 'Spotify API Error');
    }

    return res.json();
}

export default getSpotifyProfile;