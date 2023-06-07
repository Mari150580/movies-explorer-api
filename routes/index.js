const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movie');
const auth = require('../middlewares/auth');
const { sungUpValidator, sungInValidator } = require('../middlewares/validator');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', sungInValidator, login);
router.post('/signup', sungUpValidator, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('URL does not exist'));
});

module.exports = router;
