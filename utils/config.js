// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET' } = process.env;
const { PORT = '3000' } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

/* eslint-disable no-useless-escape */

const URL_REGEXP = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

module.exports = {
  JWT_SECRET,
  PORT,
  DB_ADDRESS,
  URL_REGEXP,
};
