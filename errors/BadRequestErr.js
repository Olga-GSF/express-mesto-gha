const { STATUS_CODES } = require('../utils/constants');

class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.BAD_REQUEST_ERROR;
  }
}

module.exports = BadRequestErr;
