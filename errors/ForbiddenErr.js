const { STATUS_CODES } = require('../utils/constants');

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenErr;
