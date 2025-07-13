const Joi = require('joi');

const userPayloadSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
  fullName: Joi.string().required(),
});

module.exports = { userPayloadSchema };
