/* eslint-disable no-underscore-dangle */
class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    const { data } = request.payload;
    this._validator.validateImageHeader(data.hapi.headers); // verifies the request header
    const filename = await this._service.writeFile(data, data.hapi);

    // use this when using local stprage:
    // `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
    const response = h.response({
      status: 'success',
      data: {
        fileLocation: filename, // using S3 storage
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
