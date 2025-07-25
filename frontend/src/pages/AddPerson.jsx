import React, { useState } from 'react';
import axios from '../api/api';

export default function AddPerson() {
  const [form, setForm] = useState({ name: '', birthdate: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/people/newPeople', form);
      alert('Personne ajoutée !');
    } catch (err) {
      alert('Erreur : ' + err.message);
    }
  };

  return (
    <div>
      <h1>Ajouter une personne</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nom" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input type="date" onChange={e => setForm({ ...form, birthdate: e.target.value })} />
        <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
