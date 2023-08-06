const axios = require("axios");

function getPrediction(raw){
    return axios.post("https://dedaimodel.onrender.com/predict", {pic: raw})
}

module.exports = {
    getPrediction
}