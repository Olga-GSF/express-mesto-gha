const mongoose = require('mongoose');
const Card = require('../models/card');
const {
  STATUS_CODES,
  ERROR_MESSAGE,
} = require('../utils/constants');

const NotFoundErr = require('../errors/NotFoundErr');
const ForbbidenErr = require('../errors/ForbiddenErr');
const BadRequestErr = require('../errors/BadRequestErr');

const createCards = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(STATUS_CODES.SUCCESS).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr(ERROR_MESSAGE.GET_CARDS_ERROR));
      }
      return next(err);
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundErr(ERROR_MESSAGE.DELETE_CARDSID_ERROR);
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbbidenErr(ERROR_MESSAGE.REFUSAL_TO_DELETE);
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .then((removedCard) => res.send(removedCard));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestErr(ERROR_MESSAGE.DELETE_CARDSID_ERROR));
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundErr(ERROR_MESSAGE.DELETE_CARDSID_ERROR);
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestErr(ERROR_MESSAGE.LIKE_CARDID_VALIDAT_ER));
    }
    return next(err);
  });

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundErr(ERROR_MESSAGE.DELETE_CARDSID_ERROR);
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestErr(ERROR_MESSAGE.LIKE_CARDID_VALIDAT_ER));
    }
    return next(err);
  });

module.exports = {
  createCards,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
};
