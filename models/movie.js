const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    // страна создания фильма
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
  },
  director: {
    // режиссёр фильма
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
  },
  duration: {
    // длительность фильма
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },
  year: {
    // год выпуска фильма
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
  description: {
    // описание фильма
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
  },
  image: {
    // ссылка на постер к фильму
    type: String,
    validate: {
      validator: (v) => isURL(v),
      message: 'Вы ввели неправильный формат ссылки (невалидно)',
    },
    required: [true, 'Поле "image" должно быть заполнено'],
  },
  trailerLink: {
    // ссылка на трейлер фильма
    type: String,
    validate: {
      validator: (v) => isURL(v),
      message: 'Вы ввели неправильный формат ссылки (невалидно)',
    },
    required: [true, 'Поле "trailerLink" должно быть заполнено'],
  },
  thumbnail: {
    // миниатюрное изображение постера к фильму
    type: String,
    validate: {
      validator: (v) => isURL(v),
      message: 'Вы ввели неправильный формат ссылки (невалидно)',
    },
    required: [true, 'Поле "thumbnail" должно быть заполнено'],
  },
  owner: {
    // _id пользователя, который сохранил фильм
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле `owner` является обязательным для заполнения'],
  },
  movieId: {
    // id фильма, который содержится в ответе сервиса MoviesExplorer ?????
    type: Number,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },
  nameRU: {
    // название фильма на русском языке
    type: String,
    required: [true, 'Поле "nameRU" должно быть заполнено'],
  },
  nameEN: {
    // название фильма на английском языке
    type: String,
    required: [true, 'Поле "nameEN" должно быть заполнено'],
  },
}, { versionKey: false });

const Movie = mongoose.model('movie', movieSchema);
module.exports = Movie;
// module.exports= mongoose.model('movie', movieSchema);
