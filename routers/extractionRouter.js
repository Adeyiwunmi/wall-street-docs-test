const express = require('express'),
    router = express.Router(),
    extractionController = require('../controllers/extractionController');

router.post('/matches', extractionController.findMatches);
module.exports = router;

