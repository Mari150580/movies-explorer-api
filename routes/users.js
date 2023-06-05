const express = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { URL_REGEXP } = require('../config');

const usersRouter = express.Router();
const {
  getUser,
  updatesUserInformation,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
usersRouter.get('/me', auth, getUser);

// обновляет информацию о пользователе (email и имя)
usersRouter.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().regex(URL_REGEXP),
  }),
}), updatesUserInformation);

module.exports = usersRouter;
