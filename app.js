/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const BodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const validationErrors = require('celebrate').errors;
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const usersRouter = require('./routes/users'); // импортируем роутер
const movieRouter = require('./routes/movie');
const signupRouter = require('./routes/signup');
const signInRouter = require('./routes/signin');
const errorHandler = require('./middlewares/error-handler');
const limiter = require('./middlewares/limiter');
const { PORT, DB_ADDRESS } = require('./config');

const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(helmet());

// корс
app.use(cors());

app.use(limiter);

// подключаем мидлвары, роуты и всё остальное...

app.use(requestLogger); // подключаем логгер запросов

// Подключаем роутеры
app.use('/signup', signupRouter);

app.use('/signin', signInRouter);

app.use('/users', usersRouter);

app.use('/movie', movieRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('URL does not exist'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(validationErrors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
