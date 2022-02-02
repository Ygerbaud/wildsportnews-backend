const usersRouter = require('express').Router();
const User = require('../models/user');
const {
  checkUserFields,
  hashedPassword,
  createUuid,
} = require('../middleware/users');


/**
 * Création d'un nouveau user 
 */
usersRouter.post(
  '/signIn',
  checkUserFields,
  hashedPassword,
  createUuid,
  (req, res) => {
    User.create(req.body)
      .then((result) => {
        delete req.body.hashedPassword;
        res.status(201).json({ user: req.body });
      })
      .catch((err) => res.status(401).json({ message: err }));
  }
);



module.exports = usersRouter;
