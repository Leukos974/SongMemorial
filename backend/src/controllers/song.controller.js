const pool = require('../config/db');
const serializeBigInts = require('../config/utils');

exports.getAllSongs = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.id, s.title, s.artist, s.url, s.created_at,
             p.id AS person_id, p.name AS person_name
      FROM songs s
      JOIN people p ON s.person_id = p.id
    `);
    console.log(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSong = async (req, res) => {
  console.log("Adding a song...");
  const { title, artist, url, person_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO songs (title, artist, url, person_id) VALUES (?, ?, ?, ?)',
      [title, artist, url, person_id]
    );
    res.status(201).json(serializeBigInts({ id: result.insertId }));
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
