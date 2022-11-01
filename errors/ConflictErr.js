const { STATUS_CODES } = require('../utils/constants');

class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.CONFLICT_ERROR;
  }
}

module.exports = ConflictErr;
