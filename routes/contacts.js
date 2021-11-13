const express = require('express');
const router = express.Router();

// @route  POST api/contacts
// @desc   Adds a new contact
// @access Private
router.post('/', (req, res) => {
    res.send('Adds a new contact');
});

// @route  GET api/contacts
// @desc   Gets all user contacts
// @access Private
router.get('/', (req, res) => {
    res.send('Gets all user contacts');
});

// @route  PUT api/contacts/:id
// @desc   Updates a contact
// @access Private
router.put('/:id', (req, res) => {
    res.send('Updates a contact');
});

// @route  DELETE api/contacts/:id
// @desc   Deletes a contact
// @access Private
router.delete('/:id', (req, res) => {
    res.send('Deletes a contact');
});

module.exports = router;