const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
  max: 100,
  windowMs: 10000, // 10 сек
  message: 'На данный момент вы больше не можете делать запросы. Попробуйте еще раз позже.',
});

module.exports = limiter;
