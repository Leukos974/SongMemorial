import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from './pages/Home'

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddPerson from './pages/AddPerson';
import AddSong from './pages/AddSong';
import SpotifyCallback from './pages/SpotifyCallback';

function App() {
  return (
    <BrowserRouter>
      <h1>🎵 Song Memorial</h1>
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/add-person">Ajouter une personne</Link> | <Link to="/add-song">Ajouter une chanson</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-person" element={<AddPerson />} />
        <Route path="/add-song" element={<AddSong />} />
        <Route path="/spotify/success" element={<SpotifyCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App
