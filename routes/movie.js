const express = require('express');
const auth = require('../middlewares/auth');
const { moviePostValidator, movieDeleteValidator } = require('../middlewares/validator');

const movieRouter = express.Router();
const {
  createMovie,
  deleteMovie,
  getMovie,
} = require('../controllers/movie');

movieRouter.use(auth); // защита роутов

// создаёт фильм
movieRouter.post('/', moviePostValidator, createMovie);

// возвращает все сохранённые текущим  пользователем фильмы
movieRouter.get('/', getMovie);

// удаляет сохранённый фильм по id
movieRouter.delete('/:movieId', movieDeleteValidator, deleteMovie);

module.exports = movieRouter;
