const express = require('express');
const router = express.Router();
const controller = require('../controllers/people.controller');

router.get('/', controller.getAllPeople);
router.post('/newPeople', controller.createPerson);

module.exports = router;
