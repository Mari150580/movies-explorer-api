/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const BodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const validationErrors = require('celebrate').errors;
const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/error-handler');
const limiter = require('./middlewares/limiter');
const { PORT, DB_ADDRESS } = require('./utils/config');
const router = require('./routes');

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

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

// Подключаем роутеры
app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(validationErrors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
