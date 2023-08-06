const sendgrid = require('@sendgrid/mail');
const config = require('config');
const API_KEY = process.env.SENDGRID_API_KEY || config.get('SENDGRID_API_KEY');

sendgrid.setApiKey(API_KEY);

function sendMail(email){
    sendgrid
        .send(email, false)
        .catch((err) => {
            console.log("Error sending email: " + err);
        });
}

module.exports = sendMail;