import React, { useEffect, useState } from 'react';
import axios from '../api/api';

export default function AddSong() {
  const [form, setForm] = useState({ title: '', artist: '', url: '', person_id: '' });
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get('/people').then(res => setPeople(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/songs/newSong', form);
      alert('Chanson ajoutée !');
    } catch (err) {
      alert('Erreur : ' + err.message);
    }
  };

  return (
    <div>
      <h1>Ajouter une chanson</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Titre" onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Artiste" onChange={e => setForm({ ...form, artist: e.target.value })} />
        <input placeholder="URL" onChange={e => setForm({ ...form, url: e.target.value })} />
        <select onChange={e => setForm({ ...form, person_id: e.target.value })}>
          <option value="">-- Choisir une personne --</option>
          {people.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
