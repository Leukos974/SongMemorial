const express = require('express');
const router = express.Router();
const controller = require('../controllers/song.controller');

router.get('/', controller.getAllSongs);

router.post('/newSong', controller.createSong);

module.exports = router;
