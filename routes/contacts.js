const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');

// @route  POST api/contacts
// @desc   Adds a new contact
// @access Private
router.post('/', [auth,
        [
        check('name', 'Please add a name').notEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('phone', 'Phone number is invalid').isLength({min: 10})
    ]], 
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:'Invalid Name or Email or Phone!'});
    };

    const {name, email, phone, type} = req.body;
    try {
        let newContact = new Contact({
            user: req.user.id,
            name,
            email,
            phone,
            type
        });
        const contact = await newContact.save();
        res.status(201).json(contact);

   } catch (err) {
        console.error(err.message);
        res.status(500).json({error:'Internal Server Error!'});
   }
});

// @route  GET api/contacts
// @desc   Gets all user contacts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.status(200).json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error:'Internal Server Error!'});
    }
});

// @route  PUT api/contacts/:id
// @desc   Updates a contact
// @access Private
router.put('/:_id', auth, async (req, res) => {
    const contact = req.body;
     try {
         await Contact.findByIdAndUpdate(req.params._id, contact, function(err, response){
            if (err) throw err;
            res.status(200).json({response});
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error:'Internal Server Error!'});
    };
});

// @route  DELETE api/contacts/:id
// @desc   Deletes a contact
// @access Private
router.delete('/:_id', auth, async (req, res) => {
   try {
            await Contact.findByIdAndDelete(req.params._id, function(err, response){
            if (err) throw err;
            res.status(200).json({response});
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error:'Internal Server Error!'});
    };
});

module.exports = router;