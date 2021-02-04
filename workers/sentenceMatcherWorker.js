const {parentPort, workerData} = require('worker_threads'),
    {calculateStringSimilarity} = require('../util/similiarityCalculator'),
    databaseSentences = require('../database/data');

//Expects the main thread to send the sentence to be processed as workerData
const sentence = workerData;
const matches = databaseSentences.map((databaseSentence) => {
    return {
        id: databaseSentence.id,
        sentence: databaseSentence.original_string,
        similarity: calculateStringSimilarity(databaseSentence.original_string, sentence)
    };
});
const topMatches = matches.sort((firstMatch, secondMatch) => {
    return secondMatch.similarity - firstMatch.similarity;
}).slice(0, 3);

parentPort.postMessage({sentence, matches: topMatches});
