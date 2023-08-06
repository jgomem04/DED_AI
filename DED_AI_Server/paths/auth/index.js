const OAuth2Server = require("@node-oauth/oauth2-server");
const app = require('../../app');

module.exports = function(){
    let operations = {
        POST
    };

    function POST(req, res, next){
        var request = new OAuth2Server.Request(req);
        var response = new OAuth2Server.Response(res);

        return app.oauth.token(request, response)
            .then(function(token){
                res.json(token)
            })
            .catch(function(err) {
                res.status(err.code).json(err);
            });
    };

    POST.apiDoc = {
        summary: "POST Login Credentials",
        operationId: "postLogin",
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
                description: "Login OK",
                schema: {
                    $ref: '#/definitions/Token'
                }
            },
            401: {
                description: "Invalid credentials"
            },
            400: {
                description: "Incorrectly formed"
            },
            500: {
                description: "Internal server error"
            }
        }
    };

    return operations;
}