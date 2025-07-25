import React, { useEffect, useState } from 'react';

import api from '../api/api';

import { getSpotifyAuthUrl } from '../spotify/auth.jsx';

const handleSpotifyLogin = () => {
  getSpotifyAuthUrl();
};

export default function Home() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    api.get('/songs')
      .then(res => setSongs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={handleSpotifyLogin}>Se connecter à Spotify</button>
      {songs.map(song => (
        <div key={song.id}>
          <p><strong>{song.title}</strong> – {song.artist}</p>
          <p><em>Pour : {song.person_name}</em></p>
        </div>
      ))}
    </div>
  );
}
