const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const Users = require('../models/user');
const userHelper = require('../helpers/users');


const saltRound = 11;

/**
 * Encryptage du mot de passe avec bcrypt pour l'insérer dans la BDD
 */
const hashedPassword = (req, res, next) => {
  bcrypt
    .hash(req.body.password, saltRound)
    .then((hash) => {
      delete req.body.password;
      req.body = { ...req.body, hashedPassword: hash };
      next();
    })
    .catch(() => {
      res.status(500).send("Error encoding the password");
    });
};

/**
 * création d'un uuid en plus de l'id
 */
const createUuid = (req, res, next) => {
  const uuiduser = uuidv4();
  req.body = { ...req.body, uuiduser };
  next();
};

/**
 * Vérification des inputs par le backend
 */
const checkUserFields = (req, res, next) => {
  const error = Joi.object({
    email: Joi.string().email().presence("required"),
    password: Joi.string()
      .max(255)
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^ws]|[_])).{8,}$"
        )
      )
      .presence("required"),
    favorite_id: Joi.number().integer(),
  }).validate(req.body, { abortEarly: false }).error;

  if (error) {
    res.status(401).json({ msg: "Fields are not valids" });
  } else {
    next();
  }
};

/**
 * pour le login : vérifie le mot de passe
 */
 const checkPassword = (req, res, next) => {
  Users.findOneByEmail(req.body.email)
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.hashedpassword)
        .then((result) => {
          if (result) {
            req.body = user;
            delete req.body.hashedpassword;
            delete req.body.id;
            next();
          } else {
            res.status(404).json({ msg: 'Invalid Credentials' });
          }
        })
        .catch((err) => res.status(404).json({ msg: 'error' }));
    })
    .catch((err) => res.status(404).json({ msg: 'Invalid Credentials' }));
};

/**
 * vérification cookie + role
 */
 const checkAuth = (req, res, next) => {
  if (req.headers.user_agent) {
    const auth = userHelper.checkJwtAuth(req.headers.user_agent);
    if (auth) {
      Users.findOneByEmail(auth.email)
        .then((user) => {
          if (user.uuidusers === auth.uuid) next();
          else res.status(401).json({ msg: 'Unauthorized Path 1' });
        })
        .catch((err) => res.status(500).json({ msg: 'Error retrieving data' }));
    } else {
      res.status(401).json({ msg: 'Unauthorized Path 2' });
    }
  } else {
    res.status(401).json({ msg: 'Unauthorized Path 3' });
  }
};

module.exports = {
  hashedPassword,
  createUuid,
  checkUserFields,
  checkPassword ,
  checkAuth
};
