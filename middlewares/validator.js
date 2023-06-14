const { celebrate, Joi } = require('celebrate');
const { URL_REGEXP } = require('../utils/config');

// валидация для singup
const sungUpValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// валидация для singin

const sungInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// валидация для создаёт фильма post
const moviePostValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGEXP),
    trailerLink: Joi.string().required().regex(URL_REGEXP),
    thumbnail: Joi.string().required().regex(URL_REGEXP),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// валидация для удаления сохранённого фильма

const movieDeleteValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

// валидация для обновления информации о пользователе
const usersPatchValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().regex(URL_REGEXP),
  }),
});

module.exports = {
  sungUpValidator,
  sungInValidator,
  moviePostValidator,
  movieDeleteValidator,
  usersPatchValidator,
};
