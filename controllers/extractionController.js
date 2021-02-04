const findMatchRequestSchema = require('../models/findMatchRequestSchema'),
    {sendSuccessResponse, sendValidationErrorResponse} = require('../util/reponseUtil'),
    {Worker} = require('worker_threads');

const findMatches = async (request, response) => {
    const {body} = request;
    const {error} = findMatchRequestSchema.validate(body, {abortEarly: false});
    if (error) {
        return sendValidationErrorResponse(response, error);
    }
    const {sentences} = body;
    const threads = new Set();
    for (let i = 0; i < sentences.length; i++) {
        threads.add(new Worker('./workers/sentenceMatcherWorker.js', {workerData: sentences[i]}))
    }

    const results = [];
    for (let worker of threads) {
        worker.on('message', function (message) {
            results.push(message);
        });

        worker.on('exit', () => {
            threads.delete(worker);
            if (threads.size === 0) {
                return sendSuccessResponse(response, {results});
            }
        });
    }
};


module.exports = {findMatches};