import React, { useEffect, useState } from 'react';
import getSpotifyProfile from '../spotify/spotifyApi'

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getSpotifyProfile()
      .then(data => setProfile(data))
      .catch(err => console.error('Erreur Spotify:', err));
  }, []);

  if (!profile) return <div>Chargement du profil...</div>;

  return (
    <div>
      <h2>Bienvenue, {profile.display_name} 👋</h2>
      <p>Email : {profile.email}</p>
      <img src={profile.images?.[0]?.url} alt="avatar" width="100" />
    </div>
  );
}

export default Profile;