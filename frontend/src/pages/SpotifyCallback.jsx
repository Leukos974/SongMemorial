import React, { useEffect, useState, useRef } from 'react';
import api from '../api/api';
import SpotifySuccess from '../spotify/success';

export default function SpotifyCallback() {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {

    if (hasRun.current)
      return;
    hasRun.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    window.history.replaceState({}, document.title, window.location.pathname);

    if (!code) {
      setMessage('⛔️ Code manquant dans l’URL.');
      return;
    }

    const codeVerifier = localStorage.getItem('spotify_code_verifier');
    if (!codeVerifier) {
      setMessage('⛔️ Code verifier introuvable dans le localStorage.');
      return;
    }

    // Ne pas relancer si déjà fait
    const codeUsed = sessionStorage.getItem('spotify_code_used');
    if (codeUsed) {
      setMessage('⚠️ Token réutilisé. Vous êtes déjà connecté');
      return;
    }

    api.post('/spotify/token', { code, codeVerifier })
    .then((res) => {
      const token = res?.data?.access_token;
      
        if (!token) {
          setMessage('❌ Aucun token reçu depuis le serveur.');
          return;
        }

        localStorage.setItem('spotify_access_token', token);
        sessionStorage.setItem('spotify_code_used', code);
        setSuccess(true);

      })
      .catch((err) => {
        console.error('❌ Erreur API /spotify/token :', err);
        setMessage('❌ Erreur lors de la connexion avec Spotify.');
      });
  }, []);

  if (message) return <p>{message}</p>;
  if (success) return <SpotifySuccess />;
  return <p>Connexion à Spotify en cours...</p>;
}