const Sample = require('../../models/Sample');
const PredictHelper = require('../../helpers/PredictHelper');

module.exports = function() {
    let operations = {
        POST,
        PUT
    };

    async function POST(req, res, next){
        let analysisDate = new Date(Date.now());
        let fileName = analysisDate.toISOString();

        let aSample = new Sample();
        aSample.fileName = fileName;
        aSample.analysisDate = analysisDate;

        PredictHelper
            .getPrediction(req.body.raw)
            .then(response => {
                aSample.analysisResult = response.data.result;
                aSample.save();
                res.status(200).json(aSample);
            })
            .catch(error => {
                res.status(500);
            })
    };

    async function PUT(req, res, next){
        let aSample = await Sample.findById(req.body._id);

        if(aSample === null){
            return res.status(404).json({
                error: "No such sample"
            })
        }

        aSample.feedbackResult = req.body.feedbackResult;
        await aSample.save();

        res.status(200).json(aSample);
    };

    POST.apiDoc = {
        summary: "POST Image",
        operationId: "postImage",
        consumes: ["application/json"],
        security: [
            {
                passwordAuthentication: []
            }
        ],
        parameters: [
            {
                in: "body",
                name: "Image",
                schema: {
                    $ref: '#/definitions/Image'
                }
            }
        ],
        responses: {
            200: {
                description: "Submission OK. Sample object returned.",
                schema: {
                    $ref: '#/definitions/Sample'
                }
            },
            400:{
                description: "Incorrectly formed"
            },
            401: {
                description: "Authentication required"
            },
            500: {
                description: "Internal server error"
            }
        },
    };

    PUT.apiDoc = {
        summary: "PUT Feedback",
        operationId: "putFeedback",
        consumes: ["application/json"],
        security: [
            {
                passwordAuthentication: []
            }
        ],
        parameters: [
            {
                in: "body",
                name: "Sample",
                schema: {
                    $ref: '#/definitions/Sample'
                }
            }
        ],
        responses: {
            200: {
                description: "Feedback inserted. Modified Sample object returned.",
                schema: {
                    $ref: '#/definitions/Sample'
                }
            },
            400:{
                description: "Incorrectly formed"
            },
            401: {
                description: "Authentication required"
            },
            500: {
                description: "Internal server error"
            }
        }
    };

    return operations;
};