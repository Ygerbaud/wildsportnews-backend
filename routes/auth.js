const authRouter = require('express').Router();
const { calculateToken } = require('../helpers/users');
const { checkPassword } = require('../middleware/users');

authRouter.post('/logIn', checkPassword, (req, res) => {
  res.status(201)
    .json({ ...req.body, token: calculateToken(req.body.email, req.body.uuiduser) })
})

module.exports = authRouter;