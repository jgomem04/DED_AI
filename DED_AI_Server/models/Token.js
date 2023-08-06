const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Token = new Schema({
    //_id Defined by MongoDB
    accessToken: {
        type: String,
        required: true,
        unique: true
    },
    accessTokenExpiresAt: {
        type: Date,
        required: true
    },
    client: {
        type: Schema.Types.Mixed,
        required: true
    },
    user: {
        type: Schema.Types.Mixed,
        required: true
    }
})

module.exports = mongoose.model('Token', Token);