/* eslint-disable no-underscore-dangle */
class ExportsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postExportNotesHandler = this.postExportNotesHandler.bind(this);
  }

  async postExportNotesHandler(request, h) {
    this._validator.valdateExportPayload(request.payload);

    const message = {
      userId: request.auth.credentials.id,
      targetEmail: request.payload.targetEmail,
    };
    await this._service.sendMessage('export:notes', JSON.stringify(message));
    // note: the JSON.stringify is necessary as the service only takes messages
    //       in the form of strings

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda dalam antrean',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
