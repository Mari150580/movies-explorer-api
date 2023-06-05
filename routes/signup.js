const express = require('express');
const { celebrate, Joi } = require('celebrate');

const signupRouter = express.Router();
const { createUser } = require('../controllers/users');

// создаёт пользователя с переданными в теле (email, password и name)
signupRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

module.exports = signupRouter;
