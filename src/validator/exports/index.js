const InvariantError = require('../../exceptions/invariantError');
const { exportNotesPayload } = require('./schema');

const ExportsValidator = {
  valdateExportPayload: (payload) => {
    const validateResult = exportNotesPayload.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = ExportsValidator;
