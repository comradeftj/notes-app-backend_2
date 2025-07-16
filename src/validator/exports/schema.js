const Joi = require('joi');

const exportNotesPayload = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = { exportNotesPayload };
