var express = require('express');
var path = require('path');
var logger = require('morgan');
var helmet = require('helmet');
var parser = require('body-parser')
var openAPI = require("express-openapi");
var swagger = require("swagger-ui-express");
var OAuth2Server = require("@node-oauth/oauth2-server");
var connectDB = require("./config/db");

connectDB();

var port = process.env.PORT || 3001;
var app = express();

app.listen(port, () => {
    console.log(`DED_AI API Server running on ${port}`);
    console.log(`OpenAPI documentation available in http://localhost:${port}/api-documentation`);
});

app.use(logger('dev'));
app.use(express.json({limit: '20mb'}));
app.use(parser.urlencoded({limit: '20mb', extended: true}));
app.disable('x-powered-by');
app.use(helmet());

app.oauth = new OAuth2Server({
    model: require('./helpers/OAuth2.js'),
    accessTokenLifetime: 60 * 60,
    allowBearerTokensInQueryString: true
});

openAPI.initialize({
    app,
    securityHandlers: {
        passwordAuthentication: function(req, scopes, schema){
            var request = new OAuth2Server.Request(req);
            var response = new OAuth2Server.Response(req.res);

            return app.oauth.authenticate(request, response)
                .catch(function(err){
                    req.res.status(err.code || 500).json(err);
                });
        }
    },
    apiDoc: require("./doc/api-doc"),
    paths: path.resolve(__dirname, 'paths')
});

app.use(
    "/api-documentation",
    swagger.serve,
    swagger.setup(null, {
        swaggerOptions: {
            url: `https://ded-ai-api-server.onrender.com:/api-docs`
        }
    })
);

module.exports = app;