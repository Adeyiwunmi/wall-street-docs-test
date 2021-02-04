const chai = require('chai'),
    assert = chai.assert,
    supertest = require('supertest'),
    app = require('../../app');


describe('Extraction Controller', function () {
    const request = supertest(app);
    after((done) => {
        app.close(done);
    });
    const BASE_PATH = '/extractions';

    describe('findMatches Test', function () {
        const REQUEST_PATH = `${BASE_PATH}/matches`;
        it('should return error for invalid request with sentence not present', async function () {
            const invalidRequestBody = {
                items: []
            };
            const {body, statusCode} = await request.post(REQUEST_PATH).send(invalidRequestBody);
            assert.equal(400, statusCode);
            const {errors} = body;
            assert.isNotEmpty(errors);
        });

        it('should return error for invalid request with empty sentences', async function () {
            const invalidRequestBody = {
                sentences: []
            };
            const {body, statusCode} = await request.post(REQUEST_PATH).send(invalidRequestBody);
            assert.equal(400, statusCode);
            const {errors} = body;
            assert.isNotEmpty(errors);
        });


        it('should find matches for sentences', async () => {

            const request = supertest(app);
            const firstSentence = "Furthermore, please confirm your organisation's " +
                "contact details according to the instructions set out" +
                " in the sheet attached hereto.",
                secondSentence = "This Confidentiality Agreement, including any non-contractual obligations arising " +
                    "out of or in connection with this Confidentiality Agreement, shall be governed by and construed " +
                    "in accordance with [PLACEHOLDER] law, and each party irrevocably submits " +
                    "to the exclusive jurisdiction of the [PLACEHOLDER] courts.",
                thirdSentence = "We acknowledge and agree to" +
                    " the matters set out in your Confidentiality Agreement " +
                    "dated PLACEHOLDER(of which this is a copy).";
            const validRequest = {
                body: {
                    "sentences": [firstSentence, secondSentence, thirdSentence]
                }
            };

            const {body, statusCode} = await request.post(REQUEST_PATH).send(validRequest.body);
            assert.equal(statusCode, 200);
            assert.isNotEmpty(body.results);
            const firstResult = body.results[0];
            assert.isNotEmpty(firstResult.matches);
            const firstResultFirstMatch = firstResult.matches[0];
            assert.isNotNull(firstResultFirstMatch.similarity);
            assert.isNotNull(firstResultFirstMatch.sentence);
            assert.isNotNull(firstResultFirstMatch.id);
        });
    });
});