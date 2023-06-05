const jsonwebtoken = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../config');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
// достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  // извлечём токен
  const jwt = authorization.replace('Bearer ', '');

  let payload;
  // console.log('4545454', jwt)

  try {
    // попытаемся верифицировать токен
    payload = jsonwebtoken.verify(jwt, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

module.exports = auth;
