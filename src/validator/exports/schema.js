const Joi = require('joi');

const schema = Joi.object({
    targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = schema;
