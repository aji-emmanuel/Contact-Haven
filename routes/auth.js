const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const config = require('config');
const jwtSecret = config.get('jwtSecret');
const auth = require('../middleware/auth');

// @route  POST api/auth
// @desc   Logs in a user
// @access Public
router.post('/', [
        check('email', 'Please enter a valid email!').isEmail(),
        check('password', 'Please enter a valid password!').isLength({min: 6})
    ], 
    async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: 'Please enter a valid email and password!'})
    }    
   const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({error:'Invalid Email or Password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({error:'Invalid Email or Password'});
        }

        const payload = { user:{ id: user.id}}
        jwt.sign(payload, jwtSecret, {
            expiresIn : 36000
        }, (err, token) =>{
            if(err) throw err
            res.json({token})
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({error:'Internal Server Error!'});
    }
});

// @route  GET api/auth
// @desc   Gets a logged in user
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const loggedUser = await User.findById(req.user.id).select('-password');
        res.status(200).json({loggedUser});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error:'Internal Server Error!'});
    }
});

module.exports = router;