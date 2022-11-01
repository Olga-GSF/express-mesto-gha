const { STATUS_CODES } = require('../utils/constants');

class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.UNAUTHORIZED_ERROR;
  }
}

module.exports = UnauthorizedErr;
