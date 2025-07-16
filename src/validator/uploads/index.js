const InvariantError = require('../../exceptions/invariantError');
const { uploadSchema } = require('./schema');

const UploadValidator = {
  validateImageHeader: (headers) => {
    const validateResult = uploadSchema.validate(headers);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = UploadValidator;
