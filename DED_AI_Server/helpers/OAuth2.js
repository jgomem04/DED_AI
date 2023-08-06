//SO to @pedroetb https://github.com/pedroetb/node-oauth2-server-mongo-example/blob/master/model.js

const mongoose = require('mongoose')
const clientModel = require('../models/Client');
const tokenModel = require('../models/Token');
const userModel = require('../models/User');
const bcrypt = require("bcryptjs");

function getAccessToken(accessToken, callback){
    tokenModel
        .findOne({accessToken: accessToken})
        .lean()
        .exec(
            (function(callback, err, token){
                if(!token){
                    console.error("Token not found in DB");
                }

                callback(err, token);
            })
        .bind(null, callback));
};

function getClient(clientId, clientSecret, callback){
    clientModel
        .findOne({clientId: clientId, clientSecret: clientSecret})
        .lean()
        .exec(
            (function(callback, err, client) {
                if(!client){
                    console.error('Client not found in DB');
                }

                callback(err, client);
            })
        .bind(null, callback));
};

function saveToken(token, client, user, callback){
    token.client = {
        id: client.clientId
    }

    token.user = {
        username: user.username
    }

    let someToken = new tokenModel(token);
    someToken
        .save(
            (function(callback, err, token){
                if(!token){
                    console.error("Token not saved");
                }else{
                    token = token.toObject();
                    delete token._id;
                    delete token._v;
                }

                callback(err, token);
            })
        .bind(null, callback));
};

function getUser(username, password, callback){
    userModel
        .findOne({username: username})
        .lean()
        .exec(
            (function(callback, err, user) {
                if(!user){
                    console.error("User not found in DB");
                }else if(!bcrypt.compareSync(password, user.password)){
                    user = null;
                    console.error("Pasword mismatch");
                }

                callback(err, user);
            })
        .bind(null, callback));
};

module.exports = {
    getAccessToken,
    getClient,
    saveToken,
    getUser
};