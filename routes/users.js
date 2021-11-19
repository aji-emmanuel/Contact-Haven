const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const config = require('config');
const jwtSecret = config.get('jwtSecret');

// @route  POST api/users
// @desc   Register a new user
// @access Public
router.post('/', 
        [
        check('name', 'Please add a name').notEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'please enter a password with minimum length of 6 characters').isLength({min: 6})
    ], 
    async (req, res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({erros: errors.array()})
    }    
   const {name, email, password} = req.body;
   try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({ error: 'User already exists!' });
        }
        user = new User({
            name,
            email,
            password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = { user:{ id: user.id}};
        jwt.sign(payload, jwtSecret, {
            expiresIn : 36000
        }, (err, token) =>{
            if(err) throw err;
            res.json({token});
        });

   } catch (err) {
        console.error(err.message);
        res.status(500).json({error:'Internal Server Error!'});
   }
});

module.exports = router;