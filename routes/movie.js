const express = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { URL_REGEXP } = require('../config');

const movieRouter = express.Router();
const {
  createMovie,
  deleteMovie,
  getMovie,
} = require('../controllers/movie');

movieRouter.use(auth); // защита роутов

// создаёт фильм
movieRouter.post('/', celebrate({
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
}), createMovie);

// возвращает все сохранённые текущим  пользователем фильмы
movieRouter.get('/', getMovie);

// удаляет сохранённый фильм по id
movieRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = movieRouter;
