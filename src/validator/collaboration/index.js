const InvariantError = require('../../exceptions/invariantError');
const { CollabPayloadSchema } = require('./schema');

const CollaborationsValidator = {
  validateCollabPayload: (payload) => {
    const validationResult = CollabPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CollaborationsValidator;
