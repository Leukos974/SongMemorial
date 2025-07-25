const express = require('express');
const router = express.Router();

const spotifyController = require('../controllers/spotify.controller');

router.get('/callback', spotifyController.handleSpotifyCallback);
router.post('/token', spotifyController.exchangeToken);

module.exports = router;
