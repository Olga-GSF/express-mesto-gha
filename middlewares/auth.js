const jwt = require('jsonwebtoken');
const { ERROR_MESSAGE } = require('../utils/constants');
const UnauthorizedErr = require('../errors/UnauthorizedErr');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedErr(ERROR_MESSAGE.AUTHORIZATION_REQ);
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    throw new UnauthorizedErr(ERROR_MESSAGE.AUTHORIZATION_REQ);
  }
  req.user = payload;

  next();
};
