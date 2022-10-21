const NOT_FOUND_ERROR = 404;
const VALIDATION_ERROR = 400;
const SERVER_ERROR = 500;
const ERROR_MESSAGE = {
  GET_USER_ERROR: 'Переданы некорректные данные при создании пользователя',
  GET_NOT_FOUND_ERROR: 'Пользователь по указанному _id не найден.',
  PATCH_VALIDATION_ERROR: 'Переданы некорректные данные при обновлении профиля.',
  GET_CARDS_ERROR: 'Переданы некорректные данные при создании карточки',
  DELETE_CARDSID_ERROR: 'Карточка с указанным _id не найдена',
  LIKE_CARDID_VALIDAT_ER: 'Переданы некорректные данные для постановки/снятии лайка',
  LIKE_CARDIN_NOT_FOUND_E: 'Передан несуществующий _id карточки',
  SERVER_ERROR: 'Ошибка по умолчанию',
};

module.exports = {
  NOT_FOUND_ERROR,
  VALIDATION_ERROR,
  SERVER_ERROR,
  ERROR_MESSAGE,
};
