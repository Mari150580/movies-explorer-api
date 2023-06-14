const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  // имя пользователя
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    unique: true,
    required: true,
    type: String,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Поле email не валидно',
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
