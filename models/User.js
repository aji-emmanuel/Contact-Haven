const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
     email:{
        type: String,
        required: true,
        unique: true
    },
     password:{
        type: String,
        required: true
    },
    date_created:{
        type: Date,
        default: Date.now
    },
     date_updated:{
        type: Date
    }
});

module.exports = mongoose.model('user', UserSchema);