const { STATUS_CODES } = require('../utils/constants');

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

module.exports = NotFoundErr;
