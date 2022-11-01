const STATUS_CODES = {
  SUCCESS: 201,
  BAD_REQUEST_ERROR: 400,
  UNAUTHORIZED_ERROR: 401,
  FORBIDDEN_ERROR: 403,
  NOT_FOUND: 404,
  CONFLICT_ERROR: 409,
  SERVER_ERROR: 500,
};

const ERROR_MESSAGE = {
  GET_USER_ERROR: 'Переданы некорректные данные при создании пользователя',
  GET_NOT_FOUND_ERROR: 'Пользователь по указанному _id не найден.',
  GET_CARDS_ERROR: 'Переданы некорректные данные при создании карточки',
  DELETE_CARDSID_ERROR: 'Карточка с указанным _id не найдена',
  LIKE_CARDID_VALIDAT_ER: 'Переданы некорректные данные для постановки/снятии лайка',
  LIKE_CARDIN_NOT_FOUND_E: 'Передан несуществующий _id карточки',
  SERVER_ERROR: 'Ошибка по умолчанию',
  VALIDATION_ERROR: 'Переданы некорректные данные при обновлении профиля.',

  ID_NOT_FOUND: 'Пользователь с указанным id не найден',
  REFUSAL_TO_DELETE: 'Запрещено удалять карточку другого пользователя',
  NOT_FOUND_ERROR_TEST: 'Не найдено',
  AUTHORIZATION_REQ: 'Необходима авторизация',
  ERROR_AUTHORIZATION: 'Неправильные почта или пароль',
  EXISTING_EMAIL: 'Пользователь с данным email уже существует',
  EXISTING_ID: 'Введен некорректный id',
};

module.exports = {
  STATUS_CODES,
  ERROR_MESSAGE,
};
