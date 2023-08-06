const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema({
    //_id Defined by MongoDB
    clientId: {
        type: String,
        required: true,
        unique: true
    },
    clientSecret: {
        type: String,
        required: true
    },
    grants: {
        type: Array,
        required: true
    },
    redirectUris: {
        type: Array,
    }
})

module.exports = mongoose.model('Client', Client);