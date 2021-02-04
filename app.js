const express = require('express'),
    logger = require('./util/logger'),
    extractionRouter = require('./routers/extractionRouter'),
    app = express();

app.use(express.json());

app.use('/extractions', extractionRouter);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    logger.info(`Extraction  application listening on port ${PORT}`);
});

module.exports = server;