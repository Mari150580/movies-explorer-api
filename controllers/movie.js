const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const AccessRightsError = require('../errors/AccessRightsError');
const { ERROR_VALIDATION_MOVIE, ERROR_ACCESS_MOVIE, ERROR_NOT_FOUND } = require('../utils/errorMessage');
const { MOVIE_TEXT } = require('../utils/sendMessage');

// создаёт фильм с переданными в теле данными (film)
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => {
      movie.populate(['owner'])
        .then(() => res.status(201).send(movie));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_VALIDATION_MOVIE));
      } else {
        next(err);
      }
    });
};

// возвращает все сохранённые текущим  пользователем фильмы
const getMovie = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      next(err);
    });
};

// удаляет сохранённый фильм по id
// eslint-disable-next-line consistent-return
const deleteMovie = async (req, res, next) => {
  try {
    const findedCard = await Movie.findById(req.params.movieId)
      .populate(['owner'])
      .orFail();
    const deletedCard = await Movie.deleteOne({
      _id: findedCard._id,
      owner: req.user._id,
    });
    if (deletedCard.deletedCount === 0) {
      next(new AccessRightsError(ERROR_ACCESS_MOVIE));
    } else {
      return res
        .status(200)
        .send({ MOVIE_TEXT });
    }
  } catch (err) {
    if (err.name === 'DocumentNotFoundError') { // проверка _id не существует в базе
      return next(new NotFoundError(ERROR_NOT_FOUND));
    }
    next(err);
  }
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
};

/*  "country": "Россия",
    "director": "Бондарчук",
    "duration": "2",
    "year": "2022 год",
    "description": "Боевик",
    "image": "https://youtu.be/0yjJHcRw6M4",
    "trailerLink": "https://youtu.be/0yjJHcRw6M4",
    "thumbnail": "https://phonoteka.org/uploads/posts/2023-03/1680037471_phonoteka-org-p-dedus-fiksiki-oboi-vkontakte-24.jpg",
    "nameRU": "Фиксики",
    "nameEN": "Fixies" ,
    "movieId": "454545" */
