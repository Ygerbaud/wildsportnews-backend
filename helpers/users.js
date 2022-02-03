const jwt = require('jsonwebtoken');
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const calculateToken = (userEmail = "", uuiduser) => {
  return jwt.sign({ email: userEmail, uuid: uuiduser }, PRIVATE_KEY)
}
const checkJwtAuth = (token) => {
  return jwt.verify(token, PRIVATE_KEY)
}

module.exports = { calculateToken, checkJwtAuth };
