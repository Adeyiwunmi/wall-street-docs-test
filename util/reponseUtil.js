const sendValidationErrorResponse = (response, validationError) => {
    const errors = validationError.details.map(({context: {key}, message}) => {
        return {key, message};
    });
    return response.status(400).json({errors})
};

const sendSuccessResponse = (response, data) => {
    return response.status(200).json(data);
};

const sendInternalServerErrorResponse = (response, error) => {
    return response.status(500).json(error);
};

module.exports = {
    sendInternalServerErrorResponse,
    sendValidationErrorResponse,
    sendSuccessResponse
};