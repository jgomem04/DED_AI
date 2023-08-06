const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sample = new Schema({
    //_id Defined by MongoDB
    fileName: {
        type: String,
        required: true,
        unique: true
    },
    analysisResult: {
        type: Boolean,
        required: true
    },
    analysisDate: {
        type: Date,
        required: true
    },
    feedbackResult: {
        type: Boolean
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Sample', Sample);