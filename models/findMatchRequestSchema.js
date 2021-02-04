const Joi = require('joi');

module.exports = Joi.object().keys({
    sentences: Joi.array().items(Joi.string()).min(1).required()
});