import React, { useState } from 'react';
import Profile from "../pages/Profile";

export default function   Success() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <h4>Connexion à Spotify réussie</h4>

      <button onClick={() => setShowProfile(true)}>
        Show Spotify Profile
      </button>

      {showProfile && <Profile />}
    </div>
  );
}
