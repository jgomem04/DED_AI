const config = require('config');
const User = require('../../models/User');
const sendEmail = require('../../helpers/email');
const senderAddress = process.env.APP_EMAIL_ADDRESS || config.get('APP_EMAIL_ADDRESS');

module.exports = function(){
    let operations = {
        POST
    };

    async function POST(req, res, next){
        let user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;

        user = await user.save();

        sendEmail({
            to: user.email,
            from: senderAddress,
            subject: 'A new DED_AI user has been registered',
            text: 'This is a test message sent when a new DED_AI user is registered.'
        });

        return res.sendStatus(200);
    }

    POST.apiDoc = {
        summary: "POST Register Data",
        operationId: "postRegister",
        consumes: ["application/json"],
        parameters: [
            {
                in: "body",
                name: "User",
                schema: {
                    $ref: '#/definitions/User'
                }
            }
        ],
        responses: {
            200: {
                description: "Register OK"
            },
            400: {
                description: "Field(s) not properly formed"
            },
            500: {
                description: "Internal server error"
            }
        }
    };

    return operations;
}