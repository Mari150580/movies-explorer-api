const express = require('express');
const auth = require('../middlewares/auth');
const { usersPatchValidator } = require('../middlewares/validator');

const usersRouter = express.Router();
const {
  getUser,
  updatesUserInformation,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
usersRouter.get('/me', auth, getUser);

// обновляет информацию о пользователе (email и имя)
usersRouter.patch('/me', auth, usersPatchValidator, updatesUserInformation);

module.exports = usersRouter;
