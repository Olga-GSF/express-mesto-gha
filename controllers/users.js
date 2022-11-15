const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  STATUS_CODES,
  ERROR_MESSAGE,
} = require('../utils/constants');
const BadRequestErr = require('../errors/BadRequestErr');
const ConflictErr = require('../errors/ConflictErr');
const NotFoundErr = require('../errors/NotFoundErr');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 7)
    .then((hash) => User.create({
      about: req.body.about,
      name: req.body.name,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => {
      const newUser = {
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      };
      res.status(STATUS_CODES.SUCCESS).send(newUser);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictErr(ERROR_MESSAGE.EXISTING_EMAIL));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestErr(ERROR_MESSAGE.GET_USER_ERROR));
      } else {
        next(err);
      }
    });
};

const getUser = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId).orFail(new NotFoundErr(ERROR_MESSAGE.GET_NOT_FOUND_ERROR))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestErr(ERROR_MESSAGE.ID_NOT_FOUND));
      }
      return next(err);
    });
};

const getAuthorizedUser = (req, res, next) => {
  User.findById(
    req.user._id,
  ).orFail(new NotFoundErr(ERROR_MESSAGE.ID_NOT_FOUND))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new NotFoundErr(ERROR_MESSAGE.ID_NOT_FOUND))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr(ERROR_MESSAGE.GET_USER_ERROR));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new NotFoundErr(ERROR_MESSAGE.ID_NOT_FOUND))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr(ERROR_MESSAGE.VALIDATION_ERROR));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then(() => {
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
            { expiresIn: '7d' },
          );
          res.cookie('jwt', token, {
            maxAge: 3600000 * 12 * 7,
            httpOnly: true,
            sameSite: true,
          })
            .send({ token });
        });
    })
    .catch(next);
};

// const login = (req, res, next) => {
//   const { email, password } = req.body;
//   User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign(
//         { _id: user._id },
//         NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
//         { expiresIn: '7d' },
//       );
//       res.cookie('jwt', token, {
//         maxAge: 3600000 * 12 * 7,
//         httpOnly: true,
//         sameSite: true,
//       })
//         .send({ token });
//     })
//     .catch(next);
// };

// NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',

module.exports = {
  createUser,
  getUser,
  getUserById,
  updateUser,
  updateAvatar,
  login,
  getAuthorizedUser,
};
