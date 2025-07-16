const Joi = require('joi');

// here, the file type sent will be validated
// this is done by reading the request metadata (though it should be noted, not all metadata
// will be validated here, as there's lots of it, so only the content-type is validated)
const uploadSchema = Joi.object({
  'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp').required(),
}).unknown();

// the unknown()'s job is to allow all object with any properties to pass through (as long as
// the ones that passes through has the content-type property)

module.exports = { uploadSchema };
