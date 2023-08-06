const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const User = new Schema({
    //_id Degfined by MongoDB
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    }
});

User.pre('save', function(next)  {
    if(this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    next();
});

module.exports = mongoose.model('User', User)