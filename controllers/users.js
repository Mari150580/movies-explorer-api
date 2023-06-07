const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UserExistsError = require('../errors/UserExistsError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../utils/config');
const {
  ERROR_VALIDATION_USERS,
  ERROR_TEXT_USERS, ERROR_VALIDATION,
  ERROR_TEXT,
  NOT_FOUND_USER,
  ERROR_NOT_FOUND,
} = require('../utils/errorMessage');

// создаёт пользователя (email, password и name)
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const dataUser = user.toObject();
      delete dataUser.password;
      return res.status(201).send(dataUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_VALIDATION_USERS));
      } else if (err.code === 11000) { // проверка на индивидуальность email
        next(new UserExistsError(ERROR_TEXT_USERS));
      } else if (err.name === 'Error') {
        next(new BadRequestError(ERROR_VALIDATION));
      } else {
        next(err);
      }
    });
};

// Логин
const login = (req, res, next) => {
  const { email, password } = req.body;
  // data.jwt, сроком на неделю, сверка паролей
  User
    .findOne({ email }).select('+password')
    .orFail(() => next(new UnauthorizedError(ERROR_TEXT)))
    .then((user) => bcrypt.compare(password, user.password)
    // eslint-disable-next-line consistent-return
      .then((matched) => {
        if (matched) {
          return user;
        }
        throw new UnauthorizedError(NOT_FOUND_USER);
      }))
    .then((user) => {
      const jwt = jsonwebtoken.sign(
        { _id: user._id },
        process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).send({ jwt });
    })
    .catch((err) => {
      next(err);
    });
};

// возвращает информацию о пользователе (email и имя)
const getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    . then((user) => {
      if (!user) {
        throw next(new NotFoundError(NOT_FOUND_USER));
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      // проверка _id не валидный
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_NOT_FOUND));
      } else if (err.name === 'Error') { // проверка _id не существует в базе
        next(new NotFoundError(ERROR_NOT_FOUND));
      } else {
        next(err);
      }
    });
};

// обновляет информацию о пользователе (email и имя)
const updatesUserInformation = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_VALIDATION_USERS));
      }
      next(err);
    });
};

module.exports = {
  createUser,
  getUser,
  updatesUserInformation,
  login,
};
/*   "name": "11111jfhgjvghjgvj",
        "email": "dfgshfgdgd1@11111111.ru",
       "password":"d1q1fdgdgd1fdgfgsh1@111.ru" */
