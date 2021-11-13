const express = require('express');
const router = express.Router();

// @route  POST api/auth
// @desc   Logs in a user
// @access Public
router.post('/', (req, res) => {
    res.send('Logs in a user');
});

// @route  GET api/auth
// @desc   Gets a logged in user
// @access Public
router.get('/', (req, res) => {
    res.send('Gets a logged in user and token');
});

module.exports = router;