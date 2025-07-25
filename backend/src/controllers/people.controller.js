const pool = require('../config/db');
const serializeBigInts = require('../config/utils');

exports.getAllPeople = async (req, res) => {
  try {
    const people = await pool.query('SELECT * FROM people');
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPerson = async (req, res) => {
  console.log("Creating a someone....");
  const { name, birthdate, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const result = await pool.query(
      'INSERT INTO people (name, birthdate, description) VALUES (?, ?, ?)',
      [name, birthdate, description]
    );
    res.status(201).json(serializeBigInts({ id: result.insertId }));
  } catch (err) {
    console.error('Erreur SQL:', err);
    res.status(500).json({ error: err.message });
  }
};
