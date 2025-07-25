const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(session({
  secret: process.env.SPOTIFY_ID_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 10
  }
}));

const songRoutes = require('./routes/song.routes');
const peopleRoutes = require('./routes/people.routes');
const spotifyRoutes = require('./routes/spotify.routes');

app.use(cors());
app.use(express.json());

app.use('/api/songs', songRoutes);
app.use('/api/people', peopleRoutes);
app.use('/api/spotify', spotifyRoutes);

app.get('/', (req, res) => res.send('Backend is running'));

module.exports = app;
