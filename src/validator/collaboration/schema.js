const Joi = require('joi');

const CollabPayloadSchema = Joi.object({
  noteId: Joi.string().required(),
  userId: Joi.string().required(),
});

module.exports = { CollabPayloadSchema };
