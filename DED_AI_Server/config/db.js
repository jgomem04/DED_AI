const mongoose = require('mongoose');
const config = require('config');
const mongoURI = process.env.MONGODB_URI || config.get('mongoURI');

const connection = async () => {
    try{
        await mongoose.connect(
            mongoURI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            () => {
                console.log('MongoDB connected');
            }
        );
    }catch(error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connection;